"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  UserCheck,
  UserX,
  Shield,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useGetEmployeeSummaryQuery } from "@/redux/features/recruiter/recruiterApi";
import { useGetUsersQuery } from "@/redux/features/user/userApi";

const UserManagementComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data: usersData, isLoading: isUsersLoading, isFetching: isUsersFetching } = useGetUsersQuery({
    page: currentPage,
    limit: 10,
    role: "EMPLOYEE",
    sortOrder: "desc",
    sortBy: "id",
    status: statusFilter || undefined,
    searchTerm: debouncedSearch || undefined,
  });

  const users = usersData?.result?.data ?? [];
  const totalPages = usersData?.result?.meta?.totalPages ?? 1;

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push("...");
      }
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) {
        pages.push("...");
      }
      pages.push(totalPages);
    }
    return pages;
  };

  const handleToggleStatus = (id: string, name: string, currentStatus: string) => {
    const nextStatus = currentStatus === "Active" ? "Inactive" : "Active";
    toast.success(`User "${name}" status updated to ${nextStatus} (mocked)`);
  };

  const handleDeleteUser = async (id: string, name: string) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${name}"?`);
    if (!confirmDelete) return;

    toast.error(`User "${name}" has been deleted (mocked).`);
  };

  const { data: summaryData, isLoading: isSummaryLoading } = useGetEmployeeSummaryQuery();
  const summary = summaryData?.result;

  // Stats Card data
  const stats = [
    {
      title: "Total Users",
      value: isSummaryLoading ? "..." : (summary?.totalEmployees ?? 0).toLocaleString(),
      icon: <Users className="w-5 h-5 text-emerald-600" />,
      bgIcon: "bg-emerald-50",
      bgCard: "bg-[#ebf8f2]/30",
    },
    {
      title: "Active Users",
      value: isSummaryLoading ? "..." : (summary?.activeEmployees ?? 0).toLocaleString(),
      icon: <UserCheck className="w-5 h-5 text-amber-600" />,
      bgIcon: "bg-amber-50",
      bgCard: "bg-[#fff9eb]/40",
    },
    {
      title: "Inactive Users",
      value: isSummaryLoading ? "..." : (summary?.inactiveEmployees ?? 0).toLocaleString(),
      icon: <UserX className="w-5 h-5 text-rose-600" />,
      bgIcon: "bg-rose-50",
      bgCard: "bg-[#fff0f2]/40",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
            className={`flex items-center justify-between p-6 ${stat.bgCard} rounded-2xl border border-gray-100/40`}
          >
            <div className="space-y-2">
              <span className="text-[14px] text-gray-500 font-semibold tracking-tight">
                {stat.title}
              </span>
              <h3 className="text-[24px] xs:text-[28px] sm:text-[32px] font-bold text-gray-950 tracking-tight leading-none">
                {stat.value}
              </h3>
            </div>
            <div className={`p-4 rounded-full ${stat.bgIcon} flex items-center justify-center`}>
              {stat.icon}
            </div>
          </motion.div>
        ))}
      </div>

      {/* User List Panel */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="bg-white rounded-2xl border border-gray-50/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] overflow-hidden"
      >
        <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <h2 className="text-[20px] font-bold text-gray-955 tracking-tight">
              User List
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full sm:w-60 px-4 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-[#801c3e] pl-9 font-medium placeholder-gray-400"
              />
              <svg
                className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          {/* Status Tabs */}
          <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100 self-start md:self-auto select-none">
            {[
              { label: "All", value: "" },
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Blocked" },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => {
                  setStatusFilter(tab.value);
                  setCurrentPage(1);
                }}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === tab.value
                    ? "bg-[#801c3e] text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative w-full overflow-x-auto scrollbar-thin">
          {/* Overlay loading/fetching state */}
          {isUsersFetching && (
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px] flex items-center justify-center z-10 transition-all duration-200">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-white shadow-lg border border-gray-100 rounded-2xl">
                <span className="w-2 h-2 bg-[#801c3e] rounded-full animate-ping" />
                <span className="text-[11px] font-bold text-gray-700">Fetching latest data...</span>
              </div>
            </div>
          )}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50/60 bg-gray-50/30">
                <th className="py-4 px-6 text-[13px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  User Name
                </th>
                <th className="py-4 px-6 text-[13px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Email Address
                </th>
                <th className="py-4 px-6 text-[13px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Phone no.
                </th>
                <th className="py-4 px-6 text-[13px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  City
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
              <AnimatePresence>
                {isUsersLoading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-400 font-medium">
                      Loading users...
                    </td>
                  </tr>
                ) : users.length > 0 ? (
                  users.map((user) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="border-b border-gray-50/40 hover:bg-gray-50/10 transition-colors duration-150"
                    >
                      <td className="py-4 px-6 flex items-center gap-3 whitespace-nowrap">
                        <div className="relative w-9 h-9 rounded-full overflow-hidden border border-gray-100 flex-shrink-0 bg-gray-100 flex items-center justify-center">
                          {user.profileImage ? (
                            <img
                              src={user.profileImage}
                              alt={user.fullName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="font-bold text-[#801c3e] text-xs">
                              {user.fullName?.[0]?.toUpperCase() || 'U'}
                            </span>
                          )}
                        </div>
                        <span className="text-[14px] font-semibold text-gray-800">
                          {user.fullName}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-[14px] font-medium text-gray-500 whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="py-4 px-6 text-[14px] font-medium text-gray-500 whitespace-nowrap">
                        {user.phoneNumber}
                      </td>
                      <td className="py-4 px-6 text-[14px] font-medium text-gray-500 whitespace-nowrap">
                        {user.city || "N/A"}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span
                          className={`text-[12px] px-3 py-1 rounded-md font-semibold tracking-tight inline-block ${
                            user.status === "Active"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-rose-50/70 text-rose-700"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-4">
                          <button
                            onClick={() => handleToggleStatus(user.id, user.fullName, user.status)}
                            className="text-blue-500 hover:text-blue-600 transition-colors focus:outline-none cursor-pointer p-1"
                            title={user.status === "Active" ? "Block User" : "Activate User"}
                          >
                            <Shield className="w-5 h-5 stroke-[1.8]" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id, user.fullName)}
                            className="text-red-500 hover:text-red-650 transition-colors focus:outline-none cursor-pointer p-1"
                            title="Delete User"
                          >
                            <Trash2 className="w-5 h-5 stroke-[1.8]" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-400 font-medium">
                      No users found.
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-6 bg-white border-t border-gray-50/50 flex items-center justify-end">
          <div className="flex items-center gap-1.5 select-none">
            {/* Prev Button */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-150/70 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent rounded-lg cursor-pointer transition-colors focus:outline-none flex items-center justify-center"
            >
              <ChevronLeft className="w-4 h-4 text-gray-500" />
            </button>

            {getPageNumbers().map((page, index) => {
              if (page === "...") {
                return (
                  <span
                    key={`dots-${index}`}
                    className="text-gray-400 px-1 font-semibold text-[13px]"
                  >
                    ...
                  </span>
                );
              }
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(Number(page))}
                  className={`w-9 h-9 rounded-lg text-[13px] font-bold transition-all focus:outline-none cursor-pointer flex items-center justify-center ${
                    currentPage === page
                      ? "bg-[#801c3e] text-white"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-150/70 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent rounded-lg cursor-pointer transition-colors focus:outline-none flex items-center justify-center"
            >
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserManagementComponent;
