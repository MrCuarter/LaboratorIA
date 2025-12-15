import React from 'react';

interface ColorPickerProps {
  label: string;
  selectedColors: string[];
  onChange: (colors: string[]) => void;
  maxColors?: number;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ label, selectedColors, onChange, maxColors = 3 }) => {
  const addColor = (hex: string) => {
    if (selectedColors.length >= maxColors) return;
    if (!selectedColors.includes(hex)) {
      onChange([...selectedColors, hex]);
    }
  };

  const removeColor = (hex: string) => {
    onChange(selectedColors.filter(c => c !== hex));
  };

  return (
    <div className="flex flex-col space-y-2 group">
      <label className="text-cyan-400 text-xs uppercase tracking-widest font-semibold ml-1 group-hover:text-cyan-300 transition-colors">
        {label} <span className="text-slate-500 text-[10px] ml-2">({selectedColors.length}/{maxColors})</span>
      </label>
      
      <div className="bg-slate-900/80 border border-slate-700 p-3 rounded-sm flex items-center gap-3 min-h-[50px] relative">
        {/* Add Button (Hidden input hack) */}
        <label className={`
          flex items-center justify-center w-8 h-8 rounded-full border-2 border-dashed border-slate-600 
          text-slate-500 hover:text-cyan-400 hover:border-cyan-500 cursor-pointer transition-colors
          ${selectedColors.length >= maxColors ? 'opacity-30 cursor-not-allowed' : ''}
        `}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"/></svg>
          <input 
            type="color" 
            className="opacity-0 w-0 h-0 absolute"
            disabled={selectedColors.length >= maxColors}
            onChange={(e) => addColor(e.target.value)} 
          />
        </label>

        {/* Selected Colors List */}
        <div className="flex flex-wrap gap-2">
          {selectedColors.map((hex) => (
            <div key={hex} className="group/chip relative flex items-center">
               <div 
                 className="w-8 h-8 rounded-full border border-slate-500 shadow-sm"
                 style={{ backgroundColor: hex }}
               ></div>
               <button 
                onClick={() => removeColor(hex)}
                className="absolute -top-1 -right-1 bg-red-900 text-red-200 rounded-full w-4 h-4 flex items-center justify-center text-[10px] opacity-0 group-hover/chip:opacity-100 transition-opacity"
               >
                 ×
               </button>
            </div>
          ))}
        </div>
        
        {/* Decorative corner */}
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500 pointer-events-none opacity-50"></div>
      </div>
    </div>
  );
};