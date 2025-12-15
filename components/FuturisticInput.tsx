import React from 'react';

interface FuturisticInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
}

export const FuturisticInput: React.FC<FuturisticInputProps> = ({ label, value, onChange, placeholder, multiline = false }) => {
  return (
    <div className="flex flex-col space-y-2 group">
      <label className="text-cyan-400 text-xs uppercase tracking-widest font-semibold ml-1 group-hover:text-cyan-300 transition-colors">
        {label}
      </label>
      <div className="relative">
        {multiline ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={3}
            className="w-full bg-slate-900/80 border border-slate-700 text-slate-200 p-3 rounded-sm focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all duration-300 placeholder-slate-600 resize-none"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-slate-900/80 border border-slate-700 text-slate-200 p-3 rounded-sm focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all duration-300 placeholder-slate-600"
          />
        )}
         {/* Corner decoration */}
         <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity"></div>
         <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity"></div>
      </div>
    </div>
  );
};