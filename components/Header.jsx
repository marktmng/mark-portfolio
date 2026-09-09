"use client";

import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";
import Nav from "./Nav";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-primary/80 backdrop-blur-md shadow-lg shadow-black/20 py-4" 
          : "bg-transparent py-8 xl:py-12"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="relative group">
          <Image
            src="/assets/mark.png"
            alt="Mark Logo"
            width={scrolled ? 80 : 100}
            height={200}
            className="object-contain transition-all duration-500 group-hover:scale-105"
          />
          <div className="absolute -inset-2 bg-accent/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
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
