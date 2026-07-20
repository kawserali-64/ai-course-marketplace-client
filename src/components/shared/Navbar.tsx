"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaBars, FaGraduationCap } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logout successful");
    setOpen(false);
    router.push("/signin");
    router.refresh();
  };

  const navLink = (href: string, label: string) => (
    <Link
      href={href}
      onClick={() => setOpen(false)}
      className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${pathname === href
          ? "text-cyan-400 bg-cyan-950/30"
          : "text-gray-400 hover:text-cyan-400 hover:bg-gray-800/50"
        }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#050505]/90 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 text-xl font-bold text-white">
          <div className="flex items-center justify-center rounded-lg bg-cyan-600 p-2 text-white">
            <FaGraduationCap size={20} />
          </div>
          <span className="text-white font-bold">AI Course</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLink("/", "Home")}
          {navLink("/courses", "Courses")}
          {navLink("/about", "About")}
          {navLink("/contact", "Contact")}
          {user && !isPending && (
            <>
              {navLink("/courses/add", "Add Course")}
              {navLink("/courses/my-courses", "My Courses")}
              {navLink("/courses/ai-recommendation", "AI Recommendation")}
              {navLink("/courses/dashboard", "Dashboard")}
              {navLink("/courses/profile", "Profile")}
            </>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {isPending ? (
            <div className="h-10 w-24 animate-pulse rounded-full bg-gray-800" />
          ) : !user ? (
            <>
              <Link href="/signin" className="px-4 py-2.5 text-sm font-semibold text-gray-400 hover:text-white transition-colors">Sign In</Link>
              <Link href="/signup" className="rounded-full bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-cyan-500 transition-all">Sign Up</Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/courses/profile" className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-gray-800 transition-all">
                <Image src={user.image || "/avatar.png"} alt={user.name || "User"} width={36} height={36} className="h-9 w-9 rounded-full object-cover border border-gray-700" />
                <span className="text-sm font-semibold text-white">{user.name}</span>
              </Link>
              <button onClick={handleLogout} className="px-4 py-2.5 text-sm font-semibold text-gray-400 hover:text-red-400 rounded-xl transition-all">Logout</button>
            </div>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 transition-all">
          <FaBars size={20} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-[#0a0a0a] border-l border-gray-800 z-50 p-6 shadow-2xl md:hidden"
            >
              <div className="flex justify-end mb-6">
                <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white text-xl">✕</button>
              </div>
              <nav className="flex flex-col gap-4">
                {navLink("/", "Home")}
                {navLink("/courses", "Courses")}
                {navLink("/about", "About")}
                {navLink("/contact", "Contact")}
                {user && !isPending && (
                  <>
                    {navLink("/courses/add", "Add Course")}
                    {navLink("/courses/my-courses", "My Courses")}
                    {navLink("/courses/ai-recommendation", "AI Recommendation")}
                    {navLink("/courses/dashboard", "Dashboard")}
                    {navLink("/courses/profile", "Profile")}
                  </>
                )}
                <div className="mt-6 border-t border-gray-800 pt-6">
                  {!user ? (
                    <div className="flex flex-col gap-3">
                      <Link href="/signin" onClick={() => setOpen(false)} className="w-full py-3 text-center font-semibold text-gray-400">Sign In</Link>
                      <Link href="/signup" onClick={() => setOpen(false)} className="w-full rounded-full bg-cyan-600 py-3 text-center font-semibold text-white">Sign Up</Link>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <Link href="/profile" onClick={() => setOpen(false)} className="flex items-center gap-3">
                        <Image src={user.image || "/avatar.png"} alt="User" width={40} height={40} className="h-10 w-10 rounded-full" />
                        <span className="font-semibold text-white">{user.name}</span>
                      </Link>
                      <button onClick={handleLogout} className="w-full rounded-full border border-red-900/50 py-3 text-red-400 hover:bg-red-950/30 font-semibold">Logout</button>
                    </div>
                  )}
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}