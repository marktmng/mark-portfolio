"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

  return (
    <Sheet>
      {/* Menu Trigger */}
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32px] text-accent" />
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
        <div className="mt-32 mb-40 text-center text-2xl">
          <Link href="/">
            <h1 className="text-4xl font-semibold">
              Mark<span className="text-accent">.</span>
            </h1>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col justify-center items-center gap-8">
          {links.map((link, index) => (
            <Link
              href={link.path}
              key={index}
              className={`${
                link.path === pathname
                  ? "text-accent border-b-2 border-accent"
                  : ""
              } text-xl capitalize hover:text-accent transition-all`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
