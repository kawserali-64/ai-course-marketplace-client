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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setErrors({});

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const image = String(formData.get("image") ?? "").trim();
    const password = String(formData.get("password") ?? "").trim();

    const newErrors: Errors = {};

    // Name validation
    if (!name) {
      newErrors.name = "Full name is required";
    } else if (name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    } else if (name.length > 50) {
      newErrors.name = "Name cannot exceed 50 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Image validation
    const imageRegex =
      /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif|svg)$/i;

    if (!image) {
      newErrors.image = "Profile image URL is required";
    } else if (!imageRegex.test(image)) {
      newErrors.image = "Please enter a valid image URL";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password =
        "Password must be minimum 8 characters";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password =
        "Password needs one uppercase letter";
    } else if (!/[a-z]/.test(password)) {
      newErrors.password =
        "Password needs one lowercase letter";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password =
        "Password needs one number";
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
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

        <h1 className="mb-6 text-center text-3xl font-bold">
          Create Account
        </h1>

        <form
          onSubmit={handleSubmit}
          className="w-full space-y-5"
        >

          <div>
            <Label htmlFor="name">
              Full Name
            </Label>

            <Input
              id="name"
              name="name"
              placeholder="Enter your full name"
              className="w-full"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name}
              </p>
            )}
          </div>


          <div>
            <Label htmlFor="email">
              Email
            </Label>

            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@gmail.com"
              className="w-full"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email}
              </p>
            )}
          </div>


          <div>
            <Label htmlFor="image">
              Profile Image URL
            </Label>

            <Input
              id="image"
              name="image"
              type="url"
              placeholder="https://example.com/photo.jpg"
              className="w-full"
            />

            {errors.image && (
              <p className="mt-1 text-sm text-red-500">
                {errors.image}
              </p>
            )}
          </div>


          <div>
            <Label htmlFor="password">
              Password
            </Label>

            <div className="relative">
              <Input
                id="password"
                name="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                className="w-full pr-10"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <FaEyeSlash size={18} />
                ) : (
                  <FaEye size={18} />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password}
              </p>
            )}
          </div>


          <Button
            type="submit"
            // color="primary"
            className="w-full"
            // isLoading={loading}
          >
            Sign Up
          </Button>
          <Button
            type="button"
            onPress={handleGoogleSignup}
            className="w-full h-12 rounded-xl border-2 border-gray-300 bg-white text-gray-700 font-semibold hover:border-cyan-600 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3"
          >
            <FcGoogle size={22} />
            Continue with Google
          </Button>

        </form>


        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}