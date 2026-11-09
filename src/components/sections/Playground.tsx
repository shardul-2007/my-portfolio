'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Play, Pause, RotateCcw, Shuffle, Sparkles, Send, Database } from 'lucide-react';
import { labAudio } from '@/lib/audio';

export default function Playground() {
  const [activeTab, setActiveTab] = useState<'sorting' | 'binarySearch' | 'apiSim'>('sorting');

  // ── 1. Sorting Visualizer State ────────────────────────────────
  const INITIAL_ARRAY = [45, 18, 72, 34, 88, 12, 59, 23, 95, 40, 61, 29, 81, 15];
  const [array, setArray] = useState<number[]>(INITIAL_ARRAY);
  const [sorting, setSorting] = useState(false);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [comparisons, setComparisons] = useState(0);

  function shuffleArray() {
    labAudio.playClick(900);
    setSorting(false);
    setActiveIndices([]);
    setComparisons(0);
    const shuffled = [...INITIAL_ARRAY].sort(() => Math.random() - 0.5);
    setArray(shuffled);
  }

  async function runBubbleSort() {
    if (sorting) return;
    labAudio.playClick(1000);
    setSorting(true);
    const arr = [...array];
    let comps = 0;

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setActiveIndices([j, j + 1]);
        comps++;
        setComparisons(comps);
        labAudio.playKey();

        await new Promise(r => setTimeout(r, 65));

        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
        }
      }
    }
    setActiveIndices([]);
    setSorting(false);
    labAudio.playChime();
  }

  // ── 2. Binary Search State ─────────────────────────────────────
  const BINARY_ARRAY = [3, 8, 15, 23, 34, 42, 51, 62, 74, 85, 93, 108, 120];
  const [targetNum, setTargetNum] = useState<number>(62);
  const [bsPointers, setBsPointers] = useState<{ low: number; mid: number; high: number } | null>(null);
  const [bsFoundIndex, setBsFoundIndex] = useState<number | null>(null);
  const [bsSteps, setBsSteps] = useState<string[]>([]);
  const [bsRunning, setBsRunning] = useState(false);

  async function runBinarySearch() {
    if (bsRunning) return;
    labAudio.playClick(1000);
    setBsRunning(true);
    setBsFoundIndex(null);
    setBsSteps([]);

    let low = 0;
    let high = BINARY_ARRAY.length - 1;
    const stepsLog: string[] = [];

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      setBsPointers({ low, mid, high });
      labAudio.playKey();
      stepsLog.push(`Probe: Low=${low} [${BINARY_ARRAY[low]}], Mid=${mid} [${BINARY_ARRAY[mid]}], High=${high} [${BINARY_ARRAY[high]}]`);
      setBsSteps([...stepsLog]);

      await new Promise(r => setTimeout(r, 700));

      if (BINARY_ARRAY[mid] === targetNum) {
        setBsFoundIndex(mid);
        stepsLog.push(`Target ${targetNum} found at index ${mid} in O(log n) time!`);
        setBsSteps([...stepsLog]);
        setBsRunning(false);
        labAudio.playChime();
        return;
      } else if (BINARY_ARRAY[mid] < targetNum) {
        stepsLog.push(`${BINARY_ARRAY[mid]} < ${targetNum} -> Search right partition.`);
        low = mid + 1;
      } else {
        stepsLog.push(`${BINARY_ARRAY[mid]} > ${targetNum} -> Search left partition.`);
        high = mid - 1;
      }
      setBsSteps([...stepsLog]);
    }

    stepsLog.push(`Target ${targetNum} not present in sorted array.`);
    setBsSteps([...stepsLog]);
    setBsRunning(false);
  }

  // ── 3. API Simulator State ─────────────────────────────────────
  const [apiEndpoint, setApiEndpoint] = useState('/api/v1/profile');
  const [apiMethod, setApiMethod] = useState('GET');
  const [apiLatency, setApiLatency] = useState(38);
  const [apiResponse, setApiResponse] = useState<string>(
    JSON.stringify(
      {
        status: 200,
        author: 'Shardul Parihar',
        brand: 'SHARDUL.LAB',
        programsCount: 17,
        achievementsCount: 16,
        skillsCount: 23,
        projectsCount: 4,
        available: true,
      },
      null,
      2
    )
  );

  function executeApiTest(endpoint: string, method = 'GET') {
    labAudio.playClick(950);
    setApiEndpoint(endpoint);
    setApiMethod(method);
    const latency = Math.floor(25 + Math.random() * 40);
    setApiLatency(latency);

    if (endpoint === '/api/v1/profile') {
      setApiResponse(
        JSON.stringify(
          {
            status: 200,
            fullName: 'Shardul Rajendra Parihar',
            role: 'Software Engineer · Builder · AI Enthusiast',
            location: 'Pune, Maharashtra, India',
            education: "PCET's NMIET",
            roles: 'Google Student Ambassador, HackerRank Campus Crew',
          },
          null,
          2
        )
      );
    } else if (endpoint === '/api/v1/projects') {
      setApiResponse(
        JSON.stringify(
          {
            status: 200,
            count: 4,
            projects: [
              { id: 'civicos', name: 'CivicOS', category: 'Full Stack / AI' },
              { id: 'assemblyos', name: 'AssemblyOS', category: '3D Graphics / AI' },
              { id: 'skillcert', name: 'SkillCert', category: 'Full Stack / SaaS' },
              { id: 'shardul-os', name: 'SHARDUL.LAB', category: 'Frontend / Design' },
            ],
          },
          null,
          2
        )
      );
    } else if (endpoint === '/api/v1/telemetry') {
      setApiResponse(
        JSON.stringify(
          {
            status: 200,
            kernel: 'Next.js 14.2.15 + TypeScript',
            theme: 'Dark Lab / Cyber Yellow Dual Engine',
            buildVersion: '2026.11',
            verifiedClaims: '100% Genuine Credentials',
          },
          null,
          2
        )
      );
    }
  }

  return (
    <section id="playground" className="py-28 relative border-b border-[var(--border)] overflow-hidden">
      <div className="section-container">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <Code size={14} className="text-[var(--accent)]" />
            <span className="sys-label-accent">ALGORITHMIC WORKBENCH // INTERACTIVE LAB</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text)] font-editorial">
            Engineering <span className="gradient-text">Playground.</span>
          </h2>
          <p className="text-base text-[var(--text-muted)] font-light mt-3 leading-relaxed">
            Real, functioning algorithmic visualizers and network response simulators. Watch algorithms execute step by step.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-2 pb-6 border-b border-[var(--border)] mb-8">
          {[
            { id: 'sorting', label: '01. SORTING ALGORITHM VISUALIZER' },
            { id: 'binarySearch', label: '02. BINARY SEARCH STEPPER' },
            { id: 'apiSim', label: '03. API REQUEST SIMULATOR' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                labAudio.playClick(900);
                setActiveTab(tab.id as typeof activeTab);
              }}
              className={`mono text-xs px-4 py-2 rounded-xl transition-all cursor-pointer font-semibold ${
                activeTab === tab.id
                  ? 'bg-[var(--accent)] text-black font-bold shadow-[0_0_15px_var(--accent-glow)]'
                  : 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Sorting Visualizer */}
        {activeTab === 'sorting' && (
          <div className="p-6 sm:p-8 rounded-3xl glass border border-[var(--border-strong)] space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
              <div>
                <h3 className="font-bold text-lg text-[var(--text)]">Bubble Sort Visualizer</h3>
                <div className="mono text-xs text-[var(--text-sub)]">
                  Comparisons: <span className="text-[var(--accent)] font-bold">{comparisons}</span> · Time Complexity: O(n²)
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  disabled={sorting}
                  onClick={runBubbleSort}
                  className="glow-btn glow-btn-primary text-xs py-1.5 px-3 disabled:opacity-40"
                >
                  <Play size={12} />
                  <span>START SORT</span>
                </button>
                <button
                  disabled={sorting}
                  onClick={shuffleArray}
                  className="glow-btn glow-btn-ghost text-xs py-1.5 px-3 disabled:opacity-40"
                >
                  <Shuffle size={12} />
                  <span>SHUFFLE</span>
                </button>
              </div>
            </div>

            {/* Array Bars Container */}
            <div className="h-56 flex items-end justify-between gap-1 sm:gap-2 pt-6 px-2 sm:px-4 bg-[#0A0D18] rounded-2xl border border-[var(--border)]">
              {array.map((val, idx) => {
                const isActive = activeIndices.includes(idx);
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <span className="mono text-[9px] text-[var(--text-sub)] hidden sm:block">{val}</span>
                    <motion.div
                      layout
                      className={`w-full rounded-t-lg transition-colors ${
                        isActive
                          ? 'bg-[#FF6B35] shadow-[0_0_12px_#FF6B35]'
                          : 'bg-[var(--accent)]'
                      }`}
                      style={{ height: `${(val / 100) * 80}%` }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Binary Search Stepper */}
        {activeTab === 'binarySearch' && (
          <div className="p-6 sm:p-8 rounded-3xl glass border border-[var(--border-strong)] space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
              <div>
                <h3 className="font-bold text-lg text-[var(--text)]">Binary Search Stepper</h3>
                <div className="mono text-xs text-[var(--text-sub)]">
                  Search Time: O(log n) · Sorted Monotonic Array
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="mono text-xs text-[var(--text-sub)]">TARGET:</span>
                <select
                  value={targetNum}
                  onChange={e => setTargetNum(Number(e.target.value))}
                  disabled={bsRunning}
                  className="mono text-xs px-3 py-1.5 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] outline-none"
                >
                  {BINARY_ARRAY.map(n => (
                    <option key={n} value={n} className="bg-[#0C101A]">
                      {n}
                    </option>
                  ))}
                  <option value={999} className="bg-[#0C101A]">999 (Not In Array)</option>
                </select>

                <button
                  disabled={bsRunning}
                  onClick={runBinarySearch}
                  className="glow-btn glow-btn-primary text-xs py-1.5 px-3 disabled:opacity-40"
                >
                  <Play size={12} />
                  <span>STEP SEARCH</span>
                </button>
              </div>
            </div>

            {/* Binary Array Elements */}
            <div className="flex flex-wrap gap-2 p-4 bg-[#0A0D18] rounded-2xl border border-[var(--border)] justify-center">
              {BINARY_ARRAY.map((val, idx) => {
                const isLow = bsPointers?.low === idx;
                const isMid = bsPointers?.mid === idx;
                const isHigh = bsPointers?.high === idx;
                const isFound = bsFoundIndex === idx;

                return (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <div
                      className={`w-11 sm:w-14 h-12 rounded-xl flex items-center justify-center font-bold mono text-sm transition-all border ${
                        isFound
                          ? 'bg-[#10B981] text-black border-[#10B981] shadow-[0_0_15px_#10B981]'
                          : isMid
                          ? 'bg-[#FF6B35] text-white border-[#FF6B35] shadow-[0_0_12px_#FF6B35]'
                          : isLow || isHigh
                          ? 'bg-[var(--surface-3)] text-[var(--accent)] border-[var(--accent)]'
                          : 'bg-[var(--surface-2)] text-[var(--text-muted)] border-[var(--border)]'
                      }`}
                    >
                      {val}
                    </div>
                    <span className="mono text-[9px] text-[var(--text-sub)]">
                      {isMid ? 'MID' : isLow ? 'LOW' : isHigh ? 'HIGH' : `[${idx}]`}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Step Log Box */}
            <div className="p-4 rounded-xl bg-[#07090F] border border-[var(--border)] max-h-36 overflow-y-auto space-y-1 mono text-xs text-[var(--text-muted)]">
              {bsSteps.length === 0 ? (
                <div className="text-[var(--text-sub)]">Click &quot;Step Search&quot; to probe pointers.</div>
              ) : (
                bsSteps.map((step, i) => (
                  <div key={i} className="text-[var(--accent)]">
                    {step}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Tab 3: API Request Simulator */}
        {activeTab === 'apiSim' && (
          <div className="p-6 sm:p-8 rounded-3xl glass border border-[var(--border-strong)] space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
              <div>
                <h3 className="font-bold text-lg text-[var(--text)]">REST API Response Simulator</h3>
                <div className="mono text-xs text-[var(--text-sub)]">
                  Status: <span className="text-[#10B981] font-bold">200 OK</span> · Latency: {apiLatency}ms · Content-Type: application/json
                </div>
              </div>

              {/* Endpoint Fast Switches */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { name: 'GET /profile', path: '/api/v1/profile' },
                  { name: 'GET /projects', path: '/api/v1/projects' },
                  { name: 'GET /telemetry', path: '/api/v1/telemetry' },
                ].map(ep => (
                  <button
                    key={ep.path}
                    onClick={() => executeApiTest(ep.path)}
                    className={`mono text-xs px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                      apiEndpoint === ep.path
                        ? 'bg-[var(--accent)] text-black font-bold'
                        : 'bg-[var(--surface-2)] border-[var(--border)] text-[var(--text-muted)] hover:text-white'
                    }`}
                  >
                    {ep.name}
                  </button>
                ))}
              </div>
            </div>

            {/* JSON Viewer */}
            <div className="p-5 rounded-2xl bg-[#07090F] border border-[var(--border)] font-mono text-xs text-[#00F5C8] overflow-x-auto max-h-[300px]">
              <pre>{apiResponse}</pre>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
