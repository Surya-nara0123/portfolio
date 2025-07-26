'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const Hobbies = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeHobby, setActiveHobby] = useState<number | null>(null);

  const hobbies = [
    {
      id: 1,
      title: 'Music Production',
      icon: '🎵',
      description: 'Creating electronic music and beats using digital audio workstations. I love experimenting with different genres and sound design.',
      details: [
        'FL Studio & Ableton Live',
        'Synthesizer Programming',
        'Audio Mixing & Mastering',
        'Live Performance Setup'
      ],
      color: 'from-pink-400 to-rose-500',
      bgPattern: 'radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(251, 113, 133, 0.3) 0%, transparent 50%)',
    },
    {
      id: 2,
      title: 'Photography',
      icon: '📸',
      description: 'Capturing moments and exploring visual storytelling through street, landscape, and portrait photography.',
      details: [
        'Street Photography',
        'Portrait Sessions',
        'Landscape Shots',
        'Photo Editing (Lightroom)'
      ],
      color: 'from-blue-400 to-cyan-500',
      bgPattern: 'radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(34, 211, 238, 0.3) 0%, transparent 50%)',
    },
    {
      id: 3,
      title: 'Gaming',
      icon: '🎮',
      description: 'Passionate gamer who enjoys strategy games, RPGs, and indie titles. Also interested in game development as a hobby.',
      details: [
        'Strategic & RPG Games',
        'Indie Game Discovery',
        'Game Development (Unity)',
        'Competitive Gaming'
      ],
      color: 'from-purple-400 to-indigo-500',
      bgPattern: 'radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)',
    },
    {
      id: 4,
      title: 'Fitness & Sports',
      icon: '💪',
      description: 'Staying active through gym workouts, running, and playing badminton. Fitness helps me maintain focus and energy.',
      details: [
        'Weight Training',
        'Running & Cardio',
        'Badminton',
        'Yoga & Stretching'
      ],
      color: 'from-green-400 to-emerald-500',
      bgPattern: 'radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.3) 0%, transparent 50%)',
    },
    {
      id: 5,
      title: 'Reading',
      icon: '📚',
      description: 'Avid reader of tech blogs, science fiction novels, and philosophy. Always learning something new.',
      details: [
        'Science Fiction Novels',
        'Tech Articles & Blogs',
        'Philosophy Books',
        'Self-Development'
      ],
      color: 'from-orange-400 to-red-500',
      bgPattern: 'radial-gradient(circle at 20% 80%, rgba(251, 146, 60, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(239, 68, 68, 0.3) 0%, transparent 50%)',
    },
    {
      id: 6,
      title: 'Travel',
      icon: '✈️',
      description: 'Exploring new places, cultures, and cuisines. Travel inspires creativity and broadens perspectives.',
      details: [
        'Cultural Exploration',
        'Local Cuisine',
        'Nature Photography',
        'Adventure Activities'
      ],
      color: 'from-teal-400 to-blue-500',
      bgPattern: 'radial-gradient(circle at 20% 80%, rgba(45, 212, 191, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, rotateX: -15 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <section id="hobbies" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
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
              Hobbies & Interests
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
            Beyond coding, these activities fuel my creativity and keep me balanced
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {hobbies.map((hobby, index) => (
            <motion.div
              key={hobby.id}
              variants={itemVariants}
              className="group relative perspective-1000"
              onMouseEnter={() => setActiveHobby(index)}
              onMouseLeave={() => setActiveHobby(null)}
            >
              <motion.div
                className="relative h-80 preserve-3d cursor-pointer"
                whileHover={{ 
                  rotateY: activeHobby === index ? 180 : 0,
                  scale: 1.05
                }}
                transition={{ 
                  duration: 0.6,
                  type: 'spring',
                  stiffness: 100,
                  damping: 15
                }}
              >
                {/* Front of card */}
                <motion.div
                  className="absolute inset-0 backface-hidden rounded-2xl border border-gray-700 overflow-hidden"
                  style={{
                    background: hobby.bgPattern,
                  }}
                >
                  <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
                  <div className="relative z-10 p-8 h-full flex flex-col items-center justify-center text-center">
                    <motion.div
                      className="text-6xl mb-6"
                      animate={{ 
                        rotate: activeHobby === index ? [0, 10, -10, 0] : 0,
                        scale: activeHobby === index ? [1, 1.2, 1] : 1
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {hobby.icon}
                    </motion.div>
                    <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent`}>
                      {hobby.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {hobby.description}
                    </p>
                    <motion.div
                      className="mt-6 text-sm text-gray-400"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Hover to learn more →
                    </motion.div>
                  </div>
                </motion.div>

                {/* Back of card */}
                <motion.div
                  className="absolute inset-0 backface-hidden rounded-2xl border border-gray-700 overflow-hidden"
                  style={{
                    background: hobby.bgPattern,
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                  <div className="relative z-10 p-8 h-full flex flex-col justify-center">
                    <motion.div
                      className="text-4xl mb-4 text-center"
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                    >
                      {hobby.icon}
                    </motion.div>
                    <h3 className={`text-xl font-bold mb-6 text-center bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent`}>
                      What I Do
                    </h3>
                    <ul className="space-y-3">
                      {hobby.details.map((detail, detailIndex) => (
                        <motion.li
                          key={detailIndex}
                          className="flex items-center text-gray-300"
                          initial={{ opacity: 0, x: -20 }}
                          animate={activeHobby === index ? { 
                            opacity: 1, 
                            x: 0 
                          } : { 
                            opacity: 0, 
                            x: -20 
                          }}
                          transition={{ 
                            delay: detailIndex * 0.1,
                            duration: 0.3
                          }}
                        >
                          <motion.span
                            className={`w-2 h-2 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 mr-3 flex-shrink-0`}
                            animate={{ 
                              scale: [1, 1.3, 1],
                              opacity: [0.7, 1, 0.7]
                            }}
                            transition={{ 
                              duration: 2, 
                              repeat: Infinity,
                              delay: detailIndex * 0.2
                            }}
                          />
                          {detail}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Fun stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1.2 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-semibold mb-8 text-gray-300">
            Life Beyond Code
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { emoji: '🎵', label: 'Songs Produced', value: '50+' },
              { emoji: '📸', label: 'Photos Taken', value: '2K+' },
              { emoji: '📚', label: 'Books Read', value: '100+' },
              { emoji: '✈️', label: 'Cities Visited', value: '25+' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: Math.random() * 10 - 5 
                }}
                className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ 
                  delay: 1.4 + index * 0.1,
                  type: 'spring',
                  stiffness: 200,
                  damping: 15
                }}
              >
                <motion.div
                  className="text-3xl mb-2"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                >
                  {stat.emoji}
                </motion.div>
                <div className="text-xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.8 }}
          className="mt-16 text-center"
        >
          <motion.blockquote
            className="text-xl md:text-2xl text-gray-300 italic max-w-3xl mx-auto"
            animate={{ 
              background: [
                'linear-gradient(45deg, #f59e0b, #ef4444, #8b5cf6, #06b6d4)',
                'linear-gradient(45deg, #ef4444, #8b5cf6, #06b6d4, #f59e0b)',
                'linear-gradient(45deg, #8b5cf6, #06b6d4, #f59e0b, #ef4444)',
                'linear-gradient(45deg, #06b6d4, #f59e0b, #ef4444, #8b5cf6)',
              ]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            style={{
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '400% 400%',
            }}
          >
            The best way to predict the future is to create it, but dont forget to enjoy the journey.
          </motion.blockquote>
          <motion.p
            className="text-gray-500 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
          >
            - My life philosophy
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hobbies;
