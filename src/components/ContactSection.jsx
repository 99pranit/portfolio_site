import React from 'react';
import { Mail, Phone, Linkedin } from 'lucide-react';

export default function ContactSection() {
  return (
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
  );
}
