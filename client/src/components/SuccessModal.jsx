import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, TrendingUp, ShieldCheck, ArrowRight, Wallet } from 'lucide-react';

const SuccessModal = ({ isOpen, onClose, amount = "400", trustScore = "92" }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/60 backdrop-blur-md"
          ></motion.div>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative glass-card bg-surface/90 border border-emerald-500/30 p-8 md:p-12 max-w-lg w-full flex flex-col items-center text-center shadow-[0_0_50px_-12px_rgba(16,185,129,0.3)]"
          >
            {/* Header: Verified Status */}
            <div className="mb-10 relative">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center border-4 border-emerald-500/20"
              >
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 size={36} className="text-white" />
                </div>
              </motion.div>
              <div className="absolute -top-2 -right-2 bg-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-xl shadow-primary/20">
                Verified by Gemini
              </div>
            </div>

            {/* AI Trust Score Badge */}
            <div className="flex items-center gap-2 mb-6 px-4 py-2 bg-white/5 border border-white/5 rounded-full">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                AI Trust Score: <span className="text-emerald-400">{trustScore}%</span>
              </span>
            </div>

            <h2 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">Claim Approved</h2>
            <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.2em] mb-8">Parametric trigger verified instantly</p>

            {/* Payout Details */}
            <div className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 mb-10 overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                <Wallet size={80} />
              </div>
              
              <div className="flex flex-col items-center gap-4 relative z-10">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Payout Initiated</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-white tracking-tighter">₹{amount}</span>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Processed</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                  <ArrowRight size={14} className="text-primary" />
                  <span>Transferred to Razorpay Wallet</span>
                </div>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="w-full py-5 premium-gradient rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-emerald-500/20 hover:brightness-110 transition-all active:scale-[0.98]"
            >
              Back to Dashboard
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
