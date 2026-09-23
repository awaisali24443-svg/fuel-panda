# ⛽ Fuel Panda — Roadside Emergency On-Demand Fuel Delivery

[![Live Demo](https://img.shields.io/badge/Live%20Demo-awaisali24443--svg.github.io%2Ffuel--panda-success?style=for-the-badge&logo=github)](https://awaisali24443-svg.github.io/fuel-panda/)

> 🚀 **Live Preview Available Now:** [https://awaisali24443-svg.github.io/fuel-panda/](https://awaisali24443-svg.github.io/fuel-panda/)

[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-purple.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-cyan.svg)](https://tailwindcss.com/)

> **FoodPanda for Emergency Fuel** — When a driver runs out of fuel on the highway or in city traffic, they open Fuel Panda, drop their GPS location pin, get instantly matched with the nearest mobile fuel dispatch couriers, negotiate and finalize the deal in real-time chat/call, and track delivery with a 4-digit safety OTP verification handshake.

---

## 🌟 Key Features & Innovations

### 1. 📍 Live GPS Pin & Roadside Location Selector
- **One-tap Auto-GPS pinpointing** with high precision latitude/longitude.
- **Landmark & Highway Mile Marker support** (e.g., *Highway M-9 Northbound, Mile Marker 42, Shoulder Lane*).
- **Vehicle Identification tags** (Vehicle model, color, license plate, hazard condition note).

### 2. ⚡ Real-Time Radar Map & Nearest Courier Matching
- **Interactive Radar Canvas**: Visualizes dynamic radar sweeps, range distance rings (1km, 3km, 5km), and surrounding mobile fuel carriers.
- **Instant Auto-Dispatch Engine**: One-click fastest courier allocation (closest rider, lowest ETA).
- **Rider Comparison Cards**: Compare response time, distance, star ratings, DOT canister equipment, and base delivery fees.

### 3. 💬 In-App Live Deal Negotiation & Contact
- **Direct Real-Time Chat**: Negotiate delivery fee, ask for emergency funnels, or add priority rush tips.
- **Voice Calling Simulator**: Call rider directly to relay immediate roadside details.
- **Price Transparency**: Automatic bill breakdown combining certified station fuel cost + sealed canister deposit + delivery fee.
- **Flexible Payment Modes**: Cash on Delivery (COD), Credit/Debit Card, or Mobile UPI/Wallet.

### 4. 🛡️ Safety OTP Handshake Protocol
- **4-Digit Anti-Theft / Anti-Contamination OTP**: Customer receives a one-time passcode on their screen.
- **Tamper-Proof Verification**: Rider cannot unlock or dispense fuel until the stranded motorist gives them the matching OTP.

### 5. 🚨 Roadside Hazard Strobe Beacon
- **Screen Flash Hazard Mode**: Turns phone/tablet screen into a high-visibility flashing amber strobe light to prop against the rear windshield facing oncoming highway traffic in low-light emergencies.
- **Highway Survival Guidelines**: Prompts driver to exit from the passenger side, stand safely behind guardrails, and keep hazards flashing.

### 6. 🏍️ Dual-Sided Mode (Customer View vs Rider Mode)
- **Stranded Driver Experience**: Location drop, fuel selector, courier list, live tracking.
- **Rider Partner Dashboard**: Toggle Online/Offline duty, review incoming emergency distress pings, accept jobs, view customer location, and enter OTP to dispense fuel and collect payouts.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+ or v20+)
- npm or pnpm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/awaisali24443-svg/fuel-panda.git
cd fuel-panda

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build

```bash
# Build optimized static distribution
npm run build

# Preview build locally
npm run preview
```

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS v4, Lucide React Icons
- **Mapping**: Dynamic SVG Radar Engine with real-time waypoint interpolation
- **Deployment**: Compatible with Vercel, Netlify, Cloudflare Pages, and GitHub Pages

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.
