import type { APIRoute } from "astro";
import { getDb } from "@/admin/lib/db";

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  const user = (locals as any).user;
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  try {
    const db = getDb();
    
    // Get basic stats
    const postsResult = await db.execute("SELECT status, count(*) as count FROM posts GROUP BY status");
    const stats = {
      published: 0,
      draft: 0,
      memo: 0,
    };
    
    postsResult.rows.forEach(r => {
      if (r.status === "published") stats.published = Number(r.count);
      if (r.status === "draft" || r.status === "editing" || r.status === "review") stats.draft += Number(r.count);
      if (r.status === "memo") stats.memo = Number(r.count);
    });

    const viewsResult = await db.execute("SELECT count(*) as count FROM audit_log");
    const totalLogs = Number(viewsResult.rows[0].count);

    // Get recent audit logs
    const auditResult = await db.execute("SELECT * FROM audit_log ORDER BY created_at DESC LIMIT 10");
    const logs = auditResult.rows.map(r => ({
      id: r.id,
      user_email: r.user_email,
      action: r.action,
      target: r.target,
      created_at: r.created_at
    }));

    return new Response(JSON.stringify({ stats: { ...stats, totalLogs }, logs }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error: any) {
    console.error("Dashboard error:", error);
    return new Response(JSON.stringify({ error: "Failed to load dashboard data" }), { status: 500 });
  }
};
