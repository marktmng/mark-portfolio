"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { PiVideoFill } from "react-icons/pi";

const projects = [
  {
    num: "01",
    category: "Full-Stack SaaS Development",
    title: "Pakhreen Digital Solutions Platform",
    description:
      "Pakhreen is a production-ready full-stack digital solutions platform built with Next.js, TypeScript, Prisma, and PostgreSQL. Beyond a modern company website, it provides a powerful admin dashboard with secure Clerk authentication, role-based access control, blog and career management, inquiry management, Stripe payment integration, Cloudflare R2 media storage, and a scalable content management system. The platform features rich text editing, dynamic service pages, responsive UI, premium animations, SEO optimization, and cloud deployment using Vercel. Designed with scalability and maintainability in mind, Pakhreen serves as the digital foundation for managing clients, projects, content, careers, and future SaaS services from a single platform.",
    stack: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "React" },
      { name: "Tailwind CSS" },
      { name: "Prisma ORM" },
      { name: "PostgreSQL" },
      { name: "Clerk Authentication" },
      { name: "Stripe" },
      { name: "Cloudflare R2" },
      { name: "TipTap Editor" },
      { name: "Framer Motion" },
      { name: "Lucide React" },
      { name: "Vercel" },
      { name: "Cloudflare" },
    ],
    image: "/assets/work/pakhreen.png",
    live: "https://pakhreen.com",
    github: { full: "https://github.com/marktmng/pakhrin.git" },
  },
  {
    num: "02",
    category: "Fullstack Developer",
    title: "Rossgrove Church Website",
    description:
      "This full-stack church website was designed and developed for Rossgrove Church to manage sermons, events, and church information online. Built with Next.js, TypeScript, and Tailwind CSS, it includes secure authentication, role-based admin access, and a dynamic dashboard for managing sermons and events. The application uses Prisma ORM with a PostgreSQL database hosted on Neon and is deployed on Vercel for scalable and reliable hosting.",
    stack: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "Shadcn UI" },
      { name: "Material UI" },
      { name: "Prisma ORM" },
      { name: "PostgreSQL (Neon)" },
      { name: "NextAuth" },
      { name: "Vercel" },
    ],
    image: "/assets/work/rossgrove.png",
    live: "https://rossgrovechurch.nz",
    github: { full: "https://github.com/marktmng/rossgrove_church_website.git" },
    demo: "/assets/videos/rossgrove-video.mp4",
  },
  {
    num: "03",
    category: "Web Development UX/UI",
    title: "3D Animation Webpage",
    description:
      "This collection showcases a range of premium 3D and animated web experiences I designed and developed using modern web technologies and AI-assisted development tools. The projects focus on immersive visuals, interactive animations, smooth transitions, and creative UI/UX, demonstrating how modern frontend development can be combined with AI to create high-quality digital experiences. Explore some of my 3D web experiments and interactive projects through the link below.",
    stack: [
      { name: "Next.Js" },
      { name: "React" },
      { name: "Tailwind" },
      { name: "JavaScript" },
      { name: "Framer Motion" },
      { name: "ChatGPT" },
      { name: "Codex" },
      { name: "Antigravity" },
      { name: "Gemini" },
      { name: "Kling" },
    ],
    image: "/assets/work/animations-web.png",
    live: "https://lnk.bio/mark3dweb",
  },
  {
    num: "04",
    category: "Fullstack Developer",
    title: "Handi-Hub Web App",
    description:
      "This e-commerce web application was developed as part of my Master's degree in Information Technology. I built the complete backend with secure JWT-based authentication and the frontend using React.js, delivering a fully functional and scalable online shopping platform.",
    stack: [
      { name: "ASP.NET" },
      { name: "C#" },
      { name: "React.Js" },
      { name: "MUI" },
      { name: "CSS" },
      { name: "HTML" },
      { name: "JavaScript" },
      { name: "MySQL Server" },
    ],
    image: "/assets/work/handihub.png",
    live: "#",
    github: {
      backend: "https://github.com/marktmng/handi_hub.git",
      frontend: "https://github.com/marktmng/handi-hub-front.git",
    },
    demo: "/assets/videos/handi-hub.mp4",
  },
  {
    num: "05",
    category: "Software Developer",
    title: "Infinite Cloud Service",
    description:
      "This project is being developed using ASP.NET and React. The goal is to create Source Infinity's own drive application with integrated cloud storage services. Designed to be user-friendly and efficient, the project is currently in progress.",
    stack: [
      { name: "React.Js" },
      { name: "Vite" },
      { name: "MUI" },
      { name: "React Router" },
      { name: "ASP.NET" },
      { name: "C#" },
      { name: "TSQL" },
      { name: "Docker" },
    ],
    image: "/assets/work/drive.png",
    live: "#",
    github: { full: "https://github.com/sourceinfinitynz/Infinite-Cloud-Service.git" },
  },
  {
    num: "06",
    category: "Frontend Developer",
    title: "Scheduler Web App",
    description:
      "This Scheduler app was developed for Brunton NZ to help employees manage appointments, tasks, progress, and leave. It also provides managers with a color-coded dashboard to track team performance.",
    stack: [{ name: "React" }, { name: "CSS" }, { name: "HTML" }],
    image: "/assets/work/scheduler.png",
    live: "#",
    github: { full: "https://github.com/marktmng/Scheduler-BruntonNZ.git" },
    demo: "/assets/videos/scheduler.mp4",
  },
  {
    num: "07",
    category: "Software Developer",
    title: "E-commerce Web App",
    description:
      "This e-commerce app was developed for a client to sell beauty products online during my internship at Source Infinity. Built with Shopify, it provides a responsive and user-friendly shopping experience.",
    stack: [{ name: "Liquid" }, { name: "CSS" }, { name: "JavaScript" }],
    image: "/assets/work/shopify.png",
    live: "#",
    github: { full: "https://github.com/marktmng/just_another_beauty_product.git" },
  },
  {
    num: "08",
    category: "Software Developer",
    title: "Desktop App",
    description:
      "This desktop app was developed for VShipping LTD to help employees manage their shipping orders efficiently. Built with C# and TSQL.",
    stack: [{ name: "C#" }, { name: "TSQL" }],
    image: "/assets/work/desktopapp.png",
    live: "#",
    github: { full: "https://github.com/marktmng/VShippingLTD.git" },
  },
];

const ProjectCard = ({ project, index }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);

  // Parallax effects
  const contentY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const numScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothOpacity = useSpring(opacity, springConfig);
  const smoothScale = useSpring(scale, springConfig);
  const smoothContentY = useSpring(contentY, springConfig);
  const smoothImageY = useSpring(imageY, springConfig);
  const smoothNumScale = useSpring(numScale, springConfig);

  const isEven = index % 2 === 0;
  const customEase = [0.25, 0.1, 0.25, 1.0];

  return (
    <>
      <motion.div
        ref={cardRef}
        style={{ opacity: smoothOpacity, scale: smoothScale }}
        className="min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16 py-20 relative z-10"
      >
        <div className={`max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center`}>

          {/* Content Section */}
          <motion.div
            style={{ y: smoothContentY }}
            className={`space-y-6 z-10 lg:col-span-5 ${isEven ? "lg:order-1" : "lg:order-2 lg:col-start-8"}`}
          >
            <div className="relative">
              <motion.div
                style={{ scale: smoothNumScale, WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
                className="absolute -top-16 -left-8 text-8xl md:text-9xl font-extrabold text-transparent select-none z-[-1]"
              >
                {project.num}
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: customEase }}
                className="text-[#B5892D] font-medium tracking-widest uppercase text-xs md:text-sm"
              >
                {project.category}
              </motion.h3>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: customEase }}
                className="text-3xl md:text-5xl font-light text-white mt-2 leading-tight tracking-tight"
              >
                {project.title}
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: customEase }}
              className="text-white/60 text-base md:text-lg leading-relaxed bg-white/5 p-6 md:p-8 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl font-light"
            >
              {project.description}
            </motion.p>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: customEase }}
              className="flex flex-wrap gap-2"
            >
              {project.stack.map((item, idx) => (
                <span
                  key={idx}
                  className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[#B5892D] text-xs md:text-sm font-medium tracking-wide backdrop-blur-md"
                >
                  {item.name}
                </span>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4, ease: customEase }}
              className="flex items-center gap-4 pt-6"
            >
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full bg-[#B5892D] flex justify-center items-center group shadow-[0_0_15px_rgba(181,137,45,0.3)] hover:shadow-[0_0_25px_rgba(181,137,45,0.5)] hover:scale-110 transition-all duration-300"
              >
                <ArrowUpRight className="text-white w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />
              </a>

              {/* GitHub */}
              {project.github && Object.keys(project.github).length > 0 && (
                <div className="relative group">
                  <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex justify-center items-center cursor-pointer hover:bg-white/10 hover:border-[#B5892D]/50 hover:scale-110 transition-all duration-300 shadow-xl backdrop-blur-md">
                    <Github className="text-white w-5 h-5 group-hover:text-[#B5892D] transition-colors duration-300" />
                  </div>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 h-4 w-full"></div>
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-4 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 z-20 min-w-[140px] translate-y-2 group-hover:translate-y-0">
                    {project.github.frontend && (
                      <a href={project.github.frontend} target="_blank" className="block text-white/70 hover:text-[#B5892D] text-sm px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">Frontend</a>
                    )}
                    {project.github.backend && (
                      <a href={project.github.backend} target="_blank" className="block text-white/70 hover:text-[#B5892D] text-sm px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">Backend</a>
                    )}
                    {project.github.full && (
                      <a href={project.github.full} target="_blank" className="block text-white/70 hover:text-[#B5892D] text-sm px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">Fullstack</a>
                    )}
                  </div>
                </div>
              )}

              {/* Demo Button */}
              {project.demo && project.demo.endsWith(".mp4") ? (
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex justify-center items-center hover:bg-white/10 hover:border-[#B5892D]/50 hover:scale-110 transition-all duration-300 shadow-xl backdrop-blur-md group"
                >
                  <PiVideoFill className="text-white w-5 h-5 group-hover:text-[#B5892D] transition-colors duration-300" />
                </button>
              ) : (
                project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex justify-center items-center hover:bg-white/10 hover:border-[#B5892D]/50 hover:scale-110 transition-all duration-300 shadow-xl backdrop-blur-md group">
                    <PiVideoFill className="text-white w-5 h-5 group-hover:text-[#B5892D] transition-colors duration-300" />
                  </a>
                )
              )}
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            style={{ y: smoothImageY }}
            className={`relative lg:col-span-7 ${isEven ? "lg:order-2" : "lg:order-1 lg:col-start-1"}`}
          >
            <motion.div
              initial={{ opacity: 0, clipPath: isEven ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)" }}
              whileInView={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
              transition={{ duration: 1.2, ease: customEase }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#121212] group flex flex-col backdrop-blur-md"
            >
              {/* Computer Screen Header */}
              <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/10">
                <div className="flex gap-2 absolute">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-sm"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm"></div>
                </div>

                <div className="mx-auto w-1/2 bg-[#0a0a0a]/50 rounded-md px-3 py-1.5 text-[10px] md:text-xs text-white/40 flex items-center justify-center border border-white/5 overflow-hidden text-ellipsis whitespace-nowrap">
                  {project.live !== "#" ? project.live.replace('https://', '') : `localhost:3000/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                </div>
              </div>

              {/* Screen Content */}
              <div className="relative aspect-video lg:aspect-[4/3] p-0 overflow-hidden bg-[#0a0a0a]">
                {project.live && project.live !== "#" ? (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative flex items-center justify-center">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[#0a0a0a]/40 backdrop-blur-[2px]">
                      <div className="w-16 h-16 rounded-full bg-[#B5892D] flex items-center justify-center shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-500" style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                        <ArrowUpRight className="text-white w-8 h-8" />
                      </div>
                    </div>
                  </a>
                ) : (
                  <div className="w-full h-full relative flex items-center justify-center">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Video Modal */}
      {isVideoOpen && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          className="fixed inset-0 bg-[#0a0a0a]/90 flex justify-center items-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl"
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-12 right-0 text-white/50 p-2 rounded-full hover:bg-white/10 hover:text-white transition-colors bg-white/5 border border-white/10"
            >
              <X size={24} />
            </button>
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-[#B5892D]/20 border border-white/10 bg-black">
              <video
                src={project.demo}
                controls
                autoPlay
                className="w-full h-auto aspect-video"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

const Work = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const customEase = [0.25, 0.1, 0.25, 1.0];

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Background elements */}
      <div className="fixed top-[10%] right-[-5%] w-[500px] h-[500px] bg-[#B5892D]/10 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 z-50 overflow-hidden bg-white/5">
        <motion.div
          style={{ width: progressBarWidth }}
          className="h-full bg-gradient-to-r from-[#B5892D]/50 to-[#B5892D] shadow-[0_0_10px_rgba(181,137,45,0.8)]"
        />
      </motion.div>

      {/* Header */}
      <div className="relative pt-32 pb-16 px-4 text-center z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: customEase }}
          className="text-5xl md:text-7xl font-light text-white mb-6 tracking-tight"
        >
          My <span className="text-[#B5892D] font-medium">Projects</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
          className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light"
        >
          Scroll down to explore my journey through various development projects
        </motion.p>
      </div>

      {/* Project Cards */}
      <div className="space-y-0 relative z-10">
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2 hidden lg:block" />
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: customEase }}
        className="relative py-32 px-4 text-center z-10"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
          Think I’d Be a Good Fit for Your{" "}
          <span className="text-[#B5892D] font-medium relative inline-block">
            Team?
            <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#B5892D]/50"></div>
          </span>
        </h2>
        <p className="text-white/60 text-lg md:text-xl font-light">
          To get in touch, head over to the{" "}
          <Link href="/contact" className="text-[#B5892D] font-medium relative inline-block group">
            Contact page
            <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#B5892D] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Work;
