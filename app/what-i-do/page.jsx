"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { BsArrowDownRight } from "react-icons/bs";

const highlights = [
  {
    num: "01",
    title: "Web App Development",
    description:
      "A portfolio of multi-layer, role-based web applications developed as part of my Master of Information Technology research and personal projects. Built using ASP.NET Web API with Entity Framework for RESTful backends, and React.js or Next.js for frontends. All projects, including their repositories, are available for review via the link. Deployed on Azure and Vercel for demonstration, following Agile methodology throughout the development lifecycle.",
    href: "https://lnk.bio/marktmng",
  },
  {
    num: "02",
    title: "Mobile App Development",
    description:
      "Collaborated as a team member on a mobile application developed using Kotlin. Contributed to feature implementation and code integration while gaining experience in mobile app development practices. The source code is available on GitHub.",
    href: "https://github.com/Jasbac0002/MobileApp.git",
  },
  {
    num: "03",
    title: "Cloud Computing",
    description:
      "Hands-on experience deploying web applications on AWS and Azure, including cloud configuration and environment setup. A demo video is provided to showcase deployment workflows and cloud application functionality. Source code is not publicly available due to service limitations.",
    href: "https://drive.google.com/drive/folders/1mK-HDOT-Pl9yV-Y0wYsx6ty2hkq-MshE?usp=drive_link",
  },
  {
    num: "04",
    title: "Desktop App Development",
    description:
      "Developed a desktop application as an academic project for a shipping company scenario. The application was built using C# and T-SQL to manage shipping orders and operational records, focusing on data integrity, usability, and efficient workflows.",
    href: "https://github.com/marktmng/VShippingLTD.git",
  },
  {
    num: "05",
    title: "IT Support & Systems",
    description:
      "Provided IT support alongside development roles, including software installation, system troubleshooting, basic networking support, and assisting users with technical issues. This experience strengthened my problem-solving skills and understanding of real-world IT environments.",
    href: "#",
  },
  {
    num: "06",
    title: "Graphic Design",
    description:
      "Over four years of professional experience in graphic design, producing storybooks, posters, logos, brochures, social media content, and illustrations. Skilled in delivering visually consistent designs while collaborating with clients and stakeholders across multiple projects.",
    href: "https://drive.google.com/file/d/16r1WFlN14RVM8JINAJaEDRpjer8iNFRr/view?usp=sharing",
  },
];

const HighlightCard = ({ service, index }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Scroll-based animations
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.9, 1, 1, 0.9]
  );

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const smoothY = useSpring(y, springConfig);
  const smoothScale = useSpring(scale, springConfig);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, y: smoothY, scale: smoothScale }}
      className="grid grid-cols-1 justify-center gap-4 group bg-[#171717]/20 p-6 rounded-xl shadow-lg border border-white/10"
    >
      {/* Top: Number + Link */}
      <div className="flex w-full flex-row justify-between items-center">
        <div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">
          {service.num}
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={service.href}
                className="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45"
              >
                <BsArrowDownRight className="text-primary text-3xl" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="top">Click arrow to view</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Title */}
      <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500">
        {service.title}
      </h2>

      {/* Description */}
      <p className="text-white/60 text-justify">{service.description}</p>

      {/* Border */}
      <div className="border-b border-white/20 w-full"></div>
    </motion.div>
  );
};

const Highlights = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12">
      <div className="container mx-auto space-y-12">
        {highlights.map((service, index) => (
          <HighlightCard key={index} service={service} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Highlights;
