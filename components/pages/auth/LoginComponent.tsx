"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import logo from "@/assets/images/logo.png";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required.")
    .email("Please enter a valid email address."),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(6, "Password must be at least 6 characters."),
});

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      validation.error.issues.forEach((issue) => {
        const path = issue.path[0] as "email" | "password";
        if (!fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    try {
      await handleAsyncWithToast(
        async () => {
          const result = await login({ email, password }).unwrap();

          // API response shape: { success, message, result: { userId, role, accessToken, isProfileComplete } }
          const payload = result?.result;
          const token = payload?.accessToken ?? null;

          dispatch(
            setUser({
              user: payload
                ? {
                    userId: payload.userId,
                    role: payload.role,
                    isProfileComplete: payload.isProfileComplete,
                  }
                : null,
              access_token: token,
              refresh_token: null,
            })
          );

          // Redirect to dashboard on success
          router.push("/dashboard");
          return result;
        },
        true,
        "Verifying credentials...",
        "Welcome back! Logged in successfully."
      );
    } catch (err) {
      console.error("Login submission error: ", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full bg-white select-none">
      {/* Left Column - Logo Section (Visible only on MD screens and above) */}
      <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center p-8 bg-white border-r border-gray-100">
        <div className="max-w-[420px] w-full flex flex-col items-center justify-center">
          <Image
            src={logo}
            alt="Allô Taf Logo"
            width={340}
            height={340}
            priority
            className="object-contain animate-fade-in"
            style={{ height: "auto" }}
          />
        </div>
      </div>

      {/* Right Column - Login Form Section */}
      <div className="w-full md:w-1/2 flex flex-col min-h-screen justify-between p-6 sm:p-12 md:p-16 lg:p-24 bg-white">
        {/* Empty header block to align the content nicely */}
        {/* <div className="h-4 md:hidden flex justify-center mt-4">
          <Image
            src={logo}
            alt="Allô Taf Logo"
            width={180}
            height={180}
            priority
            className="object-contain"
            style={{ height: "auto" }}
          />
        </div> */}

        {/* Form Container */}
        <div className="w-full max-w-[400px] mx-auto my-auto flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-[32px] font-bold text-gray-900 tracking-tight leading-none mb-2">
              Login
            </h1>
            <p className="text-[15px] text-gray-500 font-normal">
              {"Let's login into your account first"}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div className="relative w-full">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors((prev) => ({ ...prev, email: undefined }));
                  }
                }}
                placeholder="example@gmail.com"
                className={`w-full px-5 py-4 border rounded-full text-[15px] outline-none transition-all duration-200 bg-white ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/20 text-red-950"
                    : "border-gray-200 focus:border-[#801c3e] focus:ring-1 focus:ring-[#801c3e]/20 text-gray-950"
                }`}
              />
              <label
                htmlFor="email"
                className={`absolute left-5 top-0 -translate-y-1/2 bg-white px-2 text-[13px] font-medium transition-all cursor-text ${
                  errors.email ? "text-red-500" : "text-gray-500"
                }`}
              >
                Email Address
              </label>
              {errors.email && (
                <p className="text-[13px] text-red-500 mt-2 px-5 font-medium animate-fade-in">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors((prev) => ({ ...prev, password: undefined }));
                  }
                }}
                placeholder="••••••"
                className={`w-full px-5 py-4 border rounded-full text-[15px] outline-none transition-all duration-200 bg-white pr-12 ${
                  errors.password
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/20 text-red-950"
                    : "border-gray-200 focus:border-[#801c3e] focus:ring-1 focus:ring-[#801c3e]/20 text-gray-950"
                }`}
              />
              <label
                htmlFor="password"
                className={`absolute left-5 top-0 -translate-y-1/2 bg-white px-2 text-[13px] font-medium transition-all cursor-text ${
                  errors.password ? "text-red-500" : "text-gray-500"
                }`}
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-450 stroke-[1.5]" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-450 stroke-[1.5]" />
                )}
              </button>
              {errors.password && (
                <p className="text-[13px] text-red-500 mt-2 px-5 font-medium animate-fade-in">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end mt-1">
              <a
                href="/auth/forgot-password"
                className="text-[14px] font-semibold text-gray-900 hover:text-[#801c3e] transition-colors duration-150"
              >
                Forgot password?
              </a>
            </div>

            {/* Log in Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#801c3e] hover:bg-[#6c1734] disabled:bg-[#801c3e]/70 text-white font-medium text-[16px] rounded-full transition-all duration-200 shadow-sm shadow-[#801c3e]/10 hover:shadow-md cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Log in"
              )}
            </button>
          </form>
        </div>

        {/* Footer block */}
        <div className="text-center mt-12 text-[13px] font-normal text-gray-500">
          © 2026 Allo Taf. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
