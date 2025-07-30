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

  const info = [
    {
      icon: <FaPhoneAlt />,
      title: "Phone",
      description: "(+64) 22 380 3511",
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      description: "marktmg.info@gmail.com",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Address",
      description: "Glen Eden, Auckland, New Zealand",
    },
  ];

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Format Phone Number
  const onInput = (e) => {
    e.target.value = e.target.value.replace(/[^0-9+]/g, ""); // Remove non-numeric characters
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
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
      } else {
        setSuccess(`Failed to send message: ${data.message}`);
      }
    } catch (error) {
      setLoading(false);
      setSuccess(`An error occurred: ${error.message}`);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="py-5"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          <div className="xl:h-[54%] order-2 xl:order-none">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 p-10 bg-[#fac70f] rounded-xl"
            >
              <h3 className="text-3xl text-[#171717]">
                Excited to Join Your Team!😊
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                  className="text-white"
                  type="text"
                  name="firstname"
                  placeholder="First name"
                  value={formData.firstname}
                  onChange={handleChange}
                  required
                />
                <Input
                  className="text-white"
                  type="text"
                  name="lastname"
                  placeholder="Last name"
                  value={formData.lastname}
                  onChange={handleChange}
                />
                <Input
                  className="text-white"
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  className="text-white"
                  type="tel"
                  name="phone"
                  placeholder="Mobile number"
                  pattern="^\+?[1-9]\d{1,14}$"
                  value={formData.phone}
                  onChange={handleChange}
                  onInput={onInput}
                  // onInput={(e) => {
                  //   e.target.value = e.target.value.replace(/[^0-9+]/g, "");
                  // }}
                  required
                />
                <Input
                  type="text"
                  name="company"
                  placeholder="Company"
                  value={formData.company}
                  onChange={handleChange}
                  // required
                />
                <Input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <Textarea
                className="h-[150px]"
                name="message"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <Button
                type="submit"
                className="max-w-40 h-[50px] bg-[#171717] text-white hover:bg-[#171717]/50"
              >
                {loading ? "Sending..." : "Send message"}
              </Button>
              {success && <p className="text-[#171717]/75 mt-2">{success}</p>}
            </form>
          </div>
          {/* info */}
          <div
            className="flex-1 flex items-center xl:justify-end order-1
          xl:order-none mb-8 xl:mb-0"
          >
            <ul className="flex flex-col gap-10">
              {info.map((item, index) => {
                return (
                  <li key={index} className="flex gap-5 items-center">
                    <div className="w-[50px] h-[50px] xl:w-[72px] xl:h-[72px] bg-[#27272] text-accent rounded-md flex items-center justify-center">
                      <div className="text-[25px]">{item.icon}</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white/60">{item.title}</p>
                      <h3 className="text-[14px]">{item.description}</h3>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
