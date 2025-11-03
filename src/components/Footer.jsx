import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
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
  );
}
