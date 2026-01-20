import React, { useState, useEffect } from 'react';
import { Laptop, Radio, Cpu, Car, AlertOctagon, ArrowRight, Lock, Unlock, Play, RotateCcw, ShieldAlert, Wifi } from 'lucide-react';

export const HackSimulation: React.FC = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timer: number;
    if (isPlaying && step < 4) {
      timer = window.setTimeout(() => {
        setStep(prev => prev + 1);
      }, 3000);
    } else if (step === 4) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, step]);

  const handlePlay = () => {
    setStep(0);
    setIsPlaying(true);
  };

  const steps = [
    {
      title: "System Nominal",
      desc: "Vehicle systems are operating normally. The infotainment system is connected to the cellular network for music and maps.",
      status: "SECURE"
    },
    {
      title: "Reconnaissance",
      desc: "Attackers scan the cellular provider's IP range (Sprint) and identify the vehicle's Uconnect head unit listening on port 6667.",
      status: "SCANNING"
    },
    {
      title: "Exploitation (OMAP)",
      desc: "Attackers exploit a vulnerability in the D-Bus service to gain root access to the OMAP (Infotainment) chip. Music volume and screen are now compromised.",
      status: "INTRUSION"
    },
    {
      title: "Lateral Movement (V850)",
      desc: "To reach the car's controls, attackers reflash the firmware of the V850 gateway chip, which bridges the Infotainment system to the CAN Bus.",
      status: "ESCALATION"
    },
    {
      title: "Execution (CAN Bus)",
      desc: "Attackers inject spoofed CAN messages. They disable brakes, kill the engine, or manipulate steering. Driver loses control.",
      status: "COMPROMISED"
    }
  ];

  const currentStepData = steps[step];

  return (
    <div className="bg-[#0B1121] rounded-2xl overflow-hidden shadow-2xl border border-slate-700 my-10 font-sans">
      
      {/* Terminal Header */}
      <div className="bg-[#060a15] p-3 flex items-center justify-between border-b border-slate-800">
        <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="text-xs text-slate-500 font-mono">SIMULATION_TERMINAL_V2.0</div>
      </div>

      {/* Simulation Screen */}
      <div className="relative h-72 md:h-96 bg-[#0f172a] p-8 flex items-center justify-between overflow-hidden">
        
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-20" 
             style={{ 
                 backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', 
                 backgroundSize: '40px 40px' 
             }}>
        </div>

        {/* Status Overlay */}
        <div className="absolute top-4 right-4 z-20">
            <span className={`px-3 py-1 rounded border font-mono text-xs font-bold ${
                step === 0 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/50' : 
                step === 4 ? 'bg-red-500/10 text-red-500 border-red-500/50 animate-pulse' :
                'bg-amber-500/10 text-amber-500 border-amber-500/50'
            }`}>
                {currentStepData.status}
            </span>
        </div>

        {/* Connection Lines */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-700 -translate-y-1/2 z-0"></div>
        
        {/* Animated Packet */}
        {step > 0 && step < 4 && (
          <div className="absolute top-1/2 left-20 w-3 h-3 bg-red-500 shadow-[0_0_10px_#ef4444] rounded-full -translate-y-1/2 z-10 animate-[ping_1s_ease-in-out_infinite]"></div>
        )}
        
        {/* Component: Attacker */}
        <div className={`relative z-10 flex flex-col items-center transition-all duration-500 ${step >= 1 ? 'opacity-100 scale-105' : 'opacity-60 grayscale'}`}>
          <div className={`p-4 rounded-xl ${step >= 1 ? 'bg-slate-800 border-2 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'bg-slate-800 border border-slate-600'}`}>
            <Laptop className={`w-8 h-8 ${step >= 1 ? 'text-red-400' : 'text-slate-500'}`} />
          </div>
          <span className="mt-3 text-[10px] uppercase tracking-widest font-bold text-slate-400">Attacker</span>
        </div>

        {/* Component: Cellular Tower */}
        <div className={`relative z-10 flex flex-col items-center transition-all duration-500 ${step >= 1 ? 'opacity-100' : 'opacity-40 grayscale'}`}>
           <Wifi className={`w-10 h-10 mb-2 ${step >= 1 ? 'text-blue-400 animate-pulse' : 'text-slate-600'}`} />
           <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Network</span>
        </div>

        {/* Component: Head Unit (OMAP) */}
        <div className={`relative z-10 flex flex-col items-center transition-all duration-500 ${step >= 2 ? 'opacity-100 scale-105' : 'opacity-60 grayscale'}`}>
          <div className={`p-4 rounded-xl ${step >= 2 ? 'bg-slate-800 border-2 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'bg-slate-800 border border-slate-600'}`}>
            <Cpu className={`w-8 h-8 ${step >= 2 ? 'text-amber-400' : 'text-slate-500'}`} />
          </div>
          <span className="mt-3 text-[10px] uppercase tracking-widest font-bold text-slate-400">Infotainment</span>
          {step === 2 && <span className="absolute -top-6 text-[10px] font-bold bg-amber-600/90 text-white px-1.5 py-0.5 rounded border border-amber-400">ROOTED</span>}
        </div>

        {/* Component: Gateway (V850) */}
        <div className={`relative z-10 flex flex-col items-center transition-all duration-500 ${step >= 3 ? 'opacity-100 scale-105' : 'opacity-60 grayscale'}`}>
           <div className={`p-3 rounded-lg ${step >= 3 ? 'bg-slate-800 border-2 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'bg-slate-800 border border-slate-600'}`}>
            <ArrowRight className={`w-6 h-6 ${step >= 3 ? 'text-orange-400' : 'text-slate-500'}`} />
          </div>
          <span className="mt-3 text-[10px] uppercase tracking-widest font-bold text-slate-400">Gateway</span>
          {step === 3 && <span className="absolute -top-6 text-[10px] font-bold bg-orange-600/90 text-white px-1.5 py-0.5 rounded border border-orange-400">PATCHED</span>}
        </div>

        {/* Component: Vehicle Controls */}
        <div className={`relative z-10 flex flex-col items-center transition-all duration-500 ${step >= 4 ? 'opacity-100 scale-110' : 'opacity-60 grayscale'}`}>
           <div className={`p-4 rounded-xl ${step >= 4 ? 'bg-red-600/20 border-2 border-red-500 animate-pulse shadow-[0_0_20px_rgba(220,38,38,0.5)]' : 'bg-slate-800 border border-slate-600'}`}>
             {step >= 4 ? <ShieldAlert className="w-8 h-8 text-red-500" /> : <Car className="w-8 h-8 text-slate-500" />}
          </div>
          <span className="mt-3 text-[10px] uppercase tracking-widest font-bold text-slate-400">Safety Critical</span>
          {step >= 4 && <span className="absolute -top-8 text-[10px] bg-red-600 text-white px-2 py-1 rounded font-bold border border-red-400 tracking-wider">COMPROMISED</span>}
        </div>

      </div>

      {/* Controls & Description */}
      <div className="bg-[#0B1121] p-6 border-t border-slate-800">
        <div className="flex items-start gap-5">
           <button 
             onClick={handlePlay} 
             disabled={isPlaying && step < 4}
             className="flex-shrink-0 mt-1 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 hover:shadow-lg hover:shadow-cyan-500/20 text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed group"
           >
             {step === 4 ? <RotateCcw className="w-6 h-6 group-hover:-rotate-90 transition-transform" /> : <Play className="w-6 h-6 ml-1" />}
           </button>
           
           <div className="flex-1">
             <div className="flex items-center gap-3 mb-3">
               <span className="text-xs font-bold uppercase tracking-widest text-cyan-500">
                 Stage {step}/4
               </span>
               <div className="h-1.5 flex-1 bg-slate-800 rounded-full overflow-hidden">
                 <div 
                   className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 ease-out"
                   style={{ width: `${(step / 4) * 100}%` }}
                 ></div>
               </div>
             </div>
             
             <h3 className="text-xl font-bold text-white mb-2 transition-all">{currentStepData.title}</h3>
             <p className="text-slate-400 leading-relaxed transition-all text-sm">{currentStepData.desc}</p>
           </div>
        </div>
      </div>
    </div>
  );
};