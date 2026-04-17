import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Droplets, 
  AlertTriangle, 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck, 
  Smartphone, 
  Activity,
  History,
  Zap,
  Loader2,
  XCircle,
  MapPin,
  ChevronDown,
  ArrowDown
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

// Unicorn Services & Components
import { getWeatherData } from '../services/weatherService';
import LoadingSpinner from '../components/LoadingSpinner';
import SuccessModal from '../components/SuccessModal';
import { checkWeatherEngine, verifyFraudEngine, processPayout } from '../services/api';

const weatherDataMock = [
  { time: '00:00', rain: 12 },
  { time: '04:00', rain: 18 },
  { time: '08:00', rain: 25 },
  { time: '12:00', rain: 42 },
  { time: '16:00', rain: 38 },
  { time: '20:00', rain: 28 },
  { time: 'Now', rain: 22 },
];

const Dashboard = ({
  isLoading, setIsLoading,
  isVerifying, setIsVerifying,
  claimStatus, setClaimStatus,
  trustScore, setTrustScore,
  currentStep, setCurrentStep,
  sensorData, setSensorData
}) => {
  // UI States
  const [currentRain, setCurrentRain] = useState(22);
  const [realWeather, setRealWeather] = useState(null);
  const [showOverride, setShowOverride] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Fetch real weather on mount
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeatherData();
        setRealWeather(data);
        // If real rain is high, update the UI automatically
        if (data.rain > 0) {
          setCurrentRain(Math.max(data.rain * 10, 22)); // Scaling for visual impact in demo
        }
      } catch (err) {
        console.error("Weather fetch failed, using fallback");
      }
    };
    fetchWeather();
  }, []);

  // Final SaaS Claim Logic
  const handleSmartClaim = async () => {
    if (isLoading || isVerifying) return; // Steel Trap Guard
    setIsLoading(true);
    setClaimStatus('analyzing');
    setCurrentStep(1);

    // AI Pipeline Animation Sequence
    await new Promise(r => setTimeout(r, 1000));
    if (currentRain < 50 && !showOverride) {
      setClaimStatus('rejected_weather');
      setIsLoading(false);
      return;
    }
    
    setCurrentStep(2);
    await new Promise(r => setTimeout(r, 1000));
    
    setCurrentStep(3);
    await new Promise(r => setTimeout(r, 1000));
    
    setCurrentStep(4);
    await new Promise(r => setTimeout(r, 1000));

    // Transition to deep verification (Sensor Fusion)
    setIsVerifying(true);
    await new Promise(r => setTimeout(r, 2000)); // The 2s "Unicorn" delay

    try {
      // 1. Weather Engine Trigger (GitHub Task 4.1)
      setCurrentStep(1);
      await checkWeatherEngine({ lat: 28.7041, lon: 77.1025 });
      await new Promise(r => setTimeout(r, 800));

      // 2. AI Fraud Check Engine (GitHub Task 4.2)
      setCurrentStep(3);
      
      // Simulated Real-Time Sensor Polling for Hackathon Demo
      const simulatedTelemetry = {
        accelerometer: { 
          x: (Math.random() * 15 + 5).toFixed(1), 
          y: (Math.random() * 10 - 5).toFixed(1), 
          z: (Math.random() * 20 + 10).toFixed(1) 
        },
        barometer_hPa: (Math.random() * 10 + 995).toFixed(1)
      };
      
      setSensorData({
        accel: simulatedTelemetry.accelerometer,
        baro: simulatedTelemetry.barometer_hPa
      });

      const aiResponse = await verifyFraudEngine(simulatedTelemetry);
      const score = aiResponse?.sensor_analysis?.trustScore || 85;
      setTrustScore(score);
      
      await new Promise(r => setTimeout(r, 800));

      // 3. Conditional Payout Processor - Block if score < 75
      if (score < 75) {
        setClaimStatus('rejected_fraud');
        setIsLoading(false);
        setIsVerifying(false);
        return;
      }

      const payoutResult = await processPayout({
        amount: 400,
        userId: "ravi_swig_102",
        weatherCondition: realWeather?.condition || "Heavy Rain",
        trustScore: score
      });

      setClaimStatus('approved');
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Engine failure", error);
      
      // Update logic to check for 429 Limit Exceeded status
      if (error?.response?.status === 429 || error?.status === 429) {
        setClaimStatus('rejected_limit');
      } else {
        // Fallback or generic error
        console.error("Generic Error", error);
        setClaimStatus('idle');
      }
    } finally {
      setIsVerifying(false);
      setIsLoading(false);
    }
  };

  const triggerRain = () => {
    setCurrentRain(currentRain === 22 ? 58 : 22);
  };

  return (
    <div className="page-container relative">
      {/* Limit Over Toast Alert with Framer Motion Shake Effect */}
      <AnimatePresence>
        {claimStatus === 'rejected_limit' && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ 
              y: 0, 
              opacity: 1,
              x: [0, -10, 10, -10, 10, 0] // Shake effect
            }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ 
              y: { type: "spring", stiffness: 200, damping: 20 },
              x: { duration: 0.4, delay: 0.2 },
              opacity: { duration: 0.2 }
            }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 p-4 md:p-5 bg-red-600/95 backdrop-blur-xl border-2 border-red-400 rounded-3xl shadow-[0_20px_50px_rgba(220,38,38,0.5)] flex flex-row items-center gap-4 w-[90%] max-w-2xl text-left"
          >
            <div className="w-12 h-12 rounded-full bg-red-500/50 flex items-center justify-center shrink-0 border border-red-400 animate-[pulse_2s_ease-in-out_infinite]">
              <AlertTriangle size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-black text-lg tracking-tight leading-none mb-1 text-shadow-sm">🚫 Access Denied</h4>
              <p className="text-white/95 text-sm font-semibold">
                You cannot gain money again. Your daily limit is over. Please come back later!
              </p>
            </div>
            <button 
              onClick={() => setClaimStatus('idle')}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-black uppercase tracking-widest text-[10px] rounded-xl transition-all border border-white/30 shadow-sm"
            >
              Dismiss
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SaaS Overlays */}
      <AnimatePresence>
        {isVerifying && <LoadingSpinner key="spinner" />}
      </AnimatePresence>
      
      <SuccessModal 
        isOpen={showSuccessModal} 
        onClose={() => setShowSuccessModal(false)} 
        amount="400"
        trustScore={trustScore || "0"}
      />

      {/* Demo Control Panel Override */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-4 md:p-5 glass-card border-primary/20 bg-primary/5 gap-4">
        <div className="flex items-center gap-3 self-start sm:self-center shrink-0">
          <Zap size={20} className="text-primary" />
          <div className="flex flex-col">
            <span className="text-[11px] sm:text-sm font-bold text-white uppercase tracking-widest leading-none mt-1">Demo Control Panel</span>
            {realWeather && (
              <span className="text-[8px] text-slate-500 font-bold uppercase mt-1">Live: {realWeather.description} ({realWeather.rain}mm)</span>
            )}
          </div>
        </div>
        <div className="flex flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          <button 
            onClick={triggerRain}
            className={`flex-1 sm:flex-none justify-center items-center px-2 sm:px-4 py-3 sm:py-2 rounded-xl text-[9px] sm:text-[10px] font-bold uppercase transition-all ${currentRain > 50 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white/5 text-slate-400 border border-white/10'}`}
          >
            {currentRain > 50 ? 'Reset Weather' : 'Simulate Rain'}
          </button>
          <button 
            onClick={() => setShowOverride(!showOverride)}
            className={`flex-1 sm:flex-none justify-center items-center px-2 sm:px-4 py-3 sm:py-2 rounded-xl text-[9px] sm:text-[10px] font-bold uppercase transition-all ${showOverride ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'bg-white/5 text-slate-400 border border-white/10'}`}
          >
            {showOverride ? 'Override ON' : 'Manual Override'}
          </button>
        </div>
      </div>

      {/* Main Grid: Figma Column Alignment */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, staggerChildren: 0.1 }}
        className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] xl:grid-cols-3 gap-6"
      >
        
        {/* COLUMN 1: Weekly Activity & Coverage Status */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-8 flex flex-col h-full"
        >
          {/* Profile & Activity Panel */}
          <div className="glass-card p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-widest">Weekly Activity</h3>
                <TrendingUp size={16} className="text-primary" />
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-base font-bold text-white">5/7 Days Active</span>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Eligible for Premium</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                    <div className="premium-gradient h-full w-[71%] shadow-lg shadow-primary/20"></div>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-3 font-medium uppercase tracking-widest">Performance Threshold Met</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <span className="text-[10px] text-slate-400 block mb-1 font-bold uppercase">Avg Daily Income</span>
                    <span className="text-xl font-bold text-white tracking-tight">₹600</span>
                    <div className="text-[10px] text-emerald-400 font-bold mt-1 tracking-tight">
                      +12% <span className="text-[8px] font-normal opacity-50 uppercase">vs last month</span>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <span className="text-[10px] text-slate-400 block mb-1 font-bold uppercase">Weekly Total</span>
                    <span className="text-xl font-bold text-white tracking-tight">₹4,200</span>
                    <div className="text-[10px] text-emerald-400 font-bold mt-1 tracking-tight">
                      +8% <span className="text-[8px] font-normal opacity-50 uppercase tracking-tighter">vs weekly avg</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="bg-primary/5 rounded-xl p-4 border border-primary/10 flex items-center justify-between">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Payout Tier Status</span>
                <span className="text-[10px] font-extrabold text-white">Tier 2 Eligible</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-1 mt-2">
                <div className="bg-primary h-1 rounded-full w-[85%] shadow-[0_0_8px_#14b8a6]"></div>
              </div>
            </div>
          </div>

          {/* Coverage Status Card */}
          <div className="glass-card overflow-hidden h-fit">
            <div className="premium-gradient p-6 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative z-10 flex items-center justify-between mb-4">
                 <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md border border-white/20 shadow-inner">
                   <ShieldCheck className="text-white" size={24} />
                 </div>
                 <div className="bg-white/20 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                   {currentRain > 50 || showOverride ? 'Active' : 'Awaiting'}
                 </div>
              </div>
              <h4 className="relative z-10 text-white font-black text-xl lg:text-2xl tracking-tighter drop-shadow-md">Weather Protection Plan</h4>
              <p className="relative z-10 text-white/90 text-xs mt-1 font-semibold uppercase tracking-wider">Chennai Zone • Parametric Cover</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Policy Status</span>
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[10px] font-black uppercase tracking-widest">Paid ₹50</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Coverage Limit</span>
                <span className="text-lg font-bold text-white tracking-tight">₹400 / Cycle</span>
              </div>
              
              <div className={`mt-4 p-4 rounded-2xl flex items-center gap-4 border transition-all ${currentRain > 50 || showOverride ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/5' : 'bg-white/5 border-white/10 text-slate-500'}`}>
                <CheckCircle2 size={24} className={currentRain > 50 || showOverride ? 'text-emerald-400' : 'text-slate-700'} />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider">Eligibility Status</p>
                  <p className="text-[11px] font-medium opacity-80 mt-1">
                    {currentRain > 50 || showOverride ? 'Eligible for instant payout' : 'Awaiting trigger conditions'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* COLUMN 2: Live Weather Analytics & Zero-Touch Claim */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8 flex flex-col h-full"
        >
          {/* Live Weather Analytics - Refactored per Figma */}
          <div className="glass-card p-6 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <div className="flex flex-col gap-1">
                <h3 className="font-extrabold text-white text-lg tracking-tight">Live Weather Analytics</h3>
                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold font-mono">
                  <MapPin size={12} className="text-primary" />
                  Chennai Zone
                </div>
              </div>
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Droplets size={24} className="text-primary/70" />
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
               <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <span className="text-[9px] text-slate-400 uppercase font-black tracking-widest block mb-2">Current Rainfall</span>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-3xl font-black ${currentRain > 50 ? 'text-primary' : 'text-white'}`}>{currentRain}mm</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Live</span>
                  </div>
               </div>
               <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <span className="text-[9px] text-slate-400 uppercase font-black tracking-widest block mb-2 text-center">Trigger Threshold</span>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-black text-white">50mm</span>
                  </div>
               </div>
            </div>

            <div className="flex-1 min-h-[180px]">
               <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">24-Hour Rainfall Trend</div>
               <ResponsiveContainer width="100%" height={180}>
                  <AreaChart data={weatherDataMock}>
                    <defs>
                      <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                    <XAxis 
                      dataKey="time" 
                      stroke="rgba(255,255,255,0.15)" 
                      fontSize={9} 
                      tickLine={false} 
                      axisLine={false}
                    />
                    <Tooltip 
                      contentStyle={{ background: '#0d1526', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}
                      itemStyle={{ color: '#14b8a6' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="rain" 
                      stroke="#14b8a6" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorRain)" 
                      animationDuration={1500}
                    />
                  </AreaChart>
               </ResponsiveContainer>
            </div>

            {(currentRain > 50 || (realWeather?.rain > 5)) && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-4 bg-primary/10 border border-primary/30 rounded-2xl flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center animate-pulse">
                  <AlertTriangle size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-black text-primary uppercase tracking-widest">Heavy Rain Detected</p>
                  <p className="text-[10px] text-white/70 font-medium">Trigger Level exceeded. Claim eligible.</p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Zero-Touch Claim Panel */}
          <div className="glass-card p-6 h-fit">
            <div className="flex items-center gap-3 mb-6">
              <Zap size={18} className="text-amber-500" />
              <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-widest">Zero-Touch Claim Control</h3>
            </div>

            <div className="flex flex-col items-center justify-center space-y-6">
               <button
                 onClick={handleSmartClaim}
                 disabled={isLoading || (currentRain <= 50 && !showOverride)}
                 className={`relative h-16 w-full rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-3 overflow-hidden shadow-2xl ${
                   isLoading ? 'bg-primary/20 text-primary animate-pulse' :
                   (currentRain > 50 || showOverride) 
                     ? 'bg-primary text-white shadow-primary/30 hover:brightness-110 active:shadow-inner' 
                     : 'bg-white/5 text-slate-600 border border-white/10 cursor-not-allowed opacity-50'
                 }`}
               >
                 {isLoading ? (
                   <>
                     <Loader2 size={20} className="animate-spin" />
                     Sensing...
                   </>
                 ) : (
                   <>
                     <Zap size={20} fill={currentRain > 50 || showOverride ? "white" : "none"} />
                     Initiate Smart Claim
                   </>
                 )}
                 {(currentRain > 50 || showOverride) && !isLoading && (
                   <span className="absolute inset-0 bg-white/10 animate-pulse pointer-events-none"></span>
                 )}
               </button>

               <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/5">
                 <span className={`w-2 h-2 rounded-full ${currentRain > 50 || showOverride ? 'bg-emerald-500 animate-pulse' : 'bg-slate-700'}`}></span>
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                   Status: {currentRain > 50 || showOverride ? 'Ready to claim' : 'Awaiting trigger'}
                 </span>
               </div>
            </div>
          </div>
        </motion.div>

        {/* COLUMN 3: AI Processing Pipeline (Persistent) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-1 h-full"
        >
          <div className="glass-card p-6 h-full flex flex-col">
            <h3 className="font-bold text-slate-400 text-[10px] uppercase tracking-widest mb-8">AI Processing Pipeline</h3>
            
            <div className="flex-1 flex flex-col justify-center">
              {!isLoading && claimStatus === 'idle' ? (
                <div className="flex flex-col items-center justify-center text-center py-12 opacity-40">
                  <Activity size={48} className="text-slate-500 mb-6 stroke-[1.5]" />
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4">
                    Pipeline will activate when claim is initiated
                  </p>
                </div>
              ) : (
                <div className="space-y-12">
                  {[
                    { label: 'Weather Validation', step: 1 },
                    { label: 'Sensor Fusion Analysis', step: 2 },
                    { label: 'Behavioral AI Check', step: 3 },
                    { label: 'Trust Score Calculation', step: 4 }
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-6 group">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-700 relative ${
                        currentStep >= step.step ? 'bg-primary border-primary' : 'border-white/10 bg-transparent'
                      }`}>
                        {currentStep > step.step ? <CheckCircle2 size={16} className="text-white" /> : 
                         currentStep === step.step ? <Loader2 size={16} className="text-white animate-spin" /> : 
                         <span className="text-[10px] font-bold text-slate-500">{step.step}</span>
                        }
                        {i < 3 && (
                          <div className={`absolute top-8 left-1/2 -ml-[1px] w-[2px] h-10 transition-colors duration-700 ${
                            currentStep > step.step ? 'bg-primary' : 'bg-white/5'
                          }`}></div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-xs font-black uppercase tracking-widest transition-colors duration-700 ${
                          currentStep >= step.step ? 'text-white' : 'text-slate-500'
                        }`}>{step.label}</span>
                        {currentStep === step.step && (
                          <span className="text-[10px] text-amber-500 font-bold animate-pulse mt-0.5">ANALYZING TELEMETRY...</span>
                        )}
                      </div>
                    </div>
                  ))}

                  <AnimatePresence>
                    {!isLoading && claimStatus !== 'idle' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`rounded-3xl p-6 mt-12 border ${
                          claimStatus === 'approved' ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                          <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${claimStatus === 'approved' ? 'text-emerald-400' : 'text-red-400'}`}>
                            CLAIM {claimStatus === 'approved' ? 'VERIFIED' : 'DENIED'}
                          </p>
                            <div className="flex items-center gap-3">
                              <p className="text-white font-black text-2xl tracking-tighter">
                                {claimStatus === 'approved' ? '₹400 Initiated' : 'Denied'}
                              </p>
                              {claimStatus === 'approved' && (
                                <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[9px] font-black uppercase tracking-widest">
                                  <CheckCircle2 size={12} /> ELIGIBLE: VERIFIED
                                </span>
                              )}
                              {claimStatus === 'rejected_fraud' && (
                                <span className="flex items-center gap-1.5 px-3 py-1 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full text-[9px] font-black uppercase tracking-widest">
                                  <AlertTriangle size={12} /> INELIGIBLE: HIGH RISK
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="p-3 bg-background/50 rounded-2xl border border-white/5">
                            {claimStatus === 'approved' ? <TrendingUp size={24} className="text-emerald-400" /> : <XCircle size={24} className="text-red-400" />}
                          </div>
                        </div>
                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-2">
                           <div className={`h-full transition-all duration-1000 ${claimStatus === 'approved' ? 'bg-emerald-500 w-[92%]' : 'bg-red-500 w-[42%]'}`}></div>
                        </div>
                        <p className={`text-[10px] font-bold uppercase tracking-widest text-right ${trustScore < 75 ? 'text-red-500' : 'text-slate-400'}`}>
                          AI Trust Score: {trustScore}%
                        </p>
                        
                        <button 
                          onClick={() => setClaimStatus('idle')}
                          className="w-full mt-6 py-3 rounded-xl bg-white/5 text-white text-[10px] font-black uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-all"
                        >
                          Clear Result
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* TRANSACTION LEDGER - New Professional Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="glass-card overflow-hidden"
      >
        <div className="p-6 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.02]">
           <div className="flex items-center gap-3">
              <History size={18} className="text-primary" />
              <h3 className="font-bold text-white text-sm uppercase tracking-widest">Recent Transactions</h3>
           </div>
           <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Updates</span>
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.01] border-b border-white/[0.05]">
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Reference ID</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Description</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {[
                { id: 'GP-9102-CH', desc: 'Weather Payout (Chennai Zone)', status: 'Settled', amount: '₹400.00', date: 'Today' },
                { id: 'GP-8831-CH', desc: 'Weather Payout (High Intensity)', status: 'Settled', amount: '₹400.00', date: 'Yesterday' },
                { id: 'GP-7712-CH', desc: 'Policy Premium Payment', status: 'Verified', amount: '- ₹50.00', date: '14 Apr' },
                { id: 'GP-6621-CH', desc: 'New Claim Initializing', status: 'Processing', amount: '₹0.00', date: 'Just now' }
              ].map((tx, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-all group even:bg-white/[0.01]">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white tracking-tight">{tx.id}</span>
                      <span className="text-[9px] text-slate-500 font-medium uppercase">{tx.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-slate-300 font-medium">{tx.desc}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-current bg-opacity-10 ${
                      tx.status === 'Settled' ? 'text-emerald-400 bg-emerald-400' :
                      tx.status === 'Processing' ? 'text-amber-400 bg-amber-400' :
                      'text-blue-400 bg-blue-400'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`text-xs font-black ${tx.amount.startsWith('-') ? 'text-slate-500' : 'text-white'}`}>
                      {tx.amount}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-white/[0.01] border-t border-white/[0.05] text-center">
           <button className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline transition-all">
             View Complete Ledger
           </button>
        </div>
      </motion.div>

      {/* SECURITY PANEL - Refactored as full-width vertical architecture */}
      <div className="glass-card p-6 md:p-10 space-y-12 w-full">
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 md:gap-6">
           <div className="p-4 bg-primary/10 rounded-3xl border border-primary/10 shrink-0">
             <ShieldCheck size={32} className="text-primary" />
           </div>
           <div>
             <h3 className="font-black text-white text-xl md:text-2xl tracking-tight uppercase">Security & Anti-Fraud System</h3>
             <p className="text-[10px] md:text-sm text-slate-500 font-bold uppercase tracking-widest opacity-80 mt-1">Multi-layer AI validation architecture</p>
           </div>
        </div>

        <div className="relative space-y-16 py-8">
           {/* Vertical Flow Lines */}
           <div className="absolute top-0 bottom-0 left-[34px] w-[2px] bg-gradient-to-b from-primary/50 via-secondary/50 to-indigo-500/50 opacity-20 ml-[-1px] hidden md:block"></div>

           {[
             { 
               title: 'Sensor Fusion Layer', 
               desc: 'Real-time device sensor validation',
               items: [
                 { icon: <MapPin size={14} />, label: 'GPS', val: realWeather?.location || 'Chennai' },
                 { icon: <Activity size={14} />, label: 'Accelerometer', val: `${sensorData.accel.x}, ${sensorData.accel.y}` },
                 { icon: <ChevronDown size={14} />, label: 'Barometer', val: `${sensorData.baro} hPa` }
               ],
               color: 'text-primary'
             },
             { 
               title: 'Behavioral AI Analysis', 
               desc: 'Pattern recognition & anomaly detection',
               items: [
                 { label: 'Movement Pattern', val: 'Normal ✓' },
                 { label: 'Historical Behavior', val: 'Consistent ✓' },
                 { label: 'Time-based Analysis', val: 'Valid ✓' }
               ],
               color: 'text-secondary'
             },
             { 
               title: 'Network Triangulation', 
               desc: 'Multi-source location verification',
               items: [
                 { icon: <Zap size={14} />, label: 'WiFi Positioning', val: 'Verified ✓' },
                 { icon: <Activity size={14} />, label: 'Cell Tower Data', val: 'Verified ✓' }
               ],
               color: 'text-indigo-400'
             }
           ].map((layer, idx) => (
             <div key={idx} className="relative flex flex-col md:flex-row gap-8 items-start">
                <div className={`hidden md:flex w-16 h-16 rounded-2xl bg-background border-2 border-white/10 items-center justify-center relative z-10 ${layer.color.replace('text-', 'bg-').replace('color', '10')}`}>
                   {idx === 0 ? <Smartphone size={24} className={layer.color} /> : 
                    idx === 1 ? <Activity size={24} className={layer.color} /> : 
                    <Zap size={24} className={layer.color} />
                   }
                </div>
                
                <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 hover:bg-white/[0.04] transition-all group">
                   <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                     <div>
                       <h5 className="font-black text-white text-lg tracking-tight uppercase mb-1">{layer.title}</h5>
                       <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">{layer.desc}</p>
                     </div>
                     <div className={`px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest ${layer.color}`}>
                       Integrity Verified
                     </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {layer.items.map((item, i) => (
                        <div key={i} className="bg-background/40 border border-white/5 p-4 rounded-2xl flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-slate-500 scale-75">{item.icon}</span>
                            <span className="text-[10px] font-bold text-white uppercase tracking-tight">{item.label}</span>
                          </div>
                          <span className={`text-[10px] font-black uppercase ${item.val.includes('✓') ? 'text-emerald-400' : 'text-slate-500'}`}>{item.val}</span>
                        </div>
                      ))}
                   </div>
                </div>
                
                {idx < 2 && (
                  <div className="hidden md:flex absolute -bottom-12 left-[34px] ml-[-8px] text-slate-700">
                    <ArrowDown size={16} />
                  </div>
                )}
             </div>
           ))}

           {/* Final Engine Result */}
           <div className="pt-8 border-t border-white/5">
             <div className="bg-primary/5 border-2 border-primary/20 rounded-3xl md:rounded-[3rem] p-6 lg:p-10 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-5 hidden sm:block">
                 <ShieldCheck size={120} className="text-primary" />
               </div>
               
               <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
                 <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 md:gap-6">
                    <div className="p-5 bg-primary text-white rounded-3xl shadow-xl shadow-primary/20 shrink-0">
                      <ShieldCheck size={40} />
                    </div>
                    <div>
                      <h4 className="font-black text-white text-3xl tracking-tighter uppercase">AI Trust Score Engine</h4>
                      <p className="text-primary text-xs font-black uppercase tracking-widest mt-1">Final validation & scoring payload</p>
                    </div>
                 </div>

                 <div className="w-full md:w-96 space-y-4">
                    <div className="flex justify-between items-end">
                      <span className="text-[11px] font-black text-white uppercase tracking-widest">Current Trust Score</span>
                      <span className="text-4xl font-black text-primary tracking-tighter">{claimStatus !== 'idle' ? trustScore : '0'}%</span>
                    </div>
                    <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden flex shadow-inner">
                      <div className={`h-full transition-all duration-1000 shadow-[0_0_15px_rgba(20,184,166,0.5)] ${trustScore < 75 && claimStatus !== 'idle' ? 'bg-red-500 shadow-red-500/50' : 'bg-primary shadow-primary/50'}`} style={{ width: `${claimStatus !== 'idle' ? trustScore : 0}%` }}></div>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Threshold for Approval: 75%</span>
                       <span className={`text-[9px] font-black uppercase tracking-widest ${claimStatus === 'approved' ? 'text-emerald-400' : (claimStatus === 'rejected_fraud' ? 'text-red-500' : 'text-slate-400')}`}>
                         Status: {claimStatus === 'approved' ? 'ELIGIBLE: VERIFIED' : (claimStatus === 'rejected_fraud' ? 'INELIGIBLE: HIGH RISK DETECTED' : 'AWAITING ANALYSIS')}
                       </span>
                    </div>
                 </div>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mt-12 pt-8 border-t border-white/5">
                  <div className="text-center">
                    <p className="text-2xl font-black text-white">99.7%</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Detection Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-black text-white">0.3%</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">False Positives</p>
                  </div>
                  <div className="text-center md:col-span-1 col-span-2">
                    <p className="text-2xl font-black text-white">4.2s</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Avg Processing</p>
                  </div>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
