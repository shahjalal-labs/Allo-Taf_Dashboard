"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  Shield, 
  XCircle, 
  Printer, 
  ChevronRight, 
  ArrowLeft,
  Briefcase,
  MapPin,
  FileText,
  AlertCircle,
  Scale,
  Users,
  Compass,
  FileCheck,
  Server,
  Lock,
  Globe,
  BookOpen
} from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui-library/container";
import { Heading, Text } from "@/components/ui-library/typography";

interface Chapter {
  id: string;
  title: string;
}

const chapters: Chapter[] = [
  { id: "intro", title: "1. Introduction & Scope" },
  { id: "identity", title: "2. Who We Are & Definitions" },
  { id: "collect", title: "3. What We Collect" },
  { id: "roles", title: "4. Data by User Role" },
  { id: "legalities", title: "5. Legal Basis & Purposes" },
  { id: "services", title: "6. Services, Cookies & Push" },
  { id: "sharing", title: "7. Sharing, Security & Retention" },
  { id: "rights", title: "8. Your Rights & Contacts" },
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState<string>("intro");
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  
  const introRef = useRef<HTMLDivElement>(null);
  const identityRef = useRef<HTMLDivElement>(null);
  const collectRef = useRef<HTMLDivElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);
  const legalitiesRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const sharingRef = useRef<HTMLDivElement>(null);
  const rightsRef = useRef<HTMLDivElement>(null);

  const chapterRefs = {
    intro: introRef,
    identity: identityRef,
    collect: collectRef,
    roles: rolesRef,
    legalities: legalitiesRef,
    services: servicesRef,
    sharing: sharingRef,
    rights: rightsRef,
  };

  // Scroll spy to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250; // Offset for header/navbar

      const refs = [
        { id: "intro", ref: introRef },
        { id: "identity", ref: identityRef },
        { id: "collect", ref: collectRef },
        { id: "roles", ref: rolesRef },
        { id: "legalities", ref: legalitiesRef },
        { id: "services", ref: servicesRef },
        { id: "sharing", ref: sharingRef },
        { id: "rights", ref: rightsRef },
      ];

      for (const chapter of refs) {
        const element = chapter.ref.current;
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(chapter.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = chapterRefs[id as keyof typeof chapterRefs]?.current;
    if (element) {
      const top = element.offsetTop - 100; // Account for sticky nav
      window.scrollTo({
        top,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950 pb-20 print:bg-white print:pb-0 transition-colors duration-300">


      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-14 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 print:bg-white print:border-none print:py-0">
        {/* Visual Background Orbs */}
        <div className="absolute top-0 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none dark:bg-primary/3 print:hidden" />
        <div className="absolute bottom-0 right-1/4 translate-y-1/2 w-[400px] h-[400px] rounded-full bg-blue-primary/5 blur-3xl pointer-events-none dark:bg-blue-primary/3 print:hidden" />

        <Container size="xl" className="relative">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F8F3] dark:bg-primary/10 text-primary text-xs font-semibold mb-5"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Digitalising Trust in Cameroon</span>
            </motion.div>

            <Heading 
              as="h1" 
              size="h2" 
              className="text-gray-900 dark:text-white font-extrabold tracking-tight"
              animate={true}
              motionProps={{
                initial: { opacity: 0, y: 15 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.1 }
              }}
            >
              Privacy Policy
            </Heading>

            <Text 
              size="lg" 
              color="muted" 
              className="mt-4 leading-relaxed max-w-2xl"
              animate={true}
              motionProps={{
                initial: { opacity: 0, y: 15 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.2 }
              }}
            >
              We replace closed, word-of-mouth recruitment networks with an open, verified, and skills-based system. Protecting your personal data is at the heart of building that trust.
            </Text>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mt-6 text-xs text-gray-500 dark:text-zinc-400 font-medium print:text-black"
            >
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>Douala & Cameroon Wide</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-zinc-700 hidden sm:block" />
              <div>
                <span>Version 1.0  ·  Effective August 3, 2026</span>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 3. Main Layout Wrapper */}
      <Container size="xl" className="mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Desktop Table of Contents Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 print:hidden">
            <div className="sticky top-28 p-6 rounded-2xl bg-white border border-gray-200 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-450 dark:text-zinc-500 mb-4">
                Policy Sections
              </h3>
              <nav className="space-y-1.5">
                {chapters.map((chapter) => {
                  const isActive = activeSection === chapter.id;
                  return (
                    <button
                      key={chapter.id}
                      onClick={() => scrollToSection(chapter.id)}
                      className={`w-full flex items-center justify-between text-left px-3 py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        isActive 
                          ? "bg-[#E8F8F3] text-primary dark:bg-primary/10" 
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-850"
                      }`}
                    >
                      <span className="truncate">{chapter.title}</span>
                      {isActive && <ChevronRight className="w-4 h-4 shrink-0 text-primary" />}
                    </button>
                  );
                })}
              </nav>
              
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-zinc-800">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-gray-100 dark:border-zinc-800/60">
                  <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-gray-800 dark:text-zinc-200">Legal Compliance</h4>
                    <p className="text-[11px] text-gray-500 dark:text-zinc-450 mt-1 leading-normal">
                      Designed in compliance with Law No. 2024/017 relating to personal data protection in Cameroon.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="col-span-1 lg:col-span-3 space-y-8 print:col-span-4 print:space-y-6">
            
            {/* Chapter 1: Introduction and Scope */}
            <div 
              ref={introRef}
              id="intro"
              className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 print:border-none print:p-0 print:shadow-none"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-zinc-800 mb-6">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Shield className="w-5 h-5" />
                </div>
                <Heading as="h2" size="h4" className="text-gray-900 dark:text-white font-bold">
                  1. Introduction and Scope
                </Heading>
              </div>

              <div className="space-y-5 text-gray-700 dark:text-zinc-300 leading-relaxed text-sm">
                <p className="text-justify">
                  Allô Taf is a job-matching and professional networking platform operating primarily in Douala and elsewhere in the Republic of Cameroon. Our purpose is to replace closed, word-of-mouth recruitment networks with an open, verified and skills-based system — in short, to digitalise trust rather than favouritism. Doing that credibly requires us to handle personal data carefully, and to be honest about how we handle it.
                </p>
                
                <div className="p-5 rounded-xl bg-gradient-to-br from-[#E8F8F3] to-white border border-primary/20 dark:from-zinc-800 dark:to-zinc-900 dark:border-zinc-800">
                  <h4 className="text-sm font-bold text-primary dark:text-[#00A693] mb-2 flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4" />
                    Our Core Purpose
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-zinc-400 leading-relaxed text-justify">
                    By validating candidate skills and standardizing recruiter criteria, we seek to establish a level playing field for Cameroon&apos;s job market. We make it easy for employers to source verified talent and for candidates to win roles based on merit, not connections.
                  </p>
                </div>

                <p className="text-justify">
                  This Privacy Policy explains what personal data we collect, why we collect it, on what legal basis, who we share it with, how long we keep it, how we protect it, and what rights you have over it.
                </p>

                <h3 className="text-sm font-bold text-gray-950 dark:text-white pt-2">1.1 What this policy covers</h3>
                <p className="text-justify">
                  This Privacy Policy applies strictly to the data processing practices under Allô Taf&apos;s direct operations, including:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>The website <code className="px-1.5 py-0.5 rounded bg-slate-105 dark:bg-zinc-800 font-mono text-xs text-primary">allotaf.com</code> and all of its sub-pages, landing pages and registration forms;</li>
                  <li>The Allô Taf mobile application for Android, distributed through the Google Play Store;</li>
                  <li>The registration, recruitment and enterprise sign-up forms we operate, including forms accessed by scanning an Allô Taf QR code;</li>
                  <li>Communications you exchange with our team by email, telephone or messaging applications in connection with the platform.</li>
                </ul>

                <h3 className="text-sm font-bold text-gray-955 dark:text-white pt-2">1.2 What this policy does not cover</h3>
                <p className="text-justify">
                  To guarantee full transparency, this policy does not extend to operations outside the control of Allô Taf:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Websites, applications or social media pages operated by third parties, including employers who advertise on Allô Taf, even where we link to them;</li>
                  <li>The internal recruitment processes of employers once they have contacted you outside the platform. From that point the employer acts as an independent controller of your data and its own privacy practices apply;</li>
                  <li>The messaging or telecommunications providers you choose to use to reach us.</li>
                </ul>
              </div>
            </div>

            {/* Chapter 2: Who We Are & Definitions */}
            <div 
              ref={identityRef}
              id="identity"
              className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 print:border-none print:p-0 print:shadow-none"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-zinc-800 mb-6">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Scale className="w-5 h-5" />
                </div>
                <Heading as="h2" size="h4" className="text-gray-900 dark:text-white font-bold">
                  2. Who We Are & Definitions
                </Heading>
              </div>

              <div className="space-y-5 text-gray-700 dark:text-zinc-300 leading-relaxed text-sm">
                <p className="text-justify">
                  For the purposes of data protection law, the controller of the personal data described in this policy — that is, the entity that determines why and how your data is processed — is detailed below.
                </p>

                <h3 className="text-sm font-bold text-gray-950 dark:text-white pt-2">Identity of the Controller</h3>
                
                <div className="overflow-x-auto border border-gray-200 dark:border-zinc-800 rounded-xl">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <tbody>
                      <tr className="border-b border-gray-100 dark:border-zinc-800/60">
                        <td className="p-3 font-semibold bg-slate-50 dark:bg-zinc-850/50 w-1/3 text-gray-900 dark:text-zinc-200">Legal Entity</td>
                        <td className="p-3 text-gray-700 dark:text-zinc-300">Allô Taf SARL</td>
                      </tr>
                      <tr className="border-b border-gray-100 dark:border-zinc-800/60">
                        <td className="p-3 font-semibold bg-slate-50 dark:bg-zinc-850/50 text-gray-900 dark:text-zinc-200">Trading Name</td>
                        <td className="p-3 text-gray-700 dark:text-zinc-300">Allô Taf</td>
                      </tr>
                      <tr className="border-b border-gray-100 dark:border-zinc-800/60">
                        <td className="p-3 font-semibold bg-slate-50 dark:bg-zinc-850/50 text-gray-900 dark:text-zinc-200">Legal Form</td>
                        <td className="p-3 text-gray-700 dark:text-zinc-300">SARL (Société à Responsabilité Limitée)</td>
                      </tr>
                      <tr className="border-b border-gray-100 dark:border-zinc-800/60">
                        <td className="p-3 font-semibold bg-slate-50 dark:bg-zinc-850/50 text-gray-900 dark:text-zinc-200">Trade Register (RCCM)</td>
                        <td className="p-3 text-gray-700 dark:text-zinc-300">RC/DLA/2026/B/1042</td>
                      </tr>
                      <tr className="border-b border-gray-100 dark:border-zinc-800/60">
                        <td className="p-3 font-semibold bg-slate-50 dark:bg-zinc-850/50 text-gray-900 dark:text-zinc-200">Taxpayer Number</td>
                        <td className="p-3 text-gray-700 dark:text-zinc-300">NIU: M082612345678X</td>
                      </tr>
                      <tr className="border-b border-gray-100 dark:border-zinc-800/60">
                        <td className="p-3 font-semibold bg-slate-50 dark:bg-zinc-850/50 text-gray-900 dark:text-zinc-200">Registered Office</td>
                        <td className="p-3 text-gray-700 dark:text-zinc-300">Boulevard de la Liberté, Akwa, Douala, Republic of Cameroon</td>
                      </tr>
                      <tr className="border-b border-gray-100 dark:border-zinc-800/60">
                        <td className="p-3 font-semibold bg-slate-50 dark:bg-zinc-850/50 text-gray-900 dark:text-zinc-200">General Contact</td>
                        <td className="p-3 text-primary dark:text-[#00A693]">contact@allotaf.com</td>
                      </tr>
                      <tr className="border-b border-gray-100 dark:border-zinc-800/60">
                        <td className="p-3 font-semibold bg-slate-50 dark:bg-zinc-850/50 text-gray-900 dark:text-zinc-200">Privacy Contact</td>
                        <td className="p-3 text-primary dark:text-[#00A693]">privacy@allotaf.com</td>
                      </tr>
                      <tr className="border-b border-gray-100 dark:border-zinc-800/60">
                        <td className="p-3 font-semibold bg-slate-50 dark:bg-zinc-850/50 text-gray-900 dark:text-zinc-200">Data Protection Officer</td>
                        <td className="p-3 text-gray-600 dark:text-zinc-400">DPO (Not Appointed)</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold bg-slate-50 dark:bg-zinc-850/50 text-gray-900 dark:text-zinc-200">Telephone</td>
                        <td className="p-3 text-gray-700 dark:text-zinc-300">+237 677 88 99 00 (International Format)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-xs text-gray-500 dark:text-zinc-400 italic">
                  Where this policy says &quot;we&quot;, &quot;us&quot;, &quot;our&quot; or &quot;Allô Taf&quot;, it refers to the entity identified above.
                </p>

                <h3 className="text-sm font-bold text-gray-950 dark:text-white pt-4" id="definitions">3. Definitions</h3>
                
                <div className="overflow-x-auto border border-gray-200 dark:border-zinc-800 rounded-xl">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-zinc-850 border-b border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-zinc-200 font-semibold">
                        <th className="p-3.5 w-1/4">Term</th>
                        <th className="p-3.5">Meaning in this policy</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-150 dark:divide-zinc-800 text-gray-650 dark:text-zinc-350">
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-100 align-top">Personal data</td>
                        <td className="p-3.5 align-top">Any information relating to an identified or identifiable natural person, such as a name, telephone number, email address, photograph, curriculum vitae, device identifier or location data.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-100 align-top">Processing</td>
                        <td className="p-3.5 align-top">Any operation performed on personal data: collection, recording, storage, consultation, use, disclosure, restriction, erasure or destruction.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-100 align-top">Controller</td>
                        <td className="p-3.5 align-top">The person or entity that determines the purposes and means of processing. For the platform, this is Allô Taf.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-100 align-top">Processor</td>
                        <td className="p-3.5 align-top">A third party that processes personal data on our instructions and on our behalf, such as our hosting and infrastructure providers.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-100 align-top">Data subject</td>
                        <td className="p-3.5 align-top">The identified or identifiable natural person to whom personal data relates — in most cases, you.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-100 align-top">Job Seeker</td>
                        <td className="p-3.5 align-top">A natural person who registers on the platform in order to find employment or professional opportunities. Also referred to as a Candidate.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-100 align-top">Employer</td>
                        <td className="p-3.5 align-top">A company, institution, association or individual employer that registers on the platform in order to publish opportunities or search for candidates. Also referred to as an Enterprise.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-100 align-top">Founding Enterprise</td>
                        <td className="p-3.5 align-top">An Employer that joins the platform during the launch programme under the Entreprises Fondatrices offer.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-100 align-top">Ambassador</td>
                        <td className="p-3.5 align-top">A natural person accredited by Allô Taf under the ambassador programme to introduce Job Seekers and Employers to the platform in the field.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-100 align-top">Platform</td>
                        <td className="p-3.5 align-top">The website, the mobile application and all associated services operated by Allô Taf.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-100 align-top">The Law</td>
                        <td className="p-3.5 align-top">Law No. 2024/017 of 23 December 2024 relating to personal data protection in Cameroon, together with its implementing texts and any other applicable Cameroonian legislation.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-100 align-top">The Authority</td>
                        <td className="p-3.5 align-top">The Personal Data Protection Authority established under the Law.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            </div>

            {/* Chapter 3: What We Collect */}
            <div 
              ref={collectRef}
              id="collect"
              className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 print:border-none print:p-0 print:shadow-none"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-zinc-800 mb-6">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Compass className="w-5 h-5" />
                </div>
                <Heading as="h2" size="h4" className="text-gray-900 dark:text-white font-bold">
                  3. What We Collect
                </Heading>
              </div>

              <div className="space-y-5 text-gray-700 dark:text-zinc-300 leading-relaxed text-sm">
                <h3 className="text-sm font-bold text-gray-950 dark:text-white">4. Summary: What We Collect, at a Glance</h3>
                <p className="text-justify">
                  The table below is a short summary intended to make this policy easier to use. It does not replace the detailed sections that follow.
                </p>

                <div className="overflow-x-auto border border-gray-200 dark:border-zinc-800 rounded-xl">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-zinc-850 border-b border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-zinc-200 font-semibold">
                        <th className="p-3.5">Category</th>
                        <th className="p-3.5 w-1/3">Examples</th>
                        <th className="p-3.5">Who is concerned</th>
                        <th className="p-3.5">Do we require it?</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-150 dark:divide-zinc-800 text-gray-650 dark:text-zinc-350">
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Identity</td>
                        <td className="p-3.5 align-top">First name, surname, gender, date of birth, profile photograph</td>
                        <td className="p-3.5 align-top">Job Seekers, Ambassadors, Employer contacts</td>
                        <td className="p-3.5 align-top">Yes, in part</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Contact</td>
                        <td className="p-3.5 align-top">Telephone number, WhatsApp number, email address, quarter, town, region</td>
                        <td className="p-3.5 align-top">All users</td>
                        <td className="p-3.5 align-top">Yes</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Professional</td>
                        <td className="p-3.5 align-top">Curriculum vitae, work experience, qualifications, skills, trade or sector, availability, expected salary range</td>
                        <td className="p-3.5 align-top">Job Seekers</td>
                        <td className="p-3.5 align-top">Optional but recommended</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Company</td>
                        <td className="p-3.5 align-top">Company name, sector, size, address, trade register number, contact person, chosen pack</td>
                        <td className="p-3.5 align-top">Employers</td>
                        <td className="p-3.5 align-top">Yes</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Programme</td>
                        <td className="p-3.5 align-top">Ambassador code, recruitment counts, validation status, bonus tier, payment reference</td>
                        <td className="p-3.5 align-top">Ambassadors</td>
                        <td className="p-3.5 align-top">Yes</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Activity</td>
                        <td className="p-3.5 align-top">Applications sent, offers viewed, messages exchanged on the platform, verification status</td>
                        <td className="p-3.5 align-top">All users</td>
                        <td className="p-3.5 align-top">Generated by use</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Technical</td>
                        <td className="p-3.5 align-top">Device model, operating system version, application version, language, IP address, application identifiers, crash reports</td>
                        <td className="p-3.5 align-top">All users</td>
                        <td className="p-3.5 align-top">Collected automatically</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Financial</td>
                        <td className="p-3.5 align-top">Payment reference, transaction identifier, amount, date, mobile money or bank reference</td>
                        <td className="p-3.5 align-top">Employers, Ambassadors</td>
                        <td className="p-3.5 align-top">Only where a payment occurs</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-emerald-900 dark:text-emerald-400 mt-4">
                  <Shield className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider">We Do Not Collect Sensitive Data</h4>
                    <p className="text-xs mt-1 leading-normal text-gray-700 dark:text-zinc-300">
                      Allô Taf does not ask for, and does not want, data revealing your ethnic or regional origin, your religious, philosophical, political or trade-union opinions, your health, your genetic or biometric data, or your sex life. Section 9 explains what this means in practice, including for curricula vitae.
                    </p>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-gray-950 dark:text-white pt-4">5. Personal Data We Collect</h3>
                
                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">5.1 Data you provide to us directly</h4>
                <p className="text-justify">
                  Most of the data we hold is data you give us yourself, when you create an account, complete a registration form, scan an Allô Taf QR code, build your profile, apply to an opportunity, publish an opportunity, contact our team, or take part in the ambassador programme.
                </p>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">5.2 Data collected automatically</h4>
                <p className="text-justify">
                  When you use the website or the application, certain data is generated automatically by your browser or device and by the technical services we use:
                </p>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li><strong>Device and application data:</strong> device model, manufacturer, operating system and version, application version, screen characteristics, language and country settings, network type, and mobile operator where available;</li>
                  <li><strong>Identifiers:</strong> a Firebase installation identifier, an application instance identifier, a push notification token, and your Allô Taf user identifier;</li>
                  <li><strong>Connection data:</strong> IP address, date and time of connection, pages or screens viewed, duration of the session, and the referring page;</li>
                  <li><strong>Approximate location:</strong> derived from your IP address at country, region or city level. This is an approximation and is not GPS positioning;</li>
                  <li><strong>Diagnostic data:</strong> anonymous or pseudonymous crash reports, error traces, stack traces and performance measurements, used to fix defects.</li>
                </ul>
                <p className="text-xs text-gray-500 dark:text-zinc-400 italic">
                  We do not collect precise GPS location in the background, we do not read your contacts, your call logs, your SMS messages or the content of your other applications, and we do not access files on your device outside those you explicitly select in order to upload them.
                </p>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">5.3 Data we receive from other sources</h4>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li><strong>From Ambassadors:</strong> where an Ambassador introduces you to the platform, we may receive your name, telephone number and town, together with the Ambassador&apos;s code, so that the introduction can be attributed. Ambassadors are instructed to collect this data only with your agreement;</li>
                  <li><strong>From Employers:</strong> where an Employer registers a contact person other than the person completing the form, we receive that person&apos;s name, role and professional contact details;</li>
                  <li><strong>From referees or third parties you nominate:</strong> where you ask us to verify a qualification, a certificate or a professional reference, we may receive confirmation from the person or institution you have nominated;</li>
                  <li><strong>From service providers:</strong> technical and security data from our infrastructure providers, and payment confirmations from payment providers.</li>
                </ul>
              </div>
            </div>

            {/* Chapter 4: Data by User Role */}
            <div 
              ref={rolesRef}
              id="roles"
              className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 print:border-none print:p-0 print:shadow-none"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-zinc-800 mb-6">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Users className="w-5 h-5" />
                </div>
                <Heading as="h2" size="h4" className="text-gray-900 dark:text-white font-bold">
                  4. Data by User Role
                </Heading>
              </div>

              <div className="space-y-5 text-gray-700 dark:text-zinc-300 leading-relaxed text-sm">
                <h3 className="text-sm font-bold text-gray-950 dark:text-white">6. Data of Job Seekers</h3>
                <p className="text-justify">
                  If you register as a Job Seeker, we process the following categories of data:
                </p>

                <div className="overflow-x-auto border border-gray-200 dark:border-zinc-800 rounded-xl">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-zinc-850 border-b border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-zinc-200 font-semibold">
                        <th className="p-3.5 w-1/4">Data</th>
                        <th className="p-3.5 w-1/2">Detail</th>
                        <th className="p-3.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-150 dark:divide-zinc-800 text-gray-650 dark:text-zinc-350">
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Identity</td>
                        <td className="p-3.5 align-top">First name and surname, gender, date of birth or age bracket, profile photograph if you choose to upload one</td>
                        <td className="p-3.5 align-top">Required, except the photograph</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Contact</td>
                        <td className="p-3.5 align-top">Telephone or WhatsApp number, email address, quarter, town and region of residence</td>
                        <td className="p-3.5 align-top">Telephone required</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Account</td>
                        <td className="p-3.5 align-top">Password (stored only in irreversible hashed form), account status, date of creation, verification status</td>
                        <td className="p-3.5 align-top">Required</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Professional profile</td>
                        <td className="p-3.5 align-top">Curriculum vitae, summary or professional headline, trade or sector, work experience, employers previously worked for, qualifications and certificates, languages, skills, driving licence category</td>
                        <td className="p-3.5 align-top">Optional but strongly recommended</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Search preferences</td>
                        <td className="p-3.5 align-top">Type of contract sought, desired sector, geographical area, availability, expected salary range, mobility</td>
                        <td className="p-3.5 align-top">Optional</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Applications</td>
                        <td className="p-3.5 align-top">Opportunities viewed, applications sent, cover messages, status of each application, date and outcome</td>
                        <td className="p-3.5 align-top">Generated by use</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Verification</td>
                        <td className="p-3.5 align-top">Documents or references you submit so that a skill, a qualification or an identity can be verified, and the outcome of that verification</td>
                        <td className="p-3.5 align-top">Optional</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Communications</td>
                        <td className="p-3.5 align-top">Messages exchanged with Employers through the platform and with our support team</td>
                        <td className="p-3.5 align-top">Generated by use</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Introduction</td>
                        <td className="p-3.5 align-top">The code of the Ambassador who introduced you, if any</td>
                        <td className="p-3.5 align-top">Where applicable</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-5 rounded-xl border border-amber-200 bg-amber-50/30 dark:border-amber-900/30 dark:bg-amber-950/5">
                  <h4 className="text-sm font-bold text-amber-700 dark:text-amber-450 mb-2 flex items-center gap-1.5">
                    <FileText className="w-4 h-4" />
                    Important: About your Curriculum Vitae
                  </h4>
                  <p className="text-xs text-gray-650 dark:text-zinc-350 leading-relaxed text-justify">
                    A curriculum vitae is a free-form document. You control what it contains. Please do not include your religion, your ethnic group or region of origin, your political or trade-union affiliation, your health status, your marital situation, the number of your children, or your national identity card number. None of this is required to obtain a job through Allô Taf, much of it is legally sensitive, and all of it increases the risk of discrimination — which is precisely what this platform exists to reduce.
                  </p>
                  <p className="text-xs text-gray-500 dark:text-zinc-450 mt-2 italic">
                    Where we detect such information in a document you have uploaded, we may ask you to replace the document, or remove the document from your profile.
                  </p>
                </div>

                <h3 className="text-sm font-bold text-gray-950 dark:text-white pt-4">7. Data of Employers and Enterprises</h3>
                <p className="text-justify">
                  If you register an organisation on the platform, whether as a Founding Enterprise or otherwise, we process the following:
                </p>

                <div className="overflow-x-auto border border-gray-200 dark:border-zinc-800 rounded-xl">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-zinc-850 border-b border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-zinc-200 font-semibold">
                        <th className="p-3.5 w-1/4">Data</th>
                        <th className="p-3.5 w-1/2">Detail</th>
                        <th className="p-3.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-150 dark:divide-zinc-800 text-gray-650 dark:text-zinc-350">
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Company identity</td>
                        <td className="p-3.5 align-top">Company or business name, legal form, sector of activity, approximate size or number of employees, year of creation, logo</td>
                        <td className="p-3.5 align-top">Required, except the logo</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Registration data</td>
                        <td className="p-3.5 align-top">Trade register number (RCCM), taxpayer number, or any other business identifier, where the organisation is formally registered</td>
                        <td className="p-3.5 align-top">Optional at sign-up, required for verified status</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Establishment</td>
                        <td className="p-3.5 align-top">Physical address, quarter, town, region, and any additional sites</td>
                        <td className="p-3.5 align-top">Required</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Contact person</td>
                        <td className="p-3.5 align-top">Name, role, telephone or WhatsApp number, and email address of the person representing the organisation on the platform</td>
                        <td className="p-3.5 align-top">Required</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Account</td>
                        <td className="p-3.5 align-top">Login credentials, password in irreversible hashed form, roles and permissions of each user of the account</td>
                        <td className="p-3.5 align-top">Required</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Commercial</td>
                        <td className="p-3.5 align-top">Pack selected, subscription start and renewal dates, invoices issued, payment references, payment status</td>
                        <td className="p-3.5 align-top">Where a paid pack is taken</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Publication</td>
                        <td className="p-3.5 align-top">Job offers published, their content, their status, the number of applications received and the outcome recorded</td>
                        <td className="p-3.5 align-top">Generated by use</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Recruitment</td>
                        <td className="p-3.5 align-top">Candidate profiles consulted, shortlists, notes recorded against a candidate, messages sent</td>
                        <td className="p-3.5 align-top">Generated by use</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Verification</td>
                        <td className="p-3.5 align-top">Documents provided so that the organisation can be verified, and the outcome of that verification</td>
                        <td className="p-3.5 align-top">Optional</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Introduction</td>
                        <td className="p-3.5 align-top">The code of the Ambassador who introduced the organisation, if any</td>
                        <td className="p-3.5 align-top">Where applicable</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500 dark:text-zinc-400 italic">
                  Data relating to a company as such — its name, sector or address — is not personal data. Data relating to the individuals who represent that company is personal data, and is protected by this policy.
                </p>

                <h3 className="text-sm font-bold text-gray-950 dark:text-white pt-4">8. Data of Ambassadors</h3>
                <p className="text-justify">
                  Ambassadors are accredited members of the Allô Taf field network. If you are accredited as an Ambassador, we process the following:
                </p>

                <div className="overflow-x-auto border border-gray-200 dark:border-zinc-800 rounded-xl">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-zinc-850 border-b border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-zinc-200 font-semibold">
                        <th className="p-3.5 w-1/4">Data</th>
                        <th className="p-3.5 w-1/2">Detail</th>
                        <th className="p-3.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-150 dark:divide-zinc-800 text-gray-650 dark:text-zinc-350">
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Identity</td>
                        <td className="p-3.5 align-top">First name and surname, gender, date of birth, photograph used on the ambassador card</td>
                        <td className="p-3.5 align-top">Required</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Contact</td>
                        <td className="p-3.5 align-top">Telephone or WhatsApp number, email address, quarter, town and region of activity</td>
                        <td className="p-3.5 align-top">Required</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Accreditation</td>
                        <td className="p-3.5 align-top">Ambassador code, date of accreditation, validation status, assigned geographical zone, personalised welcome page and QR codes</td>
                        <td className="p-3.5 align-top">Required</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Performance</td>
                        <td className="p-3.5 align-top">Number of Job Seekers and Enterprises introduced, number validated, number pending verification, and the resulting bonus tier</td>
                        <td className="p-3.5 align-top">Generated by activity</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Payment</td>
                        <td className="p-3.5 align-top">Mobile money number or bank details used to pay a bonus, transaction references, amounts and dates of payment, and any supporting document required for accounting purposes</td>
                        <td className="p-3.5 align-top">Where a bonus is paid</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Communications</td>
                        <td className="p-3.5 align-top">Messages exchanged with the coordination team, including on messaging groups operated by Allô Taf</td>
                        <td className="p-3.5 align-top">Generated by use</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">8.1 Publication of ambassador materials</h4>
                <p className="text-justify text-xs">
                  Ambassadors receive a personalised card bearing their name, photograph, ambassador code and QR codes, and may appear in communication materials published by Allô Taf on social networks and in the field. This use of your name and image is based on your separate, specific and freely given consent, which you may withdraw at any time by writing to us. Withdrawal does not affect the lawfulness of publication before withdrawal, and we cannot recall materials already printed or already distributed by third parties, but we will stop future use and remove the material from channels we control.
                </p>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">8.2 Aggregate reporting</h4>
                <p className="text-justify text-xs">
                  We publish periodic community updates showing the total number of validated Ambassadors, new recruits and pending verifications. These figures are aggregated and do not identify individuals, unless you have separately consented to being named.
                </p>

                <h3 className="text-sm font-bold text-gray-950 dark:text-white pt-4">9. Data We Do Not Collect</h3>
                <p className="text-justify">
                  Cameroonian law prohibits, or subjects to prior authorisation, the processing of certain categories of especially sensitive personal data. Allô Taf has taken the deliberate decision not to collect them at all. We do not ask for, and you should not send us:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mt-2">
                  <div className="p-3 rounded-lg border border-red-100 bg-red-50/10 dark:border-red-950/20 dark:bg-red-950/5 flex gap-2">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>Data revealing racial, ethnic, regional or linguistic origin</span>
                  </div>
                  <div className="p-3 rounded-lg border border-red-100 bg-red-50/10 dark:border-red-950/20 dark:bg-red-950/5 flex gap-2">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>Data revealing religious or philosophical beliefs</span>
                  </div>
                  <div className="p-3 rounded-lg border border-red-100 bg-red-50/10 dark:border-red-950/20 dark:bg-red-950/5 flex gap-2">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>Data revealing political opinions or trade-union membership or activity</span>
                  </div>
                  <div className="p-3 rounded-lg border border-red-100 bg-red-50/10 dark:border-red-950/20 dark:bg-red-950/5 flex gap-2">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>Health data, medical certificates, disability, pregnancy or HIV status</span>
                  </div>
                  <div className="p-3 rounded-lg border border-red-100 bg-red-50/10 dark:border-red-950/20 dark:bg-red-950/5 flex gap-2">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>Genetic or biometric data, including fingerprints and facial recognition templates</span>
                  </div>
                  <div className="p-3 rounded-lg border border-red-100 bg-red-50/10 dark:border-red-950/20 dark:bg-red-950/5 flex gap-2">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>Data concerning your sex life or sexual orientation</span>
                  </div>
                  <div className="p-3 rounded-lg border border-red-100 bg-red-50/10 dark:border-red-950/20 dark:bg-red-950/5 flex gap-2">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>Judicial data, including criminal record extracts</span>
                  </div>
                  <div className="p-3 rounded-lg border border-red-100 bg-red-50/10 dark:border-red-950/20 dark:bg-red-950/5 flex gap-2">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>Detailed financial data such as full bank account statements, card numbers or credit history</span>
                  </div>
                </div>
                <p className="text-justify text-xs mt-3">
                  No employer using Allô Taf is entitled to require any of the above as a condition of applying for a position published on the platform. If an employer asks you for it, please report the offer to us immediately. Where we identify such data in a profile, a document or an offer, we may remove it without prior notice.
                </p>
              </div>
            </div>

            {/* Chapter 5: Processing Legalities & Purposes */}
            <div 
              ref={legalitiesRef}
              id="legalities"
              className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 print:border-none print:p-0 print:shadow-none"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-zinc-800 mb-6">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <FileCheck className="w-5 h-5" />
                </div>
                <Heading as="h2" size="h4" className="text-gray-900 dark:text-white font-bold">
                  5. Legal Basis & Purposes
                </Heading>
              </div>

              <div className="space-y-5 text-gray-700 dark:text-zinc-300 leading-relaxed text-sm">
                <h3 className="text-sm font-bold text-gray-950 dark:text-white">10. Legal Basis for Processing</h3>
                <p className="text-justify">
                  We process personal data only where we have a legal basis for doing so. Under Cameroonian law, your consent is the principal basis on which we rely; other bases apply where the law or a contract requires it.
                </p>

                <div className="overflow-x-auto border border-gray-200 dark:border-zinc-800 rounded-xl">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-zinc-850 border-b border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-zinc-200 font-semibold">
                        <th className="p-3.5 w-1/4">Legal Basis</th>
                        <th className="p-3.5">When we rely on it</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-150 dark:divide-zinc-800 text-gray-650 dark:text-zinc-350">
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Consent</td>
                        <td className="p-3.5 align-top">Creation of an account and of a profile; publication of your profile to Employers; use of your name and image in communication materials; sending of push notifications and commercial messages; use of non-essential cookies and audience measurement. Consent is given by a clear affirmative act and may be withdrawn at any time.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Performance of a contract</td>
                        <td className="p-3.5 align-top">Provision of the services you have subscribed to, management of your account, processing of applications, delivery and invoicing of Founding Enterprise packs, calculation and payment of ambassador bonuses.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Legal obligation</td>
                        <td className="p-3.5 align-top">Retention of accounting and tax records, response to a lawful request from a judicial or administrative authority, notification of a data breach, and compliance with obligations under the Law.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Legitimate interest</td>
                        <td className="p-3.5 align-top">Security of the platform, prevention and detection of fraud and of fraudulent registrations, technical diagnostics, and defence of legal claims — in each case balanced against your rights and freedoms.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-sm font-bold text-gray-950 dark:text-white pt-4">11. Purposes of Processing</h3>
                <p className="text-justify">
                  We use personal data for the purposes set out below and for no other purpose that is incompatible with them:
                </p>

                <div className="overflow-x-auto border border-gray-200 dark:border-zinc-800 rounded-xl">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-zinc-850 border-b border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-zinc-200 font-semibold">
                        <th className="p-3.5">Purpose</th>
                        <th className="p-3.5">Main data used</th>
                        <th className="p-3.5">Basis</th>
                        <th className="p-3.5">Retention</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-150 dark:divide-zinc-800 text-gray-655 dark:text-zinc-350">
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Create and manage your account</td>
                        <td className="p-3.5 align-top">Identity, contact, credentials</td>
                        <td className="p-3.5 align-top">Contract, consent</td>
                        <td className="p-3.5 align-top">Life of the account</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Build and display your profile</td>
                        <td className="p-3.5 align-top">Identity, professional profile, photograph</td>
                        <td className="p-3.5 align-top">Consent</td>
                        <td className="p-3.5 align-top">Life of the account</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Match candidates with opportunities</td>
                        <td className="p-3.5 align-top">Profile, preferences, sector, location</td>
                        <td className="p-3.5 align-top">Consent, contract</td>
                        <td className="p-3.5 align-top">Life of the account</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Process and follow applications</td>
                        <td className="p-3.5 align-top">Profile, application data, messages</td>
                        <td className="p-3.5 align-top">Contract</td>
                        <td className="p-3.5 align-top">Life of the account, then 12 months</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Verify credentials</td>
                        <td className="p-3.5 align-top">Identity, documents supplied, verification outcome</td>
                        <td className="p-3.5 align-top">Consent, legitimate interest</td>
                        <td className="p-3.5 align-top">Duration of the verification, then outcome only</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Operate ambassador programme</td>
                        <td className="p-3.5 align-top">Accreditation, performance, payment references</td>
                        <td className="p-3.5 align-top">Contract</td>
                        <td className="p-3.5 align-top">Life of the accreditation</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Deliver enterprise packs</td>
                        <td className="p-3.5 align-top">Company data, contact person, payment references</td>
                        <td className="p-3.5 align-top">Contract, legal obligation</td>
                        <td className="p-3.5 align-top">10 years for accounting records</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Send service messages</td>
                        <td className="p-3.5 align-top">Contact, push token, preferences</td>
                        <td className="p-3.5 align-top">Contract, consent</td>
                        <td className="p-3.5 align-top">Until you object or withdraw</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Provide user support</td>
                        <td className="p-3.5 align-top">Contact, account, correspondence</td>
                        <td className="p-3.5 align-top">Contract</td>
                        <td className="p-3.5 align-top">3 years from last contact</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Secure the platform</td>
                        <td className="p-3.5 align-top">Technical data, connection logs, activity</td>
                        <td className="p-3.5 align-top">Legitimate interest, legal obligation</td>
                        <td className="p-3.5 align-top">12 months</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Diagnose defects</td>
                        <td className="p-3.5 align-top">Crash reports, technical data, aggregated stats</td>
                        <td className="p-3.5 align-top">Consent, legitimate interest</td>
                        <td className="p-3.5 align-top">Up to 14 months</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Measure usage</td>
                        <td className="p-3.5 align-top">Pseudonymous usage events</td>
                        <td className="p-3.5 align-top">Consent</td>
                        <td className="p-3.5 align-top">Up to 14 months</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            </div>

            {/* Chapter 6: Services, Cookies & Push */}
            <div 
              ref={servicesRef}
              id="services"
              className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 print:border-none print:p-0 print:shadow-none"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-zinc-800 mb-6">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Server className="w-5 h-5" />
                </div>
                <Heading as="h2" size="h4" className="text-gray-900 dark:text-white font-bold">
                  6. Services, Cookies & Push
                </Heading>
              </div>

              <div className="space-y-5 text-gray-700 dark:text-zinc-300 leading-relaxed text-sm">
                <h3 className="text-sm font-bold text-gray-950 dark:text-white">12. Firebase and Other Google Services</h3>
                <p className="text-justify text-xs sm:text-sm">
                  The Allô Taf application and parts of our back office are built on Google Firebase, a suite of development and hosting services provided by Google LLC and its affiliates. Firebase acts as our processor: it handles data on our instructions, for our purposes, under a data processing agreement.
                </p>

                <div className="overflow-x-auto border border-gray-200 dark:border-zinc-800 rounded-xl">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-zinc-850 border-b border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-zinc-200 font-semibold">
                        <th className="p-3.5 w-1/4">Service</th>
                        <th className="p-3.5 w-1/2">What it does for Allô Taf</th>
                        <th className="p-3.5">Data involved</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-150 dark:divide-zinc-800 text-gray-655 dark:text-zinc-350">
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Firebase Authentication</td>
                        <td className="p-3.5 align-top">Creates and secures your account, verifies your telephone number or email address, manages sign-in, and issues session tokens.</td>
                        <td className="p-3.5 align-top">User identifier, email, phone, hashed password, sign-in timestamps, verification status</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Cloud Firestore</td>
                        <td className="p-3.5 align-top">Stores the working data of the platform: profiles, job offers, applications, ambassador records, messages and configuration.</td>
                        <td className="p-3.5 align-top">Profile data, professional data, company data, application and messaging data, ambassador data</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Cloud Storage for Firebase</td>
                        <td className="p-3.5 align-top">Stores files you upload, such as a profile photograph, a company logo or a curriculum vitae.</td>
                        <td className="p-3.5 align-top">Uploaded documents and images, and their metadata</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Firebase Cloud Messaging</td>
                        <td className="p-3.5 align-top">Delivers push notifications to your device.</td>
                        <td className="p-3.5 align-top">Push notification token, device and application identifiers, delivery status</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Google Analytics for Firebase</td>
                        <td className="p-3.5 align-top">Measures how the application is used in aggregate, so that we can improve navigation and content.</td>
                        <td className="p-3.5 align-top">Pseudonymous application instance ID, screens viewed, events triggered, device model, OS version, language, approximate location</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Firebase Crashlytics</td>
                        <td className="p-3.5 align-top">Reports crashes and errors so that defects can be reproduced and corrected.</td>
                        <td className="p-3.5 align-top">Crash traces, application state at the time of the crash, device model, OS version, an installation identifier</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Firebase App Check</td>
                        <td className="p-3.5 align-top">Protects the back end against abuse and unauthorised access.</td>
                        <td className="p-3.5 align-top">Application attestation tokens, technical request data</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Google Play services</td>
                        <td className="p-3.5 align-top">Provides the technical foundation for the application on Android devices, including delivery, updates and integrity checks.</td>
                        <td className="p-3.5 align-top">Device and Play account technical data processed by Google</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">12.1 Analytics and crash reporting can be switched off</h4>
                <p className="text-justify text-xs">
                  Google Analytics for Firebase and Crashlytics are activated only where you have accepted them. You can change your choice at any time in Settings &gt; Privacy in the application. Switching them off does not affect any other function of the platform.
                </p>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">12.2 Advertising</h4>
                <p className="text-justify text-xs">
                  Allô Taf does not use Firebase or Google Analytics data for advertising, does not integrate an advertising network in the application, does not collect an advertising identifier, and does not sell, rent or trade personal data with advertisers or data brokers.
                </p>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">12.3 Google&apos;s own role</h4>
                <p className="text-justify text-xs text-gray-500 dark:text-zinc-400 italic">
                  Google processes certain technical data as an independent controller for the purposes of operating, securing and maintaining its own services. That processing is governed by Google&apos;s privacy policy, available at <code className="text-xs text-primary bg-slate-100 dark:bg-zinc-800 px-1 py-0.5 rounded">policies.google.com/privacy</code>.
                </p>

                <h3 className="text-sm font-bold text-gray-950 dark:text-white pt-4">13. Cookies and Website Tracking</h3>
                <p className="text-justify">
                  The website allotaf.com uses cookies and similar technologies. A cookie is a small file placed on your device that allows a site to recognise your browser and to remember information between visits.
                </p>

                <div className="overflow-x-auto border border-gray-200 dark:border-zinc-800 rounded-xl">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-zinc-850 border-b border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-zinc-200 font-semibold">
                        <th className="p-3.5 w-1/4">Category</th>
                        <th className="p-3.5 w-1/2">Purpose</th>
                        <th className="p-3.5">Consent required</th>
                        <th className="p-3.5">Typical lifetime</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-150 dark:divide-zinc-800 text-gray-655 dark:text-zinc-350">
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Strictly necessary</td>
                        <td className="p-3.5 align-top">Session management, login, form security, load balancing, recording your cookie choices</td>
                        <td className="p-3.5 align-top">No</td>
                        <td className="p-3.5 align-top">Session to 12 months</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Functional</td>
                        <td className="p-3.5 align-top">Language selection, display preferences, remembering information entered in a form</td>
                        <td className="p-3.5 align-top">Yes</td>
                        <td className="p-3.5 align-top">Up to 12 months</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Audience measurement</td>
                        <td className="p-3.5 align-top">Counting visits, understanding which pages are consulted, measuring the performance of the site</td>
                        <td className="p-3.5 align-top">Yes</td>
                        <td className="p-3.5 align-top">Up to 13 months</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Social & Embedded</td>
                        <td className="p-3.5 align-top">Playing embedded videos, displaying social feeds, sharing buttons</td>
                        <td className="p-3.5 align-top">Yes</td>
                        <td className="p-3.5 align-top">Set by the third party</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">13.1 Managing your choices</h4>
                <p className="text-justify text-xs">
                  Non-essential cookies are placed only after you have given consent through the banner displayed on your first visit. You can change or withdraw your choice at any time through the cookie settings link in the footer of the website. Blocked cookies may prevent parts of the site from working.
                </p>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">13.2 Third-party technologies</h4>
                <p className="text-justify text-xs">
                  The website is built on WordPress and may load resources from third parties, including web fonts, embedded maps, embedded videos and social network widgets. Where such a resource is loaded, the third party may receive your IP address and technical data about your browser.
                </p>

                <h3 className="text-sm font-bold text-gray-950 dark:text-white pt-4">14. Push Notifications</h3>
                <p className="text-justify">
                  With your permission, the application sends push notifications to inform you of matters that are useful to you: a new opportunity matching your profile, a response to an application, a message received, a verification result, or a security alert.
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>On Android 13 and later, notifications require an explicit system permission. You may refuse it, and the application will continue to work.</li>
                  <li>You can disable notifications at any time in the settings of the application or in the settings of your device.</li>
                  <li>We distinguish service notifications, which relate to your account, from promotional notifications. You may switch off promotional notifications while keeping service notifications active.</li>
                </ul>
              </div>
            </div>

            {/* Chapter 7: Sharing, Security & Retention */}
            <div 
              ref={sharingRef}
              id="sharing"
              className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 print:border-none print:p-0 print:shadow-none"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-zinc-800 mb-6">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Lock className="w-5 h-5" />
                </div>
                <Heading as="h2" size="h4" className="text-gray-900 dark:text-white font-bold">
                  7. Sharing, Security & Retention
                </Heading>
              </div>

              <div className="space-y-5 text-gray-700 dark:text-zinc-300 leading-relaxed text-sm">
                <h3 className="text-sm font-bold text-gray-950 dark:text-white">15. Sharing and Disclosure of Personal Data</h3>
                <p className="text-justify">
                  We do not sell your personal data. We do not rent it, and we do not trade it with advertisers or data brokers. We share it only in the circumstances described below:
                </p>

                <div className="overflow-x-auto border border-gray-200 dark:border-zinc-800 rounded-xl">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-zinc-850 border-b border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-zinc-200 font-semibold">
                        <th className="p-3.5">Recipient</th>
                        <th className="p-3.5">What is shared</th>
                        <th className="p-3.5 w-1/3">Why</th>
                        <th className="p-3.5">Your control</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-150 dark:divide-zinc-800 text-gray-655 dark:text-zinc-350">
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Employers on the platform</td>
                        <td className="p-3.5 align-top">Your profile as you have configured it, your applications and the messages you send</td>
                        <td className="p-3.5 align-top">So that you can be considered for opportunities</td>
                        <td className="p-3.5 align-top">You control visibility of your profile and choose which offers to apply to</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Job Seekers</td>
                        <td className="p-3.5 align-top">The public profile of the Employer and the content of its offers</td>
                        <td className="p-3.5 align-top">So that you can assess an opportunity</td>
                        <td className="p-3.5 align-top">Employers control their published content</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Ambassadors</td>
                        <td className="p-3.5 align-top">Confirmation that an introduction has been validated, and the name of the person or organisation introduced</td>
                        <td className="p-3.5 align-top">To calculate the bonus due</td>
                        <td className="p-3.5 align-top">Ambassadors do not obtain access to profiles, applications or messages</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Technical providers</td>
                        <td className="p-3.5 align-top">Only the data needed for the service concerned</td>
                        <td className="p-3.5 align-top">Hosting, database, messaging, analytics, crash reporting, email and SMS delivery</td>
                        <td className="p-3.5 align-top">Governed by a written data processing agreement — see Annex B</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Payment providers</td>
                        <td className="p-3.5 align-top">Payment reference, amount, and the identifiers required to execute the transaction</td>
                        <td className="p-3.5 align-top">To collect a pack payment or to pay an ambassador bonus</td>
                        <td className="p-3.5 align-top">We do not store full card details</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Professional advisers</td>
                        <td className="p-3.5 align-top">Only what is strictly necessary</td>
                        <td className="p-3.5 align-top">Accounting, audit, tax and legal advice</td>
                        <td className="p-3.5 align-top">Bound by professional secrecy</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Public authorities</td>
                        <td className="p-3.5 align-top">What is required by the request</td>
                        <td className="p-3.5 align-top">Where we are legally required to respond to a court, a regulator or a law enforcement authority acting within its powers</td>
                        <td className="p-3.5 align-top">We verify the legality of each request and disclose only what is required</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-sm font-bold text-gray-955 dark:text-white pt-4">16. Data Security</h3>
                <p className="text-justify text-xs sm:text-sm">
                  We implement technical and organisational measures appropriate to the risk. The principal measures include:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>Encryption in transit using TLS for all communications;</li>
                  <li>Encryption at rest of stored data by our infrastructure provider;</li>
                  <li>Irreversible cryptographic hashing for all password storage;</li>
                  <li>Strict access controls restricted to authorized staff using strong authentication;</li>
                  <li>Server-side security rules on the Cloud Firestore database;</li>
                  <li>Regular secure backups, held securely and tested for restoration.</li>
                </ul>

                <h3 className="text-sm font-bold text-gray-955 dark:text-white pt-4">17. Data Breach Notification</h3>
                <p className="text-justify text-xs sm:text-sm">
                  If a personal data breach occurs, we will contain the incident, assess the consequences, notify the Personal Data Protection Authority within the legally prescribed timeline, and inform the affected individuals directly if their rights are likely to be impacted.
                </p>

                <h3 className="text-sm font-bold text-gray-955 dark:text-white pt-4">18. How Long We Keep Your Data</h3>
                <p className="text-justify">
                  We keep personal data only for as long as is necessary for the purpose for which it was collected, and then delete it or render it anonymous:
                </p>

                <div className="overflow-x-auto border border-gray-200 dark:border-zinc-800 rounded-xl">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-zinc-850 border-b border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-zinc-200 font-semibold">
                        <th className="p-3.5 w-1/3">Data</th>
                        <th className="p-3.5">Retention period</th>
                        <th className="p-3.5">Starting point</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-150 dark:divide-zinc-800 text-gray-655 dark:text-zinc-350">
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Active account & profile</td>
                        <td className="p-3.5 align-top">For as long as the account remains active</td>
                        <td className="p-3.5 align-top">—</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Inactive account</td>
                        <td className="p-3.5 align-top">24 months of complete inactivity, after which we give notice and then delete or anonymise</td>
                        <td className="p-3.5 align-top">Last connection</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Applications & related messages</td>
                        <td className="p-3.5 align-top">12 months</td>
                        <td className="p-3.5 align-top">Deletion request</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Curricula vitae & documents</td>
                        <td className="p-3.5 align-top">Deleted with the account, or earlier at your request</td>
                        <td className="p-3.5 align-top">Deletion request</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Ambassador records</td>
                        <td className="p-3.5 align-top">Duration of the accreditation, then 12 months</td>
                        <td className="p-3.5 align-top">End of accreditation</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Accounting & invoicing</td>
                        <td className="p-3.5 align-top">10 years, as required by commercial and tax law</td>
                        <td className="p-3.5 align-top">End of the financial year</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Technical & security logs</td>
                        <td className="p-3.5 align-top">12 months</td>
                        <td className="p-3.5 align-top">Date of the event</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Analytics & crash data</td>
                        <td className="p-3.5 align-top">Up to 14 months</td>
                        <td className="p-3.5 align-top">Date of collection</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-sm font-bold text-gray-955 dark:text-white pt-4">19. International Transfers of Personal Data</h3>
                <p className="text-justify text-xs sm:text-sm">
                  Allô Taf is operated from Cameroon and serves users in Cameroon. However, some of the technical services we rely on — in particular Google Firebase — store and process data on infrastructure located outside Cameroon, primarily in European data centers (<code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-xs font-mono text-primary">europe-west1</code>). This constitutes an international transfer of personal data.
                </p>
                <p className="text-justify text-xs sm:text-sm">
                  In respect of those transfers we: limit transferred data to what is necessary, sign written processing agreements with standard contractual protections, and complete necessary formalities with the Personal Data Protection Authority of Cameroon.
                </p>
                <div className="p-4 rounded-xl border border-primary/20 bg-slate-50/50 dark:bg-zinc-850/30">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Status of Transfer Authorisations</h4>
                  <p className="text-xs mt-1 text-gray-600 dark:text-zinc-400">
                    Under Law No. 2024/017, cross-border transfers of personal data are subject to the prior authorisation of the Personal Data Protection Authority. The practical procedure for obtaining that authorisation depends on the effective installation of the Authority. Allô Taf monitors the position and will complete the required formalities as soon as the procedure is open. Current status: <strong>Pending official procedure opening</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Chapter 8: Your Rights & Contacts */}
            <div 
              ref={rightsRef}
              id="rights"
              className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 print:border-none print:p-0 print:shadow-none"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-zinc-800 mb-6">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Globe className="w-5 h-5" />
                </div>
                <Heading as="h2" size="h4" className="text-gray-900 dark:text-white font-bold">
                  8. Your Rights & Contacts
                </Heading>
              </div>

              <div className="space-y-5 text-gray-700 dark:text-zinc-300 leading-relaxed text-sm">
                <h3 className="text-sm font-bold text-gray-955 dark:text-white">20. Your Rights</h3>
                <p className="text-justify">
                  You have the following rights in relation to your personal data under Cameroonian Law. They are exercised free of charge, except where a request is manifestly unfounded or excessive:
                </p>

                <div className="overflow-x-auto border border-gray-200 dark:border-zinc-800 rounded-xl">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-zinc-850 border-b border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-zinc-200 font-semibold">
                        <th className="p-3.5 w-1/4">Right</th>
                        <th className="p-3.5">What it allows you to do</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-150 dark:divide-zinc-800 text-gray-655 dark:text-zinc-350">
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Information</td>
                        <td className="p-3.5 align-top">Be told, in clear terms, what data we hold, why, for how long and with whom it is shared — which is the purpose of this policy.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Access</td>
                        <td className="p-3.5 align-top">Obtain confirmation that we process your data and receive a copy of it.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Rectification</td>
                        <td className="p-3.5 align-top">Have inaccurate data corrected and incomplete data completed. Most profile data can be corrected directly in your account.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Erasure</td>
                        <td className="p-3.5 align-top">Ask us to delete your data where it is no longer necessary, where you withdraw the consent on which processing was based, or where processing is unlawful.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Restriction</td>
                        <td className="p-3.5 align-top">Ask us to suspend the use of your data while a dispute about its accuracy or lawfulness is examined.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Objection</td>
                        <td className="p-3.5 align-top">Object to processing based on our legitimate interest, and object at any time and without justification to receiving commercial messages.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Portability</td>
                        <td className="p-3.5 align-top">Receive the data you provided to us in a structured, commonly used, machine-readable format, and have it transmitted to another provider where technically feasible.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Withdrawal of consent</td>
                        <td className="p-3.5 align-top">Withdraw consent at any time, as easily as it was given, without affecting the lawfulness of processing carried out before the withdrawal.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Human review</td>
                        <td className="p-3.5 align-top">Not be subject to a decision producing legal effects taken solely by automated means, and to obtain human intervention.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Post-mortem</td>
                        <td className="p-3.5 align-top">Give directions on what should happen to your data after your death.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Complaint</td>
                        <td className="p-3.5 align-top">Lodge a complaint with the Personal Data Protection Authority, or bring proceedings before the competent Cameroonian courts.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">20.1 How to exercise your rights</h4>
                <p className="text-justify text-xs">
                  You can consult, edit or delete most profile data directly in your account settings. For other requests, please write to us by email at <code className="px-1 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-primary">privacy@allotaf.com</code> or by post to <strong>Allô Taf SARL, Boulevard de la Liberté, Akwa, Douala, Cameroon</strong>.
                </p>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">20.2 Verification and response times</h4>
                <p className="text-justify text-xs text-gray-650 dark:text-zinc-400">
                  To protect you, we must verify your identity. We acknowledge requests within 5 working days and respond within 30 days of receiving a complete request, or within any shorter period prescribed by the Authority.
                </p>

                <h3 className="text-sm font-bold text-gray-955 dark:text-white pt-4">21. Automated Processing and Matching</h3>
                <p className="text-justify text-xs sm:text-sm">
                  Allô Taf uses automated matching algorithms to rank and suggest matching opportunities to candidates based on objective criteria you supplied (sector, experience, skills, location, expected salary). <strong>These algorithms do not make hiring decisions.</strong> Every hiring decision is made by a human recruiter. We do not use sensitive criteria like ethnic origin, gender, or religion for matching.
                </p>

                <h3 className="text-sm font-bold text-gray-955 dark:text-white pt-4">22. Children and Minors</h3>
                <p className="text-justify text-xs sm:text-sm">
                  Allô Taf is strictly intended for adults. You must be at least 18 years old to create an account on the platform. We do not knowingly collect personal data from minors under 18. If we identify such accounts, we will suspend them and delete the associated data.
                </p>

                <h3 className="text-sm font-bold text-gray-955 dark:text-white pt-4">23. Confidentiality of Your Team and Our Staff</h3>
                <p className="text-justify text-xs sm:text-sm">
                  All employees, coordination staff, and contractors are bound by strict confidentiality agreements. Field network Ambassadors do not have access to candidate profiles, CVs, or communications; their role is strictly field outreach and registration assistance.
                </p>

                <h3 className="text-sm font-bold text-gray-955 dark:text-white pt-4">24. Links to Third-Party Sites and Services</h3>
                <p className="text-justify text-xs sm:text-sm">
                  The platform contains links to external websites (such as employer career portals). Once you follow these links, you leave our platform, and Allô Taf is not responsible for the privacy practices of those external sites.
                </p>

                <h3 className="text-sm font-bold text-gray-955 dark:text-white pt-4">25. Changes to This Policy</h3>
                <p className="text-justify text-xs sm:text-sm">
                  We may periodically update this policy. Material updates (e.g. new purposes of processing, new transfers) will be communicated via email or prominent in-app/website banners.
                </p>

                <h3 className="text-sm font-bold text-gray-955 dark:text-white pt-4">26. Contact Us</h3>
                <p className="text-justify">
                  For any questions or data requests, please reach out via any of the channels below:
                </p>

                <div className="overflow-x-auto border border-gray-200 dark:border-zinc-800 rounded-xl">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-zinc-850 border-b border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-zinc-200 font-semibold">
                        <th className="p-3.5 w-1/3">Channel</th>
                        <th className="p-3.5">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-150 dark:divide-zinc-800 text-gray-655 dark:text-zinc-350">
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Privacy and data protection</td>
                        <td className="p-3.5 align-top text-primary dark:text-[#00A693]">privacy@allotaf.com</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Data protection officer</td>
                        <td className="p-3.5 align-top text-gray-600 dark:text-zinc-400">dpo@allotaf.com (Not Appointed)</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">General enquiries and support</td>
                        <td className="p-3.5 align-top text-primary dark:text-[#00A693]">contact@allotaf.com</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Telephone / WhatsApp</td>
                        <td className="p-3.5 align-top">+237 677 88 99 00</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Postal address</td>
                        <td className="p-3.5 align-top">Allô Taf SARL, Boulevard de la Liberté, Akwa, Douala, Republic of Cameroon</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Website</td>
                        <td className="p-3.5 align-top text-primary dark:text-[#00A693]">
                          <a href="https://allotaf.com" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                            <span>https://allotaf.com</span>
                            <BookOpen className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-justify text-xs text-gray-500 dark:text-zinc-450 mt-4 leading-normal">
                  If you are not satisfied with our response, you are entitled to lodge a complaint with the Personal Data Protection Authority of Cameroon established under Law No. 2024/017, and to bring proceedings before the competent Cameroonian courts. Status of DPA contacts: <strong>Contact details will be added as soon as they are officially published by the Authority</strong>.
                </p>

              </div>
            </div>

          </main>
        </div>
      </Container>
    </div>
  );
}
