'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

// Simple static card - no 3D tilt
const ProfileCard = () => (
  <div className="relative w-40 h-40 mx-auto mb-10">
    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-1 shadow-2xl shadow-purple-500/30">
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
    </div>
    {/* Status indicator */}
    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-black flex items-center justify-center">
      <span className="text-xs">⚡</span>
    </div>
  </div>
);

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
      <span className="inline-block w-0.5 h-6 ml-1 bg-white animate-pulse" />
    </span>
  );
};

import { useState, useEffect } from 'react';

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const roles = ['Full Stack Developer', 'Software Engineer', 'Backend Developer', 'Problem Solver'];

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Static background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-purple-950/40 to-pink-950/40" />

      {/* Static orbs instead of animated */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

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

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ y, opacity }}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
      >
        {/* Simple Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <ProfileCard />
        </motion.div>

        {/* Name - simple static text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-2">
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
              Surya Narayanan
            </span>
          </h1>
        </motion.div>

        {/* Animated role text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mb-8 min-h-[40px]"
        >
          <TypewriterText texts={roles} speed={80} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Building efficient, scalable, and beautiful applications.
          Passionate about clean code and innovative solutions.
        </motion.p>

        {/* CTA Buttons - simple hover, no magnetic effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#projects"
            className="px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300"
          >
            View My Work
          </a>
          <a
            href="/Surya_Narayanan.pdf"
            target="_blank"
            className="px-8 py-3 rounded-full font-semibold bg-gray-800/80 text-white border border-gray-600 hover:border-gray-400 hover:bg-gray-700/80 transition-all duration-300"
          >
            📄 Download Resume
          </a>
          <a
            href="mailto:surya.nara0123@gmail.com"
            className="px-8 py-3 rounded-full font-semibold bg-gray-800/80 text-white border border-gray-600 hover:border-gray-400 hover:bg-gray-700/80 transition-all duration-300"
          >
            Get In Touch
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-12 flex justify-center gap-6"
        >
          {[
            { icon: '💻', label: 'GitHub', href: 'https://github.com/Surya-nara0123' },
            { icon: '🔗', label: 'LinkedIn', href: 'https://linkedin.com/in/surya-narayanan' },
            { icon: '📧', label: 'Email', href: 'mailto:surya.nara0123@gmail.com' },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center text-xl hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-300"
              title={social.label}
            >
              {social.icon}
            </a>
          ))}
        </motion.div>

        {/* Scroll indicator - simple bounce */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-gray-400 rounded-full animate-bounce" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;