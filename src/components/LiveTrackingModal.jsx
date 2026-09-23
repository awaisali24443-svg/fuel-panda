import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, Clock, MapPin, ShieldCheck, PhoneCall, AlertTriangle, 
  Key, Droplets, Fuel, Sparkles, Navigation, Phone, Share2 
} from 'lucide-react';

export default function LiveTrackingModal({ 
  activeDelivery, 
  onCancel, 
  onCompleteDelivery,
  lang = 'en'
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
    }, 3000);
  };

  return (
    <div className="bg-slate-900 border border-amber-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-6 relative overflow-hidden animate-fadeIn">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
            <h2 className="text-lg font-black tracking-tight text-white uppercase">
              {deliveryStep === 'en_route' && 'Rider En Route To Stranded Location'}
              {deliveryStep === 'arrived' && 'Courier Has Arrived At Your Coordinates!'}
              {deliveryStep === 'dispensing' && 'Refueling & Breaking Canister Security Seal...'}
              {deliveryStep === 'completed' && 'Refueling Complete! Safe Journey in Pakistan!'}
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            OGRA-approved canister dispatch &bull; Real-time GPS radar tracking
          </p>
        </div>

        {/* 4-Digit Handshake OTP */}
        <div className="flex items-center gap-3 bg-amber-500/10 border border-amber-500/30 px-4 py-2 rounded-2xl">
          <Key className="w-5 h-5 text-amber-400" />
          <div>
            <span className="text-[10px] font-bold text-amber-300 block uppercase">
              Safety Verification OTP
            </span>
            <span className="text-xl font-black tracking-widest text-white font-mono">
              {activeDelivery.otp || '4829'}
            </span>
          </div>
        </div>
      </div>

      {/* Rider Information & Vehicle Details */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        
        {/* Rider Profile Card */}
        <div className="md:col-span-7 flex items-center gap-3.5 p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <img
            src={activeDelivery.riderPhoto || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'}
            alt={activeDelivery.riderName}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-500"
          />
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-white text-base">{activeDelivery.riderName}</h3>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.2 rounded-full font-semibold">
                CNIC Verified
              </span>
            </div>
            <p className="text-xs text-slate-400">{activeDelivery.riderVehicle}</p>
            <p className="text-xs text-amber-400 font-mono font-bold">
              Emergency Contact: {activeDelivery.riderPhone}
            </p>
          </div>
        </div>

        {/* Live ETA and Helpline Quick Call */}
        <div className="md:col-span-5 p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Estimated Arrival:</span>
            <div className="flex items-center gap-1.5 text-amber-400 font-mono font-black text-lg">
              <Clock className="w-4 h-4 animate-spin" />
              <span>
                {deliveryStep === 'en_route' 
                  ? `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
                  : 'ARRIVED'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1 border-t border-slate-800/80">
            <a
              href={`tel:${activeDelivery.riderPhone}`}
              className="flex-1 py-1.5 px-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition flex items-center justify-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Rider</span>
            </a>

            <a
              href="tel:130"
              className="py-1.5 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1"
              title="National Highway & Motorway Police"
            >
              <span>NH&MP 130</span>
            </a>
          </div>
        </div>

      </div>

      {/* Order & Location Strip in PKR */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
        <div>
          <span className="text-slate-500 block">Fuel Dispatched:</span>
          <span className="font-bold text-slate-200">{activeDelivery.quantityLiters} Litres &bull; {activeDelivery.fuelName.split('(')[0]}</span>
        </div>
        <div>
          <span className="text-slate-500 block">Agreed Amount (PKR):</span>
          <span className="font-extrabold text-amber-400 font-mono text-sm">
            Rs. {Math.round(activeDelivery.grandTotal).toLocaleString()} ({activeDelivery.paymentMethod.toUpperCase()})
          </span>
        </div>
        <div>
          <span className="text-slate-500 block">Stranded Address:</span>
          <span className="font-semibold text-slate-300 truncate block">{activeDelivery.userLocation.address}</span>
        </div>
      </div>

      {/* Progress Timeline Stepper */}
      <div className="relative pt-2">
        <div className="flex items-center justify-between text-xs">
          <div className={`flex items-center gap-1.5 font-semibold ${deliveryStep !== 'en_route' ? 'text-emerald-400' : 'text-amber-400'}`}>
            <CheckCircle2 className="w-4 h-4" />
            <span>1. Dispatched</span>
          </div>
          <div className={`flex items-center gap-1.5 font-semibold ${deliveryStep === 'arrived' || deliveryStep === 'dispensing' || deliveryStep === 'completed' ? 'text-amber-400' : 'text-slate-500'}`}>
            <Navigation className="w-4 h-4" />
            <span>2. On-Site</span>
          </div>
          <div className={`flex items-center gap-1.5 font-semibold ${deliveryStep === 'dispensing' || deliveryStep === 'completed' ? 'text-amber-400' : 'text-slate-500'}`}>
            <Droplets className="w-4 h-4" />
            <span>3. Dispensing</span>
          </div>
          <div className={`flex items-center gap-1.5 font-semibold ${deliveryStep === 'completed' ? 'text-emerald-400' : 'text-slate-500'}`}>
            <CheckCircle2 className="w-4 h-4" />
            <span>4. Done</span>
          </div>
        </div>
      </div>

      {/* Simulation & Action Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
        <div className="flex items-center gap-2">
          {deliveryStep === 'en_route' && (
            <button
              onClick={handleSimulateArrive}
              className="text-xs px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              Fast-Forward: Simulate Rider Arrival
            </button>
          )}

          {deliveryStep === 'arrived' && (
            <button
              onClick={handleSimulateDispense}
              className="text-xs px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition flex items-center gap-1"
            >
              <Droplets className="w-3.5 h-3.5" />
              <span>Verify OTP & Pour Fuel</span>
            </button>
          )}

          {deliveryStep === 'completed' && (
            <button
              onClick={onCompleteDelivery}
              className="text-xs px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition flex items-center gap-1"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Finish & Close Mission</span>
            </button>
          )}
        </div>

        <button
          onClick={onCancel}
          className="text-xs text-rose-400 hover:text-rose-300 hover:underline"
        >
          Cancel Dispatch
        </button>
      </div>

    </div>
  );
}
