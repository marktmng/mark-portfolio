"use client";

import {
  FaCss3,
  FaFigma,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiNextdotjs, SiTailwindcss } from "react-icons/si";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";

// about data
const about = {
  title: "About me",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  info: [
    {
      fieldName: "Name",
      fieldValue: "Mark Tamang",
    },
    {
      fieldName: "Phone",
      fieldValue: "(+64) 22 380 3511",
    },
    {
      fieldName: "Experience",
      fieldValue: "12+",
    },
    {
      fieldName: "Skype",
      fieldValue: "mark.001",
    },
    {
      fieldName: "Nationality",
      fieldValue: "Nepalese",
    },
    {
      fieldName: "Email",
      fieldValue: "mailsareaccepting@gmail.com",
    },
    {
      fieldName: "Part-time",
      fieldValue: "Available",
    },
    {
      fieldName: "Languages",
      fieldValue: "Nepali, English",
    },
  ],
};

// experience dat
const experience = {
  icon: "/assets/resume/badge.svg",
  title: "My experience",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  items: [
    {
      company: "Source Infinity",
      position: "Software Developer Intern",
      duration: "2024 - Present",
    },
    {
      company: "Oulier AI",
      position: "Contract Code Reviewer",
      duration: "2024 - Present",
    },
    {
      company: "Brunton NZ",
      position: "Front-End Developer Intern",
      duration: "February 2024 - May 2024",
    },
    {
      company: "ECEC Innovation in Education",
      position: "Graphic Designer",
      duration: "2019 - May 2023",
    },
  ],
};

// education data
const education = {
  icon: "/assets/resume/cap.svg",
  title: "My education",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  items: [
    {
      institute: "Auckland Institute of Technology",
      degree: "Masters in Information Technology (software development)",
      duration: "2024 - Present",
    },
    {
      institute: "Udemy",
      degree: "Python Data Structures and Algorithm",
      duration: "Present",
    },
    {
      institute: "Udemy",
      degree: "C# .Net Beginner to Master",
      duration: "Present",
    },
    {
      institute: "Auckland Institute of Technology",
      degree:
        "Graduate Diploma in Information Technology (software development)",
      duration: "2023 - 2024",
    },
  ],
};

// skills data
const skills = {
  title: "My skills",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  skillList: [
    {
      icon: <FaHtml5 />,
      name: "html 5",
    },
    {
      icon: <FaCss3 />,
      name: "css 3",
    },
    {
      icon: <FaJs />,
      name: "javascript",
    },
    {
      icon: <FaReact />,
      name: "React.js",
    },

    {
      icon: <FaFigma />,
      name: "figma",
    },
    {
      icon: <FaNodeJs />,
      name: "node.js",
    },

    {
      icon: <SiNextdotjs />,
      name: "node.js",
    },
    {
      icon: <SiTailwindcss />,
      name: "tailwind.css",
    },
  ],
};

const Resume = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[70vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <Tabs
          defaultValue="experience"
          className="flex flex-col xl:flex-row gap-[30px] "
        >
          <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-8">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            {/* <TabsTrigger value="projects">Projects</TabsTrigger> */}
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          {/* content */}
          <div className="min-h-[80h] w-full">
            {/* experience */}
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{experience.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {experience.description}
                </p>
                <ScrollArea className="h-[400px] w-full">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
                    {experience.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#02a312] w-full h-full py-6 px-10 rounded-xl
                        flex flex-col justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-accent">{item.duration}</span>
                          <h3
                            className="text-xl max-w-[260px] min-h-[60px]
                          text-center lg:text-left"
                          >
                            {item.position}
                          </h3>
                          <div className="flex items-center gap-3">
                            {/* dot */}
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p className="text-white/70">{item.company}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            {/* education */}
            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{education.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {education.description}
                </p>
                <ScrollArea className="h-[400px] w-full">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
                    {education.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#02a312] h-full py-6 px-10 rounded-xl
                        flex flex-col justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-accent">{item.duration}</span>
                          <h3
                            className="text-xl max-w-[260px] min-h-[60px]
                          text-center lg:text-left"
                          >
                            {item.degree}
                          </h3>
                          <div className="flex items-center gap-3">
                            {/* dot */}
                            <span className="w-[5px] h-[5px] rounded-full bg-accent"></span>
                            <p className="text-white/70">{item.institute}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            {/* skills */}
            <TabsContent value="skills" className="w-full">
              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{skills.title}</h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                    {skills.description}
                  </p>
                </div>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[30px] gap-4">
                  {skills.skillList.map((skill, index) => {
                    return (
                      <li key={index}>
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger className="w-full h-[150px] bg-[#02a312] items-center flex justify-center group rounded-xl">
                              <div
                                className="text-5xl group-hover:text-accent
                              transition-all duration-300"
                              >
                                {skill.icon}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{skill.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </TabsContent>
            {/* projects */}
            {/* <TabsContent value="projects" className="w-full">
              projects
            </TabsContent> */}
            {/* about */}
            <TabsContent
              value="about"
              className="w-full text-center xl:text-left"
            >
              <div className="flex flex-col gap-[30px]">
                <h3 className="text-4xl font-bold">{about.title}</h3>
                <p className="max-w-[500px] text-white/60 mx-auto xl:mx-0">
                  {about.description}
                </p>
                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-5 max-w-[80vh] mx-auto xl:mx-0">
                  {about.info.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="flex items-center justify-center xl:justify-start gap-4"
                      >
                        {/* dot */}
                        {/* <span className="w-[5px] h-[5px] rounded-full bg-accent"></span> */}
                        <span className="text-white/60">{item.fieldName}</span>
                        <span className="text-xl">{item.fieldValue}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;
