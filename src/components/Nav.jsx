import React from 'react';
import { Download } from 'lucide-react';

export default function Nav({ activeSection, isScrolled, scrollToSection, handleResumeDownload }) {
  const sections = ['home', 'experience', 'skills', 'projects', 'education', 'contact'];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-2xl shadow-2xl border-b border-white/10' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              &lt;Pranit<span className="text-white">/</span>&gt;
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`capitalize transition-all duration-300 relative group ${activeSection === section ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}`}
              >
                {section}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-300 ${activeSection === section ? 'w-full' : 'w-0 group-hover:w-full'}`} />
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
  );
}
