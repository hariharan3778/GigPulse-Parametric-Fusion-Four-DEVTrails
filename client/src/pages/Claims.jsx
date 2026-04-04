import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, CloudRain, Clock, ArrowRight, Zap, History } from 'lucide-react';

const Claims = () => {
  const claims = [
    {
      id: "CLM-9102-CH",
      date: "04 Apr 2026",
      trigger: "58mm Rainfall",
      status: "Paid",
      amount: "₹400",
      razorpayId: "pay_xyz_88712",
      type: "Weather"
    },
    {
      id: "CLM-8831-CH",
      date: "28 Mar 2026",
      trigger: "52mm Rainfall",
      status: "Paid",
      amount: "₹400",
      razorpayId: "pay_abc_11223",
      type: "Weather"
    },
    {
      id: "CLM-7712-CH",
      date: "14 Mar 2026",
      trigger: "42mm Rainfall",
      status: "Rejected",
      amount: "₹0",
      reason: "Below Threshold",
      type: "Weather"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="page-container"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
        <div className="space-y-2">
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Claims Inventory</h2>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest leading-relaxed">Full Historical Ledger of Parametric Payouts</p>
        </div>
        <div className="flex gap-6">
          <div className="bg-white/5 border border-white/5 px-8 py-4 rounded-2xl flex items-center gap-4 transition-all hover:bg-white/[0.08]">
             <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none">Total Paid</span>
             <span className="text-2xl font-black text-white">₹800</span>
          </div>
          <div className="bg-primary/10 border border-primary/20 px-8 py-4 rounded-2xl flex items-center gap-4 transition-all hover:bg-primary/20 group">
             <History size={18} className="text-primary group-hover:scale-110 transition-transform" />
             <span className="text-[10px] font-black text-primary uppercase tracking-widest leading-none">Status: Eligible</span>
          </div>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-10 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
           <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Transaction Records</span>
           <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last 30 Days</span>
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-white/[0.01]">
              <tr>
                <th className="px-10 py-8 text-[11px] font-black text-slate-500 uppercase tracking-widest">Event Identification</th>
                <th className="px-10 py-8 text-[11px] font-black text-slate-500 uppercase tracking-widest">Trigger Parametrics</th>
                <th className="px-10 py-8 text-[11px] font-black text-slate-500 uppercase tracking-widest text-center">Status</th>
                <th className="px-10 py-8 text-[11px] font-black text-slate-500 uppercase tracking-widest text-right">Net Payout</th>
                <th className="px-10 py-8 text-[11px] font-black text-slate-500 uppercase tracking-widest text-right">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {claims.map((claim, idx) => (
                <tr key={idx} className="hover:bg-white/[0.03] transition-all group">
                  <td className="px-10 py-10">
                    <div className="flex flex-col gap-2">
                      <span className="text-base font-black text-white tracking-tight uppercase">{claim.id}</span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase font-mono">{claim.date}</span>
                    </div>
                  </td>
                  <td className="px-10 py-10">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                        <CloudRain size={18} className="text-primary" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-black text-slate-200 uppercase tracking-tight">{claim.trigger}</span>
                        <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{claim.type} Analysis</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-10">
                    <div className="flex justify-center">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${claim.status === 'Paid' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/20'}`}>
                        {claim.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-10 py-10 text-right">
                    <span className={`text-2xl font-black ${claim.status === 'Paid' ? 'text-white' : 'text-slate-800'}`}>{claim.amount}</span>
                  </td>
                  <td className="px-10 py-10">
                    <div className="flex justify-end">
                      <button className="flex items-center gap-2 p-4 bg-white/5 rounded-2xl border border-white/5 opacity-40 group-hover:opacity-100 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all text-[10px] text-slate-400 group-hover:text-primary font-black uppercase tracking-widest">
                        Verify <ArrowRight size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {[
          { label: 'Avg Latency', val: '4.2s', icon: <Zap size={22} />, color: 'bg-amber-500/10 text-amber-500' },
          { label: 'Auto-Resolved', val: '100%', icon: <CheckCircle2 size={22} />, color: 'bg-primary/10 text-primary' },
          { label: 'Nex-Gen Cycle', val: 'Cycle-5', icon: <Clock size={22} />, color: 'bg-emerald-500/10 text-emerald-500' }
        ].map((item, i) => (
          <div key={i} className="glass-card p-8 flex items-center gap-8 transition-all hover:translate-y-[-4px] hover:bg-white/[0.04]">
             <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center shadow-2xl`}>
                {item.icon}
             </div>
             <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">{item.label}</p>
                <p className="text-2xl font-black text-white uppercase tracking-tight">{item.val}</p>
             </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Claims;
