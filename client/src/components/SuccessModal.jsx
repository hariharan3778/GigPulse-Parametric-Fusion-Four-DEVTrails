import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShieldCheck, ArrowRight, Wallet, XCircle, AlertTriangle } from 'lucide-react';

const SuccessModal = ({ isOpen, onClose, amount = "400", trustScore = "0", claimStatus = "approved" }) => {
  const isDenied = claimStatus === 'rejected_fraud' || parseInt(trustScore) < 75;
  
  // Theme Variables Context
  const theme = {
    color: isDenied ? 'red' : 'emerald',
    primary: isDenied ? 'red-500' : 'emerald-500',
    title: isDenied ? 'Claim Denied' : 'Claim Approved',
    subtitle: isDenied ? 'High Risk Anomaly Detected' : 'Parametric trigger verified instantly',
    statusTag: isDenied ? 'Fraud Detected' : 'Verified by Gemini',
    icon: isDenied ? <XCircle size={36} className="text-white drop-shadow-md" /> : <CheckCircle2 size={36} className="text-white drop-shadow-md" />,
    payoutText: isDenied ? 'Payout Blocked' : 'Payout Initiated',
    payoutAmount: isDenied ? '₹0' : `₹${amount}`,
    payoutTag: isDenied ? 'Failed' : 'Processed',
    footerText: isDenied ? 'Transaction Flagged' : 'Transferred to Razorpay Wallet',
    buttonIcon: isDenied ? <AlertTriangle size={18} className="text-white" /> : <CheckCircle2 size={18} className="text-white" />,
    footerIcon: isDenied ? <AlertTriangle size={14} className={`text-red-400`} /> : <ArrowRight size={14} className={`text-emerald-400`} />,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-0"
          ></motion.div>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className={`fixed z-0 w-full max-w-2xl aspect-square bg-${theme.primary}/20 rounded-full blur-[120px] opacity-60 pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
          ></motion.div>

          {/* Compact Scrollable Container */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className={`relative z-10 glass-card bg-surface/80 backdrop-blur-3xl border border-${theme.primary}/30 p-6 md:p-10 max-w-lg w-full flex flex-col items-center text-center shadow-[0_0_80px_-15px_inherit] my-auto shrink-0 max-h-[85vh] overflow-y-auto overflow-x-hidden`}
            style={{ boxShadow: isDenied ? 'inset 0 0 80px -15px rgba(239, 68, 68, 0.2)' : 'inset 0 0 80px -15px rgba(16, 185, 129, 0.2)' }}
          >
            {/* Header Status */}
            <div className="mb-6 relative mt-4">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                className={`w-24 h-24 bg-gradient-to-br from-${theme.primary}/30 to-${theme.primary}/10 rounded-full flex items-center justify-center border border-${theme.primary}/40 shadow-lg shadow-${theme.primary}/20`}
              >
                <div className={`w-16 h-16 bg-gradient-to-br from-${theme.primary} to-${isDenied ? 'red-700' : 'emerald-600'} rounded-full flex items-center justify-center shadow-lg shadow-${theme.primary}/40`}>
                  {theme.icon}
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className={`absolute -top-3 -right-6 bg-gradient-to-r from-${theme.primary} to-${isDenied ? 'red-800' : 'teal-500'} px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-white shadow-xl border border-white/20`}
              >
                {theme.statusTag}
              </motion.div>
            </div>

            {/* AI Trust Score Badge */}
            <div className={`flex items-center gap-2 mb-4 px-4 py-2 bg-white/[0.03] border border-${isDenied ? 'red-500/30' : 'white/10'} rounded-full shadow-inner backdrop-blur-md`}>
              <ShieldCheck size={14} className={isDenied ? 'text-red-400' : 'text-primary'} />
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                AI Trust Score: <span className={`${isDenied ? 'text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'text-primary drop-shadow-[0_0_8px_rgba(72,187,120,0.5)]'}`}>{trustScore}%</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60 tracking-tighter uppercase mb-1 drop-shadow-xl">{theme.title}</h2>
            <p className={`text-[10px] sm:text-[11px] lg:text-xs font-bold uppercase tracking-[0.25em] mb-6 opacity-80 ${isDenied ? 'text-red-400' : 'text-slate-400'}`}>{theme.subtitle}</p>

            {/* Payout Details */}
            <div className={`w-full bg-gradient-to-b from-${theme.primary}/[0.05] to-transparent border border-${theme.primary}/20 shadow-inner rounded-[1.5rem] p-6 mb-8 overflow-hidden relative group backdrop-blur-xl shrink-0`}>
              <div className={`absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 ease-out text-${isDenied ? 'red-100' : 'emerald-100'}`}>
                <Wallet size={100} />
              </div>
              
              <div className="flex flex-col items-center gap-3 relative z-10">
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isDenied ? 'text-red-500/80' : 'text-emerald-500/80'}`}>{theme.payoutText}</span>
                <div className="flex items-baseline gap-2 pb-2">
                  <span className={`text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b tracking-tighter drop-shadow-md ${isDenied ? 'from-white via-red-100 to-red-400' : 'from-white via-emerald-100 to-emerald-400'}`}>{theme.payoutAmount}</span>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border ${isDenied ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>{theme.payoutTag}</span>
                </div>
                <div className={`flex items-center gap-2 text-xs font-bold text-slate-400 bg-black/20 px-4 py-2 rounded-xl mt-2 border ${isDenied ? 'border-red-500/20' : 'border-white/5'}`}>
                  {theme.footerIcon}
                  <span>{theme.footerText}</span>
                </div>
              </div>
            </div>

            <button 
              onClick={onClose}
              className={`relative w-full py-4 rounded-2xl text-xs font-black uppercase tracking-[0.25em] text-white overflow-hidden group hover:brightness-125 transition-all duration-300 active:scale-[0.98] border border-white/20 shrink-0 shadow-lg ${isDenied ? 'bg-red-600 shadow-red-500/30' : 'premium-gradient shadow-[0_0_40px_rgba(72,187,120,0.3)]'}`}
            >
              <span className="relative z-10 flex items-center justify-center gap-3 drop-shadow-md">
                 {theme.buttonIcon}
                 Back to Dashboard
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 ease-in-out transition-transform pointer-events-none"></span>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
