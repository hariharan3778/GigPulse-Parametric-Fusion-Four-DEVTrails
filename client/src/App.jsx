import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Zap, ShieldCheck, Settings, Activity } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Policies from './pages/Policies';
import Claims from './pages/Claims';
import RiskEngine from './pages/RiskEngine';
import SecurityView from './pages/SecurityView';
import SettingsPage from './pages/Settings';

function App() {
  const location = useLocation();
  const currentPath = location.pathname.substring(1) || 'dashboard';

  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [claimStatus, setClaimStatus] = useState('idle'); // idle, analyzing, approved, rejected_weather, rejected_fraud, rejected_limit
  const [trustScore, setTrustScore] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [sensorData, setSensorData] = useState({
    accel: { x: 0, y: 0, z: 0 },
    baro: 1013
  });

  const getPageTitle = () => {
    switch (currentPath) {
      case 'dashboard': return 'Dashboard';
      case 'policies': return 'Policies & Coverage';
      case 'claims': return 'Claims Portal';
      case 'risk': return 'Risk Engine';
      case 'security': return 'Security Hub';
      case 'settings': return 'SaaS Settings';
      default: return 'GigPulse';
    }
  };

  const sharedProps = {
    isLoading, setIsLoading,
    isVerifying, setIsVerifying,
    claimStatus, setClaimStatus,
    trustScore, setTrustScore,
    currentStep, setCurrentStep,
    sensorData, setSensorData
  };

  return (
    <div className="flex h-[100dvh] bg-background text-white w-full overflow-hidden">
      {/* Sidebar - Now uses router links */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-[100dvh] overflow-hidden">
        <Navbar title={getPageTitle()} />
        
        <main className="flex-1 overflow-y-auto pb-40 lg:pb-10 transition-all duration-300">
          <Routes>
            <Route path="/" element={<Dashboard {...sharedProps} />} />
            <Route path="/dashboard" element={<Dashboard {...sharedProps} />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/claims" element={<Claims />} />
            <Route path="/risk" element={<RiskEngine />} />
            <Route path="/security" element={<SecurityView {...sharedProps} />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Dashboard {...sharedProps} />} />
          </Routes>
        </main>
        
        {/* Mobile Bottom Navigation with Lucide SVG Restorations */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 h-20 glass-sidebar border-t border-white/5 flex items-center justify-around px-8 z-50">
          <Link 
            to="/dashboard"
            className={`flex flex-col items-center gap-1.5 transition-all ${currentPath === 'dashboard' ? 'text-primary scale-110 drop-shadow-[0_0_8px_rgba(20,184,166,0.5)]' : 'text-slate-400 opacity-60 hover:opacity-100'}`}
          >
            <LayoutDashboard size={20} />
            <span className="text-[8px] font-black uppercase tracking-widest leading-none">Dash</span>
          </Link>
          <Link 
            to="/policies"
            className={`flex flex-col items-center gap-1.5 transition-all ${currentPath === 'policies' ? 'text-primary scale-110 drop-shadow-[0_0_8px_rgba(20,184,166,0.5)]' : 'text-slate-400 opacity-60 hover:opacity-100'}`}
          >
            <FileText size={20} />
            <span className="text-[8px] font-black uppercase tracking-widest leading-none">Policy</span>
          </Link>
          <Link 
            to="/claims"
            className={`flex flex-col items-center gap-1.5 transition-all ${currentPath === 'claims' ? 'text-primary scale-110 drop-shadow-[0_0_8px_rgba(20,184,166,0.5)]' : 'text-slate-400 opacity-60 hover:opacity-100'}`}
          >
            <Zap size={20} />
            <span className="text-[8px] font-black uppercase tracking-widest leading-none">Claims</span>
          </Link>
          <Link 
            to="/security"
            className={`flex flex-col items-center gap-1.5 transition-all ${currentPath === 'security' ? 'text-primary scale-110 drop-shadow-[0_0_8px_rgba(20,184,166,0.5)]' : 'text-slate-400 opacity-60 hover:opacity-100'}`}
          >
            <ShieldCheck size={20} />
            <span className="text-[8px] font-black uppercase tracking-widest leading-none">Security</span>
          </Link>
          <Link 
            to="/settings"
            className={`flex flex-col items-center gap-1.5 transition-all ${currentPath === 'settings' ? 'text-primary scale-110 drop-shadow-[0_0_8px_rgba(20,184,166,0.5)]' : 'text-slate-400 opacity-60 hover:opacity-100'}`}
          >
            <Settings size={20} />
            <span className="text-[8px] font-black uppercase tracking-widest leading-none">Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
