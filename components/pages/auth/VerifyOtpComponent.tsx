"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useVerifyForgotOtpMutation } from "@/redux/features/auth/authApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import logo from "@/assets/images/logo.png";
import { z } from "zod";

const otpValidationSchema = z.object({
  code: z.string().length(4, "Verification code must be exactly 4 digits."),
});

const VerifyOtpComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const codeParam = searchParams.get("otp") || "";

  const [otp, setOtp] = useState<string[]>(() => {
    if (codeParam && codeParam.length === 4) {
      return codeParam.split("");
    }
    return ["", "", "", ""];
  });
  const [error, setError] = useState<string | null>(null);

  const [verifyForgotOtp, { isLoading }] = useVerifyForgotOtpMutation();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Autofocus or focus last if OTP is in URL
  useEffect(() => {
    if (codeParam && codeParam.length === 4) {
      // Small timeout to allow input rendering before focusing
      setTimeout(() => {
        inputRefs.current[3]?.focus();
      }, 50);
    } else {
      inputRefs.current[0]?.focus();
    }
  }, [codeParam]);

  const handleChange = (value: string, index: number) => {
    // Allow only digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Keep only last typed digit
    setOtp(newOtp);
    setError(null);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (!/^\d{4}$/.test(pastedData)) return;

    const digits = pastedData.split("");
    setOtp(digits);
    setError(null);
    inputRefs.current[3]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const codeStr = otp.join("");

    const validation = otpValidationSchema.safeParse({ code: codeStr });
    if (!validation.success) {
      setError(validation.error.issues[0]?.message || "Invalid verification code.");
      return;
    }

    setError(null);

    try {
      await handleAsyncWithToast(
        async () => {
          const result = await verifyForgotOtp({
            email,
            otp: codeStr,
          }).unwrap();

          // Extract token defensively
          const token = result?.result?.forgetToken || "";

          // Proceed to reset-password page carrying the verified email and token
          router.push(
            `/auth/reset-password?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`
          );
          return result;
        },
        true,
        "Verifying code...",
        "OTP verified successfully!"
      );
    } catch {
      // Error toast already shown by handleAsyncWithToast
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

      {/* Right Column - Verification Form Section */}
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
              Check your Email
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* OTP Code Inputs */}
            <div className="flex justify-between gap-4 max-w-[340px] mx-auto">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  id={`otp-${index}`}
                  className={`w-14 h-14 sm:w-16 sm:h-16 border text-center text-2xl font-bold rounded-2xl outline-none transition-all duration-200 bg-white ${
                    error
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/20 text-red-950"
                      : "border-gray-200 focus:border-[#801c3e] focus:ring-1 focus:ring-[#801c3e]/20 text-gray-950"
                  }`}
                />
              ))}
            </div>

            {error && (
              <p className="text-[13px] text-red-500 text-center font-medium animate-fade-in -mt-4">
                {error}
              </p>
            )}

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

export default VerifyOtpComponent;
