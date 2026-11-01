"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const LoadingTransition = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Only show full splash on first load of the session to maximize performance
    try {
      const hasLoadedBefore = sessionStorage.getItem("mark_portfolio_initial_loaded");
      if (!hasLoadedBefore) {
        setIsAnimating(true);
        sessionStorage.setItem("mark_portfolio_initial_loaded", "true");
        const timer = setTimeout(() => setIsAnimating(false), 500);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // Fallback: fast 400ms splash
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 400);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isAnimating && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#111110] flex items-center justify-center pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.3, ease: "easeOut" },
          }}
        >
          {/* Subtle elegant loading animation */}
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-2xl sm:text-3xl text-white/90 tracking-widest flex items-center gap-2">
              <span className="font-light">MARK</span>
              <span className="font-pixel text-[#B5892D] animate-pulse">TAMANG</span>
            </div>
            {/* Fast loading bar */}
            <div className="w-32 h-[1.5px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#B5892D]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingTransition;
