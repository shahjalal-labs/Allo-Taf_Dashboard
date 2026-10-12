"use client";

import React, { useState, useRef } from "react";
import { ChevronRight, Eye, EyeOff, Pencil, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { z } from "zod";
import {
  useChangePasswordMutation,
  useGetMeQuery,
  useUpdateUserMutation,
} from "@/redux/features/auth/authApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";

const passwordSchema = z
  .object({
    oldPassword: z.string().min(1, "Old password is required."),
    newPassword: z
      .string()
      .min(1, "New password is required.")
      .min(8, "New password must be at least 8 characters."),
    confirmPassword: z.string().min(1, "Confirmation password is required."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New passwords do not match.",
    path: ["confirmPassword"],
  });

const SettingComponent = () => {
  const [activeTab, setActiveTab] = useState<"basic" | "account">("basic");

  // API hooks
  const { data: profileData, isLoading: isProfileLoading, refetch } = useGetMeQuery(undefined);
  const [updateUser, { isLoading: isSavingBasic }] = useUpdateUserMutation();

  // Profile Form States
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [bio, setBio] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Password Form States
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passErrors, setPassErrors] = useState<{
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  const [changePassword, { isLoading: isChangingPassword }] =
    useChangePasswordMutation();

  // Populate profile form states when API loads
  React.useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    if (profileData?.result) {
      const user = profileData.result;
      setDisplayName(user.fullName || "");
      setEmail(user.email || "");
      setPhoneNumber(user.phoneNumber || "");
      setCity(user.city || "");
      setNeighborhood(user.neighborhood || "");
      setBio(user.bio || "");
      setProfilePhoto(
        user.profileImage || "");
    }
  }, [profileData]);

  // Photo change handler
  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setProfilePhoto(url);
      toast.success("Profile photo updated successfully!");
    }
  };

  // Submit profile settings
  const handleBasicSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!displayName.trim()) {
      toast.error("Full name is required.");
      return;
    }

    const trimmedPhone = phoneNumber.trim();
    if (trimmedPhone && !/^\+[1-9]\d{1,14}$/.test(trimmedPhone)) {
      toast.error("Invalid phone format. Please include country code (e.g. +237655873688)");
      return;
    }

    try {
      await handleAsyncWithToast(
        async () => {
          const formData = new FormData();
          formData.append("fullName", displayName.trim());
          formData.append("phoneNumber", phoneNumber.trim());
          formData.append("city", city.trim());
          formData.append("neighborhood", neighborhood.trim());
          formData.append("bio", bio.trim());
          if (selectedFile) {
            formData.append("profileImage", selectedFile);
          }

          const result = await updateUser(formData).unwrap();
          refetch();
          setSelectedFile(null); // Clear selected file after successful save
          return result;
        },
        true,
        "Saving profile...",
        "Profile saved successfully!"
      );
    } catch (err) {
      const errorDetails =
        err && typeof err === "object" && "data" in err
          ? (err as { data?: unknown }).data
          : err && typeof err === "object" && "message" in err
          ? (err as { message?: string }).message
          : err;
      console.error("Save profile error:", errorDetails);
    }
  };

  // Submit password settings
  const handlePassSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = passwordSchema.safeParse({
      oldPassword,
      newPassword,
      confirmPassword,
    });

    if (!validation.success) {
      const fieldErrors: typeof passErrors = {};
      validation.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof typeof passErrors;
        if (!fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      });
      setPassErrors(fieldErrors);
      return;
    }

    setPassErrors({});

    try {
      await handleAsyncWithToast(
        async () => {
          const result = await changePassword({
            oldPassword,
            newPassword,
          }).unwrap();
          // Clear fields on success
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
          return result;
        },
        true,
        "Updating password...",
        "Password changed successfully.",
      );
    } catch (err) {
      const errorDetails =
        err && typeof err === "object" && "data" in err
          ? (err as { data?: unknown }).data
          : err && typeof err === "object" && "message" in err
          ? (err as { message?: string }).message
          : err;
      console.error("Change password error:", errorDetails);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start w-full mx-auto select-none">
      {/* 1. Left Sub-navigation Panel */}
      <div className="w-full lg:w-[280px] bg-white rounded-2xl border border-gray-100/70 p-3 lg:p-4 flex flex-row lg:flex-col gap-2 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]">
        <button
          onClick={() => setActiveTab("basic")}
          className={`flex items-center justify-center lg:justify-between w-full px-5 py-3 lg:py-4 rounded-xl text-[14px] font-semibold transition-all duration-200 cursor-pointer ${
            activeTab === "basic"
              ? "bg-[#801c3e] text-white"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 bg-gray-50/40 lg:bg-transparent"
          }`}
        >
          <span>Basic</span>
          <ChevronRight className="hidden lg:block w-4 h-4" />
        </button>

        <button
          onClick={() => setActiveTab("account")}
          className={`flex items-center justify-center lg:justify-between w-full px-5 py-3 lg:py-4 rounded-xl text-[14px] font-semibold transition-all duration-200 cursor-pointer ${
            activeTab === "account"
              ? "bg-[#801c3e] text-white"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 bg-gray-50/40 lg:bg-transparent"
          }`}
        >
          <span>Account</span>
          <ChevronRight className="hidden lg:block w-4 h-4" />
        </button>
      </div>

      {/* 2. Right Form Content Panel */}
      <div className="flex-1 w-full bg-white rounded-2xl border border-gray-100/70 p-6 md:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)]">
        {isProfileLoading ? (
          <div className="flex items-center justify-center min-h-[300px] w-full">
            <Loader2 className="w-8 h-8 animate-spin text-[#801c3e]" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {activeTab === "basic" ? (
              <motion.div
                key="basic"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <h2 className="text-[18px] font-bold text-gray-950 tracking-tight pb-3 border-b border-gray-50">
                  Profile Information
                </h2>

                <form onSubmit={handleBasicSubmit} className="space-y-6">
                  {/* Photo profile upload */}
                  <div className="space-y-2">
                    <span className="text-[13px] font-medium text-gray-500">
                      Photo Profile
                    </span>
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden group bg-orange-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={profilePhoto || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=240"}
                        alt="Photo profile"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={handlePhotoClick}
                        className="absolute bottom-1 right-1 bg-white p-1.5 rounded-lg shadow-md border border-gray-100 hover:bg-gray-50 text-gray-700 transition-transform hover:scale-105 cursor-pointer focus:outline-none flex items-center justify-center"
                      >
                        <Pencil className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* Display Name Input */}
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="displayName"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      required
                      className="w-full px-5 py-4 border border-gray-200 rounded-lg text-[14px] font-semibold outline-none transition-all duration-200 focus:border-[#801c3e] focus:ring-1 focus:ring-[#801c3e]/20 text-gray-950 bg-white"
                    />
                    <label
                      htmlFor="displayName"
                      className="absolute left-5 top-0 -translate-y-1/2 bg-white px-2 text-[12px] font-medium text-gray-400"
                    >
                      Display Name
                    </label>
                  </div>

                  {/* Email Input (Disabled) */}
                  <div className="relative w-full">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      disabled
                      className="w-full px-5 py-4 border border-gray-100 rounded-lg text-[14px] font-semibold text-gray-400 bg-gray-50 outline-none cursor-not-allowed"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-5 top-0 -translate-y-1/2 bg-white px-2 text-[12px] font-medium text-gray-400"
                    >
                      Email
                    </label>
                  </div>

                  {/* Phone Number Input */}
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="phoneNumber"
                      value={phoneNumber}
                      placeholder="+237655873688"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-5 py-4 border border-gray-200 rounded-lg text-[14px] font-semibold outline-none transition-all duration-200 focus:border-[#801c3e] focus:ring-1 focus:ring-[#801c3e]/20 text-gray-950 bg-white"
                    />
                    <label
                      htmlFor="phoneNumber"
                      className="absolute left-5 top-0 -translate-y-1/2 bg-white px-2 text-[12px] font-medium text-gray-400"
                    >
                      Phone Number (e.g. +237655873688)
                    </label>
                  </div>

                  {/* City and Neighborhood Input */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* City Selection */}
                    <div className="relative w-full">
                      <input
                        type="text"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-5 py-4 border border-gray-200 rounded-lg text-[14px] font-semibold outline-none transition-all duration-200 focus:border-[#801c3e] focus:ring-1 focus:ring-[#801c3e]/20 text-gray-950 bg-white"
                      />
                      <label
                        htmlFor="city"
                        className="absolute left-5 top-0 -translate-y-1/2 bg-white px-2 text-[12px] font-medium text-gray-400"
                      >
                        City
                      </label>
                    </div>

                    {/* Neighborhood Selection */}
                    <div className="relative w-full">
                      <input
                        type="text"
                        id="neighborhood"
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        className="w-full px-5 py-4 border border-gray-200 rounded-lg text-[14px] font-semibold outline-none transition-all duration-200 focus:border-[#801c3e] focus:ring-1 focus:ring-[#801c3e]/20 text-gray-950 bg-white"
                      />
                      <label
                        htmlFor="neighborhood"
                        className="absolute left-5 top-0 -translate-y-1/2 bg-white px-2 text-[12px] font-medium text-gray-400"
                      >
                        Neighborhood
                      </label>
                    </div>
                  </div>

                  {/* Bio Input */}
                  <div className="relative w-full">
                    <textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={3}
                      className="w-full px-5 py-4 border border-gray-200 rounded-lg text-[14px] font-semibold outline-none transition-all duration-200 focus:border-[#801c3e] focus:ring-1 focus:ring-[#801c3e]/20 text-gray-950 bg-white resize-none"
                    />
                    <label
                      htmlFor="bio"
                      className="absolute left-5 top-0 -translate-y-1/2 bg-white px-2 text-[12px] font-medium text-gray-400"
                    >
                      Bio
                    </label>
                  </div>

                  {/* Save Button */}
                  <button
                    type="submit"
                    disabled={isSavingBasic}
                    className="px-8 py-3.5 bg-[#801c3e] hover:bg-[#6c1734] disabled:bg-[#801c3e]/70 text-white font-semibold text-[14px] rounded-lg transition-colors cursor-pointer focus:outline-none flex items-center justify-center gap-2"
                  >
                    {isSavingBasic ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save"
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
            <motion.div
              key="account"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-[18px] font-bold text-gray-950 tracking-tight pb-3 border-b border-gray-50">
                Password
              </h2>

              <form onSubmit={handlePassSubmit} className="space-y-6">
                {/* Old Password Input */}
                <div className="relative w-full">
                  <input
                    type={showOld ? "text" : "password"}
                    id="oldPassword"
                    value={oldPassword}
                    onChange={(e) => {
                      setOldPassword(e.target.value);
                      if (passErrors.oldPassword) {
                        setPassErrors((prev) => ({
                          ...prev,
                          oldPassword: undefined,
                        }));
                      }
                    }}
                    placeholder="Input your old password"
                    className={`w-full px-5 py-4 border rounded-lg text-[14px] outline-none transition-all duration-200 bg-white pr-12 ${
                      passErrors.oldPassword
                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/20 text-red-950"
                        : "border-gray-200 focus:border-[#801c3e] focus:ring-1 focus:ring-[#801c3e]/20 text-gray-950"
                    }`}
                  />
                  <label
                    htmlFor="oldPassword"
                    className={`absolute left-5 top-0 -translate-y-1/2 bg-white px-2 text-[12px] font-medium transition-all ${
                      passErrors.oldPassword ? "text-red-500" : "text-gray-400"
                    }`}
                  >
                    Old Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowOld(!showOld)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none cursor-pointer"
                  >
                    {showOld ? (
                      <EyeOff className="w-5 h-5 stroke-[1.5]" />
                    ) : (
                      <Eye className="w-5 h-5 stroke-[1.5]" />
                    )}
                  </button>
                  {passErrors.oldPassword && (
                    <p className="text-[12px] text-red-500 mt-2 px-1 font-medium animate-fade-in">
                      {passErrors.oldPassword}
                    </p>
                  )}
                </div>

                {/* New Password Input */}
                <div className="relative w-full">
                  <input
                    type={showNew ? "text" : "password"}
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      if (passErrors.newPassword) {
                        setPassErrors((prev) => ({
                          ...prev,
                          newPassword: undefined,
                        }));
                      }
                    }}
                    placeholder="Input your new password"
                    className={`w-full px-5 py-4 border rounded-lg text-[14px] outline-none transition-all duration-200 bg-white pr-12 ${
                      passErrors.newPassword
                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/20 text-red-950"
                        : "border-gray-200 focus:border-[#801c3e] focus:ring-1 focus:ring-[#801c3e]/20 text-gray-950"
                    }`}
                  />
                  <label
                    htmlFor="newPassword"
                    className={`absolute left-5 top-0 -translate-y-1/2 bg-white px-2 text-[12px] font-medium transition-all ${
                      passErrors.newPassword ? "text-red-500" : "text-gray-400"
                    }`}
                  >
                    New Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none cursor-pointer"
                  >
                    {showNew ? (
                      <EyeOff className="w-5 h-5 stroke-[1.5]" />
                    ) : (
                      <Eye className="w-5 h-5 stroke-[1.5]" />
                    )}
                  </button>
                  <p className="text-[11px] text-gray-450 mt-1.5 px-1 font-medium tracking-tight">
                    Min 8 Characters with a combination of letters and numbers
                  </p>
                  {passErrors.newPassword && (
                    <p className="text-[12px] text-red-500 mt-2 px-1 font-medium animate-fade-in">
                      {passErrors.newPassword}
                    </p>
                  )}
                </div>

                {/* Confirmation New Password Input */}
                <div className="relative w-full">
                  <input
                    type={showConfirm ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (passErrors.confirmPassword) {
                        setPassErrors((prev) => ({
                          ...prev,
                          confirmPassword: undefined,
                        }));
                      }
                    }}
                    placeholder="confirmation your new password"
                    className={`w-full px-5 py-4 border rounded-lg text-[14px] outline-none transition-all duration-200 bg-white pr-12 ${
                      passErrors.confirmPassword
                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/20 text-red-950"
                        : "border-gray-200 focus:border-[#801c3e] focus:ring-1 focus:ring-[#801c3e]/20 text-gray-950"
                    }`}
                  />
                  <label
                    htmlFor="confirmPassword"
                    className={`absolute left-5 top-0 -translate-y-1/2 bg-white px-2 text-[12px] font-medium transition-all ${
                      passErrors.confirmPassword
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                  >
                    Confirmation New Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none cursor-pointer"
                  >
                    {showConfirm ? (
                      <EyeOff className="w-5 h-5 stroke-[1.5]" />
                    ) : (
                      <Eye className="w-5 h-5 stroke-[1.5]" />
                    )}
                  </button>
                  {passErrors.confirmPassword && (
                    <p className="text-[12px] text-red-500 mt-2 px-1 font-medium animate-fade-in">
                      {passErrors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Save Button */}
                <button
                  type="submit"
                  disabled={isChangingPassword}
                  className="px-8 py-3.5 bg-[#801c3e] hover:bg-[#6c1734] disabled:bg-[#801c3e]/70 text-white font-semibold text-[14px] rounded-lg transition-colors cursor-pointer focus:outline-none flex items-center justify-center gap-2"
                >
                  {isChangingPassword ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default SettingComponent;
