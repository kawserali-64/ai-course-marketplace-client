"use client";

import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import {
  FaEnvelope,
  FaUser,
  FaCalendarAlt,
  FaShieldAlt,
} from "react-icons/fa";

const ProfilePage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505] text-cyan-500 font-black tracking-widest">
        LOADING...
      </div>
    );
  }

  const user = session?.user;

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050505] text-red-500 font-bold uppercase tracking-widest">
        Access Denied.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] py-20">
      <div className="mx-auto w-full max-w-5xl px-5">
        
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter"> User Profile</h1>
          <p className="mt-2 text-gray-500 font-mono text-sm">Identity configuration</p>
        </div>

        {/* Profile Card */}
        <div className="border border-gray-900 bg-[#0a0a0a] p-10">
          <div className="flex flex-col items-center gap-8 md:flex-row pb-10 border-b border-gray-900">
            <div className="relative h-32 w-32 border border-gray-800 p-1">
              <Image
                src={user.image || "/user.png"}
                width={120}
                height={120}
                alt={user.name || "Profile"}
                className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all"
              />
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                {user.name || "Unknown User"}
              </h2>
              <p className="mt-2 text-cyan-500 font-mono tracking-widest text-sm uppercase">
                 System Member
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              { icon: FaUser, label: "Name", val: user.name },
              { icon: FaEnvelope, label: "Email", val: user.email },
              { icon: FaShieldAlt, label: "Role", val: "role" in user ? String(user.role) : "User" },
              { 
                icon: FaCalendarAlt, 
                label: "Joined", 
                val: "createdAt" in user && user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Recently" 
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-6 border border-gray-900 bg-[#050505] p-6 hover:border-cyan-500/30 transition-all">
                <div className="text-cyan-500">
                  <item.icon size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">{item.label}</p>
                  <p className="font-bold text-white tracking-wider mt-1">{item.val}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Information */}
          <div className="mt-10 border-t border-gray-900 pt-10">
            <h3 className="font-black text-white uppercase tracking-widest"> Account Integrity</h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-500 max-w-2xl font-mono">
              Secure identity management module. This record confirms your access credentials and system registration timeline.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;