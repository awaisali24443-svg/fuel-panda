import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HazardStrobeModal from './components/HazardStrobeModal';
import HelplineModal from './components/HelplineModal';
import InteractiveRadarMap from './components/InteractiveRadarMap';
import LocationSelector from './components/LocationSelector';
import FuelSelector from './components/FuelSelector';
import RiderMatchList from './components/RiderMatchList';
import DealNegotiationModal from './components/DealNegotiationModal';
import LiveTrackingModal from './components/LiveTrackingModal';
import RiderDashboard from './components/RiderDashboard';

import { FUEL_TYPES, QUANTITIES, INITIAL_RIDERS, SAFETY_TIPS } from './data/mockData';
import { Fuel, AlertTriangle, ShieldCheck, Zap, Bike, Phone, Info, PhoneCall } from 'lucide-react';

export default function App() {
  // Navigation Mode: 'customer' (stranded driver) or 'rider' (mobile fuel courier partner)
  const [activeMode, setActiveMode] = useState('customer');

  // Bilingual Language: 'en' or 'ur'
  const [lang, setLang] = useState('en');

  // Modals
  const [isHazardModalOpen, setIsHazardModalOpen] = useState(false);
  const [isHelplineModalOpen, setIsHelplineModalOpen] = useState(false);

  // Customer State - Pakistani Default Context (Karachi Shahrah-e-Faisal / M-9)
  const [userLocation, setUserLocation] = useState({
    lat: 24.8607,
    lng: 67.0011,
    address: 'Shahrah-e-Faisal (Near Nursery Flyover, Karachi)',
    accuracy: 'High Precision GPS Locked'
  });
  const [vehicleDetails, setVehicleDetails] = useState('White Suzuki Alto 660cc (Reg: BKL-482)');
  const [roadsideNote, setRoadsideNote] = useState('Hazard lights blinking, safe on leftmost shoulder');

  const [selectedFuel, setSelectedFuel] = useState('petrol_92');
  const [selectedQuantity, setSelectedQuantity] = useState(10);
  const [customLiters, setCustomLiters] = useState(12);
  const [isCustomQty, setIsCustomQty] = useState(false);
  const [selectedVehicleType, setSelectedVehicleType] = useState('hatchback');

  // Riders data
  const [riders, setRiders] = useState(INITIAL_RIDERS);
  const [selectedRider, setSelectedRider] = useState(INITIAL_RIDERS[0]);

  // Deal Negotiation Modal
  const [isDealModalOpen, setIsDealModalOpen] = useState(false);
  const [negotiatingRider, setNegotiatingRider] = useState(null);

  // Active En-route Delivery
  const [activeDelivery, setActiveDelivery] = useState(null);

  // Pending Distress Calls for Rider Mode (in PKR)
  const [distressCalls, setDistressCalls] = useState([
    {
      id: 'distress-pk-101',
      fuelQuantity: 10,
      fuelType: 'Super Petrol (92)',
      vehicle: 'White Suzuki Alto (Reg: BKL-482)',
      location: 'Shahrah-e-Faisal near Nursery, Karachi',
      note: 'Hazards blinking on passenger side, low phone battery',
      distanceKm: 0.8,
      etaMinutes: 5,
      estimatedTotal: 3005,
      otp: '4829'
    },
    {
      id: 'distress-pk-102',
      fuelQuantity: 20,
      fuelType: 'High-Speed Diesel (HSD)',
      vehicle: 'Black Toyota Hilux Revo 4x4 (Reg: ICT-719)',
      location: 'Motorway M-2 Southbound, Mile Marker 84 Lay-by',
      note: 'Stranded on emergency shoulder, needs 20L diesel',
      distanceKm: 2.1,
      etaMinutes: 9,
      estimatedTotal: 6076,
      otp: '7391'
    }
  ]);

  // Calculations in PKR
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
      distanceKm: 1.1,
      etaMinutes: dealData.etaMinutes,
      estimatedTotal: Math.round(dealData.grandTotal),
      otp: dealData.otp
    };
    setDistressCalls(prev => [newCall, ...prev]);
  };

  const handleCompleteDelivery = () => {
    alert('Refueling successful! Safety receipt sent via SMS to your Pakistani mobile. Drive safely!');
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
        lang={lang}
        setLang={setLang}
        onOpenHelplines={() => setIsHelplineModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Roadside Safety Notification Banner (Pakistani Context) */}
        <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-transparent border-l-4 border-amber-500 p-4 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs sm:text-sm font-bold text-amber-200 uppercase tracking-wide">
                  {lang === 'ur' ? 'اوگرا اور موٹروے پولیس روڈ سیفٹی الرٹ' : 'OGRA & Motorway Roadside Safety Alert'}
                </h4>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono px-1.5 py-0.2 rounded border border-emerald-500/30">
                  PAKISTAN 🇵🇰
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {lang === 'ur'
                  ? 'موٹروے یا ہائی وے پر پھنسنے کی صورت میں گاڑی کے ہیزرڈ لائٹس آن رکھیں اور اسٹیل جنگلے کے پیچھے کھڑے ہوں۔'
                  : 'Stranded on M-2, M-9, Ring Road, or GT Road? Switch on hazard lights, remain behind the steel crash barrier, and lock doors at night.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsHelplineModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs border border-amber-500/30 transition flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3 text-amber-400" />
              <span>Helpline 130</span>
            </button>

            <button
              onClick={() => setIsHazardModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition shadow-md shadow-amber-500/20"
            >
              {lang === 'ur' ? 'ہیزرڈ اسکرین' : 'Hazard Beacon'}
            </button>
          </div>
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
                lang={lang}
              />
            )}

            {/* Radar Map & Live Coordinates Display */}
            <section className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                    <span>{lang === 'ur' ? 'ایمرجنسی فیول ڈسپیچ ریڈار' : 'Emergency Fuel Dispatch Radar'}</span>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      PAKISTAN LIVE GPS
                    </span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-400">
                    FoodPanda-style certified rapid canister dispatch for Pakistani motorways, highways & cities
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <span>Current Station Petrol: </span>
                  <span className="font-bold text-amber-400">Rs. 265.50/L</span>
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
                  lang={lang}
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
                  lang={lang}
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
                  lang={lang}
                />

                {/* Roadside Safety Tips Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>OGRA Fuel Delivery & Roadside Protocol</span>
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
                riderPhone: '0300-4829101',
                riderPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
                riderVehicle: 'Honda CG125 (OGRA Steel Canister Frame)',
                fuelName: job.fuelType,
                quantityLiters: job.fuelQuantity,
                grandTotal: job.estimatedTotal,
                paymentMethod: 'CASH ON DELIVERY (PKR)',
                userLocation: { address: job.location },
                vehicleDetails: job.vehicle,
                roadsideNote: job.note,
                etaMinutes: job.etaMinutes,
                otp: job.otp
              });
            }}
            onCompleteJob={(job) => {
              setDistressCalls(prev => prev.filter(c => c.id !== job.id));
              alert(`Rescue mission complete! Rs. ${job.estimatedTotal || '3,000'} credited to your JazzCash/Easypaisa balance.`);
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
        lang={lang}
      />

      {/* Hazard Strobe Fullscreen Modal */}
      <HazardStrobeModal
        isOpen={isHazardModalOpen}
        onClose={() => setIsHazardModalOpen(false)}
      />

      {/* Official Pakistan Helplines Modal */}
      <HelplineModal
        isOpen={isHelplineModalOpen}
        onClose={() => setIsHelplineModalOpen(false)}
      />

      {/* Footer with Pakistani Helplines */}
      <footer className="mt-12 border-t border-slate-800 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-amber-400">FUEL PANDA PAKISTAN 🇵🇰</span>
            <span>&bull; Rapid Roadside Energy Rescue</span>
          </div>
          <p>
            Compliant with OGRA safety regulations &bull; Sealed anti-static Jerry Cans &bull; No open plastic bottles.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button onClick={() => setIsHazardModalOpen(true)} className="hover:text-amber-400 transition">Hazard Beacon</button>
            <button onClick={() => setIsHelplineModalOpen(true)} className="hover:text-emerald-400 transition">Helplines</button>
            <a href="tel:130" className="hover:text-amber-400 transition font-bold">Motorway Police (130)</a>
            <a href="tel:1122" className="hover:text-rose-400 transition font-bold">Rescue 1122</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
