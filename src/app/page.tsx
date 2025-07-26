'use client';

import { motion } from 'framer-motion';
import Hero from './components/Hero';
import ProfileSummary from './components/ProfileSummary';
import Experience from './components/Experience';
import Projects from './components/Projects';
import TechnicalSkills from './components/TechnicalSkills';
import Publications from './components/Publications';
import Hobbies from './components/Hobbies';
import Navigation from './components/Navigation';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navigation />
      <main>
        <Hero />
        <ProfileSummary />
        <Experience />
        <Projects />
        <TechnicalSkills />
        <Publications />
        <Hobbies />
      </main>
    </div>
  );
}
