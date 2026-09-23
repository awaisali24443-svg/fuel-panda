// Pakistan Fuel & Roadside Rescue Mock Data

export const FUEL_TYPES = [
  {
    id: 'petrol_92',
    name: 'Super Petrol (Mogas 92 Octane)',
    urduName: 'سپر پیٹرول (92 آکٹین)',
    category: 'Gasoline',
    pricePerLiter: 265.50,
    unit: 'Litre',
    badge: 'Most Popular',
    urduBadge: 'سب سے زیادہ مقبول',
    iconColor: 'from-amber-500 to-orange-600',
    description: 'OGRA-certified unleaded petrol for CD70, CG125, YBR, Suzuki Alto, Mehran, Cultus, Corolla & City.',
    urduDescription: 'موٹر سائیکل (CD70/CG125)، آلٹو، مہران، کلٹس، کرولا اور سٹی کے لیے معیاری پیٹرول۔'
  },
  {
    id: 'petrol_95',
    name: 'HOBC / Hi-Octane (97/95 Octane)',
    urduName: 'ہائی آکٹین (HOBC)',
    category: 'Premium Gasoline',
    pricePerLiter: 284.00,
    unit: 'Litre',
    badge: 'High Performance',
    urduBadge: 'اعلیٰ کوالٹی',
    iconColor: 'from-emerald-500 to-teal-600',
    description: 'Refined high-octane fuel for modern turbo engines, Civic RS, Fortuner, Sportage, and luxury cars.',
    urduDescription: 'سوِک ٹربو، فارچیونر، اسپورٹیج اور امپورٹڈ گاڑیوں کے انجن کی حفاظت کے لیے پریمیم ایندھن۔'
  },
  {
    id: 'diesel',
    name: 'High-Speed Diesel (HSD Euro-5)',
    urduName: 'ہائی اسپیڈ ڈیزل (Euro-5)',
    category: 'Diesel',
    pricePerLiter: 273.80,
    unit: 'Litre',
    badge: 'Commercial & 4x4',
    urduBadge: 'کمرشل اور فور بائی فور',
    iconColor: 'from-blue-600 to-cyan-700',
    description: 'Clean sulfur-controlled diesel for Toyota Revo / Hilux / Vigo, Hiace, Shahzore, Prado & pickups.',
    urduDescription: 'ریوو، ہائی لکس، ویگو، ہائی ایس، شہزور اور بڑی کمرشل گاڑیوں کے لیے ہائی اسپیڈ ڈیزل۔'
  },
  {
    id: 'ev_rescue',
    name: 'Emergency Battery Jumpstart & EV Boost',
    urduName: 'بیٹری جمپ اسٹارٹ / ای وی ایمرجنسی',
    category: 'Electric & Jumpstart',
    pricePerLiter: 1200.00,
    unit: 'Service / Boost',
    badge: 'Instant Jumpstart',
    urduBadge: 'فوری جمپ اسٹارٹ',
    iconColor: 'from-purple-500 to-indigo-600',
    description: 'Heavy-duty 12V/24V booster jumpstart for dead AGS/Osaka/Phoenix batteries + portable EV charge kit.',
    urduDescription: 'ڈیڈ بیٹری (AGS/Osaka) کے لیے فوری جمپ اسٹارٹ سروس اور الیکٹرک گاڑیوں کے لیے چارجنگ۔'
  }
];

export const QUANTITIES = [
  {
    liters: 3,
    label: '3 Litres',
    priceEst: 796,
    desc: 'Emergency limp-home range (~35-45 km)',
    urduDesc: 'موٹر سائیکل اور چھوٹی گاڑی کے لیے ہنگامی فیول',
    recommendedFor: 'Bikes (CD70, CG125, YBR, GS150)'
  },
  {
    liters: 5,
    label: '5 Litres',
    priceEst: 1327,
    desc: 'Standard refill to reach next PSO/Shell station (~45-65 km)',
    urduDesc: 'قریبی پٹرول پمپ تک باآسانی پہنچنے کے لیے',
    recommendedFor: 'Suzuki Alto, Mehran, WagonR, Cultus',
    popular: true
  },
  {
    liters: 10,
    label: '10 Litres',
    priceEst: 2655,
    desc: 'Highway and Motorway safe range (~90-130 km)',
    urduDesc: 'موٹروے اور ہائی وے پر لمبے سفر کے لیے موزوں',
    recommendedFor: 'Corolla, Civic, City, Yaris, Sportage'
  },
  {
    liters: 20,
    label: '20 Litres',
    priceEst: 5310,
    desc: 'High-capacity emergency refill in heavy-duty canister',
    urduDesc: 'بڑی گاڑیوں اور دور دراز علاقوں کے لیے بڑا کین',
    recommendedFor: 'Hilux Revo, Fortuner, Prado, Commercial Trucks'
  }
];

export const VEHICLE_TYPES = [
  { id: 'bike', label: 'Motorbike / CD70 / 125', urdu: 'موٹر سائیکل', icon: '🏍️' },
  { id: 'hatchback', label: 'Hatchback / Alto / 660cc', urdu: 'چھوٹی گاڑی / آلٹو', icon: '🚗' },
  { id: 'sedan', label: 'Sedan / Corolla / Civic', urdu: 'سیڈان / کرولا / سٹی', icon: '🚘' },
  { id: 'suv', label: 'SUV / Revo / Fortuner', urdu: 'فور بائی فور / ریوو', icon: '🚙' },
  { id: 'commercial', label: 'Van / Shahzore / Bolan', urdu: 'شہزور / بولان / ہائی ایس', icon: '🚐' },
  { id: 'auto', label: 'Qingqi / Auto Rickshaw', urdu: 'رکشہ / چنگچی', icon: '🛺' }
];

export const PAKISTAN_CITIES = [
  {
    id: 'karachi',
    name: 'Karachi (کراچی)',
    coordinates: { lat: 24.8607, lng: 67.0011 },
    hotspots: [
      'Shahrah-e-Faisal (Near Nursery Flyover, Karachi)',
      'Clifton Do Talwar (Khayaban-e-Iqbal, Karachi)',
      'DHA Phase 6 (Khayaban-e-Ittehad, Karachi)',
      'M-9 Super Highway Toll Plaza (Karachi Bypass)',
      'Korangi Expressway (Near Baloch Colony Bridge)'
    ]
  },
  {
    id: 'lahore',
    name: 'Lahore (لاہور)',
    coordinates: { lat: 31.5204, lng: 74.3587 },
    hotspots: [
      'Canal Road (Near Thokar Niaz Baig, Lahore)',
      'Lahore Ring Road (SL-1 Kamahan Interchange)',
      'Gulberg III Main Boulevard (Near Liberty, Lahore)',
      'DHA Phase 5 (Bedian Road Roundabout, Lahore)',
      'Ferozepur Road (Near Model Town Link Road)'
    ]
  },
  {
    id: 'islamabad',
    name: 'Islamabad / Rawalpindi (اسلام آباد / راولپنڈی)',
    coordinates: { lat: 33.6844, lng: 73.0479 },
    hotspots: [
      'Srinagar Highway (Near Zero Point Interchange)',
      'Blue Area Jinnah Avenue (Centaurus, Islamabad)',
      'Islamabad Expressway (Near Faizabad Interchange)',
      'Murree Road (Near Committee Chowk, Rawalpindi)',
      'Bahria Town Phase 7 (Expressway Entrance)'
    ]
  },
  {
    id: 'motorway',
    name: 'Motorway M-2 / M-9 / GT Road (موٹرویز)',
    coordinates: { lat: 32.1877, lng: 73.0791 },
    hotspots: [
      'Motorway M-2 Southbound (Mile Marker 84, Bhera Rest Area)',
      'Motorway M-2 (Near Kalar Kahar Salt Range Descent)',
      'Motorway M-9 (Karachi-Hyderabad, Near Nooriabad Service Area)',
      'N-5 National Highway GT Road (Gujranwala Bypass)',
      'Motorway M-3 (Lahore-Abdul Hakeem Interchange)'
    ]
  }
];

export const INITIAL_RIDERS = [
  {
    id: 'rider-1',
    name: 'Bilal Ahmed',
    urduName: 'بلال احمد',
    city: 'Karachi',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    vehicle: 'Honda CG125 (OGRA Steel-Caged Double Canister)',
    rating: 4.96,
    reviewsCount: 384,
    etaMinutes: 5,
    distanceKm: 0.8,
    baseDeliveryFee: 350, // in PKR
    phone: '0300-4829101',
    status: 'online',
    carryingFuel: ['petrol_92', 'petrol_95'],
    maxCapacityLiters: 15,
    verifiedBadge: 'OGRA Hazmat & Police Verified Rider',
    urduVerified: 'اوگرا اور پولیس ویریفائیڈ رائڈر',
    cnicVerified: true,
    coordinates: { lat: 24.8615, lng: 67.0105 }
  },
  {
    id: 'rider-2',
    name: 'Tariq Mehmood',
    urduName: 'طارق محمود',
    city: 'Lahore',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    vehicle: 'Suzuki GS150 (Heavy Carrier with 20L Jerrycan)',
    rating: 4.92,
    reviewsCount: 318,
    etaMinutes: 7,
    distanceKm: 1.5,
    baseDeliveryFee: 400, // in PKR
    phone: '0321-8849201',
    status: 'online',
    carryingFuel: ['petrol_92', 'petrol_95', 'diesel'],
    maxCapacityLiters: 25,
    verifiedBadge: 'Top Roadside Hero • Certified First Responder',
    urduVerified: 'ریسکیو سند یافتہ ہیرو',
    cnicVerified: true,
    coordinates: { lat: 24.8650, lng: 67.0150 }
  },
  {
    id: 'rider-3',
    name: 'Hamza Sheikh',
    urduName: 'حمزہ شیخ',
    city: 'Islamabad',
    photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    vehicle: 'Yamaha YBR 125G (Rapid Response High-Clearance)',
    rating: 4.88,
    reviewsCount: 220,
    etaMinutes: 9,
    distanceKm: 2.3,
    baseDeliveryFee: 450, // in PKR
    phone: '0345-7719283',
    status: 'online',
    carryingFuel: ['petrol_92', 'petrol_95', 'diesel', 'ev_rescue'],
    maxCapacityLiters: 20,
    verifiedBadge: 'Battery Jumpstart & Fuel Specialist',
    urduVerified: 'بیٹری جمپ اسٹارٹ اور فیول ماہر',
    cnicVerified: true,
    coordinates: { lat: 24.8720, lng: 67.0220 }
  },
  {
    id: 'rider-4',
    name: 'Usman Butt',
    urduName: 'عثمان بٹ',
    city: 'Motorway / Highway',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    vehicle: 'Suzuki Bolan Tanker Van (Heavy Highway Support)',
    rating: 4.90,
    reviewsCount: 540,
    etaMinutes: 12,
    distanceKm: 3.9,
    baseDeliveryFee: 600, // in PKR
    phone: '0312-9918234',
    status: 'online',
    carryingFuel: ['petrol_92', 'petrol_95', 'diesel', 'ev_rescue'],
    maxCapacityLiters: 100,
    verifiedBadge: 'Motorway M-2 / M-9 Heavy Rescue Unit',
    urduVerified: 'موٹروے ایمرجنسی ریسکیو یونٹ',
    cnicVerified: true,
    coordinates: { lat: 24.8810, lng: 67.0290 }
  }
];

export const PAKISTANI_PAYMENT_METHODS = [
  {
    id: 'cod',
    name: 'Cash on Delivery (نقدی ادائیگی)',
    badge: 'Most Convenient',
    icon: '💵',
    description: 'Pay cash in Pakistani Rupees (PKR) directly to rider upon fuel dispensing. Exact change appreciated.'
  },
  {
    id: 'jazzcash',
    name: 'JazzCash (جاز کیش)',
    badge: 'Instant QR / Till ID',
    icon: '🔴',
    description: 'Transfer via JazzCash app to rider mobile number or scan Rider QR on arrival.'
  },
  {
    id: 'easypaisa',
    name: 'Easypaisa (ایزی پیسہ)',
    badge: 'Instant Raast',
    icon: '🟢',
    description: 'Send via Easypaisa / Raast instant transfer directly to rider verified account.'
  },
  {
    id: 'sadapay_nayapay',
    name: 'SadaPay / NayaPay / Raast',
    badge: '0% Fee',
    icon: '⚡',
    description: 'Instant zero-fee payment via Raast ID or debit card POS.'
  }
];

export const EMERGENCY_HELPLINES = [
  {
    name: 'Motorway & Highway Police',
    urduName: 'موٹروے اور ہائی وے پولیس',
    number: '130',
    dialUri: 'tel:130',
    desc: 'For breakdowns on M-2, M-9, M-3, M-5 & GT Road (24/7 Helpline)'
  },
  {
    name: 'Rescue 1122',
    urduName: 'ریسکیو 1122 ایمرجنسی',
    number: '1122',
    dialUri: 'tel:1122',
    desc: 'Government emergency medical, rescue and disaster response service'
  },
  {
    name: 'Police Emergency',
    urduName: 'پولیس مددگار 15',
    number: '15',
    dialUri: 'tel:15',
    desc: 'Immediate emergency police dispatch (All cities in Pakistan)'
  },
  {
    name: 'Edhi Ambulance',
    urduName: 'ایدھی ایمبولینس سروس',
    number: '115',
    dialUri: 'tel:115',
    desc: '24/7 Edhi Foundation nationwide roadside emergency support'
  }
];

export const SAFETY_TIPS = [
  'OGRA Regulation Notice: In Pakistan, pouring fuel into open plastic bottles is strictly prohibited and dangerous. All Fuel Panda couriers use certified sealed steel/HDPE Jerry Cans with grounding spouts.',
  'Motorway & Ring Road Safety: Always park on the leftmost emergency shoulder. Switch on hazard blinkers and wait outside the car behind the steel guardrail.',
  'Night Roadside Protocol: In isolated or dimly lit stretches, keep vehicle doors locked until your assigned rider arrives and you verify their photo, bike number, and 4-digit OTP code.',
  'Always verify the 4-digit Fuel Panda security handshake OTP before breaking the tamper-proof fuel seal.'
];

export const URDU_QUICK_CHATS = [
  {
    labelUrdu: 'بھائی کتنا وقت لگے گا؟',
    labelRoman: 'Bhai kitna time lagay ga? Jaldi pohnchain.',
    replyRider: 'Bhai GPS track ho gaya hai, bas 5 se 7 minute mein pohnch raha hoon.'
  },
  {
    labelUrdu: 'گاڑی کے ہیزرڈ آن ہیں، محفوظ سائیڈ کھڑا ہوں',
    labelRoman: 'Car hazards are ON, standing safely on shoulder lane.',
    replyRider: 'Bohat behtar! Safe side kharay rahein, main orange hazard jacket mein bike par aa raha hoon.'
  },
  {
    labelUrdu: 'جاز کیش / ایزی پیسہ یا کیش دوں؟',
    labelRoman: 'JazzCash / Easypaisa or Cash on Delivery ready.',
    replyRider: 'JazzCash, Easypaisa ya Cash donon chalain gay. Khulay baqaya change bhi mere paas hain.'
  },
  {
    labelUrdu: 'سیل بند کین لانا بھائی، پلاسٹک بوتل نہیں',
    labelRoman: 'Please bring OGRA sealed safety canister, no open bottles.',
    replyRider: 'Bilkul! 100% OGRA-approved certified anti-leak Jerry Can with anti-spill nozzle ready hai.'
  }
];
