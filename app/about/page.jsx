"use client";

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
} from "react-icons/fa";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
} from "react-icons/si";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { TbBrandReactNative } from "react-icons/tb";
import { VscAzure } from "react-icons/vsc";
// about data
const about = {
  title: "About me",
  description:
    "I am a highly motivated and detail-oriented software developer with expertise in modern web technologies, cloud computing, and software development. With a strong foundation in programming and a passion for continuous learning, I thrive on building scalable and efficient solutions that align with industry best practices.",
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
      fieldValue: "2+",
    },
    {
      fieldName: "Nationality",
      fieldValue: "Nepalese",
    },
    {
      fieldName: "Email",
      fieldValue: "marktmg.info@gmail.com",
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
    "With a strong foundation in software development, UI/UX design, and technology-driven problem-solving, I have contributed to various projects across multiple industries. My experience ranges from front-end development and backend development to code review and graphic design, allowing me to bring a well-rounded perspective to every project.",
  items: [
    {
      company: "Source Infinity",
      position: "Software Developer Intern",
      duration: "2024 - 2025",
    },
    {
      company: "Oulier AI",
      position: "Contract Code Reviewer",
      duration: "2024 - 2025",
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
    "I have pursued a strong academic foundation in software development and information technology, complemented by continuous learning through industry-recognized certifications. My education reflects my commitment to mastering cutting-edge technologies and refining my problem-solving skills.",
  items: [
    {
      institute: "Auckland Institute of Technology",
      degree:
        "Graduate Diploma in Information Technology (software development)",
      duration: "2023 - 2024",
    },
    {
      institute: "Auckland Institute of Technology",
      degree: "Masters in Information Technology (software development)",
      duration: "2024 - Present",
    },
    {
      institute: "Udemy",
      degree: "C# .Net Beginner to Master",
      duration: "24 hours",
    },
    {
      institute: "Udemy",
      degree: "Python Data Structures and Algorithm",
      duration: "Present",
    },
  ],
};

// skills data
const skills = {
  title: "My skills",
  description:
    "With a strong proficiency in various technologies, I have developed expertise in cloud platforms, programming languages, frameworks, and tools that enable me to build efficient and scalable software solutions. Below is a comprehensive list of my technical skills that I continue to enhance as I grow in my career.",
  skillList: [
    {
      icon: <SiDotnet />,
      name: ".NET",
    },
    {
      icon: <FaPython />,
      name: "Python",
    },
    {
      icon: <FaReact />,
      name: "React.js",
    },
    {
      icon: <SiNextdotjs />,
      name: "Next.js",
    },
    {
      icon: <TbBrandReactNative />,
      name: "React Native",
    },
    {
      icon: <FaJs />,
      name: "Javascript",
    },
    {
      icon: <SiKotlin />,
      name: "Kotlin",
    },
    {
      icon: <FaNodeJs />,
      name: "Node.js",
    },
    {
      icon: <FaCss3 />,
      name: "Css",
    },
    {
      icon: <FaBootstrap />,
      name: "Bootstrap",
    },
    {
      icon: <FaFigma />,
      name: "figma",
    },
    {
      icon: <SiTailwindcss />,
      name: "Tailwind.css",
    },
    {
      icon: <FaDatabase />,
      name: "SQL Server",
    },
    {
      icon: <AiOutlineDatabase />,
      name: "Azure Data Studio",
    },
    {
      icon: <VscAzure />,
      name: "Azure",
    },
    {
      icon: <FaAws />,
      name: "AWS",
    },
    {
      icon: <SiVercel />,
      name: "Vercel",
    },
    {
      icon: <SiCircleci />,
      name: "Circleci",
    },
    {
      icon: <FaGithub />,
      name: "Github",
    },
    {
      icon: <SiAdobeillustrator />,
      name: "Adobe Illustrator",
    },
    {
      icon: <SiAdobeindesign />,
      name: "Adobe InDesign",
    },
    {
      icon: <SiAdobephotoshop />,
      name: "Adobe Photoshop",
    },
    {
      icon: <SiAdobepremierepro />,
      name: "Adobe Premiere Pro",
    },
    {
      icon: <SiAdobeaftereffects />,
      name: "Adobe After Effects",
    },
    {
      icon: <SiAdobelightroom />,
      name: "Adobe Lightroom",
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
          defaultValue="about"
          className="flex flex-col xl:flex-row gap-[30px] "
        >
          <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-8">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>

            {/* <TabsTrigger value="projects">Projects</TabsTrigger> */}
          </TabsList>

          {/* content */}
          <div className="min-h-[80h] w-full">
            {/* experience */}
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{experience.title}</h3>
                <p className="max-w-[700px] text-white/60 mx-auto xl:mx-0 text-justify">
                  {experience.description}
                </p>
                <ScrollArea className="h-[400px] w-full">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
                    {experience.items.map((item, index) => {
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
                            {item.position}
                          </h3>
                          <div className="flex items-center gap-3">
                            {/* dot */}
                            <span className="w-[5px] h-[5px] rounded-full bg-accent"></span>
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
                <p className="max-w-[700px] text-white/60 mx-auto xl:mx-0 text-justify">
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
                  <p className="max-w-[700px] text-white/60 mx-auto xl:mx-0 text-justify">
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
                <p className="max-w-[700px] text-white/60 mx-auto xl:mx-0 text-justify">
                  {about.description}
                </p>
                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-4 gap-x-4 max-w-[100vh] mx-auto xl:mx-0">
                  {about.info.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="flex items-center justify-center xl:justify-start gap-2"
                      >
                        {/* dot */}
                        {/* <span className="w-[5px] h-[5px] rounded-full bg-accent"></span> */}
                        <span className="text-white/60 text-[14px]">
                          {item.fieldName}
                        </span>
                        <span className="max-auto xl:mx-0 text-[14px]">
                          {item.fieldValue}
                        </span>
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
