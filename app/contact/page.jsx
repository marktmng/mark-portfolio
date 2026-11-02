"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import {
  Terminal,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  Send,
  Radio,
  Clock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Cyber corner HUD markers
const HudCorners = ({ color = "#B5892D", size = 6 }) => {
  return (
    <>
      <span
        className="absolute -top-[1px] -left-[1px] pointer-events-none transition-all duration-300 group-hover:border-[#fac70f]"
        style={{
          width: size,
          height: size,
          borderTop: `1.5px solid ${color}`,
          borderLeft: `1.5px solid ${color}`,
        }}
      />
      <span
        className="absolute -top-[1px] -right-[1px] pointer-events-none transition-all duration-300 group-hover:border-[#fac70f]"
        style={{
          width: size,
          height: size,
          borderTop: `1.5px solid ${color}`,
          borderRight: `1.5px solid ${color}`,
        }}
      />
      <span
        className="absolute -bottom-[1px] -left-[1px] pointer-events-none transition-all duration-300 group-hover:border-[#fac70f]"
        style={{
          width: size,
          height: size,
          borderBottom: `1.5px solid ${color}`,
          borderLeft: `1.5px solid ${color}`,
        }}
      />
      <span
        className="absolute -bottom-[1px] -right-[1px] pointer-events-none transition-all duration-300 group-hover:border-[#fac70f]"
        style={{
          width: size,
          height: size,
          borderBottom: `1.5px solid ${color}`,
          borderRight: `1.5px solid ${color}`,
        }}
      />
    </>
  );
};

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
  const [copiedKey, setCopiedKey] = useState(null);

  const info = [
    {
      code: "COMM_VOICE",
      icon: <FaPhoneAlt />,
      title: "Direct Dial / Mobile",
      description: "(+64) 22 380 3511",
      actionHref: "tel:+64223803511",
      actionText: "Call Direct",
      copyable: true,
      copyValue: "+64223803511",
    },
    {
      code: "NET_ENDPOINT",
      icon: <FaEnvelope />,
      title: "Primary Mail Node",
      description: "mark@pakhreen.com",
      actionHref: "mailto:mark@pakhreen.com",
      actionText: "Send Mail",
      copyable: true,
      copyValue: "mark@pakhreen.com",
    },
    {
      code: "GEO_NODE",
      icon: <FaMapMarkerAlt />,
      title: "Base Coordinates",
      description: "Auckland, New Zealand",
      actionHref: "https://maps.google.com/?q=Auckland,New+Zealand",
      actionText: "View Map",
      copyable: false,
    },
  ];

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onInput = (e) =>
    (e.target.value = e.target.value.replace(/[^0-9+]/g, ""));

  const handleCopy = (key, text) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success) {
        setSuccess({
          status: "ok",
          message: "Transmission verified & delivered. I will acknowledge and reply shortly.",
        });
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
        setSuccess({
          status: "error",
          message: `Transmission failed: ${data.message || "Unknown error"}`,
        });
      }
    } catch (err) {
      setLoading(false);
      setSuccess({
        status: "error",
        message: `Transmission error: ${err.message}`,
      });
    }
  };

  // Cinematic hacker animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-[85vh] flex items-center justify-center pt-24 pb-16 xl:py-24 relative overflow-hidden font-primary selection:bg-[#B5892D]/30 selection:text-[#fac70f]"
    >
      {/* Background Cyber Ambient Elements */}
      <div className="absolute top-[-5%] left-[-5%] w-[420px] h-[420px] bg-[#B5892D]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[420px] h-[420px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

      {/* Cyber Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-7xl flex flex-col gap-8">
        {/* ======================================================== */}
        {/* TOP HUD COMMAND / PROTOCOL STATUS RIBBON */}
        {/* ======================================================== */}
        <motion.div
          variants={itemVariants}
          className="w-full bg-[#111110]/85 border border-white/10 backdrop-blur-xl rounded-xl p-3 sm:p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 relative shadow-2xl group"
        >
          <HudCorners color="#B5892D" size={8} />

          {/* Left: Terminal status line */}
          <div className="flex items-center gap-3 text-xs tracking-wider">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B5892D] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#B5892D]"></span>
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-[#B5892D] uppercase font-mono">COMMS_LINK // V2.6</span>
              <span className="text-white/30 hidden sm:inline">|</span>
              <span className="text-white/60 font-mono">CHANNEL: 443_SECURE</span>
              <span className="text-white/30 hidden md:inline">|</span>
              <span className="text-white/80 font-mono hidden md:inline">
                STATUS: <span className="text-emerald-400">READY_FOR_TRANSMISSION</span>
              </span>
            </div>
          </div>

          {/* Center: Command prompt */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-white/50 bg-white/5 px-3 py-1 rounded-md border border-white/5 font-mono">
            <Terminal className="w-3.5 h-3.5 text-[#B5892D]" />
            <span>sys_dispatch --protocol=SMTP --encrypt=AES</span>
            <span className="w-1.5 h-3.5 bg-[#B5892D] animate-pulse inline-block" />
          </div>

          {/* Right: Security & ETA Telemetry */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end text-xs font-mono">
            <div className="flex items-center gap-1.5 text-[11px] text-white/50 bg-white/5 px-2.5 py-1 rounded border border-white/5">
              <Clock className="w-3 h-3 text-[#B5892D]" />
              <span>ETA: &lt; 24H</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-white/50 bg-white/5 px-2.5 py-1 rounded border border-white/5">
              <ShieldCheck className="w-3 h-3 text-[#B5892D]" />
              <span>TLS 1.3</span>
            </div>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* MAIN CONSOLE: DISPATCH FORM & NETWORK ENDPOINTS */}
        {/* ======================================================== */}
        <div className="flex flex-col xl:flex-row gap-8 xl:gap-12 items-start">
          {/* LEFT: Transmission Dispatch Console */}
          <motion.div
            variants={itemVariants}
            className="flex-1 w-full bg-[#111110]/90 border border-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-10 relative shadow-2xl group overflow-hidden"
          >
            <HudCorners color="#B5892D" size={10} />

            {/* Window Title Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-xs text-white/40 font-mono ml-2">dispatch_transmission.sys</span>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-[#B5892D] uppercase bg-[#B5892D]/10 px-2.5 py-0.5 rounded border border-[#B5892D]/20">
                PORT: 443_SSL
              </span>
            </div>

            {/* Header info */}
            <div className="flex flex-col gap-2 mb-8">
              <div className="flex items-center gap-2 text-xs text-[#B5892D] font-mono">
                <span>&gt;</span>
                <span>exec_packet --action="INITIATE_CONTACT"</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
                Let's work <span className="text-[#fac70f] font-normal">together.</span>
              </h3>
              <p className="text-white/60 text-sm sm:text-base leading-relaxed font-inter font-light">
                Excited to build scalable web applications, REST APIs, or cloud platforms with your team. Fill out the dispatch payload below.
              </p>
            </div>

            {/* The Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {[
                  { name: "firstname", label: "FIRST_NAME", placeholder: "First Name", type: "text", required: true },
                  { name: "lastname", label: "LAST_NAME", placeholder: "Last Name", type: "text", required: true },
                  { name: "email", label: "EMAIL_ENDPOINT", placeholder: "developer@company.com", type: "email", required: true },
                  { name: "phone", label: "MOBILE_FREQUENCY", placeholder: "+64 ...", type: "tel", required: false },
                  { name: "company", label: "ORGANIZATION", placeholder: "Company / Team", type: "text", required: false },
                  { name: "subject", label: "SUBJECT_HEADER", placeholder: "Project Scope / Role", type: "text", required: true },
                ].map((field) => (
                  <div key={field.name} className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono text-[#B5892D] uppercase tracking-wider flex items-center gap-1">
                      <span>[{field.label}]</span>
                      {field.required && <span className="text-white/40">*</span>}
                    </label>
                    <Input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleChange}
                      onInput={field.name === "phone" ? onInput : undefined}
                      required={field.required}
                      className="bg-white/[0.03] border border-white/10 text-white placeholder:text-white/30 focus:border-[#fac70f] focus:bg-[#111110] focus:ring-1 focus:ring-[#fac70f]/40 transition-all rounded-xl py-5 font-mono text-xs sm:text-sm"
                    />
                  </div>
                ))}
              </div>

              {/* Message Textarea */}
              <div className="flex flex-col gap-1.5 mt-1">
                <label className="text-[10px] font-mono text-[#B5892D] uppercase tracking-wider flex items-center gap-1">
                  <span>[PAYLOAD_MESSAGE]</span>
                  <span className="text-white/40">*</span>
                </label>
                <Textarea
                  name="message"
                  placeholder="Outline your project architecture, role details, or requirements..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="min-h-[130px] sm:min-h-[160px] bg-white/[0.03] border border-white/10 text-white placeholder:text-white/30 focus:border-[#fac70f] focus:bg-[#111110] focus:ring-1 focus:ring-[#fac70f]/40 transition-all rounded-xl resize-none font-mono text-xs sm:text-sm p-4"
                />
              </div>

              {/* Submit Execution Button */}
              <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#B5892D] hover:bg-[#fac70f] text-[#111110] font-mono font-bold text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(181,137,45,0.25)] hover:shadow-[0_0_30px_rgba(250,199,15,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group/btn"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>DISPATCHING PAYLOAD...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5 transition-transform" />
                      <span>DISPATCH TRANSMISSION</span>
                    </>
                  )}
                </button>

                <div className="text-[11px] font-mono text-white/40 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B5892D]" />
                  <span>256-BIT SECURE CHANNEL</span>
                </div>
              </div>

              {/* Status Banner */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-4 rounded-xl border font-mono text-xs flex items-start gap-3 ${
                    success.status === "ok"
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                      : "bg-red-500/10 border-red-500/30 text-red-300"
                  }`}
                >
                  <span className="mt-0.5">{success.status === "ok" ? "● [200 OK]" : "▲ [ERROR]"}</span>
                  <div className="flex-1">
                    <p className="font-semibold">{success.message}</p>
                    {success.status === "ok" && (
                      <p className="text-[10px] text-white/50 mt-1">
                        System telemetry recorded timestamp: {new Date().toLocaleTimeString()}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* RIGHT: Secure Network Endpoints & Live Status */}
          <motion.div
            variants={itemVariants}
            className="w-full xl:w-[420px] flex flex-col gap-6"
          >
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#B5892D] px-2 flex items-center justify-between">
              <span>// DIRECT_COMM_ENDPOINTS</span>
              <span className="text-white/30">[3 NODES]</span>
            </div>

            {/* Endpoints List */}
            <div className="flex flex-col gap-4">
              {info.map((item, idx) => {
                const isCopied = copiedKey === item.code;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.015 }}
                    className="bg-[#111110]/85 border border-white/10 rounded-2xl p-5 backdrop-blur-xl relative shadow-xl hover:border-[#B5892D]/50 hover:bg-[#111110] transition-all duration-300 group flex items-start justify-between gap-4"
                  >
                    <HudCorners color="#B5892D" size={6} />

                    <div className="flex items-start gap-4 flex-1">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-[#fac70f] flex items-center justify-center text-lg group-hover:bg-[#B5892D]/20 group-hover:border-[#B5892D]/50 transition-all shadow-md shrink-0">
                        {item.icon}
                      </div>

                      <div className="flex flex-col gap-1 min-w-0">
                        <span className="text-[10px] font-mono text-[#B5892D] uppercase tracking-wider flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-[#B5892D]" />
                          [{item.code}]
                        </span>
                        <p className="text-xs text-white/50 font-mono">{item.title}</p>
                        <h4 className="text-base sm:text-lg text-white font-medium tracking-wide truncate">
                          {item.description}
                        </h4>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      {item.copyable && (
                        <button
                          type="button"
                          onClick={() => handleCopy(item.code, item.copyValue)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-[#B5892D]/20 text-white/50 hover:text-[#fac70f] border border-white/5 hover:border-[#B5892D]/30 transition-all text-xs"
                          title={`Copy ${item.title}`}
                        >
                          {isCopied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}

                      {item.actionHref && (
                        <a
                          href={item.actionHref}
                          target={item.actionHref.startsWith("http") ? "_blank" : undefined}
                          rel={item.actionHref.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-[10px] font-mono text-[#B5892D] hover:text-[#fac70f] underline underline-offset-2"
                        >
                          {item.actionText} →
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Engineer Deployment & Availability Telemetry Box */}
            <motion.div
              variants={itemVariants}
              className="bg-[#111110]/80 border border-[#B5892D]/25 rounded-2xl p-6 backdrop-blur-xl relative shadow-xl font-mono text-xs"
            >
              <HudCorners color="#B5892D" size={6} />

              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                  </span>
                  <span className="text-[#fac70f] font-semibold uppercase tracking-wider">
                    OPERATIONAL_STATUS
                  </span>
                </div>
                <span className="text-[10px] text-white/40">ONLINE // READY</span>
              </div>

              <div className="flex flex-col gap-2.5 text-white/70">
                <div className="flex justify-between items-center">
                  <span className="text-white/40">DEPLOY_AVAILABILITY:</span>
                  <span className="text-white font-medium">FULL-TIME / CONTRACT</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/40">TIMEZONE_NODE:</span>
                  <span className="text-white font-medium">NZDT (UTC+13)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/40">CLEARANCE:</span>
                  <span className="text-[#fac70f] font-medium">FULL-STACK ENGINEER</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/40">CURRENT_VENTURE:</span>
                  <span className="text-[#B5892D] font-medium">FOUNDER @ PAKHREEN</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-[10px] text-white/40">
                <Zap className="w-3 h-3 text-[#B5892D]" />
                <span>All transmissions route directly to Mark Tamang's console.</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
