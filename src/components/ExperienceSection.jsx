import React from 'react';
import { Briefcase, TrendingUp } from 'lucide-react';

export default function ExperienceSection({ experience, visibleSections }) {
  return (
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
  );
}
