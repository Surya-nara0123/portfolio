'use client';

import { motion, useInView, useScroll, useTransform, useMotionValue, useAnimationFrame } from 'framer-motion';
import { useRef, useState, memo, useEffect } from 'react';

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
        } else {
          setDisplay(end);
        }
      };

      requestAnimationFrame(step);
    }
  }, [isInView, value]);

  return <span ref={ref}>{display}{suffix}</span>;
};

// Skill Bar Component
const SkillBar = ({ name, level, delay, color }: { name: string; level: number; delay: number; color: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isInView) {
      setTimeout(() => setWidth(level), delay * 1000);
    }
  }, [isInView, level, delay]);

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-gray-300 font-medium">{name}</span>
        <span className="text-gray-500">{level}%</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: delay }}
        />
      </div>
    </div>
  );
};

// Orbiting Badge Component
const OrbitingBadge = ({ icon, label, orbitRadius, speed, delay }: {
  icon: string;
  label: string;
  orbitRadius: number;
  speed: number;
  delay: number;
}) => {
  const angle = useMotionValue(0);
  const x = useTransform(angle, (v) => Math.cos(v) * orbitRadius);
  const y = useTransform(angle, (v) => Math.sin(v) * orbitRadius);

  useAnimationFrame((t) => {
    angle.set((t / 1000) * speed + delay);
  });

  return (
    <motion.div
      className="absolute"
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 + delay / 5, duration: 0.5 }}
    >
      <motion.div
        whileHover={{ scale: 1.3, rotate: 10 }}
        className="flex flex-col items-center gap-1"
      >
        <span className="text-3xl">{icon}</span>
        <span className="text-xs text-gray-400 bg-gray-900/80 px-2 py-1 rounded-full whitespace-nowrap">{label}</span>
      </motion.div>
    </motion.div>
  );
};

// Trait Pill Component
const Trait = memo(({ trait, index, inView }: { trait: string; index: number; inView: boolean }) => (
  <motion.span
    whileHover={{
      scale: 1.15,
      rotate: [-2, 2, 0],
      backgroundColor: 'rgba(139, 92, 246, 0.3)',
    }}
    className="px-5 py-2.5 bg-gradient-to-r from-gray-800/80 to-gray-900/80 rounded-full text-gray-300 border border-gray-700/50 cursor-default backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300"
    initial={{ opacity: 0, scale: 0, y: 30 }}
    animate={inView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0, y: 30 }}
    transition={{
      delay: 1.5 + index * 0.06,
      type: 'spring',
      stiffness: 200,
      damping: 20,
    }}
  >
    {trait}
  </motion.span>
));

Trait.displayName = 'Trait';

// 3D Card Component
const Card3D = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotate({
      x: (y - centerY) / 8,
      y: (centerX - x) / 8,
    });
  };

  const handleMouseLeave = () => setRotate({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      className={`${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      style={{ transformStyle: 'preserve-3d' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
};

const ProfileSummary = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

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
    <section
      id="about"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden"
    >
      {/* Parallax background elements */}
      <motion.div style={{ y }} className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              About Me
            </span>
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mb-8 rounded-full"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left column - Bio & Skills */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-8"
          >
            {/* Bio Card */}
            <Card3D className="bg-gradient-to-br from-gray-900/90 to-black/90 p-8 rounded-3xl border border-gray-800 backdrop-blur-lg relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

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
            </Card3D>

            {/* Skills Card */}
            <Card3D className="bg-gradient-to-br from-gray-900/90 to-black/90 p-8 rounded-3xl border border-gray-800 backdrop-blur-lg">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl">📊</span>
                <h3 className="text-2xl font-bold text-white">Skill Proficiency</h3>
              </div>

              <div className="space-y-1">
                {skills.map((skill, index) => (
                  <SkillBar key={skill.name} {...skill} delay={index * 0.15} />
                ))}
              </div>
            </Card3D>
          </motion.div>

          {/* Right column - Stats & Traits with 3D Orbital */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-8"
          >
            {/* 3D Orbital Section */}
            <div className="relative h-80 flex items-center justify-center">
              {/* Central element */}
              <motion.div
                animate={{ rotateY: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="relative w-32 h-32"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50">
                  <span className="text-5xl">👨‍💻</span>
                </div>
              </motion.div>

              {/* Orbiting badges */}
              <OrbitingBadge icon="⚛️" label="React" orbitRadius={140} speed={0.8} delay={0} />
              <OrbitingBadge icon="🐍" label="Python" orbitRadius={140} speed={-0.6} delay={1} />
              <OrbitingBadge icon="🐳" label="Docker" orbitRadius={140} speed={0.7} delay={2} />
              <OrbitingBadge icon="🚀" label="Node" orbitRadius={140} speed={-0.8} delay={3} />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-gray-900/80 p-6 rounded-2xl border border-gray-800 text-center backdrop-blur-sm hover:border-gray-700 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={{
                    delay: 0.3 + index * 0.1,
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                  }}
                >
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <motion.div
                    className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}
                  >
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </motion.div>
                  <div className="text-gray-500 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Traits Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <h3 className="text-3xl font-bold mb-4 text-white">What Drives Me</h3>
          <p className="text-gray-500 mb-8">Core values that shape my work</p>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {traits.map((trait, index) => (
              <Trait key={trait} trait={trait} index={index} inView={isInView} />
            ))}
          </div>
        </motion.div>

        {/* Education Card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <Card3D className="bg-gray-900/80 p-6 rounded-2xl border border-gray-800 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <span className="text-4xl">🎓</span>
              <div>
                <h4 className="text-xl font-bold text-white">B.Tech Computer Science</h4>
                <p className="text-gray-400">Shiv Nadar University Chennai</p>
                <p className="text-gray-500 text-sm">Expected Graduation: 2027</p>
              </div>
            </div>
          </Card3D>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(ProfileSummary);
