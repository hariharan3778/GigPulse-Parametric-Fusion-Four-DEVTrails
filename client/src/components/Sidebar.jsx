import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Zap, 
  ShieldCheck, 
  ShieldAlert, 
  Settings,
  Activity
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { id: 'policies', icon: <FileText size={20} />, label: 'Policies' },
    { id: 'claims', icon: <Zap size={20} />, label: 'Claims' },
    { id: 'risk', icon: <Activity size={20} />, label: 'Risk Engine' },
    { id: 'security', icon: <ShieldCheck size={20} />, label: 'Security' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className="hidden lg:flex flex-col w-64 glass-sidebar h-screen sticky top-0 p-6 z-50">
      <div className="flex items-center gap-3 mb-10 px-2 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
        <div className="w-8 h-8 rounded-lg premium-gradient flex items-center justify-center">
          <ShieldCheck className="text-white" size={20} />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">GigPulse</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeTab === item.id 
                ? 'bg-primary/20 text-primary border border-primary/20' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className={`transition-all duration-300 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
              {item.icon}
            </span>
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5 px-2">
        <div className="bg-white/5 rounded-2xl p-4 border border-white/5 group hover:border-primary/30 transition-all cursor-pointer" onClick={() => setActiveTab('security')}>
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert size={14} className="text-primary group-hover:animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">AI Protection</span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">99.7% Trust Score</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
