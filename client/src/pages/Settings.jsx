import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Wallet, Database, ShieldCheck, ArrowRight, LogOut, Bell, Smartphone, Check } from 'lucide-react';

const Settings = () => {
  const [toggles, setToggles] = useState({
    weather: true,
    payout: true,
    billing: false,
    integrity: true,
  });

  const [deviceSynced, setDeviceSynced] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const notifItems = [
    { key: 'weather',   label: 'Weather Trigger Alerts' },
    { key: 'payout',    label: 'Payout Confirmations' },
    { key: 'billing',   label: 'Premium Billing Docs' },
    { key: 'integrity', label: 'AI Integrity Alerts' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="page-container"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">SaaS Settings</h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Profile, Connectivity & Premium Billing</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 space-y-10">
           {/* Profile Section */}
           <div className="glass-card p-10">
              <div className="flex items-center justify-between mb-10">
                 <h3 className="text-sm font-black text-white uppercase tracking-widest">User Profile</h3>
                 <User size={18} className="text-primary" />
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-10">
                 <div className="relative">
                    <div className="w-32 h-32 rounded-[2.5rem] bg-primary flex items-center justify-center text-4xl font-black text-white shadow-2xl shadow-primary/20">
                       R
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-full border-4 border-background flex items-center justify-center">
                       <ShieldCheck size={16} className="text-white" />
                    </div>
                 </div>
                 
                 <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    <div className="space-y-1">
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Full Name</span>
                       <p className="text-lg font-black text-white tracking-tight">Ravi Swig-Partner</p>
                    </div>
                    <div className="space-y-1">
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Role</span>
                       <p className="text-lg font-black text-white tracking-tight">Delivery Partner (L2)</p>
                    </div>
                    <div className="space-y-1 text-slate-500">
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email</span>
                       <p className="text-sm font-bold tracking-tight">ravi_swig_102@gigpulse.app</p>
                    </div>
                    <div className="space-y-1 text-slate-500">
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Location</span>
                       <p className="text-sm font-bold tracking-tight">Chennai North, Tamil Nadu</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Connectivity Map */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card p-8 group hover:border-primary/20 transition-all cursor-pointer">
                 <div className="flex items-center justify-between mb-6">
                    <Wallet size={24} className="text-primary" />
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[9px] font-black uppercase tracking-widest rounded-full">Connected</span>
                 </div>
                 <h4 className="text-lg font-black text-white uppercase tracking-tight mb-1">Razorpay Wallet</h4>
                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Settlement destination for ₹400 payouts</p>
              </div>
              <div className="glass-card p-8 group hover:border-primary/20 transition-all cursor-pointer">
                 <div className="flex items-center justify-between mb-6">
                    <Database size={24} className="text-primary" />
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[9px] font-black uppercase tracking-widest rounded-full">Connected</span>
                 </div>
                 <h4 className="text-lg font-black text-white uppercase tracking-tight mb-1">MongoDB Cloud</h4>
                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Persistent claim & behavior storage</p>
              </div>
           </div>

           {/* Sign Out */}
           <div 
             onClick={() => setShowLogout(true)}
             className="glass-card p-10 flex items-center justify-between group hover:bg-white/[0.02] transition-all cursor-pointer"
           >
              <div className="flex items-center gap-6">
                 <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500">
                    <LogOut size={24} />
                 </div>
                 <div>
                    <h4 className="text-lg font-black text-white uppercase tracking-tight">Sign Out</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">End session on this device</p>
                 </div>
              </div>
              <ArrowRight size={20} className="text-slate-700 group-hover:text-red-500 transition-all" />
           </div>

           {/* Logout Confirmation */}
           {showLogout && (
             <motion.div
               initial={{ opacity: 0, y: -10 }}
               animate={{ opacity: 1, y: 0 }}
               className="glass-card p-8 border-red-500/20 bg-red-500/5"
             >
               <p className="text-sm font-bold text-white mb-4">Are you sure you want to sign out?</p>
               <div className="flex gap-4">
                 <button 
                   onClick={() => setShowLogout(false)}
                   className="px-6 py-3 bg-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-xl border border-white/10 hover:bg-white/10 transition-all"
                 >
                   Cancel
                 </button>
                 <button className="px-6 py-3 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:brightness-110 transition-all shadow-lg shadow-red-500/20">
                   Confirm Sign Out
                 </button>
               </div>
             </motion.div>
           )}
        </div>

        <div className="space-y-10">
           {/* Notification Center — Now Interactive */}
           <div className="glass-card p-8">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Notification Channels</h3>
                 <Bell size={18} className="text-primary" />
              </div>
              <div className="space-y-6">
                 {notifItems.map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                       <span className="text-[11px] font-bold text-slate-300 uppercase tracking-tight">{item.label}</span>
                       <button 
                         onClick={() => handleToggle(item.key)}
                         className={`w-10 h-5 rounded-full relative transition-all duration-300 ${toggles[item.key] ? 'bg-primary' : 'bg-white/10'}`}
                       >
                          <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all duration-300 ${toggles[item.key] ? 'right-1' : 'left-1'}`} />
                       </button>
                    </div>
                 ))}
              </div>
           </div>

           {/* Mobile App Sync — Now Interactive */}
           <div className="glass-card p-8 bg-primary/5 border border-primary/20">
              <Smartphone size={24} className="text-primary mb-6" />
              <h4 className="text-lg font-black text-white uppercase tracking-tight mb-2">Sync Mobile Sensors</h4>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-6">Link your device accelerometer & barometer for 100% Trust Score.</p>
              {deviceSynced ? (
                <div className="w-full py-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center gap-3 text-emerald-400">
                  <Check size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Device Synced Successfully</span>
                </div>
              ) : (
                <button 
                  onClick={() => setDeviceSynced(true)}
                  className="w-full py-4 bg-background border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary shadow-xl hover:bg-primary/10 hover:border-primary/20 transition-all active:scale-[0.98]"
                >
                  Generate Device Token
                </button>
              )}
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
