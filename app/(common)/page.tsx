"use client";

import { redirect, usePathname } from "next/navigation";

const HomePage = () => {
  const pathname = usePathname();

  // Redirect to dashboard if NOT on privacy-policy, terms or delete-profile
  if (pathname !== "/privacy-policy" && pathname !== "/terms" && pathname !== "/delete-profile") {
    redirect("/dashboard");
  }

  // Otherwise, render nothing or null (since privacy-policy is handled by the layout/route)
  return null;
};

export default HomePage;