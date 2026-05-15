'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

const Projects = () => {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Swiftship',
      subtitle: 'Campus Food Delivery Platform',
      description: 'Full-stack campus food delivery application with real-time order tracking, payment integration, and restaurant management system.',
      image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&q=80',
      technologies: ['Go', 'React', 'Next.js', 'MongoDB', 'WebSocket', 'Docker'],
      category: 'fullstack',
      githubUrl: 'https://github.com/Surya-nara0123/Swiftship',
      liveUrl: 'https://swiftship-nine.vercel.app',
      featured: true,
      year: '2025',
      stats: { stars: 12, forks: 5 },
      icon: '🍔',
    },
    {
      id: 2,
      title: 'LabPartnerAI',
      subtitle: 'AI Assignment Assistant',
      description: 'AI-powered assistant to help students complete assignments with intelligent context awareness and step-by-step guidance.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
      technologies: ['Svelte', 'Python', 'OpenAI API', 'FastAPI', 'PostgreSQL'],
      category: 'ai',
      githubUrl: 'https://github.com/Surya-nara0123/LabPartnerAI',
      liveUrl: '',
      featured: true,
      year: '2025',
      stats: { stars: 8, forks: 3 },
      icon: '🤖',
    },
    {
      id: 3,
      title: 'Expenser',
      subtitle: 'Personal Finance Tracker',
      description: 'Cross-platform mobile expense tracking app with smart categorization, budget alerts, and visual spending insights.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
      technologies: ['Flutter', 'Dart', 'SQLite', 'Provider', 'ML Kit'],
      category: 'mobile',
      githubUrl: 'https://github.com/Surya-nara0123/Expenser',
      liveUrl: '',
      featured: true,
      year: '2024',
      stats: { stars: 15, forks: 6 },
      icon: '💰',
    },
    {
      id: 4,
      title: 'Swiftship Backend',
      subtitle: 'Go Microservices API',
      description: 'High-performance backend API built with Go, featuring microservices architecture, JWT authentication, and comprehensive error handling.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
      technologies: ['Go', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'gRPC'],
      category: 'backend',
      githubUrl: 'https://github.com/Surya-nara0123/swiftshipBackend',
      liveUrl: '',
      featured: false,
      year: '2024',
      stats: { stars: 7, forks: 2 },
      icon: '⚙️',
    },
    {
      id: 5,
      title: 'Outpass Management',
      subtitle: 'Institutional Leave System',
      description: 'Digital outpass management system for educational institutions with approval workflows, QR codes, and real-time tracking.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
      technologies: ['Node.js', 'Express', 'MongoDB', 'React', 'QR Code'],
      category: 'fullstack',
      githubUrl: 'https://github.com/Surya-nara0123/outpass_app',
      liveUrl: '',
      featured: false,
      year: '2024',
      stats: { stars: 10, forks: 4 },
      icon: '📋',
    },
    {
      id: 6,
      title: 'NEAT Neural Evolution',
      subtitle: 'Genetic AI Algorithm',
      description: 'Implementation of NeuroEvolution of Augmenting Topologies for evolving artificial neural networks through genetic algorithms.',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
      technologies: ['Python', 'NEAT-Python', 'Pygame', 'NumPy', 'Matplotlib'],
      category: 'ai',
      githubUrl: 'https://github.com/Surya-nara0123/neat-python',
      liveUrl: '',
      featured: false,
      year: '2023',
      stats: { stars: 18, forks: 7 },
      icon: '🧠',
    },
    {
      id: 7,
      title: 'Physics Virtual Lab',
      subtitle: 'Interactive Simulations',
      description: '3D physics simulations and virtual lab experiments for education with real-time calculations and data visualization.',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
      technologies: ['Three.js', 'JavaScript', 'WebGL', 'HTML5', 'Math.js'],
      category: 'frontend',
      githubUrl: 'https://github.com/Surya-nara0123/physicsVirtualLabProject',
      liveUrl: '',
      featured: false,
      year: '2023',
      stats: { stars: 22, forks: 9 },
      icon: '🔬',
    },
    {
      id: 8,
      title: 'Schedule Maker',
      subtitle: 'Timetable Generator',
      description: 'Modern schedule management with drag-and-drop, conflict detection, and calendar integration for universities.',
      image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80',
      technologies: ['TypeScript', 'React', 'CSS3', 'JavaScript', 'iCal'],
      category: 'frontend',
      githubUrl: 'https://github.com/Surya-nara0123/schedulemakerUpdatedUI',
      liveUrl: '',
      featured: false,
      year: '2025',
      stats: { stars: 6, forks: 2 },
      icon: '📅',
    },
    {
      id: 9,
      title: 'Image Processing Suite',
      subtitle: 'Computer Vision Toolkit',
      description: 'Comprehensive image processing toolkit with filters, transformations, and analysis using OpenCV and Python.',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
      technologies: ['Python', 'OpenCV', 'NumPy', 'Pillow', 'Matplotlib'],
      category: 'ai',
      githubUrl: 'https://github.com/Surya-nara0123/imageProccessing',
      liveUrl: '',
      featured: false,
      year: '2024',
      stats: { stars: 14, forks: 5 },
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

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-black relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 mx-auto mb-8 rounded-full" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A showcase of my recent work spanning full-stack, mobile, AI/ML, and more
          </p>
        </motion.div>

        {/* Filter buttons - simple static */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                filter === category.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-gray-900/80 text-gray-300 hover:bg-gray-800 border border-gray-700'
              }`}
            >
              <span>{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects grid - no layout animation, simple fade */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`group relative ${project.featured ? 'md:col-span-2 xl:col-span-1' : ''}`}
            >
              <div className="relative bg-gray-900/90 rounded-3xl overflow-hidden border border-gray-800 hover:border-purple-500/30 transition-all duration-500">
                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                      <span>⭐</span> Featured
                    </div>
                  </div>
                )}

                {/* Project image */}
                <div className="relative h-52 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
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
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-lg hover:bg-gray-700 transition-colors"
                      >
                        💻
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-lg hover:bg-gray-700 transition-colors"
                        >
                          🔗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <a
            href="https://github.com/Surya-nara0123?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 border border-gray-700 hover:border-gray-500 shadow-lg"
          >
            <span className="text-2xl">📂</span>
            View All 26+ Repositories on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;