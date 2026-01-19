import React from 'react';
import { Eye, Palette, Layers, Target } from 'lucide-react';

export const VisualIntelligenceCard = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <Eye className="w-5 h-5 text-indigo-600" />
          Visual Analysis
        </h3>
        <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-1 rounded border border-amber-100 uppercase tracking-tighter">
          Computer Vision Active
        </span>
      </div>

      <div className="space-y-6">
        {/* Color Palette Analysis */}
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
            <Palette className="w-3.5 h-3.5" /> Dominant Palette
          </div>
          <div className="flex gap-2">
            {['#1E293B', '#4F46E5', '#818CF8', '#F8FAFC'].map((color) => (
              <div 
                key={color} 
                className="h-8 flex-1 rounded shadow-sm border border-slate-100" 
                style={{ backgroundColor: color }} 
              />
            ))}
          </div>
        </div>

        {/* Composition Score */}
        <div>
          <div className="flex justify-between items-center text-xs font-semibold text-slate-500 mb-2">
            <div className="flex items-center gap-2"><Layers className="w-3.5 h-3.5" /> Composition Balance</div>
            <span className="text-indigo-600 font-bold">88%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 w-[88%]" />
          </div>
        </div>

        {/* Market Alignment Tagging */}
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-2">
            <Target className="w-3.5 h-3.5" /> Detected Aesthetic Style
          </div>
          <div className="flex flex-wrap gap-2">
            {['Minimalist', 'Tech-Modern', 'High Contrast'].map(tag => (
              <span key={tag} className="text-[11px] px-2 py-1 bg-slate-50 border border-slate-200 text-slate-600 rounded-md">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};