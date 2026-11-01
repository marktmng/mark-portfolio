"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Icons from react-icons
import { AiOutlineDatabase } from "react-icons/ai";
import {
  FaAws,
  FaBootstrap,
  FaCss3,
  FaDatabase,
  FaFigma,
  FaGithub,
  FaJs,
  FaNodeJs,
  FaPython,
  FaReact,
  FaJava,
  FaHtml5,
  FaDocker,
  FaStripe,
  FaGitAlt,
} from "react-icons/fa";
import {
  SiAdobeaftereffects,
  SiAdobeillustrator,
  SiAdobeindesign,
  SiAdobelightroom,
  SiAdobephotoshop,
  SiAdobepremierepro,
  SiCircleci,
  SiDotnet,
  SiKotlin,
  SiNextdotjs,
  SiTailwindcss,
  SiVercel,
  SiTypescript,
  SiMui,
  SiDjango,
  SiPostgresql,
  SiMysql,
  SiPrisma,
  SiGooglecloud,
  SiCloudflare,
  SiGithubactions,
  SiOpenai,
  SiPostman,
  SiSwagger,
} from "react-icons/si";
import { TbBrandCSharp, TbBrandReactNative } from "react-icons/tb";
import { VscAzure } from "react-icons/vsc";

// Lucide icons
import {
  Terminal,
  Cpu,
  Briefcase,
  GraduationCap,
  User,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Search,
  ShieldCheck,
  Zap,
} from "lucide-react";

// Web Audio API synthesized SFX
import {
  playTechPop,
  playTechTick,
  playTechChirp,
  isSoundEnabled,
  setSoundEnabled,
} from "@/lib/techSound";

// ==========================================
// DATA STRUCTURES
// ==========================================

const about = {
  sysId: "SYS_MARK_01",
  title: "About Me",
  command: "cat /sys/profile/dossier.md",
  description:
    "I am an innovative and results-driven Software Engineer with over 2 years of professional experience across multiple programming paradigms. As an avid learner and technology enthusiast, I excel in high-pressure, fast-paced environments, delivering scalable, high-performance web applications and backend systems. I am passionate about crafting sophisticated solutions using a broad spectrum of modern technologies, and I consistently drive projects from concept to deployment with a focus on code quality, security, and exceptional user experiences. Beyond coding, I thrive on tackling complex architectural challenges and collaborating with cross-functional teams to build products that make a tangible impact.",
  info: [
    { fieldName: "Name", fieldValue: "Mark Tamang", code: "SYS_NAME", copyable: false },
    { fieldName: "Phone", fieldValue: "(+64) 22 380 3511", code: "TEL_FREQ", copyable: true },
    { fieldName: "Experience", fieldValue: "Intermediate", code: "SYS_RANK", copyable: false },
    { fieldName: "Email", fieldValue: "mark@pakhreen.com", code: "NET_MAIL", copyable: true },
    { fieldName: "Availability", fieldValue: "Full-time (Immediate)", code: "OPS_STAT", copyable: false },
    { fieldName: "Languages", fieldValue: "Nepali, English", code: "NAT_LANG", copyable: false },
    { fieldName: "Address", fieldValue: "Auckland, New Zealand", code: "GEO_LOC", copyable: false },
  ],
};

const experience = {
  command: "git log --oneline --graph --all",
  title: "My Experience",
  description:
    "Full-stack software engineer with experience in ASP.NET Core, React, Next.js, and cloud technologies. Skilled in building scalable web applications, REST APIs, and implementing CI/CD pipelines.",
  items: [
    {
      company: "Pakhreen",
      position: "Software Engineer & Founder",
      duration: "Dec 2025 – Present",
      status: "ACTIVE // PRODUCTION",
      nodeId: "NODE_01",
      description:
        "Design and deliver custom software solutions from concept to production. Build full-stack applications, APIs, and cloud-based systems.",
      stack: ["Next.js", "ASP.NET Core", "Cloud", "REST APIs", "PostgreSQL"],
    },
    {
      company: "Source Infinity",
      position: "Software Developer Intern",
      duration: "Sep 2024 – Apr 2025",
      status: "COMPLETED // VERIFIED",
      nodeId: "NODE_02",
      description:
        "Developed full-stack features using ASP.NET Core, React, and SQL Server. Built RESTful APIs with Google Drive API integration. Implemented Docker-based deployments and CI/CD pipelines.",
      stack: ["ASP.NET Core", "React", "SQL Server", "Docker", "CI/CD"],
    },
    {
      company: "Brunton NZ",
      position: "Frontend Developer Intern",
      duration: "Feb 2024 – Apr 2024",
      status: "COMPLETED // VERIFIED",
      nodeId: "NODE_03",
      description:
        "Developed responsive React.js interfaces with RESTful APIs. Built task scheduling feature and resolved frontend/API issues.",
      stack: ["React.js", "REST APIs", "Task Scheduling", "UI Architecture"],
    },
    {
      company: "ECEC Innovation in Education",
      position: "Graphic Designer",
      duration: "Jan 2019 – Apr 2023",
      status: "COMPLETED // VERIFIED",
      nodeId: "NODE_04",
      description:
        "Designed advertisements, brochures, banners, posters, storybooks, and educational materials. Produced illustrations, photography, and video content, combining creative design with visual storytelling to support educational and promotional projects.",
      stack: ["Adobe Suite", "Illustrator", "Photoshop", "InDesign", "Visual Storytelling"],
    },
  ],
};

const education = {
  command: "verify_credentials --authority='AIS_NZ'",
  title: "My Education",
  description:
    "I have pursued a strong academic foundation in software development and information technology, complemented by continuous learning through industry-recognized certifications. My education reflects my commitment to mastering cutting-edge technologies and refining my problem-solving skills.",
  items: [
    {
      institute: "Auckland Institute of Studies",
      degree: "Master of Information Technology (Software Development)",
      duration: "2024 - 2025",
      code: "DEG_MIT_01",
      status: "ACCREDITED // LEVEL 9",
      location: "Auckland, New Zealand",
      highlights: "Distributed Software Systems, Cloud Native Architectures, Advanced Programming.",
    },
    {
      institute: "Auckland Institute of Studies",
      degree: "Graduate Diploma in Information Technology",
      duration: "2023 - 2024",
      code: "DIP_GDIT_02",
      status: "ACCREDITED // LEVEL 7",
      location: "Auckland, New Zealand",
      highlights: "Full-Stack Development, Relational Databases, Software Engineering Methodologies.",
    },
    {
      institute: "Campion College, Nepal",
      degree: "Bachelor of Arts",
      duration: "2017 - 2020",
      code: "DEG_BA_03",
      status: "ACCREDITED // LEVEL 7",
      location: "Kathmandu, Nepal",
      highlights: "Creative Direction, Communication, Critical Analysis & Humanities.",
    },
  ],
};

const skillsData = [
  // Backend & Core
  { icon: <SiDotnet />, name: ".NET", category: "Backend" },
  { icon: <TbBrandCSharp />, name: "C#", category: "Backend" },
  { icon: <FaPython />, name: "Python", category: "Backend" },
  { icon: <FaJava />, name: "Java", category: "Backend" },
  { icon: <SiKotlin />, name: "Kotlin", category: "Backend" },
  { icon: <FaNodeJs />, name: "Node.js", category: "Backend" },
  { icon: <SiDjango />, name: "Django REST", category: "Backend" },

  // Frontend & Mobile
  { icon: <FaReact />, name: "ReactJS", category: "Frontend" },
  { icon: <SiNextdotjs />, name: "NextJS", category: "Frontend" },
  { icon: <SiTypescript />, name: "TypeScript", category: "Frontend" },
  { icon: <FaJs />, name: "Javascript", category: "Frontend" },
  { icon: <FaHtml5 />, name: "HTML", category: "Frontend" },
  { icon: <FaCss3 />, name: "CSS", category: "Frontend" },
  { icon: <TbBrandReactNative />, name: "React Native", category: "Frontend" },
  { icon: <SiTailwindcss />, name: "Tailwind CSS", category: "Frontend" },
  { icon: <FaBootstrap />, name: "Bootstrap", category: "Frontend" },
  { icon: <SiMui />, name: "Material UI", category: "Frontend" },

  // Cloud & DevOps
  { icon: <FaAws />, name: "AWS", category: "Cloud & DevOps" },
  { icon: <VscAzure />, name: "Azure", category: "Cloud & DevOps" },
  { icon: <SiGooglecloud />, name: "GCP", category: "Cloud & DevOps" },
  { icon: <SiCloudflare />, name: "Cloudflare", category: "Cloud & DevOps" },
  { icon: <FaDocker />, name: "Docker", category: "Cloud & DevOps" },
  { icon: <SiGithubactions />, name: "GitHub Actions", category: "Cloud & DevOps" },
  { icon: <SiCircleci />, name: "Circleci", category: "Cloud & DevOps" },
  { icon: <SiVercel />, name: "Vercel", category: "Cloud & DevOps" },

  // Database
  { icon: <FaDatabase />, name: "SQL Server", category: "Database" },
  { icon: <SiPostgresql />, name: "PostgreSQL", category: "Database" },
  { icon: <SiMysql />, name: "MySQL", category: "Database" },
  { icon: <SiPrisma />, name: "Prisma", category: "Database" },
  { icon: <AiOutlineDatabase />, name: "Azure Data Studio", category: "Database" },

  // Tools & APIs
  { icon: <SiOpenai />, name: "OpenAI API", category: "Tools & APIs" },
  { icon: <FaStripe />, name: "Stripe", category: "Tools & APIs" },
  { icon: <FaGithub />, name: "Github", category: "Tools & APIs" },
  { icon: <FaGitAlt />, name: "Git", category: "Tools & APIs" },
  { icon: <SiPostman />, name: "Postman", category: "Tools & APIs" },
  { icon: <SiSwagger />, name: "Swagger", category: "Tools & APIs" },

  // Design Suite
  { icon: <FaFigma />, name: "Figma", category: "Design" },
  { icon: <SiAdobeillustrator />, name: "Adobe Illustrator", category: "Design" },
  { icon: <SiAdobeindesign />, name: "Adobe InDesign", category: "Design" },
  { icon: <SiAdobephotoshop />, name: "Adobe Photoshop", category: "Design" },
  { icon: <SiAdobepremierepro />, name: "Adobe Premiere Pro", category: "Design" },
  { icon: <SiAdobeaftereffects />, name: "Adobe After Effects", category: "Design" },
  { icon: <SiAdobelightroom />, name: "Adobe Lightroom", category: "Design" },
];

const categories = ["All", "Backend", "Frontend", "Cloud & DevOps", "Database", "Tools & APIs", "Design"];

// ==========================================
// SUB-COMPONENTS & HUD CORNERS
// ==========================================

const HudCorners = ({ color = "#B5892D", size = 6, groupHover = true }) => {
  return (
    <>
      <span
        className={`absolute -top-[1px] -left-[1px] pointer-events-none transition-all duration-300 ${groupHover ? "group-hover:border-[#fac70f] group-hover:shadow-[0_0_6px_#fac70f]" : ""
          }`}
        style={{
          width: size,
          height: size,
          borderTop: `1.5px solid ${color}`,
          borderLeft: `1.5px solid ${color}`,
        }}
      />
      <span
        className={`absolute -top-[1px] -right-[1px] pointer-events-none transition-all duration-300 ${groupHover ? "group-hover:border-[#fac70f] group-hover:shadow-[0_0_6px_#fac70f]" : ""
          }`}
        style={{
          width: size,
          height: size,
          borderTop: `1.5px solid ${color}`,
          borderRight: `1.5px solid ${color}`,
        }}
      />
      <span
        className={`absolute -bottom-[1px] -left-[1px] pointer-events-none transition-all duration-300 ${groupHover ? "group-hover:border-[#fac70f] group-hover:shadow-[0_0_6px_#fac70f]" : ""
          }`}
        style={{
          width: size,
          height: size,
          borderBottom: `1.5px solid ${color}`,
          borderLeft: `1.5px solid ${color}`,
        }}
      />
      <span
        className={`absolute -bottom-[1px] -right-[1px] pointer-events-none transition-all duration-300 ${groupHover ? "group-hover:border-[#fac70f] group-hover:shadow-[0_0_6px_#fac70f]" : ""
          }`}
        style={{
          width: size,
          height: size,
          borderBottom: `1.5px solid ${color}`,
          borderRight: `1.5px solid ${color}`,
        }}
      />
    </>
  );
};

// Hacker animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.15 },
  },
};

const popItemVariants = {
  hidden: {
    opacity: 0,
    scale: 0.93,
    y: 16,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 420,
      damping: 24,
    },
  },
};

// ==========================================
// MAIN COMPONENT
// ==========================================

const Resume = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [soundOn, setSoundOn] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [skillSearch, setSkillSearch] = useState("");
  const [copiedKey, setCopiedKey] = useState(null);

  useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, []);

  const toggleSound = () => {
    const nextState = !soundOn;
    setSoundOn(nextState);
    setSoundEnabled(nextState);
    if (nextState) {
      playTechChirp();
    }
  };

  const handleTabChange = (tabId) => {
    if (activeTab === tabId) return;
    playTechPop();
    setActiveTab(tabId);
  };

  const handleCopy = (key, text) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      playTechChirp();
      setTimeout(() => {
        setCopiedKey(null);
      }, 2000);
    }
  };

  // Filter skills by category and search term
  const filteredSkills = useMemo(() => {
    return skillsData.filter((skill) => {
      const matchesCategory =
        selectedCategory === "All" || skill.category === selectedCategory;
      const matchesSearch = skill.name
        .toLowerCase()
        .includes(skillSearch.toLowerCase().trim());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, skillSearch]);

  const navItems = [
    { id: "about", code: "01", label: "Overview", icon: <User className="w-4 h-4" /> },
    { id: "experience", code: "02", label: "Experience", icon: <Briefcase className="w-4 h-4" /> },
    { id: "skills", code: "03", label: "Tech Matrix", icon: <Cpu className="w-4 h-4" /> },
    { id: "education", code: "04", label: "Education", icon: <GraduationCap className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 xl:py-16 relative overflow-hidden font-primary selection:bg-[#B5892D]/30 selection:text-[#fac70f]">
      {/* Background Cyber Ambient Glow & Mesh */}
      <div className="absolute top-[-5%] right-[-5%] w-[450px] h-[450px] bg-[#B5892D]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[450px] h-[450px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

      {/* Cyber Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl">
        {/* ======================================================== */}
        {/* TOP HUD COMMAND / TELEMETRY STATUS BAR */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8 w-full bg-[#111110]/85 border border-white/10 backdrop-blur-xl rounded-xl p-3 sm:p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 relative shadow-2xl group"
        >
          <HudCorners color="#B5892D" size={8} groupHover={false} />

          {/* Left: Terminal Prompt & Status */}
          <div className="flex items-center gap-3 text-xs tracking-wider">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B5892D] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#B5892D]"></span>
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-[#B5892D] uppercase">SYS.CORE // V2.6</span>
              <span className="text-white/30 hidden sm:inline">|</span>
              <span className="text-white/60">NODE: NZ-AKL-01</span>
              <span className="text-white/30 hidden md:inline">|</span>
              <span className="text-white/80 font-mono hidden md:inline">
                STATUS: <span className="text-emerald-400">AUTHENTICATED</span>
              </span>
            </div>
          </div>

          {/* Center: Command prompt display */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-white/50 bg-white/5 px-3 py-1 rounded-md border border-white/5">
            <Terminal className="w-3.5 h-3.5 text-[#B5892D]" />
            <span>mark_os:~# query --module={activeTab}</span>
            <span className="w-1.5 h-3.5 bg-[#B5892D] animate-pulse inline-block" />
          </div>

          {/* Right: Sound FX Toggle & Telemetry */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-white/40">
              <span className="hidden sm:inline">AUDIO FX:</span>
              <button
                type="button"
                onClick={toggleSound}
                onMouseEnter={() => playTechTick()}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs transition-all duration-300 font-mono focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B5892D] ${soundOn
                  ? "bg-[#B5892D]/15 border-[#B5892D]/50 text-[#fac70f] shadow-[0_0_12px_rgba(181,137,45,0.25)]"
                  : "bg-white/5 border-white/10 text-white/40 hover:text-white/70"
                  }`}
                title={soundOn ? "Mute technical sound effects" : "Enable movie-style technical SFX"}
              >
                {soundOn ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                    <span>SFX: ON</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>SFX: OFF</span>
                  </>
                )}
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-white/40 uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded border border-white/5">
              <ShieldCheck className="w-3 h-3 text-[#B5892D]" />
              <span>AES-256</span>
            </div>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* MAIN HUD INTERFACE: NAVIGATION & STACKED CONTENT */}
        {/* ======================================================== */}
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
          {/* Navigation Deck (Hacker Module Selector) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full lg:w-[320px] flex-shrink-0 flex flex-col gap-3"
          >
            <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#B5892D] px-2 mb-1 flex items-center justify-between">
              <span>// SUBSYSTEM_ROUTING</span>
              <span className="text-white/30">[4 MODULES]</span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleTabChange(item.id)}
                    onMouseEnter={() => playTechTick()}
                    className={`relative w-full text-left p-4 sm:p-5 rounded-xl border backdrop-blur-md transition-all duration-300 group overflow-hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B5892D] ${isActive
                      ? "bg-[#B5892D]/15 border-[#B5892D]/60 shadow-[0_0_20px_rgba(181,137,45,0.18)]"
                      : "bg-white/[0.04] border-white/10 hover:bg-white/[0.07] hover:border-white/20"
                      }`}
                  >
                    {isActive && <HudCorners color="#B5892D" size={6} groupHover={false} />}

                    {/* Top sub-label */}
                    <div className="flex items-center justify-between text-[10px] tracking-widest font-mono mb-2">
                      <span className={isActive ? "text-[#B5892D]" : "text-white/40 group-hover:text-white/60"}>
                        MOD_{item.code}
                      </span>
                      <span
                        className={`w-1.5 h-1.5 rounded-full transition-colors ${isActive ? "bg-[#B5892D] shadow-[0_0_8px_#B5892D]" : "bg-white/20"
                          }`}
                      />
                    </div>

                    {/* Main Label */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg transition-colors ${isActive
                            ? "bg-[#B5892D]/20 text-[#fac70f]"
                            : "bg-white/5 text-white/50 group-hover:text-white"
                            }`}
                        >
                          {item.icon}
                        </div>
                        <span
                          className={`text-base sm:text-lg tracking-wide font-medium capitalize transition-colors ${isActive ? "text-white font-semibold" : "text-white/70 group-hover:text-white"
                            }`}
                        >
                          {item.label}
                        </span>
                      </div>
                      <span
                        className={`text-xs font-mono transition-transform duration-300 ${isActive ? "text-[#B5892D] translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                          }`}
                      >
                        &gt;
                      </span>
                    </div>

                    {/* Active accent scan bar */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTabGlow"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#B5892D] to-transparent"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick System Telemetry Footer */}
            <div className="hidden lg:flex flex-col gap-2 p-4 mt-2 bg-white/[0.02] border border-white/5 rounded-xl text-xs text-white/40 font-mono">
              <div className="flex justify-between items-center">
                <span>SECURITY CHECK:</span>
                <span className="text-emerald-400">PASSED [100%]</span>
              </div>
              <div className="flex justify-between items-center">
                <span>SYSTEM UPTIME:</span>
                <span className="text-white/70">99.98%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>ENCRYPTION:</span>
                <span className="text-[#B5892D]">TLS 1.3 / AES</span>
              </div>
            </div>
          </motion.div>

          {/* ======================================================== */}
          {/* DYNAMIC HACKER POP-UP CONTENT PANEL */}
          {/* ======================================================== */}
          <div className="flex-1 w-full min-h-[520px]">
            <AnimatePresence mode="wait">
              {/* ==================================================== */}
              {/* TAB 1: ABOUT / SYSTEM DOSSIER */}
              {/* ==================================================== */}
              {activeTab === "about" && (
                <motion.div
                  key="about-tab"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col gap-6"
                >
                  {/* Section Terminal Header Card */}
                  <motion.div
                    variants={popItemVariants}
                    className="bg-[#111110]/90 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl relative shadow-2xl overflow-hidden group"
                  >
                    <HudCorners color="#B5892D" size={10} />

                    {/* Window Title Bar */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                        <span className="text-xs text-white/40 font-mono ml-2">dossier_profile.sys</span>
                      </div>
                      <span className="text-[10px] font-mono tracking-widest text-[#B5892D] uppercase bg-[#B5892D]/10 px-2.5 py-1 rounded border border-[#B5892D]/20">
                        {about.sysId}
                      </span>
                    </div>

                    <div className="flex flex-col gap-4 text-left">
                      <div className="flex items-center gap-2 text-xs text-[#B5892D] font-mono">
                        <span>&gt;</span>
                        <span>{about.command}</span>
                      </div>
                      <h3 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
                        {about.title}
                      </h3>
                      <p className="text-white/70 text-base sm:text-lg leading-relaxed font-inter font-light">
                        {about.description}
                      </p>
                    </div>
                  </motion.div>

                  {/* Profile Telemetry Parameter Nodes Grid */}
                  <motion.div
                    variants={popItemVariants}
                    className="bg-[#111110]/80 border border-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8 relative shadow-2xl group"
                  >
                    <HudCorners color="#B5892D" size={8} />

                    <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#B5892D] mb-6 flex items-center justify-between">
                      <span>// SYSTEM_TELEMETRY_PARAMETERS</span>
                      <span className="text-white/30">[VERIFIED ENCODING]</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {about.info.map((item, index) => {
                        const isCopied = copiedKey === item.code;
                        return (
                          <motion.div
                            key={index}
                            variants={popItemVariants}
                            whileHover={{ scale: 1.015 }}
                            onMouseEnter={() => playTechTick()}
                            className="bg-white/[0.03] border border-white/5 hover:border-[#B5892D]/40 hover:bg-white/[0.06] transition-all duration-300 p-4 rounded-xl relative group flex flex-col justify-between gap-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-mono text-[#B5892D] uppercase tracking-wider flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-[#B5892D]" />
                                [{item.code}]
                              </span>
                              <span className="text-xs text-white/40">{item.fieldName}</span>
                            </div>

                            <div className="flex items-center justify-between gap-3 mt-1">
                              <span className="text-white/90 font-medium text-base sm:text-lg tracking-wide truncate">
                                {item.fieldValue}
                              </span>

                              {item.copyable && (
                                <button
                                  type="button"
                                  onClick={() => handleCopy(item.code, item.fieldValue)}
                                  className="p-1.5 rounded-md bg-white/5 hover:bg-[#B5892D]/20 text-white/50 hover:text-[#fac70f] transition-all flex items-center gap-1 text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B5892D]"
                                  title="Copy to clipboard"
                                >
                                  {isCopied ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                                      <span className="text-[10px] text-emerald-400 font-mono">COPIED</span>
                                    </>
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Operational Highlights Banner */}
                    <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-white/50">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#B5892D]" />
                        <span>CLEARANCE: FULL-STACK ENGINEER</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span>DEPLOYMENT READINESS: 100%</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* ==================================================== */}
              {/* TAB 2: EXPERIENCE / EXECUTION HISTORY */}
              {/* ==================================================== */}
              {activeTab === "experience" && (
                <motion.div
                  key="experience-tab"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col gap-6"
                >
                  {/* Header summary */}
                  <motion.div
                    variants={popItemVariants}
                    className="bg-[#111110]/90 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl relative shadow-2xl group"
                  >
                    <HudCorners color="#B5892D" size={8} />
                    <div className="flex items-center gap-2 text-xs text-[#B5892D] font-mono mb-2">
                      <span>&gt;</span>
                      <span>{experience.command}</span>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-light text-white tracking-tight mb-3">
                      {experience.title}
                    </h3>
                    <p className="text-white/60 text-base leading-relaxed font-inter font-light">
                      {experience.description}
                    </p>
                  </motion.div>

                  {/* Scrollable Timeline */}
                  <ScrollArea className="h-[460px] sm:h-[540px] xl:h-[580px] w-full pr-2 sm:pr-4">
                    <div className="flex flex-col gap-6 pb-6 relative pl-3 sm:pl-6 border-l border-white/10 ml-2 sm:ml-4">
                      {experience.items.map((item, index) => (
                        <motion.div
                          key={index}
                          variants={popItemVariants}
                          whileHover={{ scale: 1.01 }}
                          onMouseEnter={() => playTechTick()}
                          className="bg-[#111110]/80 border border-white/10 backdrop-blur-xl p-6 sm:p-7 rounded-2xl relative shadow-2xl hover:border-[#B5892D]/50 hover:bg-[#111110]/95 transition-all duration-300 group"
                        >
                          <HudCorners color="#B5892D" size={6} />

                          {/* Timeline node pin */}
                          <span className="absolute -left-[19px] sm:-left-[31px] top-8 w-3 h-3 rounded-full bg-[#111110] border-2 border-[#B5892D] group-hover:scale-125 group-hover:bg-[#B5892D] transition-all duration-300" />

                          {/* Node Header */}
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 mb-4 text-xs font-mono">
                            <div className="flex items-center gap-2">
                              <span className="text-[#B5892D] font-bold">[{item.nodeId}]</span>
                              <span className="text-white/80 uppercase font-semibold">{item.company}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[#fac70f] font-semibold bg-[#B5892D]/10 px-2.5 py-0.5 rounded border border-[#B5892D]/20">
                                {item.duration}
                              </span>
                              <span className="text-[10px] text-white/40 hidden sm:inline">{item.status}</span>
                            </div>
                          </div>

                          {/* Role Title */}
                          <h4 className="text-xl sm:text-2xl font-semibold text-white/90 group-hover:text-white transition-colors">
                            {item.position}
                          </h4>

                          {/* Description */}
                          <p className="text-white/60 text-sm leading-relaxed mt-3 font-inter font-light">
                            {item.description}
                          </p>

                          {/* Tech Stack Chips */}
                          {item.stack && (
                            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
                              {item.stack.map((tech, i) => (
                                <span
                                  key={i}
                                  className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/5 border border-white/5 text-white/70 group-hover:border-[#B5892D]/30 group-hover:text-white transition-colors"
                                >
                                  #{tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                </motion.div>
              )}

              {/* ==================================================== */}
              {/* TAB 3: TECH MATRIX / SKILLS */}
              {/* ==================================================== */}
              {activeTab === "skills" && (
                <motion.div
                  key="skills-tab"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col gap-6"
                >
                  {/* Top Header & Search Console */}
                  <motion.div
                    variants={popItemVariants}
                    className="bg-[#111110]/90 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl relative shadow-2xl group"
                  >
                    <HudCorners color="#B5892D" size={8} />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-[#B5892D] font-mono mb-1">
                          <span>&gt;</span>
                          <span>sys_probe --installed-modules --count={skillsData.length}</span>
                        </div>
                        <h3 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
                          Tech Matrix
                        </h3>
                      </div>

                      {/* Real-time search filter */}
                      <div className="relative w-full sm:w-64">
                        <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={skillSearch}
                          onChange={(e) => setSkillSearch(e.target.value)}
                          placeholder="grep -i skill..."
                          className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs font-mono text-white placeholder-white/30 focus:outline-none focus:border-[#B5892D]/60 transition-colors"
                        />
                      </div>
                    </div>

                    <p className="text-white/60 text-sm leading-relaxed font-inter font-light">
                      Comprehensive directory of programming languages, enterprise cloud environments, backend frameworks, and specialized production tools.
                    </p>

                    {/* Interactive Category Filter Pills */}
                    <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-white/10">
                      {categories.map((cat) => {
                        const isSelected = selectedCategory === cat;
                        const count =
                          cat === "All"
                            ? skillsData.length
                            : skillsData.filter((s) => s.category === cat).length;
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => {
                              setSelectedCategory(cat);
                              playTechPop(0.035);
                            }}
                            onMouseEnter={() => playTechTick()}
                            className={`text-xs font-mono px-3 py-1.5 rounded-md border transition-all duration-300 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B5892D] ${isSelected
                              ? "bg-[#B5892D]/20 border-[#B5892D] text-[#fac70f] shadow-[0_0_12px_rgba(181,137,45,0.2)] font-semibold"
                              : "bg-white/[0.03] border-white/10 text-white/60 hover:bg-white/[0.08] hover:text-white"
                              }`}
                          >
                            <span>{cat}</span>
                            <span className="text-[10px] opacity-60">({count})</span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>

                  {/* Skills Grid */}
                  <ScrollArea className="h-[460px] sm:h-[520px] xl:h-[560px] w-full pr-2 sm:pr-4">
                    {filteredSkills.length === 0 ? (
                      <div className="p-12 text-center text-white/40 font-mono text-sm border border-dashed border-white/10 rounded-xl">
                        NO MODULE MATCHED QUERY "{skillSearch}". PLEASE RESET FILTER.
                      </div>
                    ) : (
                      <motion.ul
                        variants={containerVariants}
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 pb-8"
                      >
                        {filteredSkills.map((skill) => (
                          <motion.li
                            key={skill.name}
                            variants={popItemVariants}
                            whileHover={{ scale: 1.05, y: -2 }}
                            onMouseEnter={() => playTechTick()}
                          >
                            <TooltipProvider delayDuration={50}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    type="button"
                                    className="w-full aspect-[4/3] bg-[#111110]/80 border border-white/10 rounded-xl p-3 flex flex-col items-center justify-center gap-2 hover:border-[#B5892D]/70 hover:bg-[#111110] hover:shadow-[0_0_16px_rgba(181,137,45,0.2)] transition-all duration-300 group cursor-pointer relative overflow-hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B5892D]"
                                  >
                                    <HudCorners color="#B5892D" size={4} />

                                    {/* Icon */}
                                    <div className="text-3xl text-white/60 group-hover:text-[#fac70f] group-hover:scale-110 transition-all duration-300 drop-shadow-md">
                                      {skill.icon}
                                    </div>

                                    {/* Name */}
                                    <span className="text-[11px] font-mono tracking-tight text-white/70 group-hover:text-white truncate max-w-full text-center">
                                      {skill.name}
                                    </span>

                                    {/* Category mini-tag */}
                                    <span className="text-[9px] uppercase font-mono tracking-wider text-white/30 group-hover:text-[#B5892D] transition-colors">
                                      {skill.category.split(" ")[0]}
                                    </span>
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent className="bg-[#111110] border border-[#B5892D]/40 text-white shadow-2xl text-xs font-mono">
                                  <p className="font-semibold text-[#fac70f]">{skill.name}</p>
                                  <p className="text-[10px] text-white/50">{skill.category}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </ScrollArea>
                </motion.div>
              )}

              {/* ==================================================== */}
              {/* TAB 4: EDUCATION / CREDENTIALS */}
              {/* ==================================================== */}
              {activeTab === "education" && (
                <motion.div
                  key="education-tab"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col gap-6"
                >
                  {/* Header summary */}
                  <motion.div
                    variants={popItemVariants}
                    className="bg-[#111110]/90 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl relative shadow-2xl group"
                  >
                    <HudCorners color="#B5892D" size={8} />
                    <div className="flex items-center gap-2 text-xs text-[#B5892D] font-mono mb-2">
                      <span>&gt;</span>
                      <span>{education.command}</span>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-light text-white tracking-tight mb-3">
                      {education.title}
                    </h3>
                    <p className="text-white/60 text-base leading-relaxed font-inter font-light">
                      {education.description}
                    </p>
                  </motion.div>

                  {/* Credentials List */}
                  <ScrollArea className="h-[460px] sm:h-[540px] xl:h-[580px] w-full pr-2 sm:pr-4">
                    <div className="flex flex-col gap-6 pb-6">
                      {education.items.map((item, index) => (
                        <motion.div
                          key={index}
                          variants={popItemVariants}
                          whileHover={{ scale: 1.01 }}
                          onMouseEnter={() => playTechTick()}
                          className="bg-[#111110]/80 border border-white/10 backdrop-blur-xl p-6 sm:p-8 rounded-2xl relative shadow-2xl hover:border-[#B5892D]/60 hover:bg-[#111110]/95 transition-all duration-300 group"
                        >
                          <HudCorners color="#B5892D" size={8} />

                          {/* Credential Header */}
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4 mb-4 text-xs font-mono">
                            <div className="flex items-center gap-2">
                              <span className="text-[#B5892D] font-bold">[{item.code}]</span>
                              <span className="text-white/40">{item.status}</span>
                            </div>
                            <span className="text-[#fac70f] font-semibold bg-[#B5892D]/10 px-3 py-1 rounded border border-[#B5892D]/20">
                              {item.duration}
                            </span>
                          </div>

                          {/* Degree and Institution */}
                          <div>
                            <h4 className="text-xl sm:text-2xl font-semibold text-white/90 group-hover:text-white transition-colors leading-snug">
                              {item.degree}
                            </h4>
                            <div className="flex items-center gap-2 mt-2 text-sm text-white/70 font-mono">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#B5892D]" />
                              <span>{item.institute}</span>
                              <span className="text-white/30">•</span>
                              <span className="text-white/40">{item.location}</span>
                            </div>
                          </div>

                          {/* Focus areas / Highlights */}
                          <div className="mt-4 pt-4 border-t border-white/5 text-xs text-white/50 font-inter">
                            <span className="text-[#B5892D] font-mono mr-1.5">&gt; HIGHLIGHTS:</span>
                            {item.highlights}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
