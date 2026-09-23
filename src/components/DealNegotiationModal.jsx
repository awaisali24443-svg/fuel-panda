import React, { useState } from 'react';
import { 
  X, Phone, MessageSquare, Send, CheckCircle2, ShieldCheck, 
  DollarSign, Clock, MapPin, Fuel, AlertCircle, PhoneCall, QrCode 
} from 'lucide-react';
import { PAKISTANI_PAYMENT_METHODS, URDU_QUICK_CHATS } from '../data/mockData';

export default function DealNegotiationModal({
  isOpen,
  onClose,
  rider,
  fuelSubtotal,
  quantityLiters,
  fuelName,
  userLocation,
  vehicleDetails,
  roadsideNote,
  onConfirmDeal,
  lang = 'en'
}) {
  if (!isOpen || !rider) return null;

  const [deliveryFee, setDeliveryFee] = useState(rider.baseDeliveryFee);
  const [tipSurge, setTipSurge] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cod'); // cod, jazzcash, easypaisa, sadapay_nayapay
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'rider',
      text: `Assalam-o-Alaikum! I have ${quantityLiters}L of ${fuelName} ready in an OGRA-certified sealed safety jerrycan. I am approximately ${rider.etaMinutes} minutes away from your location.`,
      urduText: `السلام علیکم! میرے پاس ${quantityLiters} لیٹر فیول اوگرا تصدیق شدہ کین میں تیار ہے۔ میں تقریباً ${rider.etaMinutes} منٹ میں پہنچ سکتا ہوں۔`,
      time: 'Just now'
    },
    {
      id: 2,
      sender: 'user',
      text: `Walaikum Assalam ${rider.name}, I am stranded at ${userLocation.address || 'Roadside'}. Please dispatch quickly!`,
      urduText: `وعلیکم السلام، میں اس وقت روڈ پر پھنسا ہوں۔ برائے مہربانی جلدی پہنچیں۔`,
      time: 'Just now'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [callingState, setCallingState] = useState(false);

  const grandTotal = fuelSubtotal + deliveryFee + tipSurge;

  const handleSend = (textToSend) => {
    const text = textToSend || inputMsg;
    if (!text.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: 'Just now'
    };
    setMessages(prev => [...prev, newMsg]);
    if (!textToSend) setInputMsg('');

    // Rider automated response simulation in Pakistani roadside context
    setTimeout(() => {
      let reply = 'Bhai GPS lock hogaya hai! Main fuel canister secure karke direct nikal raha hoon.';
      const lower = text.toLowerCase();
      if (lower.includes('bottle') || lower.includes('sealed') || lower.includes('کین')) {
        reply = '100% sealed anti-spill OGRA jerrycan aur funnel mere paas hai, no open plastic bottles!';
      } else if (lower.includes('jazzcash') || lower.includes('easypaisa') || lower.includes('cash') || lower.includes('پیسہ')) {
        reply = 'Theek hai bhai! JazzCash, Easypaisa ya Cash donon available hain. Screen par confirm karein aur main pohanchta hoon!';
      } else if (lower.includes('change') || lower.includes('baqaya') || lower.includes('کھلے')) {
        reply = 'Baqaya khulay change Rs. 500 aur Rs. 100 kay notes mere paas hain, tension na lein.';
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'rider',
        text: reply,
        time: 'Just now'
      }]);
    }, 1000);
  };

  const handleCallSimulate = () => {
    setCallingState(true);
    setTimeout(() => {
      alert(`Connected to ${rider.name} (${rider.phone}).\n\nRider says: "Assalam-o-Alaikum! Main aapki location dekh raha hoon (${userLocation.address}). Mera bike nikal chuka hai. Mobile screen par deal confirm karein aur 4-digit OTP note kar lein!"`);
      setCallingState(false);
    }, 1500);
  };

  const handleFinalize = () => {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const dealData = {
      riderId: rider.id,
      riderName: rider.name,
      riderUrduName: rider.urduName,
      riderPhone: rider.phone,
      riderPhoto: rider.photo,
      riderVehicle: rider.vehicle,
      fuelName,
      quantityLiters,
      grandTotal,
      paymentMethod,
      userLocation,
      vehicleDetails,
      roadsideNote,
      etaMinutes: rider.etaMinutes,
      otp
    };
    onConfirmDeal(dealData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6 animate-fadeIn">
        
        {/* Header */}
        <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={rider.photo}
              alt={rider.name}
              className="w-11 h-11 rounded-2xl object-cover border border-amber-500/40"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-white text-sm sm:text-base">
                  {lang === 'ur' ? rider.urduName : rider.name}
                </h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.2 rounded-full">
                  Online &bull; {rider.distanceKm} km away
                </span>
              </div>
              <p className="text-xs text-slate-400">{rider.phone} &bull; {rider.vehicle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCallSimulate}
              disabled={callingState}
              className="p-2 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 transition text-xs font-bold flex items-center gap-1.5"
              title="Call Rider Phone"
            >
              <PhoneCall className={`w-3.5 h-3.5 ${callingState ? 'animate-bounce' : ''}`} />
              <span>{callingState ? 'Calling...' : `Call (${rider.phone})`}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Deal Pricing Summary Card in PKR */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {lang === 'ur' ? 'آرڈر اور ریٹس کا خلاصہ (پاکستانی روپے)' : 'Emergency Roadside Deal (PKR)'}
              </span>
              <span className="text-xs font-mono text-amber-400 font-bold">
                ETA ~{rider.etaMinutes} mins
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <div>
                <span className="text-slate-500 block">Fuel Requested:</span>
                <span className="font-semibold text-slate-200">{quantityLiters} Litres &bull; {fuelName.split('(')[0]}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Fuel Subtotal:</span>
                <span className="font-semibold text-slate-200 font-mono">Rs. {Math.round(fuelSubtotal).toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Rider Dispatch Fee:</span>
                <span className="font-semibold text-slate-200 font-mono">Rs. {deliveryFee}</span>
              </div>
            </div>

            {/* Optional Rush Tip in PKR */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-slate-400">Add Priority Rush Bonus / Tip (Bhai ki Chai):</span>
              <div className="flex gap-1.5">
                {[0, 100, 250, 500].map(bonus => (
                  <button
                    key={bonus}
                    type="button"
                    onClick={() => setTipSurge(bonus)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                      tipSurge === bonus
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-850 text-slate-300 border border-slate-800'
                    }`}
                  >
                    {bonus === 0 ? 'Rs. 0' : `+Rs. ${bonus}`}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Total Payable to Courier:</span>
                <span className="text-[11px] text-emerald-400 font-medium">OGRA certified sealed canister included</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-amber-400 font-mono">
                  Rs. {Math.round(grandTotal).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Pakistani Payment Method Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              {lang === 'ur' ? 'طریقہ ادائیگی منتخب کریں' : 'Choose Pakistani Payment Method Upon Arrival'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PAKISTANI_PAYMENT_METHODS.map(pay => (
                <button
                  key={pay.id}
                  type="button"
                  onClick={() => setPaymentMethod(pay.id)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold transition flex flex-col items-center justify-center text-center gap-1 ${
                    paymentMethod === pay.id
                      ? 'bg-amber-500/15 border-amber-500 text-amber-300 ring-1 ring-amber-500/40'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className="text-lg">{pay.icon}</span>
                  <span className="font-bold leading-tight">{pay.name.split('(')[0]}</span>
                  <span className="text-[9px] text-slate-500">{pay.badge}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Live In-App Chat */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'ur' ? 'رائڈر سے لائیو چیٹ' : 'Live Chat with Rider'}</span>
              </span>
              <span className="text-[11px] text-emerald-400 font-mono">Direct &bull; End-to-End</span>
            </div>

            {/* Chat Messages Log */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3.5 h-44 overflow-y-auto space-y-2.5">
              {messages.map(m => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none'
                        : 'bg-slate-850 text-slate-200 border border-slate-700/80 rounded-tl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[9px] text-slate-500 mt-0.5 px-1">{m.time}</span>
                </div>
              ))}
            </div>

            {/* Quick replies in Urdu & Roman Urdu */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {URDU_QUICK_CHATS.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(q.labelRoman)}
                  className="text-[11px] bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg px-2.5 py-1 text-left transition flex items-center gap-1"
                >
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{q.labelUrdu}</span>
                </button>
              ))}
            </div>

            {/* Chat Input */}
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type message or ask rider (e.g. Bhai kahan pohnchay)..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
              <button
                type="button"
                onClick={() => handleSend()}
                className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold transition flex items-center justify-center"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Modal Footer / Final Deal Button */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            <span className="text-xs text-slate-400">Total payable on delivery: </span>
            <span className="text-lg font-black text-amber-400 font-mono">
              Rs. {Math.round(grandTotal).toLocaleString()}
            </span>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-semibold text-xs transition"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleFinalize}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/25"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm & Lock Dispatch</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
