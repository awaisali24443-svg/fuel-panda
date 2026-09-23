import React from 'react';
import { Bike, Star, Clock, Navigation, CheckCircle2, ShieldCheck, Zap, Phone, MessageSquare, MapPin } from 'lucide-react';

export default function RiderMatchList({
  riders,
  selectedRider,
  onSelectRider,
  onInitiateDeal,
  fuelSubtotal,
  quantityLiters,
  fuelName,
  lang = 'en'
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span>{lang === 'ur' ? 'قریبی تصدیق شدہ رائڈرز' : 'Nearest Verified Fuel Couriers'}</span>
            <span className="text-xs bg-amber-500/20 text-amber-300 font-mono px-2 py-0.5 rounded-full border border-amber-500/30">
              {riders.length} Active in Pakistan
            </span>
          </h2>
          <p className="text-xs text-slate-400">
            {lang === 'ur' ? 'اوگرا اور پولیس ویریفائیڈ رائڈرز' : 'OGRA & Police verified emergency fuel fleet'}
          </p>
        </div>

        {riders.length > 0 && (
          <button
            onClick={() => onInitiateDeal(riders[0])}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-orange-500/25 shrink-0"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{lang === 'ur' ? 'فوری خودکار ڈسپیچ' : 'Instant Auto-Dispatch (Fastest)'}</span>
          </button>
        )}
      </div>

      {/* Riders Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {riders.map((rider, index) => {
          const isSelected = selectedRider?.id === rider.id;
          const totalEstimatedDeal = fuelSubtotal + rider.baseDeliveryFee;

          return (
            <div
              key={rider.id}
              onClick={() => onSelectRider(rider)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-850 border-amber-500 ring-2 ring-amber-500/40 shadow-xl'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              {index === 0 && (
                <div className="absolute top-2 right-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Zap className="w-2.5 h-2.5" />
                  <span>FASTEST &bull; {rider.etaMinutes} MINS</span>
                </div>
              )}

              <div>
                <div className="flex items-start gap-3">
                  <img
                    src={rider.photo}
                    alt={rider.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-700 shadow-sm"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-slate-100 text-sm">
                        {lang === 'ur' ? rider.urduName : rider.name}
                      </h3>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" title="CNIC & Police Verified" />
                      <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded font-mono">
                        {rider.city}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-tight mt-0.5">{rider.vehicle}</p>

                    <div className="flex items-center gap-2 mt-1 text-xs">
                      <span className="flex items-center gap-1 text-amber-400 font-semibold">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {rider.rating}
                      </span>
                      <span className="text-slate-500">({rider.reviewsCount} rescues)</span>
                    </div>
                  </div>
                </div>

                {/* Rider Stats Bar */}
                <div className="grid grid-cols-3 gap-2 mt-3 p-2.5 rounded-xl bg-slate-900 border border-slate-800/80 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block">ETA</span>
                    <span className="text-xs font-black text-amber-400 font-mono">
                      ~{rider.etaMinutes} mins
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Distance</span>
                    <span className="text-xs font-bold text-slate-200 font-mono">
                      {rider.distanceKm} km
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Rider Fee</span>
                    <span className="text-xs font-bold text-slate-200 font-mono">
                      Rs. {rider.baseDeliveryFee}
                    </span>
                  </div>
                </div>

                <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
                  <span className="text-emerald-400 font-medium">
                    ✓ {quantityLiters}L {fuelName.split('(')[0]} ready
                  </span>
                  <span className="text-amber-300 font-mono font-bold text-xs">
                    Est. Total: Rs. {Math.round(totalEstimatedDeal).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onInitiateDeal(rider);
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/10"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{lang === 'ur' ? 'رابطہ اور آرڈر کنفرم کریں' : 'Contact & Finalize Deal'}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
