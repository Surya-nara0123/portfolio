'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Animated Number Component
const AnimatedNumber = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const startTime = Date.now();

      const step = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 4);
        start = Math.floor(easeOut * end);
        setDisplay(start);

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    }
  }, [isInView, value]);

  return <span ref={ref}>{display}{suffix}</span>;
};

// Skill Bar Component
const SkillBar = ({ name, level, delay, color }: { name: string; level: number; delay: number; color: string }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(level), delay * 1000);
    return () => clearTimeout(timer);
  }, [level, delay]);

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-gray-300 font-medium">{name}</span>
        <span className="text-gray-500">{level}%</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

const ProfileSummary = () => {
  const stats = [
    { label: 'Projects Completed', value: 15, suffix: '+', color: 'from-blue-400 to-cyan-400', icon: '🚀' },
    { label: 'Technologies Mastered', value: 20, suffix: '+', color: 'from-purple-400 to-pink-400', icon: '⚡' },
    { label: 'Coffee Cups', value: 999, suffix: '+', color: 'from-orange-400 to-red-400', icon: '☕' },
    { label: 'Bugs Squashed', value: 500, suffix: '+', color: 'from-green-400 to-emerald-400', icon: '🐛' },
  ];

  const skills = [
    { name: 'React / Next.js', level: 90, color: 'from-blue-500 to-cyan-500' },
    { name: 'TypeScript', level: 85, color: 'from-blue-600 to-indigo-600' },
    { name: 'Node.js / Go', level: 80, color: 'from-green-500 to-emerald-500' },
    { name: 'Python / AI', level: 75, color: 'from-yellow-500 to-orange-500' },
    { name: 'Docker / DevOps', level: 70, color: 'from-cyan-500 to-blue-500' },
    { name: 'MongoDB / PostgreSQL', level: 85, color: 'from-purple-500 to-pink-500' },
  ];

  const traits = [
    'Problem Solver', 'Clean Code', 'Fast Learner', 'Team Player',
    'Detail-Oriented', 'Innovative', 'Self-Motivated', 'Adaptable',
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-black relative">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mb-8 rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left column - Bio & Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Bio Card - simple, no 3D */}
            <div className="bg-gray-900/80 p-8 rounded-3xl border border-gray-800">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl">👨‍💻</span>
                <h3 className="text-2xl font-bold text-white">Who I Am</h3>
              </div>

              <p className="text-gray-300 leading-relaxed mb-4 text-lg">
                I&apos;m <span className="text-white font-semibold">Surya Narayanan</span>, a passionate Full Stack Developer currently pursuing my B.Tech in Computer Science at Shiv Nadar University Chennai (graduating 2027).
              </p>
              <p className="text-gray-400 leading-relaxed">
                I specialize in building scalable web applications and exploring the intersection of technology and creativity. My journey involves continuous learning and creating impactful software solutions.
              </p>
            </div>

            {/* Skills Card */}
            <div className="bg-gray-900/80 p-8 rounded-3xl border border-gray-800">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl">📊</span>
                <h3 className="text-2xl font-bold text-white">Skill Proficiency</h3>
              </div>

              <div className="space-y-1">
                {skills.map((skill, index) => (
                  <SkillBar key={skill.name} {...skill} delay={index * 0.15} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right column - Stats & Traits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-8"
          >
            {/* Central element - static avatar */}
            <div className="relative h-40 flex items-center justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50">
                <span className="text-5xl">👨‍💻</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="bg-gray-900/80 p-6 rounded-2xl border border-gray-800 text-center hover:border-gray-700 transition-all duration-300"
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Traits Section - simple static pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="text-3xl font-bold mb-4 text-white">What Drives Me</h3>
          <p className="text-gray-500 mb-8">Core values that shape my work</p>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {traits.map((trait, index) => (
              <motion.span
                key={trait}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="px-5 py-2.5 bg-gray-800/80 rounded-full text-gray-300 border border-gray-700/50 cursor-default hover:border-purple-500/50 transition-all duration-300"
              >
                {trait}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Education Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <div className="bg-gray-900/80 p-6 rounded-2xl border border-gray-800">
            <div className="flex items-center gap-4">
              <span className="text-4xl">🎓</span>
              <div>
                <h4 className="text-xl font-bold text-white">B.Tech Computer Science</h4>
                <p className="text-gray-400">Shiv Nadar University Chennai</p>
                <p className="text-gray-500 text-sm">Expected Graduation: 2027</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProfileSummary;