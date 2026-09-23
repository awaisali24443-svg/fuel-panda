import React from 'react';
import { Fuel, AlertTriangle, ShieldCheck, UserCheck, Bike, Flame, PhoneCall } from 'lucide-react';

export default function Navbar({ activeMode, setActiveMode, onOpenHazard, pendingOrdersCount = 0 }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveMode('customer')}>
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-600 shadow-lg shadow-orange-500/20 ring-2 ring-amber-400/40">
              <Fuel className="w-6 h-6 text-slate-950 font-bold" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">
                  FUEL PANDA
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30">
                  Rescue
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Roadside On-Demand Emergency Fuel Dispatch</p>
            </div>
          </div>

          {/* Action buttons & Mode Switcher */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Hazard Flasher Safety Tool */}
            <button
              onClick={onOpenHazard}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-sm"
              title="Fullscreen hazard light for highway visibility"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="hidden md:inline">Safety Hazard Strobe</span>
              <span className="md:hidden">Hazard</span>
            </button>

            {/* Mode Switcher: Stranded Driver vs Rider Partner */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveMode('customer')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeMode === 'customer'
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Fuel className="w-3.5 h-3.5" />
                <span>Stranded Driver</span>
              </button>
              
              <button
                onClick={() => setActiveMode('rider')}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeMode === 'rider'
                    ? 'bg-orange-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Bike className="w-3.5 h-3.5" />
                <span>Rider Mode</span>
                {pendingOrdersCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-bounce">
                    {pendingOrdersCount}
                  </span>
                )}
              </button>
            </div>

            {/* Emergency Hotline button */}
            <a
              href="tel:911"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-medium transition"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>SOS Helpline</span>
            </a>

          </div>

        </div>
      </div>
    </header>
  );
}
