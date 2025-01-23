import { Button } from "@/components/ui/button";
import Social from "@/components/ui/Social";
import { FiDownload } from "react-icons/fi";

const Home = () => {
  return (
    <section className="h-full">
      <div className="container mx-auto">
        {/* Flex container to handle layout for desktop and mobile */}
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          {/* Text content */}
          <div className="text-center xl:text-left xl:mr-12">
            {/* Added xl:text-left for left alignment on desktop */}
            <span className="text-xl">Software Developer / Cloud Engineer</span>
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
                <span>Download CV</span>
                <FiDownload className="text-xl" />
              </Button>
              {/* Social links added inside a flex container */}
              <div className="mb-8 xl:mb:0">
                <Social
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border-accent rounded-full
                   flex justify-center iutems-center text-accent text-base hover:bg-accent
                    hover:text-primary hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>
          {/* Image Section */}
          <div>photo</div>
        </div>
      </div>
    </section>
  );
};

export default Home;

// video watched 1:01:46
