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


  const {
    data: courses = [],
    isLoading,
  } = useQuery<Course[]>({
    queryKey: ["my-courses", session?.user?.id],
    enabled: !!session?.user?.id,

    queryFn: async () => {
      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        throw new Error("Authentication failed");
      }


      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/my-courses/${session?.user?.id}`,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );


      if (!res.ok) {
        throw new Error("Failed to fetch courses");
      }


      const result = await res.json();


      return result.courses || [];
    },
  });



  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await authClient.token();


      if (error || !data?.token) {
        throw new Error("Authentication failed");
      }


      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/courses/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );


      const result = await res.json();


      if (!res.ok) {
        throw new Error(
          result.message || "Delete failed"
        );
      }


      return result;
    },


    onSuccess: () => {
      toast.success("Course deleted successfully");


      queryClient.invalidateQueries({
        queryKey: ["my-courses"],
      });


      setDeleteId(null);
    },


    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );


      setDeleteId(null);
    },
  });



  if (isPending || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }



  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Please Login First
      </div>
    );
  }



  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-7xl px-5">

        <h1 className="mb-8 text-3xl font-extrabold text-gray-900">
          My Courses
        </h1>


        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">


          {courses.length === 0 ? (
            <div className="p-16 text-center text-gray-500">
              No Course Found
            </div>
          ) : (            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-5">Image</th>
                    <th className="p-5">Course</th>
                    <th className="p-5">Category</th>
                    <th className="p-5">Price</th>
                    <th className="p-5">Level</th>
                    <th className="p-5 text-center">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {courses.map((course) => (
                    <tr
                      key={course._id}
                      className="hover:bg-gray-50"
                    >
                      <td className="p-4">
                        <div className="relative h-16 w-20 overflow-hidden rounded-lg">
                          <Image
                            src={course.image}
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </td>


                      <td className="p-4">
                        <h3 className="font-bold text-gray-900">
                          {course.title}
                        </h3>

                        <p className="line-clamp-1 text-sm text-gray-500">
                          {course.shortDescription}
                        </p>
                      </td>


                      <td className="p-4 text-gray-600">
                        {course.category}
                      </td>


                      <td className="p-4 font-bold text-cyan-600">
                        ${course.price}
                      </td>


                      <td className="p-4">
                        <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700">
                          {course.level}
                        </span>
                      </td>


                      <td className="p-4">
                        <div className="flex justify-center gap-2">

                          <Link
                            href={`/courses/${course._id}`}
                            className="rounded-lg bg-gray-100 p-2.5 text-gray-600 transition hover:bg-cyan-600 hover:text-white"
                          >
                            <FaEye />
                          </Link>


                          <button
                            onClick={() => setDeleteId(course._id)}
                            className="rounded-lg bg-red-50 p-2.5 text-red-600 transition hover:bg-red-600 hover:text-white"
                          >
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-5">

            <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">


              <div className="mb-5 flex items-center justify-between">

                <h2 className="text-xl font-bold">
                  Delete Course
                </h2>


                <button
                  onClick={() => setDeleteId(null)}
                >
                  <FaTimes />
                </button>

              </div>



              <p className="mb-6 text-sm text-gray-600">
                Are you sure? This action cannot be undone.
              </p>



              <div className="flex gap-3">

                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 rounded-lg bg-gray-100 py-2 font-bold"
                >
                  Cancel
                </button>



                <button
                  onClick={() =>
                    deleteMutation.mutate(deleteId)
                  }
                  disabled={deleteMutation.isPending}
                  className="flex-1 rounded-lg bg-red-600 py-2 font-bold text-white disabled:opacity-50"
                >
                  {deleteMutation.isPending
                    ? "Deleting..."
                    : "Delete"}
                </button>

              </div>


            </div>

          </div>
        )}

      </div>
    </section>
  );
}