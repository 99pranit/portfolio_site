import React from 'react';
import { Sparkles, Terminal, ExternalLink, Github } from 'lucide-react';

export default function ProjectCard({ project, index, visibleSections }) {
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
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

      <div className="flex items-center justify-between mb-4">
        {project.status && (
          <div className="flex items-center space-x-2">
            <Sparkles className="text-yellow-400" size={16} />
            <span className="px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-full text-xs font-semibold">
              {project.status}
            </span>
          </div>
        )}

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

      <div className="grid grid-cols-2 gap-4 mb-6">
        {project.metrics.map((metric, idx) => (
          <div key={idx} className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="text-2xl font-bold text-cyan-400">{metric.value}{metric.label.includes('Accuracy') || metric.label.includes('Score') ? '%' : ''}</div>
            <div className="text-xs text-gray-400">{metric.label}</div>
          </div>
        ))}
      </div>

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

      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ExternalLink className="text-cyan-400" size={24} />
      </div>
    </div>
  );
}
