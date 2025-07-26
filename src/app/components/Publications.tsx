'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const Publications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredPaper, setHoveredPaper] = useState<number | null>(null);

  const publications = [
    {
      id: 1,
      title: 'Optimizing React Performance with Advanced Memoization Techniques',
      authors: ['Suryanarayanan', 'Dr. Jane Smith', 'Prof. John Doe'],
      journal: 'Journal of Web Development',
      year: 2024,
      doi: '10.1000/journal.2024.001',
      abstract: 'This paper explores advanced memoization techniques in React applications to significantly improve rendering performance and user experience.',
      citations: 15,
      category: 'Web Development',
      status: 'Published',
      link: '#'
    },
    {
      id: 2,
      title: 'Machine Learning Approaches to Automated Code Review',
      authors: ['Suryanarayanan', 'Dr. Alice Johnson'],
      journal: 'IEEE Transactions on Software Engineering',
      year: 2023,
      doi: '10.1109/TSE.2023.001',
      abstract: 'We present a novel machine learning framework for automated code review that identifies potential bugs and suggests improvements.',
      citations: 32,
      category: 'Machine Learning',
      status: 'Published',
      link: '#'
    },
    {
      id: 3,
      title: 'Scalable Microservices Architecture for E-commerce Platforms',
      authors: ['Suryanarayanan', 'Dr. Robert Wilson', 'Prof. Sarah Davis'],
      journal: 'ACM Computing Surveys',
      year: 2024,
      doi: '10.1145/survey.2024.001',
      abstract: 'A comprehensive analysis of microservices patterns and their implementation in large-scale e-commerce systems.',
      citations: 8,
      category: 'System Architecture',
      status: 'Under Review',
      link: '#'
    },
    {
      id: 4,
      title: 'Real-time Data Synchronization in Distributed Web Applications',
      authors: ['Suryanarayanan', 'Dr. Michael Brown'],
      journal: 'Conference on Web Technologies (CWT 2024)',
      year: 2024,
      doi: 'pending',
      abstract: 'This work addresses challenges in maintaining data consistency across distributed web applications using WebSocket and event-driven architectures.',
      citations: 2,
      category: 'Distributed Systems',
      status: 'Accepted',
      link: '#'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'from-green-400 to-green-600';
      case 'Accepted':
        return 'from-blue-400 to-blue-600';
      case 'Under Review':
        return 'from-yellow-400 to-yellow-600';
      default:
        return 'from-gray-400 to-gray-600';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Web Development': 'from-blue-400 to-blue-600',
      'Machine Learning': 'from-purple-400 to-purple-600',
      'System Architecture': 'from-green-400 to-green-600',
      'Distributed Systems': 'from-red-400 to-red-600',
    };
    return colors[category] || 'from-gray-400 to-gray-600';
  };

  return (
    <section id="publications" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950/30">
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
              Publications
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
            Research papers and academic contributions to the field of computer science
          </motion.p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { label: 'Publications', value: '4', icon: '📄' },
            { label: 'Citations', value: '57', icon: '📊' },
            { label: 'H-Index', value: '3', icon: '📈' },
            { label: 'Impact Factor', value: '2.4', icon: '⭐' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-black/50 p-6 rounded-2xl text-center border border-gray-800 backdrop-blur-sm"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Publications list */}
        <div className="space-y-8">
          {publications.map((paper, index) => (
            <motion.div
              key={paper.id}
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              onMouseEnter={() => setHoveredPaper(index)}
              onMouseLeave={() => setHoveredPaper(null)}
              className="group relative bg-black/50 p-8 rounded-2xl border border-gray-800 backdrop-blur-sm overflow-hidden"
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gray-800/5 via-gray-700/5 to-gray-600/5"
                animate={hoveredPaper === index ? { 
                  scale: 1.05,
                  opacity: 1
                } : { 
                  scale: 1,
                  opacity: 0.5
                }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <motion.h3
                      className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-gray-300 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      {paper.title}
                    </motion.h3>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <motion.span
                        className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getStatusColor(paper.status)} text-white`}
                        whileHover={{ scale: 1.1 }}
                      >
                        {paper.status}
                      </motion.span>
                      <motion.span
                        className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getCategoryColor(paper.category)} text-white`}
                        whileHover={{ scale: 1.1 }}
                      >
                        {paper.category}
                      </motion.span>
                    </div>

                    <div className="text-gray-400 mb-4">
                      <p className="mb-2">
                        <strong>Authors:</strong> {paper.authors.join(', ')}
                      </p>
                      <p className="mb-2">
                        <strong>Published in:</strong> {paper.journal} ({paper.year})
                      </p>
                      {paper.doi !== 'pending' && (
                        <p className="mb-2">
                          <strong>DOI:</strong> 
                          <motion.span 
                            className="text-indigo-400 ml-2 cursor-pointer hover:underline"
                            whileHover={{ scale: 1.05 }}
                          >
                            {paper.doi}
                          </motion.span>
                        </p>
                      )}
                    </div>

                    <motion.p
                      className="text-gray-300 leading-relaxed mb-6"
                      initial={{ opacity: 0.8 }}
                      animate={hoveredPaper === index ? { opacity: 1 } : { opacity: 0.8 }}
                    >
                      {paper.abstract}
                    </motion.p>
                  </div>

                  <div className="flex flex-col items-center md:items-end gap-4 md:min-w-[120px]">
                    <motion.div
                      className="text-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="text-2xl font-bold text-indigo-400">{paper.citations}</div>
                      <div className="text-sm text-gray-400">Citations</div>
                    </motion.div>

                    <motion.div
                      className="text-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="text-lg font-semibold text-gray-300">{paper.year}</div>
                      <div className="text-sm text-gray-400">Year</div>
                    </motion.div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                  <div className="flex flex-wrap gap-3">
                    <motion.a
                      href={paper.link}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2"
                    >
                      📄 Read Paper
                    </motion.a>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2"
                    >
                      📋 Cite
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2"
                    >
                      💾 BibTeX
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-16"
        >
          <div className="mb-6">
            <p className="text-gray-400 mb-4">
              Interested in collaboration or have questions about my research?
            </p>
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0 10px 30px rgba(99, 102, 241, 0.3)' 
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300"
            >
              Contact Me for Research Collaboration
            </motion.button>
          </div>
          
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <motion.span 
              whileHover={{ scale: 1.1, color: '#6366f1' }}
              className="cursor-pointer"
            >
              📚 Google Scholar
            </motion.span>
            <motion.span 
              whileHover={{ scale: 1.1, color: '#6366f1' }}
              className="cursor-pointer"
            >
              🔬 ResearchGate
            </motion.span>
            <motion.span 
              whileHover={{ scale: 1.1, color: '#6366f1' }}
              className="cursor-pointer"
            >
              🎓 ORCID
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Publications;
