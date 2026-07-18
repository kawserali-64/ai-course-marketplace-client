import Link from "next/link";
import { FaHome, FaSearch } from "react-icons/fa";

export default function NotFound() {
  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-base-100 px-6">
      <div className="max-w-2xl text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-cyan-100">
          <FaSearch className="text-5xl text-cyan-600" />
        </div>

        {/* 404 */}
        <h1 className="text-7xl font-extrabold text-cyan-600">404</h1>

        {/* Title */}
        <h2 className="mt-4 text-3xl font-bold text-base-content">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-lg text-base-content/70">
          The page you are looking for doesn't exist or may have been moved.
          Return to the homepage or continue exploring available rental
          properties.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="btn bg-cyan-600 text-white hover:bg-cyan-700 border-none"
          >
            <FaHome className="mr-2" />
            Back to Home
          </Link>

          <Link
            href="/houses"
            className="btn btn-outline border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white"
          >
            Browse Houses
          </Link>
        </div>
      </div>
    </section>
  );
}