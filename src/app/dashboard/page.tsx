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
             <button className="h-12 w-12 rounded-2xl bg-white/5 border border-
