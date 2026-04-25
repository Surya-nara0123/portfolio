'use client';

import { motion, useInView, useMotionValue, useAnimationFrame } from 'framer-motion';
import { useRef, useState, memo } from 'react';

// 3D Skill Card Component
const SkillCard3D = memo(({ skill, delay }: {
  skill: { name: string; icon: string; level: number; color: string };
  delay: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const isInView = useInView(ref, { once: true });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotation({
      x: (y - centerY) / 12,
      y: (centerX - x) / 12,
    });
  };

  const handleMouseLeave = () => setRotation({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      className="perspective-1000"
      initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
      animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : { opacity: 0, scale: 0.5, rotateY: 90 }}
      transition={{ delay, duration: 0.6, type: 'spring', stiffness: 100, damping: 15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d', rotateX: rotation.x, rotateY: rotation.y }}
    >
      <motion.div
        whileHover={{ scale: 1.1, z: 50 }}
        className={`relative bg-gradient-to-br ${skill.color} p-6 rounded-2xl shadow-xl overflow-hidden group cursor-pointer`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="flex flex-col items-center text-center relative z-10">
          <motion.div
            className="text-5xl mb-3"
            whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            {skill.icon}
          </motion.div>
          <h4 className="text-white font-bold text-lg mb-2">{skill.name}</h4>
          <div className="w-full bg-black/30 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-white/80 rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
              transition={{ delay: delay + 0.3, duration: 1, ease: 'easeOut' }}
            />
          </div>
          <span className="text-white/60 text-sm mt-1">{skill.level}%</span>
        </div>
      </motion.div>
    </motion.div>
  );
});

SkillCard3D.displayName = 'SkillCard3D';

// Category Header Component
const CategoryHeader = memo(({ category, index, isInView }: {
  category: { name: string; icon: string; color: string; gradient: string };
  index: number;
  isInView: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
    animate={isInView ? { opacity: 1, x: 0 } : {}}
    transition={{ delay: index * 0.2, duration: 0.8, ease: 'easeOut' }}
    className="flex items-center gap-4 mb-8"
  >
    <motion.div
      whileHover={{ scale: 1.1, rotate: 360 }}
      transition={{ duration: 0.8, type: 'spring' }}
      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg`}
    >
      <span className="text-3xl">{category.icon}</span>
    </motion.div>
    <div>
      <h3 className={`text-3xl font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
        {category.name}
      </h3>
      <div className={`h-1 w-20 bg-gradient-to-r ${category.gradient} rounded-full`} />
    </div>
  </motion.div>
));

CategoryHeader.displayName = 'CategoryHeader';

// Floating Tool Badge
const FloatingTool = ({ tool, index }: { tool: string; index: number }) => {
  const y = useMotionValue(0);
  const x = useMotionValue(0);

  useAnimationFrame((t) => {
    y.set(Math.sin(t / 1000 + index) * 10);
    x.set(Math.cos(t / 1500 + index) * 5);
  });

  return (
    <motion.div
      style={{ y, x }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.2, y: -5 }}
      className="px-5 py-2.5 bg-gray-800/80 backdrop-blur-sm rounded-full text-gray-300 border border-gray-700 cursor-default font-medium hover:border-purple-500/50 transition-all duration-300"
    >
      {tool}
    </motion.div>
  );
};

const TechnicalSkills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const categories = [
    {
      name: 'Frontend',
      icon: '💻',
      color: 'from-violet-500 to-purple-600',
      gradient: 'from-violet-500 via-purple-500 to-purple-600',
      skills: [
        { name: 'React', icon: '⚛️', level: 90, color: 'from-blue-600 to-blue-800' },
        { name: 'Next.js', icon: '▲', level: 88, color: 'from-gray-700 to-gray-900' },
        { name: 'TypeScript', icon: '📘', level: 85, color: 'from-blue-500 to-indigo-600' },
        { name: 'Tailwind CSS', icon: '🎨', level: 92, color: 'from-cyan-500 to-teal-600' },
        { name: 'Framer Motion', icon: '✨', level: 80, color: 'from-pink-500 to-purple-600' },
        { name: 'HTML/CSS', icon: '🌐', level: 95, color: 'from-orange-500 to-red-600' },
      ],
    },
    {
      name: 'Backend',
      icon: '⚙️',
      color: 'from-emerald-500 to-teal-600',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
      skills: [
        { name: 'Node.js', icon: '🟢', level: 88, color: 'from-green-600 to-emerald-800' },
        { name: 'Python', icon: '🐍', level: 82, color: 'from-yellow-500 to-amber-600' },
        { name: 'Go', icon: '🔵', level: 75, color: 'from-cyan-600 to-blue-700' },
        { name: 'Express', icon: '🚀', level: 90, color: 'from-gray-600 to-gray-800' },
        { name: 'FastAPI', icon: '⚡', level: 78, color: 'from-green-500 to-teal-600' },
        { name: 'GraphQL', icon: '📊', level: 72, color: 'from-pink-500 to-rose-600' },
      ],
    },
    {
      name: 'Database',
      icon: '🗄️',
      color: 'from-rose-500 to-pink-600',
      gradient: 'from-rose-500 via-pink-500 to-fuchsia-600',
      skills: [
        { name: 'PostgreSQL', icon: '🐘', level: 85, color: 'from-blue-600 to-indigo-800' },
        { name: 'MongoDB', icon: '🍃', level: 88, color: 'from-green-600 to-emerald-800' },
        { name: 'Prisma', icon: '💎', level: 82, color: 'from-indigo-500 to-purple-700' },
        { name: 'Firebase', icon: '🔥', level: 80, color: 'from-yellow-500 to-orange-600' },
        { name: 'Redis', icon: '🔴', level: 75, color: 'from-red-600 to-red-800' },
        { name: 'SQL', icon: '📋', level: 85, color: 'from-blue-500 to-cyan-600' },
      ],
    },
    {
      name: 'DevOps',
      icon: '🔧',
      color: 'from-amber-500 to-orange-600',
      gradient: 'from-amber-500 via-orange-500 to-red-600',
      skills: [
        { name: 'Git', icon: '📚', level: 92, color: 'from-orange-500 to-red-600' },
        { name: 'Docker', icon: '🐳', level: 85, color: 'from-blue-500 to-cyan-600' },
        { name: 'AWS', icon: '☁️', level: 72, color: 'from-yellow-500 to-orange-600' },
        { name: 'Linux', icon: '🐧', level: 80, color: 'from-gray-600 to-gray-800' },
        { name: 'CI/CD', icon: '🔄', level: 78, color: 'from-green-500 to-teal-600' },
        { name: 'Nginx', icon: '⚡', level: 75, color: 'from-green-600 to-emerald-800' },
      ],
    },
  ];

  const tools = ['Vite', 'Figma', 'Postman', 'VS Code', 'Jupyter', 'Linux', 'NPM', 'Vercel', 'GitHub', 'Notion', 'Slack', 'Docker Compose'];

  return (
    <section
      id="skills"
      className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
          transition={{ duration: 20, repeat: Infinity, delay: 10 }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
            className="inline-block mb-6"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/30">
              <span className="text-5xl">🛠️</span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-gray-400 bg-clip-text text-transparent"
          >
            Tech Arsenal
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-gray-400 text-xl max-w-2xl mx-auto"
          >
            Technologies I use to bring ideas to life
          </motion.p>
        </motion.div>

        {/* Skills Categories */}
        <div className="space-y-20">
          {categories.map((category, categoryIndex) => (
            <div key={category.name}>
              <CategoryHeader
                category={category}
                index={categoryIndex}
                isInView={isInView}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: categoryIndex * 0.2 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
              >
                {category.skills.map((skill, skillIndex) => (
                  <SkillCard3D
                    key={skill.name}
                    skill={skill}
                    delay={categoryIndex * 0.2 + skillIndex * 0.1}
                  />
                ))}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Additional Tools */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-24 text-center"
        >
          <h3 className="text-3xl font-bold mb-8 text-white">Daily Toolkit</h3>
          <p className="text-gray-500 mb-8">Other tools I work with regularly</p>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {tools.map((tool, index) => (
              <FloatingTool key={tool} tool={tool} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnicalSkills;
