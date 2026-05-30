import React, { useState, useEffect } from "react";

interface AuditLog {
  id: string;
  user_email: string;
  action: string;
  target: string;
  created_at: string;
}

interface DashboardStats {
  published: number;
  draft: number;
  memo: number;
  totalLogs: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/admin/api/dashboard")
      .then(r => r.json())
      .then(data => {
        setStats(data.stats);
        setLogs(data.logs);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 text-gray-400">
        <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-sm animate-pulse">대시보드 데이터를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">대시보드 요약</h1>
          <p className="text-gray-400 mt-2 text-sm">블로그 포스트 통계 및 최근 활동 내역입니다.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="/admin/memos/" className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-gray-200 rounded-xl font-bold transition-colors text-sm border border-white/5 shadow-lg shadow-black/20">
            📝 메모장
          </a>
          <a href="/admin/posts/" className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-xl font-bold transition-all duration-200 shadow-lg shadow-emerald-950/20">
            📚 포스트 라이브러리
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl flex flex-col items-center shadow-xl">
          <span className="text-4xl mb-3">🟢</span>
          <span className="text-3xl font-bold text-gray-100">{stats?.published || 0}</span>
          <span className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-semibold">발행됨</span>
        </div>
        <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl flex flex-col items-center shadow-xl">
          <span className="text-4xl mb-3">🟡</span>
          <span className="text-3xl font-bold text-gray-100">{stats?.draft || 0}</span>
          <span className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-semibold">작성 중</span>
        </div>
        <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl flex flex-col items-center shadow-xl">
          <span className="text-4xl mb-3">📝</span>
          <span className="text-3xl font-bold text-gray-100">{stats?.memo || 0}</span>
          <span className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-semibold">메모</span>
        </div>
        <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl flex flex-col items-center shadow-xl">
          <span className="text-4xl mb-3">🔒</span>
          <span className="text-3xl font-bold text-gray-100">{stats?.totalLogs || 0}</span>
          <span className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-semibold">감사 로그 수</span>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-200 mb-4 flex items-center gap-2">
        <span>📜</span> 최근 감사 로그 (Audit Log)
      </h2>
      <div className="bg-slate-900/30 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-slate-950/60 text-xs uppercase font-semibold text-gray-400">
              <tr>
                <th className="px-6 py-4">일시</th>
                <th className="px-6 py-4">사용자</th>
                <th className="px-6 py-4">액션</th>
                <th className="px-6 py-4">대상 (Target)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-mono text-[11px] text-gray-400">{new Date(log.created_at).toLocaleString()}</td>
                  <td className="px-6 py-4 font-medium">{log.user_email}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-emerald-400 font-bold text-[11px] uppercase tracking-wide">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">{log.target || "-"}</td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500 text-sm">
                    기록된 활동 내역이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
