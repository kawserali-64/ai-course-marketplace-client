import CourseCard from "@/components/CourseCard";
import CourseFilters from "@/components/CourseFilters";
import Pagination from "@/components/Pagination";

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

interface CourseResponse {
  success: boolean;
  courses: Course[];
  total: number;
  currentPage: number;
  totalPages: number;
}

async function getCourses(
  searchParams: Record<string, string | undefined>
): Promise<CourseResponse> {
  const params = new URLSearchParams();

  if (searchParams.search) {
    params.set("search", searchParams.search);
  }

  if (searchParams.category) {
    params.set("category", searchParams.category);
  }

  if (searchParams.level) {
    params.set("level", searchParams.level);
  }

  if (searchParams.sort) {
    params.set("sort", searchParams.sort);
  }

  if (searchParams.page) {
    params.set("page", searchParams.page);
  }

  params.set("limit", "8");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/courses?${params.toString()}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }

  return res.json();
}

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;

  const {
    courses,
    total,
    currentPage,
    totalPages,
  } = await getCourses(params);

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto w-full max-w-6xl px-4">

        {/* Heading */}
        <div className="mb-12 text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-cyan-600">
            Explore AI Courses
          </span>

          <h1 className="mt-4 text-4xl font-extrabold text-gray-900 md:text-6xl">
            Learn AI Skills From Experts
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Browse premium AI courses and improve your skills with
            industry-level instructors.
          </p>
        </div>
        {/* Filters */}
        <CourseFilters />
        {/* Result Count */}
        <div className="mb-8 flex items-center justify-between">
          <p className="font-medium text-gray-600">
            Total Courses:{" "}
            <span className="font-bold text-cyan-600">
              {total}
            </span>
          </p>
        </div>


        {/* Course Grid */}
        {courses.length === 0 ? (
          <div className="rounded-3xl border bg-white p-16 text-center shadow-sm">
            <h2 className="text-3xl font-bold text-gray-800">
              No Courses Found
            </h2>

            <p className="mt-3 text-gray-500">
              Try changing your search or filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
              />
            ))}
          </div>
        )}


        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>

      </div>
    </section>
  );
}