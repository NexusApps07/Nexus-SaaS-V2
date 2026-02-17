"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  History, ShoppingBag, Edit3, Trash2, X, ChevronRight, 
  CheckCircle, Bell, User, Plus, Heart, Dog, Download, 
  Smartphone, MapPin, Sparkles, Award, ShieldCheck
} from 'lucide-react';

export default function NexusMasterPortal() {
  const [activeTab, setActiveTab] = useState('experience');
  const [bookings, setBookings] = useState<any[]>([]);
  const [pets, setPets] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isScheduling, setIsScheduling] = useState<any>(null); 
  const [showInstallHelp, setShowInstallHelp] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // --- BRANDING DNA ---
  const brandName = process.env.NEXT_PUBLIC_BUSINESS_NAME || "Nexus Master Lab";
  const brandCity = process.env.NEXT_PUBLIC_BUSINESS_CITY || "Premium Experience";
  const brandColor = process.env.NEXT_PUBLIC_THEME_COLOR || "#38bdf8";

  // Glassmorphism Utility
  const glassBase = {
    backgroundColor: `${brandColor}15`,
    backdropFilter: 'blur(20px)',
    border: `1px solid ${brandColor}20`,
  };

  useEffect(() => {
    setIsMounted(true);
    const savedBookings = localStorage.getItem('nexus_vault_data');
    if (savedBookings) setBookings(JSON.parse(savedBookings));
  }, []);

  const availableDates = useMemo(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      days.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    return days;
  }, []);

  const saveBooking = () => {
    const updated = [{ id: Date.now(), service: isScheduling.name, price: isScheduling.price, date: selectedDate, time: selectedTime }, ...bookings];
    setBookings(updated);
    localStorage.setItem('nexus_vault_data', JSON.stringify(updated));
    setIsScheduling(null);
    setToast("Booking Confirmed");
    setTimeout(() => setToast(null), 3000);
  };

  if (!isMounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="max-w-md mx-auto min-h-screen pb-32 relative bg-[#020617] text-white selection:bg-sky-500/30">
      
      {/* GOOGLE FONTS IMPORT */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Inter:wght@400;700&display=swap');
        h1, h2, h3, .font-premium { font-family: 'Playfair Display', serif; }
        body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* DYNAMIC BACKGROUND GLOW */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{ background: `radial-gradient(circle at 50% -10%, ${brandColor}, transparent 80%)` }}
      />

      {/* HEADER */}
      <header className="px-6 pt-14 pb-8 relative z-10 flex justify-between items-start">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-4xl font-bold tracking-tight uppercase italic leading-none">
            {brandName}
          </h1>
          <div className="flex items-center gap-2 mt-3 opacity-70">
             <MapPin size={12} style={{ color: brandColor }} />
             <p className="text-[10px] font-bold uppercase tracking-[0.4em]">
               {brandCity}
             </p>
          </div>
        </motion.div>
        <button onClick={() => setShowInstallHelp(true)} className="h-12 w-12 rounded-2xl flex items-center justify-center border border-white/10 bg-white/5 active:scale-90 transition-all">
          <Download size={20} />
        </button>
      </header>

      <main className="px-6 relative z-10 space-y-8">
        {activeTab === 'experience' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            
            {/* HERO CARD WITH FIXED PHOTO */}
            <div 
              style={glassBase}
              className="relative overflow-hidden rounded-[3rem] shadow-2xl border border-white/5"
            >
               <div className="relative h-64 w-full">
                  <img 
                    src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800" 
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="Hero Pet"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
               </div>

               <div className="p-8 pt-0 -mt-12 relative z-10">
                 <div className="flex justify-between items-center mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-black/60 backdrop-blur-md flex items-center justify-center border border-white/10">
                        <ShieldCheck size={24} style={{ color: brandColor }} />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-50">Verified Partner</span>
                 </div>
                 <h2 className="text-3xl font-bold italic mb-3 leading-tight">Refined Care for <br/>Your Family.</h2>
                 <p className="text-xs opacity-60 leading-relaxed mb-8">Experience boutique grooming services tailored for {brandCity}'s elite pets.</p>
                 
                 <button 
                  onClick={() => setIsScheduling({name: "Premium Session", price: "$120"})}
                  style={{ backgroundColor: brandColor }}
                  className="w-full py-5 rounded-2xl text-black font-bold text-xs uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-all"
                 >
                    Reserve Now
                 </button>
               </div>
            </div>

            {/* SERVICES GRID */}
            <div className="grid grid-cols-1 gap-4">
              <ServiceCard color={brandColor} glass={glassBase} name="Essential Session" price="$65" onSelect={() => setIsScheduling({name: "Essential Session", price: "$65"})} />
              <ServiceCard color={brandColor} glass={glassBase} name="Full Grooming" price="$95" onSelect={() => setIsScheduling({name: "Full Grooming", price: "$95"})} />
            </div>
          </motion.div>
        )}

        {activeTab === 'vault' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {bookings.length === 0 ? (
                <div style={glassBase} className="py-24 text-center rounded-[3rem] flex flex-col items-center">
                   <History size={40} className="opacity-10 mb-4" />
                   <p className="opacity-30 text-xs font-bold uppercase tracking-widest">No Past History</p>
                </div>
              ) : (
                bookings.map(b => (
                  <div key={b.id} style={glassBase} className="p-6 rounded-[2rem] flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: brandColor }}>{b.date} • {b.time}</p>
                      <h4 className="text-white font-premium text-lg italic">{b.service}</h4>
                    </div>
                    <button onClick={() => setBookings(bookings.filter(x => x.id !== b.id))} className="h-10 w-10 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500"><Trash2 size={16}/></button>
                  </div>
                ))
              )}
            </motion.div>
        )}
      </main>

      {/* NAVIGATION */}
      <nav className="fixed bottom-10 left-10 right-10 z-50">
        <div className="bg-black/60 backdrop-blur-3xl border border-white/10 rounded-full p-2 flex justify-between items-center shadow-2xl">
          <NavBtn active={activeTab === 'experience'} icon={<ShoppingBag size={22}/>} label="Book" onClick={() => setActiveTab('experience')} color={brandColor} />
          <NavBtn active={activeTab === 'vault'} icon={<History size={22}/>} label="Vault" onClick={() => setActiveTab('vault')} color={brandColor} />
          <NavBtn active={activeTab === 'family'} icon={<User size={22}/>} label="Pets" onClick={() => setActiveTab('family')} color={brandColor} />
        </div>
      </nav>

      {/* SCHEDULING MODAL */}
      <AnimatePresence>
        {isScheduling && (
          <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl p-10 flex flex-col">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl font-bold italic">Secure Slot</h2>
              <button onClick={() => setIsScheduling(null)} className="h-12 w-12 bg-white/5 rounded-full flex items-center justify-center"><X size={20}/></button>
            </div>
            <div className="space-y-10 flex-1">
                <section>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-5">Select Date</p>
                    <div className="grid grid-cols-4 gap-3">
                        {availableDates.map(d => (
                            <button key={d} onClick={() => setSelectedDate(d)} className={`py-5 rounded-2xl text-[10px] font-bold border transition-all ${selectedDate === d ? 'bg-white text-black' : 'bg-white/5 border-white/5 text-white/40'}`}>
                                {d}
                            </button>
                        ))}
                    </div>
                </section>
                <section>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-5">Time Slot</p>
                    <div className="grid grid-cols-3 gap-3">
                        {['09:00', '12:00', '15:00'].map(t => (
                            <button key={t} onClick={() => setSelectedTime(t)} className={`py-5 rounded-2xl text-[10px] font-bold border transition-all ${selectedTime === t ? 'bg-white text-black' : 'bg-white/5 border-white/5 text-white/40'}`}>{t}</button>
                        ))}
                    </div>
                </section>
            </div>
            <button disabled={!selectedDate || !selectedTime} onClick={saveBooking} style={{ backgroundColor: brandColor }} className="w-full py-6 rounded-3xl text-black font-bold text-xs uppercase tracking-[0.3em] disabled:opacity-20 active:scale-95 transition-all">Confirm Appointment</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOAST */}
      <AnimatePresence>{toast && (<motion.div initial={{ y: -60 }} animate={{ y: 20 }} exit={{ y: -60 }} className="fixed top-0 left-6 right-6 z-[120] bg-white text-black p-5 rounded-2xl flex items-center gap-3"><CheckCircle size={20} className="text-green-600" /><p className="text-xs font-bold uppercase tracking-tight">{toast}</p></motion.div>)}</AnimatePresence>
    </div>
  );
}

function ServiceCard({ name, price, onSelect, glass, color }: any) {
  return (
    <div onClick={onSelect} style={glass} className="p-7 rounded-[2.5rem] flex justify-between items-center active:scale-[0.98] transition-all border border-white/5">
      <div><h4 className="text-white font-premium text-xl italic">{name}</h4><p className="text-neutral-500 text-xs mt-1">Bespoke Session</p></div>
      <div className="text-right">
        <span className="text-white text-2xl block mb-2 font-bold">{price}</span>
        <div className="flex items-center justify-end gap-1 text-[9px] font-bold uppercase tracking-widest" style={{ color }}>Details <ChevronRight size={14} /></div>
      </div>
    </div>
  );
}

function NavBtn({ active, icon, label, onClick, color }: any) {
  return (
    <button onClick={onClick} className={`flex items-center gap-2 px-7 py-4 rounded-full transition-all duration-500 ${active ? 'bg-white text-black shadow-2xl scale-110' : 'text-white/30 hover:text-white'}`}>
      {icon}{active && <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>}
    </button>
  );
}
