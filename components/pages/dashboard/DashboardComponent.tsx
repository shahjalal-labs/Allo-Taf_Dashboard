"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Users,
  DollarSign,
  Eye,
  Trash2,
  TrendingUp,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useGetOverviewStatsQuery } from "@/redux/features/recruiter/recruiterApi";
import { useGetTopJobsQuery } from "@/redux/features/job/jobApi";
import { useGetTotalEarningsQuery } from "@/redux/features/subscription/subscriptionApi";

// Types for stats, chart, table
type TStatItem = {
  title: string;
  value: string;
  icon: React.ReactNode;
  bgIcon: string;
  textColor: string;
};

type TJobItem = {
  id: string;
  name: string;
  location: string;
  city: string;
  date: string;
  duration: string;
  status: "Completed" | "Active";
};

type TChartData = {
  month: string;
  sales: string;
  height: number; // percentage (0-100)
  growth: string;
};

const DashboardComponent = () => {
  const [hoveredBar, setHoveredBar] = useState<TChartData | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Monthly");

  const { data: overviewData, isLoading: isOverviewLoading } = useGetOverviewStatsQuery();
  const { data: earningsData, isLoading: isEarningsLoading } = useGetTotalEarningsQuery();
  const { data: topJobsData, isLoading: isTopJobsLoading } = useGetTopJobsQuery();
  const overview = overviewData?.result;
  const totalEarnings = earningsData?.result?.totalEarnings ?? 0;
  const topJobs = topJobsData?.result || [];

  // Stats Card Data
  const stats: TStatItem[] = [
    {
      title: "Total Jobs",
      value: isOverviewLoading ? "..." : (overview?.totalJobs ?? 0).toLocaleString(),
      icon: <Briefcase className="w-6 h-6 text-orange-500" />,
      bgIcon: "bg-orange-50",
      textColor: "text-orange-500",
    },
    {
      title: "Active Jobs",
      value: isOverviewLoading ? "..." : (overview?.activeJobs ?? 0).toLocaleString(),
      icon: <Briefcase className="w-6 h-6 text-teal-600" />,
      bgIcon: "bg-teal-50",
      textColor: "text-teal-600",
    },
    {
      title: "Total Users",
      value: isOverviewLoading ? "..." : (overview?.totalUsers ?? 0).toLocaleString(),
      icon: <Users className="w-6 h-6 text-emerald-600" />,
      bgIcon: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      title: "Total Earning",
      value: isEarningsLoading ? "..." : `${totalEarnings.toLocaleString()} CFA`,
      icon: <DollarSign className="w-6 h-6 text-sky-600" />,
      bgIcon: "bg-sky-50",
      textColor: "text-sky-600",
    },
  ];

  // Earning Overview Data
  const chartData: TChartData[] = [
    { month: "Jan", sales: "24,050.00", height: 55, growth: "+12%" },
    { month: "Feb", sales: "38,120.00", height: 75, growth: "+35%" },
    { month: "Mar", sales: "28,900.00", height: 60, growth: "+18%" },
    { month: "Apr", sales: "22,400.00", height: 50, growth: "+8%" },
    { month: "May", sales: "34,200.00", height: 68, growth: "+25%" },
    { month: "Jun", sales: "44,058.00", height: 100, growth: "+67%" }, // June active highlight
    { month: "Jul", sales: "29,800.00", height: 58, growth: "+15%" },
    { month: "Aug", sales: "32,450.00", height: 62, growth: "+20%" },
    { month: "Sep", sales: "27,300.00", height: 52, growth: "+10%" },
    { month: "Oct", sales: "20,100.00", height: 42, growth: "+5%" },
    { month: "Nov", sales: "35,600.00", height: 70, growth: "+28%" },
    { month: "Dec", sales: "23,900.00", height: 45, growth: "+9%" },
  ];

  // Top Jobs Table Data
  const [jobs, setJobs] = useState<TJobItem[]>([
    {
      id: "1",
      name: "Event hostess Saturday",
      location: "Event Plus Agency",
      city: "Washington",
      date: "Today",
      duration: "1 day",
      status: "Completed",
    },
    {
      id: "2",
      name: "Event hostess Saturday",
      location: "Event Plus Agency",
      city: "Washington",
      date: "Tommorrow",
      duration: "1 day",
      status: "Active",
    },
    {
      id: "3",
      name: "Event hostess Saturday",
      location: "Event Plus Agency",
      city: "Washington",
      date: "This week",
      duration: "1 day",
      status: "Active",
    },
    {
      id: "4",
      name: "Event hostess Saturday",
      location: "Event Plus Agency",
      city: "Washington",
      date: "This week",
      duration: "1 day",
      status: "Completed",
    },
  ]);

  const handleDeleteJob = (id: string) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* 1. Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className="flex items-center justify-between p-6 bg-white rounded-2xl border border-gray-50/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-[0_4px_25px_-4px_rgba(0,0,0,0.04)]"
          >
            <div className="space-y-2">
              <span className="text-[14px] text-gray-400 font-medium tracking-tight">
                {stat.title}
              </span>
              <h3 className="text-[26px] font-bold text-gray-950 tracking-tight leading-none">
                {stat.value}
              </h3>
            </div>
            <div className={`p-4 rounded-2xl ${stat.bgIcon} flex items-center justify-center`}>
              {stat.icon}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 2. Chart Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-white p-6 rounded-2xl border border-gray-50/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[20px] font-bold text-gray-950 tracking-tight">
            Earning Overview
          </h2>
          <div className="flex items-center gap-6">
            {/* Legend indicator */}
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#801c3e]"></span>
              <span className="text-[13px] text-gray-500 font-medium">Revenue</span>
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-100 rounded-full text-[13px] font-medium text-gray-600 hover:bg-gray-50 transition-colors focus:outline-none cursor-pointer bg-white"
              >
                {selectedFilter}
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              <AnimatePresence>
                {filterDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute right-0 mt-1 w-32 bg-white border border-gray-100 rounded-xl shadow-lg z-10 overflow-hidden"
                  >
                    {["Weekly", "Monthly", "Yearly"].map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setSelectedFilter(item);
                          setFilterDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors focus:outline-none cursor-pointer"
                      >
                        {item}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Custom Interactive SVG / HTML Bar Chart */}
        <div className="relative w-full h-[280px] flex gap-3 sm:gap-4 pt-10 select-none">
          {/* Y-axis Labels */}
          <div className="flex flex-col justify-between pb-8 text-[11px] text-gray-400 font-bold w-6 h-full pointer-events-none text-left">
            <span className="leading-none pt-0.5">120</span>
            <span className="leading-none">90</span>
            <span className="leading-none">70</span>
            <span className="leading-none">40</span>
            <span className="leading-none pb-0.5">0</span>
          </div>

          {/* Chart area container */}
          <div className="relative flex-grow h-full">
            {/* Y-axis Guides */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
              <div className="border-b border-dashed border-gray-100 w-full pt-1" />
              <div className="border-b border-dashed border-gray-100 w-full" />
              <div className="border-b border-dashed border-gray-100 w-full" />
              <div className="border-b border-dashed border-gray-100 w-full" />
              <div className="border-b border-dashed border-gray-100 w-full" />
            </div>

            {/* Earning bars */}
            <div className="relative z-10 w-full flex items-end justify-between h-full pb-8 px-1 sm:px-2">
              {chartData.map((data, index) => {
                // June is index 5, always highlighted
                const isHighlight = index === 5;
                const isHovered = hoveredIndex === index;

                return (
                  <div
                    key={index}
                    className="flex flex-col items-center flex-1 group"
                    onMouseEnter={() => {
                      setHoveredBar(data);
                      setHoveredIndex(index);
                    }}
                    onMouseLeave={() => {
                      setHoveredBar(null);
                      setHoveredIndex(null);
                    }}
                  >
                    <div className="relative w-full flex justify-center h-[180px] items-end">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${data.height}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className={`w-3.5 sm:w-5 md:w-8 lg:w-10 rounded-t-[4px] sm:rounded-t-lg cursor-pointer transition-colors duration-250 ${
                          isHighlight
                            ? "bg-[#801c3e]"
                            : isHovered
                            ? "bg-[#801c3e]/85"
                            : "bg-pink-100"
                        }`}
                      />
                    </div>
                    <span className="text-[9px] xs:text-[10px] sm:text-[12px] font-semibold text-gray-400 mt-3 tracking-tight">
                      {data.month}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Interactive Tooltip Card (positioned absolute relative to the chart area) */}
            <AnimatePresence>
              {hoveredBar && hoveredIndex !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="absolute bg-white border border-gray-100/50 p-4 rounded-xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.06)] z-25 flex flex-col pointer-events-none min-w-[140px]"
                  style={{
                    left: `calc(${(hoveredIndex / 12) * 100}% + 4px)`,
                    bottom: `calc(${hoveredBar.height}% + 12px)`,
                    transform: "translateX(-45%)",
                  }}
                >
                  <span className="text-[12px] font-semibold text-gray-400 tracking-tight leading-none mb-1">
                    {hoveredBar.month}
                  </span>
                  <span className="text-[16px] font-bold text-gray-950 tracking-tight mb-1.5">
                    {hoveredBar.sales}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Total Sales {hoveredBar.growth}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* 3. Top Jobs Table */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="bg-white rounded-2xl border border-gray-50/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] overflow-hidden"
      >
        <div className="p-6 border-b border-gray-50">
          <h2 className="text-[20px] font-bold text-gray-950 tracking-tight">
            Top Jobs
          </h2>
        </div>

        <div className="w-full overflow-x-auto scrollbar-thin">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50/60 bg-gray-50/30">
                <th className="py-4 px-6 text-[13px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Job Name
                </th>
                <th className="py-4 px-6 text-[13px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Location
                </th>
                <th className="py-4 px-6 text-[13px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  City
                </th>
                <th className="py-4 px-6 text-[13px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Date
                </th>
                <th className="py-4 px-6 text-[13px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Duration
                </th>
                <th className="py-4 px-6 text-[13px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Status
                </th>
                <th className="py-4 px-6 text-[13px] font-bold text-gray-500 uppercase tracking-wider text-center whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {isTopJobsLoading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400 font-medium">
                    Loading top jobs...
                  </td>
                </tr>
              ) : topJobs.length > 0 ? (
                topJobs.map((job) => (
                  <tr
                    key={job.id}
                    className="border-b border-gray-50/40 hover:bg-gray-50/10 transition-colors duration-150"
                  >
                    <td className="py-4 px-6 text-[14px] font-semibold text-gray-800 whitespace-nowrap">
                      {job.title}
                    </td>
                    <td className="py-4 px-6 text-[14px] font-medium text-gray-500 whitespace-nowrap">
                      {job.businessName || "N/A"}
                    </td>
                    <td className="py-4 px-6 text-[14px] font-medium text-gray-500 whitespace-nowrap">
                      {job.city || "Douala"}
                    </td>
                    <td className="py-4 px-6 text-[14px] font-medium text-gray-500 whitespace-nowrap">
                      {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="py-4 px-6 text-[14px] font-medium text-gray-500 whitespace-nowrap">
                      {job.applicantCount} applicant{job.applicantCount === 1 ? "" : "s"}
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-[12px] px-3 py-1 rounded-md font-semibold tracking-tight inline-block bg-emerald-50 text-emerald-700">
                        Active
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-4">
                        <Link
                          href="/dashboard/jobs"
                          className="text-amber-500 hover:text-amber-600 transition-colors focus:outline-none cursor-pointer p-1"
                        >
                          <Eye className="w-5 h-5" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400 font-medium">
                    No top jobs available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardComponent;
