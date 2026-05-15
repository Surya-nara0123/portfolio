'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const Hobbies = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
    },
  ];

  return (
    <section id="hobbies" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent">
              Hobbies & Interests
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto mb-8" />
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Beyond coding, these activities fuel my creativity and keep me balanced
          </motion.p>
        </motion.div>

        {/* Hobbies grid - simple cards, no flip animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {hobbies.map((hobby, index) => (
            <motion.div
              key={hobby.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-gray-900/80 rounded-2xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-all duration-300"
            >
              <div className="p-8 h-full flex flex-col items-center justify-center text-center">
                <span className="text-5xl mb-6">{hobby.icon}</span>
                <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent`}>
                  {hobby.title}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {hobby.description}
                </p>
                <ul className="space-y-2 w-full">
                  {hobby.details.map((detail, detailIndex) => (
                    <li
                      key={detailIndex}
                      className="flex items-center text-gray-400 text-sm"
                    >
                      <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${hobby.color} mr-3 flex-shrink-0`} />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Fun stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + index * 0.05 }}
                className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800"
              >
                <div className="text-3xl mb-2">{stat.emoji}</div>
                <div className="text-xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quote - simple static text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
          className="mt-16 text-center"
        >
          <blockquote className="text-xl md:text-2xl text-gray-300 italic max-w-3xl mx-auto">
            &ldquo;The best way to predict the future is to create it, but don&apos;t forget to enjoy the journey.&rdquo;
          </blockquote>
          <p className="text-gray-500 mt-4">
            - My life philosophy
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hobbies;