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
      <section className="min-h-screen relative overflow-hidden flex flex-col justify-center pt-24 pb-16 xl:py-24">
        {/* Background elements */}
        <div className="absolute top-[10%] right-[-5%] w-96 h-96 bg-[#B5892D]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-white/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-light text-white tracking-tight"
            >
              Share Your <span className="text-[#B5892D] font-medium">Review</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/60 text-lg max-w-2xl mx-auto mt-6 font-light"
            >
              I genuinely appreciate your review. Your insights help me
              continuously improve and build better software.
            </motion.p>
          </div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row gap-5">
                <input
                  className="w-full bg-transparent border border-white/20 text-white placeholder:text-white/40 focus:border-[#B5892D]/70 focus:ring-1 focus:ring-[#B5892D]/70 transition-all rounded-xl p-4 outline-none"
                  placeholder="First Name *"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  className="w-full bg-transparent border border-white/20 text-white placeholder:text-white/40 focus:border-[#B5892D]/70 focus:ring-1 focus:ring-[#B5892D]/70 transition-all rounded-xl p-4 outline-none"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <input
                className="w-full bg-transparent border border-white/20 text-white placeholder:text-white/40 focus:border-[#B5892D]/70 focus:ring-1 focus:ring-[#B5892D]/70 transition-all rounded-xl p-4 outline-none"
                placeholder="Profession / Role"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              />

              {/* Image Upload */}
              <div className="flex flex-col gap-2 mt-2">
                <label className="w-full cursor-pointer flex justify-center items-center bg-white/5 border border-white/10 text-white/80 rounded-xl px-4 py-4 hover:bg-white/10 hover:text-white transition-colors select-none text-sm font-medium">
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
                <div className="w-24 h-24 rounded-full border border-[#B5892D]/50 mx-auto overflow-hidden my-2 shadow-lg">
                  <img
                    src={image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <textarea
                rows={5}
                className="w-full bg-transparent border border-white/20 text-white placeholder:text-white/40 focus:border-[#B5892D]/70 focus:ring-1 focus:ring-[#B5892D]/70 transition-all rounded-xl p-4 outline-none resize-none mt-2"
                placeholder="Your feedback *"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              {/* Rating */}
              <div className="flex gap-3 justify-center py-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={36}
                    className={`cursor-pointer transition-all duration-300 hover:scale-110 ${
                      (hover || rating) >= star
                        ? "text-[#B5892D] drop-shadow-[0_0_10px_rgba(181,137,45,0.8)]"
                        : "text-white/20"
                    }`}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-[#B5892D] text-white py-4 rounded-full font-semibold tracking-wide hover:bg-[#B5892D]/80 transition-all duration-300 shadow-[0_0_15px_rgba(181,137,45,0.3)] hover:shadow-[0_0_25px_rgba(181,137,45,0.5)] mt-2"
              >
                Submit Feedback
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </ConvexProvider>
  );
};

export default FeedbackPage;
