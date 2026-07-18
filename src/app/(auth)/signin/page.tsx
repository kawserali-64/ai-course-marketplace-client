"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Input, Label } from "@heroui/react";
import { FaEye, FaEyeSlash, FaUserShield } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";

export default function SignInPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message ?? "Sign in failed");
      return;
    }
    toast.success("Login successful!");
    router.push("/");
    router.refresh();
  };

  const handleDemoLogin = async () => {
    setDemoLoading(true);

    const { error } = await authClient.signIn.email({
      email: "demo@houserental.com",
      password: "Demo12345",
    });

    setDemoLoading(false);

    if (error) {
      toast.error(error.message ?? "Sign in failed");
      return;
    }

    toast.success("Logged in as Demo User");
    router.push("/");
    router.refresh();
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-2 text-center text-3xl font-bold">
          Welcome Back
        </h1>

        <p className="mb-6 text-center text-sm text-gray-500">
          Sign in to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-1">
            <Label htmlFor="email">Email</Label>

            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="password">Password</Label>

            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-cyan-600 text-white"
            // isLoading={loading}
          >
            Sign In
          </Button>

          <Button
            type="button"
            // isLoading={demoLoading}
            onPress={handleDemoLogin}
            className="w-full h-12 rounded-xl bg-white border-2 border-cyan-600 text-cyan-700 font-semibold hover:bg-cyan-600 hover:text-white hover:shadow-xl hover:shadow-cyan-200 transition-all duration-300 flex items-center justify-center gap-2"
          >
            {!demoLoading && <FaUserShield size={18} />}
            Demo Login
          </Button>

          <Button
            type="button"
            onPress={handleGoogleLogin}
            className="w-full h-12 rounded-xl border-2 border-gray-300 bg-white text-gray-700 font-semibold hover:border-cyan-600 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3"
          >
            <FcGoogle size={22} />
            Continue with Google
          </Button>
        </form>

        <div className="mt-6 rounded-xl border bg-gray-50 p-4 text-sm">
          <p className="mb-2 font-semibold">Demo Credentials</p>
          <p>Email: demo@houserental.com</p>
          <p>Password: Demo12345</p>
        </div>

        <div className="mt-6 text-center text-sm">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-primary hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}