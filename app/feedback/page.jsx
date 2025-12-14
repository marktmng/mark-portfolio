"use client";

import { api } from "@/convex/_generated/api";
import { ConvexProvider, useMutation } from "convex/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

const FeedbackPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [image, setImage] = useState(null);

  const createFeedback = useMutation(api.feedback.createFeedback);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/") || file.size > 2 * 1024 * 1024) {
      alert("Please upload an image under 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!firstName || !description || rating === 0) {
      alert("Please complete required fields.");
      return;
    }

    try {
      await createFeedback({
        firstName,
        lastName,
        subtitle,
        description,
        rating,
        imageUrl: image || "",
      });

      alert("Feedback submitted successfully!");

      setFirstName("");
      setLastName("");
      setSubtitle("");
      setDescription("");
      setRating(0);
      setImage(null);
    } catch (err) {
      console.error(err);
      alert("Submission failed.");
    }
  };

  return (
    <ConvexProvider>
      <section className="h-full">
        <div className="min-h-screen text-white">
          {/* Header */}
          <div className="pt-32 pb-16 text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold"
            >
              Share Your <span className="text-[#fac70f]">Feedback</span>
            </motion.h1>

            <p className="text-white/60 text-lg max-w-2xl mx-auto mt-6">
              If we’ve worked together, I’d genuinely appreciate your thoughts.
              Your feedback helps me grow and improve.
            </p>
          </div>

          {/* Form Section */}
          <div className="flex justify-center px-4 pb-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="w-full max-w-xl bg-[#fac70f] rounded-2xl p-8 shadow-2xl"
            >
              <div className="space-y-4">
                <input
                  className="w-full bg-[#171717] text-white p-3 rounded-lg"
                  placeholder="First Name *"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <input
                  className="w-full bg-[#171717] text-white p-3 rounded-lg"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />

                <input
                  className="w-full bg-[#171717] text-white p-3 rounded-lg"
                  placeholder="Position / Company"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                />

                {/* Image Upload */}
                <div>
                  <label className="block bg-[#171717] text-white p-3 rounded-lg cursor-pointer text-center hover:bg-[#171717]/70">
                    Upload Profile Picture
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImage}
                    />
                  </label>
                </div>

                {image && (
                  <img
                    src={image}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                )}

                <textarea
                  rows={4}
                  className="w-full bg-[#171717] text-white p-3 rounded-lg"
                  placeholder="Your feedback *"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                {/* Rating */}
                <div className="flex gap-2 justify-center py-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      size={28}
                      className={`cursor-pointer transition ${
                        (hover || rating) >= star
                          ? "text-white"
                          : "text-gray-400"
                      }`}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(null)}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-[#171717] text-white py-3 rounded-lg hover:bg-[#171717]/70 transition"
                >
                  Submit Feedback
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </ConvexProvider>
  );
};

export default FeedbackPage;
