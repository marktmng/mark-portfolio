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
  FaJava,
  FaHtml5,
  FaDocker,
  FaStripe,
  FaGitAlt,
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

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { VscAzure } from "react-icons/vsc";

// about data
const about = {
  title: "About me",
  description:
    "I am an innovative and results-driven Software Engineer with over 2 years of professional experience across multiple programming paradigms. As an avid learner and technology enthusiast, I excel in high-pressure, fast-paced environments, delivering scalable, high-performance web applications and backend systems. I am passionate about crafting sophisticated solutions using a broad spectrum of modern technologies, and I consistently drive projects from concept to deployment with a focus on code quality, security, and exceptional user experiences. Beyond coding, I thrive on tackling complex architectural challenges and collaborating with cross-functional teams to build products that make a tangible impact.",
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
      fieldValue: "Intermediate",
    },
    {
      fieldName: "Email",
      fieldValue: "marktmg.com@gmail.com",
    },
    {
      fieldName: "Availability",
      fieldValue: "Full-time",
    },
    {
      fieldName: "Languages",
      fieldValue: "Nepali, English",
    },
    {
      fieldName: "Address",
      fieldValue: "Glen Eden, Auckland, New Zealand",
    },
  ],
};

// experience data - updated from CV (Kitchen Steward removed)
const experience = {
  icon: "/assets/resume/badge.svg",
  title: "My experience",
  description:
    "Full-stack software engineer with experience in ASP.NET Core, React, Next.js, and cloud technologies. Skilled in building scalable web applications, REST APIs, and implementing CI/CD pipelines.",
  items: [
    {
      company: "Pakhreen",
      position: "Software Engineer & Founder",
      duration: "Dec 2025 – Present",
      description:
        "Design and deliver custom software solutions from concept to production. Build full-stack applications, APIs, and cloud-based systems.",
    },
    {
      company: "Source Infinity",
      position: "Software Developer Intern",
      duration: "Sep 2024 – Apr 2025",
      description:
        "Developed full-stack features using ASP.NET Core, React, and SQL Server. Built RESTful APIs with Google Drive API integration. Implemented Docker-based deployments and CI/CD pipelines.",
    },
    {
      company: "Brunton NZ",
      position: "Frontend Developer Intern",
      duration: "Feb 2024 – Apr 2024",
      description:
        "Developed responsive React.js interfaces with RESTful APIs. Built task scheduling feature and resolved frontend/API issues.",
    },
    {
      company: "ECEC Innovation in Education",
      position: "IT Specialist",
      duration: "Jan 2019 – Apr 2023",
      description:
        "Provided IT support for hardware, software, and network issues. Performed system maintenance, troubleshooting, and technical support.",
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
      institute: "Auckland Institute of Studies",
      degree: "Master of Information Technology (Software Development)",
      duration: "2024 - 2025",
    },
    {
      institute: "Auckland Institute of Studies",
      degree: "Graduate Diploma in Information Technology",
      duration: "2023 - 2024",
    },
    {
      institute: "Campion College, Nepal",
      degree: "Bachelor of Arts",
      duration: "2017 - 2020",
    },
  ],
};

// skills data
const skills = {
  title: "My skills",
  description:
    "With a strong proficiency in various technologies, I have developed expertise in cloud platforms, programming languages, frameworks, and tools that enable me to build efficient and scalable software solutions. Below is a comprehensive list of my technical skills that I continue to enhance as I grow in my career.",
  skillList: [
    { icon: <SiDotnet />, name: ".NET" },
    { icon: <TbBrandCSharp />, name: "C#" },
    { icon: <FaPython />, name: "Python" },
    { icon: <FaReact />, name: "ReactJS" },
    { icon: <SiNextdotjs />, name: "NextJS" },
    { icon: <SiTypescript />, name: "TypeScript" },
    { icon: <FaJs />, name: "Javascript" },
    { icon: <FaJava />, name: "Java" },
    { icon: <SiKotlin />, name: "Kotlin" },
    { icon: <FaHtml5 />, name: "HTML" },
    { icon: <FaCss3 />, name: "CSS" },
    { icon: <FaNodeJs />, name: "Node.js" },
    { icon: <TbBrandReactNative />, name: "React Native" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <FaBootstrap />, name: "Bootstrap" },
    { icon: <SiMui />, name: "Material UI" },
    { icon: <SiDjango />, name: "Django REST" },
    { icon: <FaDatabase />, name: "SQL Server" },
    { icon: <SiPostgresql />, name: "PostgreSQL" },
    { icon: <SiMysql />, name: "MySQL" },
    { icon: <SiPrisma />, name: "Prisma" },
    { icon: <AiOutlineDatabase />, name: "Azure Data Studio" },
    { icon: <FaAws />, name: "AWS" },
    { icon: <VscAzure />, name: "Azure" },
    { icon: <SiGooglecloud />, name: "GCP" },
    { icon: <SiCloudflare />, name: "Cloudflare" },
    { icon: <FaDocker />, name: "Docker" },
    { icon: <SiGithubactions />, name: "GitHub Actions" },
    { icon: <SiCircleci />, name: "Circleci" },
    { icon: <SiVercel />, name: "Vercel" },
    { icon: <SiOpenai />, name: "OpenAI API" },
    { icon: <FaStripe />, name: "Stripe" },
    { icon: <FaGithub />, name: "Github" },
    { icon: <FaGitAlt />, name: "Git" },
    { icon: <SiPostman />, name: "Postman" },
    { icon: <SiSwagger />, name: "Swagger" },
    { icon: <FaFigma />, name: "Figma" },
    { icon: <SiAdobeillustrator />, name: "Adobe Illustrator" },
    { icon: <SiAdobeindesign />, name: "Adobe InDesign" },
    { icon: <SiAdobephotoshop />, name: "Adobe Photoshop" },
    { icon: <SiAdobepremierepro />, name: "Adobe Premiere Pro" },
    { icon: <SiAdobeaftereffects />, name: "Adobe After Effects" },
    { icon: <SiAdobelightroom />, name: "Adobe Lightroom" },
  ],
};

const Resume = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
      }}
      className="min-h-[80vh] flex items-center justify-center py-16 xl:py-24 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#B5892D]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-white/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 z-10">
        <Tabs
          defaultValue="about"
          className="flex flex-col xl:flex-row gap-12 xl:gap-[60px]"
        >
          {/* TabsList */}
          <TabsList className="flex flex-col w-full max-w-[320px] mx-auto xl:mx-0 gap-4 bg-transparent p-0">
            {["about", "experience", "skills", "education"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="w-full bg-white/5 border border-white/10 backdrop-blur-md rounded-xl py-4 px-6 text-left flex items-center justify-between group data-[state=active]:bg-[#B5892D]/10 data-[state=active]:border-[#B5892D]/50 transition-all duration-300"
              >
                <span className="capitalize text-lg font-light tracking-wide text-white/70 group-data-[state=active]:text-white group-data-[state=active]:font-semibold transition-all">
                  {tab}
                </span>
                <span className="w-2 h-2 rounded-full bg-white/20 group-data-[state=active]:bg-[#B5892D] transition-colors" />
              </TabsTrigger>
            ))}
          </TabsList>

          {/* content */}
          <div className="min-h-[60vh] w-full max-w-[800px] mx-auto xl:mx-0">
            {/* Experience */}
            <TabsContent value="experience" className="w-full mt-0 focus-visible:outline-none focus-visible:ring-0">
              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
                className="flex flex-col gap-[30px]"
              >
                <div className="flex flex-col gap-4 text-center xl:text-left">
                  <h3 className="text-4xl sm:text-5xl font-light text-white tracking-tight">{experience.title}</h3>
                  <p className="text-white/60 text-base leading-relaxed max-w-[600px] mx-auto xl:mx-0">
                    {experience.description}
                  </p>
                </div>
                <ScrollArea className="h-[550px] w-full pr-4">
                  <ul className="grid grid-cols-1 gap-6 pb-6">
                    {experience.items.map((item, index) => (
                      <li
                        key={index}
                        className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-2xl flex flex-col gap-4 hover:bg-white/[0.07] transition-colors duration-300 group"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <span className="text-[#B5892D] font-semibold text-sm tracking-widest uppercase">
                            {item.duration}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-semibold text-white/90 group-hover:text-white transition-colors">{item.position}</h3>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#B5892D]" />
                            <p className="text-white/60 font-medium tracking-wide">{item.company}</p>
                          </div>
                        </div>
                        {item.description && (
                          <p className="text-white/50 text-sm leading-relaxed mt-2 border-t border-white/10 pt-4">
                            {item.description}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </motion.div>
            </TabsContent>

            {/* Education */}
            <TabsContent value="education" className="w-full mt-0 focus-visible:outline-none focus-visible:ring-0">
              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
                className="flex flex-col gap-[30px]"
              >
                <div className="flex flex-col gap-4 text-center xl:text-left">
                  <h3 className="text-4xl sm:text-5xl font-light text-white tracking-tight">{education.title}</h3>
                  <p className="text-white/60 text-base leading-relaxed max-w-[600px] mx-auto xl:mx-0">
                    {education.description}
                  </p>
                </div>
                <ScrollArea className="h-[550px] w-full pr-4">
                  <ul className="grid grid-cols-1 gap-6 pb-6">
                    {education.items.map((item, index) => (
                      <li
                        key={index}
                        className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-2xl flex flex-col gap-4 hover:bg-white/[0.07] transition-colors duration-300 group"
                      >
                        <span className="text-[#B5892D] font-semibold text-sm tracking-widest uppercase">
                          {item.duration}
                        </span>
                        <div>
                          <h3 className="text-2xl font-semibold text-white/90 group-hover:text-white transition-colors leading-tight">{item.degree}</h3>
                          <div className="flex items-center gap-3 mt-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#B5892D]" />
                            <p className="text-white/60 font-medium tracking-wide">{item.institute}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </motion.div>
            </TabsContent>

            {/* Skills */}
            <TabsContent value="skills" className="w-full mt-0 focus-visible:outline-none focus-visible:ring-0">
              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
                className="flex flex-col gap-[40px]"
              >
                <div className="flex flex-col gap-4 text-center xl:text-left">
                  <h3 className="text-4xl sm:text-5xl font-light text-white tracking-tight">{skills.title}</h3>
                  <p className="text-white/60 text-base leading-relaxed max-w-[600px] mx-auto xl:mx-0">
                    {skills.description}
                  </p>
                </div>
                <ScrollArea className="h-[550px] w-full pr-4">
                    <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 pb-10">
                    {skills.skillList.map((skill, index) => (
                        <li key={index}>
                        <TooltipProvider delayDuration={100}>
                            <Tooltip>
                            <TooltipTrigger className="w-full aspect-square bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center group rounded-2xl hover:bg-white/10 hover:border-[#B5892D]/50 hover:-translate-y-1 transition-all duration-300">
                                <div className="text-4xl text-white/50 group-hover:text-[#B5892D] transition-colors duration-300 drop-shadow-lg">
                                {skill.icon}
                                </div>
                            </TooltipTrigger>
                            <TooltipContent className="bg-[#111110] border border-white/10 text-white shadow-2xl">
                                <p className="font-medium tracking-wider text-xs uppercase">{skill.name}</p>
                            </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        </li>
                    ))}
                    </ul>
                </ScrollArea>
              </motion.div>
            </TabsContent>

            {/* About */}
            <TabsContent
              value="about"
              className="w-full mt-0 focus-visible:outline-none focus-visible:ring-0"
            >
              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
                className="flex flex-col gap-[40px]"
              >
                <div className="flex flex-col gap-4 text-center xl:text-left">
                  <h3 className="text-4xl sm:text-5xl font-light text-white tracking-tight">{about.title}</h3>
                  <p className="text-white/70 text-base leading-relaxed text-justify xl:text-left">
                    {about.description}
                  </p>
                </div>
                
                <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 sm:p-10">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                    {about.info.map((item, index) => (
                        <li
                        key={index}
                        className="flex flex-col gap-1 border-b border-white/5 pb-4 last:border-0 sm:last:border-b-0"
                        >
                        <span className="text-[#B5892D] text-xs font-semibold uppercase tracking-widest">
                            {item.fieldName}
                        </span>
                        <span className="text-white/90 font-medium text-lg">
                            {item.fieldValue}
                        </span>
                        </li>
                    ))}
                    </ul>
                </div>
              </motion.div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;
