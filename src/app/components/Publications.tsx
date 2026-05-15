'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, memo } from 'react';

// Simple animated border on hover
const AnimatedBorder = memo(({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
      <div className="relative">{children}</div>
    </div>
  );
});

AnimatedBorder.displayName = 'AnimatedBorder';

const Publications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const publications = [
    {
      id: 1,
      title: 'Enhancing Image Encryption Through Optimized Key Generation: An Analysis Using the Emperor Penguin Optimizer',
      authors: ['Surya Narayanan C', 'Sivapriya V', 'Dr. U Padmavathi'],
      journal: 'IEEE International Conference',
      year: 2025,
      doi: '10.1109/ICITIIT64777.2025.11040448',
      abstract: 'This paper presents an innovative approach to image encryption using the Emperor Penguin Optimizer (EPO) algorithm for generating robust cryptographic keys. We demonstrate that EPO-based key generation significantly improves encryption strength and resistance against common cryptographic attacks.',
      citations: 2,
      category: 'Cyber Security',
      status: 'Published',
      link: 'https://ieeexplore.ieee.org/document/11040448',
      icon: '🔐',
      color: 'from-indigo-500 to-purple-600',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="publications" className="py-24 px-4 sm:px-6 lg:px-8 bg-black relative">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Publications
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
            Research contributions in computer science and cybersecurity
          </motion.p>
        </motion.div>

        {/* Publications */}
        <div className="space-y-8">
          {publications.map((paper, index) => (
            <motion.div
              key={paper.id}
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: index * 0.2 }}
              className="group"
            >
              <AnimatedBorder>
                <div className="relative bg-gray-950/90 p-8 md:p-10 rounded-2xl border border-gray-800 backdrop-blur-sm overflow-hidden transition-all duration-500">
                  {/* Gradient accent on hover */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${paper.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />

                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${paper.color} flex items-center justify-center text-3xl shadow-lg`}>
                        {paper.icon}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-4">
                      {/* Status badges */}
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r ${paper.color} text-white`}>
                          ✓ {paper.status}
                        </span>
                        <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-gray-800 text-gray-300 border border-gray-700">
                          {paper.category}
                        </span>
                        <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-gray-800 text-gray-300 border border-gray-700">
                          📅 {paper.year}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                        {paper.title}
                      </h3>

                      {/* Authors */}
                      <p className="text-gray-400">
                        <span className="text-gray-500">Authors:</span>{' '}
                        {paper.authors.join(' • ')}
                      </p>

                      {/* Abstract */}
                      <p className="text-gray-300 leading-relaxed">
                        {paper.abstract}
                      </p>

                      {/* DOI and Links */}
                      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center pt-4 border-t border-gray-800">
                        <p className="text-sm text-gray-500">
                          <span className="text-gray-400">DOI:</span>{' '}
                          <a
                            href={paper.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-400 hover:text-indigo-300 hover:underline"
                          >
                            {paper.doi}
                          </a>
                        </p>

                        <div className="flex gap-3 sm:ml-auto">
                          <a
                            href={paper.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-medium shadow-lg transition-all duration-300"
                          >
                            <span>📄</span>
                            Read Paper
                          </a>
                          <a
                            href={`https://scholar.google.com/scholar?q=${encodeURIComponent(paper.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-medium border border-gray-700 transition-all duration-300"
                          >
                            <span>📚</span>
                            Google Scholar
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedBorder>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-900/50 rounded-full border border-gray-800">
            <span className="text-2xl">🔬</span>
            <span className="text-gray-400">More publications coming soon...</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Publications;