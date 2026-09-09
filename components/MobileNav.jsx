"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiTerminal } from "react-icons/fi";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const links = [
  { name: "home", path: "/", file: "index.tsx" },
  { name: "about", path: "/about", file: "about.tsx" },
  { name: "services", path: "/services", file: "services.tsx" },
  { name: "projects", path: "/projects", file: "projects.tsx" },
  { name: "contact", path: "/contact", file: "contact.tsx" },
];

const MobileNav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="flex justify-center items-center group">
        <div className="bg-[#0a0a0a]/80 p-3 rounded-xl border border-white/10 backdrop-blur-md group-hover:bg-[#B5892D]/10 group-hover:border-[#B5892D]/30 transition-all shadow-xl font-mono flex items-center gap-2">
          <FiTerminal className="text-xl text-[#B5892D]" />
          <span className="text-white/70 text-xs hidden sm:inline">./nav.sh</span>
        </div>
      </SheetTrigger>
      <SheetContent side="top" className="flex flex-col bg-[#0a0a0a]/95 backdrop-blur-3xl border-b border-[#B5892D]/30 font-mono h-auto pb-12 pt-6">
        <SheetHeader>
          <SheetTitle>
            <VisuallyHidden>Mobile Navigation Menu</VisuallyHidden>
          </SheetTitle>
        </SheetHeader>

        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 mb-8 w-full mx-auto">
          <div className="flex gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]"></div>
          </div>
          <span className="text-white/40 text-xs ml-4 font-mono tracking-wider flex-1 text-center pr-10">bash - mark@portfolio:~</span>
        </div>

        <nav className="flex flex-col justify-center items-start gap-8 px-6 sm:px-12 w-full max-w-lg mx-auto">
          {links.map((link, index) => {
            const isActive = link.path === pathname;

            return (
              <div key={index} className="w-full">
                <Link
                  href={link.path}
                  className="flex items-center gap-3 w-full group cursor-pointer"
                >
                  <span className="text-[#B5892D] text-xl font-bold">~</span>
                  <span className={`text-xl sm:text-2xl transition-all duration-300 font-mono ${isActive ? "text-white" : "text-white/50 group-hover:text-white"}`}>
                    $ cd .<span className={`${isActive ? "text-[#B5892D]" : "text-white/80"}`}>{link.path === '/' ? '' : link.path}</span>
                  </span>
                  {isActive && (
                    <motion.div 
                      animate={{ opacity: [1, 0, 1] }} 
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-3 h-6 sm:h-7 bg-[#B5892D] inline-block ml-1" 
                    />
                  )}
                </Link>
                {!isActive && (
                  <div className="ml-8 mt-1.5 text-white/30 text-xs sm:text-sm font-mono opacity-60">
                    {`drwxr-xr-x  mark  admin  ${link.name}`}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
