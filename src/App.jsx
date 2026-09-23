import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HazardStrobeModal from './components/HazardStrobeModal';
import InteractiveRadarMap from './components/InteractiveRadarMap';
import LocationSelector from './components/LocationSelector';
import FuelSelector from './components/FuelSelector';
import RiderMatchList from './components/RiderMatchList';
import DealNegotiationModal from './components/DealNegotiationModal';
import LiveTrackingModal from './components/LiveTrackingModal';
import RiderDashboard from './components/RiderDashboard';

import { FUEL_TYPES, QUANTITIES, INITIAL_RIDERS, SAFETY_TIPS } from './data/mockData';
import { Fuel, AlertTriangle, ShieldCheck, Zap, Bike, Phone, Info } from 'lucide-react';

export default function App() {
  // Navigation Mode: 'customer' (stranded driver) or 'rider' (mobile fuel courier partner)
  const [activeMode, setActiveMode] = useState('customer');

  // Safety Hazard Strobe Modal
  const [isHazardModalOpen, setIsHazardModalOpen] = useState(false);

  // Customer State
  const [userLocation, setUserLocation] = useState({
    lat: 24.8607,
    lng: 67.0011,
    address: 'Highway M-9 Northbound, Mile Marker 42 (Shoulder Lane)',
    accuracy: 'GPS High Precision'
  });
  const [vehicleDetails, setVehicleDetails] = useState('White Toyota Corolla (Reg: ABC-429)');
  const [roadsideNote, setRoadsideNote] = useState('Hazards on, standing safely behind guardrail');

  const [selectedFuel, setSelectedFuel] = useState('petrol_92');
  const [selectedQuantity, setSelectedQuantity] = useState(10);
  const [customLiters, setCustomLiters] = useState(12);
  const [isCustomQty, setIsCustomQty] = useState(false);
  const [selectedVehicleType, setSelectedVehicleType] = useState('sedan');

  // Riders data
  const [riders, setRiders] = useState(INITIAL_RIDERS);
  const [selectedRider, setSelectedRider] = useState(INITIAL_RIDERS[0]);

  // Deal Negotiation Modal
  const [isDealModalOpen, setIsDealModalOpen] = useState(false);
  const [negotiatingRider, setNegotiatingRider] = useState(null);

  // Active En-route Delivery
  const [activeDelivery, setActiveDelivery] = useState(null);

  // Pending Distress Calls for Rider Mode
  const [distressCalls, setDistressCalls] = useState([
    {
      id: 'distress-101',
      fuelQuantity: 10,
      fuelType: 'Petrol Regular (92)',
      vehicle: 'White Toyota Corolla',
      location: 'Highway M-9 Northbound, Mile Marker 42 (Shoulder Lane)',
      note: 'Hazards on, standing behind guardrail',
      distanceKm: 0.9,
      etaMinutes: 4,
      estimatedTotal: 33.00,
      otp: '4829'
    },
    {
      id: 'distress-102',
      fuelQuantity: 20,
      fuelType: 'Ultra-Low Sulfur Diesel',
      vehicle: 'Black Isuzu D-Max',
      location: 'Ring Road Bypass, Exit 8 Lay-by',
      note: 'Stranded in emergency lane, needs 20L diesel',
      distanceKm: 2.4,
      etaMinutes: 8,
      estimatedTotal: 65.00,
      otp: '7391'
    }
  ]);

  // Calculations
  const currentFuelObj = FUEL_TYPES.find(f => f.id === selectedFuel) || FUEL_TYPES[0];
  const effectiveLiters = isCustomQty ? customLiters : selectedQuantity;
  const fuelSubtotal = effectiveLiters * currentFuelObj.pricePerLiter;

  // Handlers
  const handleInitiateDeal = (rider) => {
    setNegotiatingRider(rider);
    setIsDealModalOpen(true);
  };

  const handleConfirmDeal = (dealData) => {
    setActiveDelivery(dealData);
    setIsDealModalOpen(false);

    // Also add to rider distress queue for simulation
    const newCall = {
      id: `distress-${Date.now()}`,
      fuelQuantity: dealData.quantityLiters,
      fuelType: dealData.fuelName,
      vehicle: dealData.vehicleDetails,
      location: dealData.userLocation.address,
      note: dealData.roadsideNote,
      distanceKm: 1.2,
      etaMinutes: dealData.etaMinutes,
      estimatedTotal: dealData.grandTotal.toFixed(2),
      otp: dealData.otp
    };
    setDistressCalls(prev => [newCall, ...prev]);
  };

  const handleCompleteDelivery = () => {
    alert('Refueling successful! Safety receipt sent to your phone. Drive safely!');
    setActiveDelivery(null);
  };

  const handleCancelDelivery = () => {
    if (confirm('Are you sure you want to cancel the emergency fuel dispatch?')) {
      setActiveDelivery(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Navigation */}
      <Navbar
        activeMode={activeMode}
        setActiveMode={setActiveMode}
        onOpenHazard={() => setIsHazardModalOpen(true)}
        pendingOrdersCount={distressCalls.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Roadside Safety Notification Banner */}
        <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-transparent border-l-4 border-amber-500 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-amber-200 uppercase tracking-wide">
                Emergency Roadside Safety Notice
              </h4>
              <p className="text-xs text-slate-300">
                Stranded on an active roadway? Put on hazard lights, stay behind the steel guardrail, and avoid approaching moving traffic.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsHazardModalOpen(true)}
            className="shrink-0 px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition shadow-md shadow-amber-500/20"
          >
            Launch Hazard Beacon
          </button>
        </div>

        {/* View Toggle Content */}
        {activeMode === 'customer' ? (
          /* STRANDED DRIVER FLOW */
          <div className="space-y-6">
            
            {/* Live Tracking Card if Order is Active */}
            {activeDelivery && (
              <LiveTrackingModal
                activeDelivery={activeDelivery}
                onCancel={handleCancelDelivery}
                onCompleteDelivery={handleCompleteDelivery}
              />
            )}

            {/* Radar Map & Live Coordinates Display */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                    <span>Emergency Fuel Dispatch Radar</span>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      LIVE SATELLITE
                    </span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400">
                    FoodPanda-style on-demand mobile canister courier matching
                  </p>
                </div>
              </div>

              <InteractiveRadarMap
                userLocation={userLocation}
                riders={riders}
                selectedRider={selectedRider}
                onSelectRider={setSelectedRider}
                activeDelivery={activeDelivery}
              />
            </section>

            {/* Two-Column Booking & Fuel Selection Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Location & Fuel Chooser (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <LocationSelector
                  location={userLocation}
                  setLocation={setUserLocation}
                  vehicleDetails={vehicleDetails}
                  setVehicleDetails={setVehicleDetails}
                  roadsideNote={roadsideNote}
                  setRoadsideNote={setRoadsideNote}
                />

                <FuelSelector
                  selectedFuel={selectedFuel}
                  setSelectedFuel={setSelectedFuel}
                  selectedQuantity={selectedQuantity}
                  setSelectedQuantity={setSelectedQuantity}
                  customLiters={customLiters}
                  setCustomLiters={setCustomLiters}
                  isCustomQty={isCustomQty}
                  setIsCustomQty={setIsCustomQty}
                  selectedVehicleType={selectedVehicleType}
                  setSelectedVehicleType={setSelectedVehicleType}
                />
              </div>

              {/* Right Column: Nearest Verified Mobile Couriers (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <RiderMatchList
                  riders={riders}
                  selectedRider={selectedRider}
                  onSelectRider={setSelectedRider}
                  onInitiateDeal={handleInitiateDeal}
                  fuelSubtotal={fuelSubtotal}
                  quantityLiters={effectiveLiters}
                  fuelName={currentFuelObj.name}
                />

                {/* Roadside Safety Tips Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Fuel Panda Safety Handshake Protocol</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {SAFETY_TIPS.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold mt-0.5">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>

          </div>
        ) : (
          /* RIDER PARTNER PORTAL */
          <RiderDashboard
            pendingDistressCalls={distressCalls}
            onAcceptJob={(job) => {
              setActiveDelivery({
                riderId: 'rider-1',
                riderName: 'Bilal Ahmed',
                riderPhone: '+1 (555) 234-8901',
                riderPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                riderVehicle: 'Honda CB150 Mobile Courier',
                fuelName: job.fuelType,
                quantityLiters: job.fuelQuantity,
                grandTotal: parseFloat(job.estimatedTotal),
                paymentMethod: 'CASH ON DELIVERY',
                userLocation: { address: job.location },
                vehicleDetails: job.vehicle,
                roadsideNote: job.note,
                etaMinutes: job.etaMinutes,
                otp: job.otp
              });
            }}
            onCompleteJob={(job) => {
              setDistressCalls(prev => prev.filter(c => c.id !== job.id));
              alert(`Job completed! $${job.estimatedTotal || '28.50'} added to rider balance.`);
            }}
          />
        )}

      </main>

      {/* Deal Negotiation Modal */}
      <DealNegotiationModal
        isOpen={isDealModalOpen}
        onClose={() => setIsDealModalOpen(false)}
        rider={negotiatingRider}
        fuelSubtotal={fuelSubtotal}
        quantityLiters={effectiveLiters}
        fuelName={currentFuelObj.name}
        userLocation={userLocation}
        vehicleDetails={vehicleDetails}
        roadsideNote={roadsideNote}
        onConfirmDeal={handleConfirmDeal}
      />

      {/* Hazard Strobe Fullscreen Modal */}
      <HazardStrobeModal
        isOpen={isHazardModalOpen}
        onClose={() => setIsHazardModalOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-800 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-amber-400">FUEL PANDA</span>
            <span>&bull; Rapid Roadside Energy Rescue</span>
          </div>
          <p>Equipped with DOT-certified sealed safety jerrycans and anti-static spouts.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsHazardModalOpen(true)} className="hover:text-amber-400 transition">Hazard Beacon</button>
            <a href="tel:911" className="hover:text-rose-400 transition">Emergency 911</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
