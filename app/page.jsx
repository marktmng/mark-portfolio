"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { Element } from "react-scroll";
import { ConvexClientProvider } from "./ConvexClientProvider";
import "./globals.css";
import { motion, useScroll, useTransform } from "framer-motion";

import Photo from "@/components/ui/Photo";
import Social from "@/components/ui/Social";
import Testimonials from "@/components/ui/Testimonials";

const Home = () => {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 250]);

  // Cinematic stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.95, filter: "blur(10px)" },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  return (
    <ConvexClientProvider>
      {/* Background Layer */}
      <div className="fixed inset-0 z-[-1] bg-[#111110] pointer-events-none overflow-hidden">
        {/* Subtle mesh grid */}
        <div className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: "linear-gradient(to right, #ffffff05 1px, transparent 1px), linear-gradient(to bottom, #ffffff05 1px, transparent 1px)",
            backgroundSize: "6rem 6rem"
          }}
        />
        {/* Massive Background Typography Parallax */}
        <motion.div
          style={{ y: yParallax }}
          className="absolute -top-[10%] -left-[5%] w-[110%] flex justify-center opacity-5 select-none"
        >
          <span className="text-[20vw] font-bold tracking-tighter whitespace-nowrap text-white">
            MARK <span className="font-pixel italic">TAMANG</span>
          </span>
        </motion.div>
      </div>

      <section className="min-h-screen font-inter text-white pt-24 pb-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:py-8">

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* 1. Header Row: Name & Role */}
            <motion.div variants={cardVariants} className="flex flex-col xl:flex-row items-start xl:items-end justify-between gap-6 mb-4">
              <div>
                <span className="inline-block text-xs uppercase tracking-[0.2em] font-medium text-[#B5892D] mb-4 bg-[#B5892D]/10 px-4 py-2 rounded-full border border-[#B5892D]/20">
                  Full-Stack Software Developer &amp; Founder
                </span>
                <h1 className="text-[48px] sm:text-[64px] xl:text-[90px] leading-[0.9] font-bold tracking-tight">
                  MARK <br className="hidden sm:block" />
                  <span className="font-pixel italic font-normal text-[#B5892D]">TAMANG</span>
                </h1>
              </div>
            </motion.div>

            {/* 2. Bento Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-auto">

              {/* Main Intro Card (Spans 2 columns on desktop) */}
              <motion.div variants={cardVariants} className="md:col-span-2 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 backdrop-blur-xl shadow-2xl flex flex-col justify-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#B5892D] opacity-[0.03] blur-3xl rounded-full group-hover:opacity-[0.08] transition-opacity duration-700" />
                <p className="text-xl sm:text-2xl lg:text-3xl font-light leading-relaxed text-white/90">
                  Full-Stack Developer with expertise in <span className="font-semibold text-white">ASP.NET Core</span>, <span className="font-semibold text-white">React</span>, <span className="font-semibold text-white">Next.js</span>, <span className="font-semibold text-white">PostgreSQL</span>, and cloud platforms. Proven track record of delivering scalable, high-performance web applications.
                </p>
              </motion.div>

              {/* Photo Card */}
              <motion.div variants={cardVariants} className="bg-white/5 border border-white/10 rounded-3xl p-4 sm:p-6 backdrop-blur-xl flex items-center justify-center relative overflow-hidden min-h-[450px]">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#B5892D]/20 to-transparent rounded-3xl -z-5 opacity-50 pointer-events-none" />
                <div className="w-full h-full flex items-center justify-center perspective-1000">
                  <Photo />
                </div>
              </motion.div>

              {/* Stats & Impact Card */}
              <motion.div variants={cardVariants} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl flex flex-col justify-between gap-6 hover:bg-white/[0.07] transition-colors duration-500">
                <div className="flex flex-col gap-4">
                  <p className="text-sm sm:text-base leading-relaxed text-white/70">
                    <span className="text-[#B5892D] font-medium text-lg block mb-1">Building AI-powered solutions</span>
                    by combining software engineering, OpenAI technologies, automation, and modern development tools to turn ideas into practical digital products.
                  </p>
                  <div className="w-full h-px bg-white/10" />
                  <p className="text-sm sm:text-base leading-relaxed text-white/70">
                    <span className="text-[#B5892D] font-medium text-lg block mb-1">Continuously learning and adapting</span>
                    to emerging technologies across full-stack development, cloud, AI, and automation to solve problems and deliver better software.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/40 bg-white/5 w-fit px-3 py-1.5 rounded-md">
                  CI/CD Pipelines <span className="text-[#B5892D]">&lt; 10 Deploys</span>
                </div>
              </motion.div>

              {/* Founder Card */}
              <motion.div variants={cardVariants} className="bg-[#B5892D]/10 border border-[#B5892D]/20 rounded-3xl p-8 backdrop-blur-xl flex flex-col justify-between group cursor-pointer relative overflow-hidden hover:scale-[1.02] transition-transform duration-500">
                <div className="absolute inset-0 bg-[#B5892D] opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                <span className="font-semibold text-[#B5892D] uppercase tracking-widest text-xs mb-4">Current Venture</span>
                <div>
                  <Link
                    href="https://pakhreen.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-white font-bold text-3xl group-hover:text-[#B5892D] transition-colors duration-300 mb-2 after:absolute after:inset-0"
                  >
                    PAKHREEN
                    <FaExternalLinkAlt className="text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </Link>
                  <p className="text-white/60 text-sm leading-relaxed max-w-[250px]">
                    Building innovative tech solutions for modern businesses.
                  </p>
                </div>
              </motion.div>

              {/* Philosophy & Actions Card */}
              <motion.div variants={cardVariants} className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl flex flex-col justify-between gap-8">
                <p className="text-sm text-white/70 italic leading-relaxed">
                  "Passionate about clean code, user experience, and continuous learning. Open to collaborations — reach out via <Link href="/contact" className="text-white hover:text-[#B5892D] font-medium underline decoration-white/30 underline-offset-4 transition-colors">Contact</Link>."
                </p>

                {/* Command Bar style buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <a
                    href="https://pub-eab1a46333574948b55182f6d86cdd87.r2.dev/my-portfolio-web-resume/Mark_Tamang_cv.pdf"
                    download
                    className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-[#111110] hover:bg-[#B5892D] px-6 py-4 rounded-xl font-bold uppercase tracking-wide text-sm transition-colors duration-300 group"
                  >
                    <span>Download CV</span>
                    <FiDownload className="group-hover:translate-y-1 transition-transform duration-300" />
                  </a>
                  <div className="w-full sm:w-auto flex justify-center bg-white/5 border border-white/10 rounded-xl px-2 py-2">
                    <Social
                      containerStyles="flex gap-2"
                      iconStyles="w-10 h-10 rounded-lg flex justify-center items-center text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300"
                    />
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="mt-32 pt-20 bg-gradient-to-b from-transparent to-[#0a0a09] relative"
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <Element name="testimonials-section">
            <Testimonials className="mb-16" />
          </Element>
        </motion.div>
      </section>
    </ConvexClientProvider>
  );
};

export default Home;
