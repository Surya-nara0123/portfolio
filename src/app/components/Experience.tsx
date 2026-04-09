'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const experiences = [
    {
      title: 'Software Engineer',
      company: 'AfterQuery',
      duration: 'Oct 2025 - Present',
      location: 'Contract Work',
      description: 'Developing and containerizing realistic benchmark tasks for LLM training, focusing on terminal-bench implementation to enhance evaluation accuracy and reproducibility.',
      skills: ['Docker', 'C/C++', 'Nginx', 'asciinema', 'GoLang', 'CMake'],
      achievements: [
        'Developed and containerized realistic benchmark tasks for LLM training using terminal-bench, enhancing evaluation accuracy and reproducibility',
        'Designed 15+ complex engineering challenges across multiple domains (Go, C++, nginx, CMake), significantly strengthening model robustness on real-world coding tasks'
      ]
    },
    {
      title: 'Software Development Intern',
      company: 'Maheshwari Electrical Agency',
      duration: 'May 2025 - Oct 2025',
      location: 'Stipend Internship',
      description: 'Built intelligent e-commerce solutions using Shopify, FastAPI, and React to enhance customer experience and drive engagement.',
      skills: ['Shopify', 'FastAPI', 'React'],
      achievements: [
        'Developed a product context-aware chatbot for Shopify stores to enhance customer experience and potentially reduce bounce rate by 10-15%',
        'Implemented intelligent product recommendations with page-wise context, increasing user interaction by 15%'
      ]
    },
    {
      title: 'Software Development Intern',
      company: 'Dexio Designs',
      duration: 'May 2025 - Aug 2025',
      location: 'Stipend Internship',
      description: 'Delivered pixel-perfect UI implementations and managed e-commerce solutions for multiple clients, focusing on accessibility and performance optimization.',
      skills: ['Shopify', 'FastAPI', 'React', 'NextJS'],
      achievements: [
        'Converted Figma designs to pixel-perfect and accessible UI for Donnager AI, reducing review changes by 60% and managed wishlist and cart functionality using AJAX',
        'Implemented Shopify theme store for premium children\'s clothing brand GINGI, reducing bounce rates by 10% and abandoned checkouts by 15%'
      ]
    }
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
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent">
              Experience
            </span>
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto mb-8"
          />
          <motion.p
            variants={itemVariants}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            My professional journey and internship experiences that shaped my career
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600"></div>

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
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full border-4 border-black z-10"
                  animate={hoveredCard === index ? { scale: 1.5 } : { scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />

                {/* Content */}
                <motion.div
                  className="w-full md:w-5/12 ml-16 md:ml-0"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 backdrop-blur-sm"
                    animate={hoveredCard === index ? { 
                      borderColor: 'rgb(156, 163, 175)',
                      boxShadow: '0 10px 30px rgba(156, 163, 175, 0.2)'
                    } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                      <p className="text-gray-300 font-semibold mb-1">{exp.company}</p>
                      <div className="text-gray-400 text-sm flex flex-col md:flex-row gap-2">
                        <span>{exp.duration}</span>
                        <span className="hidden md:inline">•</span>
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>

                    {/* Skills */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, skillIndex) => (
                          <motion.span
                            key={skill}
                            className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                            whileHover={{ scale: 1.1, backgroundColor: 'rgb(55, 65, 81)' }}
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
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">Key Achievements:</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        {exp.achievements.map((achievement, achievementIndex) => (
                          <motion.li
                            key={achievementIndex}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                            transition={{ 
                              delay: index * 0.3 + achievementIndex * 0.1 + 0.5,
                              duration: 0.3 
                            }}
                          >
                            <motion.span
                              className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ 
                                duration: 2, 
                                repeat: Infinity, 
                                delay: achievementIndex * 0.5 
                              }}
                            />
                            {achievement}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
