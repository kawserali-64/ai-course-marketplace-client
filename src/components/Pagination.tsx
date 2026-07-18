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
        className="rounded-xl border px-4 py-2 transition hover:bg-cyan-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;

        return (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`h-11 w-11 rounded-xl border transition ${currentPage === page
                ? "border-cyan-600 bg-cyan-600 text-white"
                : "hover:bg-cyan-50"
              }`}
          >
            {page}
          </button>
        );
      })}

      <button
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
        className="rounded-xl border px-4 py-2 transition hover:bg-cyan-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>

    </div>
  );
}