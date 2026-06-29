import { useState, useEffect } from 'react'
import HolyTextScroll from './HolyTextScroll'

function App() {
  const [showAnimation, setShowAnimation] = useState(true)
  const [isFlickering, setIsFlickering] = useState(false)

  useEffect(() => {
    if (showAnimation) {
      // Animation plays for 5 seconds
      const animationTimer = setTimeout(() => {
        setIsFlickering(true)
      }, 5000)

      return () => clearTimeout(animationTimer)
    }
  }, [showAnimation])

  useEffect(() => {
    if (isFlickering) {
      // Flicker for 1 second then switch to home screen
      const flickerTimer = setTimeout(() => {
        setShowAnimation(false)
        setIsFlickering(false)
      }, 1000)

      return () => clearTimeout(flickerTimer)
    }
  }, [isFlickering])

  if (showAnimation) {
    return (
      <div className={`min-h-screen bg-[#0a1a0a] text-[#39ff14] font-mono flex flex-col p-4 ${isFlickering ? 'animate-flicker-screen' : ''}`}>
        <div className="flex-1">
          <HolyTextScroll />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a1a0a] text-[#39ff14] font-mono flex flex-col p-4">
      {/* Outer terminal border */}
      <div className="flex-1 border-2 border-[#39ff14] flex flex-col shadow-[0_0_20px_#39ff14]">

        {/* ── HEADER ── */}
        <header className="border-b-2 border-[#39ff14] px-3 md:px-6 py-2 md:py-3 flex flex-col md:flex-row items-start md:items-center justify-between bg-[#0d220d] gap-2 md:gap-0">
          <div className="terminal-glow text-base md:text-lg tracking-[0.3em] uppercase font-bold">
            ⬡ Imperial Data Terminal
          </div>
          <div className="text-xs tracking-widest text-[#166534] terminal-glow-sm">
            ADEPTUS MECHANICUS — OMNISSIAH PROTECTS
          </div>
        </header>

        {/* ── MAIN LAYOUT: nav + content ── */}
        <div className="flex flex-1 overflow-hidden">

          {/* ── LEFT NAV (hidden on mobile) ── */}
          <nav className="hidden md:flex w-52 flex-shrink-0 border-r-2 border-[#39ff14] bg-[#0d220d] flex-col">
            <div className="border-b border-[#166534] px-4 py-2 text-xs tracking-[0.2em] text-[#166534] uppercase">
              Navigation
            </div>

            <NavSection title="Records">
              <NavItem label="Planet Records" />
              <NavItem label="Fleet Registry" />
              <NavItem label="Personnel Files" />
            </NavSection>

            <NavSection title="Operations">
              <NavItem label="Threat Assessment" />
              <NavItem label="Archive Search" />
              <NavItem label="Vox Messages" />
            </NavSection>

            <NavSection title="Command">
              <NavItem label="Sector Overview" />
              <NavItem label="Crusade Orders" />
              <NavItem label="Supply Routes" />
            </NavSection>

            <div className="mt-auto border-t border-[#166534] px-4 py-3">
              <div className="text-xs text-[#166534] terminal-glow-sm">
                [STC DATABASE v7.41.M42]
              </div>
            </div>
          </nav>

          {/* ── MAIN CONTENT AREA ── */}
          <main className="flex-1 flex flex-col overflow-auto bg-[#0a1a0a]">

            {/* Sub-navigation / panel tabs */}
            <div className="border-b border-[#166534] flex text-xs tracking-widest overflow-x-auto">
              <TabButton label="Planet Records" active />
              <TabButton label="Fleet Registry" />
              <TabButton label="Threat Assessment" />
              <TabButton label="Archive Search" />
              <TabButton label="Vox Messages" />
            </div>

            {/* Data panels */}
            <div className="flex-1 p-3 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6 overflow-auto">

              <DataPanel title="▸ Planet Information">
                <DataRow label="Designation" value="Armageddon Prime" />
                <DataRow label="Sector" value="Armageddon Sector" />
                <DataRow label="Classification" value="Hive World" />
                <DataRow label="Population" value="36.8 Billion" />
                <DataRow label="Governor" value="Herman von Strab (DECEASED)" />
                <DataRow label="Imperial Tithe" value="Exactis Tertius" />
                <DataRow label="Threat Level" value="EXTERMINATUS WATCH" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  LAST UPDATED: 999.M41 — RECORD SEALED BY ORDER OF YARRICK
                </div>
              </DataPanel>

              <DataPanel title="▸ Fleet Status">
                <DataRow label="Battlefleet Gothic" value="27 Vessels — ACTIVE" />
                <DataRow label="Strike Cruisers" value="14 — IN TRANSIT" />
                <DataRow label="Thunderhawk Craft" value="312 — STANDBY" />
                <DataRow label="Escort Vessels" value="61 — PATROL" />
                <DataRow label="Transport Ships" value="44 — DOCKED" />
                <DataRow label="Adm. Commanding" value="Admiral Quarren" />
                <DataRow label="Fleet Readiness" value="87% COMBAT READY" />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  VOID SHIELD STATUS: NOMINAL — ALL SECTORS CLEAR
                </div>
              </DataPanel>

              {/* Star Map panel — full width */}
              <div className="lg:col-span-2">
                <DataPanel title="▸ Star Map — Armageddon Sub-Sector">
                  <StarMap />
                </DataPanel>
              </div>

            </div>
          </main>
        </div>

        {/* ── STATUS BAR ── */}
        <footer className="border-t-2 border-[#39ff14] px-2 md:px-6 py-1 md:py-2 flex flex-col md:flex-row justify-between items-start md:items-center bg-[#0d220d] text-xs tracking-widest gap-1 md:gap-0">
          <div className="terminal-glow-sm">
            <span className="text-[#39ff14]">■</span>{' '}
            STATUS: <span className="terminal-glow">ONLINE</span>
          </div>
          <div className="text-[#166534] text-xs">
            TERRA — 999.M42 — CYCLE 7734
          </div>
          <div className="terminal-glow-sm">
            ACCESS LEVEL: <span className="terminal-glow">ALPHA</span>
          </div>
        </footer>

      </div>
    </div>
  )
}

/* ── Small reusable components ── */

function NavSection({ title, children }) {
  return (
    <div className="border-b border-[#166534]">
      <div className="px-4 py-1 text-[0.65rem] tracking-[0.15em] text-[#166534] uppercase bg-[#0d220d]">
        {title}
      </div>
      <ul>{children}</ul>
    </div>
  )
}

function NavItem({ label }) {
  return (
    <li className="px-4 py-1.5 text-sm border-b border-[#0d220d] hover:bg-[#1a3a1a] hover:terminal-glow cursor-default transition-colors">
      › {label}
    </li>
  )
}

function TabButton({ label, active }) {
  return (
    <button
      type="button"
      className={`px-4 py-2 border-r border-[#166534] cursor-default transition-colors ${
        active
          ? 'bg-[#1a3a1a] text-[#39ff14] terminal-glow'
          : 'text-[#166534] hover:bg-[#0d220d] hover:text-[#39ff14]'
      }`}
    >
      {label}
    </button>
  )
}

function DataPanel({ title, children }) {
  return (
    <div className="border border-[#166534] bg-[#0d220d] flex flex-col">
      <div className="border-b border-[#166534] px-4 py-2 text-sm tracking-widest terminal-glow-sm uppercase">
        {title}
      </div>
      <div className="p-4 flex-1">{children}</div>
    </div>
  )
}

function DataRow({ label, value, alert }) {
  return (
    <div className="flex justify-between py-1 border-b border-[#0d220d] text-sm">
      <span className="text-[#166534] uppercase tracking-wider text-xs">{label}</span>
      <span className={alert ? 'text-yellow-400 terminal-glow' : 'text-[#39ff14]'}>{value}</span>
    </div>
  )
}

function StarMap() {
  const systems = [
    { x: 50, y: 40, name: 'Armageddon', size: 8, threat: 'high' },
    { x: 25, y: 25, name: 'Sotha', size: 5, threat: 'low' },
    { x: 70, y: 20, name: 'Volcanus', size: 6, threat: 'medium' },
    { x: 80, y: 55, name: 'Infernus', size: 5, threat: 'medium' },
    { x: 15, y: 60, name: 'Helsreach', size: 7, threat: 'high' },
    { x: 40, y: 70, name: 'Death Mire', size: 4, threat: 'low' },
    { x: 60, y: 75, name: 'Tempestus', size: 5, threat: 'low' },
    { x: 30, y: 50, name: 'Mannheim', size: 4, threat: 'low' },
  ]

  const threatColor = (t) =>
    t === 'high' ? '#ff4040' : t === 'medium' ? '#facc15' : '#39ff14'

  return (
    <div className="relative w-full" style={{ paddingBottom: '45%' }}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Grid lines */}
        {[20, 40, 60, 80].map((v) => (
          <g key={v}>
            <line x1={v} y1="0" x2={v} y2="100" stroke="#166534" strokeWidth="0.3" />
            <line x1="0" y1={v} x2="100" y2={v} stroke="#166534" strokeWidth="0.3" />
          </g>
        ))}

        {/* Warp routes */}
        {systems.map((s, i) =>
          systems.slice(i + 1, i + 3).map((t) => (
            <line
              key={`${s.name}-${t.name}`}
              x1={s.x} y1={s.y} x2={t.x} y2={t.y}
              stroke="#166534" strokeWidth="0.4" strokeDasharray="2 1"
            />
          ))
        )}

        {/* Star systems */}
        {systems.map((s) => (
          <g key={s.name}>
            <circle
              cx={s.x} cy={s.y} r={s.size * 0.4}
              fill={threatColor(s.threat)}
              opacity="0.8"
            />
            <circle
              cx={s.x} cy={s.y} r={s.size * 0.7}
              fill="none"
              stroke={threatColor(s.threat)}
              strokeWidth="0.3"
              opacity="0.4"
            />
            <text
              x={s.x} y={s.y + s.size * 0.7 + 2.5}
              textAnchor="middle"
              fontSize="2.8"
              fill={threatColor(s.threat)}
              fontFamily="monospace"
            >
              {s.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

export default App
