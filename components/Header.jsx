import Link from "next/link";
import Nav from "./Nav";
import { Button } from "./ui/button";
import MobileNav from "./MobileNav";
const Header = () => {
  return (
    <header className="py-8 xl:py-12 text-white by-pint-50/50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-4xl font-semibold">
            Mark<span className="text-accent">.</span>
          </h1>
        </Link>
        {/* desktop nad & hire me button*/}
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
          <Link href="/contact">
            <Button className="bg-accent/30 text-white hover:bg-accent/10">
              Hire me
            </Button>
          </Link>
        </div>
        {/* mobile nav & */}
        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
