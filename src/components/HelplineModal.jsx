import React from 'react';
import { Phone, AlertTriangle, ShieldCheck, X, ExternalLink } from 'lucide-react';
import { EMERGENCY_HELPLINES } from '../data/mockData';

export default function HelplineModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-5 animate-fadeIn">
        
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base">Pakistan Official Emergency Helplines</h3>
              <p className="text-xs text-slate-400">Toll-free 24/7 instant emergency dispatch</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Helpline List */}
        <div className="space-y-3">
          {EMERGENCY_HELPLINES.map((h, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 hover:border-slate-700 transition"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-100 text-sm">{h.name}</h4>
                  <span className="text-xs text-amber-400 font-urdu">{h.urduName}</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{h.desc}</p>
              </div>

              <a
                href={h.dialUri}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center gap-1.5 transition shrink-0 shadow-md shadow-emerald-500/20"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{h.number}</span>
              </a>
            </div>
          ))}
        </div>

        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            If you are stranded on Motorway (M-2, M-9, M-3, M-5) or National Highway N-5, Motorway Police (130) will provide immediate emergency patrolling escort while your fuel is delivered.
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition"
        >
          Close
        </button>

      </div>
    </div>
  );
}
