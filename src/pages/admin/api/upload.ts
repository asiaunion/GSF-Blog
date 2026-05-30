import type { APIRoute } from "astro";
import { processImageUpload, validateMagicNumber } from "@/admin/lib/image-pipeline";
import { storage } from "@/admin/lib/storage";
import { dbExecute } from "@/admin/lib/db";
import { checkRateLimit, isCsrfAttack, rateLimitResponse, csrfErrorResponse, getClientIp, RATE_LIMITS } from "@/admin/lib/security";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  const user = (locals as any).user;
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  if (isCsrfAttack(request)) return csrfErrorResponse();
  
  const ip = getClientIp(request);
  if (checkRateLimit(`upload_${ip}`, RATE_LIMITS.upload)) {
    return rateLimitResponse();
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const postId = formData.get("postId") as string | null;

    if (!file) {
      return new Response(JSON.stringify({ error: "No file provided" }), { status: 400 });
    }

    if (file.size > 20 * 1024 * 1024) {
      return new Response(JSON.stringify({ error: "File too large (max 20MB)" }), { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (!validateMagicNumber(buffer)) {
      return new Response(JSON.stringify({ error: "Invalid file type" }), { status: 400 });
    }

    const processed = await processImageUpload(buffer, file.name, file.type);
    const uuid = crypto.randomUUID();
    
    const mainFilename = `media/${uuid}.webp`;
    const mainUrl = await storage.upload(processed.webpBuffer, mainFilename, "image/webp");
    
    const thumbFilename = `media/${uuid}_thumb.webp`;
    const thumbUrl = await storage.upload(processed.thumbnailBuffer, thumbFilename, "image/webp");

    await dbExecute(
      `INSERT INTO media (id, post_id, filename, original_name, storage_url, thumbnail_url, mime_type, size_bytes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [uuid, postId || null, mainFilename, processed.originalName, mainUrl, thumbUrl, "image/webp", processed.sizeBytes]
    );

    return new Response(JSON.stringify({ 
      success: true, 
      url: mainUrl, 
      thumbnailUrl: thumbUrl 
    }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error: any) {
    console.error("Upload error:", error);
    return new Response(JSON.stringify({ error: error.message || "Upload failed" }), { status: 500 });
  }
};
