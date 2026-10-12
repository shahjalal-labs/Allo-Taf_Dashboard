import React, { Suspense } from "react";
import VerifyOtpComponent from "@/components/pages/auth/VerifyOtpComponent";

const VerifyOtpPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#801c3e]"></div>
      </div>
    }>
      <VerifyOtpComponent />
    </Suspense>
  );
};

export default VerifyOtpPage;
