import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => {
  return (
    <div className={`relative ${className} group`}>
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full group-hover:bg-cyan-400/30 transition-all duration-500"></div>
      
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer Hexagon - Rotating slowly */}
        <g className="origin-center animate-[spin_10s_linear_infinite]">
          <path d="M50 5 L93.3 30 V80 L50 105 L6.7 80 V30 Z" stroke="#0e7490" strokeWidth="2" strokeDasharray="10 5" opacity="0.5" />
        </g>
        
        {/* Inner Tech Shape */}
        <path d="M50 15 L80.3 32.5 V67.5 L50 85 L19.7 67.5 V32.5 Z" stroke="#06b6d4" strokeWidth="3" fill="rgba(6,182,212,0.1)" />
        
        {/* DNA Strand / Circuit Nodes */}
        <path d="M50 25 V75" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" />
        <circle cx="50" cy="25" r="4" fill="#fff" className="animate-pulse" />
        <circle cx="50" cy="50" r="4" fill="#fff" className="animate-pulse delay-75" />
        <circle cx="50" cy="75" r="4" fill="#fff" className="animate-pulse delay-150" />
        
        {/* Horizontal connections */}
        <path d="M30 35 L70 35" stroke="#22d3ee" strokeWidth="2" opacity="0.6" />
        <path d="M30 65 L70 65" stroke="#22d3ee" strokeWidth="2" opacity="0.6" />
        
        {/* Glitch lines */}
        <rect x="45" y="40" width="10" height="20" fill="#06b6d4" className="animate-ping opacity-20" />
      </svg>
    </div>
  );
};