"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// routes
const links = [
  { name: "home", path: "/" },
  { name: "about", path: "/about" },
  { name: "highlights", path: "/highlights" },
  { name: "work", path: "/work" },
  { name: "contact", path: "/contact" },
];

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-8">
      {links.map((link, index) => {
        const isActive = link.path === pathname;

        return (
          <div
            key={index}
            className="flex flex-col items-center group cursor-pointer"
          >
            <Link
              href={link.path}
              className={`capitalize font-medium transition-all ${
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
  );
};

export default Nav;
