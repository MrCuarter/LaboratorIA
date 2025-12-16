import React from 'react';
import { sfx } from '../services/audioEngine';

interface FuturisticToggleProps {
  leftLabel: string;
  rightLabel: string;
  value: string; // 'leftValue' or 'rightValue'
  leftValue: string;
  rightValue: string;
  onChange: (val: any) => void;
}

export const FuturisticToggle: React.FC<FuturisticToggleProps> = ({ 
  leftLabel, rightLabel, value, leftValue, rightValue, onChange 
}) => {
  const isRight = value === rightValue;

  return (
    <div 
      className="flex bg-slate-950 border border-slate-700 p-1 rounded-sm relative w-full md:w-auto min-w-[200px] cursor-pointer" 
      onClick={() => {
         onChange(isRight ? leftValue : rightValue);
         sfx.playClick();
      }}
      onMouseEnter={() => sfx.playHover()}
    >
      {/* Background slider */}
      <div 
        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-cyan-900/50 border border-cyan-500/50 transition-all duration-300 rounded-sm shadow-[0_0_10px_rgba(6,182,212,0.2)] ${isRight ? 'left-[50%]' : 'left-1'}`}
      ></div>
      
      <div className={`flex-1 text-center py-2 text-xs font-bold tracking-widest uppercase z-10 transition-colors duration-300 ${!isRight ? 'text-cyan-400' : 'text-slate-500'}`}>
        {leftLabel}
      </div>
      <div className={`flex-1 text-center py-2 text-xs font-bold tracking-widest uppercase z-10 transition-colors duration-300 ${isRight ? 'text-cyan-400' : 'text-slate-500'}`}>
        {rightLabel}
      </div>
    </div>
  );
};