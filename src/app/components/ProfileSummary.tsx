'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const ProfileSummary = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950/50">
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
              About Me
            </span>
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto mb-8"
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-black/50 p-8 rounded-2xl border border-gray-800 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-semibold mb-4 text-gray-300">Professional Summary</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                I am a passionate Full Stack Developer with expertise in modern web technologies 
                and a strong foundation in software engineering principles. With experience in 
                both frontend and backend development, I enjoy creating scalable and user-friendly applications.
              </p>
              <p className="text-gray-300 leading-relaxed">
                My journey in technology has been driven by curiosity and a desire to solve 
                real-world problems through innovative solutions. I thrive in collaborative 
                environments and am always eager to learn new technologies and methodologies.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-black/50 p-6 rounded-2xl border border-gray-800 backdrop-blur-sm"
            >
              <h4 className="text-xl font-semibold mb-3 text-gray-300">Current Focus</h4>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center">
                  <motion.div
                    className="w-2 h-2 bg-gray-400 rounded-full mr-3"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  Advanced React and Next.js development
                </li>
                <li className="flex items-center">
                  <motion.div
                    className="w-2 h-2 bg-gray-500 rounded-full mr-3"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                  Cloud architecture and deployment
                </li>
                <li className="flex items-center">
                  <motion.div
                    className="w-2 h-2 bg-gray-600 rounded-full mr-3"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                  Machine Learning and AI integration
                </li>
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { label: 'Projects Completed', value: '3+', color: 'from-gray-500 to-gray-700' },
              { label: 'Technologies Mastered', value: '20+', color: 'from-gray-600 to-gray-800' },
              { label: 'Certifications', value: '2+', color: 'from-gray-700 to-gray-900' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black/70 p-6 rounded-2xl border border-gray-800 text-center backdrop-blur-sm"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <motion.div
                  className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, type: 'spring', stiffness: 200 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Personality traits */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1.2 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-semibold text-center mb-8 text-gray-300">
            What Drives Me
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Problem Solving', 'Innovation', 'Collaboration', 'Continuous Learning',
              'User Experience', 'Clean Code', 'Scalability', 'Performance'
            ].map((trait, index) => (
              <motion.span
                key={trait}
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                className="px-4 py-2 bg-gray-900 rounded-full text-gray-300 border border-gray-700 cursor-default"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: 1.3 + index * 0.1, type: 'spring', stiffness: 200 }}
              >
                {trait}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProfileSummary;
