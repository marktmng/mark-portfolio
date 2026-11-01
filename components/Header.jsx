"use client";

import Image from "next/image";
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
          ? "bg-[#111110]/85 backdrop-blur-xl border-b border-[#B5892D]/30 shadow-2xl shadow-black/60 py-3.5"
          : "bg-transparent py-7 xl:py-10"
      }`}
    >
      {/* Subtle tech border illumination when scrolled */}
      {scrolled && (
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#fac70f]/50 to-transparent pointer-events-none" />
      )}

      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onMouseEnter={() => playTechTick()}
          className="relative group"
        >
          <Image
            src="/assets/mark.png"
            alt="Mark Logo"
            width={scrolled ? 75 : 95}
            height={190}
            priority
            className="object-contain transition-all duration-500 group-hover:scale-105"
          />
          <div className="absolute -inset-2 bg-[#B5892D]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
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
