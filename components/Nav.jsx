"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FiTerminal } from "react-icons/fi";

const links = [
  { name: "home", path: "/", file: "index.tsx" },
  { name: "about", path: "/about", file: "about.tsx" },
  { name: "services", path: "/services", file: "services.tsx" },
  { name: "projects", path: "/projects", file: "projects.tsx" },
  { name: "contact", path: "/contact", file: "contact.tsx" },
];

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 bg-[#0a0a0a]/80 p-1.5 rounded-xl border border-white/10 backdrop-blur-md shadow-2xl font-mono text-sm overflow-hidden">
      {/* Terminal Prompt Prefix */}
      <div className="flex items-center px-3 py-2 text-white/50 border-r border-white/10 mr-1 select-none">
        <FiTerminal className="mr-2 text-[#B5892D]" />
        <span className="hidden xl:inline text-xs text-[#B5892D]">mark@portfolio:~</span>
      </div>

      {links.map((link, index) => {
        const isActive = link.path === pathname;

        return (
          <Link
            key={index}
            href={link.path}
            className={`relative px-4 py-2 rounded-lg text-xs tracking-wide transition-all duration-300 z-10 flex items-center gap-2 group ${
              isActive ? "text-white" : "text-white/40 hover:text-white/80 hover:bg-white/5"
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
            
            {/* The Text */}
            <span className={`${isActive ? "text-[#B5892D]" : "text-transparent group-hover:text-white/30"} transition-colors`}>$</span>
            <span>
              {isActive ? `cd .${link.path === '/' ? '' : link.path}` : `cat ${link.file}`}
            </span>
            
            {/* Blinking Cursor */}
            {isActive && (
              <motion.div 
                animate={{ opacity: [1, 0, 1] }} 
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-1.5 h-3.5 bg-[#B5892D]" 
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
