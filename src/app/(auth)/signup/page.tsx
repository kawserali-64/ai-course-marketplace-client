"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Input, Label } from "@heroui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";

type Errors = {
  name?: string;
  email?: string;
  image?: string;
  password?: string;
};

export default function SignupPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const image = String(formData.get("image") ?? "").trim();
    const password = String(formData.get("password") ?? "").trim();

    const newErrors: Errors = {};

    if (!name) {
      newErrors.name = "Full name is required";
    } else if (name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    } else if (name.length > 50) {
      newErrors.name = "Name cannot exceed 50 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    const imageRegex = /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif|svg)$/i;
    if (!image) {
      newErrors.image = "Profile image URL is required";
    } else if (!imageRegex.test(image)) {
      newErrors.image = "Please enter a valid image URL";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be minimum 8 characters";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Password needs one uppercase letter";
    } else if (!/[a-z]/.test(password)) {
      newErrors.password = "Password needs one lowercase letter";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "Password needs one number";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message ?? "Something went wrong");
      return;
    }

    toast.success("Account created successfully!");
    router.push("/");
    router.refresh();
  };

  const handleGoogleSignup = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] px-4 py-12">
      <div className="w-full max-w-[400px] rounded-3xl border border-gray-800 bg-[#0a0a0a] p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-black text-white">
            Create an account
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Get started with your free account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <div className="flex flex-col gap-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-cyan-500" htmlFor="name">Full Name</Label>
            <Input id="name" name="name" placeholder="John Doe" className="h-12 rounded-xl bg-[#050505] border-gray-800 focus:border-cyan-500" />
            {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-cyan-500" htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="name@example.com" className="h-12 rounded-xl bg-[#050505] border-gray-800 focus:border-cyan-500" />
            {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-cyan-500" htmlFor="image">Profile Image URL</Label>
            <Input id="image" name="image" type="url" placeholder="https://example.com/avatar.jpg" className="h-12 rounded-xl bg-[#050505] border-gray-800 focus:border-cyan-500" />
            {errors.image && <p className="text-xs text-red-400">{errors.image}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-xs font-bold uppercase tracking-widest text-cyan-500" htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="h-12 rounded-xl w-full bg-[#050505] border-gray-800 focus:border-cyan-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-400"
              >
                {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-400">{errors.password}</p>}
          </div>

          <Button type="submit" className="h-12 w-full rounded-xl bg-cyan-600 font-bold text-white hover:bg-cyan-500 transition-all">
            Create account
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
            onPress={handleGoogleSignup}
            className="h-12 w-full rounded-xl border border-gray-800 bg-[#111] text-gray-300 hover:bg-[#1a1a1a]"
          >
            <FcGoogle size={18} />
            Google
          </Button>
        </form>

        <p className="mt-8 text-center text-xs text-gray-500">
          Already have an account?{" "}
          <Link href="/signin" className="font-bold text-cyan-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}