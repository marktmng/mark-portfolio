"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // command to install tooltip: npm install @radix-ui/react-tooltip
import WorkSliderBtns from "@/components/ui/WorkSliderBtns";
import { motion } from "framer-motion"; // command to install framer motion: npm install framer-motion
import Image from "next/image"; // command to install next image: npm install next-image
import Link from "next/link"; // command to install next link: npm install next-link
import { useState } from "react";
import { BsArrowUpRight, BsGithub } from "react-icons/bs"; // command to install react icons: npm install react-icons
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react"; // command to install swiper: npm install swiper

const projects = [
  {
    num: "01",
    category: "frontend",
    title: "Scheduler Web App",
    desription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    stack: [
      { name: "Html 5" },
      { name: "Css 3" },
      {
        name: "JavaScript",
      },
    ],
    image: "/assets/work/thumb1.png",
    live: "#",
    github: "#",
  },
  {
    num: "02",
    category: "software developer",
    title: "Ecommerce Web App",
    desription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    stack: [
      { name: "Liquid" },
      { name: "Css" },
      {
        name: "JavaScript",
      },
    ],
    image: "/assets/work/thumb2.png",
    live: "#",
    github: "#",
  },
  {
    num: "03",
    category: "Software Developer",
    title: "Portfolio Web App",
    desription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    stack: [
      { name: "Html 5" },
      { name: "Css 3" },
      {
        name: "JavaScript",
      },
    ],
    image: "/assets/work/thumb3.png",
    live: "#",
    github: "#",
  },
];

const Work = () => {
  const [project, setProject] = useState(projects[0]); // ✅ Define the active project state

  const handleSlideChange = (swiper) => {
    // get current slide index
    const currentIndex = swiper.activeIndex;
    // update project state based on current slide index
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
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[30px] h-[50%]">
              {/* Outline num */}
              <div
                className="text-8xl leading-none font-extrabold text-transparent 
              text-outline"
              >
                {project.num}
              </div>
              {/* Category */}
              <h2 className="text-[42px] font-bold leading-none text-white capitalize">
                {project.category} project
              </h2>
              {/* Description */}
              <p className="text-white/60">{project.desription}</p>
              {/* Stack */}
              <ul className="flex flex-wrap gap-4">
                {project.stack.map((item, index) => (
                  <li key={index} className="text-xl text-accent">
                    {item.name}
                    {index !== project.stack.length - 1 && ","}
                  </li>
                ))}
              </ul>
              {/* Border */}
              <div className="border-b border-white/20"></div>
              {/* Button with Tooltip */}
              <div className="flex items-center gap-4">
                {/* live project button */}
                <Link href={project.live}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger
                        className="w-[70px] h-[70px] rounded-full
                    bg-white/5 flex justify-center items-center group"
                      >
                        <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Live project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
                {/* guithub project button */}
                <Link href={project.github}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger
                        className="w-[70px] h-[70px] rounded-full
                    bg-white/5 flex justify-center items-center group"
                      >
                        <BsGithub className="text-white text-3xl group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Github project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="xl:h-[520px] mb-12"
              onSlideChange={handleSlideChange}
            >
              {projects.map((project, index) => {
                return (
                  <SwiperSlide key={index} className="w-full">
                    <div
                      className="h-[460px] realtive group flex justify-center 
                    items-center bg-pink-50/20 "
                    >
                      {/* overlay */}
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/15 to-transparent z-10"></div>

                      {/* image */}
                      <div className="relative w-full h-full">
                        <Image
                          src={project.image}
                          fill
                          className="object-cover"
                          alt=""
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
              {/* slider buttons */}
              <WorkSliderBtns
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-[#02a312] hover:bg-accent-hover/30 text-primary text-[22px] w-
            [44px] h-[30px] flex justify-center items-center transition-all"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Work;
