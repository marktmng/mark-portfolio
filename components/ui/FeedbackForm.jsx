"use client"; // Ensure this is a client component

import { useEffect } from "react";

const FeedbackForm = ({ setIsOpen }) => {
  // Close the modal when clicking outside of it
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setIsOpen]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">Feedback Form</h2>
        <p className="text-gray-600">
          We value your feedback. Please fill out the form below:
        </p>
        <textarea
          className="w-full border p-2 mt-4"
          rows="4"
          placeholder="Your feedback..."
        />
        <button
          onClick={() => setIsOpen(false)}
          className="mt-4 bg-accent text-white px-4 py-2 rounded hover:bg-accent/80"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FeedbackForm;
