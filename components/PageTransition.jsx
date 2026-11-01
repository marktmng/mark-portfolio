"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const PageTransition = ({ children }) => {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <div key={pathname} className="w-full">
        <motion.div
          initial={{ opacity: 0.6 }}
          animate={{
            opacity: 0,
            transition: { duration: 0.2, ease: "easeOut" },
          }}
          className="h-screen w-screen fixed bg-primary top-0 pointer-events-none z-40"
        />
        {children}
      </div>
    </AnimatePresence>
  );
};

export default PageTransition;
