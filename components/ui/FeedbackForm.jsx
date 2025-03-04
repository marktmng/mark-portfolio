"use client"; // Ensure this is a client component

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const FeedbackForm = ({ setIsOpen }) => {
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
  };

  return (
    <div className="fixed top-0 w-full min-w-screen min-h-screen bg-black bg-opacity-70 flex justify-center items-center overflow-y-auto py-10 z-50">
      <div className="bg-white p-6 pt-10 rounded-lg shadow-lg w-[95%] md:w-[400px] relative overflow-auto">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 bg-red-300 hover:bg-red-500 text-red-500 hover:text-white rounded-[5px] p-1"
          aria-label="Close feedback form"
        >
          [x]
        </button>
        <h2 className="text-xl font-semibold mb-4 text-[#02a312]">Feedback</h2>
        <p className="text-[#02a312] mb-4">
          We value your feedback. Please fill out the form below:
        </p>

        <input
          type="text"
          className="text-black w-full border p-2 mb-2 rounded"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          className="text-black w-full border p-2 mb-2 rounded"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          className="text-black w-full border p-2 mb-2 rounded"
          placeholder="Subtitle (optional)"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          className="w-full border p-2 mb-2 rounded"
          onChange={handleImage}
        />

        {/* Display Image Preview */}
        {image && (
          <img
            src={image}
            alt="Preview"
            className="w-full max-h-40 object-cover border p-2 mb-2 rounded"
          />
        )}

        <textarea
          className="text-black w-full border p-2 mb-2 rounded"
          rows="3"
          placeholder="Your feedback..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Rating Section with Hover Effect */}
        <div className="flex mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <label key={star} className="cursor-pointer">
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
                  (hover || rating) >= star
                    ? "text-yellow-400"
                    : "text-gray-400"
                } transition duration-200`}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-[#02a312] text-white px-4 py-2 rounded hover:bg-[#02a312]/70"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FeedbackForm;
