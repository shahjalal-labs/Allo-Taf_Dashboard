"use client";

import React, { useState } from "react";
import {
  Briefcase,
  CheckCircle,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
  MapPin,
  Calendar,
  Coins,
  Clock,
  Mail,
  Phone,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  useGetJobSummaryQuery,
  useGetJobsQuery,
  useDeleteJobMutation,
  useGetJobDetailsQuery,
  TJob,
} from "@/redux/features/job/jobApi";

type TJobItem = {
  id: string;
  name: string;
  location: string;
  city: string;
  date: string;
  duration: string;
  status: "Completed" | "Active";
};

const JobManagementComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  const { data: jobsData, isLoading: isJobsLoading, isFetching: isJobsFetching } = useGetJobsQuery({
    page: currentPage,
    limit: 10,
    sortOrder: "desc",
    sortBy: "id",
  });

  const { data: jobDetailsData, isLoading: isDetailsLoading } = useGetJobDetailsQuery(
    selectedJobId ?? "",
    { skip: !selectedJobId }
  );

  const [deleteJob] = useDeleteJobMutation();

  const jobsList: TJobItem[] = (jobsData?.result?.data ?? []).map((job: TJob) => {
    const isJobActive = new Date(job.visibilityEndDate) >= new Date();
    const dateFormatted = new Date(job.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return {
      id: job.id,
      name: job.title,
      location: job.businessName || job.neighborhood || "N/A",
      city: job.city,
      date: dateFormatted,
      duration: job.work_hours ? `${job.work_hours} hrs` : "N/A",
      status: isJobActive ? "Active" : "Completed",
    };
  });

  const totalPages = jobsData?.result?.meta?.totalPages ?? 1;

  const handleDeleteJob = async (id: string, name: string): Promise<boolean> => {
    const isConfirmed = window.confirm(`Are you sure you want to delete "${name}"?`);
    if (!isConfirmed) return false;

    try {
      await deleteJob(id).unwrap();
      toast.error(`Job "${name}" has been deleted.`);
      return true;
    } catch (err) {
      const errorMsg =
        err && typeof err === "object" && "data" in err
          ? (err as { data?: { message?: string } }).data?.message
          : undefined;
      toast.error(errorMsg || `Failed to delete Job "${name}"`);
      return false;
    }
  };

  const handleViewJob = (id: string) => {
    setSelectedJobId(id);
  };

  const { data: summaryData, isLoading: isSummaryLoading } = useGetJobSummaryQuery();
  const summary = summaryData?.result;

  // Stats Card data
  const stats = [
    {
      title: "Total Jobs",
      value: isSummaryLoading ? "..." : (summary?.totalJobs ?? 0).toLocaleString(),
      icon: <Briefcase className="w-5 h-5 text-emerald-600" />,
      bgIcon: "bg-emerald-50",
      bgCard: "bg-[#ebf8f2]/30",
    },
    {
      title: "Active Jobs",
      value: isSummaryLoading ? "..." : (summary?.activeJobs ?? 0).toLocaleString(),
      icon: <Briefcase className="w-5 h-5 text-amber-600" />,
      bgIcon: "bg-amber-50",
      bgCard: "bg-[#fff9eb]/40",
    },
    {
      title: "Total Applications",
      value: isSummaryLoading ? "..." : (summary?.totalApplications ?? 0).toLocaleString(),
      icon: <CheckCircle className="w-5 h-5 text-rose-600" />,
      bgIcon: "bg-rose-50",
      bgCard: "bg-[#fff0f2]/40",
    },
  ];

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

      {/* Job List Panel */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="bg-white rounded-2xl border border-gray-50/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] overflow-hidden"
      >
        <div className="p-6 border-b border-gray-50">
          <h2 className="text-[20px] font-bold text-gray-950 tracking-tight">
            Job List
          </h2>
        </div>

        <div className="relative w-full overflow-x-auto scrollbar-thin">
          {/* Overlay loading/fetching state */}
          {isJobsFetching && (
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
              <AnimatePresence>
                {isJobsLoading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-400 font-medium">
                      Loading jobs...
                    </td>
                  </tr>
                ) : jobsList.length > 0 ? (
                  jobsList.map((job) => (
                    <motion.tr
                      key={job.id}
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="border-b border-gray-50/40 hover:bg-gray-50/10 transition-colors duration-150"
                    >
                      <td className="py-4 px-6 text-[14px] font-semibold text-gray-800 whitespace-nowrap">
                        {job.name}
                      </td>
                      <td className="py-4 px-6 text-[14px] font-medium text-gray-500 whitespace-nowrap">
                        {job.location}
                      </td>
                      <td className="py-4 px-6 text-[14px] font-medium text-gray-500 whitespace-nowrap">
                        {job.city}
                      </td>
                      <td className="py-4 px-6 text-[14px] font-medium text-gray-500 whitespace-nowrap">
                        {job.date}
                      </td>
                      <td className="py-4 px-6 text-[14px] font-medium text-gray-500 whitespace-nowrap">
                        {job.duration}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span
                          className={`text-[12px] px-3 py-1 rounded-md font-semibold tracking-tight inline-block ${
                            job.status === "Completed"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-sky-50 text-sky-700"
                          }`}
                        >
                          {job.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-center gap-4">
                          <button
                            onClick={() => handleViewJob(job.id)}
                            className="text-amber-500 hover:text-amber-600 transition-colors focus:outline-none cursor-pointer p-1"
                            title="View Job"
                          >
                            <Eye className="w-5 h-5 stroke-[1.8]" />
                          </button>
                          <button
                            onClick={() => handleDeleteJob(job.id, job.name)}
                            className="text-red-500 hover:text-red-650 transition-colors focus:outline-none cursor-pointer p-1"
                            title="Delete Job"
                          >
                            <Trash2 className="w-5 h-5 stroke-[1.8]" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-400 font-medium">
                      No jobs found.
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

      {/* Job Details Modal */}
      <AnimatePresence>
        {selectedJobId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedJobId(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-50 flex items-start justify-between bg-gradient-to-r from-gray-50/50 to-white">
                {isDetailsLoading ? (
                  <div className="space-y-2">
                    <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-2xl font-bold text-gray-955 tracking-tight">
                        {jobDetailsData?.result?.title}
                      </h3>
                      <span
                        className={`text-[12px] px-2.5 py-1 rounded-full font-bold tracking-wider ${
                          jobDetailsData?.result?.urgencyLevel === "URGENT"
                            ? "bg-rose-50 text-rose-700 border border-rose-100"
                            : "bg-amber-50 text-amber-700 border border-amber-100"
                        }`}
                      >
                        {jobDetailsData?.result?.urgencyLevel}
                      </span>
                    </div>
                    <p className="text-gray-500 font-semibold mt-1">
                      {jobDetailsData?.result?.businessName}
                    </p>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  {!isDetailsLoading && jobDetailsData?.result && (
                    <button
                      onClick={async () => {
                        const deleted = await handleDeleteJob(jobDetailsData.result.id, jobDetailsData.result.title);
                        if (deleted) {
                          setSelectedJobId(null);
                        }
                      }}
                      className="p-2 text-red-500 hover:text-red-650 hover:bg-red-50 rounded-xl transition-all cursor-pointer mr-1"
                      title="Delete Job"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedJobId(null)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100/50 rounded-xl transition-all cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-8 flex-1 scrollbar-thin">
                {isDetailsLoading ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
                        <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse" />
                        <div className="h-4 w-4/6 bg-gray-100 rounded animate-pulse" />
                      </div>
                      <div className="h-40 bg-gray-50 rounded-2xl animate-pulse" />
                    </div>
                  </div>
                ) : jobDetailsData?.result ? (
                  <>
                    {/* 2-Column Details Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                      {/* Left Column: Job Description and Info (3/5 width) */}
                      <div className="md:col-span-3 space-y-6">
                        <div className="space-y-3">
                          <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                            Job Description
                          </h4>
                          <p className="text-gray-700 leading-relaxed font-medium">
                            {jobDetailsData.result.description}
                          </p>
                        </div>

                        {jobDetailsData.result.skills && jobDetailsData.result.skills.length > 0 && (
                          <div className="space-y-3">
                            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                              Skills Required
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {jobDetailsData.result.skills.map((skill, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-semibold rounded-lg border border-gray-100/70"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Job Details Grid */}
                        <div className="grid grid-cols-2 gap-4 pt-2">
                          <div className="flex items-center gap-3 p-3 bg-gray-50/50 border border-gray-100/50 rounded-2xl">
                            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                              <Coins className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-400 font-semibold">Remuneration</p>
                              <p className="text-sm font-bold text-gray-900">
                                {jobDetailsData.result.remuneration.toLocaleString()} CFA
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 p-3 bg-gray-50/50 border border-gray-100/50 rounded-2xl">
                            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                              <Clock className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-400 font-semibold">Work Hours</p>
                              <p className="text-sm font-bold text-gray-900">
                                {jobDetailsData.result.work_hours} hrs/day
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 p-3 bg-gray-50/50 border border-gray-100/50 rounded-2xl">
                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                              <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-400 font-semibold">Location</p>
                              <p className="text-sm font-bold text-gray-900 truncate">
                                {jobDetailsData.result.city}, {jobDetailsData.result.neighborhood}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 p-3 bg-gray-50/50 border border-gray-100/50 rounded-2xl">
                            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                              <Calendar className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-400 font-semibold">Visibility Dates</p>
                              <p className="text-[11px] font-bold text-gray-900">
                                {new Date(jobDetailsData.result.visibilityStartDate).toLocaleDateString(undefined, { month: "short", day: "numeric" })} - {new Date(jobDetailsData.result.visibilityEndDate).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Employer Card (2/5 width) */}
                      <div className="md:col-span-2 bg-gray-50/50 border border-gray-100/70 p-6 rounded-2xl flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                          <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                            Employer Info
                          </h4>
                          <div className="flex items-center gap-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            {jobDetailsData.result.employer?.profileImage ? (
                              <img
                                src={jobDetailsData.result.employer.profileImage}
                                alt={jobDetailsData.result.employer?.fullName || "Employer"}
                                className="w-14 h-14 rounded-2xl object-cover border border-gray-100"
                              />
                            ) : (
                              <div className="w-14 h-14 bg-gradient-to-tr from-[#801c3e] to-[#a02c52] text-white flex items-center justify-center text-xl font-bold rounded-2xl">
                                {jobDetailsData.result.employer?.fullName?.[0]?.toUpperCase() || "E"}
                              </div>
                            )}
                            <div>
                              <h5 className="font-bold text-gray-900 text-base">
                                {jobDetailsData.result.employer?.fullName || jobDetailsData.result.businessName || "Employer"}
                              </h5>
                              <p className="text-xs text-gray-500 font-semibold">
                                {jobDetailsData.result.employer?.city || jobDetailsData.result.city || "Douala"}, {jobDetailsData.result.employer?.neighborhood || jobDetailsData.result.neighborhood || ""}
                              </p>
                            </div>
                          </div>

                          {jobDetailsData.result.employer?.bio && (
                            <p className="text-xs text-gray-600 italic font-medium leading-relaxed">
                              &ldquo;{jobDetailsData.result.employer.bio}&rdquo;
                            </p>
                          )}

                          <div className="space-y-2 pt-2 border-t border-gray-100">
                            <div className="flex items-center gap-2.5 text-gray-600 text-xs font-semibold">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span className="truncate">{jobDetailsData.result.employer?.email || "N/A"}</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-gray-600 text-xs font-semibold">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span>{jobDetailsData.result.employer?.phoneNumber || "N/A"}</span>
                            </div>
                          </div>
                        </div>

                        {/* {jobDetailsData.result.whatsApp && (
                          <a
                            href={`https://wa.me/${jobDetailsData.result.whatsApp.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(37,211,102,0.2)] hover:shadow-none"
                          >
                            <MessageSquare className="w-4 h-4 fill-white" />
                            Message on WhatsApp
                          </a>
                        )} */}
                      </div>
                    </div>

                    {/* Applicants List Section */}
                    <div className="space-y-4 pt-6 border-t border-gray-50">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          Applicants ({jobDetailsData.result.applicantStats.total})
                        </h4>
                      </div>

                      {jobDetailsData.result.recentApplicants.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {jobDetailsData.result.recentApplicants.map((applicantItem) => (
                            <div
                              key={applicantItem.id}
                              className="p-4 bg-gray-50/30 border border-gray-100/70 rounded-2xl flex gap-3 hover:border-gray-200/80 transition-all"
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              {applicantItem.applicant?.profileImage ? (
                                <img
                                  src={applicantItem.applicant.profileImage}
                                  alt={applicantItem.applicant?.fullName || "Applicant"}
                                  className="w-12 h-12 rounded-xl object-cover border border-gray-100"
                                />
                              ) : (
                                <div className="w-12 h-12 bg-gray-100 text-gray-600 flex items-center justify-center text-lg font-bold rounded-xl border border-gray-200/50">
                                  {applicantItem.applicant?.fullName?.[0]?.toUpperCase() || "A"}
                                </div>
                              )}
                              <div className="flex-1 space-y-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                  <p className="font-bold text-sm text-gray-900 truncate">
                                    {applicantItem.applicant?.fullName || "Applicant"}
                                  </p>
                                  <span
                                    className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                                      applicantItem.status === "PENDING"
                                        ? "bg-amber-50 text-amber-700"
                                        : applicantItem.status === "APPROVED"
                                        ? "bg-emerald-50 text-emerald-700"
                                        : "bg-gray-100 text-gray-700"
                                    }`}
                                  >
                                    {applicantItem.status}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-500 font-semibold truncate">
                                  {applicantItem.applicant?.email || 'N/A'} • {applicantItem.applicant?.phoneNumber || 'N/A'}
                                </p>
                                <p className="text-[10px] text-gray-400 font-medium">
                                  Applied on {new Date(applicantItem.appliedAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-400 font-medium py-4 text-center">
                          No applicants yet.
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-gray-400 font-medium py-12 text-center">
                    Failed to load job details.
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default JobManagementComponent;
