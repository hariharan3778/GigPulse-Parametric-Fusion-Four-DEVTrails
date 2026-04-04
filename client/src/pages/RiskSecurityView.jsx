import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, MapPin, Smartphone, Zap, AlertTriangle, ChevronRight, Activity as ActivityIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const RiskSecurityView = () => {
  const telemetryData = [
    { name: 'GPS', score: 98, status: 'Verified' },
    { name: 'Accel', score: 92, status: 'Normal' },
    { name: 'Barom', score: 85, status: 'Dropping' },
    { name: 'Network', score: 95, status: 'Triangulated' },
  ];

  const logs = [
    { time: '13:08:27', type: 'Sensor Fusion', message: 'Atmospheric pressure drop detected (-2.4 hPa)', status: 'Valid' },
    { time: '13:08:28', type: 'Behavioral AI', message: 'Motion signature matches 2-wheeler in rain', status: 'Valid' },
    { time: '13:08:29', type: 'Network', message: 'Cell tower triangulation successful', status: 'Valid' },
    { time: '13:08:30', type: 'Gemini Engine', message: 'Multidimensional Trust Score finalized (92%)', status: 'Authorizing' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-6 lg:p-10 space-y-10"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Risk & Security Hub</h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Real-time Adversarial Defense Monitoring</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-5 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3">
             <ShieldCheck size={18} className="text-emerald-400" />
             <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Platform Integrity: 100%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Telemetry Pillar Status */}
        <div className="xl:col-span-2 space-y-8">
           <div className="glass-card p-8">
              <div className="flex items-center justify-between mb-10">
                 <h3 className="text-sm font-black text-white uppercase tracking-widest">Multi-Source Telemetry Pillars</h3>
                 <Activity size={18} className="text-primary" />
              </div>
              
              <div className="h-[250px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={telemetryData}>
                       <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                       <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={10} axisLine={false} tickLine={false} />
                       <Tooltip 
                         cursor={{fill: 'rgba(255,255,255,0.02)'}}
                         contentStyle={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '11px', color: 'white' }}
                       />
                       <Bar dataKey="score" radius={[8, 8, 0, 0]} barSize={50}>
                          {telemetryData.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.score > 90 ? '#14b8a6' : '#10b981'} />
                          ))}
                       </Bar>
                    </BarChart>
                 </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
                 {telemetryData.map((item, i) => (
                    <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/5">
                       <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest block mb-2">{item.name}</span>
                       <div className="flex items-center justify-between">
                          <span className="text-lg font-black text-white">{item.score}%</span>
                          <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-tighter">{item.status}</span>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Security Logs */}
           <div className="glass-card overflow-hidden">
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                 <h3 className="text-sm font-black text-white uppercase tracking-widest">Adversarial Defense Logs</h3>
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Real-Time Payload</span>
              </div>
              <div className="p-0">
                 {logs.map((log, i) => (
                    <div key={i} className="px-8 py-6 border-b border-white/5 last:border-0 hover:bg-white/[0.02] flex items-center justify-between group">
                       <div className="flex items-center gap-6">
                          <span className="text-[10px] font-mono font-bold text-slate-600">{log.time}</span>
                          <div className="flex flex-col">
                             <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">{log.type}</span>
                             <span className="text-xs font-medium text-slate-300">{log.message}</span>
                          </div>
                       </div>
                       <div className="flex items-center gap-4">
                          <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">{log.status}</span>
                          <ChevronRight size={14} className="text-slate-700 opacity-0 group-hover:opacity-100 transition-all" />
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Gemini Engine Dashboard */}
        <div className="space-y-8">
           <div className="glass-card p-8 bg-primary/5 border-primary/20 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 opacity-5 pointer-events-none">
                 <ShieldCheck size={200} className="text-primary" />
              </div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                 <div className="w-20 h-20 bg-primary rounded-3xl mb-8 flex items-center justify-center shadow-2xl shadow-primary/30">
                    <Zap size={40} className="text-white" />
                 </div>
                 <h4 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">Gemini AI Engine</h4>
                 <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-8">Authorizing Zero-Touch Payloads</p>
                 
                 <div className="w-full space-y-6">
                    <div className="p-5 bg-background border border-white/5 rounded-[2rem] flex flex-col gap-4">
                       <div className="flex justify-between items-center px-2">
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Trust Calculation</span>
                          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Active</span>
                       </div>
                       <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "92%" }}
                            className="bg-primary h-full shadow-[0_0_15px_#14b8a6]"
                          ></motion.div>
                       </div>
                       <span className="text-4xl font-black text-white tracking-tighter">92%</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="bg-background/40 border border-white/5 p-4 rounded-xl">
                          <p className="text-[20px] font-black text-white">0.3%</p>
                          <p className="text-[8px] font-bold text-slate-500 uppercase mt-1">False Positives</p>
                       </div>
                       <div className="bg-background/40 border border-white/5 p-4 rounded-xl">
                          <p className="text-[20px] font-black text-white">4.2s</p>
                          <p className="text-[8px] font-bold text-slate-500 uppercase mt-1">Avg Authority</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="glass-card p-8">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Threat Indicators</h3>
              <div className="space-y-4">
                 {[
                   { label: 'GPS Inconsistency', val: '0.1%', color: 'bg-emerald-500' },
                   { label: 'Accelerometer Flatline', val: '0.4%', color: 'bg-emerald-500' },
                   { label: 'MAC Hash Anomaly', val: '2.1%', color: 'bg-amber-500' },
                   { label: 'Pressure Mismatch', val: '0.8%', color: 'bg-emerald-500' }
                 ].map((threat, i) => (
                    <div key={i} className="flex flex-col gap-2">
                       <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                          <span>{threat.label}</span>
                          <span className={threat.color.replace('bg-', 'text-')}>{threat.val}</span>
                       </div>
                       <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                          <div className={`h-full ${threat.color}`} style={{ width: threat.val }}></div>
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

export default RiskSecurityView;
