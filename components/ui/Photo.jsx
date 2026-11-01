"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useRef } from "react";
import { playTechScanSound, playTechTick } from "@/lib/techSound";

const Photo = () => {
  const [isScanning, setIsScanning] = useState(false);
  const scanTimeoutRef = useRef(null);

  const triggerScan = () => {
    playTechScanSound();
    setIsScanning(true);
    if (scanTimeoutRef.current) clearTimeout(scanTimeoutRef.current);
    scanTimeoutRef.current = setTimeout(() => {
      setIsScanning(false);
    }, 700);
  };

  return (
    <div className="relative flex justify-center items-center w-full h-full select-none" style={{ perspective: "1000px" }}>
      <motion.div
        initial={{ opacity: 0, y: 20, rotateX: 10 }}
        animate={{
          opacity: 1,
          y: 0,
          rotateX: 0,
          transition: { delay: 0.15, duration: 0.7, ease: "easeOut" },
        }}
        whileHover={{
          rotateY: 8,
          rotateX: -4,
          scale: 1.04,
          transition: { duration: 0.3 },
        }}
        onMouseEnter={() => triggerScan()}
        onClick={() => triggerScan()}
        className="relative w-[280px] h-[430px] xl:w-[320px] xl:h-[485px] rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 via-[#111110]/90 to-[#0a0a0a]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col items-center pt-7 pb-6 px-6 overflow-hidden cursor-pointer group transition-all duration-300"
        style={{ transformStyle: "preserve-3d" }}
        title="Click or hover to trigger biometric laser scan"
      >
        {/* Holographic HUD Glare effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-60 pointer-events-none group-hover:opacity-90 transition-opacity duration-500" />

        {/* Cyber corner target markers */}
        <span className="absolute top-2 left-2 text-[9px] font-mono text-[#B5892D]/40 group-hover:text-[#B5892D] transition-colors">┌</span>
        <span className="absolute top-2 right-2 text-[9px] font-mono text-[#B5892D]/40 group-hover:text-[#B5892D] transition-colors">┐</span>
        <span className="absolute bottom-2 left-2 text-[9px] font-mono text-[#B5892D]/40 group-hover:text-[#B5892D] transition-colors">└</span>
        <span className="absolute bottom-2 right-2 text-[9px] font-mono text-[#B5892D]/40 group-hover:text-[#B5892D] transition-colors">┘</span>

        {/* Lanyard Hole */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-3 rounded-full bg-black/60 border border-white/20 shadow-inner" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-4 bg-gradient-to-b from-[#B5892D]/50 to-transparent rounded-t-sm" />

        {/* Header / Security Chip */}
        <div className="w-full flex justify-between items-start mt-2 mb-4">
          <div className="w-10 h-7 rounded-md border border-[#B5892D]/60 flex items-center justify-center overflow-hidden opacity-90 relative bg-black/30 shadow-[0_0_8px_rgba(181,137,45,0.2)]">
            <div className="w-full h-[1px] bg-[#B5892D]/60 absolute top-1/2" />
            <div className="h-full w-[1px] bg-[#B5892D]/60 absolute left-1/3" />
            <div className="h-full w-[1px] bg-[#B5892D]/60 absolute right-1/3" />
            <div className="w-6 h-3 bg-[#B5892D]/30 rounded-sm z-10" />
          </div>

          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full transition-colors ${isScanning ? "bg-red-400 animate-ping" : "bg-emerald-400"}`} />
              <span className="text-[#B5892D] font-mono text-[10px] tracking-widest uppercase font-semibold">
                {isScanning ? "SCAN_ACTIVE" : "SECURITY_01"}
              </span>
            </div>
            <span className="text-white/30 font-mono text-[8px] uppercase tracking-wider">
              {isScanning ? "ACQUIRING..." : "AUTH_VERIFIED"}
            </span>
          </div>
        </div>

        {/* Profile Image with Rotating Targeting Reticle */}
        <div className="relative w-32 h-32 xl:w-38 xl:h-38 rounded-full p-1.5 mb-3 shrink-0 overflow-hidden bg-black/50 shadow-[0_0_25px_rgba(181,137,45,0.25)] group-hover:shadow-[0_0_35px_rgba(181,137,45,0.45)] transition-shadow duration-500">
          
          {/* Animated rotating HUD crosshairs border */}
          <div className="absolute inset-0 rounded-full border border-dashed border-[#B5892D]/40 animate-[spin_12s_linear_infinite] pointer-events-none" />
          <div className="absolute inset-1 rounded-full border border-[#B5892D]/60 pointer-events-none" />

          {/* Avatar container */}
          <div className="relative w-full h-full rounded-full overflow-hidden bg-black/60">
            <Image
              src="/assets/professional-profile.png"
              priority
              quality={90}
              sizes="(max-width: 768px) 130px, 160px"
              fill
              alt="Mark Tamang"
              className="object-cover"
            />
          </div>

          {/* Technical Laser Scanline Sweep */}
          <motion.div
            animate={{ top: ["-10%", "110%", "-10%"] }}
            transition={{
              duration: isScanning ? 1.2 : 3,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute left-0 w-full pointer-events-none"
          >
            {/* Laser Line */}
            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#fac70f] to-transparent shadow-[0_0_10px_#fac70f]" />
            {/* Soft scan glow trail */}
            <div className="w-full h-4 bg-gradient-to-b from-[#B5892D]/25 to-transparent blur-[1px]" />
          </motion.div>

          {/* Targeting reticle ticks */}
          <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-1 bg-[#B5892D] pointer-events-none" />
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-1 bg-[#B5892D] pointer-events-none" />
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-2 bg-[#B5892D] pointer-events-none" />
          <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-2 bg-[#B5892D] pointer-events-none" />
        </div>

        {/* Biometric Scan Telemetry Pill */}
        <div className="w-full flex items-center justify-center gap-1.5 mb-2">
          <span className="text-[9px] font-mono tracking-widest text-[#B5892D] bg-[#B5892D]/15 border border-[#B5892D]/30 px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-[#fac70f] animate-pulse" />
            {isScanning ? "READING BIOMETRICS..." : "MATCH: 99.8% // VERIFIED"}
          </span>
        </div>

        {/* Info */}
        <div className="w-full text-center flex flex-col gap-0.5 z-10 flex-grow">
          <h2 className="text-white font-bold text-2xl xl:text-3xl tracking-tight m-0 uppercase font-inter">
            MARK TAMANG
          </h2>
          <p className="text-[#B5892D] text-[10px] xl:text-xs font-mono font-medium tracking-widest uppercase mb-2">
            Full-Stack Software Engineer
          </p>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-1" />

          <div className="flex justify-between w-full px-2 mt-auto">
            <div className="flex flex-col items-start">
              <span className="text-white/40 text-[8px] uppercase font-mono">SYS_HASH</span>
              <span className="text-white/80 text-[10px] font-mono tracking-wider">0x9942</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-white/40 text-[8px] uppercase font-mono">CLEARANCE</span>
              <span className="text-[#fac70f] text-[10px] font-mono tracking-wider font-semibold">ENGINEER</span>
            </div>
          </div>
        </div>

        {/* Barcode Footer */}
        <div className="absolute bottom-5 left-0 w-full flex justify-center opacity-70 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-3/4 h-7 flex gap-[2px] items-end justify-center">
            {[1, 3, 2, 4, 1, 1, 3, 2, 5, 1, 2, 1, 4, 2, 1, 3, 1, 2, 4].map((width, i) => (
              <div
                key={i}
                className="bg-white/80 h-full rounded-[1px] group-hover:bg-[#fac70f] transition-colors duration-500"
                style={{ width: `${width * 2}px` }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Photo;
