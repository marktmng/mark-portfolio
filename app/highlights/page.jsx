"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowDownRight } from "react-icons/bs";

const highlights = [
  {
    num: "01",
    title: "Web Development",
    description:
      "This is a web development service. You can find the source code on GitHub, where I developed a fully functional web app using ASP.Net MVC, Entity Framework (C#), HTML, CSS, and JavaScript with my other team members. Additionally, there are other repositories containing source code for various web development projects I worked on as an intern for different companies.",
    href: "https://github.com/marktmng/mmltonga_shopping_app.git",
  },
  {
    num: "02",
    title: "Mobile App Development",
    description:
      "This is a mobile app development service. You can find the quiz app source code on GitHub, where I contributed as a team member with Kotlin programming language. I am also planning to start a new mobile app project soon.",
    href: "https://github.com/Jasbac0002/MobileApp.git",
  },
  {
    num: "03",
    title: "Cloud Computing",
    description:
      "In this link, you will find a demo video showcasing my cloud application skills, where I deployed a web app on AWS and Azure. Unfortunately, I don’t have the source code for this project, as it is a paid service, and I am unable to keep it live after deployment.",
    href: "https://drive.google.com/drive/folders/1mK-HDOT-Pl9yV-Y0wYsx6ty2hkq-MshE?usp=drive_link",
  },
  {
    num: "04",
    title: "UI/UX Design",
    description:
      "I don’t currently have a completed UI/UX design project to showcase, but I have provided a draft link to demonstrate my UI/UX design skills using Figma. You can interact with the prototype and explore the design of the web app. Additionally, as a Graphic Designer, I have included my design portfolio in the Graphic Design link.",
    href: "https://www.figma.com/design/P5DjezlzAIMa4MnBAHzg2e/webApp?node-id=0-1&p=f&t=h3YbfnMxgJXVs0Q6-0",
  },

  {
    num: "05",
    title: "Graphic Design",
    description:
      "I have provided my design portfolio, showcasing over four years of experience in graphic design. My work includes projects such as storybooks, poster designs, logos, brochures, social media designs, and illustrations. You can view my portfolio on Google Drive.",
    href: "https://drive.google.com/file/d/16r1WFlN14RVM8JINAJaEDRpjer8iNFRr/view?usp=sharing",
  },
];

const Highlights = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
        >
          {highlights.map((service, index) => {
            return (
              <div
                key={index}
                className="flex-1 flex flex-col justify-center gap-5 group"
              >
                {/* top */}
                <div className="flex w-full flew justify-between items-center">
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
                      <TooltipContent side="top">Live</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                {/* title */}
                <h2
                  className="text-[42px] font-bold leading-none text-white 
                group-hover:text-accent transition-all duration-500"
                >
                  {service.title}
                </h2>
                {/* description */}
                <p className="text-white/60 text-justify">
                  {service.description}
                </p>
                {/* border */}
                <div className="border-b border-white/20 w-full"></div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Highlights;
