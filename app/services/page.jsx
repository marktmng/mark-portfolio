"use client";

import { motion } from "framer-motion";

const highlights = [
  {
    num: "01",
    title: "Full-Stack Software Development",
    description:
      "Experienced in developing modern, responsive web applications across both frontend and backend technologies. Skilled in React.js, Next.js, TypeScript, ASP.NET Core, .NET, Node.js, REST APIs, SQL databases, and authentication systems. Focused on building reliable, user-friendly applications with clean architecture and practical development workflows.",
  },
  {
    num: "02",
    title: "AI & Automation",
    description:
      "Focused on applying AI and automation to improve software development and business processes. Experienced with OpenAI APIs, AI agents, workflow automation, Make.com, n8n, webhooks, REST API integrations, and AI coding tools. Continuously exploring new AI technologies and practical ways to turn them into useful software solutions.",
  },
  {
    num: "03",
    title: "Cloud & DevOps",
    description:
      "Hands-on experience with cloud application development, deployment, and development operations using AWS, Azure, GCP, Cloudflare, Docker, GitHub Actions, CircleCI, and CI/CD pipelines. Comfortable working with cloud environments, deployment workflows, application configuration, and modern cloud-based development practices.",
  },
  {
    num: "04",
    title: "Mobile App Development",
    description:
      "Experience developing cross-platform and native mobile applications using React Native, Expo, Kotlin, and TypeScript. Familiar with mobile application architecture, background tasks, platform-specific functionality, APIs, and local notifications, with a focus on creating practical and responsive mobile experiences.",
  },
  {
    num: "05",
    title: "Desktop App Development",
    description:
      "Experience developing desktop applications using C# and T-SQL, with a focus on object-oriented programming, database integration, data management, and reliable application workflows. Comfortable translating functional requirements into practical desktop software solutions.",
  },
  {
    num: "06",
    title: "IT Specialist & Graphic Design",
    description:
      "A combined background in technical support and creative digital work. Experienced in troubleshooting hardware, software, Windows systems, applications, networking, and office technology, alongside professional graphic design experience creating logos, storybooks, posters, brochures, illustrations, and digital content.",
  },
];

const HighlightCard = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="flex flex-col gap-6 group bg-white/5 p-8 rounded-3xl shadow-xl border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-colors duration-500"
    >
      {/* Top: Number */}
      <div className="flex w-full flex-row justify-between items-start">
        <div className="text-5xl font-light text-white/20 group-hover:text-[#B5892D] transition-colors duration-500">
          {service.num}
        </div>
      </div>

      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white group-hover:text-[#B5892D] transition-colors duration-500 leading-tight">
        {service.title}
      </h2>

      {/* Description */}
      <p className="text-white/50 text-sm leading-relaxed flex-grow">
        {service.description}
      </p>

      {/* Border line */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-[#B5892D]/50 transition-all duration-500 mt-2"></div>
    </motion.div>
  );
};

const Highlights = () => {
  return (
    <section className="min-h-screen relative overflow-hidden flex flex-col justify-center pt-32 pb-16 xl:py-32">
      {/* Background elements */}
      <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-[#B5892D]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] left-[5%] w-96 h-96 bg-white/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-light text-white tracking-tight mb-4"
          >
            My <span className="text-[#B5892D] font-medium">Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/50 max-w-2xl mx-auto font-light"
          >
            Delivering high-quality, practical solutions across the software stack.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {highlights.map((service, index) => (
            <HighlightCard
              key={service.num}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;