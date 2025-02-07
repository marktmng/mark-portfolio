"use client";

import { useCallback, useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
  FaStar,
} from "react-icons/fa";

// Testimonial data
const testimonials = [
  {
    firstName: "Sarah",
    lastName: "Johnson",
    description:
      "The product exceeded my expectations! The attention to detail and quality of service was outstanding. I would highly recommend this to anyone looking for a reliable solution.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    subtitle: "Marketing Director, Tech Corp",
  },
  {
    firstName: "Michael",
    lastName: "Chen",
    description:
      "Incredible experience from start to finish. The team was responsive, professional, and delivered exactly what we needed. This has transformed our workflow completely.",
    rating: 4,
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    subtitle: "Senior Developer, Innovation Labs",
  },
  {
    firstName: "Emma",
    lastName: "Williams",
    description:
      "Best decision we've made for our business this year. The implementation was smooth, and the results have been remarkable. The support team is always there when needed. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    subtitle: "CEO, StartUp Vision",
  },
];

// Renders a star rating display
const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className={`${
            index < rating ? "text-yellow-400" : "text-gray-300"
          } w-5 h-5`}
        />
      ))}
    </div>
  );
};

/**
 * Renders an individual testimonial card with expandable text
 * @param {Object} props - Component props
 * @param {Object} props.testimonial - Testimonial data object
 * @returns {JSX.Element} Testimonial card
 */
const TestimonialCard = ({ testimonial }) => {
  const { firstName, lastName, description, rating, subtitle, avatarUrl } =
    testimonial;
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const maxLength = 150;
  const shouldShowReadMore = description.length > maxLength;
  const displayText =
    shouldShowReadMore && !isExpanded
      ? `${description.slice(0, maxLength)}...`
      : description;

  const handleImageError = () => {
    setImageError(true);
  };

  // Added: Function to get initials from first and last name
  const getInitials = () => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-[#02a312]/45 rounded-2xl shadow-xl p-10 transition-all duration-300 hover:shadow-2xl hover:scale-105">
      <div className="flex flex-col items-center gap-6">
        {!imageError && avatarUrl ? (
          <img
            src={avatarUrl}
            alt={`${firstName} ${lastName}`}
            className="w-20 h-20 rounded-full object-cover border-2 border-[#02a312]"
            onError={handleImageError}
          />
        ) : (
          // Updated: Display both first and last name initials
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-white text-2xl font-bold">
            {getInitials()}
          </div>
        )}
        <FaQuoteLeft className="text-4xl text-accent mb-4" />
        <div className="flex-1 text-center">
          <p className="text-white text-lg leading-relaxed mb-6">
            {displayText}
            {shouldShowReadMore && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="ml-2 text-[#02a312] hover:text-accent font-medium focus:outline-none"
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            )}
          </p>
          <div className="w-16 h-1 bg-[#02a312] mx-auto mb-6"></div>
          <StarRating rating={rating} />
          <h3 className="text-2xl font-bold mt-4 text-white/70">
            {firstName} {lastName}
          </h3>
          <p className="text-accent font-medium mt-2">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

/**
 * Main carousel component for displaying testimonials
 * @returns {JSX.Element} Testimonial carousel
 */
const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  /**
   * Advances to the next slide in the carousel
   * Wraps around to the beginning when reaching the end
   */
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  /**
   * Moves to the previous slide in the carousel
   * Wraps around to the end when reaching the beginning
   */
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  /**
   * Sets up auto-play functionality with cleanup
   * Interval runs every 5 seconds when auto-play is enabled
   */
  useEffect(() => {
    let intervalId;
    if (isAutoPlaying) {
      intervalId = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(intervalId);
  }, [isAutoPlaying, nextSlide]);

  //Handles keyboard navigation for accessibility
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  };

  return (
    <div
      className="relative w-full bg-background"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onKeyDown={handleKeyDown}
      tabIndex="0"
      role="region"
      aria-label="Testimonial carousel"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 px-4"
                aria-hidden={currentIndex !== index}
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-accent p-4 rounded-full shadow-lg hover:bg-[#02a312]/10 focus:outline-none focus:ring-2 focus:ring-[#02a312] transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="w-6 h-6 text-[#02a312]" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-accent p-4 rounded-full shadow-lg hover:bg-[#02a312]/10 focus:outline-none focus:ring-2 focus:ring-[#02a312] transition-all duration-300"
            aria-label="Next testimonial"
          >
            <FaChevronRight className="w-6 h-6 text-[#02a312]" />
          </button>
        </div>

        <div className="flex justify-center mt-8 gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "bg-[#02a312] w-8"
                  : "bg-[#02a312] w-2 hover:bg-accent"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;

// made chages in feedback buttons
