"use client"; // Important for using useState

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { FiDownload } from "react-icons/fi";
import { Element } from "react-scroll";
import { ConvexClientProvider } from "./ConvexClientProvider";
import "./globals.css";

import Photo from "@/components/ui/Photo";
import Social from "@/components/ui/Social";
import Testimonials from "@/components/ui/Testimonials";

const Home = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const fadeInElements = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            entry.target.classList.remove("fade-out");
          } else {
            entry.target.classList.add("fade-out");
            entry.target.classList.remove("fade-in");
          }
        });
      },
      { threshold: 0.1 },
    );

    fadeInElements.current.forEach((el) => {
      if (el) {
        observer.observe(el);
      }
    });

    // Ensure elements are visible on page load
    fadeInElements.current.forEach((el) => {
      if (el) {
        el.classList.add("fade-in");
      }
    });

    return () => {
      fadeInElements.current.forEach((el) => {
        if (el) {
          observer.unobserve(el);
        }
      });
    };
  }, []);

  return (
    <ConvexClientProvider>
      <section className="h-full">
        <div className="container mx-auto">
          {/* Main content */}
          <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
            <div className="text-center xl:text-left xl:mr-12 order-2 xl:order-1">
              <span className="text-xl">Software Developer</span>
              <br />
              <h1
                className="h1 mb-6"
                ref={(el) => (fadeInElements.current[0] = el)}
              >
                Hello I'm <span className="text-accent">Mark Tamang</span>
              </h1>
              <p
                className="max-w-[550px] text-justify mb-10 text-white/80"
                ref={(el) => (fadeInElements.current[1] = el)}
              >
                "I am a Software Developer with hands-on experience in frontend
                and backend development, cloud platforms, and CI/CD workflows.
                With a background in Graphic Design, I bring a unique blend of
                creativity and technical expertise to every project. I’m
                passionate about building impactful, user-centric solutions and
                continuously expanding my skill set by exploring new and
                emerging technologies.
                <br />
                <br />
                Feel free to connect with me via the{" "}
                <Link
                  href="/contact"
                  className="text-accent hover:text-accent/50"
                >
                  Contact
                </Link>{" "}
                section in the navigation bar or send me an email directly."
              </p>
              {/* Download CV & Social */}
              <div className="flex flex-col xl:flex-row items-center xl:items-start gap-8">
                <Button
                  size="lg"
                  className="uppercase bg-accent/30 text-white hover:bg-accent/10 hover:text-accent"
                >
                  <a
                    href="/MARK_TAMANG_CV.pdf"
                    className="flex items-center gap-2"
                    download
                  >
                    <span>Download CV</span>
                    <FiDownload />
                  </a>
                </Button>
                <div className="mb-8 xl:mb-0">
                  <Social
                    containerStyles="flex gap-8"
                    iconStyles="w-8 h-8 border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                  />
                </div>
              </div>
            </div>
            {/* Image Section */}
            <div className="order-1 xl:order-2 mb-8 xl:mb-0">
              <Photo />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-10 mx-auto">
          <br />
          <div>
            <Element name="testimonials-section ">
              <Testimonials className="mb-10" />
            </Element>
          </div>
          <div>
            <br />
          </div>
        </div>
      </section>
    </ConvexClientProvider>
  );
};

export default Home;
