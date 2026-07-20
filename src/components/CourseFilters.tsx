"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";

export default function CourseFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === "All") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    params.delete("page");

    router.push(`/courses?${params.toString()}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      updateQuery("search", search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="mb-10 rounded-3xl border border-gray-800 bg-[#0a0a0a] p-6 shadow-2xl">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-800 bg-[#050505] py-3 pl-4 pr-12 text-white outline-none transition focus:border-cyan-500"
          />
          <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-500" />
        </div>

        {/* Category */}
        <select
          defaultValue={searchParams.get("category") || "All"}
          onChange={(e) => updateQuery("category", e.target.value)}
          className="rounded-xl border border-gray-800 bg-[#050505] px-4 py-3 text-gray-400 outline-none focus:border-cyan-500"
        >
          <option value="All">All Categories</option>
          <option value="AI">AI</option>
          <option value="Web Development">Web Development</option>
          <option value="Data Science">Data Science</option>
          <option value="Cyber Security">Cyber Security</option>
          <option value="UI/UX Design">UI/UX Design</option>
        </select>

        {/* Level */}
        <select
          defaultValue={searchParams.get("level") || "All"}
          onChange={(e) => updateQuery("level", e.target.value)}
          className="rounded-xl border border-gray-800 bg-[#050505] px-4 py-3 text-gray-400 outline-none focus:border-cyan-500"
        >
          <option value="All">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        {/* Sort */}
        <select
          defaultValue={searchParams.get("sort") || ""}
          onChange={(e) => updateQuery("sort", e.target.value)}
          className="rounded-xl border border-gray-800 bg-[#050505] px-4 py-3 text-gray-400 outline-none focus:border-cyan-500"
        >
          <option value="">Default Sort</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
          <option value="rating">Highest Rating</option>
          <option value="students">Most Students</option>
          <option value="new">Newest First</option>
        </select>
      </div>
    </div>
  );
}