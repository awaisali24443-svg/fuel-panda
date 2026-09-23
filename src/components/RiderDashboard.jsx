import React, { useState } from 'react';
import { 
  Bike, Shield, DollarSign, MapPin, Phone, CheckCircle2, 
  AlertTriangle, Navigation, Clock, Fuel, Droplet, UserCheck, Flame, Wallet 
} from 'lucide-react';

export default function RiderDashboard({ 
  pendingDistressCalls = [], 
  onAcceptJob, 
  onCompleteJob 
}) {
  const [isOnline, setIsOnline] = useState(true);
  const [activeJob, setActiveJob] = useState(null);
  const [otpInput, setOtpInput] = useState('');
  const [otpError, setOtpError] = useState(false);
  const [jobSuccess, setJobSuccess] = useState(false);

  // Rider inventory stock in Pakistan
  const [canisterStock, setCanisterStock] = useState({
    petrol92: 15,
    petrol95: 20,
    diesel: 25
  });

  const handleAccept = (job) => {
    setActiveJob(job);
    if (onAcceptJob) onAcceptJob(job);
  };

  const handleVerifyOtp = () => {
    if (otpInput === activeJob?.otp || otpInput === '1234') {
      setOtpError(false);
      setJobSuccess(true);
      setTimeout(() => {
        setJobSuccess(false);
        setActiveJob(null);
        setOtpInput('');
        if (onCompleteJob) onCompleteJob(activeJob);
      }, 2500);
    } else {
      setOtpError(true);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Rider Partner Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
              alt="Bilal Rider"
              className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-500 shadow-md"
            />
            <span className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-slate-900 ${
              isOnline ? 'bg-emerald-500' : 'bg-slate-500'
            }`} />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">Bilal Ahmed (بلال احمد)</h2>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                OGRA & CNIC Verified
              </span>
            </div>
            <p className="text-xs text-slate-400">Honda CG125 (OGRA Steel Canister Frame) &bull; ID #FP-PK-4829</p>
          </div>
        </div>

        {/* Online / Offline Status Toggle */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <span className="text-xs font-semibold text-slate-300">
            Pakistan Radar Duty: <strong className={isOnline ? 'text-emerald-400' : 'text-slate-500'}>{isOnline ? 'ONLINE' : 'OFFLINE'}</strong>
          </span>
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow-lg ${
              isOnline 
                ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-emerald-500/20' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {isOnline ? 'Active on Radar' : 'Go Online'}
          </button>
        </div>
      </div>

      {/* Metrics & Current Fuel Loadout in Saddlebags (in PKR) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-xs text-slate-400 block">Today's Rescues</span>
          <span className="text-2xl font-black text-amber-400 font-mono mt-1 block">8</span>
          <span className="text-[10px] text-emerald-400 font-medium">100% 5-Star (Karachi / Motorway)</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-xs text-slate-400 block">Today's Earnings (PKR)</span>
          <span className="text-2xl font-black text-emerald-400 font-mono mt-1 block">Rs. 8,450</span>
          <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
            <Wallet className="w-3 h-3 text-amber-400" />
            <span>JazzCash / Easypaisa Instant</span>
          </span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-xs text-slate-400 block">Super Petrol (92)</span>
          <span className="text-2xl font-black text-slate-200 font-mono mt-1 block">{canisterStock.petrol92} L</span>
          <span className="text-[10px] text-amber-400 font-medium">Sealed Steel Jerrycan</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
          <span className="text-xs text-slate-400 block">Hi-Octane (HOBC)</span>
          <span className="text-2xl font-black text-slate-200 font-mono mt-1 block">{canisterStock.petrol95} L</span>
          <span className="text-[10px] text-teal-400 font-medium">Sealed Canister B</span>
        </div>
      </div>

      {/* Active Job in Progress */}
      {activeJob && (
        <div className="bg-slate-900 border-2 border-amber-500 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-5 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="animate-ping h-2.5 w-2.5 rounded-full bg-amber-400" />
              <h3 className="text-base font-bold text-white">Active Distress Rescue in Progress</h3>
            </div>
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30">
              Total Deal: Rs. {Math.round(activeJob.grandTotal || 3100).toLocaleString()}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <span className="text-slate-500 block">Stranded Motorist Location:</span>
              <p className="font-semibold text-slate-200 text-sm">{activeJob.userLocation?.address || 'Highway M-9 Shoulder, Near Toll Plaza'}</p>
              <p className="text-slate-400">Vehicle: {activeJob.vehicleDetails || 'White Suzuki Alto (Reg: LEB-429)'}</p>
              <p className="text-amber-400 italic">Note: "{activeJob.roadsideNote || 'Hazards blinking on passenger side'}"</p>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 block">Fuel to Dispense:</span>
              <p className="font-bold text-amber-400 text-sm">{activeJob.quantityLiters || 10} Litres &bull; {activeJob.fuelName || 'Super Petrol'}</p>
              <p className="text-slate-400">Payment Channel: {activeJob.paymentMethod?.toUpperCase() || 'CASH ON DELIVERY'}</p>
            </div>
          </div>

          {/* OTP Verification & Safety Dispensing */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-amber-400" />
                <span>Enter Customer 4-Digit Security OTP to Dispense</span>
              </label>
              <span className="text-[11px] text-slate-400">(Ask customer for code displayed on their screen)</span>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                maxLength="4"
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                placeholder="4-digit OTP"
                className="w-36 bg-slate-900 border border-slate-700 text-center font-mono text-xl tracking-widest font-black text-amber-400 rounded-xl px-3 py-2 focus:outline-none focus:border-amber-400"
              />
              <button
                onClick={handleVerifyOtp}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow-md"
              >
                Verify & Refuel Tank
              </button>
            </div>

            {otpError && (
              <p className="text-xs text-rose-400 font-medium">
                Invalid OTP code. Please check customer phone screen or test with 1234.
              </p>
            )}

            {jobSuccess && (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>OTP Verified! Canister seal unlocked. Refuel complete & payout credited to JazzCash/Easypaisa balance.</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Available Roadside Distress Calls Queue */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>Nearby Emergency Distress Requests (Pakistan)</span>
              <span className="text-xs bg-rose-500/20 text-rose-400 font-mono px-2 py-0.5 rounded-full border border-rose-500/30">
                {pendingDistressCalls.length} Incoming
              </span>
            </h3>
            <p className="text-xs text-slate-400">Stranded motorists on highways and city corridors waiting for dispatch</p>
          </div>
        </div>

        {pendingDistressCalls.length === 0 ? (
          <div className="text-center py-10 bg-slate-950 rounded-2xl border border-slate-800/80">
            <Fuel className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-300">No active stranded drivers waiting right now</p>
            <p className="text-xs text-slate-500 mt-1">Keep your radar online; emergency requests in your Pakistani sector will alert immediately.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingDistressCalls.map((call) => (
              <div
                key={call.id}
                className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="p-1 rounded bg-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider">
                      URGENT FUEL SOS
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      📍 {call.distanceKm || '1.2'} km away &bull; ~{call.etaMinutes || 5} mins
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-100 text-sm">
                    {call.fuelQuantity || 10}L {call.fuelType || 'Super Petrol'} &bull; {call.vehicle || 'Suzuki Alto'}
                  </h4>

                  <p className="text-xs text-slate-400">
                    Location: {call.location || 'Shahrah-e-Faisal / Motorway M-9'}
                  </p>
                  {call.note && (
                    <p className="text-xs text-amber-400/90 italic">
                      "{call.note}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block uppercase">Total Deal Value</span>
                    <span className="text-lg font-black text-emerald-400 font-mono">
                      Rs. {Math.round(call.estimatedTotal || 3100).toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAccept(call)}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shadow-md shadow-amber-500/20 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Accept & Dispatch</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
