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
  { name: "home", path: "/", file: "index.tsx", activeCmd: "cd ~", inactiveCmd: "cd ~" },
  { name: "about", path: "/about", file: "about.tsx", activeCmd: "cd ./about", inactiveCmd: "cd ./about" },
  { name: "services", path: "/services", file: "services.tsx", activeCmd: "cd ./services", inactiveCmd: "cd ./services" },
  { name: "projects", path: "/projects", file: "projects.tsx", activeCmd: "cd ./projects", inactiveCmd: "cd ./projects" },
  { name: "graphic-design", path: "/graphic-design", file: "graphic-design.tsx", activeCmd: "cd ./graphic-design", inactiveCmd: "cd ./graphic-design" },
  { name: "contact", path: "/contact", file: "contact.tsx", activeCmd: "cd ./contact", inactiveCmd: "cd ./contact" },
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
        <div className="bg-[#0a0a0a]/80 p-2.5 sm:p-3 rounded-xl border border-white/10 backdrop-blur-md group-hover:bg-[#B5892D]/10 group-hover:border-[#B5892D]/30 transition-all shadow-xl font-mono flex items-center gap-2">
          <FiTerminal className="text-lg sm:text-xl text-[#B5892D]" />
          <span className="text-white/70 text-xs hidden sm:inline">./nav.sh</span>
        </div>
      </SheetTrigger>
      <SheetContent side="top" className="flex flex-col bg-[#0a0a0a]/98 backdrop-blur-3xl border-b border-[#B5892D]/30 font-mono max-h-[92vh] overflow-y-auto pb-8 pt-5 px-4 sm:px-8">
        <SheetHeader>
          <SheetTitle>
            <VisuallyHidden>Mobile Navigation Menu</VisuallyHidden>
          </SheetTitle>
        </SheetHeader>

        {/* Terminal Header */}
        <div className="flex items-center justify-between px-2 py-2 border-b border-white/10 mb-6 w-full max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <span className="text-white/40 text-[11px] font-mono tracking-wider pr-6">
            bash — mark@portfolio:~
          </span>
          <div className="w-4" />
        </div>

        {/* Navigation list */}
        <nav className="flex flex-col justify-center items-start gap-4 sm:gap-5 px-3 sm:px-6 w-full max-w-md mx-auto">
          {links.map((link, index) => {
            const isActive = link.path === pathname;

            return (
              <div key={index} className="w-full">
                <Link
                  href={link.path}
                  className="flex items-center gap-2.5 w-full group cursor-pointer whitespace-nowrap"
                >
                  <span className="text-[#B5892D] text-base sm:text-lg font-bold select-none">~</span>
                  <span
                    className={`text-base sm:text-lg transition-all duration-300 font-mono whitespace-nowrap flex items-center ${
                      isActive ? "text-white font-semibold" : "text-white/50 group-hover:text-white"
                    }`}
                  >
                    <span>$ {isActive ? link.activeCmd : link.inactiveCmd}</span>
                    {isActive && (
                      <motion.div
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-2.5 h-5 bg-[#B5892D] inline-block ml-1.5"
                      />
                    )}
                  </span>
                </Link>

                {!isActive && (
                  <div className="ml-6 mt-0.5 text-white/30 text-[11px] font-mono opacity-60 whitespace-nowrap">
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
