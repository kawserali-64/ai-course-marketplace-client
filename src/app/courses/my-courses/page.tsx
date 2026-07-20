"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authClient, useSession } from "@/lib/auth-client";
import { FaEye, FaTrash, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

interface Course {
  _id: string;
  title: string;
  shortDescription: string;
  price: number;
  category: string;
  level: string;
  image: string;
}

export default function MyCoursesPage() {
  const { data: session, isPending } = useSession();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: courses = [], isLoading } = useQuery<Course[]>({
    queryKey: ["my-courses", session?.user?.id],
    enabled: !!session?.user?.id,
    queryFn: async () => {
      const { data, error } = await authClient.token();
      if (error || !data?.token) throw new Error("Authentication failed");
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-courses/${session?.user?.id}`, {
        headers: { Authorization: `Bearer ${data.token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch courses");
      const result = await res.json();
      return result.courses || [];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await authClient.token();
      if (error || !data?.token) throw new Error("Authentication failed");
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/courses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${data.token}` },
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Delete failed");
      return result;
    },
    onSuccess: () => {
      toast.success("Course deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["my-courses"] });
      setDeleteId(null);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
      setDeleteId(null);
    },
  });

  if (isPending || isLoading) return <div className="flex min-h-screen items-center justify-center bg-[#050505] text-white">Loading...</div>;
  if (!session) return <div className="flex min-h-screen items-center justify-center bg-[#050505] text-white">Please Login First</div>;

  return (
    <section className="min-h-screen bg-[#050505] py-20 text-white">
      <div className="mx-auto max-w-7xl px-5">
        <h1 className="mb-12 text-4xl font-black uppercase tracking-tighter text-white">
           My Modules
        </h1>

        <div className="border border-gray-900 bg-[#0a0a0a] overflow-hidden">
          {courses.length === 0 ? (
            <div className="p-20 text-center text-gray-500">No Modules Found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#050505] border-b border-gray-900">
                  <tr>
                    <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Asset</th>
                    <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Module</th>
                    <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Category</th>
                    <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Price</th>
                    <th className="p-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">Level</th>
                    <th className="p-6 text-center text-[10px] font-bold uppercase tracking-widest text-gray-400">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-900">
                  {courses.map((course) => (
                    <tr key={course._id} className="hover:bg-[#050505] transition-colors">
                      <td className="p-4">
                        <div className="relative h-16 w-20 border border-gray-800">
                          <Image src={course.image} alt={course.title} fill className="object-cover" />
                        </div>
                      </td>
                      <td className="p-4">
                        <h3 className="font-bold text-white">{course.title}</h3>
                        <p className="line-clamp-1 text-xs text-gray-500">{course.shortDescription}</p>
                      </td>
                      <td className="p-4 text-sm text-gray-400">{course.category}</td>
                      <td className="p-4 font-bold text-cyan-500">${course.price}</td>
                      <td className="p-4">
                        <span className="border border-gray-800 px-3 py-1 text-[10px] font-bold uppercase text-gray-300">
                          {course.level}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center gap-3">
                          <Link href={`/courses/${course._id}`} className="p-2 hover:text-cyan-500 transition-colors">
                            <FaEye />
                          </Link>
                          <button onClick={() => setDeleteId(course._id)} className="p-2 hover:text-red-500 transition-colors">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/80 backdrop-blur-sm p-5">
            <div className="w-full max-w-sm border border-gray-900 bg-[#0a0a0a] p-10">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="font-black uppercase tracking-widest text-white">Delete Module</h2>
                <button onClick={() => setDeleteId(null)} className="text-gray-500 hover:text-white"><FaTimes /></button>
              </div>
              <p className="mb-8 text-sm text-gray-400">Are you sure? This action is irreversible.</p>
              <div className="flex gap-4">
                <button onClick={() => setDeleteId(null)} className="flex-1 border border-gray-800 py-3 font-bold uppercase tracking-widest text-white hover:bg-gray-900">Cancel</button>
                <button onClick={() => deleteMutation.mutate(deleteId)} disabled={deleteMutation.isPending} className="flex-1 bg-red-600 py-3 font-bold uppercase tracking-widest text-white hover:bg-red-700 disabled:opacity-50">
                  {deleteMutation.isPending ? "DELETING..." : "CONFIRM"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}