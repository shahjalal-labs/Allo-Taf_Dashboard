"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import logo from "@/assets/images/logo.png";
import { z } from "zod";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "New password is required.")
      .min(6, "New password must be at least 6 characters.")
      .refine((val) => /[A-Z]/.test(val), {
        message: "Password must contain at least one uppercase letter.",
      })
      .refine((val) => /[a-z]/.test(val), {
        message: "Password must contain at least one lowercase letter.",
      })
      .refine((val) => /[!@#$%^&*(),.?":{}|<>_]/.test(val), {
        message: "Password must contain at least one special character.",
      }),
    confirmPassword: z.string().min(1, "Confirm password is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const ResetPasswordComponent = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});

  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [isLoading, setIsLoading] = useState(false);

  // Guard against missing token
  React.useEffect(() => {
    if (!token) {
      router.push("/auth/forgot-password");
    }
  }, [token, router]);

  console.log(token);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = resetPasswordSchema.safeParse({ password, confirmPassword });
    if (!validation.success) {
      const fieldErrors: { password?: string; confirmPassword?: string } = {};
      validation.error.issues.forEach((issue) => {
        const path = issue.path[0] as "password" | "confirmPassword";
        if (!fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      await handleAsyncWithToast(
        async () => {
          const res = await fetch("/api/proxy/auth/reset-password", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
            body: JSON.stringify({ newPassword: password }),
          });

          if (!res.ok) {
            const errData = await res.json().catch(() => ({}));
            throw errData;
          }

          const result = await res.json();
          // Route back to login on success
          router.push("/auth/login");
          return result;
        },
        true,
        "Updating password...",
        "Password reset successfully! Please log in."
      );
    } catch {
      // Error is handled by handleAsyncWithToast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full bg-white select-none">
      {/* Left Column - Logo Section */}
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

      {/* Right Column - Reset Password Form Section */}
      <div className="w-full md:w-1/2 flex flex-col min-h-screen justify-between p-6 sm:p-12 md:p-16 lg:p-24 bg-white">
        {/* Mobile Header Logo */}
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
            <h1 className="text-[32px] font-bold text-gray-900 tracking-tight leading-none mb-6">
              Input the new password
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password Field */}
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
                New password
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

            {/* Confirm New Password Field */}
            <div className="relative w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) {
                    setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                  }
                }}
                placeholder="••••••"
                className={`w-full px-5 py-4 border rounded-full text-[15px] outline-none transition-all duration-200 bg-white pr-12 ${
                  errors.confirmPassword
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/20 text-red-950"
                    : "border-gray-200 focus:border-[#801c3e] focus:ring-1 focus:ring-[#801c3e]/20 text-gray-950"
                }`}
              />
              <label
                htmlFor="confirmPassword"
                className={`absolute left-5 top-0 -translate-y-1/2 bg-white px-2 text-[13px] font-medium transition-all cursor-text ${
                  errors.confirmPassword ? "text-red-500" : "text-gray-500"
                }`}
              >
                Confirm new password
              </label>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none cursor-pointer"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-450 stroke-[1.5]" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-450 stroke-[1.5]" />
                )}
              </button>
              {errors.confirmPassword && (
                <p className="text-[13px] text-red-500 mt-2 px-5 font-medium animate-fade-in">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#801c3e] hover:bg-[#6c1734] disabled:bg-[#801c3e]/70 text-white font-medium text-[16px] rounded-full transition-all duration-200 shadow-sm shadow-[#801c3e]/10 hover:shadow-md cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit"
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

export default ResetPasswordComponent;
