import React from 'react';
import { Zap, ArrowRight, Mail, Download, Github, ChevronDown } from 'lucide-react';

export default function Hero({ typedText, mousePosition, scrollToSection, handleResumeDownload }) {
  return (
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
  );
}
