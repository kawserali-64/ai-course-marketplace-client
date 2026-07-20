"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#06B6D4", "#3B82F6", "#14B8A6", "#0EA5E9", "#6366F1", "#F59E0B", "#10B981"];

interface DashboardData {
  success: boolean;
  summary: { totalCourses: number; beginnerCourses: number; advancedCourses: number };
  categories: { name: string; value: number }[];
  monthly: { month: string; courses: number }[];
}

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data, error } = await authClient.token();
        if (error || !data?.token) return;
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard`, {
          headers: { Authorization: `Bearer ${data.token}` },
          cache: "no-store",
        });
        const result = await res.json();
        if (result.success) setDashboard(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-[#050505] text-cyan-500 font-black tracking-widest uppercase">Loading Analytics...</div>;
  if (!dashboard) return <div className="flex min-h-screen items-center justify-center bg-[#050505] text-white">No Data Available</div>;

  return (
    <section className="min-h-screen bg-[#050505] py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-16">
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">// Analytics Console</h1>
          <p className="mt-2 text-gray-500 font-mono text-sm">// Real-time system performance monitoring</p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { label: "Total Modules", val: dashboard.summary.totalCourses, color: "text-cyan-500" },
            { label: "Beginner Level", val: dashboard.summary.beginnerCourses, color: "text-emerald-500" },
            { label: "Advanced Level", val: dashboard.summary.advancedCourses, color: "text-purple-500" },
          ].map((item, i) => (
            <div key={i} className="border border-gray-900 bg-[#0a0a0a] p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">{item.label}</p>
              <h2 className={`mt-4 text-6xl font-black ${item.color}`}>{item.val}</h2>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Monthly Chart */}
          <div className="border border-gray-900 bg-[#0a0a0a] p-8">
            <h2 className="mb-8 font-black text-white uppercase tracking-widest text-sm">// Monthly Output</h2>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={dashboard.monthly}>
                <XAxis dataKey="month" stroke="#374151" fontSize={12} />
                <YAxis stroke="#374151" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: "#050505", border: "1px solid #1f2937" }} />
                <Bar dataKey="courses" fill="#06B6D4" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category Chart */}
          <div className="border border-gray-900 bg-[#0a0a0a] p-8">
            <h2 className="mb-8 font-black text-white uppercase tracking-widest text-sm">// Distribution Matrix</h2>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie data={dashboard.categories} dataKey="value" nameKey="name" outerRadius={100} stroke="none">
                  {dashboard.categories.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#050505", border: "1px solid #1f2937" }} />
                <Legend iconType="square" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}