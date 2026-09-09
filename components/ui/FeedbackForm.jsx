"use client"; // Ensure this is a client component

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const FeedbackForm = ({ setIsOpen, className }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState(null);
  const [subtitle, setSubtitle] = useState("");
  const [hover, setHover] = useState(null); // For rating hover effect

  // Create feedback mutation
  const createFeedback = useMutation(api.feedback.createFeedback);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setIsOpen]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Ensure file is an image and below 2MB
      if (!file.type.startsWith("image/") || file.size > 2 * 1024 * 1024) {
        alert("Please upload a valid image file (Max size: 2MB)");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!firstName || !lastName || !description || rating === 0) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      await createFeedback({
        firstName,
        lastName,
        description,
        rating,
        imageUrl: image || "",
        subtitle,
      });

      // Reset form
      setFirstName("");
      setLastName("");
      setDescription("");
      setRating(0);
      setImage(null);
      setSubtitle("");
      setIsOpen(false);
    } catch (error) {
      console.error("Error creating feedback:", error);
      alert(
        "An error occurred while submitting your feedback. Please try again."
      );
    }
  };

  return (
    <div
      className={`fixed inset-0 min-w-screen min-h-screen bg-black/80 backdrop-blur-sm flex justify-center items-center overflow-y-auto py-10 z-[100] ${className}`}
    >
      <div className="bg-[#0a0a0a]/90 border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl w-[95%] md:w-[450px] relative overflow-hidden flex flex-col gap-5 backdrop-blur-xl">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 bg-white/5 hover:bg-[#B5892D]/20 text-white/50 hover:text-[#B5892D] rounded-full w-8 h-8 flex items-center justify-center transition-colors border border-white/10"
          aria-label="Close feedback form"
        >
          ✕
        </button>
        
        <div className="flex flex-col gap-2 mb-2">
          <h2 className="text-3xl font-light text-white tracking-tight">Leave <span className="text-[#B5892D]">Feedback</span></h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Your feedback is incredibly valuable to me. Kindly share your thoughts below.
          </p>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            className="bg-transparent border border-white/20 text-white placeholder:text-white/40 focus:border-[#B5892D]/70 focus:ring-1 focus:ring-[#B5892D]/70 transition-all rounded-xl p-3 w-full outline-none"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            className="bg-transparent border border-white/20 text-white placeholder:text-white/40 focus:border-[#B5892D]/70 focus:ring-1 focus:ring-[#B5892D]/70 transition-all rounded-xl p-3 w-full outline-none"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <input
          type="text"
          className="bg-transparent border border-white/20 text-white placeholder:text-white/40 focus:border-[#B5892D]/70 focus:ring-1 focus:ring-[#B5892D]/70 transition-all rounded-xl p-3 w-full outline-none"
          placeholder="Position / Role"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          required
        />

        {/* Image Upload */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="file-upload"
            className="w-full cursor-pointer flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white/80 rounded-xl px-4 py-3 hover:bg-white/10 hover:text-white transition-colors select-none text-sm font-medium"
          >
            Upload Profile Picture
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="hidden"
          />
        </div>

        {/* Display Image Preview */}
        {image && (
          <div className="w-20 h-20 rounded-full border border-[#B5892D]/50 mx-auto overflow-hidden my-2 shadow-lg">
            <img
              src={image}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <textarea
          className="bg-transparent border border-white/20 text-white placeholder:text-white/40 focus:border-[#B5892D]/70 focus:ring-1 focus:ring-[#B5892D]/70 transition-all rounded-xl p-3 w-full outline-none resize-none h-[100px]"
          placeholder="Your thoughts..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* Rating Section with Hover Effect */}
        <div className="flex justify-center gap-2 my-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <label
              key={star}
              className="cursor-pointer"
              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
            >
              <input
                type="radio"
                name="rating"
                value={star}
                checked={rating === star}
                onChange={() => setRating(star)}
                className="hidden"
              />
              <FaStar
                size={28}
                className={`${
                  (hover || rating) >= star ? "text-[#B5892D] drop-shadow-[0_0_8px_rgba(181,137,45,0.8)]" : "text-white/20"
                } transition-all duration-300 hover:scale-110`}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-2 bg-[#B5892D] text-white rounded-full px-8 py-3 text-base font-semibold tracking-wide hover:bg-[#B5892D]/80 transition-all duration-300 shadow-[0_0_15px_rgba(181,137,45,0.3)] hover:shadow-[0_0_25px_rgba(181,137,45,0.5)]"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default FeedbackForm;
