"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, memo } from "react";

// StatItem component with improved animations
const StatItem = memo(
  ({
    label,
    value,
    color,
    inView,
    index,
  }: {
    label: string;
    value: string;
    color: string;
    inView: boolean;
    index: number;
  }) => (
    <motion.div
      whileHover={{
        scale: 1.05,
        rotate: 2,
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
      }}
      whileTap={{ scale: 0.95 }}
      className="bg-gradient-to-br from-gray-900/80 to-black/80 p-8 rounded-3xl border border-gray-700/50 text-center backdrop-blur-lg hover:border-gray-600/70 transition-all duration-300"
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 50, scale: 0.8 }
      }
      transition={{
        delay: 0.6 + index * 0.15,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
    >
      <motion.div
        className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent mb-3`}
        initial={{ scale: 0, rotate: -180 }}
        animate={inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
        transition={{
          delay: 0.8 + index * 0.1,
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      >
        {value}
      </motion.div>
      <div className="text-gray-400 text-sm font-medium tracking-wide uppercase">
        {label}
      </div>
    </motion.div>
  )
);

StatItem.displayName = 'StatItem';

// Trait component with enhanced hover effects
const Trait = memo(
  ({
    trait,
    index,
    inView,
  }: {
    trait: string;
    index: number;
    inView: boolean;
  }) => (
    <motion.span
      whileHover={{
        scale: 1.1,
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        boxShadow: "0 8px 25px rgba(255,255,255,0.1)",
      }}
      className="px-6 py-3 bg-gradient-to-r from-gray-800/70 to-gray-900/70 rounded-full text-gray-300 border border-gray-600/50 cursor-default backdrop-blur-sm hover:border-gray-500/70 transition-all duration-300"
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={
        inView
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0, y: 20 }
      }
      transition={{
        delay: 1.3 + index * 0.08,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
    >
      {trait}
    </motion.span>
  )
);

Trait.displayName = 'Trait';

const ProfileSummary = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Enhanced animation variants with proper typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
        ease: [0.25, 0.1, 0.25, 1], // Using cubic-bezier array instead of string
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Enhanced data with better colors
  const stats = [
    {
      label: "Projects Completed",
      value: "5+",
      color: "from-blue-400 to-cyan-400",
    },
    {
      label: "Technologies Mastered",
      value: "30+",
      color: "from-purple-400 to-pink-400",
    },
    {
      label: "Years Experience",
      value: "3+",
      color: "from-green-400 to-emerald-400",
    },
    {
      label: "Certifications",
      value: "8+",
      color: "from-orange-400 to-red-400",
    },
  ];

  const traits = [
    "Problem Solving",
    "Innovation",
    "Collaboration",
    "Continuous Learning",
    "User Experience",
    "Clean Code",
    "Scalability",
    "Performance Optimization",
    "API Design",
    "Database Architecture",
    "DevOps",
    "Agile Methodology",
  ];

  return (
    <section
      id="about"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-950/30 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96  rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-8"
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              About Me
            </span>
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-32 h-1.5 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 mx-auto mb-8 rounded-full"
          />
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Passionate about creating exceptional digital experiences through
            innovative technology solutions
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 p-8 rounded-3xl border border-gray-700/50 backdrop-blur-lg">
              <h3 className="text-3xl font-semibold mb-6 text-white">
                Professional Summary
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                I am a passionate Full Stack Developer with expertise in modern
                web technologies and a strong foundation in software engineering
                principles. I thrive on turning complex problems into elegant,
                user-friendly solutions.
              </p>
              <p className="text-gray-300 leading-relaxed text-lg">
                My journey in technology has been driven by curiosity and a
                desire to solve real-world problems through innovative solutions
                that make a meaningful impact.
              </p>
            </div>

            <div className="bg-gradient-to-r from-gray-900/50 to-black/50 p-8 rounded-3xl border border-gray-700/50 backdrop-blur-lg">
              <h4 className="text-2xl font-semibold mb-6 text-white">
                Current Focus
              </h4>
              <div className="space-y-4">
                {[
                  "Advanced React and Next.js development",
                  "Cloud architecture and deployment",
                  "Machine Learning and AI integration",
                  "Mobile-first responsive design",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                    }
                    transition={{ delay: 1.2 + i * 0.1 }}
                  >
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mr-4 group-hover:scale-125 transition-transform duration-300" />
                    <span className="text-gray-300 text-lg group-hover:text-white transition-colors duration-300">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <StatItem
                key={stat.label}
                label={stat.label}
                value={stat.value}
                color={stat.color}
                inView={isInView}
                index={index}
              />
            ))}
          </motion.div>
        </div>

        {/* Enhanced traits section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-4xl font-semibold mb-4 text-white">
            What Drives Me
          </h3>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            The core values and skills that fuel my passion for development
          </p>
          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
            {traits.map((trait, index) => (
              <Trait
                key={trait}
                trait={trait}
                index={index}
                inView={isInView}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(ProfileSummary);