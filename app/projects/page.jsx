"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import { useRef, useState } from "react";
import { PiVideoFill } from "react-icons/pi";

const projects = [
  {
    num: "01",
    category: "Fullstack Developer",
    title: "Portfolio Web App",
    description:
      "This portfolio website was developed and deployed to showcase my projects, skills, and experience to potential employers. Built with Next.js, TypeScript, and Tailwind CSS, it integrates with a Convex database for dynamic content and is hosted on Vercel.",
    stack: [{ name: "Next.Js" }, { name: "Typescript" }, { name: "Tailwind" }],
    image: "/assets/work/portfolio.png",
    live: "https://marktmg.com/",
    github: { full: "https://github.com/marktmng/mark-portfolio.git" },
    demo: "https://marktmg.com/",
  },
  {
    num: "02",
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
    num: "03",
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
    github: {
      full: "https://github.com/sourceinfinitynz/Infinite-Cloud-Service.git",
    },
    // demo: "",
  },
  {
    num: "04",
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
    num: "05",
    category: "Software Developer",
    title: "E-commerce Web App",
    description:
      "This e-commerce app was developed for a client to sell beauty products online during my internship at Source Infinity. Built with Shopify, it provides a responsive and user-friendly shopping experience.",
    stack: [{ name: "Liquid" }, { name: "CSS" }, { name: "JavaScript" }],
    image: "/assets/work/shopify.png",
    live: "#",
    github: {
      full: "https://github.com/marktmng/just_another_beauty_product.git",
    },
    // demo: "",
  },
  {
    num: "06",
    category: "Software Developer",
    title: "Desktop App",
    description:
      "This desktop app was developed for VShipping LTD to help employees manage their shipping orders efficiently. Built with C# and TSQL.",
    stack: [{ name: "C#" }, { name: "TSQL" }],
    image: "/assets/work/desktopapp.png",
    live: "#",
    github: { full: "https://github.com/marktmng/VShippingLTD.git" },
    // demo: "#",
  },
];

const ProjectCard = ({ project, index }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.8, 1, 1, 0.8]
  );
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);
  const imageRotate = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothY = useSpring(y, springConfig);
  const smoothScale = useSpring(scale, springConfig);
  const isEven = index % 2 === 0;

  return (
    <>
      <motion.div
        ref={cardRef}
        style={{ opacity, scale: smoothScale, y: smoothY }}
        className="min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16"
      >
        <div
          className={`max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
            isEven ? "" : "lg:grid-flow-dense"
          }`}
        >
          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false, amount: 0.3 }}
            className={`space-y-6 ${isEven ? "" : "lg:col-start-2"}`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              viewport={{ once: false }}
              className="text-8xl md:text-9xl font-extrabold text-transparent"
              style={{
                WebkitTextStroke: "2px #fac70f",
                textShadow: "0 0 30px rgba(250, 199, 15, 0.3)",
              }}
            >
              {project.num}
            </motion.div>
            <motion.h3 className="text-3xl md:text-4xl font-bold text-white capitalize">
              {project.category} project
            </motion.h3>
            <motion.h2 className="text-2xl md:text-3xl font-semibold text-[#fac70f]">
              {project.title}
            </motion.h2>
            <motion.p className="text-white/80 text-base md:text-lg leading-relaxed">
              {project.description}
            </motion.p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-3">
              {project.stack.map((item, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-white/5 border border-[#fac70f]/30 rounded-full text-[#fac70f] text-sm font-medium hover:bg-[#fac70f]/10 transition-colors"
                >
                  {item.name}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full bg-[#fac70f] flex justify-center items-center group shadow-lg shadow-[#fac70f]/20 hover:shadow-[#fac70f]/40 transition-all"
              >
                <ArrowUpRight className="text-[#171717] w-6 h-6 group-hover:rotate-45 transition-transform" />
              </a>

              {/* GitHub */}
              <div className="relative group">
                <div className="w-16 h-16 rounded-full bg-white/5 border-2 border-[#fac70f]/50 flex justify-center items-center cursor-pointer hover:bg-[#fac70f]/10 transition-all shadow-lg">
                  <Github className="text-white w-6 h-6 group-hover:text-[#fac70f] transition-colors" />
                </div>

                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 bg-[#171717] border border-[#fac70f]/30 rounded-xl shadow-2xl p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto z-20 min-w-[200px]">
                  {project.github?.frontend && (
                    <a
                      href={project.github.frontend}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-white hover:text-[#fac70f] text-sm px-3 py-2 rounded hover:bg-white/5 transition-colors whitespace-nowrap"
                    >
                      🖥️ Frontend Repository
                    </a>
                  )}
                  {project.github?.backend && (
                    <a
                      href={project.github.backend}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-white hover:text-[#fac70f] text-sm px-3 py-2 rounded hover:bg-white/5 transition-colors whitespace-nowrap"
                    >
                      ⚙️ Backend Repository
                    </a>
                  )}
                  {project.github?.full && (
                    <a
                      href={project.github.full}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-white hover:text-[#fac70f] text-sm px-3 py-2 rounded hover:bg-white/5 transition-colors whitespace-nowrap"
                    >
                      📦 Full Project Repository
                    </a>
                  )}
                </div>
              </div>

              {/* Demo Button */}
              {project.demo && project.demo.endsWith(".mp4") ? (
                <button
                  onClick={() => setIsVideoOpen(true)}
                  className="w-16 h-16 rounded-full bg-white/5 border-2 border-[#fac70f]/50 flex justify-center items-center hover:bg-[#fac70f]/10 transition-all shadow-lg"
                >
                  <PiVideoFill className="text-white w-6 h-6 hover:text-[#fac70f] transition-colors" />
                </button>
              ) : (
                project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-16 h-16 rounded-full bg-white/5 border-2 border-[#fac70f]/50 flex justify-center items-center hover:bg-[#fac70f]/10 transition-all shadow-lg"
                  >
                    <PiVideoFill className="text-white w-6 h-6 hover:text-[#fac70f] transition-colors" />
                  </a>
                )
              )}
            </div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            style={{ rotate: imageRotate }}
            className={`relative ${isEven ? "" : "lg:col-start-1 lg:row-start-1"}`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: false, amount: 0.3 }}
              whileHover={{ scale: 1.02 }}
              style={{ scale: imageScale }}
              className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-[#fac70f]/10 border border-white/10"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Video Modal */}
      {isVideoOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 flex justify-center items-center z-50"
        >
          <button
            onClick={() => setIsVideoOpen(false)}
            className="absolute top-6 right-6 text-white p-2 rounded-full hover:bg-white/10 transition"
          >
            <X size={30} />
          </button>
          <video
            src={project.demo}
            controls
            autoPlay
            className="max-w-4xl w-full rounded-xl shadow-2xl"
          />
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

  const progressBarWidth = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <div ref={containerRef} className="relative bg-[#171717] min-h-screen">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-50">
        <motion.div
          style={{ width: progressBarWidth }}
          className="h-full bg-gradient-to-r from-[#fac70f] to-[#f59e0b] shadow-lg shadow-[#fac70f]/50"
        />
      </div>

      {/* Header */}
      <div className="relative pt-32 pb-16 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          My <span className="text-[#fac70f]">Projects</span>
        </h1>
        <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
          Scroll down to explore my journey through various development projects
        </p>
      </div>

      {/* Project Cards */}
      <div className="space-y-0">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>

      {/* Footer */}
      <div className="relative py-24 px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Let's Work <span className="text-[#fac70f]">Together</span>
        </h2>
        <p className="text-white/60 text-lg">
          Have a project in mind? Let's create something amazing!
        </p>
      </div>
    </div>
  );
};

export default Work;
