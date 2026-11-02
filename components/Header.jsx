"use client";

import Link from "next/link";
import MobileNav from "./MobileNav";
import Nav from "./Nav";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { playTechScrollSound, playTechTick } from "@/lib/techSound";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const lastScrolledRef = useRef(false);
  const userInteractedRef = useRef(false);

  useEffect(() => {
    // Only play audio once the user has initiated active interaction (prevents unwanted cold start sounds)
    const onUserInteraction = () => {
      userInteractedRef.current = true;
      window.removeEventListener("wheel", onUserInteraction);
      window.removeEventListener("touchmove", onUserInteraction);
      window.removeEventListener("keydown", onUserInteraction);
    };

    window.addEventListener("wheel", onUserInteraction, { passive: true });
    window.addEventListener("touchmove", onUserInteraction, { passive: true });
    window.addEventListener("keydown", onUserInteraction, { passive: true });

    const handleScroll = () => {
      const isDown = window.scrollY > 40;
      if (isDown !== lastScrolledRef.current) {
        if (userInteractedRef.current) {
          playTechScrollSound(isDown ? "down" : "up");
        }
        lastScrolledRef.current = isDown;
        setScrolled(isDown);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", onUserInteraction);
      window.removeEventListener("touchmove", onUserInteraction);
      window.removeEventListener("keydown", onUserInteraction);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#111110]/85 backdrop-blur-xl border-b border-[#B5892D]/30 shadow-2xl shadow-black/60 py-3"
          : "bg-transparent py-6 xl:py-9"
      }`}
    >
      {/* Subtle tech border illumination when scrolled */}
      {scrolled && (
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#fac70f]/50 to-transparent pointer-events-none" />
      )}

      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        {/* High-Tech Text Logo Section */}
        <Link
          href="/"
          onMouseEnter={() => playTechTick()}
          className="relative group flex items-center py-1 select-none focus-visible:outline-none"
          aria-label="Mark Tamang - Home"
        >
          {/* Ambient Gold Glow Aura */}
          <div className="absolute -inset-x-3 -inset-y-1.5 bg-[#B5892D]/15 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />

          {/* Sleek Corner HUD Reticle Brackets on hover */}
          <span className="absolute -top-1 -left-2 w-2 h-2 border-t-2 border-l-2 border-transparent group-hover:border-[#fac70f] transition-all duration-300 pointer-events-none" />
          <span className="absolute -top-1 -right-2 w-2 h-2 border-t-2 border-r-2 border-transparent group-hover:border-[#fac70f] transition-all duration-300 pointer-events-none" />
          <span className="absolute -bottom-1 -left-2 w-2 h-2 border-b-2 border-l-2 border-transparent group-hover:border-[#fac70f] transition-all duration-300 pointer-events-none" />
          <span className="absolute -bottom-1 -right-2 w-2 h-2 border-b-2 border-r-2 border-transparent group-hover:border-[#fac70f] transition-all duration-300 pointer-events-none" />

          <div className="flex flex-col justify-center">
            {/* Bold Mark. Logo Text */}
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white group-hover:text-white transition-all duration-300 flex items-baseline leading-none">
              Mark
              <span className="text-[#fac70f] drop-shadow-[0_0_8px_rgba(250,199,15,0.7)] group-hover:drop-shadow-[0_0_14px_rgba(250,199,15,0.9)] group-hover:scale-125 transition-all duration-300 inline-block ml-0.5 leading-none">
                .
              </span>
            </h1>

            {/* Subtle Tech Telemetry Line */}
            <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity duration-300 font-mono mt-1.5 leading-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
              <span className="text-[9px] tracking-[0.2em] text-[#B5892D] uppercase font-semibold leading-none">
                SYS_ONLINE
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
        </div>

        {/* Mobile nav */}
        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
