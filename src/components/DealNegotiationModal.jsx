import React, { useState } from 'react';
import { 
  X, Phone, MessageSquare, Send, CheckCircle2, ShieldCheck, 
  DollarSign, Clock, MapPin, Fuel, AlertCircle, PhoneCall 
} from 'lucide-react';

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
  onConfirmDeal
}) {
  if (!isOpen || !rider) return null;

  const [deliveryFee, setDeliveryFee] = useState(rider.baseDeliveryFee);
  const [tipSurge, setTipSurge] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cod'); // cod, card, mobile_wallet
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'rider',
      text: `Hello! I see you need ${quantityLiters}L of ${fuelName}. I have sealed DOT canisters ready on my bike and can reach you in ~${rider.etaMinutes} minutes.`,
      time: 'Just now'
    },
    {
      id: 2,
      sender: 'user',
      text: `Hi ${rider.name}, I am stranded at ${userLocation.address || 'Highway shoulder'} with ${vehicleDetails || 'my car'}. Please hurry!`,
      time: 'Just now'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [callingState, setCallingState] = useState(false);

  const grandTotal = fuelSubtotal + deliveryFee + tipSurge;

  const quickReplies = [
    `I am in a ${vehicleDetails || 'car'} with hazard lights blinking.`,
    'Is your fuel canister fresh & sealed with security tag?',
    'Please bring an emergency funnel if available.',
    'I will pay cash on arrival, please rush!'
  ];

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

    // Rider automated response simulation
    setTimeout(() => {
      let reply = 'Copy that! I have locked your GPS pin and I am fastening the fuel containers.';
      if (text.toLowerCase().includes('sealed') || text.toLowerCase().includes('funnel')) {
        reply = '100% sealed factory containers with safety spout and spill-proof funnel included!';
      } else if (text.toLowerCase().includes('cash')) {
        reply = 'Cash is great, exact change or large bills accepted. Finalize the deal button and I roll!';
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
      alert(`Connected to ${rider.name} (${rider.phone}).\n\nRider says: "I see your coordinates near ${userLocation.address}. I am packing your ${quantityLiters}L ${fuelName} right now. Please confirm the order on the screen!"`);
      setCallingState(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={rider.photo}
              alt={rider.name}
              className="w-10 h-10 rounded-xl object-cover border border-amber-500/40"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-white text-sm sm:text-base">{rider.name}</h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.2 rounded-full">
                  Online &bull; {rider.distanceKm} km away
                </span>
              </div>
              <p className="text-xs text-slate-400">{rider.vehicle} &bull; {rider.verifiedBadge}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCallSimulate}
              disabled={callingState}
              className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition text-xs font-semibold flex items-center gap-1.5"
              title="Voice Call Rider"
            >
              <PhoneCall className={`w-4 h-4 ${callingState ? 'animate-bounce' : ''}`} />
              <span className="hidden sm:inline">{callingState ? 'Calling...' : 'Call Rider'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body: Chat + Deal Terms */}
        <div className="p-5 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Deal Pricing Summary Card */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Agreed Roadside Rescue Deal
              </span>
              <span className="text-xs font-mono text-amber-400 font-bold">
                ETA ~{rider.etaMinutes} mins
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <div>
                <span className="text-slate-500 block">Fuel Ordered:</span>
                <span className="font-semibold text-slate-200">{quantityLiters}L &bull; {fuelName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Fuel Cost:</span>
                <span className="font-semibold text-slate-200">${fuelSubtotal.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Emergency Delivery Fee:</span>
                <span className="font-semibold text-slate-200">${deliveryFee.toFixed(2)}</span>
              </div>
            </div>

            {/* Optional Rush Tip / Surge */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-slate-400">Add Priority Rush Bonus:</span>
              <div className="flex gap-1.5">
                {[0, 2, 5].map(bonus => (
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
                    {bonus === 0 ? 'None' : `+$${bonus}`}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Final Agreed Price:</span>
                <span className="text-xs text-slate-500">Includes sealed canister & delivery</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-amber-400 font-mono">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Payment Method Upon Arrival
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-2.5 rounded-xl border text-xs font-semibold transition text-center ${
                  paymentMethod === 'cod'
                    ? 'bg-amber-500/10 border-amber-500 text-amber-300 ring-1 ring-amber-500/40'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                💵 Cash on Delivery
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-2.5 rounded-xl border text-xs font-semibold transition text-center ${
                  paymentMethod === 'card'
                    ? 'bg-amber-500/10 border-amber-500 text-amber-300 ring-1 ring-amber-500/40'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                💳 Debit/Credit Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('mobile_wallet')}
                className={`p-2.5 rounded-xl border text-xs font-semibold transition text-center ${
                  paymentMethod === 'mobile_wallet'
                    ? 'bg-amber-500/10 border-amber-500 text-amber-300 ring-1 ring-amber-500/40'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                📱 Mobile UPI / Wallet
              </button>
            </div>
          </div>

          {/* Live In-App Chat */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                <span>Live Chat with Rider</span>
              </span>
              <span className="text-[11px] text-emerald-400 font-mono">Encrypted &bull; Direct Channel</span>
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

            {/* Quick replies pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {quickReplies.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(q)}
                  className="text-[11px] bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg px-2.5 py-1 text-left transition"
                >
                  {q}
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
                placeholder="Type instructions or negotiate deal..."
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
            <span className="text-lg font-black text-amber-400 font-mono">${grandTotal.toFixed(2)}</span>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onConfirmDeal({
                riderId: rider.id,
                riderName: rider.name,
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
                otp: Math.floor(1000 + Math.random() * 9000).toString()
              })}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Finalize Deal & Dispatch Rider</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
