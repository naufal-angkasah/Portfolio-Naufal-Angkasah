import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Wrench, 
  Clock, 
  RefreshCw, 
  Activity, 
  CheckCircle2, 
  Shield 
} from "lucide-react";

export default function App() {
  const [currentUtcTime, setCurrentUtcTime] = useState("");
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [statusResult, setStatusResult] = useState<string | null>(null);
  const [progress, setProgress] = useState(74);

  // Update current time dynamically
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentUtcTime(now.toUTCString());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Slowly advance progress bar to make it feel active
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) return 98; 
        return prev + 1;
      });
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleCheckStatus = () => {
    setIsCheckingStatus(true);
    setStatusResult(null);
    setTimeout(() => {
      setIsCheckingStatus(false);
      setStatusResult("Primary node: ONLINE. Scheduled migrations: 94% complete. All other secondary processes are routing traffic seamlessly.");
    }, 1500);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-[#e0e0e0] flex flex-col justify-between font-sans selection:bg-amber-500/20 selection:text-amber-300">
      
      {/* Decorative Grid Overlay from the Immersive UI */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: "radial-gradient(#fff 1px, transparent 0)", 
          backgroundSize: "40px 40px" 
        }} 
      />

      {/* Atmospheric Background Glows from the Immersive UI */}
      <div className="absolute top-[-100px] left-[-100px] w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[-50px] right-[-50px] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center z-10">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
          id="brand-header"
        >
          <div className="w-8 h-8 border border-amber-500/30 rounded flex items-center justify-center font-bold text-sm bg-amber-500/10 backdrop-blur-md text-amber-400">
            NA
          </div>
          <span className="font-mono text-xs text-zinc-300 tracking-wider font-semibold">
            Naufal Angakasah
          </span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          id="status-badge-container"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="font-mono text-[10px] text-zinc-300 tracking-wide uppercase">
            Constructing Portfolio
          </span>
        </motion.div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center px-6 py-12 z-10">
        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl">
          
          {/* System Update Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex flex-col items-center gap-2.5"
            id="update-badge-container"
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.6)]"></div>
              <span className="uppercase tracking-[0.4em] text-xs font-semibold text-amber-500/80">
                System Under Maintenance
              </span>
            </div>
            <span className="text-zinc-500 text-[11px] font-mono tracking-widest uppercase">
              Developer Profile &bull; Naufal Angakasah
            </span>
          </motion.div>

          {/* Undergoing Maintenance Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tighter text-white mb-6 leading-none"
            id="maintenance-heading"
          >
            My Portfolio
          </motion.h1>

          {/* Mandatory user's explicit text request */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-zinc-400 max-w-2xl font-light leading-relaxed mb-12"
            id="required-maintenance-text"
          >
            This website is undergoing maintenance; please check back later. We're currently refining our infrastructure to provide you with a smoother experience.
          </motion.p>

          {/* Dual Immersive Stats Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg mb-10"
            id="stats-cards-container"
          >
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col items-start shadow-xl">
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1 font-mono">
                System Status
              </span>
              <span className="text-xl sm:text-2xl font-mono text-white flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Updating Core
              </span>
            </div>
            
            <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col items-start shadow-xl">
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1 font-mono">
                Progress Completed
              </span>
              <span className="text-xl sm:text-2xl font-mono text-white">
                {progress}% Sync
              </span>
            </div>
          </motion.div>

          {/* Progress Bar styled in the Immersive Theme with Amber/Warm gradient */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="w-full max-w-lg mb-8 space-y-2 text-left"
            id="progress-bar-container"
          >
            <div className="flex justify-between items-center text-xs font-mono text-zinc-500">
              <span className="uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="h-3 w-3 text-amber-500/80 animate-pulse" />
                Network Optimization
              </span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 p-[2px]">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-400 rounded-full relative"
              >
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:12px_12px] animate-[shimmer_1s_infinite_linear]" />
              </motion.div>
            </div>
          </motion.div>

          {/* Interactive Diagnostic Button & Status Display */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="w-full max-w-lg flex flex-col items-center gap-4"
            id="diagnostic-container"
          >
            <button
              onClick={handleCheckStatus}
              disabled={isCheckingStatus}
              className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 active:scale-98 border border-white/10 text-xs font-medium text-zinc-300 hover:text-white transition-all flex items-center gap-2.5 cursor-pointer disabled:opacity-50 shadow-lg backdrop-blur-md"
              id="status-check-button"
            >
              {isCheckingStatus ? (
                <RefreshCw className="h-3.5 w-3.5 animate-spin text-amber-400" />
              ) : (
                <Clock className="h-3.5 w-3.5 text-amber-500" />
              )}
              {isCheckingStatus ? "Interrogating Network Nodes..." : "Interrogate System Status"}
            </button>

            {statusResult && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-black/60 border border-white/10 text-left space-y-2 w-full backdrop-blur-md"
                id="diagnostic-result"
              >
                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-mono font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Live Diagnostic Report
                </div>
                <p className="text-[11px] text-zinc-400 font-mono leading-relaxed">
                  {statusResult}
                </p>
              </motion.div>
            )}
          </motion.div>

        </div>
      </main>

      {/* Footer / Status Bar */}
      <footer className="w-full max-w-7xl mx-auto border-t border-white/5 px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-4 z-10">
        <div className="flex items-center gap-2" id="footer-utc-clock">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
          <span className="text-xs font-mono text-zinc-400">SYSTEM TIME (UTC): {currentUtcTime || "Initializing..."}</span>
        </div>

        <div className="flex gap-6 text-[10px] uppercase tracking-widest text-zinc-500 font-mono" id="footer-links">
          <span className="hover:text-zinc-300 transition-colors cursor-pointer">Status Dashboard</span>
          <span className="hover:text-zinc-300 transition-colors cursor-pointer">Support Center</span>
          <span className="hover:text-zinc-300 transition-colors cursor-pointer">API Status</span>
        </div>
      </footer>

      {/* Embedded CSS animation for background shimmer of the progress bar */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0 0; }
          100% { background-position: 12px 0; }
        }
      `}</style>

    </div>
  );
}
