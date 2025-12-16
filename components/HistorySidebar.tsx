
import React from 'react';
import { GeneratedData } from '../types';
import { sfx } from '../services/audioEngine';

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  history: GeneratedData[];
  onSelect: (item: GeneratedData) => void;
  onClear: () => void;
  lang: 'ES' | 'EN';
}

export const HistorySidebar: React.FC<HistorySidebarProps> = ({ 
  isOpen, onClose, history, onSelect, onClear, lang 
}) => {
  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div className={`fixed top-0 right-0 h-full w-[85%] md:w-[400px] bg-slate-950 border-l border-cyan-900/50 z-50 transform transition-transform duration-300 shadow-[-10px_0_30px_rgba(0,0,0,0.8)] flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-4 border-b border-cyan-900/30 flex justify-between items-center bg-slate-900/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
            <h2 className="text-cyan-400 font-brand tracking-widest text-lg">MEMORY CORE</h2>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {history.length === 0 ? (
            <div className="text-center text-slate-600 font-mono text-sm mt-10 opacity-50">
              {lang === 'ES' ? "No hay datos en memoria." : "No data in memory core."}
            </div>
          ) : (
            history.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => { onSelect(item); onClose(); sfx.playClick(); }}
                onMouseEnter={() => sfx.playHover()}
                className="bg-slate-900/40 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800 p-3 rounded-sm cursor-pointer group transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-mono text-slate-500">
                    {item.timestamp ? new Date(item.timestamp).toLocaleTimeString() : 'Unknown Time'}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-cyan-600 bg-cyan-900/10 px-1 rounded">LOG #{history.length - idx}</span>
                </div>
                <p className="text-xs text-slate-300 font-mono line-clamp-3 leading-relaxed border-l-2 border-slate-700 pl-2 group-hover:border-cyan-500 transition-colors">
                  {item.prompt}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-cyan-900/30 bg-slate-900/50">
          <button 
            onClick={() => { onClear(); sfx.playClick(); }}
            className="w-full border border-red-900/50 text-red-500/70 hover:text-red-400 hover:border-red-500 hover:bg-red-950/30 py-2 text-xs font-mono tracking-widest uppercase transition-all"
          >
            {lang === 'ES' ? "[ PURGAR MEMORIA ]" : "[ PURGE MEMORY ]"}
          </button>
        </div>
      </div>
    </>
  );
};
