import React, { useState, useEffect, useRef } from 'react';
import { Bell, Search, User, X, CheckCircle2, AlertTriangle, Zap, FileText, ShieldCheck, Settings, Activity, LayoutDashboard, ChevronRight, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Searchable pages / commands
const SEARCH_ITEMS = [
  { id: 'dashboard',  label: 'Dashboard',           desc: 'Overview & live weather analytics', icon: <LayoutDashboard size={16} />, category: 'Navigation' },
  { id: 'policies',   label: 'Policies & Coverage',  desc: 'View and manage your active plans',  icon: <FileText size={16} />,        category: 'Navigation' },
  { id: 'claims',     label: 'Claims Portal',        desc: 'Claim history and new submissions',  icon: <Zap size={16} />,             category: 'Navigation' },
  { id: 'risk',       label: 'Risk Engine',          desc: 'Sensor fusion telemetry & analytics',icon: <Activity size={16} />,        category: 'Navigation' },
  { id: 'security',   label: 'Security Hub',         desc: 'AI trust score & fraud defense',     icon: <ShieldCheck size={16} />,     category: 'Navigation' },
  { id: 'settings',   label: 'SaaS Settings',        desc: 'Account, billing & notifications',   icon: <Settings size={16} />,        category: 'Navigation' },
];

const NOTIFICATIONS = [
  { id: 1, type: 'success', icon: <CheckCircle2 size={14} />, title: 'Claim #7821 Approved',     body: '₹400 transferred to Razorpay wallet', time: '2 mins ago',   read: false },
  { id: 2, type: 'warning', icon: <AlertTriangle size={14} />, title: 'Heavy Rain Alert',         body: 'Trigger threshold exceeded in Chennai', time: '15 mins ago', read: false },
  { id: 3, type: 'info',    icon: <Zap size={14} />,           title: 'Policy Auto-Renewed',      body: 'Weather Protection Plan — ₹50 charged',  time: '1 hr ago',    read: true  },
  { id: 4, type: 'success', icon: <ShieldCheck size={14} />,   title: 'Trust Score Updated',      body: 'AI score: 92% — Tier 2 status confirmed', time: '3 hrs ago',  read: true  },
];

const typeColor = {
  success: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  warning: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  info:    'text-primary bg-primary/10 border-primary/20',
};

// ─── Component ──────────────────────────────────────────────────────────────
const Navbar = ({ title, onNavigate }) => {
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifOpen,   setNotifOpen]   = useState(false);
  const [notifs,      setNotifs]      = useState(NOTIFICATIONS);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef   = useRef(null);
  const notifRef   = useRef(null);

  const unreadCount = notifs.filter(n => !n.read).length;

  // Filter search results
  const results = searchQuery.trim()
    ? SEARCH_ITEMS.filter(item =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : SEARCH_ITEMS;

  // ── Keyboard shortcut: CMD/CTRL + K
  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
        setNotifOpen(false);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setNotifOpen(false);
      }
      if (searchOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIdx(i => Math.min(i + 1, results.length - 1));
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIdx(i => Math.max(i - 1, 0));
        }
        if (e.key === 'Enter' && results[selectedIdx]) {
          handleNavigate(results[selectedIdx].id);
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [searchOpen, results, selectedIdx]);

  // Focus input when palette opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIdx(0);
    } else {
      setSearchQuery('');
    }
  }, [searchOpen]);

  // Close notif dropdown on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleNavigate = (id) => {
    onNavigate?.(id);
    setSearchOpen(false);
  };

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));

  return (
    <>
      {/* ─── Navbar bar ─────────────────────────────────────── */}
      <div className="flex items-center justify-between p-6 lg:p-8 px-10 border-b border-white/5 sticky top-0 bg-background/60 backdrop-blur-2xl z-40 w-full transition-all duration-300">
        <div className="flex items-center gap-12 lg:gap-16 flex-1">
          <h2 className="text-2xl font-black text-white tracking-tighter uppercase whitespace-nowrap min-w-[200px]">
            {title || 'Dashboard'}
          </h2>

          {/* Search trigger */}
          <button
            onClick={() => { setSearchOpen(true); setNotifOpen(false); }}
            className="hidden md:flex items-center gap-4 px-6 py-3 bg-white/5 rounded-2xl border border-white/10 w-full max-w-lg hover:bg-white/[0.08] hover:border-primary/30 transition-all text-left group"
          >
            <Search size={16} className="text-slate-400 group-hover:text-primary transition-colors" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex-1">
              Search policies, claims or analytics...
            </span>
            <div className="text-[10px] text-slate-600 font-black border border-white/10 px-2 py-1 rounded-md whitespace-nowrap">
              ⌘ K
            </div>
          </button>
        </div>

        <div className="flex items-center gap-8 pl-10 shrink-0">
          <div className="hidden sm:flex items-center gap-3 px-5 py-2.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active Coverage
          </div>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => { setNotifOpen(p => !p); setSearchOpen(false); }}
              className="relative p-2.5 text-slate-400 hover:text-white transition-all bg-white/5 rounded-xl border border-white/5 hover:border-white/10"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-background text-[9px] font-black text-white flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-14 w-96 bg-[#0d1526]/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl z-50 overflow-hidden"
                >
                  <div className="flex items-center justify-between p-5 border-b border-white/5">
                    <span className="text-sm font-black text-white uppercase tracking-widest">Notifications</span>
                    <button onClick={markAllRead} className="text-[10px] text-primary font-bold uppercase tracking-widest hover:underline">
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifs.map(n => (
                      <div
                        key={n.id}
                        onClick={() => setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}
                        className={`flex gap-4 p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-all ${!n.read ? 'bg-white/[0.02]' : ''}`}
                      >
                        <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${typeColor[n.type]}`}>
                          {n.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-black text-white truncate">{n.title}</span>
                            {!n.read && <span className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1" />}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{n.body}</p>
                          <div className="flex items-center gap-1 mt-1.5 text-slate-600">
                            <Clock size={10} />
                            <span className="text-[10px] font-bold">{n.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4">
                    <button className="w-full py-2.5 rounded-xl bg-white/5 text-primary text-[10px] font-black uppercase tracking-widest border border-white/5 hover:bg-primary/10 transition-all">
                      View All Notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Avatar */}
          <div className="hidden md:flex items-center gap-4 bg-white/5 p-2.5 pr-6 rounded-2xl border border-white/10 hover:bg-white/[0.08] cursor-pointer transition-all">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/20 p-1">
              <div className="w-full h-full rounded-lg premium-gradient flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black text-white leading-none tracking-tight">Ravi</span>
              <span className="text-[10px] text-slate-500 font-black mt-1 uppercase tracking-widest">Delivery Partner</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Command Palette ────────────────────────────────── */}
      <AnimatePresence>
        {searchOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Palette */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-xl z-50"
            >
              <div className="bg-[#0d1526]/98 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
                {/* Search Input */}
                <div className="flex items-center gap-4 px-6 py-4 border-b border-white/5">
                  <Search size={18} className="text-primary" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={e => { setSearchQuery(e.target.value); setSelectedIdx(0); }}
                    placeholder="Search pages, features, or analytics..."
                    className="flex-1 bg-transparent border-none text-sm font-medium text-white focus:outline-none placeholder:text-slate-500"
                  />
                  <button onClick={() => setSearchOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                    <X size={16} />
                  </button>
                </div>

                {/* Results */}
                <div className="py-2 max-h-80 overflow-y-auto">
                  {results.length === 0 ? (
                    <div className="py-10 text-center text-slate-500 text-sm font-medium">
                      No results for "{searchQuery}"
                    </div>
                  ) : (
                    results.map((item, idx) => (
                      <button
                        key={item.id}
                        onClick={() => handleNavigate(item.id)}
                        onMouseEnter={() => setSelectedIdx(idx)}
                        className={`w-full flex items-center gap-4 px-6 py-3 transition-all text-left group ${
                          idx === selectedIdx ? 'bg-primary/10' : 'hover:bg-white/5'
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 transition-all ${
                          idx === selectedIdx ? 'bg-primary text-white border-primary' : 'bg-white/5 text-slate-400 border-white/10'
                        }`}>
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold text-white truncate">{item.label}</div>
                          <div className="text-[11px] text-slate-500 truncate">{item.desc}</div>
                        </div>
                        <ChevronRight size={14} className={`shrink-0 transition-colors ${idx === selectedIdx ? 'text-primary' : 'text-slate-600'}`} />
                      </button>
                    ))
                  )}
                </div>

                {/* Footer hint */}
                <div className="px-6 py-3 border-t border-white/5 flex items-center gap-4">
                  <span className="text-[10px] text-slate-600 font-bold"><kbd className="px-1.5 py-0.5 rounded bg-white/10 mr-1">↑↓</kbd> Navigate</span>
                  <span className="text-[10px] text-slate-600 font-bold"><kbd className="px-1.5 py-0.5 rounded bg-white/10 mr-1">↵</kbd> Open</span>
                  <span className="text-[10px] text-slate-600 font-bold"><kbd className="px-1.5 py-0.5 rounded bg-white/10 mr-1">Esc</kbd> Close</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
