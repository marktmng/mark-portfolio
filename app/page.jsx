"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { Element } from "react-scroll";
import { ConvexClientProvider } from "./ConvexClientProvider";
import "./globals.css";

import Photo from "@/components/ui/Photo";
import Social from "@/components/ui/Social";
import Testimonials from "@/components/ui/Testimonials";

const Home = () => {
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
      <section className="h-full bg-gradient-to-br from-background via-background/95 to-background/90">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 xl:py-12">
          <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24 gap-10 xl:gap-16">
            {/* Left Content */}
            <div className="text-center xl:text-left xl:mr-8 order-2 xl:order-1 flex-1">
              <span className="inline-block text-lg font-light tracking-wider text-accent/80 mb-2 bg-accent/10 px-4 py-1 rounded-full">
                Full-Stack Software Developer &amp; Founder
              </span>

              <h1
                className="h1 mb-6 leading-tight"
                ref={(el) => (fadeInElements.current[0] = el)}
              >
                Hello I'm <br />
                <span className="text-accent font-bold bg-gradient-to-r from-accent to-accent/60 bg-clip-text text-transparent">
                  Mark Tamang
                </span>
              </h1>

              {/* REWRITTEN SUMMARY - NATURAL, PROFESSIONAL, CONCISE */}
              <div
                className="max-w-2xl text-justify mb-8 text-white/85 space-y-4 text-base sm:text-lg leading-relaxed"
                ref={(el) => (fadeInElements.current[1] = el)}
              >
                <p className="font-medium text-white/90">
                  Full-Stack Developer with expertise in ASP.NET Core, React,
                  Next.js, PostgreSQL, and cloud platforms. Proven track record
                  of delivering scalable, high-performance web applications.
                </p>

                <div className="bg-white/5 rounded-xl p-5 border border-white/10 backdrop-blur-sm">
                  <p className="text-sm sm:text-base leading-relaxed">
                    <span className="text-accent font-semibold">
                      Architected REST APIs
                    </span>{" "}
                    and authentication systems serving 1,000+ users with 99.9%
                    uptime.
                    <span className="text-accent font-semibold">
                      {" "}
                      Optimized database queries
                    </span>
                    reducing response times by 40% through strategic indexing
                    and query refinement.{" "}
                    <span className="text-accent font-semibold">
                      Implemented CI/CD pipelines
                    </span>
                    that cut deployment time from 2 hours to under 10 minutes.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 bg-gradient-to-r from-accent/5 to-transparent p-4 rounded-lg border-l-4 border-accent">
                  <span className="font-semibold text-white">Founder of</span>
                  <Link
                    href="https://pakhreen.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent hover:text-accent/70 transition-all duration-300 font-bold text-lg group"
                  >
                    PAKHREEN
                    <FaExternalLinkAlt className="text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                  <span className="text-white/70 text-sm">
                    — building innovative tech solutions for modern businesses
                  </span>
                </div>

                <p className="text-sm text-white/60 italic pt-2">
                  Passionate about clean code, user experience, and continuous
                  learning. Open to collaborations — reach out via{" "}
                  <Link
                    href="/contact"
                    className="text-accent hover:text-accent/70 transition-colors font-medium underline underline-offset-2"
                  >
                    Contact
                  </Link>
                  .
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mt-6">
                <Button
                  size="lg"
                  className="group relative overflow-hidden uppercase bg-accent/20 text-white hover:bg-accent/30 hover:text-accent border-2 border-accent/30 hover:border-accent transition-all duration-300 px-8 py-6 text-base rounded-full shadow-lg shadow-accent/10 hover:shadow-accent/20"
                >
                  <a
                    href="https://pub-eab1a46333574948b55182f6d86cdd87.r2.dev/my-portfolio-web-resume/Mark_Tamang_cv.pdf"
                    className="flex items-center gap-3 relative z-10"
                    download
                  >
                    <span>Download CV</span>
                    <FiDownload className="group-hover:translate-y-1 group-hover:-translate-x-1 transition-all duration-300" />
                  </a>
                  <span className="absolute inset-0 bg-accent/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                </Button>

                <div className="mb-4 sm:mb-0">
                  <Social
                    containerStyles="flex gap-6"
                    iconStyles="w-11 h-11 border-2 border-accent/30 rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:border-accent hover:scale-110 hover:shadow-lg hover:shadow-accent/20 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Right Photo */}
            <div className="order-1 xl:order-2 mb-8 xl:mb-0 flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full -z-10 animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent rounded-full -z-5" />
                <Photo />
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-16 sm:mt-24">
          <Element name="testimonials-section">
            <Testimonials className="mb-16" />
          </Element>
        </div>
      </section>
    </ConvexClientProvider>
  );
};

export default Home;
