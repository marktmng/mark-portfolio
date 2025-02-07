import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";

import Photo from "@/components/ui/Photo";
import Social from "@/components/ui/Social";
import Stats from "@/components/ui/Stats";
import Testimonials from "@/components/ui/Testimonials";

const Home = () => {
  return (
    <section className="h-full">
      <div className="container mx-auto">
        {/* Flex container to handle layout for desktop and mobile */}
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          {/* Text content */}
          <div
            className="text-center xl:text-left xl:mr-12 order-2 xl:order-1"
            // Changed xl:order-none to xl:order-1 for desktop so the text appears first on the left
          >
            <span className="text-xl">Software Developer</span>
            <br />
            <h1 className="h1 mb-6">
              Hello I'm <span className="text-accent">Mark Tamang</span>
            </h1>
            <p className="max-w-[500px] mb-9 text-white/80">
              I excel at crafting elegant experiences and I am proficient in
              various programming languages and technologies.
            </p>
            {/* Buttons and social links */}
            <div className="flex flex-col xl:flex-row items-center xl:items-start gap-8">
              {/* Flex layout for buttons and social links */}
              <Button
                size="lg"
                className="uppercase bg-accent/30 text-white hover:bg-accent/10 hover:text-accent"
              >
                <a href="/CV.pdf" className="flex items-center gap-2" download>
                  <span>Download CV</span>
                  <FiDownload />
                </a>
              </Button>
              {/* Social links added inside a flex container */}
              <div className="mb-8 xl:mb-0">
                <Social
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border-accent rounded-full
                   flex justify-center items-center text-accent text-base hover:bg-accent
                    hover:text-primary hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>
          {/* Image Section */}
          <div
            className="order-1 xl:order-2 mb-8 xl:mb-0"
            // Changed xl:order-none to xl:order-2 for desktop so the image appears on the right
          >
            <Photo />
          </div>
        </div>
      </div>
      <Stats />
      <Testimonials />
    </section>
  );
};

export default Home;
