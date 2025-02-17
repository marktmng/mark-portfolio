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
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 bg-red-300 hover:bg-red-500 text-red-500 hover:text-white rounded-[5px]"
        >
          [ ✕ ]
        </button>
        <h2 className="text-xl font-semibold mb-4 text-[#02a312]">Feedback</h2>
        <p className="text-[#02a312]">
          We value your feedback. Please fill out the form below:
        </p>
        <textarea
          className="w-full border p-2 mt-4 bg-[#24292f]/10 text-black border-[#02a312]/50"
          rows="4"
          placeholder="Your feedback..."
        />
        <button
          onClick={() => setIsOpen(false)}
          className="mt-4 bg-[#02a312] text-white px-4 py-2 rounded text-[#24292f]/70 hover:bg-[#02a312]/70 hover:text-accent"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FeedbackForm;
