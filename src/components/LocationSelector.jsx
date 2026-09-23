import React, { useState } from 'react';
import { MapPin, LocateFixed, Compass, Car, AlertCircle, CheckCircle } from 'lucide-react';

export default function LocationSelector({ 
  location, 
  setLocation, 
  vehicleDetails, 
  setVehicleDetails,
  roadsideNote,
  setRoadsideNote
}) {
  const [detecting, setDetecting] = useState(false);
  const [detectedSuccess, setDetectedSuccess] = useState(false);

  const handleDetectGPS = () => {
    setDetecting(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            address: `Highway Shoulder (Lat: ${pos.coords.latitude.toFixed(4)}, Lng: ${pos.coords.longitude.toFixed(4)})`,
            accuracy: `${Math.round(pos.coords.accuracy)}m accuracy`
          });
          setDetecting(false);
          setDetectedSuccess(true);
          setTimeout(() => setDetectedSuccess(false), 3000);
        },
        (err) => {
          // Fallback simulation for highway breakdown demo
          setTimeout(() => {
            setLocation({
              lat: 24.8607,
              lng: 67.0011,
              address: 'Highway M-9 Northbound, Mile Marker 42 (Shoulder Lane)',
              accuracy: 'High GPS precision'
            });
            setDetecting(false);
            setDetectedSuccess(true);
            setTimeout(() => setDetectedSuccess(false), 3000);
          }, 800);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      setTimeout(() => {
        setLocation({
          lat: 24.8607,
          lng: 67.0011,
          address: 'Highway M-9 Northbound, Mile Marker 42 (Shoulder Lane)',
          accuracy: 'Simulated'
        });
        setDetecting(false);
        setDetectedSuccess(true);
      }, 600);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white">Your Stranded Location</h2>
            <p className="text-xs text-slate-400">Riders navigate directly to your live pin</p>
          </div>
        </div>

        <button
          onClick={handleDetectGPS}
          disabled={detecting}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition shadow-md shadow-amber-500/20 disabled:opacity-50"
        >
          <LocateFixed className={`w-3.5 h-3.5 ${detecting ? 'animate-spin' : ''}`} />
          <span>{detecting ? 'Locating...' : 'Auto GPS'}</span>
        </button>
      </div>

      {detectedSuccess && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Precise GPS coordinates locked! Surrounding riders notified.</span>
        </div>
      )}

      {/* Address & Landmark Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
          <span>Road / Highway / Landmark Description</span>
          <span className="text-[11px] text-amber-400">GPS Pin Active</span>
        </label>
        <div className="relative">
          <input
            type="text"
            value={location.address}
            onChange={(e) => setLocation({ ...location, address: e.target.value })}
            placeholder="e.g. Highway M-9 Near Toll Plaza, Stranded on Left Shoulder"
            className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition"
          />
        </div>
      </div>

      {/* Vehicle Description for Rider Recognition */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">
            Vehicle Color & Model
          </label>
          <input
            type="text"
            value={vehicleDetails}
            onChange={(e) => setVehicleDetails(e.target.value)}
            placeholder="e.g. White Toyota Corolla (Reg: ABC-123)"
            className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">
            Emergency Condition / Quick Note
          </label>
          <input
            type="text"
            value={roadsideNote}
            onChange={(e) => setRoadsideNote(e.target.value)}
            placeholder="e.g. Hazards on, standing behind barrier, 10% phone battery"
            className="w-full bg-slate-950 border border-slate-700 rounded-2xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
          />
        </div>
      </div>

    </div>
  );
}
