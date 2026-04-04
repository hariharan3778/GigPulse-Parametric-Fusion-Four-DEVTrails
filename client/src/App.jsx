import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Policies from './pages/Policies';
import Claims from './pages/Claims';
import RiskEngine from './pages/RiskEngine';
import SecurityView from './pages/SecurityView';
import Settings from './pages/Settings';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard';
      case 'policies': return 'Policies & Coverage';
      case 'claims': return 'Claims Portal';
      case 'risk': return 'Risk Engine';
      case 'security': return 'Security Hub';
      case 'settings': return 'SaaS Settings';
      default: return 'GigPulse';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'policies': return <Policies />;
      case 'claims': return <Claims />;
      case 'risk': return <RiskEngine />;
      case 'security': return <SecurityView />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-background text-white w-full overflow-hidden">
      {/* Sidebar - Pass active state and setter */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Navbar title={getPageTitle()} onNavigate={setActiveTab} />
        
        <main className="flex-1 overflow-y-auto pb-40 lg:pb-10 transition-all duration-300">
          {renderContent()}
        </main>
        
        <div className="lg:hidden fixed bottom-0 left-0 right-0 h-20 glass-sidebar border-t border-white/5 flex items-center justify-around px-8 z-50">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'dashboard' ? 'text-primary scale-110' : 'text-slate-400 opacity-50'}`}
          >
            <span className="text-xl">🏠</span>
            <span className="text-[8px] font-black uppercase tracking-widest">Dash</span>
          </button>
          <button 
            onClick={() => setActiveTab('policies')} 
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'policies' ? 'text-primary scale-110' : 'text-slate-400 opacity-50'}`}
          >
            <span className="text-xl">📄</span>
            <span className="text-[8px] font-black uppercase tracking-widest">Policy</span>
          </button>
          <button 
            onClick={() => setActiveTab('claims')} 
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'claims' ? 'text-primary scale-110' : 'text-slate-400 opacity-50'}`}
          >
            <span className="text-xl">⚡</span>
            <span className="text-[8px] font-black uppercase tracking-widest">Claims</span>
          </button>
          <button 
            onClick={() => setActiveTab('security')} 
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'security' ? 'text-primary scale-110' : 'text-slate-400 opacity-50'}`}
          >
            <span className="text-xl">🛡️</span>
            <span className="text-[8px] font-black uppercase tracking-widest">Security</span>
          </button>
          <button 
            onClick={() => setActiveTab('settings')} 
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'settings' ? 'text-primary scale-110' : 'text-slate-400 opacity-50'}`}
          >
            <span className="text-xl">⚙️</span>
            <span className="text-[8px] font-black uppercase tracking-widest">Set</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
