"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const TypingText = ({ text, speed = 100 }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text[index]);
      index++;
      if (index === text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className="whitespace-pre text-white text-4xl font-bold font-mono tracking-widest">
      {displayed}
    </span>
  );
};

const StairTransition = () => {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 2000);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {isAnimating && (
        <motion.div
          key={pathname}
          className="fixed top-0 left-0 w-screen h-screen z-50 bg-primary flex items-center justify-center pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.2, ease: "easeInOut" },
          }}
        >
          <span className="text-4xl font-bold bg-gradient-to-r from-[#171717] via-[#FAC70F] to-white bg-clip-text text-transparent animate-[shimmer_2s_infinite_linear] tracking-widest">
            Loading...
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StairTransition;
