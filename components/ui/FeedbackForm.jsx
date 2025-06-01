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
      className={`fixed top-0 w-full min-w-screen min-h-screen bg-black bg-opacity-70 flex justify-center items-center overflow-y-auto py-10 z-50 ${className}`}
    >
      <div className="bg-[#fac70f] p-6 pt-10 rounded-lg shadow-lg w-[95%] md:w-[400px] relative overflow-auto">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 bg-[#171717]/50 hover:bg-[#171717] text-[#fac70f] hover:text-white rounded-[5px] p-1"
          aria-label="Close feedback form"
        >
          [x]
        </button>
        <h2 className="text-xl font-semibold mb-4 text-[#171717]">Feedback</h2>
        <p className="text-[#171717] mb-4">
          Your feedback is valuable to me. Kindly fill out the form below:
        </p>

        <input
          type="text"
          className="bg-[#171717] text-white w-full p-2 mb-2 rounded-lg border-none focus:outline-none"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          className="bg-[#171717] text-white w-full p-2 mb-2 rounded-lg border-none focus:outline-none"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          className="bg-[#171717] text-white w-full p-2 mb-2 rounded-lg border-none focus:outline-none"
          placeholder="Position"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          required
        />

        {/* Image Upload */}
        <div className="mb-2">
          <label
            htmlFor="file-upload"
            className="w-full cursor-pointer inline-block bg-[#171717] text-white rounded-lg px-4 py-2 hover:bg-[#171717]/70 select-none"
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
          <img
            src={image}
            alt="Preview"
            className="w-full max-h-40 object-cover p-2 mb-2 rounded border-none"
          />
        )}

        <textarea
          className="bg-[#171717] text-white w-full p-2 mb-2 rounded-lg border-none focus:outline-none"
          rows="3"
          placeholder="Your feedback..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* Rating Section with Hover Effect */}
        <div className="flex mb-4">
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
                size={24}
                className={`${
                  (hover || rating) >= star ? "text-white-400" : "text-gray-400"
                } transition duration-200`}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-[#171717] text-white px-4 py-2 rounded hover:bg-[#171717]/50"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FeedbackForm;
