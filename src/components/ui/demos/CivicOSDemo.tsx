'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, AlertCircle, CheckCircle2, Bot, Send, BarChart2, Radio } from 'lucide-react';
import { labAudio } from '@/lib/audio';

interface IssuePin {
  id: string;
  category: string;
  title: string;
  location: string;
  status: 'In Progress' | 'Resolved' | 'Dispatched';
  urgency: 'High' | 'Medium' | 'Low';
  x: number; // percentage on map
  y: number; // percentage on map
}

const DEMO_PINS: IssuePin[] = [
  { id: 'CIV-102', category: 'Infrastructure', title: 'Road Pothole & Storm Drain Block', location: 'Sector 4, Main Boulevard', status: 'In Progress', urgency: 'High', x: 28, y: 34 },
  { id: 'CIV-103', category: 'Water Supply', title: 'Low Pressure Pipeline Triage', location: 'Ward 12, Shivaji Nagar', status: 'Dispatched', urgency: 'Medium', x: 64, y: 45 },
  { id: 'CIV-104', category: 'Sanitation', title: 'Automated Waste Segregation Overflow', location: 'Civic Center Gate 2', status: 'Resolved', urgency: 'Low', x: 42, y: 72 },
  { id: 'CIV-105', category: 'Power & Grid', title: 'Smart LED Grid Transformer Blink', location: 'Expressway Flyover Exit 3', status: 'In Progress', urgency: 'High', x: 78, y: 26 },
];

export default function CivicOSDemo() {
  const [selectedPin, setSelectedPin] = useState<IssuePin>(DEMO_PINS[0]);
  const [filter, setFilter] = useState<string>('All');
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const filteredPins = filter === 'All' ? DEMO_PINS : DEMO_PINS.filter(p => p.category === filter);

  function handleQuerySubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    labAudio.playClick(900);
    setIsProcessing(true);
    setAiResponse(null);

    setTimeout(() => {
      setIsProcessing(false);
      labAudio.playChime();
      setAiResponse(
        `[CivicAI Triage]: Incident registered under "${selectedPin.category}" protocol. Priority: ${selectedPin.urgency}. Automatic ticket dispatch generated for Regional Ward Team #4. ETA for inspection: 45 minutes.`
      );
    }, 800);
  }

  return (
    <div className="p-5 sm:p-7 rounded-2xl bg-[#080B12] border border-[var(--border-strong)] text-[var(--text)] font-sans">
      {/* Top Bar with Demo Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border)] mb-5">
        <div className="flex items-center gap-2.5">
          <Radio size={14} className="text-[#00F5C8] animate-pulse" />
          <span className="mono font-bold text-xs tracking-wider text-[#00F5C8]">
            CIVICOS INTERACTIVE DASHBOARD SIMULATOR
          </span>
        </div>
        <span className="mono text-[10px] px-2.5 py-1 rounded-full bg-[rgba(0,245,200,0.12)] border border-[rgba(0,245,200,0.3)] text-[#00F5C8]">
          SIMULATED LIVE TELEMETRY
        </span>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left: Simulated Map Viewport */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs mono text-[var(--text-sub)]">
            <span>GEOSPATIAL LEAFLET COORDINATE MATRIX</span>
            <span>ZOOM: 14.5x // GRID: PUNE-SECTOR-4</span>
          </div>

          {/* Interactive Map Surface */}
          <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#0A0E18] border border-[rgba(255,255,255,0.1)] p-4 select-none">
            {/* Map Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,200,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,200,0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute top-2 left-2 text-[9px] mono text-[var(--text-sub)]">
              MAP BOUND: 18.5204° N, 73.8567° E
            </div>

            {/* Interactive Pins */}
            {filteredPins.map(pin => {
              const isSelected = selectedPin.id === pin.id;
              return (
                <button
                  key={pin.id}
                  onClick={() => {
                    labAudio.playClick(1000);
                    setSelectedPin(pin);
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-200 hover:scale-125 z-10"
                  style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                  title={`${pin.title} (${pin.status})`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center shadow-lg transition-all ${
                      isSelected
                        ? 'bg-[#00F5C8] text-black scale-110 ring-4 ring-[#00F5C8]/30 shadow-[#00F5C8]/50'
                        : 'bg-[#181F30] text-[#00F5C8] border border-[#00F5C8]/40'
                    }`}
                  >
                    <MapPin size={12} />
                  </div>
                </button>
              );
            })}

            {/* Selected Pin Popup In Map */}
            <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-[rgba(8,11,18,0.92)] border border-[rgba(255,255,255,0.12)] backdrop-blur-md flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-[#FFFFFF] flex items-center gap-2">
                  <span>{selectedPin.title}</span>
                  <span className="mono text-[9px] px-1.5 py-0.5 rounded bg-[var(--surface-3)] text-[#00F5C8]">
                    {selectedPin.id}
                  </span>
                </div>
                <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
                  {selectedPin.location}
                </div>
              </div>
              <span className="mono text-[10px] font-bold text-[#00F5C8]">
                {selectedPin.status.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {['All', 'Infrastructure', 'Water Supply', 'Sanitation', 'Power & Grid'].map(cat => (
              <button
                key={cat}
                onClick={() => {
                  labAudio.playClick(850);
                  setFilter(cat);
                }}
                className={`mono text-[10px] px-2.5 py-1 rounded-full cursor-pointer transition-all ${
                  filter === cat
                    ? 'bg-[#00F5C8] text-black font-bold'
                    : 'bg-[var(--surface)] text-[var(--text-sub)] hover:text-[var(--text)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Ticket Inspector & Simulated AI Query Interface */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-xl bg-[#0E1320] border border-[var(--border)] space-y-3">
            <div className="flex items-center justify-between text-xs mono text-[var(--text-sub)]">
              <span>TICKET DETAILS</span>
              <span className="text-[#00F5C8] font-bold">{selectedPin.id}</span>
            </div>
            <div>
              <div className="text-sm font-bold text-[var(--text)]">{selectedPin.title}</div>
              <div className="text-xs text-[var(--text-muted)] mt-1">{selectedPin.location}</div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs mono pt-2 border-t border-[var(--border)]">
              <div>
                <span className="text-[var(--text-sub)] text-[10px]">CATEGORY:</span>
                <div className="text-[var(--text)] font-semibold">{selectedPin.category}</div>
              </div>
              <div>
                <span className="text-[var(--text-sub)] text-[10px]">PRIORITY:</span>
                <div className="text-[#FF6B35] font-semibold">{selectedPin.urgency}</div>
              </div>
            </div>
          </div>

          {/* AI Municipal Query Simulator */}
          <div className="p-4 rounded-xl bg-[#0E1320] border border-[var(--border)] space-y-3">
            <div className="flex items-center gap-1.5 mono text-xs text-[#00F5C8]">
              <Bot size={14} />
              <span>CIVIC AI QUERY RESOLUTION</span>
            </div>

            <form onSubmit={handleQuerySubmit} className="space-y-2">
              <input
                type="text"
                value={aiPrompt}
                onChange={e => setAiPrompt(e.target.value)}
                placeholder="Ask AI query or report civic issue (e.g., report water drop)..."
                className="w-full px-3 py-2 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-xs text-[var(--text)] placeholder-[var(--text-sub)] outline-none focus:border-[#00F5C8] mono"
              />
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setAiPrompt('Low water pressure in Sector 4 residential sector')}
                  className="mono text-[9px] text-[var(--text-sub)] hover:text-[#00F5C8] underline cursor-pointer"
                >
                  Insert Sample Prompt
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="glow-btn glow-btn-primary text-[10px] py-1.5 px-3"
                >
                  <span>{isProcessing ? 'PROCESSING...' : 'QUERY AI'}</span>
                  <Send size={11} />
                </button>
              </div>
            </form>

            {aiResponse && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-[rgba(0,245,200,0.08)] border border-[rgba(0,245,200,0.25)] text-xs text-[var(--text)] leading-relaxed font-light"
              >
                {aiResponse}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
