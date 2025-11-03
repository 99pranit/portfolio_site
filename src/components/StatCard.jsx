import React from 'react';
import useCounter from '../hooks/useCounter';

export default function StatCard({ stat, index, visibleSections }) {
  const count = useCounter(stat.value, 2000, visibleSections['stats']);

  return (
    <div 
      className="text-center transform transition-all duration-500"
      style={{ 
        transitionDelay: `${index * 100}ms`,
        opacity: visibleSections['stats'] ? 1 : 0,
        transform: visibleSections['stats'] ? 'translateY(0)' : 'translateY(20px)'
      }}
    >
      <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
        {count}{stat.suffix}
      </div>
      <div className="text-gray-400">{stat.label}</div>
    </div>
  );
}
