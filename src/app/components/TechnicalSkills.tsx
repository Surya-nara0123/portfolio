'use client';

import { motion } from 'framer-motion';

// Simple skill card without 3D effects
const SkillCard = ({ skill, delay }: {
  skill: { name: string; icon: string; level: number; color: string };
  delay: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className={`relative bg-gradient-to-br ${skill.color} p-6 rounded-2xl shadow-xl overflow-hidden group cursor-pointer`}
    >
      <div className="flex flex-col items-center text-center relative z-10">
        <span className="text-5xl mb-3">{skill.icon}</span>
        <h4 className="text-white font-bold text-lg mb-2">{skill.name}</h4>
        <div className="w-full bg-black/30 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-white/80 rounded-full"
            style={{ width: `${skill.level}%` }}
          />
        </div>
        <span className="text-white/60 text-sm mt-1">{skill.level}%</span>
      </div>
    </motion.div>
  );
};

// Category Header Component
const CategoryHeader = ({ category, index }: {
  category: { name: string; icon: string; color: string; gradient: string };
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="flex items-center gap-4 mb-8"
  >
    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg`}>
      <span className="text-3xl">{category.icon}</span>
    </div>
    <div>
      <h3 className={`text-3xl font-bold bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
        {category.name}
      </h3>
      <div className={`h-1 w-20 bg-gradient-to-r ${category.gradient} rounded-full`} />
    </div>
  </motion.div>
);

const TechnicalSkills = () => {
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
    <section id="skills" className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 bg-black relative">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/30">
              <span className="text-5xl">🛠️</span>
            </div>
          </div>

          <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-gray-400 bg-clip-text text-transparent">
            Tech Arsenal
          </h2>

          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Technologies I use to bring ideas to life
          </p>
        </motion.div>

        {/* Skills Categories */}
        <div className="space-y-20">
          {categories.map((category, categoryIndex) => (
            <div key={category.name}>
              <CategoryHeader
                category={category}
                index={categoryIndex}
              />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    delay={categoryIndex * 0.1 + skillIndex * 0.05}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Tools */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-24 text-center"
        >
          <h3 className="text-3xl font-bold mb-8 text-white">Daily Toolkit</h3>
          <p className="text-gray-500 mb-8">Other tools I work with regularly</p>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {tools.map((tool) => (
              <span
                key={tool}
                className="px-5 py-2.5 bg-gray-800/80 backdrop-blur-sm rounded-full text-gray-300 border border-gray-700 cursor-default font-medium hover:border-purple-500/50 transition-all duration-300"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnicalSkills;