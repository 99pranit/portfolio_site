import React from 'react';
import { GraduationCap, Award } from 'lucide-react';

export default function EducationSection({ visibleSections }) {
  return (
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
  );
}
