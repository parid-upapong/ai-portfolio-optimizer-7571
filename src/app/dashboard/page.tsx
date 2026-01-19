import React from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { NarrativeEngine } from '@/components/builder/NarrativeEngine';
import { VisualIntelligenceCard } from '@/components/builder/VisualIntelligenceCard';
import { Search, Plus, ExternalLink } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Portfolio Hub</h1>
            <p className="text-slate-500">Transform your work into a strategic career asset.</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-64"
                placeholder="Search projects..." 
              />
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all">
              <Plus className="w-4 h-4" /> New Project
            </button>
          </div>
        </header>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatsCard 
            label="Market Alignment" 
            value="92/100" 
            trend={12} 
            description="Up from last month" 
          />
          <StatsCard 
            label="Narrative Score" 
            value="8.4" 
            trend={-2} 
            description="Needs more impact metrics" 
          />
          <StatsCard 
            label="Employer Interest" 
            value="342" 
            trend={24} 
            description="Profile views this week" 
          />
          <StatsCard 
            label="Hiring Confidence" 
            value="High" 
            trend={5} 
            description="Based on skill gap analysis" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Action Area */}
          <div className="lg:col-span-2 space-y-8">
            <NarrativeEngine />
            
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-bold text-lg mb-4">Strategic Projects</h3>
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-200 rounded-md bg-cover bg-center" style={{ backgroundImage: `url('https://api.placeholder.com/100/100')` }} />
                      <div>
                        <h4 className="font-semibold text-slate-900">Project Alpha: FinTech UX Case Study</h4>
                        <p className="text-xs text-slate-500">Last AI transformation: 2 days ago • Score: 94/100</p>
                      </div>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-indigo-600 transition-all">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Intelligence Sidebar */}
          <div className="space-y-8">
            <VisualIntelligenceCard />
            
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-xl p-6 text-white">
              <h4 className="font-bold mb-2">Smart Recommendation</h4>
              <p className="text-sm text-indigo-100 mb-4 leading-relaxed">
                Based on current market trends, adding a **Systems Thinking** case study would increase your match rate for "Senior Product Designer" roles by 22%.
              </p>
              <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-all border border-white/20">
                View Skill Gap Analysis
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}