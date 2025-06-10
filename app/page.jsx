"use client"; // Important for using useState

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { FiDownload } from "react-icons/fi";
import { Element } from "react-scroll";
import { ConvexClientProvider } from "./ConvexClientProvider";
import "./globals.css";

import FeedbackForm from "@/components/ui/FeedbackForm";
import Photo from "@/components/ui/Photo";
import Social from "@/components/ui/Social";
import Testimonials from "@/components/ui/Testimonials";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
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
      { threshold: 0.1 }
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
                Feel free to connect with me via the Contact/Hire section in the
                navigation bar or send me an email directly."
              </p>
              {/* Download CV & Social */}
              <div className="flex flex-col xl:flex-row items-center xl:items-start gap-8">
                <Button
                  size="lg"
                  className="uppercase bg-accent/30 text-white hover:bg-accent/10 hover:text-accent"
                >
                  <a
                    href="/CV.pdf"
                    className="flex items-center gap-2"
                    download
                  >
                    <span>Download CV</span>
                    <FiDownload />
                  </a>
                </Button>
                <div className="mb-8 xl:mb-0">
                  <Social
                    containerStyles="flex gap-6"
                    iconStyles="w-9 h-9 border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
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
          {/* <div className="container mx-auto h-[20vh]">
            <Stats />
          </div> */}
          {/* Feedback Section */}
          <Element name="feedback-section">
            <div className="bg-[#fac70f] flex justify-center py-8">
              <div
                className="container flex flex-col xl:flex-col items-center xl:items-start gap-8 fade-in"
                ref={(el) => (fadeInElements.current[2] = el)}
              >
                <p className="text-justify text-[#151515]">
                  If I ever had the opportunity to work with you on a project or
                  as part of your company, I would greatly appreciate your
                  feedback. Please click the{" "}
                  <Button
                    onClick={() => setIsOpen(true)}
                    className="uppercase bg-[#171717] text-[#fac70f] hover:bg-[#171717]/15 hover:text-[#171717] active:bg-accent/10 active:text-accent rounded-[0px]"
                  >
                    feedback
                  </Button>{" "}
                  button to share your thoughts on my performance. Your insights
                  will be invaluable in helping me grow and improve.
                </p>
              </div>
            </div>
          </Element>
          <br />
          <div>
            <Element name="testimonials-section ">
              <Testimonials className="mb-10" />
            </Element>
          </div>
          <div>
            <br />
            {/* <div
              className="sticky-footer h-10 bg-[#24292f]/40 text-center py-2 text-sm hover:text-accent hover:cursor-pointer"
              onClick={() => window.location.reload()}
            >
              <Link href="/">© Mark's Portfolio</Link>
            </div> */}
          </div>
        </div>
        {/* Feedback Modal */}
        {isOpen && (
          <FeedbackForm setIsOpen={setIsOpen} className="feedback-form" />
        )}
      </section>
    </ConvexClientProvider>
  );
};

export default Home;
