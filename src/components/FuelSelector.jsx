import React from 'react';
import { FUEL_TYPES, QUANTITIES, VEHICLE_TYPES } from '../data/mockData';
import { Fuel, Droplets, Zap, Shield, Sparkles } from 'lucide-react';

export default function FuelSelector({
  selectedFuel,
  setSelectedFuel,
  selectedQuantity,
  setSelectedQuantity,
  customLiters,
  setCustomLiters,
  isCustomQty,
  setIsCustomQty,
  selectedVehicleType,
  setSelectedVehicleType
}) {
  const currentFuel = FUEL_TYPES.find(f => f.id === selectedFuel) || FUEL_TYPES[0];
  const liters = isCustomQty ? customLiters : selectedQuantity;
  const fuelSubtotal = liters * currentFuel.pricePerLiter;
  const canisterSafetyDeposit = 2.00; // Returnable sealed jerrycan fee

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-6">
      
      {/* Step 1: Vehicle Type */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
          1. Select Vehicle Type
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {VEHICLE_TYPES.map(v => (
            <button
              key={v.id}
              onClick={() => setSelectedVehicleType(v.id)}
              className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1.5 ${
                selectedVehicleType === v.id
                  ? 'bg-amber-500/10 border-amber-500 text-amber-300 ring-1 ring-amber-500/50'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <span className="text-2xl">{v.icon}</span>
              <span className="text-xs font-semibold">{v.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Fuel Grade */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            2. Choose Fuel Grade
          </label>
          <span className="text-xs text-amber-400 font-medium">Sealed & Filtered Pure Fuel</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FUEL_TYPES.map(f => {
            const isSelected = selectedFuel === f.id;
            return (
              <div
                key={f.id}
                onClick={() => setSelectedFuel(f.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition relative overflow-hidden ${
                  isSelected
                    ? 'bg-slate-850 border-amber-500 shadow-md ring-1 ring-amber-500/50'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none overflow-hidden">
                    <div className="absolute transform rotate-45 bg-amber-500 text-slate-950 font-bold text-[9px] py-0.5 right-[-35px] top-[18px] w-[120px] text-center">
                      SELECTED
                    </div>
                  </div>
                )}

                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {f.badge}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-white mt-1.5">{f.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5 leading-snug line-clamp-2">{f.description}</p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Station Rate:</span>
                  <span className="text-sm font-extrabold text-amber-400 font-mono">
                    ${f.pricePerLiter.toFixed(2)} / {f.unit}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 3: Emergency Canister Quantity */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            3. Select Quantity (DOT Approved Jerrycan)
          </label>
          <button
            onClick={() => setIsCustomQty(!isCustomQty)}
            className="text-xs text-amber-400 hover:underline font-semibold"
          >
            {isCustomQty ? 'Choose Presets' : 'Custom Liters'}
          </button>
        </div>

        {!isCustomQty ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {QUANTITIES.map(q => {
              const isSelected = selectedQuantity === q.liters;
              return (
                <div
                  key={q.liters}
                  onClick={() => setSelectedQuantity(q.liters)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition text-left flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500 text-white ring-1 ring-amber-500/50'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-extrabold text-amber-400">{q.label}</span>
                      {q.popular && (
                        <span className="text-[10px] font-bold bg-amber-500 text-slate-950 px-1.5 py-0.2 rounded-full">
                          POPULAR
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-tight">{q.desc}</p>
                  </div>
                  <div className="mt-3 text-[11px] text-slate-500 font-mono">
                    Recommended: {q.recommendedFor}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-300">Custom Emergency Liters:</span>
              <span className="text-xl font-black text-amber-400 font-mono">{customLiters} Liters</span>
            </div>
            <input
              type="range"
              min="3"
              max="40"
              step="1"
              value={customLiters}
              onChange={(e) => setCustomLiters(Number(e.target.value))}
              className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>3L (Moped)</span>
              <span>15L (Sedan)</span>
              <span>40L (SUV / Pickup)</span>
            </div>
          </div>
        )}
      </div>

      {/* Fuel Cost Summary Strip */}
      <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <Droplets className="w-4 h-4 text-amber-400" />
          <span>
            Fuel Subtotal ({liters}L x ${currentFuel.pricePerLiter.toFixed(2)}):
          </span>
          <span className="font-bold text-slate-200">${fuelSubtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>Sealed Canister Deposit: </span>
          <span className="font-bold text-slate-200">${canisterSafetyDeposit.toFixed(2)} (Refundable)</span>
        </div>
      </div>

    </div>
  );
}
