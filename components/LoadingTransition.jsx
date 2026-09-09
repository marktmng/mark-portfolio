"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const StairTransition = () => {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    setIsAnimating(true);
    // Reduced from 2000ms to 600ms for a much snappier experience
    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {isAnimating && (
        <motion.div
          key={pathname}
          className="fixed inset-0 z-[100] bg-[#111110] flex items-center justify-center pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.4, ease: "easeInOut" },
          }}
        >
          {/* Subtle elegant loading animation matching the new theme */}
          <motion.div 
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-2xl sm:text-3xl text-white/90 tracking-widest flex items-center gap-2">
              <span className="font-light">MARK</span>
              <span className="font-pixel text-[#B5892D] animate-pulse">TAMANG</span>
            </div>
            {/* Elegant loading bar */}
            <div className="w-32 h-[1px] bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#B5892D]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StairTransition;
