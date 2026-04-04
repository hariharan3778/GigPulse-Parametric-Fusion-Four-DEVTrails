import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Zap } from 'lucide-react';

const LoadingSpinner = ({ message = "Running Sensor Fusion Analysis..." }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-xl"
    >
      <div className="flex flex-col items-center gap-8 max-w-md w-full px-6">
        {/* Animated AI Pulse */}
        <div className="relative">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-8 bg-primary/20 rounded-full blur-3xl"
          ></motion.div>
          
          <div className="relative bg-surface border border-white/10 p-6 rounded-[2.5rem] shadow-2xl">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-t-2 border-r-2 border-primary rounded-full"
            ></motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap size={24} className="text-primary animate-pulse" />
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <h2 className="text-xl font-black text-white uppercase tracking-tighter">AI Verification Logic</h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/5 rounded-xl">
              <Activity size={14} className="text-secondary" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{message}</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/5 rounded-xl">
              <ShieldCheck size={14} className="text-primary" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Adversarial Defense Active</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-full bg-primary shadow-[0_0_10px_#14b8a6]"
          ></motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingSpinner;
