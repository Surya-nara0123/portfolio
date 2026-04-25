'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';

// 3D Tilt Project Card
const TiltCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
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
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 40 }}
    >
      {children}
    </motion.div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Swiftship',
      subtitle: 'Campus Food Delivery Platform',
      description: 'Full-stack campus food delivery application with real-time order tracking, payment integration, and restaurant management system. Features live location tracking and optimized delivery routes.',
      longDescription: 'Built a comprehensive campus food delivery platform handling 1000+ daily orders. Implemented real-time WebSocket connections for live order tracking, integrated multiple payment gateways, and built an admin dashboard for restaurant management.',
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80',
      technologies: ['Go', 'React', 'Next.js', 'MongoDB', 'WebSocket', 'Docker'],
      category: 'fullstack',
      githubUrl: 'https://github.com/Surya-nara0123/Swiftship',
      liveUrl: 'https://swiftship-nine.vercel.app',
      featured: true,
      year: '2025',
      stats: { stars: 12, forks: 5 },
      color: 'from-orange-500 to-red-600',
      icon: '🍔',
    },
    {
      id: 2,
      title: 'LabPartnerAI',
      subtitle: 'AI Assignment Assistant',
      description: 'AI-powered assistant to help students complete assignments with intelligent context awareness and step-by-step guidance.',
      longDescription: 'Developed an AI chatbot using Svelte that understands assignment context and provides helpful guidance without giving direct answers. Integrated with OpenAI API for intelligent responses.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
      technologies: ['Svelte', 'Python', 'OpenAI API', 'FastAPI', 'PostgreSQL'],
      category: 'ai',
      githubUrl: 'https://github.com/Surya-nara0123/LabPartnerAI',
      liveUrl: '',
      featured: true,
      year: '2025',
      stats: { stars: 8, forks: 3 },
      color: 'from-purple-500 to-indigo-600',
      icon: '🤖',
    },
    {
      id: 3,
      title: 'Expenser',
      subtitle: 'Personal Finance Tracker',
      description: 'Cross-platform mobile expense tracking app with smart categorization, budget alerts, and visual spending insights.',
      longDescription: 'Built a Flutter mobile app that helps users track expenses with automatic categorization using ML, set budget limits, and visualize spending patterns through charts and graphs.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
      technologies: ['Flutter', 'Dart', 'SQLite', 'Provider', 'ML Kit'],
      category: 'mobile',
      githubUrl: 'https://github.com/Surya-nara0123/Expenser',
      liveUrl: '',
      featured: true,
      year: '2024',
      stats: { stars: 15, forks: 6 },
      color: 'from-green-500 to-emerald-600',
      icon: '💰',
    },
    {
      id: 4,
      title: 'Swiftship Backend',
      subtitle: 'Go Microservices API',
      description: 'High-performance backend API built with Go, featuring microservices architecture, JWT authentication, and comprehensive error handling.',
      longDescription: 'Designed and implemented a scalable microservices backend handling all Swiftship operations. Implemented service discovery, load balancing, and circuit breakers for fault tolerance.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
      technologies: ['Go', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'gRPC'],
      category: 'backend',
      githubUrl: 'https://github.com/Surya-nara0123/swiftshipBackend',
      liveUrl: '',
      featured: false,
      year: '2024',
      stats: { stars: 7, forks: 2 },
      color: 'from-cyan-500 to-blue-600',
      icon: '⚙️',
    },
    {
      id: 5,
      title: 'Outpass Management',
      subtitle: 'Institutional Leave System',
      description: 'Digital outpass management system for educational institutions with approval workflows, QR codes, and real-time tracking.',
      longDescription: 'Replaced paper-based outpass systems with a fully digital solution. Features include multi-level approval workflows, QR code generation for security gates, and real-time status notifications.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
      technologies: ['Node.js', 'Express', 'MongoDB', 'React', 'QR Code'],
      category: 'fullstack',
      githubUrl: 'https://github.com/Surya-nara0123/outpass_app',
      liveUrl: '',
      featured: false,
      year: '2024',
      stats: { stars: 10, forks: 4 },
      color: 'from-blue-500 to-purple-600',
      icon: '📋',
    },
    {
      id: 6,
      title: 'NEAT Neural Evolution',
      subtitle: 'Genetic AI Algorithm',
      description: 'Implementation of NeuroEvolution of Augmenting Topologies for evolving artificial neural networks through genetic algorithms.',
      longDescription: 'Built an interactive visualization of NEAT algorithm showing neural networks evolving to solve tasks in real-time. Used Pygame for rendering and NumPy for matrix operations.',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
      technologies: ['Python', 'NEAT-Python', 'Pygame', 'NumPy', 'Matplotlib'],
      category: 'ai',
      githubUrl: 'https://github.com/Surya-nara0123/neat-python',
      liveUrl: '',
      featured: false,
      year: '2023',
      stats: { stars: 18, forks: 7 },
      color: 'from-pink-500 to-rose-600',
      icon: '🧠',
    },
    {
      id: 7,
      title: 'Physics Virtual Lab',
      subtitle: 'Interactive Simulations',
      description: '3D physics simulations and virtual lab experiments for education with real-time calculations and data visualization.',
      longDescription: 'Created web-based physics experiments allowing students to conduct virtual labs. Features include accurate physics engines, real-time data plotting, and exportable results.',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
      technologies: ['Three.js', 'JavaScript', 'WebGL', 'HTML5', 'Math.js'],
      category: 'frontend',
      githubUrl: 'https://github.com/Surya-nara0123/physicsVirtualLabProject',
      liveUrl: '',
      featured: false,
      year: '2023',
      stats: { stars: 22, forks: 9 },
      color: 'from-violet-500 to-purple-600',
      icon: '🔬',
    },
    {
      id: 8,
      title: 'Schedule Maker',
      subtitle: 'Timetable Generator',
      description: 'Modern schedule management with drag-and-drop, conflict detection, and calendar integration for universities.',
      longDescription: 'Built a comprehensive timetable management system used by university students. Features intelligent conflict resolution, automatic slot suggestions, and iCal export.',
      image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80',
      technologies: ['TypeScript', 'React', 'CSS3', 'JavaScript', 'iCal'],
      category: 'frontend',
      githubUrl: 'https://github.com/Surya-nara0123/schedulemakerUpdatedUI',
      liveUrl: '',
      featured: false,
      year: '2025',
      stats: { stars: 6, forks: 2 },
      color: 'from-amber-500 to-orange-600',
      icon: '📅',
    },
    {
      id: 9,
      title: 'Image Processing Suite',
      subtitle: 'Computer Vision Toolkit',
      description: 'Comprehensive image processing toolkit with filters, transformations, and analysis using OpenCV and Python.',
      longDescription: 'Built a collection of image processing algorithms from scratch including edge detection, histogram equalization, morphological operations, and convolutional filters.',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
      technologies: ['Python', 'OpenCV', 'NumPy', 'Pillow', 'Matplotlib'],
      category: 'ai',
      githubUrl: 'https://github.com/Surya-nara0123/imageProccessing',
      liveUrl: '',
      featured: false,
      year: '2024',
      stats: { stars: 14, forks: 5 },
      color: 'from-teal-500 to-cyan-600',
      icon: '🖼️',
    },
  ];

  const categories = [
    { id: 'all', label: 'All', icon: '🚀' },
    { id: 'fullstack', label: 'Full Stack', icon: '🌐' },
    { id: 'frontend', label: 'Frontend', icon: '💻' },
    { id: 'backend', label: 'Backend', icon: '⚡' },
    { id: 'mobile', label: 'Mobile', icon: '📱' },
    { id: 'ai', label: 'AI/ML', icon: '🤖' },
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

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

  return (
    <>
      <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-0 left-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
            animate={{ scale: [1, 1.3, 1], rotate: [0, 45, 0] }}
            transition={{ duration: 12, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
            animate={{ scale: [1.3, 1, 1.3], rotate: [0, -45, 0] }}
            transition={{ duration: 12, repeat: Infinity, delay: 6 }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </motion.h2>
            <motion.div
              variants={itemVariants}
              className="w-24 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 mx-auto mb-8 rounded-full"
            />
            <motion.p
              variants={itemVariants}
              className="text-gray-400 text-lg max-w-2xl mx-auto"
            >
              A showcase of my recent work spanning full-stack, mobile, AI/ML, and more
            </motion.p>
          </motion.div>

          {/* Filter buttons */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                variants={itemVariants}
                onClick={() => setFilter(category.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                  filter === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-gray-900/80 text-gray-300 hover:bg-gray-800 border border-gray-700 hover:border-gray-500'
                }`}
              >
                <span>{category.icon}</span>
                {category.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects grid */}
          <AnimatePresence mode="wait">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  exit="hidden"
                  transition={{ delay: index * 0.08 }}
                  className={`group relative ${project.featured ? 'md:col-span-2 xl:col-span-1' : ''}`}
                >
                  <TiltCard>
                    <motion.div
                      whileHover={{ y: -10 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className={`relative bg-gray-900/90 rounded-3xl overflow-hidden border border-gray-800 backdrop-blur-sm shadow-2xl transition-all duration-500 hover:shadow-purple-500/10 hover:border-purple-500/30 ${
                        project.featured ? 'ring-2 ring-purple-500/30' : ''
                      }`}
                    >
                      {/* Featured badge */}
                      {project.featured && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute top-4 right-4 z-20"
                        >
                          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                            <span>⭐</span> Featured
                          </div>
                        </motion.div>
                      )}

                      {/* Project image */}
                      <div className="relative h-52 overflow-hidden">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        />
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

                        {/* Category & icon overlay */}
                        <div className="absolute top-4 left-4 flex items-center gap-2">
                          <span className="text-3xl">{project.icon}</span>
                          <span className="bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium border border-white/20">
                            {project.category}
                          </span>
                        </div>

                        {/* Year badge */}
                        <div className="absolute bottom-4 right-4">
                          <span className="bg-black/60 backdrop-blur-sm text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
                            {project.year}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                            {project.title}
                          </h3>
                          <p className="text-sm text-gray-500">{project.subtitle}</p>
                        </div>

                        <p className="text-gray-400 leading-relaxed text-sm line-clamp-2">
                          {project.description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 rounded-full text-xs font-medium border border-gray-700 group-hover:border-purple-500/50 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-3 py-1 bg-gray-800/50 text-gray-500 rounded-full text-xs">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Stats and actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <span>⭐</span> {project.stats.stars}
                            </span>
                            <span className="flex items-center gap-1">
                              <span>🍴</span> {project.stats.forks}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <motion.a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-lg hover:bg-gray-700 transition-colors"
                            >
                              💻
                            </motion.a>
                            {project.liveUrl && (
                              <motion.a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-lg hover:bg-gray-700 transition-colors"
                              >
                                🔗
                              </motion.a>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Hover glow effect */}
                      <motion.div
                        className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`}
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    </motion.div>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-16"
          >
            <motion.a
              href="https://github.com/Surya-nara0123?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 border border-gray-700 hover:border-gray-500 shadow-lg"
            >
              <span className="text-2xl">📂</span>
              View All 26+ Repositories on GitHub
            </motion.a>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Projects;
