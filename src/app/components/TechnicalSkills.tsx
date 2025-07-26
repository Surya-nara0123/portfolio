'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface SkillItem {
  name: string;
  icon: string;
}

interface SkillCategory {
  category: string;
  color: string;
  accent: string;
  items: SkillItem[];
}

const TechnicalSkills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const skills: SkillCategory[] = [
    {
      category: 'Frontend',
      color: 'from-violet-500 via-indigo-500 to-purple-600',
      accent: 'border-violet-400/30',
      items: [
        { name: 'React', icon: '⚛️' },
        { name: 'Next.js', icon: '🔺' },
        { name: 'TypeScript', icon: '📘' },
        { name: 'Tailwind CSS', icon: '🎨' },
        { name: 'Framer Motion', icon: '✨' },
        { name: 'Liquid Templates', icon: '🛍️' },
      ]
    },
    {
      category: 'Backend',
      color: 'from-emerald-500 via-teal-500 to-cyan-600',
      accent: 'border-emerald-400/30',
      items: [
        { name: 'Node.js', icon: '🟢' },
        { name: 'Python', icon: '🐍' },
        { name: 'Express.js', icon: '🚀' },
        { name: 'Django', icon: '🎯' },
        { name: 'GraphQL', icon: '📊' },
        { name: 'Shopify App Dev', icon: '🛍️' }
      ]
    },
    {
      category: 'Database',
      color: 'from-rose-500 via-pink-500 to-fuchsia-600',
      accent: 'border-rose-400/30',
      items: [
        { name: 'PostgreSQL', icon: '🐘' },
        { name: 'Prisma', icon: '💎' },
        { name: 'MongoDB', icon: '🍃' },
        { name: 'Firebase', icon: '🔥' },
        { name: 'Redis', icon: '🔴' }
      ]
    },
    {
      category: 'DevOps',
      color: 'from-amber-500 via-orange-500 to-red-600',
      accent: 'border-amber-400/30',
      items: [
        { name: 'Git', icon: '📚' },
        { name: 'Docker', icon: '🐳' },
        { name: 'CI/CD', icon: '🔄' },
        { name: 'Kubernetes', icon: '⚓' },
        { name: 'AWS', icon: '☁️' },
      ]
    }
  ];

  const SkillCard = ({ skill, delay = 0 }: { 
    skill: SkillItem; 
    delay?: number; 
  }) => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
        animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.8, rotateY: 90 }}
        transition={{ 
          delay: delay / 1000, 
          duration: 0.6, 
          ease: [0.23, 1, 0.32, 1],
          type: "spring",
          stiffness: 100
        }}
        whileHover={{ 
          scale: 1.08, 
          rotateX: 5,
          z: 50
        }}
        className="group relative perspective-1000"
      >
        <div className="relative bg-slate-800/70 backdrop-blur-md rounded-xl p-4 border border-slate-600/40 shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:border-slate-500/60">
          <div className="flex flex-col items-center text-center space-y-2">
            <motion.div 
              className="text-3xl"
              whileHover={{ 
                scale: 1.4, 
                rotate: [0, -10, 10, 0],
                transition: { duration: 0.5 }
              }}
            >
              {skill.icon}
            </motion.div>
            <span className="text-slate-200 font-semibold text-sm tracking-wide">
              {skill.name}
            </span>
          </div>
          
          {/* Animated border */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
        </div>
      </motion.div>
    );
  };

  const CategorySection = ({ category, index }: { category: SkillCategory; index: number }) => {
    return (
      <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
        transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        {/* Category Header */}
        <div className="flex items-center mb-8">
          <motion.div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg mr-6`}
            whileHover={{ 
              scale: 1.1, 
              rotate: 360,
              transition: { duration: 0.8 }
            }}
          >
            <span className="text-white text-2xl font-bold">
              {category.category.charAt(0)}
            </span>
          </motion.div>
          <div>
            <h3 className={`text-2xl font-bold bg-gradient-to-r ${category.color} bg-clip-text text-transparent mb-1`}>
              {category.category}
            </h3>
            <div className={`h-1 w-20 bg-gradient-to-r ${category.color} rounded-full`} />
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {category.items.map((skill, skillIndex) => (
            <SkillCard 
              key={skill.name} 
              skill={skill} 
              delay={index * 300 + skillIndex * 100} 
            />
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <section className="min-h-screen bg-gray-950/30 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
            className="inline-block mb-6"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl">
              <span className="text-4xl">🛠️</span>
            </div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent"
          >
            Tech Arsenal
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Crafting digital experiences with cutting-edge technologies and modern development practices
          </motion.p>
        </motion.div>

        {/* Skills Categories */}
        <div className="space-y-16">
          {skills.map((category, index) => (
            <CategorySection 
              key={category.category} 
              category={category} 
              index={index} 
            />
          ))}
        </div>

        {/* Additional Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-24 text-center"
        >
          <h3 className="text-3xl font-bold mb-8 text-slate-200">
            Daily Toolkit
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Vite', 'Figma', 'Postman', 'Slack', 'Linux'
            ].map((tool, index) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, scale: 0, rotate: 180 }}
                animate={isInView ? { 
                  opacity: 1, 
                  scale: 1, 
                  rotate: 0 
                } : { 
                  opacity: 0, 
                  scale: 0, 
                  rotate: 180 
                }}
                transition={{ 
                  delay: 1.3 + index * 0.1,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 150
                }}
                whileHover={{ 
                  scale: 1.2, 
                  boxShadow: '0 10px 30px rgba(168, 85, 247, 0.4)'
                }}
                whileTap={{ rotate: 5 }}
                className="px-6 py-3 bg-slate-800/80 backdrop-blur-sm rounded-full text-slate-300 border border-slate-600/50 cursor-default font-medium hover:border-purple-400/50 transition-all duration-300 hover:text-white"
              >
                {tool}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnicalSkills;