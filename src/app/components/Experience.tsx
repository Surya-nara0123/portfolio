'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Animated Counter Component - simple
const AnimatedCounter = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const animDuration = duration;

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const startTime = Date.now();

      const step = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / animDuration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 4);
        start = Math.floor(easeOut * end);
        setCount(start);

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    }
  }, [isInView, value, animDuration]);

  return <span ref={ref}>{count}</span>;
};

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 bg-black relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto mb-8 rounded-full" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My professional journey building real-world applications
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16"
        >
          {[
            { value: 3, label: 'Internships', suffix: '+' },
            { value: 15, label: 'Projects Built', suffix: '+' },
            { value: 10, label: 'Technologies', suffix: '+' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                <AnimatedCounter value={stat.value} />
                {stat.suffix}
              </div>
              <div className="text-gray-500 text-sm uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <div className="relative">
          {/* Timeline line - simple static */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className={`relative flex flex-col md:flex-row items-start gap-8`}
              >
                {/* Timeline node */}
                <div className={`absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-5 h-5 rounded-full border-4 border-black bg-gradient-to-r ${exp.color}`} />

                {/* Content - simple card, no complex hover */}
                <div className="w-full md:w-5/12 ml-16 md:ml-0">
                  <div className="bg-gray-900/80 p-8 rounded-3xl border border-gray-800 hover:border-gray-700 transition-colors duration-300">
                    {/* Gradient accent */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${exp.color}`} />

                    {/* Icon and header */}
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-4xl">{exp.icon}</span>
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
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 rounded-full text-sm border border-gray-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Key Achievements:</h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, achievementIndex) => (
                          <li
                            key={achievementIndex}
                            className="flex items-start text-gray-300 text-sm"
                          >
                            <span className={`w-2 h-2 mt-2 mr-3 rounded-full bg-gradient-to-r ${exp.color} flex-shrink-0`} />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

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