"use client";

import React, { useState } from "react";
import {
  Eye,
  ChevronLeft,
  ChevronRight,
  X,
  CreditCard,
  User,
  Check,
  Ban,
  FileText,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  useGetSubscriptionsQuery,
  useUpdateSubscriptionStatusMutation,
  TSubscription,
} from "@/redux/features/subscription/subscriptionApi";

const SubscriptionComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [selectedSub, setSelectedSub] = useState<TSubscription | null>(null);
  const [adminNote, setAdminNote] = useState<string>("");

  const { data: subscriptionData, isLoading: isSubscriptionsLoading, isFetching: isSubscriptionsFetching } = useGetSubscriptionsQuery({
    page: currentPage,
    limit: 10,
    sortOrder: "desc",
    sortBy: "id",
    status: statusFilter || undefined,
  });

  const [updateStatus, { isLoading: isUpdating }] = useUpdateSubscriptionStatusMutation();

  const subscriptions = subscriptionData?.result?.data ?? [];
  const totalPages = subscriptionData?.result?.meta?.totalPages ?? 1;

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

  const handleUpdateStatus = async (id: string, newStatus: "ACTIVE" | "REJECTED") => {
    if (!adminNote.trim()) {
      toast.error("Please provide an admin note before updating the status.");
      return;
    }

    try {
      await updateStatus({
        id,
        status: newStatus,
        adminNote: adminNote.trim(),
      }).unwrap();
      
      toast.success(`Subscription has been successfully ${newStatus === "ACTIVE" ? "approved" : "rejected"}.`);
      setAdminNote("");
      setSelectedSub(null);
    } catch (err) {
      const errorMsg =
        err && typeof err === "object" && "data" in err
          ? (err as { data?: { message?: string } }).data?.message
          : undefined;
      toast.error(errorMsg || "Failed to update subscription status.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Subscriber List Panel */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl border border-gray-50/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] overflow-hidden"
      >
        <div className="p-6 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-[20px] font-bold text-gray-950 tracking-tight">
            Subscriber List
          </h2>
          {/* Status Tabs */}
          <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100 self-start sm:self-auto select-none">
            {[
              { label: "All", value: "" },
              { label: "Pending", value: "PENDING" },
              { label: "Active", value: "ACTIVE" },
              { label: "Rejected", value: "REJECTED" },
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
          {isSubscriptionsFetching && (
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
                  Subscription Plan
                </th>
                <th className="py-4 px-6 text-[13px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  User Name
                </th>
                <th className="py-4 px-6 text-[13px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Phone no.
                </th>
                <th className="py-4 px-6 text-[13px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Activation Date
                </th>
                <th className="py-4 px-6 text-[13px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  Expiration Date
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
                {isSubscriptionsLoading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-400 font-medium">
                      Loading subscriptions...
                    </td>
                  </tr>
                ) : subscriptions.length > 0 ? (
                  subscriptions.map((sub) => {
                    const statusText =
                      sub.status === "ACTIVE"
                        ? "Approved"
                        : sub.status === "PENDING"
                        ? "Pending"
                        : "Rejected";

                    return (
                      <motion.tr
                        key={sub.id}
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="border-b border-gray-50/40 hover:bg-gray-50/10 transition-colors duration-150"
                      >
                        <td className="py-4 px-6 text-[14px] font-semibold text-gray-800 whitespace-nowrap">
                          {sub.plan}
                        </td>
                        <td className="py-4 px-6 flex items-center gap-3 whitespace-nowrap">
                          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-gray-100 flex-shrink-0 bg-gray-100 flex items-center justify-center">
                            {sub.user?.profileImage ? (
                              <img
                                src={sub.user.profileImage}
                                alt={sub.user?.fullName || "User"}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="font-bold text-[#801c3e] text-xs">
                                {sub.user?.fullName?.[0]?.toUpperCase() || "U"}
                              </span>
                            )}
                          </div>
                          <span className="text-[14px] font-semibold text-gray-800">
                            {sub.user?.fullName || "N/A"}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-[14px] font-medium text-gray-500 whitespace-nowrap">
                          {sub.phoneNumber}
                        </td>
                        <td className="py-4 px-6 text-[14px] font-medium text-gray-500 whitespace-nowrap">
                          {sub.startDate ? new Date(sub.startDate).toLocaleDateString() : "N/A"}
                        </td>
                        <td className="py-4 px-6 text-[14px] font-medium text-gray-500 whitespace-nowrap">
                          {sub.endDate ? new Date(sub.endDate).toLocaleDateString() : "N/A"}
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap">
                          <span
                            className={`text-[12px] px-3 py-1 rounded-md font-semibold tracking-tight inline-block ${
                              statusText === "Approved"
                                ? "bg-emerald-50 text-emerald-700"
                                : statusText === "Pending"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-rose-50/70 text-rose-700"
                            }`}
                          >
                            {statusText}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() => {
                                setSelectedSub(sub);
                                setAdminNote(sub.adminNote || "");
                              }}
                              className="text-amber-500 hover:text-amber-600 transition-colors focus:outline-none cursor-pointer p-1"
                              title="View Details"
                            >
                              <Eye className="w-5 h-5 stroke-[1.8]" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-400 font-medium">
                      No subscribers found.
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

      {/* Subscription Detail Modal */}
      <AnimatePresence>
        {selectedSub && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedSub(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gradient-to-r from-gray-50/50 to-white">
                <div>
                  <h3 className="text-xl font-bold text-gray-955 tracking-tight">
                    Subscription Details
                  </h3>
                  <p className="text-xs text-gray-500 font-semibold mt-0.5">
                    Transaction: {selectedSub.transactionId}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedSub(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100/50 rounded-xl transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 scrollbar-thin">
                {/* 2-Column Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Left Column: User details */}
                  <div className="p-4 bg-gray-50/50 border border-gray-100/50 rounded-2xl space-y-3">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" /> Subscriber Info
                    </h4>
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 bg-gradient-to-tr from-[#801c3e] to-[#a02c52] text-white flex items-center justify-center font-bold rounded-xl flex-shrink-0 text-sm overflow-hidden">
                        {selectedSub.user?.profileImage ? (
                          <img src={selectedSub.user.profileImage} alt={selectedSub.user?.fullName || "User"} className="w-full h-full object-cover rounded-xl" />
                        ) : (
                          selectedSub.user?.fullName?.[0]?.toUpperCase() || "U"
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-950 truncate">
                          {selectedSub.user?.fullName || "No user linked"}
                        </p>
                        <p className="text-xs text-gray-500 font-semibold truncate">
                          {selectedSub.user?.email || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Transaction details */}
                  <div className="p-4 bg-gray-50/50 border border-gray-100/50 rounded-2xl space-y-3">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5" /> Payment Details
                    </h4>
                    <div className="space-y-1.5">
                      <p className="text-xs text-gray-600 font-semibold flex justify-between">
                        <span>Plan:</span>
                        <span className="font-bold text-gray-900">{selectedSub.plan}</span>
                      </p>
                      <p className="text-xs text-gray-600 font-semibold flex justify-between">
                        <span>Amount:</span>
                        <span className="font-bold text-gray-900">{(selectedSub.amount ?? 0).toLocaleString()} CFA</span>
                      </p>
                      <p className="text-xs text-gray-600 font-semibold flex justify-between">
                        <span>Method:</span>
                        <span className="font-bold text-gray-950">{selectedSub.paymentMethod}</span>
                      </p>
                      <p className="text-xs text-gray-600 font-semibold flex justify-between">
                        <span>Phone Number:</span>
                        <span className="font-bold text-gray-950">{selectedSub.phoneNumber}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Proof Image */}
                {selectedSub.proofImage && selectedSub.proofImage.length > 0 ? (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Proof of Payment
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedSub.proofImage.map((img, i) => (
                        <a key={i} href={img} target="_blank" rel="noreferrer" className="block border border-gray-150 rounded-2xl overflow-hidden hover:opacity-90 transition-opacity">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img} alt="Proof" className="w-full h-32 object-cover" />
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Proof of Payment
                    </h4>
                    <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl text-center text-xs font-semibold text-gray-400">
                      No proof of payment uploaded.
                    </div>
                  </div>
                )}

                {/* Admin Verification Input / Note */}
                {selectedSub.status === "PENDING" ? (
                  <div className="p-4 bg-amber-50/30 border border-amber-100/50 rounded-2xl space-y-3">
                    <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" /> Verification Action Required
                    </h4>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-gray-500">Admin Note / Feedback</label>
                      <textarea
                        value={adminNote}
                        onChange={(e) => setAdminNote(e.target.value)}
                        placeholder="Provide details about transaction check, or details of rejection reason..."
                        className="w-full h-20 p-3 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#801c3e] transition-colors resize-none placeholder-gray-400 font-medium"
                      />
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={() => handleUpdateStatus(selectedSub.id, "ACTIVE")}
                        disabled={isUpdating}
                        className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Check className="w-4 h-4" /> Approve
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(selectedSub.id, "REJECTED")}
                        disabled={isUpdating}
                        className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Ban className="w-4 h-4" /> Reject
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl space-y-3.5">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-gray-400" /> Verification Result
                    </h4>
                    <div className="space-y-2">
                      <p className="text-xs text-gray-600 font-semibold flex justify-between">
                        <span>Status:</span>
                        <span className={`font-bold uppercase ${selectedSub.status === "ACTIVE" ? "text-emerald-600" : "text-rose-600"}`}>
                          {selectedSub.status}
                        </span>
                      </p>
                      {selectedSub.verifiedAt && (
                        <p className="text-xs text-gray-600 font-semibold flex justify-between">
                          <span>Verified At:</span>
                          <span className="font-bold text-gray-900">
                            {new Date(selectedSub.verifiedAt).toLocaleDateString()} {new Date(selectedSub.verifiedAt).toLocaleTimeString()}
                          </span>
                        </p>
                      )}
                      {selectedSub.adminNote && (
                        <div className="pt-2 border-t border-gray-100">
                          <p className="text-[11px] font-bold text-gray-400 uppercase">Admin Note</p>
                          <p className="text-xs text-gray-700 font-medium italic mt-1 bg-white p-2.5 rounded-lg border border-gray-100">
                            &ldquo;{selectedSub.adminNote}&rdquo;
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubscriptionComponent;
