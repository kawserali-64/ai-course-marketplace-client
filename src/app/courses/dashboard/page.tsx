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

const COLORS = [
  "#06B6D4",
  "#3B82F6",
  "#14B8A6",
  "#0EA5E9",
  "#6366F1",
  "#F59E0B",
  "#10B981",
];

interface DashboardData {
  success: boolean;
  summary: {
    totalCourses: number;
    beginnerCourses: number;
    advancedCourses: number;
  };
  categories: {
    name: string;
    value: number;
  }[];
  monthly: {
    month: string;
    courses: number;
  }[];
}

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data, error } = await authClient.token();

        if (error || !data?.token) {
          console.log(error);
          return;
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${data.token}`,
            },
            cache: "no-store",
          }
        );

        const result = await res.json();

        if (result.success) {
          setDashboard(result);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg font-semibold">
        No Dashboard Data Found
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Course Analytics Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            AI Course Marketplace Statistics Overview
          </p>
        </div>

        {/* Summary Cards */}

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm border">
            <p className="text-gray-500 font-medium">
              Total Courses
            </p>

            <h2 className="mt-4 text-5xl font-bold text-cyan-600">
              {dashboard.summary.totalCourses}
            </h2>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm border">
            <p className="text-gray-500 font-medium">
              Beginner Courses
            </p>

            <h2 className="mt-4 text-5xl font-bold text-green-600">
              {dashboard.summary.beginnerCourses}
            </h2>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm border">
            <p className="text-gray-500 font-medium">
              Advanced Courses
            </p>

            <h2 className="mt-4 text-5xl font-bold text-purple-600">
              {dashboard.summary.advancedCourses}
            </h2>
          </div>
        </div>

        {/* Charts */}

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Monthly Chart */}

          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold">
              Monthly Course Statistics
            </h2>

            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={dashboard.monthly}>
                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="courses"
                  fill="#06B6D4"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Category Chart */}

          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold">
              Category Distribution
            </h2>

            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={dashboard.categories}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  label
                >
                  {dashboard.categories.map((item, index) => (
                    <Cell
                      key={item.name}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}