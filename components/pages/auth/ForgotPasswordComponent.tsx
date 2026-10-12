"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import logo from "@/assets/images/logo.png";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required.")
    .email("Please enter a valid email address."),
});

const ForgotPasswordComponent = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ email?: string }>({});
  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = forgotPasswordSchema.safeParse({ email });
    if (!validation.success) {
      const fieldErrors: { email?: string } = {};
      validation.error.issues.forEach((issue) => {
        const path = issue.path[0] as "email";
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
          const result = await forgotPassword({ email }).unwrap();
          const otp = result?.result || "";
          // Redirect to OTP verification page with email and otp as query params
          router.push(
            `/auth/verify-otp?email=${encodeURIComponent(email)}${
              otp ? `&otp=${encodeURIComponent(otp)}` : ""
            }`
          );
          return result;
        },
        true,
        "Sending verification code...",
        "Verification code sent! Check your email."
      );
    } catch {
      // Error toast already shown by handleAsyncWithToast
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

      {/* Right Column - Forgot Password Form Section */}
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
            <h1 className="text-[32px] font-bold text-gray-900 tracking-tight leading-none mb-4">
              Forgot password
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            {/* Remember password link */}
            <div className="text-[14px] text-gray-500 font-normal mt-2">
              Remember the password ?{" "}
              <Link
                href="/auth/login"
                className="font-semibold text-gray-900 hover:text-[#801c3e] transition-colors duration-150 ml-1"
              >
                Log in
              </Link>
            </div>

            {/* Send Code Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#801c3e] hover:bg-[#6c1734] disabled:bg-[#801c3e]/70 text-white font-medium text-[16px] rounded-full transition-all duration-200 shadow-sm shadow-[#801c3e]/10 hover:shadow-md cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Code"
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

export default ForgotPasswordComponent;
