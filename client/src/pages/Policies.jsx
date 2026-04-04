import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CloudRain, Clock, AlertCircle, FileText, Download } from 'lucide-react';

const Policies = () => {
  const policies = [
    {
      title: "Weather Protection Plan",
      status: "Active",
      premium: "₹50 / Week",
      coverage: "₹400 / Trigger",
      icon: <CloudRain size={24} className="text-primary" />,
      description: "Parametric protection against excessive rainfall (>50mm) in the Chennai Zone. Instant payouts with zero documentation.",
      id: "POL-7728-W"
    },
    {
      title: "Personal Accident Support",
      status: "Awaiting",
      premium: "₹45 / Week",
      coverage: "₹50,000 / Case",
      icon: <FileText size={24} className="text-emerald-400" />,
      description: "Supplemental income protection for medical emergencies and accidental injuries while on shift.",
      id: "POL-0032-A"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="page-container"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Policies & Coverage</h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Manage your active protection plans</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 premium-gradient rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20">
          <ShieldCheck size={16} />
          Purchase New Plan
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {policies.map((policy, idx) => (
          <div key={idx} className="glass-card overflow-hidden flex flex-col">
            <div className={`p-8 border-b border-white/5 flex items-start justify-between ${policy.status === 'Active' ? 'bg-primary/5' : 'bg-white/5 opacity-60'}`}>
              <div className="flex gap-6">
                <div className="p-4 bg-background/50 rounded-2xl border border-white/10 shrink-0">
                  {policy.icon}
                </div>
                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">{policy.title}</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono">ID: {policy.id}</span>
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${policy.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>
                      {policy.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-8 flex-1">
              <p className="text-slate-400 text-sm font-medium leading-relaxed">{policy.description}</p>
              
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest block mb-1">Premium</span>
                  <span className="text-lg font-black text-white">{policy.premium}</span>
                </div>
                <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest block mb-1">Max Benefit</span>
                  <span className="text-lg font-black text-white">{policy.coverage}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button className="flex-1 py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                  <Download size={14} /> View Document
                </button>
                <button className="px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                  Settings
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="glass-card border-dashed border-white/10 flex flex-col items-center justify-center p-12 text-center group cursor-pointer hover:bg-white/5 transition-all">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <AlertCircle size={32} className="text-slate-600" />
          </div>
          <h4 className="text-white font-black uppercase tracking-widest">Add Custom Plan</h4>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-2 max-w-[200px]">Design a parametric plan for your specific gig role</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Policies;
