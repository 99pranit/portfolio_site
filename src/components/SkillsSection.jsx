import React from 'react';
import { Code, BarChart3, Database, Brain, Sparkles } from 'lucide-react';
import SkillBar from './SkillBar';

export default function SkillsSection({ skillLevels, softSkills, visibleSections }) {
  return (
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
              <SkillBar key={idx} skill={skill.name} level={skill.level} delay={idx * 100} visible={visibleSections['skills']} />
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

        {/* Soft Skills */}
        <div className="mt-12">
          <h3 className="text-3xl font-bold mb-8 flex items-center">
            <Sparkles className="text-yellow-400 mr-3" size={28} />
            Soft Skills
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {softSkills.map((skill, idx) => {
              const Icon = require('lucide-react')[skill.icon] || require('lucide-react').Users;
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
  );
}
