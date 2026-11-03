"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  X,
  Terminal,
  ShieldCheck,
  Globe,
  ExternalLink,
  Layers,
  Zap,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Smartphone,
  Wifi,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { PiVideoFill } from "react-icons/pi";
import { FaAndroid, FaGooglePlay } from "react-icons/fa";
import { playTechDataPacketSwipe, playTechTick, playTechChirp } from "@/lib/techSound";

// Cyber corner HUD markers
const HudCorners = ({ color = "#B5892D", size = 6 }) => {
  return (
    <>
      <span
        className="absolute -top-[1px] -left-[1px] pointer-events-none transition-all duration-300 group-hover:border-[#fac70f]"
        style={{
          width: size,
          height: size,
          borderTop: `1.5px solid ${color}`,
          borderLeft: `1.5px solid ${color}`,
        }}
      />
      <span
        className="absolute -top-[1px] -right-[1px] pointer-events-none transition-all duration-300 group-hover:border-[#fac70f]"
        style={{
          width: size,
          height: size,
          borderTop: `1.5px solid ${color}`,
          borderRight: `1.5px solid ${color}`,
        }}
      />
      <span
        className="absolute -bottom-[1px] -left-[1px] pointer-events-none transition-all duration-300 group-hover:border-[#fac70f]"
        style={{
          width: size,
          height: size,
          borderBottom: `1.5px solid ${color}`,
          borderLeft: `1.5px solid ${color}`,
        }}
      />
      <span
        className="absolute -bottom-[1px] -right-[1px] pointer-events-none transition-all duration-300 group-hover:border-[#fac70f]"
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

const projects = [
  {
    num: "01", // 1
    sysId: "SYS_PRJ_01",
    category: "Full-Stack Software Development",
    filterCat: "Fullstack",
    title: "Pakhreen Business Website",
    status: "PRODUCTION_ACTIVE",
    description:
      "Pakhreen is a production-ready full-stack digital solutions platform built with Next.js, TypeScript, Prisma, and PostgreSQL. Beyond a modern company website, it provides a powerful admin dashboard with secure Clerk authentication, role-based access control, blog and career management, inquiry management, Stripe payment integration, Cloudflare R2 media storage, and a scalable content management system. The platform also integrates Make.com automation with AI-powered workflows to process inquiries and streamline lead notifications.",
    stack: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Prisma ORM",
      "PostgreSQL",
      "Clerk Auth",
      "Stripe",
      "Cloudflare R2",
      "Make.com",
      "Vercel",
    ],
    image: "/assets/work/pakhreen.png",
    images: ["/assets/work/pakhreen.png"],
    live: "https://pakhreen.com",
    urlDisplay: "pakhreen.com",
  },
  {
    num: "02", // 2
    sysId: "SYS_PRJ_02",
    category: "Full-Stack Software Engineering",
    filterCat: "Fullstack",
    title: "Gideon",
    status: "IN_DEVELOPMENT",
    description:
      "Gideon is an intelligent, voice-first AI assistant currently under development, designed to evolve into a personal AI operating system. The project combines local and cloud-based AI models, real-time voice interaction, computer vision, gesture recognition, and intelligent workflow automation to create a more natural and interactive human-computer experience. Its architecture integrates Ollama for local AI inference, Google's Gemini API for cloud intelligence, Python and FastAPI for backend services, MediaPipe for gesture recognition, and n8n for workflow automation. The system also incorporates a structured knowledge management layer using Obsidian, with a modular architecture designed to support contextual memory, intelligent task execution, and future AI-powered autonomous capabilities.",
    stack: [
      "Ollama",
      "Python",
      "FastAPI",
      "Google Gemini",
      "MediaPipe",
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Obsidian",
      "SQL",
      "n8n",
    ],
    image: "/assets/gideon/gideon1.png",
    images: [
      "/assets/gideon/gideon1.png",
      "/assets/gideon/gideon2.png",
      "/assets/gideon/gideon3.png",
      "/assets/gideon/gideon4.png",
    ],
    live: "https://lnk.bio/pakhreen",
    urlDisplay: "Gideon — Project Overview",
  },
  {
    num: "03", // 3
    sysId: "SYS_PRJ_03",
    category: "Full-Stack AI Software Engineering",
    filterCat: "Fullstack",
    title: "AIVORA – Private Dining AI",
    status: "IN_DEVELOPMENT",
    description:
      "AIVORA is an AI-powered private dining and restaurant ordering platform designed to transform how customers interact with restaurants through natural voice conversations. Built around OpenAI's Realtime API, it enables customers to communicate with an intelligent AI dining assistant, explore restaurant menus, ask questions about dishes, and place orders through real-time voice interactions. The platform combines a Next.js customer interface with a Node.js and Express backend, integrating AI-powered menu understanding, intelligent order matching, conversational order processing, and real-time order updates. It also includes restaurant management capabilities for handling menus, restaurants, dining rooms, tables, and orders, supported by secure authentication and PostgreSQL database integration. Designed with a modular and scalable architecture, AIVORA aims to enhance restaurant efficiency and customer convenience while preserving the human hospitality experience.",
    stack: [
      "OpenAI Realtime API",
      "OpenAI SDK",
      "Node.js",
      "Express.js",
      "TypeScript",
      "Next.js 16",
      "React 19",
      "Tailwind CSS 4",
      "Prisma ORM",
      "PostgreSQL",
      "WebRTC",
      "REST APIs",
      "Postman",
      "Thunder Client",
    ],
    image: "/assets/aivora/aivora1.png",
    images: [
      "/assets/aivora/aivora1.png",
      "/assets/aivora/aivora2.png",
      "/assets/aivora/aivora3.png",
    ],
    live: "https://lnk.bio/pakhreen",
    urlDisplay: "AIVORA – Project Overview",
  },
  {
    num: "04", // 4
    sysId: "SYS_PRJ_04",
    category: "Fullstack Developer",
    filterCat: "Fullstack",
    title: "Rossgrove Church Website",
    status: "PRODUCTION_ACTIVE",
    description:
      "This full-stack church website was designed and developed for Rossgrove Church to manage sermons, events, and church information online. Built with Next.js, TypeScript, and Tailwind CSS, it includes secure authentication, role-based admin access, and a dynamic dashboard for managing sermons and events. Uses Prisma ORM with a PostgreSQL database hosted on Neon and is deployed on Vercel.",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "Prisma ORM",
      "PostgreSQL",
      "NextAuth",
      "Vercel",
    ],
    image: "/assets/work/rossgrove.png",
    images: ["/assets/work/rossgrove.png"],
    live: "https://rossgrovechurch.nz",
    urlDisplay: "rossgrovechurch.nz",
  },
  {
    num: "05", // 5
    sysId: "SYS_PRJ_05",
    category: "Web Development UX/UI",
    filterCat: "Web & 3D",
    title: "3D Animation Webpage",
    status: "EXPERIMENT_LAB",
    description:
      "This collection showcases a range of premium 3D and animated web experiences I designed and developed using modern web technologies and AI-assisted development tools. The projects focus on immersive visuals, interactive animations, smooth transitions, and creative UI/UX, demonstrating how modern frontend development can be combined with AI to create high-quality digital experiences.",
    stack: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "JavaScript",
      "Framer Motion",
      "Three.js",
      "AI Creative Tools",
    ],
    image: "/assets/work/animations-web.png",
    images: ["/assets/work/animations-web.png"],
    live: "https://lnk.bio/mark3dweb",
    urlDisplay: "lnk.bio/mark3dweb",
  },
  {
    num: "06", // 6
    sysId: "SYS_PRJ_06",
    category: "Fullstack Developer",
    filterCat: "Fullstack",
    title: "Handi-Hub Web App",
    status: "ACADEMIC_CAPSTONE",
    description:
      "This e-commerce web application was developed as part of my Master's degree in Information Technology. I built the complete backend with secure JWT-based authentication and the frontend using React.js, delivering a fully functional and scalable online shopping platform with robust inventory and relational data architecture.",
    stack: [
      "ASP.NET Core",
      "C#",
      "React.js",
      "Material UI",
      "JWT Security",
      "MySQL Server",
      "REST APIs",
    ],
    image: "/assets/work/handihub.png",
    images: ["/assets/work/handihub.png"],
    live: "#",
    urlDisplay: "handihub.internal",
    github: {
      backend: "https://github.com/marktmng/handi_hub.git",
      frontend: "https://github.com/marktmng/handi-hub-front.git",
    },
  },
  {
    num: "07", // 7
    sysId: "SYS_PRJ_07",
    category: "Software Developer",
    filterCat: "Cloud & Apps",
    title: "Infinite Cloud Service",
    status: "IN_DEVELOPMENT",
    description:
      "Enterprise cloud drive application developed using ASP.NET Core and React for Source Infinity. Integrates Google Drive APIs and custom cloud storage architecture, designed to be reliable, secure, and user-friendly with Docker-based containerized deployments.",
    stack: [
      "React.js",
      "Vite",
      "Material UI",
      "ASP.NET Core",
      "C#",
      "T-SQL",
      "Docker",
      "Google Drive API",
    ],
    image: "/assets/work/drive.png",
    images: ["/assets/work/drive.png"],
    live: "#",
    urlDisplay: "cloud.sourceinfinity.nz",
    github: { full: "https://github.com/sourceinfinitynz/Infinite-Cloud-Service.git" },
  },
  {
    num: "08", // 08
    sysId: "SYS_PRJ_08",
    category: "Mobile App Developer",
    filterCat: "Mobile App",
    isMobile: true,
    title: "WiRem",
    status: "CLOSED_TESTING",
    description:
      "WiRem is a cross-platform Wi-Fi reminder application built with React Native, Expo, and native Android Kotlin integration. It enables users to create context-aware reminders that automatically trigger when connecting to or disconnecting from specific Wi-Fi networks. Features include real-time Wi-Fi SSID monitoring, background network event detection using Android ConnectivityManager.NetworkCallback, scheduled arrival and departure reminders, custom notification messages, voice reminders, and persistent local storage. The application integrates native Android services and permissions to support background monitoring, alongside a freemium monetisation model with Google Play Billing subscriptions and AdMob advertising. Currently in closed testing, WiRem is welcoming Android testers to help validate functionality, improve reliability, and shape the app ahead of its wider release.",
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Kotlin",
      "Android SDK",
      "Wi-Fi APIs",
      "ConnectivityManager",
      "Background Services",
      "Local Notifications",
      "AsyncStorage",
      "Google Play Billing",
      "Google AdMob",
    ],
    image: "/assets/work/wirem.png",
    images: ["/assets/work/wirem.png"],
    live: "https://groups.google.com/u/4/g/wirem-app-testers",
    urlDisplay: "Join Closed Testers Group // WiRem Android",
  },
  {
    num: "09", // 9
    sysId: "SYS_PRJ_09",
    category: "Frontend Developer",
    filterCat: "Web & 3D",
    title: "Scheduler Web App",
    status: "COMPLETED",
    description:
      "Developed for Brunton NZ to help employees manage appointments, tasks, progress, and leave schedules. Features a centralized, color-coded dashboard for team managers to track real-time resource allocation and task velocity.",
    stack: ["React.js", "REST APIs", "CSS Modules", "HTML5", "Task Architecture"],
    image: "/assets/work/scheduler.png",
    images: ["/assets/work/scheduler.png"],
    live: "#",
    urlDisplay: "scheduler.brunton.nz",
    github: { full: "https://github.com/marktmng/Scheduler-BruntonNZ.git" },
  },
  {
    num: "10", // 10
    sysId: "SYS_PRJ_10",
    category: "Software Developer",
    filterCat: "Web & 3D",
    title: "E-commerce Web App",
    status: "CLIENT_DEPLOYMENT",
    description:
      "Commercial e-commerce application developed during my internship at Source Infinity for a beauty product brand. Features responsive storefront UX, cart systems, automated inventory management, and conversion-optimized checkout.",
    stack: ["Liquid", "CSS3", "JavaScript", "Shopify Engine", "Responsive UI"],
    image: "/assets/work/shopify.png",
    images: ["/assets/work/shopify.png"],
    live: "#",
    urlDisplay: "shop.beautyproducts.com",
    github: { full: "https://github.com/marktmng/just_another_beauty_product.git" },
  },
  {
    num: "11", // 11
    sysId: "SYS_PRJ_11",
    category: "Software Developer",
    filterCat: "Cloud & Apps",
    title: "Desktop Shipping App",
    status: "ENTERPRISE_TOOL",
    description:
      "High-reliability desktop software solution developed for VShipping LTD to streamline shipping orders, manifests, and logistics workflows. Built with C# and optimized T-SQL stored procedures for high-throughput relational processing.",
    stack: ["C#", ".NET Desktop", "T-SQL", "SQL Server", "Object-Oriented Architecture"],
    image: "/assets/work/desktopapp.png",
    images: ["/assets/work/desktopapp.png"],
    live: "#",
    urlDisplay: "vshipping.desktop.exe",
    github: { full: "https://github.com/marktmng/VShippingLTD.git" },
  },
];

const categories = ["All", "Fullstack", "Mobile App", "Web & 3D", "Cloud & Apps"];

// Slide animation variants for touch swipe / click slide
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 320, damping: 32 },
      opacity: { duration: 0.25 },
      scale: { duration: 0.25 },
    },
  },
  exit: (direction) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.97,
    transition: {
      x: { type: "spring", stiffness: 320, damping: 32 },
      opacity: { duration: 0.2 },
      scale: { duration: 0.2 },
    },
  }),
};

// Interactive Multi-Image Slider Component
const ProjectImageSlider = ({
  project,
  index,
  onOpenLightbox,
}) => {
  const images = useMemo(() => {
    if (Array.isArray(project.images) && project.images.length > 0) {
      return project.images;
    }
    return project.image ? [project.image] : [];
  }, [project.images, project.image]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState(0);
  const hasMultiple = images.length > 1;

  const paginate = useCallback(
    (newDirection) => {
      setDirection(newDirection);
      setCurrentIdx((prev) => {
        let next = prev + newDirection;
        if (next < 0) next = images.length - 1;
        if (next >= images.length) next = 0;
        return next;
      });
      playTechDataPacketSwipe();
    },
    [images.length]
  );

  const goToSlide = useCallback(
    (targetIdx) => {
      if (targetIdx === currentIdx) return;
      setDirection(targetIdx > currentIdx ? 1 : -1);
      setCurrentIdx(targetIdx);
      playTechTick();
    },
    [currentIdx]
  );

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-black/40">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none z-10" />

      {/* Main Slide Animated Surface */}
      <div className="w-full h-full relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIdx}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag={hasMultiple ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(e, { offset, velocity }) => {
              if (!hasMultiple) return;
              const swipe = offset.x;
              if (swipe < -45 || velocity.x < -350) {
                paginate(1);
              } else if (swipe > 45 || velocity.x > 350) {
                paginate(-1);
              }
            }}
            className={`absolute inset-0 w-full h-full flex items-center justify-center ${
              hasMultiple ? "cursor-grab active:cursor-grabbing" : ""
            }`}
          >
            <div className="relative w-full h-full p-2 sm:p-4">
              <Image
                src={images[currentIdx]}
                alt={`${project.title} - Screenshot ${currentIdx + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 750px"
                priority={index === 0 && currentIdx === 0}
                quality={85}
                draggable={false}
                className="object-contain p-1 transition-transform duration-500 ease-out pointer-events-none"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* HUD Top-Left Badge: Multiple Images Cue */}
      {hasMultiple && (
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#111110]/85 border border-white/10 backdrop-blur-md shadow-lg pointer-events-none">
          <Layers className="w-3.5 h-3.5 text-[#fac70f]" />
          <span className="text-[10px] font-mono text-white/80 font-medium">
            {images.length} VIEWS
          </span>
          <span className="text-white/30 text-[10px] hidden sm:inline">•</span>
          <span className="text-[9px] font-mono text-[#B5892D] uppercase hidden sm:inline">
            CLICK & SLIDE
          </span>
        </div>
      )}

      {/* Zoom / Lightbox Trigger Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onOpenLightbox(images, currentIdx);
          playTechTick();
        }}
        title="Expand full screen"
        aria-label="View full resolution screenshots"
        className="absolute top-3 right-3 z-20 w-8 h-8 rounded-lg bg-[#111110]/80 hover:bg-[#111110] border border-white/15 hover:border-[#fac70f] text-white/70 hover:text-[#fac70f] flex items-center justify-center backdrop-blur-md transition-all duration-200 shadow-md hover:scale-105 active:scale-95"
      >
        <Maximize2 className="w-3.5 h-3.5" />
      </button>

      {/* Interactive Previous Button */}
      {hasMultiple && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            paginate(-1);
          }}
          aria-label="Previous screenshot"
          className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#111110]/85 hover:bg-[#111110] border border-white/15 hover:border-[#fac70f] text-white/80 hover:text-[#fac70f] flex items-center justify-center backdrop-blur-md transition-all duration-200 shadow-xl group/btn hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 transition-transform group-hover/btn:-translate-x-0.5" />
        </button>
      )}

      {/* Interactive Next Button */}
      {hasMultiple && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            paginate(1);
          }}
          aria-label="Next screenshot"
          className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#111110]/85 hover:bg-[#111110] border border-white/15 hover:border-[#fac70f] text-white/80 hover:text-[#fac70f] flex items-center justify-center backdrop-blur-md transition-all duration-200 shadow-xl group/btn hover:scale-105 active:scale-95"
        >
          <ChevronRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-0.5" />
        </button>
      )}

      {/* Bottom Pagination Capsule */}
      {hasMultiple && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-[#111110]/90 border border-white/15 px-3 py-1.5 rounded-full backdrop-blur-md shadow-2xl">
          <span className="text-[10px] font-mono text-[#fac70f] font-semibold pr-1">
            {String(currentIdx + 1).padStart(2, "0")}/{String(images.length).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-1.5">
            {images.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToSlide(dotIdx);
                }}
                aria-label={`Jump to screenshot ${dotIdx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  dotIdx === currentIdx
                    ? "w-5 h-1.5 bg-[#fac70f] shadow-[0_0_8px_rgba(250,199,15,0.7)]"
                    : "w-1.5 h-1.5 bg-white/35 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
          <span className="text-[9px] font-mono text-white/40 hidden sm:inline pl-1 uppercase tracking-wider">
            SLIDE
          </span>
        </div>
      )}

      {/* Single Image Hover Overlay for projects without multiple images */}
      {!hasMultiple && project.live && project.live !== "#" && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px] group/launch"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#B5892D] text-[#111110] font-mono font-bold text-xs uppercase tracking-wider shadow-2xl group-hover/launch:bg-[#fac70f] transition-colors">
            <span>{project.isMobile ? "JOIN CLOSED TEST" : "LAUNCH INSTANCE"}</span>
            <ExternalLink className="w-4 h-4" />
          </div>
        </a>
      )}
    </div>
  );
};

const ProjectCard = ({ project, index, onOpenLightbox }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isGithubOpen, setIsGithubOpen] = useState(false);
  const githubRef = useRef(null);

  const isEven = index % 2 === 0;

  // Close github dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (githubRef.current && !githubRef.current.contains(e.target)) {
        setIsGithubOpen(false);
      }
    };
    if (isGithubOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isGithubOpen]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full py-12 lg:py-20 border-b border-white/5 last:border-0 relative z-10"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Content Column */}
          <div
            className={`space-y-6 lg:col-span-5 ${
              isEven ? "lg:order-1" : "lg:order-2 lg:col-start-8"
            }`}
          >
            {/* Top Index & Category */}
            <div className="flex flex-col gap-2 relative">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#B5892D]/15 border border-[#B5892D]/30 text-[#fac70f] font-semibold">
                  {project.sysId}
                </span>

                {/* Status Badge */}
                {project.isMobile ? (
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ANDROID // {project.status}
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                    // {project.status}
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight mt-1 group-hover:text-[#fac70f] transition-colors flex items-center gap-2.5 flex-wrap">
                <span>{project.title}</span>
                {project.isMobile && (
                  <span className="inline-flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-normal">
                    <Smartphone className="w-3.5 h-3.5" /> Mobile App
                  </span>
                )}
              </h3>

              <p className="text-xs font-mono text-[#B5892D] uppercase tracking-wider flex items-center gap-2">
                <span>{project.category}</span>
                {project.images && project.images.length > 1 && (
                  <span className="text-[10px] text-white/40 lowercase">
                    ({project.images.length} gallery slides)
                  </span>
                )}
              </p>
            </div>

            {/* Description Box with HUD frame */}
            <div className="relative bg-[#111110]/90 p-6 sm:p-7 rounded-2xl border border-white/10 shadow-xl backdrop-blur-xl group">
              <HudCorners color={project.isMobile ? "#10B981" : "#B5892D"} size={6} />
              <p className="text-white/70 text-sm sm:text-base leading-relaxed font-inter font-light">
                {project.description}
              </p>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {project.stack.map((item, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1 bg-white/5 border rounded-lg text-xs font-mono transition-colors ${
                    project.isMobile && (item.includes("Android") || item.includes("Kotlin") || item.includes("React Native"))
                      ? "border-emerald-500/30 text-emerald-300 hover:border-emerald-400/60"
                      : "border-white/10 text-white/80 hover:border-[#B5892D]/40"
                  }`}
                >
                  #{item}
                </span>
              ))}
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              {project.isMobile ? (
                /* Specialized Mobile CTA for WiRem */
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-[#B5892D] to-[#fac70f] hover:from-emerald-400 hover:to-yellow-300 text-[#111110] font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(250,199,15,0.5)] hover:scale-102"
                >
                  <FaGooglePlay className="w-3.5 h-3.5" />
                  <span>JOIN CLOSED TEST (ANDROID)</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              ) : project.live && project.live !== "#" ? (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#B5892D] hover:bg-[#fac70f] text-[#111110] font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(181,137,45,0.25)] hover:shadow-[0_0_25px_rgba(250,199,15,0.4)]"
                >
                  <span>LIVE PLATFORM</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/40 font-mono text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
                  INTERNAL / DEMO
                </span>
              )}

              {/* GitHub Repository Dropdown */}
              {project.github && Object.keys(project.github).length > 0 && (
                <div className="relative" ref={githubRef}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsGithubOpen(!isGithubOpen);
                      playTechTick();
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#B5892D]/50 text-white/80 hover:text-white font-mono text-xs transition-all duration-300"
                    title="View GitHub repository branches"
                  >
                    <Github className="w-4 h-4 text-[#fac70f]" />
                    <span>SOURCE_CODE</span>
                  </button>

                  {isGithubOpen && (
                    <div className="absolute left-0 bottom-full mb-2 bg-[#111110]/95 border border-[#B5892D]/40 rounded-xl shadow-2xl p-2 z-30 min-w-[160px] backdrop-blur-xl font-mono text-xs">
                      {project.github.frontend && (
                        <a
                          href={project.github.frontend}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-white/70 hover:text-[#fac70f] px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
                        >
                          &gt; branch: frontend
                        </a>
                      )}
                      {project.github.backend && (
                        <a
                          href={project.github.backend}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-white/70 hover:text-[#fac70f] px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
                        >
                          &gt; branch: backend
                        </a>
                      )}
                      {project.github.full && (
                        <a
                          href={project.github.full}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-white/70 hover:text-[#fac70f] px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
                        >
                          &gt; repo: fullstack
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Video Demo Button if available */}
              {project.demo && (
                <button
                  type="button"
                  onClick={() => {
                    setIsVideoOpen(true);
                    playTechTick();
                  }}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#B5892D]/50 text-white/80 hover:text-[#fac70f] font-mono text-xs transition-all duration-300"
                >
                  <PiVideoFill className="w-4 h-4 text-[#B5892D]" />
                  <span>DEMO_REEL</span>
                </button>
              )}
            </div>
          </div>

          {/* Preview Image / Terminal Shell Column */}
          <div
            className={`lg:col-span-7 ${
              isEven ? "lg:order-2" : "lg:order-1 lg:col-start-1"
            }`}
          >
            <div
              className={`relative rounded-2xl overflow-hidden shadow-2xl border bg-[#111110] group transition-all duration-300 ${
                project.isMobile
                  ? "border-emerald-500/20 hover:border-emerald-400/60 hover:shadow-[0_0_35px_rgba(16,185,129,0.2)]"
                  : "border-white/10 hover:border-[#B5892D]/60 hover:shadow-[0_0_35px_rgba(181,137,45,0.2)]"
              }`}
            >
              <HudCorners color={project.isMobile ? "#10B981" : "#B5892D"} size={8} />

              {/* Frame Header Bar: Tailored for Mobile vs Desktop */}
              {project.isMobile ? (
                /* Mobile Device Frame Header */
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#0d1612]/90 border-b border-emerald-500/20">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-5 h-5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                      <FaAndroid className="w-3 h-3" />
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 font-semibold tracking-wider">
                      ANDROID OS
                    </span>
                    <span className="text-white/20 text-xs">/</span>
                    <span className="text-[10px] font-mono text-white/50 uppercase hidden sm:inline">
                      REACT NATIVE & KOTLIN
                    </span>
                  </div>

                  <div className="bg-[#0a0a0a]/80 rounded-md px-3 py-1 text-[11px] text-white/60 font-mono border border-emerald-500/20 flex items-center gap-2 max-w-[260px] truncate shadow-inner">
                    <Wifi className="w-3 h-3 text-[#fac70f] shrink-0" />
                    <span className="truncate">{project.urlDisplay}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      CLOSED TEST
                    </span>
                    <span className="text-[10px] font-mono text-white/40 hidden md:inline">
                      {project.num} // {String(projects.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              ) : (
                /* Desktop Terminal Browser Window Bar */
                <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.04] border-b border-white/10">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>

                  <div className="bg-[#0a0a0a]/80 rounded-md px-3 py-1 text-[11px] text-white/50 font-mono border border-white/5 flex items-center gap-2 max-w-[260px] truncate">
                    <Globe className="w-3 h-3 text-[#B5892D] shrink-0" />
                    <span className="truncate">{project.urlDisplay}</span>
                  </div>

                  <span className="text-[10px] font-mono text-[#B5892D] uppercase hidden sm:inline">
                    {project.num} // {String(projects.length).padStart(2, "0")}
                  </span>
                </div>
              )}

              {/* Screen Content Container with Interactive Slider */}
              <div
                className={`relative overflow-hidden ${
                  project.isMobile
                    ? "aspect-[16/10] sm:aspect-[16/10] bg-[#070b09]"
                    : "aspect-video lg:aspect-[16/10] bg-black/40"
                }`}
              >
                <ProjectImageSlider
                  project={project}
                  index={index}
                  onOpenLightbox={onOpenLightbox}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Video Modal if applicable */}
      {isVideoOpen && project.demo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#0a0a0a]/90 flex justify-center items-center z-50 p-4 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-4xl bg-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-white/10 z-10"
            >
              <X size={20} />
            </button>
            <video
              src={project.demo}
              controls
              autoPlay
              className="w-full h-auto aspect-video"
            />
          </div>
        </motion.div>
      )}
    </>
  );
};

// Fullscreen Lightbox Modal for High-Resolution Inspection
const LightboxModal = ({ isOpen, onClose, images = [], initialIdx = 0 }) => {
  const [activeIdx, setActiveIdx] = useState(initialIdx);

  useEffect(() => {
    setActiveIdx(initialIdx);
  }, [initialIdx, isOpen]);

  // Keyboard navigation support
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
        playTechDataPacketSwipe();
      } else if (e.key === "ArrowRight") {
        setActiveIdx((prev) => (prev + 1) % images.length);
        playTechDataPacketSwipe();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length, onClose]);

  if (!isOpen || images.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-[#B5892D]/20 border border-[#B5892D]/40 text-[#fac70f]">
              HIGH_RES PREVIEW
            </span>
            <span className="text-sm font-mono text-white/70">
              IMAGE {activeIdx + 1} OF {images.length}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all hover:rotate-90"
            aria-label="Close high resolution modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Center Viewport */}
        <div className="relative flex-1 max-w-7xl mx-auto w-full flex items-center justify-center my-4 overflow-hidden">
          <div className="relative w-full h-full max-h-[75vh]">
            <Image
              src={images[activeIdx]}
              alt={`Fullscreen Preview ${activeIdx + 1}`}
              fill
              quality={95}
              className="object-contain"
            />
          </div>

          {/* Navigation chevrons */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => {
                  setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
                  playTechDataPacketSwipe();
                }}
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-black/70 hover:bg-black/90 border border-white/20 hover:border-[#fac70f] text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-2xl"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveIdx((prev) => (prev + 1) % images.length);
                  playTechDataPacketSwipe();
                }}
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-black/70 hover:bg-black/90 border border-white/20 hover:border-[#fac70f] text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-2xl"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Bottom Thumbnail Strip */}
        {images.length > 1 && (
          <div className="flex items-center justify-center gap-2 max-w-7xl mx-auto w-full pt-3 border-t border-white/10 overflow-x-auto pb-1">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setActiveIdx(idx);
                  playTechTick();
                }}
                className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                  idx === activeIdx
                    ? "border-[#fac70f] shadow-[0_0_12px_rgba(250,199,15,0.6)] scale-105"
                    : "border-white/20 hover:border-white/50 opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

const Work = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    images: [],
    initialIdx: 0,
  });

  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const filteredProjects = useMemo(() => {
    if (selectedFilter === "All") return projects;
    return projects.filter((p) => p.filterCat === selectedFilter);
  }, [selectedFilter]);

  const handleOpenLightbox = useCallback((images, initialIdx) => {
    setLightboxState({
      isOpen: true,
      images,
      initialIdx,
    });
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden font-primary selection:bg-[#B5892D]/30 selection:text-[#fac70f]"
    >
      {/* Top Laser Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50 overflow-hidden bg-white/5 pointer-events-none">
        <motion.div
          style={{ width: progressBarWidth }}
          className="h-full bg-gradient-to-r from-[#B5892D]/40 via-[#fac70f] to-[#B5892D] shadow-[0_0_10px_rgba(250,199,15,0.8)]"
        />
      </div>

      {/* Background Cyber Glows */}
      <div className="fixed top-[15%] right-[-5%] w-[450px] h-[450px] bg-[#B5892D]/10 blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[450px] h-[450px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Cyber Grid Lines */}
      <div
        className="fixed inset-0 opacity-[0.05] pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-28 pb-16 max-w-7xl">
        {/* ======================================================== */}
        {/* TOP HUD COMMAND / TELEMETRY STATUS BAR */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12 w-full bg-[#111110]/85 border border-white/10 backdrop-blur-xl rounded-xl p-3 sm:p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 relative shadow-2xl group"
        >
          <HudCorners color="#B5892D" size={8} />

          {/* Left: Terminal status line */}
          <div className="flex items-center gap-3 text-xs tracking-wider">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B5892D] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#B5892D]"></span>
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-[#B5892D] uppercase font-mono">
                SYS.PROJECTS // V2.6
              </span>
              <span className="text-white/30 hidden sm:inline">|</span>
              <span className="text-white/60 font-mono">DEPLOYMENTS: {projects.length}</span>
              <span className="text-white/30 hidden md:inline">|</span>
              <span className="text-white/80 font-mono hidden md:inline">
                INDEXED: <span className="text-emerald-400">100% VERIFIED</span>
              </span>
            </div>
          </div>

          {/* Center: Command prompt */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-white/50 bg-white/5 px-3 py-1 rounded-md border border-white/5 font-mono">
            <Terminal className="w-3.5 h-3.5 text-[#B5892D]" />
            <span>git log --deployed-projects --verified</span>
            <span className="w-1.5 h-3.5 bg-[#B5892D] animate-pulse inline-block" />
          </div>

          {/* Right: Telemetry metrics */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end text-xs font-mono">
            <div className="flex items-center gap-1.5 text-[11px] text-white/50 bg-white/5 px-2.5 py-1 rounded border border-white/5">
              <Layers className="w-3 h-3 text-[#B5892D]" />
              <span>CI/CD PROD</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-white/50 bg-white/5 px-2.5 py-1 rounded border border-white/5">
              <ShieldCheck className="w-3 h-3 text-[#B5892D]" />
              <span>SHA-256</span>
            </div>
          </div>
        </motion.div>

        {/* Header Section */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#B5892D] bg-[#B5892D]/10 px-3 py-1 rounded-full border border-[#B5892D]/30 mb-2">
              ENGINEERING REPERTOIRE
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight">
              Featured <span className="text-[#fac70f] font-normal">Projects</span>
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto font-inter font-light text-sm sm:text-base mt-2 leading-relaxed">
              Explore production architectures, full-stack enterprise solutions, and custom software delivered from concept to deployment.
            </p>
          </motion.div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => {
              const isSelected = selectedFilter === cat;
              const count =
                cat === "All"
                  ? projects.length
                  : projects.filter((p) => p.filterCat === cat).length;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedFilter(cat);
                    playTechChirp();
                  }}
                  className={`text-xs font-mono px-3.5 py-1.5 rounded-lg border transition-all duration-300 flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#B5892D]/20 border-[#B5892D] text-[#fac70f] shadow-[0_0_12px_rgba(181,137,45,0.25)] font-semibold"
                      : "bg-white/[0.03] border-white/10 text-white/60 hover:bg-white/[0.08] hover:text-white"
                  }`}
                >
                  {cat === "Mobile App" && <Smartphone className="w-3 h-3 text-emerald-400" />}
                  <span>{cat}</span>
                  <span className="text-[10px] opacity-60">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Cards List */}
        <div className="space-y-4">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.num}
              project={project}
              index={index}
              onOpenLightbox={handleOpenLightbox}
            />
          ))}
        </div>

        {/* Bottom Call to Action Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 text-center bg-[#111110]/80 border border-[#B5892D]/30 rounded-3xl p-10 sm:p-14 backdrop-blur-xl relative shadow-2xl overflow-hidden group max-w-4xl mx-auto"
        >
          <HudCorners color="#B5892D" size={10} />

          <div className="flex flex-col items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#B5892D] flex items-center gap-1.5 bg-[#B5892D]/10 px-3 py-1 rounded-full border border-[#B5892D]/20">
              <Zap className="w-3.5 h-3.5" /> READY FOR NEW CHALLENGES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-tight leading-tight">
              Think I&apos;d Be a Great Fit for Your <span className="text-[#fac70f] font-normal">Team?</span>
            </h2>
            <p className="text-white/60 max-w-xl text-sm sm:text-base font-inter font-light mt-1">
              Let&apos;s connect and discuss how my full-stack engineering expertise can deliver impact on your technical roadmap.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 bg-[#B5892D] hover:bg-[#fac70f] text-[#111110] font-mono font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(181,137,45,0.25)] hover:shadow-[0_0_30px_rgba(250,199,15,0.4)]"
            >
              <span>INITIATE CONTACT</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen High-Resolution Lightbox */}
      <LightboxModal
        isOpen={lightboxState.isOpen}
        onClose={handleCloseLightbox}
        images={lightboxState.images}
        initialIdx={lightboxState.initialIdx}
      />
    </div>
  );
};

export default Work;
