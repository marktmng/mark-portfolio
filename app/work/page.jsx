"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import WorkSliderBtns from "@/components/ui/WorkSliderBtns";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

const projects = [
  {
    num: "01",
    category: "Fullstack Developer",
    title: "Portfolio Web App",
    desription:
      "This portfolio website was developed and deployed to showcase my projects, skills, and experience to potential employers. Built with Next.js, TypeScript, and Tailwind CSS, it integrates with a Convex database for dynamic content and is hosted on Vercel.",
    stack: [{ name: "Next.Js" }, { name: "Typescript" }, { name: "Tailwind" }],
    image: "/assets/work/portfolio.png",
    live: "https://www.marktmng.com/",
    github: {
      frontend: "https://github.com/marktmng/mark-portfolio.git",
    },
  },
  {
    num: "02",
    category: "Fullstack Developer",
    title: "Handi-Hub Web App",
    desription:
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
  },
  {
    num: "03",
    category: "Software Developer",
    title: "Infinite Cloud Service",
    desription:
      "This project is being developed using ASP.NET and React. The goal is to create Source Infinity’s own drive application with integrated cloud storage services. Designed to be user-friendly and efficient, the project is currently in progress.",
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
  },
  {
    num: "04",
    category: "Frontend Developer",
    title: "Scheduler Web App",
    desription:
      "This Scheduler app was developed for Brunton NZ to help employees manage appointments, tasks, progress, and leave. It also provides managers with a color-coded dashboard to track team performance.",
    stack: [{ name: "React" }, { name: "CSS" }, { name: "HTML" }],
    image: "/assets/work/scheduler.png",
    live: "#",
    github: {
      frontend: "https://github.com/marktmng/Scheduler-BruntonNZ.git",
    },
  },
  {
    num: "05",
    category: "Software Developer",
    title: "E-commerce Web App",
    desription:
      "This e-commerce app was developed for a client to sell beauty products online during my internship at Source Infinity. Built with Shopify, it provides a responsive and user-friendly shopping experience.",
    stack: [{ name: "Liquid" }, { name: "CSS" }, { name: "JavaScript" }],
    image: "/assets/work/shopify.png",
    live: "#",
    github: {
      frontend: "https://github.com/marktmng/just_another_beauty_product.git",
    },
  },
  {
    num: "06",
    category: "Software Developer",
    title: "Desktop App",
    desription:
      "This desktop app was developed for VShipping LTD to help employees manage their shipping orders efficiently. Built with C# and TSQL.",
    stack: [{ name: "C#" }, { name: "TSQL" }],
    image: "/assets/work/desktopapp.png",
    live: "#",
    github: {
      backend: "https://github.com/marktmng/VShippingLTD.git",
    },
  },
];

const Work = () => {
  const [project, setProject] = useState(projects[0]);

  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.activeIndex;
    setProject(projects[currentIndex]);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          {/* LEFT SECTION - DETAILS */}
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[30px] h-[50%]">
              {/* Outline number */}
              <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
                {project.num}
              </div>

              {/* Category */}
              <h2 className="text-[42px] font-bold leading-none text-white capitalize">
                {project.category} project
              </h2>

              {/* Description */}
              <p className="text-white/60">{project.desription}</p>

              {/* Tech Stack */}
              <ul className="flex flex-wrap gap-4">
                {project.stack.map((item, index) => (
                  <li key={index} className="text-xl text-accent">
                    {item.name}
                    {index !== project.stack.length - 1 && ","}
                  </li>
                ))}
              </ul>

              <div className="border-b border-white/20"></div>

              {/* Buttons */}
              <div className="flex items-center gap-4">
                {/* Live project button */}
                <Link href={project.live} target="_blank">
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Live project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>

                {/* GitHub button with dropdown */}
                <div className="relative group">
                  <div className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center cursor-pointer group-hover:bg-accent/10 transition">
                    <BsGithub className="text-white text-3xl group-hover:text-accent" />
                  </div>

                  {/* Hover dropdown */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 bg-[#111] border border-white/20 rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto z-20">
                    {project.github?.frontend && (
                      <Link
                        href={project.github.frontend}
                        target="_blank"
                        className="block text-white hover:text-accent text-sm px-2 py-1 whitespace-nowrap"
                      >
                        🖥️ Frontend Repository
                      </Link>
                    )}
                    {project.github?.backend && (
                      <Link
                        href={project.github.backend}
                        target="_blank"
                        className="block text-white hover:text-accent text-sm px-2 py-1 whitespace-nowrap"
                      >
                        ⚙️ Backend Repository
                      </Link>
                    )}
                    {project.github?.full && (
                      <Link
                        href={project.github.full}
                        target="_blank"
                        className="block text-white hover:text-accent text-sm px-2 py-1 whitespace-nowrap"
                      >
                        📦 Full Project Repository
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION - SLIDER */}
          <div className="w-full xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="xl:h-[520px] mb-12"
              onSlideChange={handleSlideChange}
            >
              {projects.map((project, index) => (
                <SwiperSlide key={index} className="w-full">
                  <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/15 to-transparent z-10"></div>
                    <div className="relative w-full h-full">
                      <Image
                        src={project.image}
                        fill
                        className="object-cover"
                        alt={project.title}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              {/* Slider buttons */}
              <WorkSliderBtns
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%)] xl:bottom-0 z-20 
                w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-[#fac70f] hover:bg-transparent border border-[#fac70f] 
                text-[#171717] hover:text-[#fac70f] text-[22px] w-[44px] 
                h-[30px] flex justify-center items-center transition-all"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Work;
