"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const info = [
    { icon: <FaPhoneAlt />, title: "Phone", description: "(+64) 22 380 3511" },
    {
      icon: <FaEnvelope />,
      title: "Email",
      description: "mark@pakhreen.com",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Address",
      description: "Auckland, New Zealand",
    },
  ];

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onInput = (e) =>
    (e.target.value = e.target.value.replace(/[^0-9+]/g, ""));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success) {
        setSuccess("Thanks for reaching out — I’ll be in touch shortly!");
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          company: "",
          subject: "",
          message: "",
        });
      } else setSuccess(`Failed: ${data.message}`);
    } catch (err) {
      setLoading(false);
      setSuccess(`Error: ${err.message}`);
    }
  };

  // Animation variants
  const formVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, ease: "easeOut" },
    },
  };
  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      className="min-h-[80vh] flex items-center justify-center pt-28 pb-16 xl:py-24 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-[#B5892D]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-white/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto flex flex-col xl:flex-row gap-12 xl:gap-[60px] relative z-10 px-4">
        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col gap-6 p-6 sm:p-12 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl"
          variants={formVariant}
        >
          <motion.div variants={itemVariant} className="flex flex-col gap-2 mb-2 sm:mb-4">
            <h3 className="text-4xl sm:text-5xl font-light text-white tracking-tight">
              Let's work <span className="text-[#B5892D]">together.</span>
            </h3>
            <p className="text-white/60 text-sm sm:text-base leading-relaxed">
              Excited to join your team! Fill out the form and I'll get back to you shortly.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
            variants={formVariant}
          >
            {[
              { name: "firstname", placeholder: "First Name", type: "text" },
              { name: "lastname", placeholder: "Last Name", type: "text" },
              { name: "email", placeholder: "Email", type: "email" },
              { name: "phone", placeholder: "Mobile Number", type: "tel" },
              { name: "company", placeholder: "Company", type: "text" },
              { name: "subject", placeholder: "Subject", type: "text" },
            ].map((field) => (
              <motion.div key={field.name} variants={itemVariant}>
                <Input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  onInput={field.name === "phone" ? onInput : undefined}
                  required={field.name !== "company"}
                  className="bg-transparent border border-white/20 text-white placeholder:text-white/40 focus:border-[#B5892D]/70 focus:ring-1 focus:ring-[#B5892D]/70 transition-all rounded-xl py-6"
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariant}>
            <Textarea
              className="h-[120px] sm:h-[150px] bg-transparent border border-white/20 text-white placeholder:text-white/40 focus:border-[#B5892D]/70 focus:ring-1 focus:ring-[#B5892D]/70 transition-all rounded-xl resize-none"
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </motion.div>

          <motion.div variants={itemVariant}>
            <Button
              type="submit"
              className="w-full sm:w-auto mt-2 bg-[#B5892D] text-white hover:bg-[#B5892D]/80 rounded-full px-8 py-6 text-base font-semibold tracking-wide transition-all duration-300"
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </motion.div>

          {success && (
            <motion.p
              className="text-[#B5892D] mt-2 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {success}
            </motion.p>
          )}
        </motion.form>

        {/* Info Section */}
        <motion.div className="flex-1 flex flex-col justify-center gap-8 xl:gap-12" variants={formVariant}>
          {info.map((item, i) => (
            <motion.div
              key={i}
              className="flex gap-6 items-center group"
              variants={itemVariant}
            >
              <div className="w-[70px] h-[70px] bg-white/5 border border-white/10 text-[#B5892D] rounded-2xl flex items-center justify-center group-hover:bg-[#B5892D] group-hover:text-white transition-all duration-500 shadow-lg">
                <div className="text-[28px]">{item.icon}</div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-white/50 text-sm tracking-widest uppercase font-semibold">{item.title}</p>
                <h3 className="text-xl text-white/90 font-light tracking-wide">{item.description}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;
