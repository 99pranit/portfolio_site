import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Phone, ChevronDown, Briefcase, Code, GraduationCap, Award, TrendingUp, Database, Brain, Cloud, Rocket, Terminal, Zap, BarChart3, Sparkles, ArrowRight, Download, ExternalLink, Filter, Users, Lightbulb, Target } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState('');
  const [currentRole, setCurrentRole] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});
  const [projectFilter, setProjectFilter] = useState('all');
  
  const roles = [
    'Data Scientist',
    'AI Engineer',
    'ML Engineer',
    'Data Engineer',
    'Problem Solver'
  ];

  // Typing animation
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

  // Resume download handler
  const handleResumeDownload = () => {
    // Replace with your actual resume URL
    const resumeUrl = '/Resume_Technical.pdf';
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Pranit_Das_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Animated counter hook
  const useCounter = (end, duration = 2000, shouldStart) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      if (!shouldStart) return;
      
      let startTime;
      let animationFrame;
      
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        
        if (progress < duration) {
          setCount(Math.floor((progress / duration) * end));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };
      
      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, shouldStart]);
    
    return count;
  };

  const stats = [
    { label: 'Projects Completed', value: 15, suffix: '+' },
    { label: 'Technologies', value: 20, suffix: '+' },
    { label: 'Client Satisfaction', value: 95, suffix: '%' },
    { label: 'Years Experience', value: 3, suffix: '+' }
  ];

  const StatCard = ({ stat, index }) => {
    const count = useCounter(stat.value, 2000, visibleSections['stats']);
    
    return (
      <div 
        className="text-center transform transition-all duration-500"
        style={{ 
          transitionDelay: `${index * 100}ms`,
          opacity: visibleSections['stats'] ? 1 : 0,
          transform: visibleSections['stats'] ? 'translateY(0)' : 'translateY(20px)'
        }}
      >
        <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
          {count}{stat.suffix}
        </div>
        <div className="text-gray-400">{stat.label}</div>
      </div>
    );
  };

  const SkillBar = ({ skill, level, delay, visible }) => {
    const [width, setWidth] = useState(0);
    
    useEffect(() => {
      if (visible) {
        setTimeout(() => setWidth(level), delay);
      }
    }, [visible, level, delay]);
    
    return (
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-300">{skill}</span>
          <span className="text-cyan-400">{level}%</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${width}%` }}
          />
        </div>
      </div>
    );
  };

  const skillLevels = [
    { name: 'Python', level: 95 },
    { name: 'Machine Learning', level: 90 },
    { name: 'Deep Learning', level: 85 },
    { name: 'Data Engineering', level: 88 },
    { name: 'SQL & Databases', level: 90 },
    { name: 'Cloud (GCP)', level: 82 }
  ];

  const softSkills = [
    { name: 'Leadership', icon: Users, color: 'cyan' },
    { name: 'Problem-Solving', icon: Lightbulb, color: 'purple' },
    { name: 'Innovation', icon: Sparkles, color: 'pink' },
    { name: 'Storytelling', icon: Terminal, color: 'cyan' },
    { name: 'Teamwork', icon: Users, color: 'purple' },
    { name: 'Quick Learning', icon: Target, color: 'pink' }
  ];

  const experience = [
    {
      title: 'Analyst - Data Engineer',
      company: 'Mathco',
      location: 'Bengaluru, KN',
      period: 'June 2022 – Oct 2023',
      achievements: [
        'Built sales dashboard on Tableau, improving team performance by 20%',
        'Designed ETL pipeline architecture for multiple data sources',
        'Led client calls and delivered technical presentations',
        'Developed GCP cluster recommendation tool'
      ],
      tech: ['Tableau', 'GCP', 'ETL', 'Python']
    },
    {
      title: 'Analyst Intern',
      company: 'Mathco',
      location: 'Bengaluru, KN',
      period: 'Jan 2022 – June 2022',
      achievements: [
        'Customer segmentation for credit card sales leads',
        'EDA on customer demographics and spending patterns',
        'Built KPI dashboard on Co.dx platform'
      ],
      tech: ['Python', 'Data Analysis', 'Visualization']
    }
  ];

  const projects = [
    {
      title: 'Multi-Prompt Technique Ensemble',
      category: 'AI/ML',
      tag: 'AI in Education',
      period: 'Mar 2025 – Oct 2025',
      tech: ['Python', 'TensorFlow', 'Hugging Face', 'LLM'],
      description: 'Context-aware framework with role-based reasoning to classify questions into Bloom\'s Taxonomy levels',
      metrics: [
        { label: 'Accuracy', value: 79 },
        { label: 'F1 Score', value: 77 }
      ],
      status: 'Publication Accepted',
      color: 'from-cyan-500 to-blue-500',
      github: 'https://github.com/pranitdas/multi-prompt-ensemble'
    },
    {
      title: 'Human Activity Detection',
      category: 'IoT',
      tag: 'Smart Device',
      period: 'Mar 2025 – Apr 2025',
      tech: ['Python', 'TensorFlow', 'TinyML', 'IoT'],
      description: 'Hierarchical classification model using GY-91 sensor and ESP32-S3 for real-time activity recognition',
      metrics: [
        { label: 'Accuracy', value: 92 },
        { label: 'Categories', value: 7 }
      ],
      color: 'from-purple-500 to-pink-500',
      github: 'https://github.com/pranitdas/human-activity-detection'
    }
  ];

  const projectCategories = ['all', 'AI/ML', 'IoT'];

  const filteredProjects = projectFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === projectFilter);

  const ProjectCard = ({ project, index }) => {
    const isVisible = visibleSections['projects'];
    
    return (
      <div 
        className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 overflow-hidden"
        style={{ 
          transitionDelay: `${index * 150}ms`,
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.9)'
        }}
      >
        {/* Gradient overlay on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
        
        {/* Status badge */}
        <div className="flex items-center justify-between mb-4">
          {project.status && (
            <div className="flex items-center space-x-2">
              <Sparkles className="text-yellow-400" size={16} />
              <span className="px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-full text-xs font-semibold">
                {project.status}
              </span>
            </div>
          )}
          
          {/* GitHub Link */}
          <a 
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110"
            onClick={(e) => e.stopPropagation()}
          >
            <Github size={20} className="text-white" />
          </a>
        </div>
        
        <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          {project.title}
        </h3>
        
        <div className="flex items-center space-x-2 text-sm text-purple-400 mb-4">
          <Terminal size={14} />
          <span>{project.tag} • {project.period}</span>
        </div>
        
        <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>
        
        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {project.metrics.map((metric, idx) => (
            <div key={idx} className="bg-white/5 rounded-xl p-3 border border-white/10">
              <div className="text-2xl font-bold text-cyan-400">{metric.value}{metric.label.includes('Accuracy') || metric.label.includes('Score') ? '%' : ''}</div>
              <div className="text-xs text-gray-400">{metric.label}</div>
            </div>
          ))}
        </div>
        
        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech, idx) => (
            <span 
              key={idx} 
              className="px-3 py-1 bg-purple-500/20 rounded-lg text-xs border border-purple-500/30 hover:bg-purple-500/30 transition-colors cursor-pointer"
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* Hover arrow */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ExternalLink className="text-cyan-400" size={24} />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }} />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-2xl shadow-2xl border-b border-white/10' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                &lt;Pranit<span className="text-white">/</span>&gt;
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              {['home', 'experience', 'skills', 'projects', 'education', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all duration-300 relative group ${
                    activeSection === section ? 'text-cyan-400' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {section}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 ${
                    activeSection === section ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </button>
              ))}
              <button
                onClick={handleResumeDownload}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
              >
                <Download size={16} />
                <span className="text-sm font-semibold">Resume</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
            style={{ transform: `translate(${mousePosition.x * 2}px, ${mousePosition.y * 2}px)` }}
          />
          <div 
            className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
            style={{ 
              transform: `translate(${-mousePosition.x * 1.5}px, ${mousePosition.y * 1.5}px)`,
              animationDelay: '1s'
            }}
          />
          <div 
            className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
            style={{ 
              transform: `translate(${mousePosition.x}px, ${-mousePosition.y}px)`,
              animationDelay: '2s'
            }}
          />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-6xl">
          <div className="mb-8">
            <div className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full text-sm">
              <span className="flex items-center space-x-2">
                <Zap className="text-cyan-400" size={16} />
                <span>Available for opportunities</span>
              </span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-bold mb-6 animate-fadeIn">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Pranit Das
              </span>
            </h1>
            
            <div className="h-20 md:h-24 mb-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                {typedText}
                <span className="animate-pulse text-cyan-400">|</span>
              </h2>
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed">
            Transforming complex data into <span className="text-cyan-400 font-semibold">intelligent solutions</span> through 
            <span className="text-purple-400 font-semibold"> machine learning</span>, 
            <span className="text-pink-400 font-semibold"> deep learning</span>, and 
            <span className="text-cyan-400 font-semibold"> data engineering</span>
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <a 
              href="mailto:99pranitd@gmail.com" 
              className="group flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full font-semibold hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
            >
              <Mail size={20} />
              <span>Let's Connect</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
            
            <button
              onClick={handleResumeDownload}
              className="group flex items-center space-x-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105"
            >
              <Download size={20} />
              <span>Download Resume</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <a 
              href="https://github.com/pranitdas" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center space-x-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105"
            >
              <Github size={20} />
              <span>View Work</span>
            </a>
          </div>

          <button 
            onClick={() => scrollToSection('experience')} 
            className="animate-bounce hover:text-cyan-400 transition-colors"
          >
            <ChevronDown size={40} />
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" data-animate className="py-20 px-6 bg-gradient-to-b from-slate-950 to-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" data-animate className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-16">
            <Briefcase className="text-cyan-400 mr-4" size={36} />
            <h2 className="text-5xl font-bold">Experience</h2>
            <div className="flex-1 h-0.5 bg-gradient-to-r from-cyan-400/50 to-transparent ml-6" />
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-400 to-pink-400 transform md:-translate-x-1/2" />
            
            {experience.map((exp, idx) => (
              <div 
                key={idx}
                className={`relative mb-16 ${idx % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'}`}
                style={{
                  opacity: visibleSections['experience'] ? 1 : 0,
                  transform: visibleSections['experience'] ? 'translateX(0)' : `translateX(${idx % 2 === 0 ? '-50px' : '50px'})`,
                  transition: `all 0.6s ease-out ${idx * 200}ms`
                }}
              >
                {/* Timeline dot */}
                <div className={`absolute top-0 w-4 h-4 bg-cyan-400 rounded-full border-4 border-slate-950 ${idx % 2 === 0 ? 'md:right-0 md:transform md:translate-x-1/2' : 'md:left-0 md:transform md:-translate-x-1/2'} left-0`} />
                
                <div className="ml-8 md:ml-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-cyan-400/50 transition-all duration-500 group">
                  <div className="flex flex-col md:flex-row md:justify-between mb-4">
                    <div>
                      <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
                        {exp.title}
                      </h3>
                      <p className="text-xl text-gray-300 mb-1">{exp.company}</p>
                      <p className="text-gray-400">{exp.location}</p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm font-semibold">
                        {exp.period}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    {exp.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-start group/item">
                        <TrendingUp className="text-cyan-400 mr-3 mt-1 flex-shrink-0 group-hover/item:scale-110 transition-transform" size={16} />
                        <span className="text-gray-300">{achievement}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-sm hover:bg-cyan-500/20 transition-colors cursor-pointer hover:scale-105 transform duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" data-animate className="py-20 px-6 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-16">
            <Code className="text-cyan-400 mr-4" size={36} />
            <h2 className="text-5xl font-bold">Skills</h2>
            <div className="flex-1 h-0.5 bg-gradient-to-r from-cyan-400/50 to-transparent ml-6" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <BarChart3 className="text-cyan-400 mr-3" size={24} />
                Proficiency Levels
              </h3>
              {skillLevels.map((skill, idx) => (
                <SkillBar 
                  key={idx} 
                  skill={skill.name} 
                  level={skill.level} 
                  delay={idx * 100}
                  visible={visibleSections['skills']}
                />
              ))}
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 backdrop-blur-xl rounded-3xl p-8 border border-cyan-500/20 hover:border-cyan-400 transition-all duration-500">
                <Database className="text-cyan-400 mb-4" size={40} />
                <h3 className="text-2xl font-bold mb-4 text-cyan-400">Technical Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'Java', 'SQL', 'Git', 'Jira', 'LaTeX'].map((skill, idx) => (
                    <span 
                      key={idx} 
                      className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-xl text-sm hover:bg-cyan-500/30 transition-all cursor-pointer hover:scale-110 transform duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/20 hover:border-purple-400 transition-all duration-500">
                <Brain className="text-purple-400 mb-4" size={40} />
                <h3 className="text-2xl font-bold mb-4 text-purple-400">AI & ML</h3>
                <div className="flex flex-wrap gap-2">
                  {['Machine Learning', 'Deep Learning', 'TensorFlow', 'Hugging Face', 'LLMs', 'Computer Vision', 'TinyML'].map((skill, idx) => (
                    <span 
                      key={idx} 
                      className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-xl text-sm hover:bg-purple-500/30 transition-all cursor-pointer hover:scale-110 transform duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-pink-500/10 to-pink-500/5 backdrop-blur-xl rounded-3xl p-8 border border-pink-500/20 hover:border-pink-400 transition-all duration-500">
                <Cloud className="text-pink-400 mb-4" size={40} />
                <h3 className="text-2xl font-bold mb-4 text-pink-400">Cloud & Data Engineering</h3>
                <div className="flex flex-wrap gap-2">
                  {['GCP', 'BigQuery', 'Dataproc', 'Snowflake', 'Docker', 'Airflow', 'ETL'].map((skill, idx) => (
                    <span 
                      key={idx} 
                      className="px-4 py-2 bg-pink-500/20 border border-pink-500/30 rounded-xl text-sm hover:bg-pink-500/30 transition-all cursor-pointer hover:scale-110 transform duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Soft Skills Section */}
          <div className="mt-12">
            <h3 className="text-3xl font-bold mb-8 flex items-center">
              <Sparkles className="text-yellow-400 mr-3" size={28} />
              Soft Skills
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {softSkills.map((skill, idx) => {
                const Icon = skill.icon;
                const colorClasses = {
                  cyan: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 hover:border-cyan-400',
                  purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 hover:border-purple-400',
                  pink: 'from-pink-500/20 to-pink-600/10 border-pink-500/30 hover:border-pink-400'
                };
                
                return (
                  <div 
                    key={idx}
                    className={`bg-gradient-to-br ${colorClasses[skill.color]} border rounded-2xl p-6 text-center hover:scale-105 transform transition-all duration-300 cursor-pointer group`}
                    style={{
                      opacity: visibleSections['skills'] ? 1 : 0,
                      transform: visibleSections['skills'] ? 'scale(1)' : 'scale(0.8)',
                      transition: `all 0.4s ease-out ${idx * 100}ms`
                    }}
                  >
                    <Icon className={`mx-auto mb-3 text-${skill.color}-400 group-hover:scale-110 transition-transform`} size={32} />
                    <span className="text-sm font-semibold">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" data-animate className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <Rocket className="text-cyan-400 mr-4" size={36} />
            <h2 className="text-5xl font-bold">Featured Projects</h2>
            <div className="flex-1 h-0.5 bg-gradient-to-r from-cyan-400/50 to-transparent ml-6" />
          </div>

          {/* Project Filters */}
          <div className="flex items-center space-x-4 mb-12">
            <Filter className="text-purple-400" size={20} />
            <div className="flex flex-wrap gap-3">
              {projectCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setProjectFilter(category)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                    projectFilter === category
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/50'
                      : 'bg-white/10 border border-white/20 hover:bg-white/20'
                  }`}
                >
                  {category === 'all' ? 'All Projects' : category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={idx} project={project} index={idx} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Education Section */}
      <section id="education" data-animate className="py-20 px-6 bg-black/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-16">
            <GraduationCap className="text-cyan-400 mr-4" size={36} />
            <h2 className="text-5xl font-bold">Education</h2>
            <div className="flex-1 h-0.5 bg-gradient-to-r from-cyan-400/50 to-transparent ml-6" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div 
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-cyan-400/50 transition-all duration-500 cursor-pointer group"
              style={{
                opacity: visibleSections['education'] ? 1 : 0,
                transform: visibleSections['education'] ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.6s ease-out'
              }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <GraduationCap size={32} />
              </div>
              <h3 className="text-2xl font-bold text-cyan-400 mb-2">M.Tech. Computer Science</h3>
              <p className="text-xl text-gray-300 mb-2">National Institute of Technology, Durgapur</p>
              <p className="text-purple-400 mb-4">Data Science & AI • 2024 - Present</p>
              <div className="h-1 w-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full" />
            </div>

            <div 
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-purple-400/50 transition-all duration-500 cursor-pointer group"
              style={{
                opacity: visibleSections['education'] ? 1 : 0,
                transform: visibleSections['education'] ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.6s ease-out 200ms'
              }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <GraduationCap size={32} />
              </div>
              <h3 className="text-2xl font-bold text-purple-400 mb-2">B.Tech. Aerospace Engineering</h3>
              <p className="text-xl text-gray-300 mb-2">Kalinga Institute of Industrial Technology</p>
              <p className="text-pink-400 mb-4">Minor: Software • 2018 - 2022</p>
              <div className="h-1 w-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
            </div>
          </div>

          {/* Awards */}
          <div>
            <div className="flex items-center mb-8">
              <Award className="text-purple-400 mr-3" size={32} />
              <h3 className="text-3xl font-bold">Awards & Recognition</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { title: 'Mathco Value Award', year: '2023', icon: '🏆' },
                { title: 'Math Olympiad 1st Place', year: 'Class 11', icon: '🥇' },
                { title: 'Math Olympiad 3rd Place', year: 'Class 6', icon: '🥉' }
              ].map((award, idx) => (
                <div 
                  key={idx}
                  className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/30 rounded-2xl p-6 hover:border-yellow-400 transition-all duration-300 cursor-pointer hover:scale-105 transform"
                  style={{
                    opacity: visibleSections['education'] ? 1 : 0,
                    transform: visibleSections['education'] ? 'scale(1)' : 'scale(0.9)',
                    transition: `all 0.4s ease-out ${(idx + 2) * 150}ms`
                  }}
                >
                  <div className="text-4xl mb-3">{award.icon}</div>
                  <h4 className="font-bold text-lg mb-1">{award.title}</h4>
                  <p className="text-sm text-gray-400">{award.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" data-animate className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8">Let's Build Something Amazing</h2>
          <p className="text-xl text-gray-400 mb-12">
            Open to discussing innovative projects, research collaborations, and full-time opportunities
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <a 
              href="mailto:99pranitd@gmail.com" 
              className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-cyan-400 transition-all duration-500 transform hover:scale-105"
            >
              <Mail className="text-cyan-400 mb-4 mx-auto group-hover:scale-110 transition-transform" size={36} />
              <span className="text-sm text-gray-400 block mb-2">Email</span>
              <span className="text-white font-semibold">99pranitd@gmail.com</span>
            </a>

            <a 
              href="tel:+919348394440" 
              className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-purple-400 transition-all duration-500 transform hover:scale-105"
            >
              <Phone className="text-purple-400 mb-4 mx-auto group-hover:scale-110 transition-transform" size={36} />
              <span className="text-sm text-gray-400 block mb-2">Phone</span>
              <span className="text-white font-semibold">+91-9348394440</span>
            </a>

            <a 
              href="https://www.linkedin.com/in/pranitdas" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-pink-400 transition-all duration-500 transform hover:scale-105"
            >
              <Linkedin className="text-pink-400 mb-4 mx-auto group-hover:scale-110 transition-transform" size={36} />
              <span className="text-sm text-gray-400 block mb-2">LinkedIn</span>
              <span className="text-white font-semibold">Let's Connect</span>
            </a>
          </div>

          <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold mb-4">Interests & Hobbies</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { icon: '⚽', label: 'Football' },
                { icon: '📈', label: 'Trading' },
                { icon: '📚', label: 'Tech Articles' },
                { icon: '💪', label: 'Fitness' },
                { icon: '🤝', label: 'Volunteering' }
              ].map((hobby, idx) => (
                <span 
                  key={idx}
                  className="px-5 py-3 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full text-sm hover:scale-110 transform transition-all duration-300 cursor-pointer hover:bg-cyan-500/30"
                >
                  {hobby.icon} {hobby.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="https://github.com/pranitdas" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/pranitdas" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="mailto:99pranitd@gmail.com" className="text-gray-400 hover:text-cyan-400 transition-colors">
              <Mail size={24} />
            </a>
          </div>
          <p className="text-gray-400 mb-2">
            Built with <span className="text-red-500">♥</span> using React, Tailwind CSS, and modern web technologies
          </p>
          <p className="text-gray-500 text-sm">© 2024 Pranit Das. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;