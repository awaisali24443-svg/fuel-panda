export const FUEL_TYPES = [
  {
    id: 'petrol_92',
    name: 'Petrol Regular (92 Octane)',
    category: 'Gasoline',
    pricePerLiter: 2.85,
    unit: 'L',
    badge: 'Popular',
    iconColor: 'from-amber-500 to-orange-600',
    description: 'Standard unleaded fuel suitable for most daily commuting passenger cars & motorbikes.'
  },
  {
    id: 'petrol_95',
    name: 'Super Unleaded (95 Octane)',
    category: 'Premium Gasoline',
    pricePerLiter: 3.10,
    unit: 'L',
    badge: 'Recommended',
    iconColor: 'from-emerald-500 to-teal-600',
    description: 'High-octane fuel for modern turbocharged engines, sports cars, and luxury sedans.'
  },
  {
    id: 'diesel',
    name: 'Ultra-Low Sulfur Diesel',
    category: 'Diesel',
    pricePerLiter: 2.95,
    unit: 'L',
    badge: 'Heavy Duty',
    iconColor: 'from-blue-600 to-cyan-700',
    description: 'Clean diesel for SUVs, pickup trucks, light commercial vehicles and 4x4 offroaders.'
  },
  {
    id: 'ev_rescue',
    name: 'Emergency EV Rapid Boost',
    category: 'Electric',
    pricePerLiter: 4.50,
    unit: 'kWh',
    badge: 'DC Fast Rescue',
    iconColor: 'from-purple-500 to-indigo-600',
    description: 'Mobile DC fast battery pack unit to add 35-50 km emergency range to stranded electric vehicles.'
  }
];

export const QUANTITIES = [
  { liters: 5, label: '5 Liters', desc: 'Emergency limp-home range (~40-60 km)', recommendedFor: 'Motorbikes & Small Sedans' },
  { liters: 10, label: '10 Liters', desc: 'Sufficient to reach next highway gas station (~90-120 km)', recommendedFor: 'Most Cars & Crossovers', popular: true },
  { liters: 20, label: '20 Liters', desc: 'Heavy emergency refill for SUVs and remote highway stretches', recommendedFor: 'SUVs & Light Trucks' }
];

export const VEHICLE_TYPES = [
  { id: 'sedan', label: 'Car / Sedan', icon: '🚗' },
  { id: 'suv', label: 'SUV / 4x4', icon: '🚙' },
  { id: 'bike', label: 'Motorbike', icon: '🏍️' },
  { id: 'van', label: 'Van / Pickup', icon: '🚐' }
];

export const INITIAL_RIDERS = [
  {
    id: 'rider-1',
    name: 'Bilal Ahmed',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    vehicle: 'Honda CB150 Mobile Courier',
    rating: 4.95,
    reviewsCount: 312,
    etaMinutes: 4,
    distanceKm: 0.9,
    baseDeliveryFee: 4.50,
    phone: '+1 (555) 234-8901',
    status: 'online',
    carryingFuel: ['petrol_92', 'petrol_95'],
    maxCapacityLiters: 15,
    verifiedBadge: 'Certified Hazmat Handler',
    coordinates: { lat: 24.8615, lng: 67.0105 }
  },
  {
    id: 'rider-2',
    name: 'Tariq Khan',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    vehicle: 'Yamaha 250 Twin-Canister Scout',
    rating: 4.90,
    reviewsCount: 248,
    etaMinutes: 6,
    distanceKm: 1.4,
    baseDeliveryFee: 5.00,
    phone: '+1 (555) 789-4321',
    status: 'online',
    carryingFuel: ['petrol_92', 'petrol_95', 'diesel'],
    maxCapacityLiters: 20,
    verifiedBadge: 'Top Roadside Hero',
    coordinates: { lat: 24.8650, lng: 67.0150 }
  },
  {
    id: 'rider-3',
    name: 'Hamza Malik',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    vehicle: 'Ford Transit Rescue Tanker Van',
    rating: 4.85,
    reviewsCount: 420,
    etaMinutes: 9,
    distanceKm: 2.8,
    baseDeliveryFee: 6.50,
    phone: '+1 (555) 456-1122',
    status: 'online',
    carryingFuel: ['petrol_92', 'petrol_95', 'diesel', 'ev_rescue'],
    maxCapacityLiters: 80,
    verifiedBadge: 'Pump & Jumpstart Equipped',
    coordinates: { lat: 24.8720, lng: 67.0220 }
  },
  {
    id: 'rider-4',
    name: 'Rashid Nawaz',
    photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    vehicle: 'Toyota Hilux Highway Rescue',
    rating: 4.75,
    reviewsCount: 189,
    etaMinutes: 12,
    distanceKm: 4.1,
    baseDeliveryFee: 7.00,
    phone: '+1 (555) 998-3344',
    status: 'online',
    carryingFuel: ['petrol_95', 'diesel'],
    maxCapacityLiters: 60,
    verifiedBadge: 'Heavy Recovery Specialist',
    coordinates: { lat: 24.8810, lng: 67.0290 }
  }
];

export const SAFETY_TIPS = [
  'Turn on vehicle hazard emergency lights immediately.',
  'If stopped on a highway shoulder, exit from the passenger side and stand behind the metal crash barrier.',
  'Do not smoke or use open flames near the stranded vehicle while awaiting fuel delivery.',
  'Confirm the 4-digit verification code before the rider dispenses fuel into your vehicle tank.'
];
