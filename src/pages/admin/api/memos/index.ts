import type { APIRoute } from "astro";
import { dbExecute } from "@/admin/lib/db";
import { createMemoSchema } from "@/admin/schemas/api-schemas";

export const prerender = false;

// GET /admin/api/memos
export const GET: APIRoute = async ({ request, locals }) => {
  try {
    const dbResult = await dbExecute(`
      SELECT id, content, status, created_at
      FROM post_memos
      ORDER BY created_at DESC
    `);
    
    return new Response(JSON.stringify(dbResult.rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("GET /admin/api/memos 에러:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

// POST /admin/api/memos
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const result = createMemoSchema.safeParse(body);
    
    if (!result.success) {
      return new Response(JSON.stringify({ error: result.error.format() }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const memoId = Math.random().toString(36).substring(2, 10);
    const now = new Date().toISOString();

    await dbExecute(
      `INSERT INTO post_memos (id, content, status, created_at) VALUES (?, ?, 'pending', ?)`,
      [memoId, result.data.content, now]
    );

    return new Response(
      JSON.stringify({
        id: memoId,
        content: result.data.content,
        status: "pending",
        created_at: now,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("POST /admin/api/memos 에러:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
