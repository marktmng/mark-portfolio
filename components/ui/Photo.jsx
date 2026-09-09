"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Photo = () => {
  return (
    <div className="relative flex justify-center items-center w-full h-full" style={{ perspective: "1000px" }}>
      <motion.div
        initial={{ opacity: 0, y: 20, rotateX: 10 }}
        animate={{
          opacity: 1,
          y: 0,
          rotateX: 0,
          transition: { delay: 0.2, duration: 0.8, ease: "easeOut" },
        }}
        whileHover={{
          rotateY: 10,
          rotateX: -5,
          scale: 1.05,
          transition: { duration: 0.4 },
        }}
        className="relative w-[280px] h-[420px] xl:w-[320px] xl:h-[480px] rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-[#0a0a0a]/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center pt-8 pb-6 px-6 overflow-hidden"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Hologram / Glare effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-50 pointer-events-none" />

        {/* Lanyard Hole */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-3 rounded-full bg-black/50 border border-white/20 shadow-inner" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-4 bg-gradient-to-b from-[#B5892D]/40 to-transparent rounded-t-sm" />

        {/* Header / Chip */}
        <div className="w-full flex justify-between items-start mt-2 mb-6">
          <div className="w-10 h-8 rounded-md border border-[#B5892D]/50 flex items-center justify-center overflow-hidden opacity-80 relative bg-black/20">
            <div className="w-full h-[1px] bg-[#B5892D]/40 absolute top-1/2" />
            <div className="h-full w-[1px] bg-[#B5892D]/40 absolute left-1/3" />
            <div className="h-full w-[1px] bg-[#B5892D]/40 absolute right-1/3" />
            <div className="w-6 h-4 bg-[#B5892D]/20 rounded-sm z-10" />
          </div>
          <span className="text-[#B5892D] font-mono text-[10px] tracking-widest uppercase opacity-80 mt-1">
            ACCESS_LEVEL: 01
          </span>
        </div>

        {/* Profile Image */}
        <div className="relative w-32 h-32 xl:w-40 xl:h-40 rounded-full border-[3px] border-[#B5892D]/80 p-1 shadow-[0_0_20px_rgba(181,137,45,0.3)] mb-4 shrink-0 overflow-hidden bg-black/40">
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              src={"/assets/portfolio-profile.png"}
              priority
              quality={100}
              fill
              alt="Mark Tamang"
              className="object-cover"
            />
          </div>
          {/* Subtle scanning line effect over image */}
          <motion.div
            animate={{ top: ["-10%", "110%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-1 bg-[#B5892D] opacity-50 blur-[2px]"
          />
        </div>

        {/* Info */}
        <div className="w-full text-center flex flex-col gap-1 z-10 flex-grow">
          <h2 className="text-white font-bold text-2xl xl:text-3xl tracking-tight m-0 uppercase">MARK TAMANG</h2>
          <p className="text-[#B5892D] text-[10px] xl:text-xs font-medium tracking-widest uppercase mb-4">Software Engineer</p>
          
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-2" />
          
          <div className="flex justify-between w-full px-2 mt-auto">
            <div className="flex flex-col items-start">
              <span className="text-white/40 text-[8px] uppercase">ID Number</span>
              <span className="text-white/80 text-[10px] font-mono tracking-wider">DEV-9942</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-white/40 text-[8px] uppercase">Valid Thru</span>
              <span className="text-white/80 text-[10px] font-mono tracking-wider">FOREVER</span>
            </div>
          </div>
        </div>

        {/* Barcode Footer */}
        <div className="absolute bottom-6 left-0 w-full flex justify-center opacity-70">
          <div className="w-3/4 h-8 flex gap-[2px] items-end justify-center">
            {/* Generated random-looking barcode lines */}
            {[1, 3, 2, 4, 1, 1, 3, 2, 5, 1, 2, 1, 4, 2, 1, 3, 1, 2, 4].map((width, i) => (
              <div key={i} className="bg-white/80 h-full rounded-[1px]" style={{ width: `${width * 2}px` }} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Photo;
