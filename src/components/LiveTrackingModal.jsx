import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, Clock, MapPin, ShieldCheck, PhoneCall, AlertTriangle, 
  Key, Droplets, Fuel, Sparkles, Navigation 
} from 'lucide-react';

export default function LiveTrackingModal({ 
  activeDelivery, 
  onCancel, 
  onCompleteDelivery 
}) {
  if (!activeDelivery) return null;

  const [secondsRemaining, setSecondsRemaining] = useState(activeDelivery.etaMinutes * 60);
  const [deliveryStep, setDeliveryStep] = useState('en_route'); // 'en_route', 'arrived', 'dispensing', 'completed'

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          setDeliveryStep('arrived');
          return 0;
        }
        if (prev <= 60 && deliveryStep === 'en_route') {
          setDeliveryStep('arrived');
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [deliveryStep]);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  const handleSimulateArrive = () => {
    setDeliveryStep('arrived');
    setSecondsRemaining(0);
  };

  const handleSimulateDispense = () => {
    setDeliveryStep('dispensing');
    setTimeout(() => {
      setDeliveryStep('completed');
    }, 3500);
  };

  return (
    <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-6 relative overflow-hidden">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
            <h2 className="text-lg font-black tracking-tight text-white uppercase">
              {deliveryStep === 'en_route' && 'Rider En Route To Your Coordinates'}
              {deliveryStep === 'arrived' && 'Rider Has Arrived at Your Vehicle!'}
              {deliveryStep === 'dispensing' && 'Dispensing Certified Fuel into Tank...'}
              {deliveryStep === 'completed' && 'Roadside Rescue Completed Successfully!'}
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Emergency Order #{activeDelivery.otp}99 &bull; Live GPS Satellite Sync
          </p>
        </div>

        {/* Live Timer Countdown */}
        {deliveryStep === 'en_route' && (
          <div className="bg-slate-950 border border-amber-500/30 px-3.5 py-1.5 rounded-xl flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400 animate-spin" />
            <span className="text-xs text-slate-400">ETA:</span>
            <span className="text-base font-black text-amber-400 font-mono">
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </span>
          </div>
        )}
      </div>

      {/* Rider Identification & Call Bar */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 w-full sm:w-auto">
          <img
            src={activeDelivery.riderPhoto}
            alt={activeDelivery.riderName}
            className="w-13 h-13 rounded-2xl object-cover border-2 border-amber-500 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-base">{activeDelivery.riderName}</h3>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                Verified Rider
              </span>
            </div>
            <p className="text-xs text-slate-400">{activeDelivery.riderVehicle}</p>
            <p className="text-xs text-emerald-400 font-mono font-medium mt-0.5">Carrying: {activeDelivery.quantityLiters}L {activeDelivery.fuelName}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <a
            href={`tel:${activeDelivery.riderPhone}`}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-md"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call Rider</span>
          </a>
        </div>
      </div>

      {/* Safety OTP Handshake Code */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="space-y-1">
          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Key className="w-4 h-4" />
            <span>Roadside Safety OTP Handshake</span>
          </div>
          <p className="text-xs text-slate-300 max-w-md">
            Do not let anyone pour fuel without verifying this 4-digit code. Hand it to the rider to unlock the tamper-proof canister seal.
          </p>
        </div>

        <div className="bg-slate-950 border-2 border-amber-400/80 px-5 py-2.5 rounded-2xl shadow-lg">
          <span className="text-xs text-slate-400 block text-center uppercase tracking-widest font-mono">YOUR OTP</span>
          <span className="text-3xl font-black text-amber-400 font-mono tracking-widest">{activeDelivery.otp}</span>
        </div>
      </div>

      {/* Step Indicators */}
      <div className="grid grid-cols-4 gap-2 pt-1 text-center">
        {[
          { key: 'ordered', label: '1. Deal Locked', done: true },
          { key: 'en_route', label: '2. En Route', done: true, active: deliveryStep === 'en_route' },
          { key: 'arrived', label: '3. Arrived', done: ['arrived', 'dispensing', 'completed'].includes(deliveryStep), active: deliveryStep === 'arrived' },
          { key: 'completed', label: '4. Safe & Refueled', done: deliveryStep === 'completed', active: deliveryStep === 'completed' }
        ].map(st => (
          <div key={st.key} className="space-y-1.5">
            <div className={`h-2 rounded-full transition-all ${
              st.done ? 'bg-amber-500' : 'bg-slate-800'
            } ${st.active ? 'animate-pulse' : ''}`} />
            <span className={`text-[10px] sm:text-xs font-semibold ${
              st.done ? 'text-amber-400' : 'text-slate-600'
            }`}>
              {st.label}
            </span>
          </div>
        ))}
      </div>

      {/* Emergency Action Controls / Simulation shortcuts */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
        <div className="text-xs text-slate-400">
          Amount to Pay on Finish: <strong className="text-amber-400 font-mono text-sm">${activeDelivery.grandTotal.toFixed(2)}</strong> ({activeDelivery.paymentMethod.toUpperCase()})
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          {deliveryStep === 'en_route' && (
            <button
              onClick={handleSimulateArrive}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
            >
              Simulate Rider Arrival
            </button>
          )}

          {deliveryStep === 'arrived' && (
            <button
              onClick={handleSimulateDispense}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20"
            >
              <Droplets className="w-4 h-4 animate-bounce" />
              <span>Verify OTP & Pour Fuel</span>
            </button>
          )}

          {deliveryStep === 'completed' && (
            <button
              onClick={onCompleteDelivery}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Delivery Complete (Back to Home)</span>
            </button>
          )}

          {deliveryStep === 'en_route' && (
            <button
              onClick={onCancel}
              className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold border border-rose-500/20 transition"
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
