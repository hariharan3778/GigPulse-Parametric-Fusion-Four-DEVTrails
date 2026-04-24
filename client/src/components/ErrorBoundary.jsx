import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Global UI Crash Caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[100dvh] bg-background text-white p-6 font-sans">
          <div className="bg-red-500/10 border border-red-500/30 p-8 rounded-[2.5rem] max-w-md w-full text-center relative overflow-hidden backdrop-blur-xl shadow-[0_0_80px_-15px_rgba(239,68,68,0.2)]">
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-red-500/30">
               <AlertTriangle size={40} className="text-red-500 animate-pulse" />
            </div>
            
            <h1 className="text-2xl font-black uppercase tracking-tighter mb-2 text-white drop-shadow-md">
               Service Temporarily Unavailable
            </h1>
            
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8 leading-relaxed">
               The platform encountered an unexpected anomaly. Our engineers have been securely notified.
            </p>
            
            <button 
              onClick={() => window.location.reload()}
              className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest py-4 transition-all rounded-2xl shadow-sm"
            >
              <RefreshCw size={14} className="text-slate-400" />
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
