"use client"; // Important for using useState

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { FiDownload } from "react-icons/fi";
import "./globals.css";

import FeedbackForm from "@/components/ui/FeedbackForm";
import Photo from "@/components/ui/Photo";
import Social from "@/components/ui/Social";
import Stats from "@/components/ui/Stats";
import Testimonials from "@/components/ui/Testimonials";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="h-full">
      <div className="container mx-auto">
        {/* Main content */}
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          <div className="text-center xl:text-left xl:mr-12 order-2 xl:order-1">
            <span className="text-xl">Software Developer</span>
            <br />
            <h1 className="h1 mb-6">
              Hello I'm <span className="text-accent">Mark Tamang</span>
            </h1>
            <p className="max-w-[550px] mb-10 text-white/80">
              "As a proficient software developer, I specialize in a diverse
              range of advanced programming languages and emerging technologies.
              This portfolio, meticulously developed using Next.js, serves as a
              live demonstration of my technical expertise. It reflects my
              commitment to delivering innovative, scalable solutions that align
              with the highest industry standards."
            </p>
            {/* Download CV & Social */}
            <div className="flex flex-col xl:flex-row items-center xl:items-start gap-8">
              <Button
                size="lg"
                className="uppercase bg-accent/30 text-white hover:bg-accent/10 hover:text-accent"
              >
                <a href="/CV.pdf" className="flex items-center gap-2" download>
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
        <Stats />
        {/* Feedback Section */}
        <div className="bg-[#02a312]/40 flex justify-center py-8">
          <div className="container flex flex-col xl:flex-col items-center xl:items-start gap-8">
            <p className="text-center">
              If I ever had the opportunity to work with you on a project or as
              part of your company, I would greatly appreciate your feedback.
              Please click the{" "}
              <Button
                onClick={() => setIsOpen(true)}
                className="uppercase bg-yellow-400 text-[#24292f]/70 hover:bg-accent/10 hover:text-accent focus:bg-accent/10 focus:text-accent active:bg-accent/10 active:text-accent rounded-[0px]"
              >
                feedback
              </Button>{" "}
              button to share your thoughts on my performance. Your insights
              will be invaluable in helping me grow and improve.
            </p>
          </div>
        </div>
        <Testimonials className="mb-10" />
        <div>
          <br />
          <div
            className="sticky-footer h-10 bg-[#02a312]/40 text-center py-2 text-sm hover:text-accent hover:cursor-pointer"
            onClick={() => window.location.reload()}
          >
            <Link href="/">© 2025 Mark's Portfolio</Link>
          </div>
        </div>
      </div>
      {/* Feedback Modal */}
      {isOpen && <FeedbackForm setIsOpen={setIsOpen} />}
    </section>
  );
};

export default Home;
