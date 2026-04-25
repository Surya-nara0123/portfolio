'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const startValue = 0;
      const endValue = value;
      const startTimestamp = Date.now();

      const step = () => {
        const now = Date.now();
        const progress = Math.min((now - startTimestamp) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * (endValue - startValue) + startValue);
        setCount(current);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setCount(endValue);
        }
      };

      requestAnimationFrame(step);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
};

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const experiences = [
    {
      title: 'Software Engineer',
      company: 'AfterQuery',
      duration: 'Oct 2025 - Present',
      location: 'Remote / Contract',
      description: 'Developing and containerizing realistic benchmark tasks for LLM training, focusing on terminal-bench implementation to enhance evaluation accuracy and reproducibility.',
      skills: ['Docker', 'C/C++', 'Nginx', 'asciinema', 'GoLang', 'CMake', 'Linux'],
      achievements: [
        'Developed and containerized 15+ complex benchmark tasks for LLM training using terminal-bench',
        'Designed challenges across multiple domains (Go, C++, nginx, CMake) strengthening model robustness',
        'Implemented automated evaluation pipelines improving reproducibility by 95%',
      ],
      color: 'from-indigo-500 to-purple-600',
      icon: '🤖',
    },
    {
      title: 'Software Development Intern',
      company: 'Maheshwari Electrical Agency',
      duration: 'May 2025 - Oct 2025',
      location: 'Remote',
      description: 'Built intelligent e-commerce solutions using Shopify, FastAPI, and React to enhance customer experience and drive engagement.',
      skills: ['Shopify', 'FastAPI', 'React', 'Python', 'AI Integration'],
      achievements: [
        'Developed a product context-aware chatbot for Shopify stores, reducing bounce rate by 10-15%',
        'Implemented intelligent product recommendations with page-wise context, increasing user interaction by 15%',
        'Built RESTful APIs handling 1000+ daily requests with 99.9% uptime',
      ],
      color: 'from-emerald-500 to-teal-600',
      icon: '⚡',
    },
    {
      title: 'Software Development Intern',
      company: 'Dexio Designs',
      duration: 'May 2025 - Aug 2025',
      location: 'Remote',
      description: 'Delivered pixel-perfect UI implementations and managed e-commerce solutions for multiple clients, focusing on accessibility and performance.',
      skills: ['Shopify', 'React', 'Next.js', 'FastAPI', 'Figma', 'Accessibility'],
      achievements: [
        'Converted Figma designs to pixel-perfect, accessible UI for Donnager AI, reducing review changes by 60%',
        'Implemented wishlist and cart functionality using AJAX, improving user engagement',
        'Built Shopify theme store for GINGI children\'s clothing, reducing bounce rates by 10%',
      ],
      color: 'from-orange-500 to-red-600',
      icon: '🎨',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, delay: 4 }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Experience
            </span>
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto mb-8 rounded-full"
          />
          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            My professional journey building real-world applications
          </motion.p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16"
        >
          {[
            { value: 3, label: 'Internships', suffix: '+' },
            { value: 15, label: 'Projects Built', suffix: '+' },
            { value: 10, label: 'Technologies', suffix: '+' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.1, y: -5 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                <AnimatedCounter value={stat.value} />
                {stat.suffix}
              </div>
              <div className="text-gray-500 text-sm uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ delay: 0.8, duration: 1.5 }}
            className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 origin-top"
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                transition={{ delay: index * 0.3 }}
                className={`relative flex flex-col md:flex-row items-start ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                } gap-8`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Timeline node */}
                <motion.div
                  className={`absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-5 h-5 rounded-full border-4 border-black z-10 bg-gradient-to-r ${exp.color}`}
                  animate={hoveredCard === index ? { scale: 1.8 } : { scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />

                {/* Content */}
                <motion.div
                  className="w-full md:w-5/12 ml-16 md:ml-0"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className="bg-gray-900/80 p-8 rounded-3xl border border-gray-800 backdrop-blur-lg relative overflow-hidden"
                    animate={hoveredCard === index ? {
                      borderColor: 'rgb(139, 92, 246)',
                      boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.25)'
                    } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Gradient accent */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${exp.color}`} />

                    {/* Icon and header */}
                    <div className="flex items-center gap-4 mb-4">
                      <motion.span
                        className="text-4xl"
                        animate={hoveredCard === index ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        {exp.icon}
                      </motion.span>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">{exp.title}</h3>
                        <p className="text-lg font-semibold bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent">
                          {exp.company}
                        </p>
                      </div>
                    </div>

                    <div className="text-gray-400 text-sm flex flex-col md:flex-row gap-2 mb-4">
                      <span className="px-3 py-1 bg-gray-800 rounded-full">{exp.duration}</span>
                      <span className="px-3 py-1 bg-gray-800 rounded-full">{exp.location}</span>
                    </div>

                    <p className="text-gray-300 mb-6 leading-relaxed">{exp.description}</p>

                    {/* Skills */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, skillIndex) => (
                          <motion.span
                            key={skill}
                            className="px-3 py-1 bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 rounded-full text-sm border border-gray-700"
                            whileHover={{
                              scale: 1.1,
                              backgroundColor: 'rgb(139, 92, 246)',
                              borderColor: 'rgb(139, 92, 246)'
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                            transition={{ delay: index * 0.3 + skillIndex * 0.1 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Key Achievements:</h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, achievementIndex) => (
                          <motion.li
                            key={achievementIndex}
                            className="flex items-start text-gray-300 text-sm"
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{
                              delay: index * 0.3 + achievementIndex * 0.1 + 0.5,
                              duration: 0.3
                            }}
                          >
                            <motion.span
                              className={`w-2 h-2 mt-2 mr-3 rounded-full bg-gradient-to-r ${exp.color} flex-shrink-0`}
                              animate={hoveredCard === index ? { scale: 1.5 } : { scale: 1 }}
                            />
                            {achievement}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
