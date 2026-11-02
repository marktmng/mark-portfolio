"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useState, useEffect, useState as useModalState } from "react";
import { createPortal } from "react-dom";
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  playTechTransmissionDecode,
  playTechDataPacketSwipe,
  playTechFeedbackHover,
  playTechCommsClose,
} from "@/lib/techSound";

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
      className="bg-[#111110]/80 border border-white/10 rounded-3xl p-7 sm:p-8 backdrop-blur-xl flex flex-col justify-between group cursor-pointer relative overflow-hidden hover:bg-[#111110] hover:border-[#B5892D]/50 transition-all duration-300 w-full h-full shadow-lg hover:shadow-[0_0_25px_rgba(181,137,45,0.15)]"
      onClick={onOpenModal}
      onMouseEnter={() => playTechFeedbackHover()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpenModal();
        }
      }}
    >
      {/* Cyber corner target markers */}
      <span className="absolute top-3 left-3 text-[9px] font-mono text-[#B5892D]/30 group-hover:text-[#fac70f] transition-colors pointer-events-none">┌</span>
      <span className="absolute top-3 right-3 text-[9px] font-mono text-[#B5892D]/30 group-hover:text-[#fac70f] transition-colors pointer-events-none">┐</span>
      <span className="absolute bottom-3 left-3 text-[9px] font-mono text-[#B5892D]/30 group-hover:text-[#fac70f] transition-colors pointer-events-none">└</span>
      <span className="absolute bottom-3 right-3 text-[9px] font-mono text-[#B5892D]/30 group-hover:text-[#fac70f] transition-colors pointer-events-none">┘</span>

      {/* Ambient hover glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#B5892D]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="flex flex-col gap-5 relative z-10">
        <div className="flex items-start justify-between">
          {!imageError && image ? (
            <img
              src={image}
              alt={`${firstName} ${lastName}`}
              className="w-14 h-14 rounded-full object-cover shadow-md border border-white/10 group-hover:border-[#B5892D]/60 transition-colors"
              onError={handleImageError}
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white/90 text-lg font-semibold border border-white/10 group-hover:border-[#B5892D]/60 transition-colors">
              {getInitials()}
            </div>
          )}
          
          <div className="flex flex-col items-end gap-1">
            <FaQuoteLeft className="text-2xl text-white/10 group-hover:text-[#B5892D]/30 transition-colors" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-white/30 group-hover:text-[#B5892D] transition-colors">
              [VERIFIED_LOG]
            </span>
          </div>
        </div>

        <p className="text-white/70 text-sm leading-relaxed flex-grow font-inter font-light">
          "{displayText}"
          {shouldShowReadMore && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal();
              }}
              className="ml-2 text-[#fac70f] hover:text-white font-medium focus:outline-none transition-colors underline underline-offset-4 decoration-[#B5892D]/40"
            >
              Read More
            </button>
          )}
        </p>

        <div className="flex flex-col gap-2 mt-2 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <StarRating rating={rating} />
            <span className="text-[10px] font-mono text-[#B5892D] tracking-wider">
              {rating}.0 / 5.0
            </span>
          </div>
          <div>
            <h3 className="text-base font-medium text-white/90 group-hover:text-white transition-colors">
              {firstName} {lastName}
            </h3>
            <p className="text-[#B5892D] text-xs font-semibold uppercase tracking-wider mt-0.5">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal component
const Modal = ({ isOpen, onClose, testimonials, selectedIndex, onSelectTab, onNext, onPrev }) => {
  const [touchStart, setTouchStart] = useModalState(null);
  const [touchEnd, setTouchEnd] = useModalState(null);
  const [mounted, setMounted] = useModalState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard navigation for desktop
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        if (onNext) onNext();
      } else if (e.key === "ArrowLeft") {
        if (onPrev) onPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onNext, onPrev, onClose]);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe && onNext) {
      onNext();
    }
    if (isRightSwipe && onPrev) {
      onPrev();
    }
  };

  const testimonial = testimonials?.[selectedIndex];
  if (!isOpen || !testimonial || !mounted) return null;

  const { firstName, lastName, description, rating, subtitle, image } =
    testimonial;

  return createPortal(
    <div
      className="fixed inset-0 bg-[#111110]/85 backdrop-blur-md flex items-center justify-center z-[9999] p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEndHandler}
    >
      <div
        className="bg-[#111110] border border-white/10 rounded-3xl max-w-2xl w-full max-h-[90vh] relative shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Terminal Status Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 text-xs font-mono bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[#B5892D] tracking-wider uppercase font-semibold">
              TRANSMISSION_ID // {selectedIndex + 1} OF {testimonials.length}
            </span>
          </div>
          <span className="text-white/40 text-[10px] hidden sm:inline">AUTHENTICATED // 200 OK</span>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute z-50 top-3 right-4 w-8 h-8 flex items-center justify-center bg-white/5 rounded-full text-white/50 hover:text-white hover:bg-white/15 text-xl font-light focus:outline-none transition-all"
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Desktop Prev/Next Quick Navigation Chevrons */}
        <button
          onClick={onPrev}
          className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-[#fac70f] hover:border-[#B5892D]/50 hover:bg-[#B5892D]/10 transition-all z-20"
          title="Previous endorsement (Arrow Left)"
        >
          <FaChevronLeft className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onNext}
          className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-[#fac70f] hover:border-[#B5892D]/50 hover:bg-[#B5892D]/10 transition-all z-20"
          title="Next endorsement (Arrow Right)"
        >
          <FaChevronRight className="w-3.5 h-3.5" />
        </button>

        <div className="overflow-y-auto p-8 sm:p-12 w-full flex-grow">
          <div className="flex flex-col items-center gap-5 mt-2">
            {!image ? (
              <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-white/90 text-2xl font-bold border border-white/10 shadow-lg">
                {firstName.charAt(0)}
                {lastName.charAt(0)}
              </div>
            ) : (
              <img
                src={image}
                alt={`${firstName} ${lastName}`}
                className="w-20 h-20 rounded-full object-cover shadow-lg border-2 border-[#B5892D]/60"
              />
            )}

            <div className="text-center">
              <h3 id="modal-title" className="text-2xl font-semibold text-white/90">
                {firstName} {lastName}
              </h3>
              <p className="text-[#B5892D] text-xs font-mono font-semibold uppercase tracking-wider mt-1.5">
                {subtitle}
              </p>
            </div>

            <StarRating rating={rating} />

            <div className="w-12 h-px bg-white/10 my-1" />

            <FaQuoteLeft className="text-3xl text-[#B5892D]/20" />
            <p
              id="modal-description"
              className="text-white/80 text-base sm:text-lg text-center leading-relaxed font-inter font-light max-w-xl"
            >
              "{description}"
            </p>
          </div>
        </div>

        {/* Tab Bar - Visible mostly on mobile to navigate between testimonials easily */}
        <div className="flex-none border-t border-white/10 bg-[#111110] p-3 flex gap-2 overflow-x-auto hide-scrollbar z-10 justify-start sm:justify-center">
          {testimonials?.map((t, idx) => {
            const isActive = selectedIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => onSelectTab(idx)}
                className={`flex-shrink-0 flex flex-col items-center justify-center gap-1 min-w-[70px] h-16 rounded-xl border transition-all duration-300 ${
                  isActive
                    ? "border-[#B5892D] bg-[#B5892D]/15 shadow-[0_0_12px_rgba(181,137,45,0.2)]"
                    : "border-transparent bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80"
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold overflow-hidden border border-white/10">
                  {t.image ? (
                    <img src={t.image} alt={t.firstName} className="w-full h-full object-cover" />
                  ) : (
                    `${t.firstName.charAt(0)}${t.lastName.charAt(0)}`
                  )}
                </div>
                <span className={`text-[9px] uppercase tracking-wider font-bold ${isActive ? "text-[#fac70f]" : ""}`}>
                  {t.firstName}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>,
    document.body
  );
};

// Main component
const TestimonialCarousel = () => {
  const testimonials = useQuery(api.feedback.getFeedback);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openModal = (idx) => {
    playTechTransmissionDecode();
    setSelectedIndex(idx);
  };

  const closeModal = () => {
    playTechCommsClose();
    setSelectedIndex(null);
  };

  const handleNext = () => {
    if (testimonials && testimonials.length > 0) {
      playTechDataPacketSwipe();
      setSelectedIndex((prev) => (prev + 1) % testimonials.length);
    }
  };

  const handlePrev = () => {
    if (testimonials && testimonials.length > 0) {
      playTechDataPacketSwipe();
      setSelectedIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  const handleSelectTab = (idx) => {
    if (idx !== selectedIndex) {
      playTechDataPacketSwipe();
      setSelectedIndex(idx);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center mb-12">
        <h2 className="text-3xl md:text-4xl font-light text-white/90 tracking-tight">
          Professional <span className="font-semibold text-white">Endorsements</span>
        </h2>
        <div className="w-12 h-1 bg-[#B5892D] mt-6 rounded-full" />
        <p className="text-white/50 mt-6 text-sm uppercase tracking-widest font-semibold font-mono">
          // CLIENT_TELEMETRY & VERIFIED_FEEDBACK
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto p-0 sm:p-4 items-stretch">
        {testimonials && testimonials.length > 0 ? (
          testimonials.map((testimonial, idx) => (
            <TestimonialCard
              key={idx}
              testimonial={testimonial}
              onOpenModal={() => openModal(idx)}
            />
          ))
        ) : (
          <p className="text-center text-white/50 col-span-full font-mono text-sm py-8">
            &gt; AWAITING INCOMING CLIENT TRANSMISSIONS...
          </p>
        )}
      </div>

      <Modal
        isOpen={selectedIndex !== null}
        onClose={closeModal}
        testimonials={testimonials}
        selectedIndex={selectedIndex}
        onSelectTab={handleSelectTab}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  );
};

export default TestimonialCarousel;
