"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  LayoutDashboard, Users, CalendarCheck, 
  Settings, LogOut, Search, Bell, ChevronRight 
} from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SaaSAdminPortal() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- DYNAMIC SAAS IDENTITY ---
  const businessSlug = process.env.NEXT_PUBLIC_BUSINESS_SLUG || "demo-business";
  const businessName = process.env.NEXT_PUBLIC_BUSINESS_NAME || "Nexus Services";

  useEffect(() => {
    const fetchLeads = async () => {
      const { data } = await supabase
        .from('leads')
        .select('*')
        .eq('business_slug', businessSlug) // Filters leads for THIS specific client
        .order('created_at', { ascending: false });

      setLeads(data || []);
      setLoading(false);
    };
    
    fetchLeads();
  }, [businessSlug]);

  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-sans">
      {/* SIDEBAR - THE COMMAND CENTER */}
      <aside className="w-64 border-r border-white/5 bg-[#0a0a0a] p-6 hidden md:flex flex-col">
        <div className="mb-10 px-2">
          <h2 className="text-xl font-black tracking-tighter text-sky-500">NEXUS<span className="text-white">OS</span></h2>
        </div>
        
        <nav className="space-y-2 flex-1">
          <SidebarLink icon={<LayoutDashboard size={18} />} label="Overview" active />
          <SidebarLink icon={<Users size={18} />} label="Customers" />
          <SidebarLink icon={<CalendarCheck size={18} />} label="Appointments" />
          <SidebarLink icon={<Settings size={18} />} label="Settings" />
        </nav>

        <button className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500/80 hover:bg-red-500/5 rounded-xl transition-all">
          <LogOut size={18} /> Sign Out
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back,</h1>
            {/* Dynamic Business Name inserted here */}
            <p className="text-neutral-500">Here is what's happening at {businessName}.</p> 
          </div>
          <div className="flex gap-3">
             <button className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center"><Search size={20}/></button>
             <button className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative">
                <Bell size={20}/>
                <span className="absolute top-3 right-3 h-2 w-2 bg-sky-500 rounded-full animate-ping" />
             </button>
          </div>
        </header>

        {/* STATS STRIP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Leads" value={leads.length} change="+12%" />
          <StatCard title="Est. Revenue" value={`$${leads.length * 85}`} change="+18%" />
          <StatCard title="Active Campaigns" value="1" change="0%" />
        </div>

        {/* DATA TABLE */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] overflow-hidden">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h3 className="font-bold">Recent Leads</h3>
            <button className="text-xs font-bold text-sky-500 uppercase tracking-widest">View All</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-widest text-neutral-500 border-b border-white/5">
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Date/Time</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {leads.map((lead) => (
                  <tr key={lead.id} className="group hover:bg-white/[0.02] transition-all">
                    <td className="px-6 py-5">
                      <div className="font-bold text-sm">{lead.customer_name}</div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase">{lead.service}</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-xs text-neutral-400 font-medium">
                        {/* Accessing the JSONB column we created in page.tsx */}
                        {lead.booking_info?.date} • {lead.booking_info?.time}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        <span className="text-[10px] font-bold uppercase text-neutral-400">New</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="opacity-0 group-hover:opacity-100 transition-all text-sky-500"><ChevronRight size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

// UI COMPONENTS
function SidebarLink({ icon, label, active = false }: any) {
  return (
    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${active ? 'bg-sky-500 text-black shadow-[0_0_20px_rgba(56,189,248,0.3)]' : 'text-neutral-500 hover:text-white hover:bg-white/5'}`}>
      {icon} {label}
    </button>
  );
}

function StatCard({ title, value, change }: any) {
  return (
    <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-[2rem]">
      <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-2">{title}</p>
      <div className="flex justify-between items-end">
        <h4 className="text-3xl font-black">{value}</h4>
        <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-lg">{change}</span>
      </div>
    </div>
  );
}
