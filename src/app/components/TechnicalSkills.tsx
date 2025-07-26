'use client';

import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';

interface SkillItem {
  name: string;
  level: number;
  icon: string;
}

interface SkillCategory {
  category: string;
  color: string;
  items: SkillItem[];
}

const TechnicalSkills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skills: SkillCategory[] = [
    {
      category: 'Frontend',
      color: 'from-blue-400 to-cyan-400',
      items: [
        { name: 'React', level: 95, icon: '⚛️' },
        { name: 'Next.js', level: 90, icon: '🔺' },
        { name: 'TypeScript', level: 88, icon: '📘' },
        { name: 'Tailwind CSS', level: 92, icon: '🎨' },
        { name: 'Framer Motion', level: 85, icon: '✨' }
      ]
    },
    {
      category: 'Backend',
      color: 'from-green-400 to-emerald-400',
      items: [
        { name: 'Node.js', level: 90, icon: '🟢' },
        { name: 'Python', level: 85, icon: '🐍' },
        { name: 'Express.js', level: 88, icon: '🚀' },
        { name: 'Django', level: 80, icon: '🎯' },
        { name: 'GraphQL', level: 75, icon: '📊' }
      ]
    },
    {
      category: 'Database',
      color: 'from-purple-400 to-pink-400',
      items: [
        { name: 'PostgreSQL', level: 85, icon: '🐘' },
        { name: 'MongoDB', level: 88, icon: '🍃' },
        { name: 'Redis', level: 80, icon: '🔴' },
        { name: 'Prisma', level: 82, icon: '💎' },
        { name: 'Firebase', level: 78, icon: '🔥' }
      ]
    },
    {
      category: 'DevOps',
      color: 'from-orange-400 to-red-400',
      items: [
        { name: 'Docker', level: 85, icon: '🐳' },
        { name: 'AWS', level: 80, icon: '☁️' },
        { name: 'Git', level: 95, icon: '📚' },
        { name: 'CI/CD', level: 82, icon: '🔄' },
        { name: 'Kubernetes', level: 75, icon: '⚓' }
      ]
    }
  ];

  const SkillBar = ({ skill, delay = 0 }: { skill: SkillItem; delay?: number }) => {
    const progress = useMotionValue(0);
    const springProgress = useSpring(progress, { stiffness: 100, damping: 30 });
    const width = useTransform(springProgress, [0, 100], ['0%', '100%']);

    useEffect(() => {
      if (isInView) {
        const timer = setTimeout(() => {
          progress.set(skill.level);
        }, delay);
        return () => clearTimeout(timer);
      }
    }, [isInView, skill.level, delay, progress]);

    return (
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ delay: delay / 1000, duration: 0.6 }}
        className="group"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">{skill.icon}</span>
            <span className="text-white font-medium">{skill.name}</span>
          </div>
          <motion.span 
            className="text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: delay / 1000 + 0.5 }}
          >
            {skill.level}%
          </motion.span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-gray-500 to-gray-700 rounded-full relative"
            style={{ width }}
          >
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-full"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: 'loop',
                ease: 'linear' 
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    );
  };

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
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
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
              Technical Skills
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
            Technologies and tools I use to bring ideas to life
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {skills.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              transition={{ delay: categoryIndex * 0.2 }}
              className="group"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800 backdrop-blur-sm"
              >
                <motion.div
                  className="flex items-center gap-3 mb-8"
                  whileHover={{ x: 10 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <motion.div
                    className={`w-4 h-4 rounded-full bg-gradient-to-r ${category.color}`}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      delay: categoryIndex * 0.5
                    }}
                  />
                  <h3 className={`text-2xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                    {category.category}
                  </h3>
                </motion.div>

                <div className="space-y-6">
                  {category.items.map((skill, skillIndex) => (
                    <SkillBar 
                      key={skill.name} 
                      skill={skill} 
                      delay={categoryIndex * 500 + skillIndex * 200} 
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Additional skills cloud */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1.2 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-semibold mb-8 text-gray-300">
            Other Technologies & Tools
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Webpack', 'Vite', 'Jest', 'Cypress', 'Figma', 'Adobe XD',
              'Postman', 'Jira', 'Slack', 'Linux', 'Nginx', 'Jenkins'
            ].map((tech, index) => (
              <motion.span
                key={tech}
                whileHover={{ 
                  scale: 1.2, 
                  rotate: Math.random() * 20 - 10,
                  backgroundColor: 'rgba(59, 130, 246, 0.2)' 
                }}
                className="px-4 py-2 bg-gray-800 rounded-full text-gray-300 border border-gray-600 cursor-default"
                initial={{ opacity: 0, scale: 0, rotate: Math.random() * 360 }}
                animate={isInView ? { 
                  opacity: 1, 
                  scale: 1, 
                  rotate: 0 
                } : { 
                  opacity: 0, 
                  scale: 0, 
                  rotate: Math.random() * 360 
                }}
                transition={{ 
                  delay: 1.3 + index * 0.1, 
                  type: 'spring', 
                  stiffness: 200,
                  damping: 15
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Skill level legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-8 bg-gray-800/30 px-6 py-3 rounded-full border border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-red-400 to-red-600 rounded-full"></div>
              <span className="text-sm text-gray-400">Beginner (0-60%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
              <span className="text-sm text-gray-400">Intermediate (60-80%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
              <span className="text-sm text-gray-400">Advanced (80%+)</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnicalSkills;
