import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, Cpu, Waves, ShieldCheck } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const RiskEngine = () => {
  const telemetryData = [
    { name: 'GPS Integrity', score: 98, status: 'Verified' },
    { name: 'Accelerometer', score: 92, status: 'Normal' },
    { name: 'Barometer Ps', score: 85, status: 'Active' },
    { name: 'Network Triang', score: 95, status: 'Secure' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="page-container"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Hardware Risk Engine</h2>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest leading-relaxed">Multidimensional Sensor Fusion Analytics</p>
        </div>
        <div className="px-6 py-3 bg-primary/10 border border-primary/20 rounded-2xl flex items-center gap-3 shadow-lg shadow-primary/5">
           <ShieldCheck size={20} className="text-primary" />
           <span className="text-xs font-black text-primary uppercase tracking-widest">Calculated Integrity: High</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="glass-card p-10 space-y-10">
           <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3">
                <Activity size={18} className="text-primary" />
                Live Telemetry Pillars
              </h3>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest animate-pulse">Scanning...</span>
           </div>
           
           <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={telemetryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={10} axisLine={false} tickLine={false} />
                    <Tooltip 
                      cursor={{fill: 'rgba(255,255,255,0.02)'}}
                      contentStyle={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '11px', color: 'white' }}
                    />
                    <Bar dataKey="score" radius={[8, 8, 0, 0]} barSize={60}>
                       {telemetryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.score > 90 ? '#14b8a6' : '#10b981'} fillOpacity={0.8} />
                       ))}
                    </Bar>
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="space-y-10">
           <div className="glass-card p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                 <Zap size={40} className="text-primary/20" />
              </div>
              <h4 className="text-lg font-black text-white uppercase tracking-tight mb-8">Sensor Fusion Core</h4>
              <div className="grid grid-cols-2 gap-8">
                 {[
                   { label: 'GPS Sync', val: '98.2%', icon: <ShieldCheck size={14} /> },
                   { label: 'Frequency', val: '60 Hz', icon: <Cpu size={14} /> },
                   { label: 'Latency', val: '2.1 ms', icon: <Cpu size={14} /> },
                   { label: 'Jitter', val: '0.4%', icon: <Waves size={14} /> }
                 ].map((stat, i) => (
                    <div key={i} className="bg-background/40 border border-white/5 p-5 rounded-2xl">
                       <div className="flex items-center gap-2 text-primary mb-2">
                          {stat.icon}
                          <span className="text-[10px] font-black uppercase tracking-widest">{stat.label}</span>
                       </div>
                       <p className="text-2xl font-black text-white">{stat.val}</p>
                    </div>
                 ))}
              </div>
           </div>

           <div className="glass-card p-10 bg-emerald-500/5 border-emerald-500/20">
              <h4 className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-6">Integrity Report</h4>
              <div className="space-y-4">
                 <p className="text-sm font-medium text-slate-300 leading-relaxed italic">
                    "Hardware telemetry matches behavioral signature for rain-protected regions. Zero-touch authority authorized."
                 </p>
                 <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Analysis ID: AX-991</span>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase font-mono tracking-widest group cursor-pointer hover:underline flex items-center gap-2">Verify on Chain <ShieldCheck size={10} /></span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RiskEngine;
