import React, { useState, useEffect } from 'react';
import { AlertTriangle, X, Volume2, VolumeX, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function HazardStrobeModal({ isOpen, onClose }) {
  const [strobeActive, setStrobeActive] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [flashSpeed, setFlashSpeed] = useState('fast'); // fast, normal, slow
  const [flashColor, setFlashColor] = useState(false);

  useEffect(() => {
    if (!isOpen || !strobeActive) return;

    const intervalTime = flashSpeed === 'fast' ? 350 : flashSpeed === 'normal' ? 600 : 900;
    const interval = setInterval(() => {
      setFlashColor(prev => !prev);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isOpen, strobeActive, flashSpeed]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between overflow-hidden bg-black">
      
      {/* Flashing screen area */}
      <div 
        className={`flex-1 flex flex-col items-center justify-center p-6 text-center transition-colors duration-150 ${
          strobeActive 
            ? (flashColor ? 'bg-amber-400 text-slate-950' : 'bg-slate-950 text-amber-400 border-4 border-amber-400')
            : 'bg-slate-950 text-white'
        }`}
      >
        <div className="max-w-md mx-auto space-y-4">
          <div className="inline-flex p-4 rounded-full bg-black/20 backdrop-blur-sm">
            <AlertTriangle className={`w-20 h-20 ${strobeActive ? 'animate-bounce' : ''}`} />
          </div>

          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
            ROADSIDE HAZARD BEACON
          </h2>

          <p className="text-sm sm:text-base font-semibold max-w-sm mx-auto opacity-90">
            Prop your phone against your rear windshield or hazard triangle facing oncoming traffic to alert approaching vehicles.
          </p>

          <div className="pt-4 flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setStrobeActive(!strobeActive)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg transition ${
                strobeActive
                  ? 'bg-slate-950 text-amber-300 hover:bg-slate-900 border border-amber-300/40'
                  : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
              }`}
            >
              {strobeActive ? 'Pause Strobe' : 'Resume Flashing'}
            </button>

            <button
              onClick={() => setFlashSpeed(flashSpeed === 'fast' ? 'normal' : flashSpeed === 'normal' ? 'slow' : 'fast')}
              className="px-4 py-2.5 rounded-xl font-semibold text-xs border border-current bg-black/20 hover:bg-black/40 backdrop-blur-sm"
            >
              Speed: {flashSpeed.toUpperCase()}
            </button>
          </div>
        </div>
      </div>

      {/* Safety Instructions Bottom Bar */}
      <div className="bg-slate-900 border-t border-slate-800 p-4 sm:p-6 text-slate-200">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <ShieldAlert className="w-4 h-4" />
              <span>Critical Highway Safety Rules:</span>
            </div>
            <p className="text-xs text-slate-400">
              1. Exit vehicle from passenger side &bull; 2. Stand safely behind metal crash barrier &bull; 3. Never attempt to siphon fuel on active lanes
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition flex items-center justify-center gap-2"
          >
            <X className="w-4 h-4" />
            <span>Close Beacon & Return</span>
          </button>
        </div>
      </div>

    </div>
  );
}
