"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useCallback, useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
  FaStar,
} from "react-icons/fa";

// Renders a star rating display
const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className={`${
            index < rating ? "text-white" : "text-gray-300"
          } w-5 h-5`}
        />
      ))}
    </div>
  );
};

const TestimonialCard = ({
  testimonial,
  onPauseAutoPlay,
  onResumeAutoPlay,
}) => {
  const { firstName, lastName, description, rating, subtitle, image } =
    testimonial;
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const maxLength = 180;
  const shouldShowReadMore = description.length > maxLength;
  const displayText =
    shouldShowReadMore && !isExpanded
      ? `${description.slice(0, maxLength)}...`
      : description;

  const handleImageError = () => {
    setImageError(true);
  };

  const getInitials = () => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  const handleReadMoreClick = () => {
    if (isExpanded) {
      onResumeAutoPlay(); // Resume auto-slide when "Read Less" is clicked
    } else {
      onPauseAutoPlay(); // Pause auto-slide when "Read More" is clicked
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#fac70f] rounded-2xl shadow-xl p-10 transition-all duration-300 hover:shadow-2xl hover:scale-105">
      <div className="flex flex-col items-center gap-4">
        {!imageError && image ? (
          <img
            src={image}
            alt={`${firstName} ${lastName}`}
            className="w-30 h-20 rounded-full object-cover shadow-md"
            onError={handleImageError}
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-[#262525] flex items-center justify-center text-white text-2xl font-bold">
            {getInitials()}
          </div>
        )}
        <FaQuoteLeft className="text-4xl text-[#262525] mb-4" />
        <div className="flex-1 text-center">
          <p className="text-[#262525] text-[12px] leading-relaxed mb-5">
            {displayText}
            {shouldShowReadMore && (
              <button
                onClick={handleReadMoreClick}
                className="ml-3 text-[#262525]/30 hover:text-[#262525] font-medium focus:outline-none"
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            )}
          </p>
          <div className="w-10 h-1 bg-[#262525] mx-auto mb-6"></div>
          <StarRating className="" rating={rating} />
          <h3 className="text-xl font-bold mt-2 text-[#262525]">
            {firstName} {lastName}
          </h3>
          <p className="text-white font-medium mt-1 text-[14px]">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialCarousel = () => {
  const testimonials = useQuery(api.feedback.getFeedback);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    if (testimonials && testimonials.length > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }
  }, [testimonials]);

  const prevSlide = () => {
    if (testimonials && testimonials.length > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      );
    }
  };

  const handlePauseAutoPlay = () => {
    setIsAutoPlaying(false);
  };

  const handleResumeAutoPlay = () => {
    setIsAutoPlaying(true);
  };

  useEffect(() => {
    let intervalId;
    if (isAutoPlaying && testimonials && testimonials.length > 0) {
      intervalId = setInterval(nextSlide, 10000); // Change slide every 10 seconds
    }
    return () => clearInterval(intervalId);
  }, [isAutoPlaying, testimonials, nextSlide]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      nextSlide();
      // handleResumeAutoPlay(); // Resume auto-slide
    } else if (e.key === "ArrowLeft") {
      prevSlide();
      // handleResumeAutoPlay(); // Resume auto-slide
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <div className="relative">
      {testimonials && testimonials.length > 0 ? (
        <>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => {
                prevSlide();
                handleResumeAutoPlay(); // Resume auto-slide
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#fac70f] p-4 rounded-full shadow-lg hover:bg-[#171717]/10 focus:outline-none focus:ring-2 focus:ring-[#171717] transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft className="w-6 h-6 text-[#262525] hover:text-[#fac70f]" />
            </button>
            <TestimonialCard
              testimonial={testimonials[currentIndex]}
              onPauseAutoPlay={handlePauseAutoPlay}
              onResumeAutoPlay={handleResumeAutoPlay}
            />
            <button
              onClick={() => {
                nextSlide();
                handleResumeAutoPlay(); // Resume auto-slide
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#fac70f] p-4 rounded-full shadow-lg hover:bg-[#171717]/10 focus:outline-none focus:ring-2 focus:ring-[#171717] transition-all duration-300"
              aria-label="Next testimonial"
            >
              <FaChevronRight className="w-6 h-6 text-[#262525] hover:text-[#fac70f]" />
            </button>
          </div>
          <br />
          {/* Testimonial Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  handleResumeAutoPlay(); // Resume auto-slide
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-[#fac70f] w-8"
                    : "bg-[#f5da78] w-2 hover:bg-[#fac70f]/30 hover:w-4"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-white text-center p-6">
          No feedbacks available.
        </div>
      )}
    </div>
  );
};

export default TestimonialCarousel;
