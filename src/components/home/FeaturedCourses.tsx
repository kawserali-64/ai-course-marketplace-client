"use client";

import { useQuery } from "@tanstack/react-query";
import CourseCard from "../CourseCard";

interface Course {
  _id: string;
  title: string;
  shortDescription: string;
  image: string;
  price: number;
  category: string;
  instructor: string;
  rating: number;
  students: number;
  level: string;
}

export default function FeaturedCourses() {
  const { data, isLoading } = useQuery({
    queryKey: ["featured-courses"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/featured-courses`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch featured courses");
      }

      return res.json();
    },
  });

  const courses: Course[] = data?.courses || [];

  return (
    <section className="bg-white py-20">
      <div className="mx-auto w-full max-w-7xl px-5">
        {/* Heading */}
        <div className="mb-16 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">
            Featured Courses
          </span>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            Learn From The Best AI Courses
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm text-gray-500 md:text-base">
            Explore our most popular AI courses carefully selected for beginners
            and professionals.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-[400px] w-full animate-pulse rounded-3xl bg-gray-100"
              />
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50 py-20 text-center">
            <h3 className="text-lg font-bold text-gray-800">
              No Featured Courses Found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Check back soon for new AI courses.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}