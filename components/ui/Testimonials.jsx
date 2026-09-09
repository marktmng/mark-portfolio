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
          className={`${i < rating ? "text-[#B5892D]" : "text-white/20"} w-4 h-4`}
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
      className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl flex flex-col justify-between group cursor-pointer relative overflow-hidden hover:bg-white/[0.07] transition-colors duration-500 w-full h-full"
      onClick={() => onOpenModal(testimonial)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onOpenModal(testimonial);
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="flex flex-col gap-5 relative z-10">
        <div className="flex items-start justify-between">
            {!imageError && image ? (
            <img
                src={image}
                alt={`${firstName} ${lastName}`}
                className="w-14 h-14 rounded-full object-cover shadow-md border border-white/10"
                onError={handleImageError}
            />
            ) : (
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white/90 text-lg font-semibold border border-white/10">
                {getInitials()}
            </div>
            )}
            <FaQuoteLeft className="text-3xl text-white/10" />
        </div>
        
        <p className="text-white/70 text-sm leading-relaxed flex-grow">
          "{displayText}"
          {shouldShowReadMore && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal(testimonial);
              }}
              className="ml-2 text-[#B5892D] hover:text-white font-medium focus:outline-none transition-colors"
            >
              Read More
            </button>
          )}
        </p>

        <div className="flex flex-col gap-2 mt-2 pt-4 border-t border-white/10">
            <StarRating rating={rating} />
            <div>
                <h3 className="text-base font-medium text-white/90">
                {firstName} {lastName}
                </h3>
                <p className="text-[#B5892D] text-xs font-semibold uppercase tracking-wider mt-1">{subtitle}</p>
            </div>
        </div>
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
      className="fixed inset-0 bg-[#111110]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        className="bg-[#111110] border border-white/10 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 sm:p-12 relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/50 hover:text-white text-3xl font-light focus:outline-none transition-colors"
          aria-label="Close modal"
        >
          &times;
        </button>

        <div className="flex flex-col items-center gap-6 mt-4">
          {!image ? (
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-white/90 text-2xl font-bold border border-white/10">
              {firstName.charAt(0)}
              {lastName.charAt(0)}
            </div>
          ) : (
            <img
              src={image}
              alt={`${firstName} ${lastName}`}
              className="w-20 h-20 rounded-full object-cover shadow-md border border-white/10"
            />
          )}
          
          <div className="text-center">
            <h3
                id="modal-title"
                className="text-2xl font-semibold text-white/90"
            >
                {firstName} {lastName}
            </h3>
            <p className="text-[#B5892D] text-sm font-semibold uppercase tracking-wider mt-2">{subtitle}</p>
          </div>

          <StarRating rating={rating} />
          
          <div className="w-12 h-px bg-white/10 my-2" />

          <FaQuoteLeft className="text-4xl text-white/5" />
          <p
            id="modal-description"
            className="text-white/70 text-base sm:text-lg text-center leading-relaxed"
          >
            "{description}"
          </p>
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
      <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-white/90 tracking-tight">
            Professional <span className="font-semibold text-white">Endorsements</span>
          </h2>
          <div className="w-12 h-1 bg-[#B5892D] mt-6 rounded-full" />
          <p className="text-white/50 mt-6 text-sm uppercase tracking-widest font-semibold">
            What people are saying about working with me
          </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto p-0 sm:p-4 items-stretch">
        {testimonials && testimonials.length > 0 ? (
          testimonials.map((testimonial, idx) => (
            <TestimonialCard
              key={idx}
              testimonial={testimonial}
              onOpenModal={openModal}
            />
          ))
        ) : (
          <p className="text-center text-white/50 col-span-full">
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
