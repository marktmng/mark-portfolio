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
      description: "marktmg.info@gmail.com",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Address",
      description: "Glen Eden, Auckland, NZ",
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
    <motion.section initial="hidden" animate="visible" className="py-12">
      <div className="container mx-auto flex flex-col xl:flex-row gap-10">
        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col gap-5 p-10 bg-[#fac70f] rounded-xl shadow-lg"
          variants={formVariant}
        >
          <motion.h3 className="text-3xl text-[#171717]" variants={itemVariant}>
            Excited to Join Your Team! 😊
          </motion.h3>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
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
                  className="text-white"
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariant}>
            <Textarea
              className="h-[150px]"
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
              className="bg-[#171717] text-white hover:bg-[#171717]/70 hover:scale-105 transition-transform duration-300"
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </motion.div>

          {success && (
            <motion.p
              className="text-[#171717]/75 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {success}
            </motion.p>
          )}
        </motion.form>

        {/* Info Section */}
        <motion.div className="flex-1 flex flex-col gap-8">
          {info.map((item, i) => (
            <motion.div
              key={i}
              className="flex gap-5 items-center"
              variants={itemVariant}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="w-[60px] h-[60px] bg-[#27272] text-accent rounded-md flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
                <div className="text-[25px]">{item.icon}</div>
              </div>
              <div>
                <p className="text-white/60">{item.title}</p>
                <h3 className="text-[14px]">{item.description}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;
