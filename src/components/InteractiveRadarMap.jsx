import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Compass, ShieldCheck, Flame, Bike, Car, Maximize2, Radio } from 'lucide-react';

export default function InteractiveRadarMap({ 
  userLocation, 
  riders = [], 
  selectedRider, 
  onSelectRider, 
  activeDelivery = null 
}) {
  const [radarAngle, setRadarAngle] = useState(0);
  const [enRouteProgress, setEnRouteProgress] = useState(0);

  // Radar sweep animation
  useEffect(() => {
    const sweep = setInterval(() => {
      setRadarAngle(prev => (prev + 3) % 360);
    }, 40);
    return () => clearInterval(sweep);
  }, []);

  // Rider route progress animation when active delivery is underway
  useEffect(() => {
    if (!activeDelivery) {
      setEnRouteProgress(0);
      return;
    }
    const timer = setInterval(() => {
      setEnRouteProgress(prev => {
        if (prev >= 1) return 1;
        return prev + 0.02;
      });
    }, 500);
    return () => clearInterval(timer);
  }, [activeDelivery]);

  // Center coordinates for map view
  const centerX = 300;
  const centerY = 200;

  // Relative positions for riders based on their distance
  const riderPositions = riders.map((r, index) => {
    // Generate deterministic relative coordinates around center
    const angles = [45, 140, 220, 310];
    const angleRad = (angles[index % angles.length] * Math.PI) / 180;
    const distanceScale = 30 + r.distanceKm * 28;
    return {
      ...r,
      x: centerX + Math.cos(angleRad) * distanceScale,
      y: centerY + Math.sin(angleRad) * distanceScale
    };
  });

  // Calculate position of active delivery rider interpolating toward user
  const activeRiderData = activeDelivery ? riderPositions.find(r => r.id === activeDelivery.riderId) || riderPositions[0] : null;
  const activeRiderCurrentX = activeRiderData ? activeRiderData.x + (centerX - activeRiderData.x) * enRouteProgress : 0;
  const activeRiderCurrentY = activeRiderData ? activeRiderData.y + (centerY - activeRiderData.y) * enRouteProgress : 0;

  return (
    <div className="relative w-full h-[380px] sm:h-[440px] bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
      
      {/* High-tech Map Background Grids & Highway lines */}
      <svg className="w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">
        <defs>
          {/* Radial radar glow */}
          <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.15" />
            <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>

          {/* Grid pattern */}
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.8" opacity="0.6" />
          </pattern>

          {/* Route glow filter */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Base Grid */}
        <rect width="600" height="400" fill="#0b1120" />
        <rect width="600" height="400" fill="url(#grid)" />

        {/* Stylized Highway Routes */}
        <path d="M -50 180 Q 200 160 300 200 T 650 250" fill="none" stroke="#334155" strokeWidth="18" opacity="0.5" />
        <path d="M -50 180 Q 200 160 300 200 T 650 250" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="6,6" opacity="0.8" />
        
        {/* Secondary Cross Road */}
        <path d="M 180 -20 Q 240 180 300 200 T 420 420" fill="none" stroke="#1e293b" strokeWidth="10" opacity="0.6" />
        <path d="M 180 -20 Q 240 180 300 200 T 420 420" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.5" />

        {/* Distance Range Rings (1km, 2.5km, 5km) */}
        <circle cx={centerX} cy={centerY} r="65" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" opacity="0.3" />
        <text x={centerX + 68} y={centerY - 5} fill="#f59e0b" fontSize="9" opacity="0.6">1 km</text>

        <circle cx={centerX} cy={centerY} r="130" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,4" opacity="0.2" />
        <text x={centerX + 133} y={centerY - 5} fill="#f59e0b" fontSize="9" opacity="0.5">3 km</text>

        <circle cx={centerX} cy={centerY} r="195" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4,4" opacity="0.12" />
        <text x={centerX + 198} y={centerY - 5} fill="#f59e0b" fontSize="9" opacity="0.4">5 km</text>

        {/* Radar Sweep Line */}
        <g transform={`rotate(${radarAngle} ${centerX} ${centerY})`}>
          <line x1={centerX} y1={centerY} x2={centerX + 195} y2={centerY} stroke="#f59e0b" strokeWidth="1.5" opacity="0.6" />
          <path d={`M ${centerX} ${centerY} L ${centerX + 195} ${centerY} A 195 195 0 0 0 ${centerX + 170} ${centerY - 95} Z`} fill="url(#radarGlow)" />
        </g>

        {/* Active Dispatch Navigation Route */}
        {activeDelivery && activeRiderData && (
          <g>
            <path
              d={`M ${activeRiderData.x} ${activeRiderData.y} Q ${(activeRiderData.x + centerX)/2 + 25} ${(activeRiderData.y + centerY)/2 - 15} ${centerX} ${centerY}`}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="4"
              strokeDasharray="8,6"
              filter="url(#glow)"
              className="animate-pulse"
            />
          </g>
        )}

        {/* Center: User Stranded Location Marker */}
        <g transform={`translate(${centerX}, ${centerY})`}>
          {/* Animated ping rings */}
          <circle r="22" fill="#ef4444" opacity="0.25" className="animate-ping" />
          <circle r="14" fill="#ef4444" opacity="0.4" />
          <circle r="7" fill="#f87171" stroke="#ffffff" strokeWidth="2" />
          
          <rect x="-60" y="-38" width="120" height="22" rx="6" fill="#0f172a" stroke="#ef4444" strokeWidth="1" />
          <text x="0" y="-24" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
            📍 YOU (STRANDED)
          </text>
        </g>

        {/* Active Delivery Rider Marker (animated along path) */}
        {activeDelivery && activeRiderData ? (
          <g transform={`translate(${activeRiderCurrentX}, ${activeRiderCurrentY})`}>
            <circle r="20" fill="#f59e0b" opacity="0.3" className="animate-ping" />
            <circle r="12" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
            <rect x="-65" y="-38" width="130" height="22" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="0" y="-24" fill="#fef08a" fontSize="9" fontWeight="bold" textAnchor="middle">
              🏍️ {activeRiderData.name.split(' ')[0]} EN ROUTE ({Math.max(1, Math.round(activeRiderData.etaMinutes * (1 - enRouteProgress)))}m)
            </text>
          </g>
        ) : (
          /* Normal Nearby Riders Markers */
          riderPositions.map((rider) => {
            const isSelected = selectedRider?.id === rider.id;
            return (
              <g 
                key={rider.id} 
                transform={`translate(${rider.x}, ${rider.y})`}
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => onSelectRider && onSelectRider(rider)}
              >
                {isSelected && (
                  <circle r="18" fill="#f59e0b" opacity="0.4" className="animate-ping" />
                )}
                <circle 
                  r={isSelected ? "11" : "8"} 
                  fill={isSelected ? "#f59e0b" : "#38bdf8"} 
                  stroke="#ffffff" 
                  strokeWidth="2" 
                />
                
                {/* Rider Tag */}
                <rect 
                  x="-45" 
                  y="-32" 
                  width="90" 
                  height="20" 
                  rx="5" 
                  fill={isSelected ? "#1e293b" : "#0f172a"} 
                  stroke={isSelected ? "#f59e0b" : "#475569"} 
                  strokeWidth="1" 
                />
                <text 
                  x="0" 
                  y="-19" 
                  fill={isSelected ? "#fef08a" : "#cbd5e1"} 
                  fontSize="8.5" 
                  fontWeight={isSelected ? "bold" : "normal"} 
                  textAnchor="middle"
                >
                  ⚡ {rider.name.split(' ')[0]} &bull; {rider.etaMinutes}m
                </text>
              </g>
            );
          })
        )}
      </svg>

      {/* Floating Status Badge Top Left */}
      <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-md border border-slate-700/60 rounded-2xl px-3.5 py-2 flex items-center gap-3 shadow-lg">
        <div className="flex h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-200">Emergency Radar Active</span>
            <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-mono">LIVE GPS</span>
          </div>
          <p className="text-[11px] text-slate-400">
            {riders.length} Certified Mobile Tankers in 5 km radius
          </p>
        </div>
      </div>

      {/* Floating Coordinates Tag Bottom Left */}
      <div className="absolute bottom-4 left-4 hidden sm:flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-xl px-3 py-1.5 text-[11px] text-slate-400 font-mono">
        <Navigation className="w-3.5 h-3.5 text-amber-400" />
        <span>GPS: {userLocation.address || "Highway M-9 Milepost 34, Shoulder"}</span>
      </div>

      {/* Radar Scan Indicator Bottom Right */}
      <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-xl px-3 py-1.5 flex items-center gap-2 text-xs text-amber-300">
        <Radio className="w-3.5 h-3.5 animate-pulse text-amber-400" />
        <span className="font-semibold text-[11px]">Real-Time Dispatch Pulse</span>
      </div>

    </div>
  );
}
