import Link from "next/link";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaGraduationCap,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 bg-gray-950 text-gray-400">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-extrabold text-white"
          >
            <span className="rounded-lg bg-cyan-600 p-2 text-white">
              <FaGraduationCap />
            </span>
            <span>AI Course</span>
          </Link>

          <p className="text-sm leading-relaxed text-gray-400">
            Discover, learn, and grow with high-quality AI courses from expert
            instructors. Build your future with the power of Artificial
            Intelligence.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">
            Quick Links
          </h3>

          <ul className="space-y-4">
            <li>
              <Link
                href="/"
                className="transition-colors duration-300 hover:text-cyan-400"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/courses"
                className="transition-colors duration-300 hover:text-cyan-400"
              >
                Courses
              </Link>
            </li>

            <li>
              <Link
                href="/about"
                className="transition-colors duration-300 hover:text-cyan-400"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                className="transition-colors duration-300 hover:text-cyan-400"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">
            Contact
          </h3>

          <ul className="space-y-4 text-sm">
            <li className="transition-colors hover:text-cyan-400">
              Email: support@aicourse.com
            </li>

            <li className="transition-colors hover:text-cyan-400">
              Phone: +880 1234-567890
            </li>

            <li className="text-gray-500">Rajshahi, Bangladesh</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">
            Follow Us
          </h3>

          <div className="flex gap-4">
            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-800 bg-gray-900 transition-all duration-300 hover:border-cyan-500 hover:text-blue-500"
            >
              <FaFacebookF size={18} />
            </a>

            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-800 bg-gray-900 transition-all duration-300 hover:border-cyan-500 hover:text-sky-500"
            >
              <FaLinkedinIn size={18} />
            </a>

            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-800 bg-gray-900 transition-all duration-300 hover:border-cyan-500 hover:text-white"
            >
              <FaGithub size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-900 py-6 text-center text-xs text-gray-500">
        © 2026 AI Course Marketplace. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;