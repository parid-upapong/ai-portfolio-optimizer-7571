"use client";
import React, { useState } from 'react';
import { Sparkles, RefreshCcw, CheckCircle2, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const NarrativeEngine = () => {
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleTransform = () => {
    setIsGenerating(true);
    // Simulate AI Processing
    setTimeout(() => {
      setResult("Engineered a high-performance visual identity system that increased brand recognition by 40% within the target Gen-Z demographic. Translated abstract business goals into a concrete design language, ensuring cross-platform scalability and market alignment.");
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles size={120} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Wand2 className="text-indigo-400 w-5 h-5" />
          <h3 className="font-semibold text-lg">AI Narrative Engineering</h3>
        </div>

        <div className="space-y-4">
          <textarea
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            rows={3}
            placeholder="Paste your raw project bullet points here (e.g., 'I made a logo for a coffee shop')..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            onClick={handleTransform}
            disabled={isGenerating || !input}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium flex items-center justify-center gap-2 transition-all"
          >
            {isGenerating ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {isGenerating ? "Analyzing Impact..." : "Transform into Strategy"}
          </button>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-lg"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="text-indigo-400 w-5 h-5 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2">Optimized Narrative</p>
                    <p className="text-sm leading-relaxed text-slate-200 italic">"{result}"</p>
                    <button className="mt-4 text-xs font-semibold text-indigo-400 hover:text-indigo-300 underline underline-offset-4">
                      Apply to Portfolio
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};