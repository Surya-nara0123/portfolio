'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [filter, setFilter] = useState('all');
  const [isClient, setIsClient] = useState(false);

  // Fix hydration mismatch by ensuring client-side rendering for random values
  useEffect(() => {
    setIsClient(true);
  }, []);

  const projects = [
    {
      id: 1,
      title: 'Swiftship - Campus Food Delivery',
      description: 'Full-stack campus food delivery application with real-time order tracking, payment integration, and restaurant management system. Built with modern web technologies for seamless user experience.',
      image: '/api/placeholder/400/250',
      technologies: ['JavaScript', 'Go', 'React', 'Node.js', 'MongoDB'],
      category: 'fullstack',
      liveUrl: 'https://github.com/Surya-nara0123/Swiftship',
      githubUrl: 'https://github.com/Surya-nara0123/Swiftship',
      featured: true,
      year: '2025',
      stars: '4.8',
      views: '12k'
    },
    {
      id: 2,
      title: 'Schedule Maker (Updated UI)',
      description: 'Modern schedule management application with drag-and-drop functionality, calendar integration, and collaborative features. Built with TypeScript for better type safety and maintainability.',
      image: '/api/placeholder/400/250',
      technologies: ['TypeScript', 'React', 'CSS3', 'JavaScript'],
      category: 'fullstack',
      liveUrl: 'https://github.com/Surya-nara0123/schedulemakerUpdatedUI',
      githubUrl: 'https://github.com/Surya-nara0123/schedulemakerUpdatedUI',
      featured: true,
      year: '2025',
      stars: '4.6',
      views: '8k'
    },
    {
      id: 3,
      title: 'Outpass Management App',
      description: 'Digital outpass management system for educational institutions with approval workflows, QR code generation, and real-time tracking capabilities.',
      image: '/api/placeholder/400/250',
      technologies: ['JavaScript', 'Node.js', 'Express', 'MongoDB'],
      category: 'fullstack',
      liveUrl: 'https://github.com/Surya-nara0123/outpass_app',
      githubUrl: 'https://github.com/Surya-nara0123/outpass_app',
      featured: false,
      year: '2025',
      stars: '4.3',
      views: '15k'
    },
    {
      id: 4,
      title: 'Expenser - Expense Tracker',
      description: 'Mobile expense tracking application with categorization, budget management, and financial insights. Built using Flutter/Dart for cross-platform compatibility.',
      image: '/api/placeholder/400/250',
      technologies: ['Dart', 'Flutter', 'SQLite', 'Provider'],
      category: 'mobile',
      liveUrl: 'https://github.com/Surya-nara0123/Expenser',
      githubUrl: 'https://github.com/Surya-nara0123/Expenser',
      featured: true,
      year: '2024',
      stars: '4.7',
      views: '9k'
    },
    {
      id: 5,
      title: 'Image Processing Suite',
      description: 'Computer vision and image processing toolkit with various filters, transformations, and analysis capabilities using Python and OpenCV.',
      image: '/api/placeholder/400/250',
      technologies: ['Python', 'OpenCV', 'NumPy', 'Matplotlib'],
      category: 'ai',
      liveUrl: 'https://github.com/Surya-nara0123/imageProccessing',
      githubUrl: 'https://github.com/Surya-nara0123/imageProccessing',
      featured: false,
      year: '2024',
      stars: '4.5',
      views: '11k'
    },
    {
      id: 6,
      title: 'Physics Virtual Lab',
      description: 'Interactive physics simulations and virtual laboratory experiments for educational purposes with 3D visualizations and real-time calculations.',
      image: '/api/placeholder/400/250',
      technologies: ['JavaScript', 'Three.js', 'WebGL', 'HTML5'],
      category: 'frontend',
      liveUrl: 'https://github.com/Surya-nara0123/physicsVirtualLabProject',
      githubUrl: 'https://github.com/Surya-nara0123/physicsVirtualLabProject',
      featured: false,
      year: '2023',
      stars: '4.2',
      views: '7k'
    },
    {
      id: 7,
      title: 'NEAT Neural Evolution',
      description: 'Implementation of NeuroEvolution of Augmenting Topologies (NEAT) algorithm for evolving artificial neural networks with genetic algorithms.',
      image: '/api/placeholder/400/250',
      technologies: ['Python', 'NEAT-Python', 'Pygame', 'NumPy'],
      category: 'ai',
      liveUrl: 'https://github.com/Surya-nara0123/neat-python',
      githubUrl: 'https://github.com/Surya-nara0123/neat-python',
      featured: false,
      year: '2023',
      stars: '4.4',
      views: '13k'
    },
    {
      id: 8,
      title: 'Online Checkers Game',
      description: 'Multiplayer checkers game with real-time gameplay, room management, and spectator mode. Built with vanilla JavaScript and WebSocket connections.',
      image: '/api/placeholder/400/250',
      technologies: ['HTML', 'CSS', 'JavaScript', 'WebSocket'],
      category: 'frontend',
      liveUrl: 'https://github.com/Surya-nara0123/Checkers-Online',
      githubUrl: 'https://github.com/Surya-nara0123/Checkers-Online',
      featured: false,
      year: '2023',
      stars: '4.1',
      views: '6k'
    },
    {
      id: 9,
      title: 'Data Analysis & Algorithms',
      description: 'Collection of data analysis projects and algorithm implementations covering sorting, searching, and optimization techniques with Jupyter notebooks.',
      image: '/api/placeholder/400/250',
      technologies: ['Python', 'Jupyter', 'Pandas', 'Matplotlib'],
      category: 'data',
      liveUrl: 'https://github.com/Surya-nara0123/daaShit',
      githubUrl: 'https://github.com/Surya-nara0123/daaShit',
      featured: false,
      year: '2025',
      stars: '4.6',
      views: '10k'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'ai', label: 'AI/ML' },
    { id: 'data', label: 'Data Science' }
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
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950/30">
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
              Featured Projects
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
            A showcase of my recent work spanning full-stack development, mobile apps, AI/ML projects, and data science
          </motion.p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              variants={itemVariants}
              onClick={() => setFilter(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === category.id
                  ? 'bg-gradient-to-r from-gray-600 to-gray-800 text-white'
                  : 'bg-gray-900 text-gray-300 hover:bg-gray-800 border border-gray-700'
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
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
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group relative bg-gradient-to-br from-gray-900/90 to-black/90 rounded-2xl overflow-hidden border border-gray-700/50 backdrop-blur-sm shadow-2xl hover:shadow-gray-900/20 transition-all duration-300 ${
                project.featured ? 'md:col-span-2 xl:col-span-1 ring-1 ring-gray-600/30' : ''
              }`}
            >
              {/* Featured badge */}
              {project.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <motion.div
                    animate={{ 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                  >
                    ✨ Featured
                  </motion.div>
                </div>
              )}

              {/* Project image placeholder */}
              <div className="relative h-52 bg-gradient-to-br from-gray-800/30 to-gray-900/30 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"
                  initial={{ scale: 1, rotate: 0 }}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  transition={{ duration: 0.4 }}
                />
                
                {/* Category icon and gradient overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    className="text-7xl opacity-30 filter drop-shadow-lg"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.category === 'mobile' ? '📱' : 
                     project.category === 'ai' ? '🤖' : 
                     project.category === 'data' ? '📊' : 
                     project.category === 'fullstack' ? '🌐' : '💻'}
                  </motion.div>
                </div>

                {/* Category label */}
                <div className="absolute top-4 left-4">
                  <span className="bg-black/60 backdrop-blur-sm text-gray-300 px-3 py-1 rounded-full text-xs font-medium border border-gray-600/30">
                    {project.category === 'fullstack' ? 'Full Stack' :
                     project.category === 'ai' ? 'AI/ML' :
                     project.category === 'data' ? 'Data Science' :
                     project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                  </span>
                </div>
                
                {/* Hover overlay with buttons */}
                <motion.div
                  className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg transition-all duration-200"
                  >
                    View Project
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg transition-all duration-200"
                  >
                    GitHub
                  </motion.a>
                </motion.div>
              </div>

              {/* Content section */}
              <div className="p-6 space-y-4">
                {/* Title and year */}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300 leading-tight">
                    {project.title}
                  </h3>
                  <span className="text-gray-500 text-sm font-medium bg-gray-800/50 px-2 py-1 rounded-md whitespace-nowrap">
                    {project.year}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed text-sm line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                      transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                      whileHover={{ scale: 1.05, y: -1 }}
                      className="px-3 py-1.5 bg-gradient-to-r from-gray-700/40 to-gray-800/40 text-gray-300 rounded-lg text-xs font-medium border border-gray-600/20 hover:border-gray-500/40 transition-all duration-200"
                    >
                      {tech}
                    </motion.span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-3 py-1.5 bg-gray-800/30 text-gray-500 rounded-lg text-xs font-medium">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                {/* Status indicator */}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
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
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 10px 30px rgba(255, 255, 255, 0.1)' 
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 border border-gray-600"
          >
            View All Projects on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;