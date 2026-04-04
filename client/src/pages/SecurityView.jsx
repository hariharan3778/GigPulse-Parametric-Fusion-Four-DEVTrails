import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, AlertTriangle, ChevronRight, Activity, Cpu } from 'lucide-react';

const SecurityView = () => {
  const logs = [
    { time: '13:08:27', type: 'Sensor Fusion', message: 'Atmospheric pressure drop detected (-2.4 hPa)', status: 'Valid' },
    { time: '13:08:28', type: 'Behavioral AI', message: 'Motion signature matches 2-wheeler in rain', status: 'Valid' },
    { time: '13:08:29', type: 'Network', message: 'Cell tower triangulation successful', status: 'Valid' },
    { time: '13:08:30', type: 'Gemini Engine', message: 'Multidimensional Trust Score finalized (92%)', status: 'Authorizing' },
    { time: '13:08:31', type: 'Payment API', message: 'Razorpay Wallet Payload Encrypted', status: 'Secure' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="page-container"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Security & Fraud Hub</h2>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest leading-relaxed">AI-Driven Adversarial Defense Surveillance</p>
        </div>
        <button className="flex items-center gap-3 px-6 py-3 bg-red-500/10 border border-red-500/30 rounded-2xl text-xs font-black text-red-500 uppercase tracking-widest shadow-lg shadow-red-500/5">
           <AlertTriangle size={18} />
           Force Platform Audit
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* Gemini AI Engine Pillar */}
        <div className="xl:col-span-2 glass-card p-12 bg-primary/5 border-primary/20 relative overflow-hidden flex flex-col justify-center">
           <div className="absolute -top-16 -right-16 opacity-5 pointer-events-none transform rotate-12">
              <ShieldCheck size={350} className="text-primary" />
           </div>
           
           <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
              <div className="w-24 h-24 bg-primary rounded-[2.5rem] mb-12 flex items-center justify-center shadow-2xl shadow-primary/30 animate-float">
                 <Zap size={48} className="text-white" />
              </div>
              <h4 className="text-3xl font-black text-white uppercase tracking-tighter mb-6">Gemini Trust Engine</h4>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-12 max-w-md">Multidimensional Analysis: GPS Spoofer Check, Behavioral signature, and Atmospheric mismatch detection.</p>
              
              <div className="w-full bg-background border border-white/10 p-8 rounded-[3rem] space-y-10 shadow-2xl">
                 <div className="flex justify-between items-center px-4">
                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Trust Calculation Score</span>
                    <span className="text-[11px] font-black text-emerald-400 uppercase tracking-widest font-mono">Status: Optimal</span>
                 </div>
                 <div className="w-full bg-white/5 h-4 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "99.7%" }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      className="bg-primary h-full shadow-[0_0_25px_#14b8a6]"
                    ></motion.div>
                 </div>
                 <span className="text-7xl font-black text-white tracking-tighter block mt-4">99.7%</span>
              </div>
           </div>
        </div>

        {/* Adversarial Logs */}
        <div className="space-y-10">
           <div className="glass-card overflow-hidden">
              <div className="p-10 border-b border-white/5 flex items-center justify-between">
                 <h3 className="text-sm font-black text-white uppercase tracking-widest">Defense Logs</h3>
                 <div className="flex gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Live Flow</span>
                 </div>
              </div>
              <div className="p-0">
                 {logs.map((log, i) => (
                    <div key={i} className="px-10 py-8 border-b border-white/5 last:border-0 hover:bg-white/[0.04] flex items-center justify-between group cursor-help transition-all">
                       <div className="flex items-center gap-6">
                          <div className="flex flex-col">
                             <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-1.5">{log.type}</span>
                             <span className="text-xs font-bold text-slate-300 leading-tight">{log.message}</span>
                             <span className="text-[9px] font-mono text-slate-600 mt-2">{log.time}</span>
                          </div>
                       </div>
                       <ChevronRight size={14} className="text-slate-800 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                    </div>
                 ))}
              </div>
           </div>

           <div className="glass-card p-10 bg-white/[0.02]">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-8">Threat Indicators</h3>
              <div className="space-y-6">
                 {[
                   { label: 'GPS Inconsistency', val: '0.1%', color: 'bg-emerald-500' },
                   { label: 'MAC Hash Anomaly', val: '2.1%', color: 'bg-amber-500' },
                   { label: 'Client Spoofing', val: '0.0%', color: 'bg-emerald-500' }
                 ].map((threat, i) => (
                    <div key={i} className="space-y-3">
                       <div className="flex justify-between text-[11px] font-black text-slate-400 uppercase tracking-tighter">
                          <span>{threat.label}</span>
                          <span className={threat.color.replace('bg-', 'text-')}>{threat.val}</span>
                       </div>
                       <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                          <div className={`h-full ${threat.color}`} style={{ width: threat.val === '0.0%' ? '1%' : threat.val }}></div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SecurityView;
