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
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg text-cyan-600"></span>
      </div>
    );
  }

  const user = session?.user;

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-semibold text-red-500">
          User not found. Please sign in.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto w-full max-w-6xl px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            My Profile
          </h1>

          <p className="mt-2 text-gray-500">
            View your account information
          </p>
        </div>

        {/* Profile Card */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <Image
              src={user.image || "/user.png"}
              width={120}
              height={120}
              alt={user.name || "Profile"}
              className="h-[120px] w-[120px] rounded-full border-4 border-cyan-500 object-cover"
            />

            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-800">
                {user.name || "Unknown User"}
              </h2>

              <p className="mt-1 text-gray-500">
                House Rental Member
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="flex items-center gap-4 rounded-xl bg-gray-100 p-5">
              <FaUser className="text-xl text-cyan-600" />

              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-semibold">
                  {user.name || "Not Available"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl bg-gray-100 p-5">
              <FaEnvelope className="text-xl text-cyan-600" />

              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-semibold">
                  {user.email || "Not Available"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl bg-gray-100 p-5">
              <FaShieldAlt className="text-xl text-cyan-600" />

              <div>
                <p className="text-sm text-gray-500">Account Type</p>
                <p className="font-semibold">
                  {"role" in user ? String(user.role) : "User"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl bg-gray-100 p-5">
              <FaCalendarAlt className="text-xl text-cyan-600" />

              <div>
                <p className="text-sm text-gray-500">Joined</p>
                <p className="font-semibold">
                  {"createdAt" in user && user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "Recently"}
                </p>
              </div>
            </div>
          </div>

          {/* Information */}
          <div className="mt-8 rounded-2xl border border-cyan-100 bg-cyan-50 p-5">
            <h3 className="text-lg font-semibold text-cyan-700">
              Account Information
            </h3>

            <p className="mt-2 text-sm leading-7 text-gray-600">
              This page displays your account information including your profile
              picture, name, email, account type, and join date.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;