import React from 'react';
import StatCard from './StatCard';

export default function StatsSection({ stats, visibleSections }) {
  return (
    <section id="stats" data-animate className="py-20 px-6 bg-gradient-to-b from-slate-950 to-black/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} visibleSections={visibleSections} />
          ))}
        </div>
      </div>
    </section>
  );
}
