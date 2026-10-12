"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Briefcase,
  CreditCard,
  Settings,
  LogOut,
  Bell,
  Menu,
  X,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/images/logo.png";

type TNavigationItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

// Standalone Sidebar component to avoid unstable nested component issues in React
const SidebarContent = ({
  pathname,
  navigationItems,
  setSidebarOpen,
  handleLogout,
}: {
  pathname: string;
  navigationItems: TNavigationItem[];
  setSidebarOpen: (open: boolean) => void;
  handleLogout: () => void;
}) => (
  <div className="flex flex-col h-full justify-between bg-white p-6">
    {/* Top Sidebar (Logo & Menu) */}
    <div className="space-y-8">
      {/* Logo container */}
      <div className="flex items-center px-2">
        <Image
          src={logo}
          alt="Allô Taf Logo"
          width={160}
          height={50}
          priority
          className="object-contain"
          style={{ height: "auto" }}
        />
      </div>

      {/* Menu Links */}
      <nav className="space-y-1">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-[14px] font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-[#801c3e] text-white shadow-sm shadow-[#801c3e]/15"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>

    {/* Bottom Sidebar (Logout) */}
    <div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-3.5 w-full px-4 py-3 rounded-xl text-[14px] font-bold bg-[#fff0f2] hover:bg-[#ffe5e8] text-[#801c3e] transition-all duration-200 cursor-pointer focus:outline-none"
      >
        <LogOut className="w-5 h-5 stroke-[2]" />
        <span>Logout</span>
      </button>
    </div>
  </div>
);

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const token = useAppSelector(useCurrentToken);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !token) {
      router.replace("/auth/login");
    }
  }, [isMounted, token, router]);

  const navigationItems: TNavigationItem[] = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5 stroke-[1.8]" />,
    },
    {
      name: "User Management",
      href: "/dashboard/users",
      icon: <Users className="w-5 h-5 stroke-[1.8]" />,
    },
    {
      name: "Recruiter Management",
      href: "/dashboard/recruiters",
      icon: <UserCheck className="w-5 h-5 stroke-[1.8]" />,
    },
    {
      name: "Job Management",
      href: "/dashboard/jobs",
      icon: <Briefcase className="w-5 h-5 stroke-[1.8]" />,
    },
    {
      name: "Subscription",
      href: "/dashboard/subscriptions",
      icon: <CreditCard className="w-5 h-5 stroke-[1.8]" />,
    },
    {
      name: "Setting",
      href: "/dashboard/settings",
      icon: <Settings className="w-5 h-5 stroke-[1.8]" />,
    },
  ];

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/auth/login" });
  };

  const getHeaderTitle = () => {
    if (pathname === "/dashboard") return "Overview";
    if (pathname === "/dashboard/users") return "User Management";
    if (pathname === "/dashboard/recruiters") return "Recruiter Management";
    if (pathname === "/dashboard/jobs") return "Job Management";
    if (pathname === "/dashboard/subscriptions") return "Subscription";
    if (pathname === "/dashboard/settings") return "Setting";
    return "Overview";
  };

  if (!isMounted || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFCFC] dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#801c3e]" />
          <span className="text-xs font-semibold text-gray-500 dark:text-zinc-400">Verifying session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFEFE] flex">
      {/* 1. Desktop Permanent Sidebar */}
      <aside className="hidden md:block w-[260px] fixed top-0 bottom-0 left-0 bg-white border-r border-gray-100 z-35">
        <SidebarContent
          pathname={pathname}
          navigationItems={navigationItems}
          setSidebarOpen={setSidebarOpen}
          handleLogout={handleLogout}
        />
      </aside>

      {/* 2. Mobile Drawer Navigation Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Dark background Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
            />
            {/* Drawer container panel */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 bottom-0 left-0 w-[260px] bg-white z-50 md:hidden shadow-xl"
            >
              {/* Close Drawer Button */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="absolute right-4 top-5 p-1.5 rounded-lg border border-gray-100 hover:bg-gray-50 focus:outline-none cursor-pointer"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
              <SidebarContent
                pathname={pathname}
                navigationItems={navigationItems}
                setSidebarOpen={setSidebarOpen}
                handleLogout={handleLogout}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 3. Main Dashboard Body Context */}
      <div className="flex-1 md:pl-[260px] flex flex-col min-h-screen min-w-0 overflow-x-hidden">
        {/* Sticky Dashboard Header */}
        <header className="sticky top-0 bg-[#FDFEFE]/80 backdrop-blur-md z-30 border-b border-gray-50/50 py-5 px-6 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Hamburger Button for Mobile screens */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none cursor-pointer"
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-[18px] xs:text-[20px] sm:text-[24px] font-bold text-gray-900 tracking-tight leading-none">
              {getHeaderTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification bell badge */}
            <button className="relative p-2.5 rounded-full border border-gray-100 bg-white hover:bg-gray-50 transition-colors text-gray-600 hover:text-gray-900 cursor-pointer focus:outline-none">
              <Bell className="w-5 h-5 stroke-[1.8]" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full"></span>
            </button>

            {/* Profile Avatar */}
            <Link
              href="/dashboard/settings"
              className="relative w-10 h-10 rounded-full border border-gray-100 overflow-hidden cursor-pointer flex items-center justify-center bg-[#801c3e] text-white font-bold text-sm hover:opacity-90 transition-opacity"
              title="Admin Settings"
            >
              A
            </Link>
          </div>
        </header>

        {/* Dashboard inner content area */}
        <main className="flex-grow p-6 md:p-8 bg-[#FAFCFC] min-w-0 w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
