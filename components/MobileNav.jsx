"use client";

// import Link from "next/link";
import { usePathname } from "next/navigation";
import { CiMenuFries } from "react-icons/ci"; // command to install react-ic : npm install react-icons
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const links = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "services",
    path: "/services",
  },
  {
    name: "resume",
    path: "/resume",
  },
  {
    name: "work",
    path: "/work",
  },
  {
    name: "contact",
    path: "/contact",
  },
];

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger className="flex justify-center items-center">
        <CiMenuFries className="text-[32pxl] text-accent " />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        {/* Logo */}
        <div>logo</div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;

// video watched 45:08
