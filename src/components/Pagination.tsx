"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", page.toString());

    router.push(`/courses?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="mt-14 flex flex-wrap items-center justify-center gap-2">
      <button
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
        className="rounded-xl border border-gray-800 bg-[#0a0a0a] px-4 py-2 text-gray-400 transition hover:border-cyan-500 hover:bg-cyan-950/30 hover:text-cyan-400 disabled:cursor-not-allowed disabled:opacity-30"
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;

        return (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`h-11 w-11 rounded-xl border transition ${
              currentPage === page
                ? "border-cyan-600 bg-cyan-600 text-white"
                : "border-gray-800 bg-[#0a0a0a] text-gray-400 hover:border-gray-600 hover:bg-[#111]"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
        className="rounded-xl border border-gray-800 bg-[#0a0a0a] px-4 py-2 text-gray-400 transition hover:border-cyan-500 hover:bg-cyan-950/30 hover:text-cyan-400 disabled:cursor-not-allowed disabled:opacity-30"
      >
        Next
      </button>
    </div>
  );
}