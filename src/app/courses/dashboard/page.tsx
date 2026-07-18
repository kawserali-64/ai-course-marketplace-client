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
    totalHouses: number;
    availableHouses: number;
    rentedHouses: number;
  };
  categories: {
    name: string;
    value: number;
  }[];
  monthly: {
    month: string;
    houses: number;
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
          console.log("Token error", error);
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
      <div className="flex min-h-screen items-center justify-center">
        Loading Dashboard...
      </div>
    );
  }


  if (!dashboard) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        No Dashboard Data Found
      </div>
    );
  }


  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-6xl px-5">

        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Dashboard
          </h1>

          <p className="mt-2 text-gray-500">
            House Rental Statistics Overview
          </p>
        </div>


        {/* Summary Cards */}

        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-gray-500">
              Total Houses
            </p>

            <h2 className="mt-3 text-4xl font-bold text-cyan-600">
              {dashboard.summary.totalHouses}
            </h2>
          </div>


          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-gray-500">
              Available
            </p>

            <h2 className="mt-3 text-4xl font-bold text-green-600">
              {dashboard.summary.availableHouses}
            </h2>
          </div>


          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-gray-500">
              Rented
            </p>

            <h2 className="mt-3 text-4xl font-bold text-red-500">
              {dashboard.summary.rentedHouses}
            </h2>
          </div>

        </div>



        {/* Charts */}

        <div className="mt-10 grid gap-8 lg:grid-cols-2">


          {/* Bar Chart */}

          <div className="rounded-2xl bg-white p-6 shadow">

            <h2 className="mb-5 text-xl font-bold">
              Monthly Houses Added
            </h2>

            <ResponsiveContainer width="100%" height={300}>

              <BarChart data={dashboard.monthly}>

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="houses"
                  fill="#06B6D4"
                  radius={[8,8,0,0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>



          {/* Pie Chart */}

          <div className="rounded-2xl bg-white p-6 shadow">

            <h2 className="mb-5 text-xl font-bold">
              House Categories
            </h2>


            <ResponsiveContainer width="100%" height={300}>

              <PieChart>

                <Pie
                  data={dashboard.categories}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >

                  {dashboard.categories.map((item,index)=>(
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