"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Code2,
  Cpu,
  Cloud,
  Smartphone,
  Monitor,
  Palette,
  Terminal,
  ShieldCheck,
  Zap,
  ArrowRight,
  Layers,
} from "lucide-react";

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

const highlights = [
  {
    num: "01",
    code: "CORE_FULLSTACK",
    icon: <Code2 className="w-6 h-6 text-[#fac70f]" />,
    title: "Full-Stack Software Development",
    description:
      "Experienced in developing modern, responsive web applications across both frontend and backend technologies. Skilled in React.js, Next.js, TypeScript, ASP.NET Core, .NET, Node.js, REST APIs, SQL databases, and authentication systems. Focused on building reliable, user-friendly applications with clean architecture and practical development workflows.",
    tags: ["React.js", "Next.js", "TypeScript", "ASP.NET Core", "PostgreSQL", "REST APIs"],
    status: "PRODUCTION_READY",
  },
  {
    num: "02",
    code: "NEURAL_AUTOMATION",
    icon: <Cpu className="w-6 h-6 text-[#fac70f]" />,
    title: "AI & Automation",
    description:
      "Focused on applying AI and automation to improve software development and business processes. Experienced with OpenAI APIs, AI agents, workflow automation, Make.com, n8n, webhooks, REST API integrations, and AI coding tools. Continuously exploring new AI technologies and practical ways to turn them into useful software solutions.",
    tags: ["OpenAI API", "AI Agents", "n8n / Make", "Webhooks", "Process Automation"],
    status: "HIGH_VELOCITY",
  },
  {
    num: "03",
    code: "INFRA_DEVOPS",
    icon: <Cloud className="w-6 h-6 text-[#fac70f]" />,
    title: "Cloud & DevOps",
    description:
      "Hands-on experience with cloud application development, deployment, and development operations using AWS, Azure, GCP, Cloudflare, Docker, GitHub Actions, CircleCI, and CI/CD pipelines. Comfortable working with cloud environments, deployment workflows, application configuration, and modern cloud-based development practices.",
    tags: ["Docker", "CI/CD Pipelines", "AWS / Azure", "Cloudflare", "GitHub Actions"],
    status: "CLOUD_NATIVE",
  },
  {
    num: "04",
    code: "MOBILE_CLIENTS",
    icon: <Smartphone className="w-6 h-6 text-[#fac70f]" />,
    title: "Mobile App Development",
    description:
      "Experience developing cross-platform and native mobile applications using React Native, Expo, Kotlin, and TypeScript. Familiar with mobile application architecture, background tasks, platform-specific functionality, APIs, and local notifications, with a focus on creating practical and responsive mobile experiences.",
    tags: ["React Native", "Expo", "Kotlin", "Cross-Platform", "Mobile Architecture"],
    status: "CROSS_PLATFORM",
  },
  {
    num: "05",
    code: "DESKTOP_ENGINE",
    icon: <Monitor className="w-6 h-6 text-[#fac70f]" />,
    title: "Desktop App Development",
    description:
      "Experience developing desktop applications using C# and T-SQL, with a focus on object-oriented programming, database integration, data management, and reliable application workflows. Comfortable translating functional requirements into practical desktop software solutions.",
    tags: ["C#", ".NET", "T-SQL", "Object-Oriented", "Enterprise Data"],
    status: "DESKTOP_READY",
  },
  {
    num: "06",
    code: "CREATIVE_DIRECTION",
    icon: <Palette className="w-6 h-6 text-[#fac70f]" />,
    title: "Graphic Design",
    description:
      "Experienced in creating visually compelling designs for branding, advertising, and digital communication. Skilled in designing brochures, posters, banners, storybooks, educational materials, and social media graphics, with additional expertise in photography, photo retouching, and video editing. Proficient in Adobe Creative Suite, Affinity Designer, Canva, and modern creative tools, with a focus on visual storytelling, strong typography, and effective communication.",
    tags: ["Adobe Suite", "Figma", "Branding", "Visual Storytelling", "UI Typography"],
    status: "CREATIVE_SUITE",
  },
];

const HighlightCard = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="flex flex-col justify-between gap-6 group bg-[#111110]/85 p-7 sm:p-8 rounded-3xl border border-white/10 backdrop-blur-xl hover:border-[#B5892D]/60 hover:bg-[#111110] transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(181,137,45,0.18)] relative overflow-hidden"
    >
      <HudCorners color="#B5892D" size={8} />

      {/* Ambient hover glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#B5892D] opacity-0 group-hover:opacity-[0.06] blur-2xl rounded-full transition-opacity duration-500 pointer-events-none" />

      {/* Top: Header metadata row */}
      <div className="flex w-full items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:bg-[#B5892D]/20 group-hover:border-[#B5892D]/50 transition-all shadow-sm">
            {service.icon}
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-[#B5892D] uppercase tracking-widest font-semibold">
              [{service.code}]
            </span>
            <span className="text-[9px] font-mono text-white/40 uppercase">
              {service.status}
            </span>
          </div>
        </div>

        {/* Large cyber number watermark */}
        <div className="text-3xl sm:text-4xl font-mono font-bold text-white/15 group-hover:text-[#fac70f]/80 transition-colors duration-300">
          {service.num}
        </div>
      </div>

      {/* Middle: Title & Description */}
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl sm:text-2xl font-semibold tracking-tight text-white group-hover:text-[#fac70f] transition-colors duration-300 leading-snug">
          {service.title}
        </h2>

        <p className="text-white/60 text-sm leading-relaxed font-inter font-light">
          {service.description}
        </p>
      </div>

      {/* Bottom: Tech Stack Pills */}
      <div className="pt-4 border-t border-white/5 flex flex-wrap gap-1.5 mt-auto">
        {service.tags.map((tag, idx) => (
          <span
            key={idx}
            className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/5 border border-white/5 text-white/70 group-hover:border-[#B5892D]/30 group-hover:text-white transition-colors"
          >
            #{tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const Highlights = () => {
  return (
    <section className="min-h-screen relative overflow-hidden flex flex-col justify-center pt-28 pb-20 xl:py-28 font-primary selection:bg-[#B5892D]/30 selection:text-[#fac70f]">
      {/* Background cyber glows */}
      <div className="absolute top-[15%] right-[5%] w-[450px] h-[450px] bg-[#B5892D]/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-[450px] h-[450px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

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
              <span className="font-semibold text-[#B5892D] uppercase font-mono">SYS.SERVICES // V2.6</span>
              <span className="text-white/30 hidden sm:inline">|</span>
              <span className="text-white/60 font-mono">ACTIVE_CORES: 06</span>
              <span className="text-white/30 hidden md:inline">|</span>
              <span className="text-white/80 font-mono hidden md:inline">
                STATUS: <span className="text-emerald-400">ALL_SYSTEMS_NOMINAL</span>
              </span>
            </div>
          </div>

          {/* Center: Command prompt */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-white/50 bg-white/5 px-3 py-1 rounded-md border border-white/5 font-mono">
            <Terminal className="w-3.5 h-3.5 text-[#B5892D]" />
            <span>sys_modules --inspect --active-services</span>
            <span className="w-1.5 h-3.5 bg-[#B5892D] animate-pulse inline-block" />
          </div>

          {/* Right: Telemetry metrics */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end text-xs font-mono">
            <div className="flex items-center gap-1.5 text-[11px] text-white/50 bg-white/5 px-2.5 py-1 rounded border border-white/5">
              <Layers className="w-3 h-3 text-[#B5892D]" />
              <span>STACK: FULL-CYCLE</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-white/50 bg-white/5 px-2.5 py-1 rounded border border-white/5">
              <ShieldCheck className="w-3 h-3 text-[#B5892D]" />
              <span>VERIFIED</span>
            </div>
          </div>
        </motion.div>

        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#B5892D] bg-[#B5892D]/10 px-3 py-1 rounded-full border border-[#B5892D]/30 mb-2">
              ENGINEERING CAPABILITIES
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight">
              My <span className="text-[#fac70f] font-normal">Services</span>
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto font-inter font-light text-sm sm:text-base mt-2 leading-relaxed">
              Delivering scalable, high-performance, and secure digital architectures across modern cloud, web, and mobile ecosystems.
            </p>
          </motion.div>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {highlights.map((service, index) => (
            <HighlightCard
              key={service.num}
              service={service}
              index={index}
            />
          ))}
        </div>

        {/* Bottom Call to Action Telemetry Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-[#111110]/80 border border-[#B5892D]/30 rounded-2xl p-6 sm:p-8 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl relative group overflow-hidden"
        >
          <HudCorners color="#B5892D" size={8} />

          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-[#B5892D] flex items-center justify-center sm:justify-start gap-1.5">
              <Zap className="w-3.5 h-3.5" /> READY FOR DEPLOYMENT
            </span>
            <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Have a custom project or technical challenge?
            </h3>
            <p className="text-white/50 text-xs sm:text-sm font-inter">
              Let's architect, build, and deploy high-performance software for your team.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#B5892D] hover:bg-[#fac70f] text-[#111110] font-mono font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(181,137,45,0.25)] hover:shadow-[0_0_25px_rgba(250,199,15,0.4)] shrink-0"
          >
            <span>DISPATCH INQUIRY</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Highlights;
