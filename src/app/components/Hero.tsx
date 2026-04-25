'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from 'framer-motion';
import { useRef, useState, useEffect, memo } from 'react';
import Image from 'next/image';

// 3D Tilt Card Component
const TiltCard = memo(({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={`perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
      }}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
});

TiltCard.displayName = 'TiltCard';

// Floating Orb Component
const FloatingOrb = ({ size, color, delay, duration, xRange }: { size: number; color: string; delay: number; duration: number; xRange: [number, number] }) => {
  const yMotion = useMotionValue(0);
  const xMotion = useMotionValue(xRange[0]);

  useAnimationFrame((t) => {
    yMotion.set(Math.sin(t / 1000 + delay) * 50);
    xMotion.set(xRange[0] + (Math.sin(t / 1500 + delay) + 1) * (xRange[1] - xRange[0]) / 2);
  });

  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${color}`}
      style={{
        width: size,
        height: size,
        x: xMotion,
        y: yMotion,
      }}
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration, delay, repeat: Infinity }}
    />
  );
};

// Typing Animation Component
const TypewriterText = ({ texts, speed = 100 }: { texts: string[]; speed?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts, speed]);

  return (
    <span className="text-xl md:text-2xl text-gray-400">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="inline-block w-0.5 h-6 ml-1 bg-white"
      />
    </span>
  );
};

// Magnetic Button Component
const MagneticButton = ({ children, href, primary = false }: { children: React.ReactNode; href: string; primary?: boolean }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 inline-block ${
        primary
          ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50'
          : 'bg-gray-800/80 text-white border border-gray-600 hover:border-gray-400 hover:bg-gray-700/80'
      }`}
    >
      {children}
    </motion.a>
  );
};

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  const roles = ['Full Stack Developer', 'Software Engineer', 'Backend Developer', 'Problem Solver'];

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Interactive Background Gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-purple-950/40 to-pink-950/40"
        style={{ x: springX, y: springY }}
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingOrb size={400} color="bg-indigo-500/20" delay={0} duration={4} xRange={[-100, 100]} />
        <FloatingOrb size={300} color="bg-purple-500/20" delay={1} duration={5} xRange={[50, 150]} />
        <FloatingOrb size={350} color="bg-pink-500/20" delay={2} duration={6} xRange={[-150, -50]} />
        <FloatingOrb size={250} color="bg-cyan-500/15" delay={3} duration={7} xRange={[100, 200]} />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Mouse-following glow */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl pointer-events-none"
        style={{
          x: useTransform(springX, (v) => v - 192),
          y: useTransform(springY, (v) => v - 192),
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y, opacity, scale }}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
      >
        {/* 3D Profile Card */}
        <motion.div variants={itemVariants} className="mb-10">
          <TiltCard>
            <motion.div
              className="relative w-40 h-40 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-1 shadow-2xl shadow-purple-500/30"
              whileHover={{ scale: 1.05 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="w-full h-full rounded-xl bg-black flex items-center justify-center overflow-hidden">
                <Image
                  src="/profile.jpeg"
                  alt="Surya Narayanan"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              {/* Status indicator */}
              <motion.div
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-black flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-xs">⚡</span>
              </motion.div>
            </motion.div>
          </TiltCard>
        </motion.div>

        {/* Name with 3D text effect */}
        <motion.div variants={itemVariants} className="mb-6">
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-2"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{
              rotateX: [0, 5, 0, -5, 0],
              rotateY: [0, 10, 0, -10, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="bg-gradient-to-r from-white via-ind-300 to-white bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              Surya Narayanan
            </span>
          </motion.h1>
        </motion.div>

        {/* Animated role text */}
        <motion.div variants={itemVariants} className="mb-8 min-h-[40px]">
          <TypewriterText texts={roles} speed={80} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Building efficient, scalable, and beautiful applications.
          Passionate about clean code and innovative solutions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <MagneticButton href="#projects" primary>
            View My Work
          </MagneticButton>
          <MagneticButton href="/Surya_Narayanan.pdf">
            📄 Download Resume
          </MagneticButton>
          <MagneticButton href="mailto:surya.nara0123@gmail.com">
            Get In Touch
          </MagneticButton>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex justify-center gap-6"
        >
          {[
            { icon: '💻', label: 'GitHub', href: 'https://github.com/Surya-nara0123' },
            { icon: '🔗', label: 'LinkedIn', href: 'https://linkedin.com/in/surya-narayanan' },
            { icon: '📧', label: 'Email', href: 'mailto:surya.nara0123@gmail.com' },
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center text-xl hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-300"
              title={social.label}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-3 bg-gray-400 rounded-full"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
