import Link from "next/link";
import { FaFacebookF, FaGithub, FaLinkedinIn, FaGraduationCap } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-gray-900 bg-[#050505] text-gray-400">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-2 lg:grid-cols-4">
        
        {/* Brand */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-3 text-xl font-black text-white uppercase tracking-tighter">
            <div className="flex h-10 w-10 items-center justify-center bg-cyan-500 text-[#050505]">
              <FaGraduationCap size={20} />
            </div>
            AI Course
          </Link>
          <p className="text-sm leading-relaxed text-gray-500">
            Engineered for the next generation of AI developers. Mastery through practical, high-scale architecture.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-white">
            Navigation
          </h3>
          <ul className="space-y-4 text-sm font-medium">
            {["Home", "Courses", "About", "Contact"].map((item) => (
              <li key={item}>
                <Link href={item === "Home" ? "/" : `/${item.toLowerCase()}`} className="hover:text-cyan-500 transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-white">
            Support
          </h3>
          <ul className="space-y-4 text-sm text-gray-500">
            <li>support@aicourse.com</li>
            <li>+880 1351-965625</li>
            <li className="text-xs">Rajshahi, Bangladesh</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="mb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-white">
            Connect
          </h3>
          <div className="flex gap-3">
            {[FaFacebookF, FaLinkedinIn, FaGithub].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-12 w-12 items-center justify-center border border-gray-900 bg-[#0a0a0a] hover:border-cyan-500 hover:text-cyan-500 transition-all duration-300"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-900 py-8 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-700">
          © 2026 AI Course Marketplace. Built for Performance.
        </p>
      </div>
    </footer>
  );
};

export default Footer;