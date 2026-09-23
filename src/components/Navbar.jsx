import React from 'react';
import { Fuel, AlertTriangle, PhoneCall, Globe, Shield, Phone, Sparkles } from 'lucide-react';
import { EMERGENCY_HELPLINES } from '../data/mockData';

export default function Navbar({ 
  activeMode, 
  setActiveMode, 
  onOpenHazard, 
  pendingOrdersCount = 0,
  lang,
  setLang,
  onOpenHelplines
}) {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      
      {/* Top Pakistani Emergency Ticker Bar */}
      <div className="bg-emerald-950/80 border-b border-emerald-900/50 px-4 py-1.5 text-[11px] sm:text-xs text-emerald-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold font-mono">
              🇵🇰 PAKISTAN 24/7 HELPLINES
            </span>
            <span className="hidden sm:inline text-slate-300">
              National Highway & Motorway Police (NH&MP):
            </span>
            <a 
              href="tel:130" 
              className="font-black text-amber-300 hover:text-white transition flex items-center gap-1 bg-slate-900/60 px-2 py-0.5 rounded border border-emerald-800/60"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>130</span>
            </a>
            <span className="text-slate-400 hidden md:inline">&bull;</span>
            <span className="hidden md:inline text-slate-300">Rescue:</span>
            <a 
              href="tel:1122" 
              className="hidden md:flex font-black text-emerald-300 hover:text-white transition items-center gap-1 bg-slate-900/60 px-2 py-0.5 rounded border border-emerald-800/60"
            >
              <span>1122</span>
            </a>
            <span className="text-slate-400 hidden lg:inline">&bull;</span>
            <span className="hidden lg:inline text-slate-300">Police:</span>
            <a 
              href="tel:15" 
              className="hidden lg:flex font-black text-sky-300 hover:text-white transition items-center gap-1 bg-slate-900/60 px-2 py-0.5 rounded border border-emerald-800/60"
            >
              <span>15</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenHelplines}
              className="text-amber-400 hover:text-amber-300 font-semibold underline flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3" />
              <span>All Helplines (130 / 1122 / 15 / 115)</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
              className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold border border-slate-700 transition"
              title="Toggle English / Urdu"
            >
              <Globe className="w-3 h-3 text-amber-400" />
              <span>{lang === 'en' ? 'اردو' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>

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
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  🇵🇰 Pakistan
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                {lang === 'ur' ? 'پاکستان بھر میں ہنگامی پیٹرول ڈلیوری' : 'On-Demand Emergency Roadside Fuel Dispatch'}
              </p>
            </div>
          </div>

          {/* Action buttons & Mode Switcher */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Hazard Flasher Safety Tool */}
            <button
              onClick={onOpenHazard}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-sm"
              title="Fullscreen hazard light for highway visibility"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="hidden md:inline">{lang === 'ur' ? 'ہیزرڈ لائٹ' : 'Safety Hazard Strobe'}</span>
              <span className="md:hidden">Hazard</span>
            </button>

            {/* Mode Switcher: Stranded Driver vs Rider Partner */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveMode('customer')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeMode === 'customer'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{lang === 'ur' ? 'ڈرائیور / مددگار' : 'Driver SOS'}</span>
              </button>
              
              <button
                onClick={() => setActiveMode('rider')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
                  activeMode === 'rider'
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{lang === 'ur' ? 'رائڈر پورٹل' : 'Rider Partner'}</span>
                {pendingOrdersCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
