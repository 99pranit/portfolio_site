import React from 'react';
import { Rocket, Filter } from 'lucide-react';
import ProjectCard from './ProjectCard';

export default function ProjectsSection({ projects, projectFilter, setProjectFilter, projectCategories, filteredProjects, visibleSections }) {
  return (
    <section id="projects" data-animate className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Rocket className="text-cyan-400 mr-4" size={36} />
          <h2 className="text-5xl font-bold">Featured Projects</h2>
          <div className="flex-1 h-0.5 bg-gradient-to-r from-cyan-400/50 to-transparent ml-6" />
        </div>

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
            <ProjectCard key={idx} project={project} index={idx} visibleSections={visibleSections} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
