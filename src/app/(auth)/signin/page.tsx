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
    <div className="flex min-h-screen items-center justify-center bg-[#050505] px-4 py-12">
      <div className="w-full max-w-[400px] rounded-3xl border border-gray-800 bg-[#0a0a0a] p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-black tracking-tight text-white">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Please enter your details to sign in.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-cyan-500" htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              className="h-11 rounded-xl bg-[#050505] border-gray-800 focus:border-cyan-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-cyan-500" htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="h-11 rounded-xl w-full bg-[#050505] border-gray-800 focus:border-cyan-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-400"
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="h-11 w-full rounded-xl bg-cyan-600 font-bold text-white hover:bg-cyan-500 transition-all"
          >
            Sign in
          </Button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest text-gray-500">
              <span className="bg-[#0a0a0a] px-2">Or continue with</span>
            </div>
          </div>
          
          <Button
            type="button"
            onPress={handleDemoLogin}
            className="h-11 w-full rounded-xl border border-gray-800 bg-[#111] text-gray-300 hover:bg-[#1a1a1a]"
          >
            <FaUserShield size={16} className="text-cyan-400" />
            Demo
          </Button>
          
          <Button
            type="button"
            onPress={handleGoogleLogin}
            className="h-11 w-full rounded-xl border border-gray-800 bg-[#111] text-gray-300 hover:bg-[#1a1a1a]"
          >
            <FcGoogle size={18} />
            Google
          </Button>
        </form>

        <div className="mt-8 rounded-xl border border-gray-800 bg-[#050505] p-4 text-[11px] text-gray-500">
          <p className="mb-2 font-bold text-gray-300">Demo Credentials</p>
          <p>Email: demo@houserental.com</p>
          <p>Password: Demo12345</p>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-bold text-cyan-400 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}