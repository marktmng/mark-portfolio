"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

// Navigation links
const links = [
  { name: "home", path: "/" },
  { name: "about", path: "/about" },
  { name: "highlights", path: "/highlights" },
  { name: "work", path: "/work" },
  { name: "contact", path: "/contact" },
];

const MobileNav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // control the sheet open state

  // automatically close the sheet when the pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    // Sheet component for mobile navigation and automatically closing it when the pathname changes
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      {" "}
      {/* Menu Trigger */}
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[30px] text-accent" />
      </SheetTrigger>
      {/* Sheet Content */}
      <SheetContent className="flex flex-col">
        {/* Dialog Header with Title */}
        <SheetHeader>
          <SheetTitle>
            <VisuallyHidden>Mobile Navigation Menu</VisuallyHidden>
          </SheetTitle>
        </SheetHeader>

        {/* Logo */}
        <div className="mt-32 text-center text-2xl">
          <Link href="/">
            <h1 className="text-4xl font-semibold">
              Mark<span className="text-accent">.</span>
            </h1>
          </Link>
        </div>

        {/* Navigation Links with Dot */}
        <nav className="mt-20 flex flex-col justify-center items-center gap-8">
          {links.map((link, index) => {
            const isActive = link.path === pathname;

            return (
              <div
                key={index}
                className="flex flex-col items-center group cursor-pointer"
              >
                <Link
                  href={link.path}
                  className={`text-xl capitalize font-medium transition-all ${
                    isActive ? "text-accent" : "hover:text-accent"
                  }`}
                >
                  {link.name}
                </Link>
                {/* Dot indicator */}
                <span
                  className={`w-1.5 h-1.5 mt-1 rounded-full transition-all duration-200
                    ${isActive ? "bg-accent" : "bg-accent/0 group-hover:bg-accent"}`}
                />
              </div>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
