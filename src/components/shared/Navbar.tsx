"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaBars, FaTimes, FaGraduationCap } from "react-icons/fa";

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
        ? "text-cyan-700 bg-cyan-50"
        : "text-gray-600 hover:text-cyan-600 hover:bg-cyan-50/50"
        }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/70 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-cyan-600">
          <div className="flex items-center justify-center rounded-lg bg-cyan-600 p-2 text-white">
            <FaGraduationCap size={20} />
          </div>
          <span className="text-gray-900 font-bold">
            AI Course
          </span>
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
            <div className="h-10 w-24 animate-pulse rounded-full bg-gray-100" />
          ) : !user ? (
            <>
              <Link href="/signin" className="text-sm font-semibold text-gray-600 hover:text-cyan-600 transition-colors">Sign In</Link>
              <Link href="/signup" className="rounded-full bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-600/20 hover:bg-cyan-700 transition-all active:scale-95">Sign Up</Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Image src={user.image || "/avatar.png"} alt={user.name || "User"} width={36} height={36} className="h-9 w-9 rounded-full object-cover border border-gray-200" />
                <span className="text-sm font-semibold text-gray-700">{user.name}</span>
              </Link>
              <button onClick={handleLogout} className="rounded-full border border-red-200 px-4 py-2 text-sm text-red-600 transition-all hover:bg-red-50 hover:text-red-700">Logout</button>
            </div>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="text-2xl md:hidden text-gray-600 p-2">
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {open && (
        <div className="absolute top-16 w-full border-b bg-white/95 backdrop-blur-xl p-5 shadow-2xl md:hidden animate-in slide-in-from-top-5 duration-300">
          <nav className="flex flex-col gap-3">
            {navLink("/", "Home")}
            {navLink("/courses", "Courses")}
            {navLink("/about", "About")}
            {navLink("/contact", "Contact")}
            {user && !isPending && (
              <>
                {navLink("/courses/add", "Add Course")}
                {navLink("/courses/my-courses", "My Courses")}
                {navLink("/courses/ai-recommendation", "AI Recommendation")}
                {navLink("/dashboard", "Dashboard")}
                {navLink("/profile", "Profile")}
              </>
            )}
            <div className="mt-4 border-t pt-4">
              {!user ? (
                <div className="flex flex-col gap-3">
                  <Link href="/signin" className="w-full rounded-full py-3 text-center font-semibold text-gray-600">Sign In</Link>
                  <Link href="/signup" className="w-full rounded-full bg-cyan-600 py-3 text-center font-semibold text-white">Sign Up</Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link href="/profile" className="flex items-center gap-3">
                    <Image src={user.image || "/avatar.png"} alt="User" width={40} height={40} className="h-10 w-10 rounded-full" />
                    <span className="font-semibold text-gray-900">{user.name}</span>
                  </Link>
                  <button onClick={handleLogout} className="w-full rounded-full border border-red-200 py-3 text-red-600 hover:bg-red-50 font-semibold">Logout</button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}