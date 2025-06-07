"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useState } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

// StarRating component to display stars based on rating
const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={`${i < rating ? "text-white" : "text-gray-300"} w-4 h-4`}
        />
      ))}
    </div>
  );
};

// Individual testimonial card component
const TestimonialCard = ({ testimonial, onOpenModal }) => {
  const { firstName, lastName, description, rating, subtitle, image } =
    testimonial;

  const maxLength = 180;
  const shouldShowReadMore = description.length > maxLength;
  const displayText = shouldShowReadMore
    ? `${description.slice(0, maxLength)}...`
    : description;

  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const getInitials = () => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  return (
    <div
      className="bg-[#fac70f] rounded-xl shadow-lg p-6 cursor-pointer transition-transform duration-300 hover:scale-[1.05] hover:shadow-2xl w-full h-full"
      onClick={() => onOpenModal(testimonial)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onOpenModal(testimonial);
      }}
    >
      <div className="flex flex-col items-center gap-3">
        {!imageError && image ? (
          <img
            src={image}
            alt={`${firstName} ${lastName}`}
            className="w-16 h-16 rounded-full object-cover shadow-md"
            onError={handleImageError}
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-[#262525] flex items-center justify-center text-white text-xl font-bold">
            {getInitials()}
          </div>
        )}
        <FaQuoteLeft className="text-3xl text-[#262525]" />
        <p className="text-[#262525] text-sm text-center leading-relaxed mb-4">
          {displayText}
          {shouldShowReadMore && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal(testimonial);
              }}
              className="ml-2 text-[#262525]/50 hover:text-[#262525] font-semibold focus:outline-none"
            >
              Read More
            </button>
          )}
        </p>
        <StarRating rating={rating} />
        <h3 className="text-lg font-bold mt-2 text-[#262525]">
          {firstName} {lastName}
        </h3>
        <p className="text-white font-medium mt-1 text-sm">{subtitle}</p>
      </div>
    </div>
  );
};

// Modal component
const Modal = ({ isOpen, onClose, testimonial }) => {
  if (!isOpen || !testimonial) return null;

  const { firstName, lastName, description, rating, subtitle, image } =
    testimonial;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        className="bg-[#fac70f] rounded-xl max-w-3xl max-h-[90vh] overflow-auto p-8 relative shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#262525] hover:text-[#000] text-2xl font-bold focus:outline-none"
          aria-label="Close modal"
        >
          &times;
        </button>

        <div className="flex flex-col items-center gap-5">
          {!image ? (
            <div className="w-24 h-24 rounded-full bg-[#262525] flex items-center justify-center text-white text-4xl font-bold">
              {firstName.charAt(0)}
              {lastName.charAt(0)}
            </div>
          ) : (
            <img
              src={image}
              alt={`${firstName} ${lastName}`}
              className="w-24 h-24 rounded-full object-cover shadow-md"
            />
          )}
          <FaQuoteLeft className="text-5xl text-[#262525]" />
          <p
            id="modal-description"
            className="text-[#262525] text-base text-justify leading-relaxed max-w-[600px]"
          >
            {description}
          </p>
          <StarRating rating={rating} />
          <h3
            id="modal-title"
            className="text-2xl font-bold mt-2 text-[#262525]"
          >
            {firstName} {lastName}
          </h3>
          <p className="text-white font-semibold text-lg mt-1">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

// Main component
const TestimonialCarousel = () => {
  const testimonials = useQuery(api.feedback.getFeedback);
  const [modalTestimonial, setModalTestimonial] = useState(null);

  const openModal = (testimonial) => setModalTestimonial(testimonial);
  const closeModal = () => setModalTestimonial(null);

  return (
    <>
      <h2 className="text-3xl font-bold text-center text-white mb-8">
        What People Say!
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto p-8 items-stretch">
        {testimonials && testimonials.length > 0 ? (
          testimonials.map((testimonial, idx) => (
            <TestimonialCard
              key={idx}
              testimonial={testimonial}
              onOpenModal={openModal}
            />
          ))
        ) : (
          <p className="text-center text-white col-span-full">
            No feedbacks available.
          </p>
        )}
      </div>

      <Modal
        isOpen={!!modalTestimonial}
        onClose={closeModal}
        testimonial={modalTestimonial}
      />
    </>
  );
};

export default TestimonialCarousel;
