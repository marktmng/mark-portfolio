"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import { BsArrowRight, BsGithub } from "react-icons/bs";

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

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            {/* outline num */}
            <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
              {project.num} {/* ✅ Use project.num instead of projects.num */}
            </div>
            {/* category */}
            <h2
              className="text-[42px] font-bold leading-none text-white 
            group-hover:text-accent transition-all duration-500 capitalize"
            >
              {project.category} project {/* ✅ Use project.category */}
            </h2>
            {/* description */}
            <p className="text-white/60">{project.desription}</p>
            {/* stack */}
            <ul>
              {project.stack.map((item, index) => {
                return <li key={index}>{item.name}</li>;
              })}
            </ul>
          </div>
          <div className="w-full xl:w-[50%]">slider</div>
        </div>
      </div>
    </motion.section>
  );
};

export default Work;

// video watched till 2:24:43
