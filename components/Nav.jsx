"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FiTerminal } from "react-icons/fi";
import { playTechTick, playTechChirp } from "@/lib/techSound";

const links = [
  { name: "home", path: "/", file: "index.tsx", activeCmd: "cd ~" },
  { name: "about", path: "/about", file: "about.tsx", activeCmd: "cd ./about" },
  { name: "services", path: "/services", file: "services.tsx", activeCmd: "cd ./services" },
  { name: "projects", path: "/projects", file: "projects.tsx", activeCmd: "cd ./projects" },
  { name: "graphic-design", path: "/graphic-design", file: "graphic-design.tsx", activeCmd: "cd ./graphic-design" },
  { name: "contact", path: "/contact", file: "contact.tsx", activeCmd: "cd ./contact" },
];

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 bg-[#0a0a0a]/80 p-1.5 rounded-xl border border-white/10 backdrop-blur-md shadow-2xl font-mono text-xs overflow-x-auto no-scrollbar">
      {/* Terminal Prompt Prefix */}
      <div className="flex items-center px-2.5 py-1.5 text-white/50 border-r border-white/10 mr-1 select-none whitespace-nowrap">
        <FiTerminal className="mr-1.5 text-[#B5892D] text-sm" />
        <span className="hidden xl:inline text-[11px] text-[#B5892D]">mark@portfolio:~</span>
      </div>

      {links.map((link, index) => {
        const isActive = link.path === pathname;

        return (
          <Link
            key={index}
            href={link.path}
            onMouseEnter={() => playTechTick()}
            onClick={() => playTechChirp()}
            className={`relative px-2.5 xl:px-3 py-1.5 rounded-lg text-[11px] xl:text-xs tracking-wide transition-all duration-300 z-10 flex items-center gap-1.5 whitespace-nowrap group ${
              isActive ? "text-white font-medium" : "text-white/40 hover:text-white/80 hover:bg-white/5"
            }`}
          >
            {/* Active Highlight */}
            {isActive && (
              <motion.div
                layoutId="nav-bg"
                className="absolute inset-0 bg-[#B5892D]/10 border border-[#B5892D]/30 rounded-lg -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}

            {/* The Prompt & Command */}
            <span className={`${isActive ? "text-[#B5892D]" : "text-transparent group-hover:text-white/30"} transition-colors select-none`}>
              $
            </span>
            <span className="whitespace-nowrap">
              {isActive ? link.activeCmd : `cat ${link.file}`}
            </span>

            {/* Blinking Cursor */}
            {isActive && (
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-1.5 h-3 bg-[#B5892D] inline-block ml-0.5"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
