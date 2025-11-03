import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import Hero from './Hero';
import StatsSection from './StatsSection';
import ExperienceSection from './ExperienceSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import EducationSection from './EducationSection';
import ContactSection from './ContactSection';
import Footer from './Footer';

import { roles, stats, experience, projects, projectCategories, skillLevels, softSkills } from '../data';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});
  const [projectFilter, setProjectFilter] = useState('all');

  // Typing animation (same as original)
  useEffect(() => {
    let timeout;
    const currentRoleText = roles[currentRole];

    if (typedText.length < currentRoleText.length) {
      timeout = setTimeout(() => {
        setTypedText(currentRoleText.slice(0, typedText.length + 1));
      }, 100);
    } else {
      timeout = setTimeout(() => {
        setTypedText('');
        setCurrentRole((prev) => (prev + 1) % roles.length);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [typedText, currentRole]);

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['home', 'experience', 'skills', 'projects', 'education', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResumeDownload = () => {
    const resumeUrl = '/Resume_Technical.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Pranit_Das_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredProjects = projectFilter === 'all'
    ? projects
    : projects.filter(p => p.category === projectFilter);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Animated background grid (keeps effect) */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }} />
      </div>

      <Nav
        activeSection={activeSection}
        isScrolled={isScrolled}
        scrollToSection={scrollToSection}
        handleResumeDownload={handleResumeDownload}
      />

      <Hero
        typedText={typedText}
        mousePosition={mousePosition}
        scrollToSection={scrollToSection}
        handleResumeDownload={handleResumeDownload}
      />

      <StatsSection stats={stats} visibleSections={visibleSections} />

      <ExperienceSection experience={experience} visibleSections={visibleSections} />

      <SkillsSection skillLevels={skillLevels} softSkills={softSkills} visibleSections={visibleSections} />

      <ProjectsSection
        projects={projects}
        projectFilter={projectFilter}
        setProjectFilter={setProjectFilter}
        projectCategories={projectCategories}
        filteredProjects={filteredProjects}
        visibleSections={visibleSections}
      />

      <EducationSection visibleSections={visibleSections} />

      <ContactSection />

      <Footer />
    </div>
  );
};

export default Portfolio;
