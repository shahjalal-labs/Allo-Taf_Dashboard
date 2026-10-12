"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  XCircle, 
  Printer, 
  ChevronRight, 
  ArrowLeft,
  Briefcase,
  MapPin,
  FileText,
  AlertCircle,
  Users,
  Compass,
  FileCheck,
  Server,
  Lock,
  Globe
} from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui-library/container";
import { Heading, Text } from "@/components/ui-library/typography";

interface Chapter {
  id: string;
  title: string;
}

const chapters: Chapter[] = [
  { id: "intro", title: "1. Acceptance & Definitions" },
  { id: "eligibility", title: "2. Eligibility & Services" },
  { id: "registration", title: "3. Account Registration" },
  { id: "roles", title: "4. Role Obligations" },
  { id: "ambassador", title: "5. Ambassador Programme" },
  { id: "payment", title: "6. Commercial Terms" },
  { id: "conduct", title: "7. Platform Rules" },
  { id: "legal", title: "8. Legal & Dispute" },
];

export default function TermsAndConditionsPage() {
  const [activeSection, setActiveSection] = useState<string>("intro");
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  
  const introRef = useRef<HTMLDivElement>(null);
  const eligibilityRef = useRef<HTMLDivElement>(null);
  const registrationRef = useRef<HTMLDivElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);
  const ambassadorRef = useRef<HTMLDivElement>(null);
  const paymentRef = useRef<HTMLDivElement>(null);
  const conductRef = useRef<HTMLDivElement>(null);
  const legalRef = useRef<HTMLDivElement>(null);

  const chapterRefs = {
    intro: introRef,
    eligibility: eligibilityRef,
    registration: registrationRef,
    roles: rolesRef,
    ambassador: ambassadorRef,
    payment: paymentRef,
    conduct: conductRef,
    legal: legalRef,
  };

  // Scroll spy to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250; // Offset for header/navbar

      const refs = [
        { id: "intro", ref: introRef },
        { id: "eligibility", ref: eligibilityRef },
        { id: "registration", ref: registrationRef },
        { id: "roles", ref: rolesRef },
        { id: "ambassador", ref: ambassadorRef },
        { id: "payment", ref: paymentRef },
        { id: "conduct", ref: conductRef },
        { id: "legal", ref: legalRef },
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
              <FileCheck className="w-3.5 h-3.5" />
              <span>User Agreement & Policies</span>
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
              Terms and Conditions of Use
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
              Please read this contract carefully. It governs your access to and use of the Allô Taf platform, services, website, and mobile applications.
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
                Terms Sections
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
                    <h4 className="text-xs font-bold text-gray-800 dark:text-zinc-200">Legal Binding</h4>
                    <p className="text-[11px] text-gray-500 dark:text-zinc-450 mt-1 leading-normal">
                      By accessing the Platform, you acknowledge that you have read and agreed to these Terms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="col-span-1 lg:col-span-3 space-y-8 print:col-span-4 print:space-y-6">
            
            {/* Chapter 1: Acceptance & Definitions */}
            <div 
              ref={introRef}
              id="intro"
              className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 print:border-none print:p-0 print:shadow-none"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-zinc-800 mb-6">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <FileText className="w-5 h-5" />
                </div>
                <Heading as="h2" size="h4" className="text-gray-900 dark:text-white font-bold">
                  1. Acceptance & Definitions
                </Heading>
              </div>

              <div className="space-y-5 text-gray-700 dark:text-zinc-300 leading-relaxed text-sm">
                
                <h3 className="text-sm font-bold text-gray-955 dark:text-white pt-2">1. Acceptance of these terms</h3>
                <p className="text-justify">
                  These Terms and Conditions govern your access to and use of the Allô Taf platform, comprising the website <code className="px-1.5 py-0.5 rounded bg-slate-105 dark:bg-zinc-800 font-mono text-xs text-primary">allotaf.com</code>, the Allô Taf mobile application, and all related services, forms and content (together, the <strong>Platform</strong>). The Platform is operated by <strong>Allô Taf SARL</strong>, a company incorporated under the laws of the Republic of Cameroon, having its registered office at <strong>Boulevard de la Liberté, Akwa, Douala</strong>, registered under RCCM number <strong>RC/DLA/2026/B/1042</strong> (&quot;Allô Taf&quot;, &quot;we&quot;, &quot;us&quot;).
                </p>
                <p className="text-justify">
                  By creating an account, by ticking the acceptance box on a registration form, by scanning an Allô Taf QR code and submitting the form to which it leads, or simply by using the Platform, you accept these Terms in full. If you do not accept them, you must not use the Platform.
                </p>
                <p className="text-justify">
                  These Terms are supplemented by our Privacy Policy and our Account Deletion Policy, which form an integral part of the agreement between us. Where you subscribe to a paid offer, the specific conditions of that offer also apply and, in the event of conflict, prevail over these Terms in respect of that offer only.
                </p>

                <h3 className="text-sm font-bold text-gray-955 dark:text-white pt-4" id="definitions">2. Definitions</h3>
                <div className="overflow-x-auto border border-gray-200 dark:border-zinc-800 rounded-xl">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-zinc-850 border-b border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-zinc-200 font-semibold">
                        <th className="p-3.5 w-1/4">Term</th>
                        <th className="p-3.5">Meaning</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-150 dark:divide-zinc-800 text-gray-655 dark:text-zinc-350">
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-100 align-top">Platform</td>
                        <td className="p-3.5 align-top">The website allotaf.com, the Allô Taf mobile application, and all associated services, forms, landing pages and content.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-100 align-top">User</td>
                        <td className="p-3.5 align-top">Any person who accesses or uses the Platform, in any capacity.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-100 align-top">Job Seeker</td>
                        <td className="p-3.5 align-top">A natural person registered in order to find employment or professional opportunities.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-100 align-top">Employer</td>
                        <td className="p-3.5 align-top">A company, institution, association or individual employer registered in order to publish opportunities or search for candidates.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-100 align-top">Founding Enterprise</td>
                        <td className="p-3.5 align-top">An Employer that joins the Platform under the Entreprises Fondatrices launch programme, on the specific conditions of that programme.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-100 align-top">Ambassador</td>
                        <td className="p-3.5 align-top">A natural person accredited by Allô Taf to introduce Job Seekers and Employers to the Platform in the field.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-100 align-top">Content</td>
                        <td className="p-3.5 align-top">Any text, image, document, curriculum vitae, logo, offer, message or other material published or transmitted on the Platform.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-100 align-top">Account</td>
                        <td className="p-3.5 align-top">The personal space created by a User in order to access the Platform.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-100 align-top">Pack</td>
                        <td className="p-3.5 align-top">A paid subscription or service offer proposed to Employers.</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-100 align-top">Bonus</td>
                        <td className="p-3.5 align-top">The variable amount payable to an Ambassador under the ambassador programme, on the conditions set out in clause 9.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            </div>

            {/* Chapter 2: Eligibility & Services */}
            <div 
              ref={eligibilityRef}
              id="eligibility"
              className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 print:border-none print:p-0 print:shadow-none"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-zinc-800 mb-6">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Compass className="w-5 h-5" />
                </div>
                <Heading as="h2" size="h4" className="text-gray-900 dark:text-white font-bold">
                  2. Eligibility & Services
                </Heading>
              </div>

              <div className="space-y-5 text-gray-700 dark:text-zinc-300 leading-relaxed text-sm">
                
                <h3 className="text-sm font-bold text-gray-955 dark:text-white">3. Eligibility</h3>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>You must be at least 18 years old to create an Account of any kind;</li>
                  <li>You must have the legal capacity to enter into a binding agreement;</li>
                  <li>If you register on behalf of an organisation, you warrant that you are duly authorised to bind that organisation, and that organisation is bound by these Terms;</li>
                  <li>You must not have been previously excluded from the Platform, unless we have expressly agreed to your return;</li>
                  <li>Your use of the Platform must be lawful in the country from which you access it.</li>
                </ul>

                <h3 className="text-sm font-bold text-gray-955 dark:text-white pt-2">4. Description of the services</h3>
                <p className="text-justify">
                  Allô Taf provides a digital intermediation and professional networking service. Its purpose is to make recruitment in Cameroon more open and more merit-based, by replacing informal networks of personal favour with a transparent, verifiable and skills-based system.
                </p>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">4.1 What the Platform does</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>Allows Job Seekers to create a profile, publish their skills and experience, and apply to opportunities;</li>
                  <li>Allows Employers to publish opportunities, to search profiles and to contact candidates;</li>
                  <li>Proposes matches between profiles and opportunities on the basis of objective professional criteria;</li>
                  <li>Offers verification mechanisms intended to increase confidence in the identity of users and in the reality of the opportunities published;</li>
                  <li>Provides messaging, notification and follow-up tools;</li>
                  <li>Operates an ambassador network which introduces users to the Platform in the field.</li>
                </ul>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">4.2 What the Platform does not do</h4>
                <div className="p-5 rounded-xl bg-amber-50 border border-amber-250 dark:bg-amber-950/20 dark:border-amber-900/60 text-gray-800 dark:text-zinc-300">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 mb-2">
                    Allô Taf is an Intermediary, not an Employer and not a Recruitment Agency
                  </h5>
                  <p className="text-xs text-justify leading-relaxed">
                    Allô Taf does not employ Job Seekers, does not hire on behalf of Employers, and is not a party to any employment contract, service contract or other agreement concluded between a Job Seeker and an Employer.
                  </p>
                  <p className="text-xs text-justify leading-relaxed mt-2">
                    Allô Taf gives no guarantee that a Job Seeker will find employment, that an Employer will find a suitable candidate, that an opportunity published is genuine, that the information supplied by a User is accurate, or that a recruitment process conducted off the Platform will be fair or lawful.
                  </p>
                  <p className="text-xs text-justify leading-relaxed mt-2 font-medium">
                    Verification badges displayed on the Platform indicate that certain checks have been carried out at a given moment. They are an indication of plausibility, not a warranty, and they do not relieve you of the duty to exercise your own judgement before accepting a job, signing a contract or sharing sensitive information.
                  </p>
                </div>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">4.3 Availability and evolution</h4>
                <p className="text-justify text-xs sm:text-sm">
                  We aim to keep the Platform available at all times, but we do not guarantee uninterrupted availability. Access may be suspended for maintenance, security, updating or reasons beyond our control. We may add, modify or withdraw features. Where a change materially reduces a paid service you have already purchased, clause 10.6 applies.
                </p>

              </div>
            </div>

            {/* Chapter 3: Account Registration & Use */}
            <div 
              ref={registrationRef}
              id="registration"
              className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 print:border-none print:p-0 print:shadow-none"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-zinc-800 mb-6">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Users className="w-5 h-5" />
                </div>
                <Heading as="h2" size="h4" className="text-gray-900 dark:text-white font-bold">
                  3. Account Registration & Use
                </Heading>
              </div>

              <div className="space-y-5 text-gray-700 dark:text-zinc-300 leading-relaxed text-sm">
                
                <h3 className="text-sm font-bold text-gray-955 dark:text-white">5. Account registration</h3>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>You must provide accurate, current, and complete information when registering, and keep it up to date;</li>
                  <li>One natural person may hold only one Job Seeker Account. One organisation may hold one Employer Account, which may have several named users;</li>
                  <li>You may not register under a false identity, use the identity of another person, or create an Account on behalf of someone else without their authority;</li>
                  <li>We may require verification of your telephone number, your email address, your identity or the existence of your organisation before granting full access to certain features;</li>
                  <li>We may refuse a registration, or withdraw a verification, where we have reasonable grounds to doubt the information supplied.</li>
                </ul>

                <h3 className="text-sm font-bold text-gray-955 dark:text-white pt-2">6. Your obligations as an account holder</h3>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Keep your password confidential. Do not share it, and do not allow another person to use your Account;</li>
                  <li>Take responsibility for all activity carried out through your Account, unless you can show it resulted from a security failure attributable to us;</li>
                  <li>Inform us without delay at <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 font-mono text-xs text-primary">support@allotaf.com</code> if you suspect unauthorised use of your Account;</li>
                  <li>Use the Platform in good faith, lawfully, and in a manner that respects other Users;</li>
                  <li>Do not attempt to circumvent, disable or test the security of the Platform;</li>
                  <li>Do not use automated means — robots, scrapers, harvesters — to extract data from the Platform without our prior written authorisation.</li>
                </ul>

              </div>
            </div>

            {/* Chapter 4: Role Obligations */}
            <div 
              ref={rolesRef}
              id="roles"
              className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 print:border-none print:p-0 print:shadow-none"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-zinc-800 mb-6">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Briefcase className="w-5 h-5" />
                </div>
                <Heading as="h2" size="h4" className="text-gray-900 dark:text-white font-bold">
                  4. Role Obligations
                </Heading>
              </div>

              <div className="space-y-5 text-gray-700 dark:text-zinc-300 leading-relaxed text-sm">
                
                <h3 className="text-sm font-bold text-gray-955 dark:text-white">7. Specific obligations of Employers</h3>
                <p className="text-justify font-medium text-xs sm:text-sm">
                  Employers carry the heaviest responsibilities on the Platform, because they handle the personal data and the professional futures of other people. If you register as an Employer, you undertake to comply with the following, in addition to the general obligations in clause 6.
                </p>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">7.1 Job offers</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>Publish only genuine opportunities, corresponding to a real position you intend to fill;</li>
                  <li>Describe accurately the position, the required skills, the type of contract, the place of work and, where possible, the remuneration;</li>
                  <li>Publish under the identity of the organisation actually recruiting, and not under a borrowed or misleading identity;</li>
                  <li>Update or withdraw an offer once the position is filled or withdrawn;</li>
                  <li>Do not use an offer as a pretext to collect personal data, to promote a product, to recruit for a network or to advertise a training course sold by you.</li>
                </ul>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">7.2 Non-discrimination</h4>
                <p className="text-justify text-xs sm:text-sm">
                  You must not publish an offer, apply a selection criterion, or take a recruitment decision on the basis of ethnic or regional origin, name, language, religion, political or trade-union opinion, sex, pregnancy, family situation, state of health, disability or any other ground prohibited by Cameroonian law, save where a distinction is objectively justified and expressly permitted by law. Offers containing discriminatory criteria will be removed.
                </p>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">7.3 No charges to candidates</h4>
                <div className="p-5 rounded-xl bg-red-50 border border-red-205 dark:bg-red-950/20 dark:border-red-900/60 text-gray-800 dark:text-zinc-300">
                  <h5 className="text-xs font-extrabold uppercase tracking-wider text-red-700 dark:text-red-400 mb-2 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" />
                    YOU MUST NEVER ASK A CANDIDATE FOR MONEY
                  </h5>
                  <p className="text-xs text-justify leading-relaxed font-semibold">
                    No Employer may request from a Job Seeker, at any stage, a payment, a deposit, a file fee, a training fee, a medical examination fee, an &quot;administrative&quot; contribution, an airtime transfer, mobile money or a gift, in exchange for an application, an interview, a test or a job.
                  </p>
                  <p className="text-xs text-justify leading-relaxed mt-2">
                    This is one of the most common forms of recruitment fraud in the region and it is the practice Allô Taf exists to eliminate. Any Employer who does this will be permanently excluded without refund and may be reported to the competent authorities. Job Seekers are invited to report any such request immediately by email to <code className="px-1 py-0.5 rounded bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400">support@allotaf.com</code>.
                  </p>
                </div>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">7.4 Candidate data</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>Use candidate data exclusively for the purpose of assessing an application for the position concerned;</li>
                  <li>Do not transfer, sell, publish or reuse candidate data for any other purpose, including marketing, or share it with any third party without the candidate&apos;s consent;</li>
                  <li>Keep candidate data confidential and secure, and delete it once it is no longer needed for the recruitment concerned;</li>
                  <li>Do not request from a candidate any of the sensitive data listed in section 9 of the Privacy Policy;</li>
                  <li>Comply, as an independent controller of the data you obtain, with Law No. 2024/017 and with all other applicable legislation. Allô Taf is not responsible for the way an Employer processes data after obtaining it, and you indemnify us against the consequences of your own breaches.</li>
                </ul>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">7.5 Legal compliance</h4>
                <p className="text-justify text-xs sm:text-sm">
                  You warrant that you comply with the Labour Code, social security obligations, health and safety rules and all other legislation applicable to your activity, and that any contract you conclude with a person met through the Platform will comply with those rules.
                </p>

                <h3 className="text-sm font-bold text-gray-955 dark:text-white pt-4">8. Specific obligations of Job Seekers</h3>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>Provide truthful information about your identity, your experience and your qualifications. Falsifying a diploma, a certificate or a work history is a serious breach of these Terms and may constitute an offence;</li>
                  <li>Upload only documents you are entitled to share, and do not include the personal data of third parties without their agreement;</li>
                  <li>Do not include in your profile or your documents any of the sensitive data listed in section 9 of the Privacy Policy;</li>
                  <li>Apply only to opportunities that genuinely interest you, and inform the Employer if you withdraw;</li>
                  <li>Behave respectfully towards Employers and towards other Users;</li>
                  <li>Never pay money to obtain a job through the Platform, and report any request for payment immediately.</li>
                </ul>

              </div>
            </div>

            {/* Chapter 5: Ambassador Programme */}
            <div 
              ref={ambassadorRef}
              id="ambassador"
              className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 print:border-none print:p-0 print:shadow-none"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-zinc-800 mb-6">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Globe className="w-5 h-5" />
                </div>
                <Heading as="h2" size="h4" className="text-gray-900 dark:text-white font-bold">
                  5. The Ambassador Programme
                </Heading>
              </div>

              <div className="space-y-5 text-gray-700 dark:text-zinc-300 leading-relaxed text-sm">
                
                <h3 className="text-sm font-bold text-gray-955 dark:text-white">9. The Ambassador programme</h3>
                
                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">9.1 Status of the Ambassador</h4>
                <div className="p-5 rounded-xl bg-slate-50 border border-gray-200 dark:bg-zinc-900/60 dark:border-zinc-800/80">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-zinc-200 mb-2">
                    An Ambassador is Not an Employee and Not an Agent
                  </h5>
                  <p className="text-xs text-justify leading-relaxed">
                    Accreditation as an Ambassador creates no employment relationship, no contract of employment, no mandate and no agency between the Ambassador and Allô Taf. Ambassadors act independently, choose their own hours and methods within the rules of the programme, and are not subordinate to Allô Taf in the sense of labour law.
                  </p>
                  <p className="text-xs text-justify leading-relaxed mt-2">
                    An Ambassador may not negotiate on behalf of Allô Taf, conclude contracts in its name, quote prices other than those officially published, make commitments to an Employer, collect money on behalf of Allô Taf, or present themselves as an employee, a director or a commercial agent of Allô Taf.
                  </p>
                  <p className="text-xs text-justify leading-relaxed mt-2 font-medium">
                    Each Ambassador is responsible for their own tax and social declarations in respect of any Bonus received.
                  </p>
                </div>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">9.2 Role of the Ambassador</h4>
                <p className="text-justify text-xs sm:text-sm">
                  The Ambassador&apos;s role is to present Allô Taf in the field, to explain how it works, and to invite Job Seekers and Employers to register using the QR codes and the personal code assigned to them. Ambassadors are field agents, not salespeople. Once a registration form has been submitted, the Allô Taf coordination team takes over: it contacts the organisation, presents the Packs, answers commercial questions and concludes any agreement.
                </p>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">9.3 Ambassador obligations</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>Present Allô Taf honestly and never promise a job, a salary, a delay or a result;</li>
                  <li>Obtain the agreement of a person before communicating their name and telephone number to Allô Taf;</li>
                  <li>Never register a fictitious person or organisation, never use another person&apos;s details, and never submit a registration without that person&apos;s knowledge;</li>
                  <li>Never ask a Job Seeker or an Employer for money, in any form, in connection with registration on the Platform;</li>
                  <li>Respect the visual identity of Allô Taf and use only the materials supplied by the coordination team;</li>
                  <li>Keep confidential any information about Users obtained in the course of their activity.</li>
                </ul>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">9.4 Bonus scale</h4>
                <p className="text-justify text-xs text-gray-500 dark:text-zinc-450">
                  Bonuses are calculated on the number of registrations validated by the Allô Taf team during the reference period. A registration that is duplicated, fictitious, incomplete, unverifiable or made without the knowledge of the person concerned is not validated and is not counted.
                </p>
                
                <div className="overflow-x-auto border border-gray-200 dark:border-zinc-800 rounded-xl max-w-md">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-zinc-850 border-b border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-zinc-200 font-semibold">
                        <th className="p-3.5">Validated registrations</th>
                        <th className="p-3.5">Bonus Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-150 dark:divide-zinc-800 text-gray-655 dark:text-zinc-350 font-medium">
                      <tr>
                        <td className="p-3.5">0 to 4</td>
                        <td className="p-3.5 text-gray-550 dark:text-zinc-400">0 FCFA</td>
                      </tr>
                      <tr>
                        <td className="p-3.5">5 to 9</td>
                        <td className="p-3.5 text-primary dark:text-[#00A693]">4,000 FCFA</td>
                      </tr>
                      <tr>
                        <td className="p-3.5">10 to 19</td>
                        <td className="p-3.5 text-primary dark:text-[#00A693]">7,500 FCFA</td>
                      </tr>
                      <tr>
                        <td className="p-3.5">20 and above</td>
                        <td className="p-3.5 text-primary dark:text-[#00A693] font-bold">15,000 FCFA</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-justify italic text-gray-500 dark:text-zinc-450 mt-1">
                  The scale, the reference period, the validation criteria and the payment method may be modified by Allô Taf for the future, with reasonable notice communicated through the official ambassador channels. Modifications do not affect a Bonus already earned and validated.
                </p>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">9.5 Payment and withdrawal of accreditation</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>Bonuses are paid to the mobile money number or bank account declared by the Ambassador, after validation, according to the payment calendar communicated by the coordination team;</li>
                  <li>Allô Taf may withhold or recover a Bonus obtained by means of a fraudulent, duplicated or fictitious registration;</li>
                  <li>Accreditation may be withdrawn at any time, with immediate effect, in the event of a breach of clause 9.3, of fraud, or of conduct damaging to the reputation of Allô Taf;</li>
                  <li>An Ambassador may resign at any time by informing the coordination team. Bonuses validly earned before the resignation remain payable.</li>
                </ul>

              </div>
            </div>

            {/* Chapter 6: Commercial Terms */}
            <div 
              ref={paymentRef}
              id="payment"
              className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 print:border-none print:p-0 print:shadow-none"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-zinc-800 mb-6">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Server className="w-5 h-5" />
                </div>
                <Heading as="h2" size="h4" className="text-gray-900 dark:text-white font-bold">
                  6. Commercial Terms
                </Heading>
              </div>

              <div className="space-y-5 text-gray-700 dark:text-zinc-300 leading-relaxed text-sm">
                
                <h3 className="text-sm font-bold text-gray-955 dark:text-white">10. Packs, prices and payment</h3>
                
                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">10.1 Free access</h4>
                <p className="text-justify text-xs sm:text-sm">
                  Registration and the basic use of the Platform are free for Job Seekers. Allô Taf does not charge Job Seekers to apply for a position.
                </p>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">10.2 Employer Packs</h4>
                <p className="text-justify text-xs sm:text-sm">
                  Employers may subscribe to Packs whose content, duration and price are those published on the Platform or communicated in writing by our team at the time of the order.
                </p>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">10.3 Founding Enterprises</h4>
                <p className="text-justify text-xs sm:text-sm">
                  The Entreprises Fondatrices programme is a limited launch offer. Its specific conditions — including the number of places, the advantages granted and their duration — are those communicated at the time of subscription and prevail over the general Pack conditions.
                </p>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">10.4 Prices and currency</h4>
                <p className="text-justify text-xs sm:text-sm">
                  Prices are expressed in FCFA and, unless stated otherwise, exclusive of any applicable taxes and duties, which are added at the rate in force.
                </p>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">10.5 Payment</h4>
                <p className="text-justify text-xs sm:text-sm">
                  Payment is made by the means indicated at the time of the order, which may include mobile money, bank transfer or another accepted method. Access to the paid features begins once payment is confirmed. An invoice is issued for every payment.
                </p>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">10.6 Changes to a Pack</h4>
                <p className="text-justify text-xs sm:text-sm">
                  We may change the composition or the price of a Pack for the future. A change does not affect a subscription already paid for its current term. Where a change materially reduces a service you have already paid for, you may request a proportionate refund of the unused period.
                </p>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">10.7 Refunds</h4>
                <p className="text-justify text-xs sm:text-sm">
                  Sums paid are not refundable except where the law requires it, where the service has not been supplied, or where clause 10.6 applies. No refund is due where a Pack is terminated because of a breach of these Terms by the Employer.
                </p>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">10.8 Late payment</h4>
                <p className="text-justify text-xs sm:text-sm">
                  Where a subscription is not paid on the due date, we may suspend access to the paid features after informing you, without prejudice to our right to claim the sums owed.
                </p>

              </div>
            </div>

            {/* Chapter 7: Platform Rules & Infringements */}
            <div 
              ref={conductRef}
              id="conduct"
              className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 print:border-none print:p-0 print:shadow-none"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-zinc-800 mb-6">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <Heading as="h2" size="h4" className="text-gray-900 dark:text-white font-bold">
                  7. Platform Rules & Infringements
                </Heading>
              </div>

              <div className="space-y-5 text-gray-700 dark:text-zinc-300 leading-relaxed text-sm">
                
                <h3 className="text-sm font-bold text-gray-955 dark:text-white">11. Prohibited content</h3>
                <p className="text-justify text-xs sm:text-sm">
                  You must not publish, transmit or store on the Platform any Content which:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>Is false, misleading, or describes an opportunity that does not exist;</li>
                  <li>Is discriminatory, hateful, or incites hatred or violence against a person or a group;</li>
                  <li>Is defamatory, insulting, threatening or harassing;</li>
                  <li>Is pornographic, obscene, or otherwise contrary to public decency;</li>
                  <li>Concerns an activity that is illegal, or a job that could not lawfully be performed;</li>
                  <li>Advertises a pyramid scheme, a network-marketing recruitment, a lottery, gambling, a loan offer or an investment scheme;</li>
                  <li>Requests money from a candidate, in any form and under any description;</li>
                  <li>Contains the sensitive personal data listed in section 9 of the Privacy Policy, whether about you or about someone else;</li>
                  <li>Contains the personal data of a third party published without their consent;</li>
                  <li>Infringes a trademark, a copyright, a design or any other intellectual property right;</li>
                  <li>Contains a virus, malicious code or any element capable of damaging the Platform or the devices of other Users;</li>
                  <li>Contains unsolicited advertising, spam or a mass commercial solicitation unrelated to employment.</li>
                </ul>

                <h3 className="text-sm font-bold text-gray-955 dark:text-white pt-2">12. Prohibited activities</h3>
                <p className="text-justify text-xs sm:text-sm">
                  You must not:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>Use the Platform for any purpose other than employment, professional networking and recruitment;</li>
                  <li>Extract, copy, index or reuse the database of profiles or offers, in whole or in substantial part, by any means;</li>
                  <li>Contact Users for a purpose unrelated to a genuine professional opportunity;</li>
                  <li>Create multiple accounts to circumvent a restriction or to inflate ambassador results;</li>
                  <li>Impersonate another person, an organisation or a member of the Allô Taf team;</li>
                  <li>Sell, transfer or share access to your Account;</li>
                  <li>Interfere with the operation of the Platform, overload it, or attempt to gain unauthorised access to any part of it or to the data of another User;</li>
                  <li>Reverse-engineer, decompile or disassemble the application, except to the extent that the law expressly permits it;</li>
                  <li>Use the Platform to commit or facilitate an offence, in particular fraud, extortion or human trafficking.</li>
                </ul>

                <h3 className="text-sm font-bold text-gray-955 dark:text-white pt-2">13. Moderation, verification and reporting</h3>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>We may review, moderate, refuse, modify or remove any Content that appears to breach these Terms or the law, without being obliged to do so and without prior notice where the seriousness of the case requires it;</li>
                  <li>We are not obliged to monitor Content generally, and we do not guarantee that every unlawful item will be detected;</li>
                  <li>Any User may report an offer, a profile, a message or a behaviour using the reporting function or by writing to <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 font-mono text-xs text-primary">support@allotaf.com</code>. Reports are examined and, where they are founded, acted upon;</li>
                  <li>Verification badges reflect checks carried out at a given moment. They may be withdrawn where new information comes to light;</li>
                  <li>Where a report concerns a suspected offence, we may inform the competent authorities and provide them with the information the law requires us to provide.</li>
                </ul>

              </div>
            </div>

            {/* Chapter 8: Legal & Dispute */}
            <div 
              ref={legalRef}
              id="legal"
              className="scroll-mt-24 p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm dark:bg-zinc-900 dark:border-zinc-800 print:border-none print:p-0 print:shadow-none"
            >
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-zinc-800 mb-6">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Lock className="w-5 h-5" />
                </div>
                <Heading as="h2" size="h4" className="text-gray-900 dark:text-white font-bold">
                  8. Legal & Dispute Resolution
                </Heading>
              </div>

              <div className="space-y-5 text-gray-700 dark:text-zinc-300 leading-relaxed text-sm">
                
                <h3 className="text-sm font-bold text-gray-955 dark:text-white">14. Intellectual property</h3>
                
                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">14.1 Our rights</h4>
                <p className="text-justify text-xs sm:text-sm">
                  The Platform, its structure, its source code, its databases, its graphic charter, its texts, the Allô Taf name and logo, the tagline &quot;Le bon job, au bon moment&quot;, the ambassador materials and all other distinctive signs are the exclusive property of <strong>Allô Taf SARL</strong> or of its licensors, and are protected by the legislation on intellectual property. Nothing in these Terms transfers any right in them to you.
                </p>
                <p className="text-justify text-xs sm:text-sm">
                  You are granted a personal, non-exclusive, non-transferable and revocable licence to use the Platform for its intended purpose, for the duration of your Account. Any other use — in particular reproduction, adaptation, distribution or commercial exploitation — requires our prior written authorisation.
                </p>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">14.2 Your content</h4>
                <p className="text-justify text-xs sm:text-sm">
                  You retain ownership of the Content you publish. By publishing it, you grant Allô Taf a non-exclusive, worldwide, royalty-free licence to host, store, reproduce, display, adapt for technical purposes and communicate that Content to the Users to whom it is addressed, for the sole purpose of operating and promoting the Platform, for as long as the Content remains published and for the technical period necessary to remove it from our backups thereafter.
                </p>
                <p className="text-justify text-xs sm:text-sm">
                  You warrant that you hold the rights necessary to grant this licence and that your Content does not infringe the rights of any third party. Use of your name, photograph or testimony in a marketing publication requires your separate and specific consent, which you may withdraw at any time.
                </p>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">14.3 Reporting an infringement</h4>
                <p className="text-justify text-xs sm:text-sm">
                  If you consider that Content published on the Platform infringes your rights, write to <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 font-mono text-xs text-primary">legal@allotaf.com</code> identifying the Content, the right invoked and the basis of your claim. We will examine the request and, where it appears founded, remove the Content.
                </p>

                <h3 className="text-sm font-bold text-gray-955 dark:text-white pt-2">15. Third-party services</h3>
                <p className="text-justify">
                  The Platform relies on third-party services, including Google Firebase and Google Play, and may link to sites operated by third parties. Your use of those services is governed by their own terms. We are not responsible for their availability, their content or their practices.
                </p>

                <h3 className="text-sm font-bold text-gray-955 dark:text-white pt-2">16. Warranties and disclaimer</h3>
                <p className="text-justify">
                  The Platform is supplied as it stands. To the fullest extent permitted by Cameroonian law, and without excluding any warranty that the law does not allow us to exclude, we do not warrant that:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>The Platform will be available without interruption or free of defects;</li>
                  <li>The information published by a User is accurate, current or complete;</li>
                  <li>An opportunity published is genuine or will result in a hiring;</li>
                  <li>A candidate proposed is suitable, available or qualified;</li>
                  <li>A recruitment conducted following an introduction on the Platform will be conducted lawfully by the Employer.</li>
                </ul>
                <p className="text-justify">
                  We do commit to acting diligently, to moderating reported abuse, and to correcting defects that are brought to our attention within a reasonable period.
                </p>

                <h3 className="text-sm font-bold text-gray-955 dark:text-white pt-2">17. Limitation of liability</h3>
                <p className="text-justify">
                  To the fullest extent permitted by the law of the Republic of Cameroon:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>Allô Taf is liable only for damage directly caused by its own fault in the performance of its obligations under these Terms;</li>
                  <li>Allô Taf is not liable for the conduct of a User, for the content published by a User, for the outcome of a recruitment, for the performance or the termination of an employment contract, for a payment made between Users outside the Platform, or for a fraud committed by a person misusing the Platform, save where our own fault has contributed to it;</li>
                  <li>Allô Taf is not liable for indirect or consequential loss, in particular loss of profit, loss of opportunity, loss of a job, loss of a contract, reputational harm or loss of data attributable to your own equipment;</li>
                  <li>Where our liability is established in respect of a paid service, it is limited to the sums actually paid by you to Allô Taf during the twelve months preceding the event giving rise to the claim;</li>
                  <li>Nothing in this clause excludes liability for wilful misconduct, gross negligence, or any liability that Cameroonian law does not permit to be excluded or limited.</li>
                </ul>

                <h3 className="text-sm font-bold text-gray-955 dark:text-white pt-2">18. Indemnity</h3>
                <p className="text-justify">
                  You undertake to hold Allô Taf harmless against any claim, action, cost or penalty arising from your breach of these Terms, from Content you have published, from your infringement of the rights of a third party, or from your own failure to comply with the legislation applicable to you, in particular in matters of employment and personal data protection.
                </p>

                <h3 className="text-sm font-bold text-gray-955 dark:text-white pt-2">19. Suspension and termination</h3>
                
                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">19.1 By you</h4>
                <p className="text-justify text-xs sm:text-sm">
                  You may stop using the Platform at any time and delete your Account in accordance with the Account Deletion Policy set out in Part III. Deletion does not entitle you to a refund of sums already due for a current subscription period.
                </p>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">19.2 By us</h4>
                <p className="text-justify text-xs sm:text-sm">
                  We may suspend or terminate your Account, with immediate effect where the seriousness of the case requires it, if:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li>You breach these Terms or the law;</li>
                  <li>You supply false information, in particular about your identity or your qualifications;</li>
                  <li>You request or accept payment from a candidate;</li>
                  <li>You use the Platform fraudulently or to harm another User;</li>
                  <li>Your Account presents a security risk;</li>
                  <li>We are required to do so by a competent authority.</li>
                </ul>
                <p className="text-justify text-xs sm:text-sm">
                  Except where the seriousness of the case, a legal obligation or an investigation prevents it, we will inform you of the reason for the suspension and give you the opportunity to present your explanations. You may contest a suspension by writing to <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 font-mono text-xs text-primary">support@allotaf.com</code>; the decision will be reviewed by a person who was not involved in taking it.
                </p>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">19.3 Effects of termination</h4>
                <p className="text-justify text-xs sm:text-sm">
                  On termination, your access ceases and your Content is withdrawn from publication. Data is then handled in accordance with Part III and with the retention periods set out in the Privacy Policy. Clauses 14, 17, 18, 20, 21 and 22 survive termination.
                </p>

                <h3 className="text-sm font-bold text-gray-955 dark:text-white pt-2">20. Notices and communications</h3>
                <p className="text-justify">
                  We communicate with you by email, by in-app notification, by SMS or through the messaging channels you have declared. It is your responsibility to keep your contact details up to date. A communication is deemed received on the day it is sent to the last address you declared. You may write to us at the addresses given in clause 25.
                </p>

                <h3 className="text-sm font-bold text-gray-955 dark:text-white pt-2">21. Force majeure</h3>
                <p className="text-justify">
                  Neither party is liable for a failure to perform caused by an event beyond its reasonable control, including a natural disaster, a fire, an epidemic, a war, civil unrest, an act of a public authority, a general failure of electricity supply or of electronic communications networks, or a large-scale cyber-attack. The affected party informs the other as soon as possible and the obligations concerned are suspended for the duration of the event.
                </p>

                <h3 className="text-sm font-bold text-gray-955 dark:text-white pt-2">22. Changes to these Terms</h3>
                <p className="text-justify">
                  We may modify these Terms to reflect a change in the Platform, in our offers or in the law. The version in force is always the one published on the Platform, with its date. For a material change, we will inform you at least <strong>15 days</strong> in advance by email or by in-app notice. If you do not accept the new version, you may delete your Account before it takes effect. Continuing to use the Platform after that date constitutes acceptance.
                </p>

                <h3 className="text-sm font-bold text-gray-955 dark:text-white pt-2">23. Dispute resolution and governing law</h3>
                
                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">23.1 Amicable resolution first</h4>
                <p className="text-justify text-xs sm:text-sm">
                  In the event of a dispute, you undertake to contact us first at <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 font-mono text-xs text-primary">legal@allotaf.com</code>, setting out the subject of your complaint and what you seek. We undertake to reply within <strong>15 days</strong> and to seek a solution in good faith. Most difficulties are resolved at this stage.
                </p>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">23.2 Mediation</h4>
                <p className="text-justify text-xs sm:text-sm">
                  If no agreement is reached within <strong>30 days</strong>, the parties may submit the dispute to a mediator chosen by agreement, or to a mediation body competent in Cameroon. The costs of the mediation are shared equally unless the parties agree otherwise.
                </p>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">23.3 Competent courts</h4>
                <p className="text-justify text-xs sm:text-sm">
                  Failing amicable resolution, the dispute is submitted to the competent courts of Douala, Republic of Cameroon, without prejudice to any mandatory rule of jurisdiction that a consumer or an employee may invoke under Cameroonian law.
                </p>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">23.4 Governing law</h4>
                <p className="text-justify text-xs sm:text-sm">
                  These Terms, and any non-contractual obligation arising out of them, are governed by the law of the Republic of Cameroon, including Law No. 2024/017 of 23 December 2024 relating to personal data protection, Law No. 2010/012 of 21 December 2010 on cybersecurity and cybercriminality, and the OHADA Uniform Acts to the extent that they are applicable.
                </p>

                <h3 className="text-sm font-bold text-gray-955 dark:text-white pt-2">24. Miscellaneous</h3>
                
                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">24.1 Entire agreement</h4>
                <p className="text-justify text-xs sm:text-sm">
                  These Terms, the Privacy Policy, the Account Deletion Policy and any specific conditions accepted by you constitute the entire agreement between us in respect of the Platform.
                </p>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">24.2 Severability</h4>
                <p className="text-justify text-xs sm:text-sm">
                  If a provision is found unlawful or unenforceable, it is replaced by a valid provision of equivalent effect, and the remainder of the Terms continues to apply.
                </p>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">24.3 No waiver</h4>
                <p className="text-justify text-xs sm:text-sm">
                  The fact that we do not immediately enforce a provision does not amount to a waiver of it.
                </p>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">24.4 Assignment</h4>
                <p className="text-justify text-xs sm:text-sm">
                  You may not assign your rights under these Terms. We may assign ours in the context of a restructuring or a transfer of the business, provided the level of protection afforded to you is maintained.
                </p>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">24.5 Language</h4>
                <p className="text-justify text-xs sm:text-sm">
                  These Terms are published in English and in French. In the event of a discrepancy between the two versions, the <strong>ENGLISH</strong> version prevails.
                </p>

                <h4 className="text-xs font-bold text-gray-900 dark:text-zinc-200">24.6 Independent relationship</h4>
                <p className="text-justify text-xs sm:text-sm">
                  Nothing in these Terms creates a partnership, a joint venture, an employment relationship or an agency between Allô Taf and any User.
                </p>

                <h3 className="text-sm font-bold text-gray-955 dark:text-white pt-4">25. Contact</h3>
                <p className="text-justify">
                  For any requests, notices, or communications, please use the channels listed below:
                </p>

                <div className="overflow-x-auto border border-gray-200 dark:border-zinc-800 rounded-xl">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-zinc-850 border-b border-gray-200 dark:border-zinc-800 text-gray-800 dark:text-zinc-200 font-semibold">
                        <th className="p-3.5 w-1/3">Purpose</th>
                        <th className="p-3.5">Address</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-150 dark:divide-zinc-800 text-gray-655 dark:text-zinc-350">
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Support and reporting</td>
                        <td className="p-3.5 align-top text-primary dark:text-[#00A693]">support@allotaf.com</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Legal, disputes and intellectual property</td>
                        <td className="p-3.5 align-top text-primary dark:text-[#00A693]">legal@allotaf.com</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Personal data</td>
                        <td className="p-3.5 align-top text-primary dark:text-[#00A693]">privacy@allotaf.com</td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Ambassador programme</td>
                        <td className="p-3.5 align-top text-primary dark:text-[#00A693]">
                          ambassador@allotaf.com <span className="text-gray-500 text-xs">/ WhatsApp: +237 677 88 99 00</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3.5 font-bold text-gray-900 dark:text-zinc-150 align-top">Postal address</td>
                        <td className="p-3.5 align-top font-medium text-gray-900 dark:text-zinc-200">
                          Allô Taf SARL, Boulevard de la Liberté, Akwa, Douala, Republic of Cameroon
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>
            </div>

          </main>
        </div>
      </Container>
    </div>
  );
}
