import Link from "next/link";
const Header = () => {
  return (
    <header className="py-8 xl:py-12 text-white by-pint-50/50">
      <div className="container mx-auto">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-4xl font-semibold">
            Mark<span className="text-accent">.</span>
          </h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;

// watched video 15:32
