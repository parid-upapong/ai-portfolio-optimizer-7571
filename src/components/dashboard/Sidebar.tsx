import React from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Sparkles, 
  BarChart3, 
  Settings, 
  UserCircle 
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Briefcase, label: 'Portfolios', active: false },
  { icon: Sparkles, label: 'AI Strategy', active: false },
  { icon: BarChart3, label: 'Market Alignment', active: false },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 h-screen border-r border-slate-200 bg-white flex flex-col p-4">
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <Sparkles className="text-white w-5 h-5" />
        </div>
        <span className="font-bold text-xl tracking-tight text-slate-900">VisionAI</span>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              item.active 
                ? 'bg-indigo-50 text-indigo-700' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="border-t pt-4 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-md">
          <Settings className="w-4 h-4" /> Settings
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-md">
          <UserCircle className="w-4 h-4" /> Profile
        </button>
      </div>
    </aside>
  );
};