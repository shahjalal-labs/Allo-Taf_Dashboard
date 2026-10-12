"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trash2, 
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  FileText,
  Mail,
  ShieldAlert
} from "lucide-react";
import { Container } from "@/components/ui-library/container";
import { Heading, Text } from "@/components/ui-library/typography";

interface Step {
  number: number;
  title: string;
  shortDesc: string;
  description: string;
  action: string;
  badgeText: string;
  image: string;
  arrowTarget: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: "Access the Login Screen",
    shortDesc: "Log in to your account first",
    description: "Open the Allô Taf application on your mobile device. If you are not already logged in, enter your registered E-mail Address in the login input field.",
    action: "Type your email address and tap the 'Continue' button to log in.",
    badgeText: "Auth Required",
    image: "/images/delete-profile-steps/step1_login.jpg",
    arrowTarget: "Email input and Continue button"
  },
  {
    number: 2,
    title: "Navigate to Profile Tab",
    shortDesc: "Go to your user profile",
    description: "Once logged in and on the home dashboard, locate the bottom navigation bar. You'll see options for Home, Mission, Alerts, and Profile.",
    action: "Tap the 'Profile' icon at the bottom right corner of the navigation bar.",
    badgeText: "Dashboard",
    image: "/images/delete-profile-steps/step2_profile_tab.jpg",
    arrowTarget: "Profile tab in navigation bar"
  },
  {
    number: 3,
    title: "Select 'Delete Account'",
    shortDesc: "Choose deletion from menu",
    description: "Your Profile page displays your avatar, name, and account management settings. In the options menu list, locate the option highlighted in red text.",
    action: "Tap on the 'Delete Account' option with the trash can icon.",
    badgeText: "Settings Menu",
    image: "/images/delete-profile-steps/step3_delete_account.jpg",
    arrowTarget: "Delete Account menu item"
  },
  {
    number: 4,
    title: "Confirm Account Deletion",
    shortDesc: "Confirm the permanent action",
    description: "A secure confirmation popup will appear asking 'Are you sure you want to delete your account?'. This step protects your account from accidental deletion.",
    action: "Tap the red 'Delete' button to confirm. Your profile and data will be permanently wiped.",
    badgeText: "Final Confirmation",
    image: "/images/delete-profile-steps/step4_confirm.jpg",
    arrowTarget: "Red 'Delete' button in modal"
  }
];

export default function DeleteProfileStepsPage() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const nextStep = () => {
    if (activeStepIndex < steps.length - 1) {
      setActiveStepIndex(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950 pb-24 transition-colors duration-300">
 

      {/* Main Interactive Guide Section */}
      <Container size="xl" className="mt-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Main Grid: Desktop split-screen, Mobile single stack */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Interactive Steps List (Lg: 7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Stepper progress indicator */}
              <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm flex items-center justify-between gap-4">
                <span className="text-xs font-bold text-gray-450 dark:text-zinc-500 uppercase tracking-wider">
                  Step {activeStepIndex + 1} of {steps.length}
                </span>
                
                {/* Horizontal Progress bar */}
                <div className="flex-1 max-w-[200px] h-1.5 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: "25%" }}
                    animate={{ width: `${((activeStepIndex + 1) / steps.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <div className="flex gap-1.5">
                  <button
                    onClick={prevStep}
                    disabled={activeStepIndex === 0}
                    className="p-1.5 rounded-lg border border-gray-200 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent dark:border-zinc-800 dark:hover:bg-zinc-850 dark:disabled:hover:bg-transparent transition-all cursor-pointer"
                    aria-label="Previous step"
                  >
                    <ArrowLeft className="w-4 h-4 text-gray-700 dark:text-zinc-300" />
                  </button>
                  <button
                    onClick={nextStep}
                    disabled={activeStepIndex === steps.length - 1}
                    className="p-1.5 rounded-lg border border-gray-200 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent dark:border-zinc-800 dark:hover:bg-zinc-850 dark:disabled:hover:bg-transparent transition-all cursor-pointer"
                    aria-label="Next step"
                  >
                    <ArrowRight className="w-4 h-4 text-gray-700 dark:text-zinc-300" />
                  </button>
                </div>
              </div>

              {/* Step detail list */}
              <div className="space-y-4">
                {steps.map((step, idx) => {
                  const isActive = activeStepIndex === idx;
                  return (
                    <motion.div
                      key={step.number}
                      className={`p-6 rounded-2xl border transition-all cursor-pointer text-left relative overflow-hidden ${
                        isActive 
                          ? "bg-white dark:bg-zinc-900 border-primary ring-2 ring-primary/10 shadow-md" 
                          : "bg-white/60 dark:bg-zinc-900/40 border-gray-200 hover:border-gray-300 hover:bg-white dark:border-zinc-850 dark:hover:border-zinc-800 dark:hover:bg-zinc-900/80"
                      }`}
                      onClick={() => setActiveStepIndex(idx)}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Active highlight side-bar */}
                      {isActive && (
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
                      )}

                      <div className="flex items-start gap-4">
                        {/* Step Number Circle */}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                          isActive 
                            ? "bg-primary text-white" 
                            : "bg-gray-100 text-gray-550 dark:bg-zinc-800 dark:text-zinc-400"
                        }`}>
                          {step.number}
                        </div>

                        <div className="flex-1 space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h3 className={`font-bold text-base ${
                              isActive ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-zinc-300"
                            }`}>
                              {step.title}
                            </h3>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
                              isActive 
                                ? "bg-primary/10 text-primary" 
                                : "bg-gray-100 text-gray-500 dark:bg-zinc-800 dark:text-zinc-400"
                            }`}>
                              {step.badgeText}
                            </span>
                          </div>

                          <p className="text-xs text-gray-500 dark:text-zinc-400 leading-normal">
                            {step.shortDesc}
                          </p>

                          {/* Expanded Active Step Content */}
                          <AnimatePresence initial={false}>
                            {isActive && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                              >
                                <div className="pt-3 border-t border-gray-100 dark:border-zinc-800 space-y-3 mt-3 text-xs leading-relaxed text-gray-605 dark:text-zinc-300">
                                  <p>{step.description}</p>
                                  
                                  <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-gray-100 dark:border-zinc-800/60 flex items-start gap-2.5">
                                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                    <div>
                                      <span className="font-bold text-gray-800 dark:text-zinc-200 block mb-0.5">Instruction</span>
                                      <p className="text-gray-600 dark:text-zinc-405">{step.action}</p>
                                    </div>
                                  </div>

                                  {/* Inline Mobile Mockup: Hidden on desktop (lg), shown on mobile */}
                                  <div className="block lg:hidden mt-5">
                                    <div className="relative w-full max-w-[260px] mx-auto aspect-[9/18.5] bg-zinc-900 rounded-[38px] p-2 shadow-lg border-4 border-zinc-800 dark:border-zinc-700 ring-6 ring-zinc-950/10 dark:ring-white/5 overflow-hidden">
                                      {/* Speaker Grill & Camera Punch hole */}
                                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-30 flex items-center justify-end px-2">
                                        <div className="w-1.5 h-1.5 bg-zinc-800 rounded-full border border-zinc-900" />
                                      </div>

                                      {/* Inner Screen */}
                                      <div className="w-full h-full bg-white dark:bg-zinc-950 rounded-[30px] overflow-hidden relative border border-black/5 flex flex-col">
                                        {/* Status Bar */}
                                        <div className="h-8 w-full shrink-0 px-4 pt-2.5 flex justify-between items-center z-20 text-[8px] font-bold text-black dark:text-white bg-slate-50/50 dark:bg-zinc-900/50 backdrop-blur-sm select-none border-b border-gray-150 dark:border-zinc-800/50">
                                          <span>
                                            {step.number === 1 ? "11:08" : step.number === 2 ? "11:10" : step.number === 3 ? "11:05" : "11:04"}
                                          </span>
                                          <div className="flex items-center gap-1">
                                            <div className="w-2.5 h-1.5 border border-black dark:border-white rounded-sm p-0.5 flex items-center">
                                              <div className="w-full h-full bg-black dark:bg-white" />
                                            </div>
                                          </div>
                                        </div>

                                        {/* Screen image */}
                                        <div className="flex-1 relative bg-slate-100 dark:bg-zinc-900">
                                          <Image
                                            src={step.image}
                                            alt={`Allo Taf App - ${step.title}`}
                                            fill
                                            className="object-cover object-top"
                                            priority
                                            unoptimized
                                          />
                                        </div>
                                      </div>
                                      
                                      {/* Home Indicator */}
                                      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-zinc-850 dark:bg-zinc-650 rounded-full z-20" />
                                    </div>

                                    {/* Pointer note under the inline image */}
                                    <p className="text-[10px] text-center text-gray-500 dark:text-zinc-450 italic mt-3 leading-snug">
                                      Look for the indicator arrows on the screenshot matching: <strong className="text-gray-700 dark:text-zinc-300 font-semibold">{step.arrowTarget}</strong>
                                    </p>
                                  </div>

                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

            </div>

            {/* Right Column: Smartphone Mockup / Visual Step (Lg: 5 cols) - hidden on mobile/tablet */}
            <div className="hidden lg:flex lg:col-span-5 lg:sticky lg:top-24 flex-col items-center">
              
              {/* Smartphone mockup frame */}
              <div className="relative w-full max-w-[300px] aspect-[9/18.5] bg-zinc-900 rounded-[48px] p-3 shadow-2xl border-4 border-zinc-800 dark:border-zinc-700 ring-12 ring-zinc-950/10 dark:ring-white/5 overflow-hidden">
                {/* Speaker Grill & Camera Punch hole (Dynamic Island styling) */}
                {/* <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-30 flex items-center justify-end px-3">
                  <div className="w-2.5 h-2.5 bg-zinc-800 rounded-full border border-zinc-900" />
                </div> */}

                {/* Inner Screen Border */}
                <div className="w-full h-full bg-white dark:bg-zinc-950 rounded-[38px] overflow-hidden relative border border-black/5 flex flex-col">
                  
                  {/* Status Bar Mockup overlay */}
                  {/* <div className="h-10 w-full shrink-0 px-6 pt-3 flex justify-between items-center z-20 text-[10px] font-bold text-black dark:text-white bg-slate-50/50 dark:bg-zinc-900/50 backdrop-blur-sm select-none border-b border-gray-150 dark:border-zinc-800/50">
                    <span>
                      {activeStepIndex === 0 ? "11:08" : activeStepIndex === 1 ? "11:10" : activeStepIndex === 2 ? "11:05" : "11:04"}
                    </span>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-2 border border-black dark:border-white rounded-sm p-0.5 flex items-center">
                        <div className="w-full h-full bg-black dark:bg-white" />
                      </div>
                    </div>
                  </div> */}

                  {/* Active Step Screenshot Container */}
                  <div className="flex-1 relative bg-slate-100 dark:bg-zinc-900 overflow-y-auto slim-scroll">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeStepIndex}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.25 }}
                        className="w-full h-full relative"
                      >
                        <Image
                          src={steps[activeStepIndex].image}
                          alt={`Allo Taf App - ${steps[activeStepIndex].title}`}
                          fill
                          className="object-cover object-top p-1"
                          priority
                          unoptimized
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Home Indicator line */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-zinc-850 dark:bg-zinc-650 rounded-full z-20" />
              </div>

              {/* Screenshot pointer note */}
              <div className="mt-4 text-center max-w-[280px]">
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 dark:text-zinc-500 block mb-1">
                  Visual Guide
                </span>
                <p className="text-xs text-gray-550 dark:text-zinc-450 italic leading-snug">
                  Look for the indicator arrows on the screenshot matching: <strong className="text-gray-700 dark:text-zinc-300 font-semibold">{steps[activeStepIndex].arrowTarget}</strong>
                </p>
              </div>

            </div>

          </div>

          {/* Data Erasure & Compliance Box */}
          <div className="mt-16 bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 rounded-2xl border border-red-100 dark:border-red-900/30 shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div className="space-y-4 text-left">
                <Heading as="h3" size="h5" className="text-gray-955 dark:text-white font-bold">
                  What happens when you delete your profile?
                </Heading>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-gray-650 dark:text-zinc-350 leading-relaxed">
                  <div className="space-y-2">
                    <p className="font-bold text-gray-800 dark:text-zinc-200">
                      Permanent Data Erasure:
                    </p>
                    <p>
                      In compliance with Cameroonian **Law No. 2024/017** on personal data protection, deleting your account is an irreversible action. Once confirmed, all your personal information, uploaded CVs, certificates, application logs, and chat messages are permanently deleted from our primary servers.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-bold text-gray-800 dark:text-zinc-200">
                      Recruitment & Applied Missions:
                    </p>
                    <p>
                      Any active applications you have submitted to employers will be cancelled. Employers will no longer be able to contact you or view your credentials. If you wish to use Allô Taf again in the future, you will need to register a brand new account and set up your profile from scratch.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-zinc-450">
                    <FileText className="w-4 h-4 text-primary shrink-0" />
                    <span>Want to review our privacy terms?</span>
                    <Link href="/privacy-policy" className="font-semibold text-primary hover:underline ml-1">
                      Read Privacy Policy
                    </Link>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-zinc-450">
                    <Mail className="w-4 h-4 text-primary shrink-0" />
                    <span>Have questions or need help?</span>
                    <a href="mailto:privacy@allotaf.com" className="font-semibold text-primary hover:underline ml-1">
                      privacy@allotaf.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}
