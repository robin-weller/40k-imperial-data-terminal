import { useState, useEffect } from 'react'
import HolyTextScroll from './HolyTextScroll'

function App() {
  const [showAnimation, setShowAnimation] = useState(true)
  const [isFlickering, setIsFlickering] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [archiveSearch, setArchiveSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchCategory, setSearchCategory] = useState('all')
  const [selectedPlanet, setSelectedPlanet] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'AI_COMMAND', text: 'COMMAND ASSISTANCE ONLINE — AWAITING ORDERS', timestamp: '00:00' }
  ])
  const [chatInput, setChatInput] = useState('')
  const [servoSkullQuery, setServoSkullQuery] = useState('')
  const [servoSkullResults, setServoSkullResults] = useState(null)
  const [servoSkullSearchHistory, setServoSkullSearchHistory] = useState([])
  const [servoSkullLoading, setServoSkullLoading] = useState(false)
  const [puritySeals, setPuritySeals] = useState([])

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

  const handleAIChat = (userMessage) => {
    const userMsg = {
      id: chatMessages.length + 1,
      sender: 'COMMANDER',
      text: userMessage,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
    }
    setChatMessages(prev => [...prev, userMsg])

    // AI Response logic
    let aiResponse = ''
    const input = userMessage.toLowerCase()

    if (input.includes('deploy') || input.includes('reinforcement')) {
      aiResponse = 'REINFORCEMENT DEPLOYMENT AUTHORIZED. Dispatching 50 Battle Brothers from Reserve Companies. ETA: 2 TURNS. Equipment Load: TACTICAL SQUADS WITH BOLTERS. Recommend positioning in defensive strongpoints for maximum effectiveness. Gene-Seed backup secured.'
    } else if (input.includes('backup') || input.includes('marine')) {
      aiResponse = 'BACKUP MARINE STATUS: Stored Gene-Seed: 847 UNITS. Reserve Personnel: 200+ BROTHERS. Emergency Resurrection Protocol: AVAILABLE. Recommend stationing backup marines in secondary fortifications. Casualty replacement capacity: SUFFICIENT FOR 5 MAJOR BATTLES.'
    } else if (input.includes('tactic') || input.includes('strategy')) {
      aiResponse = 'TACTICAL ANALYSIS: Current battlefield favors defensive positioning. Recommend deploying Devastator squads on elevated terrain for suppressive fire. Flank with Fast Attack units (Bikes/Jump troops). Maintain squad coherency for morale bonuses. Estimated victory probability: 78%.'
    } else if (input.includes('emergency') || input.includes('help') || input.includes('support')) {
      aiResponse = 'EMERGENCY PROTOCOLS ACTIVATED. Available Support: 1. Orbital Strike (LIMITED - 1 USE). 2. Medical Evacuation Teams. 3. Emergency Reinforcements (30 Marines). 4. Ammunition/Supply Drop. Which service required?'
    } else if (input.includes('mission') || input.includes('objective')) {
      aiResponse = 'CURRENT OBJECTIVES ANALYZED. Primary: Secure Defensive Position. Secondary: Eliminate Enemy Command Structure. Tertiary: Recover Imperial Artifacts. Recommended loadout: Heavy Weapons for area denial. Deploy transport pods for rapid insertion.'
    } else if (input.includes('how') || input.includes('what') || input.includes('when') || input.includes('why')) {
      aiResponse = 'Clarification required. Try asking about: DEPLOY REINFORCEMENTS, BACKUP MARINES STATUS, MISSION TACTICS, or EMERGENCY SUPPORT. The AI Command Nexus stands ready to serve the Imperium.'
    } else {
      aiResponse = 'COMMAND RECEIVED. Processing query... For optimal assistance, specify: DEPLOY REINFORCEMENTS | BACKUP MARINES | MISSION TACTICS | EMERGENCY SUPPORT. The Emperor\'s will guides us.'
    }

    setTimeout(() => {
      const aiMsg = {
        id: chatMessages.length + 2,
        sender: 'AI_COMMAND',
        text: aiResponse,
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
      }
      setChatMessages(prev => [...prev, aiMsg])
    }, 500)
  }

  const speakResponse = (text) => {
    // Stop any existing speech
    window.speechSynthesis.cancel()
    
    // Create utterance
    const utterance = new SpeechSynthesisUtterance(text)
    
    // Set voice properties for SERVO SKULL sound - mechanical, distorted, mechanical chirping
    utterance.rate = 0.65 // Much slower, very robotic and mechanical
    utterance.pitch = 1.8 // VERY HIGH PITCHED - like a distorted servo skull
    utterance.volume = 0.9
    
    // Try to use a computer/robotic voice if available
    const voices = window.speechSynthesis.getVoices()
    const roboticVoice = voices.find(v => 
      v.name.includes('Google UK') || 
      v.name.includes('Microsoft Zira') || 
      v.name.includes('Samantha') ||
      v.name.includes('moira') ||
      v.name.includes('Victoria') ||
      v.name.includes('Computer') ||
      v.name.includes('Robot')
    )
    
    if (roboticVoice) {
      utterance.voice = roboticVoice
    } else {
      // Fallback to any available voice
      const anyVoice = voices.find(v => v.name.length > 0)
      if (anyVoice) {
        utterance.voice = anyVoice
      }
    }
    
    // Add visual glitch effect when servo skull speaks
    const chatContainer = document.querySelector('[data-chat-container]')
    if (chatContainer) {
      chatContainer.style.animation = 'camGlitch 0.3s infinite'
      
      utterance.onend = () => {
        chatContainer.style.animation = 'none'
      }
    }
    
    // Speak the response
    window.speechSynthesis.speak(utterance)
  }

  // Servo Skull Knowledge Base
  const servoSkullKnowledgeBase = {
    'space marines': {
      title: 'SPACE MARINES — HUMANITY\'S FINEST',
      content: 'The Space Marines are the genetically-enhanced super-soldiers of the Imperium. Created from the geneseed of the Primarchs, each Marine stands 7-8 feet tall and possesses enhanced strength, reflexes, and durability. They are organized into Chapters of approximately 1,000 warriors, each led by a Chapter Master. Equipped with Power Armor, Bolters, and advanced weaponry, they are deployed across the galaxy to defend Imperial worlds.'
    },
    'chaos': {
      title: 'CHAOS — THE ENEMY WITHIN',
      content: 'Chaos represents the corrupting forces of the Warp—the realm of the Dark Gods: Khorne (War), Nurgle (Death), Tzeentch (Change), and Slaanesh (Excess). Those who fall to Chaos become twisted, corrupted abominations. Chaos forces threaten the Imperium from within and without, with Chaos Space Marines serving as the primary military threat. The Emperor\'s light is the only defense against this darkness.'
    },
    'adeptus mechanicus': {
      title: 'ADEPTUS MECHANICUS — THE MACHINE GOD\'S SERVANTS',
      content: 'The Adeptus Mechanicus is a techno-religious order that worships the Omnissiah (Machine God). They maintain and produce the Imperium\'s technology, guarding sacred knowledge and manufacturing weapons of war. Tech-Priests combine flesh with machine, becoming more mechanical than human. They control vast Forge Worlds and are essential to the Imperium\'s survival.'
    },
    'emperor': {
      title: 'THE EMPEROR OF MANKIND — THE MASTER OF MANKIND',
      content: 'The Emperor is the divine ruler of the Imperium, locked in eternal meditation upon the Golden Throne for 10,000 years. Though His body is failing, His psychic presence guides the Astronomican—a beacon that allows Imperial ships to navigate the Warp. He is worshipped as a god, and His will is absolute. The Emperor\'s light endures eternal.'
    },
    'ork': {
      title: 'ORKS — THE GREEN TIDE',
      content: 'Orks are crude, brutish xenos driven by an insatiable desire for war and violence. Operating in massive tribal structures called Waaaghs, Orks are unpredictable but incredibly dangerous in large numbers. They possess regenerative abilities and incredible durability. A Waaagh led by a powerful Warboss can threaten entire sectors of Imperial space. They must be exterminated without mercy.'
    },
    'inquisition': {
      title: 'INQUISITION — THE HAMMER OF FAITH',
      content: 'The Inquisition maintains the purity of the Imperium through surveillance, interrogation, and execution of heretics. Inquisitors possess near-absolute authority and answer only to the High Lords of Terra. They hunt psykers, investigate xenos threats, combat Chaos corruption, and eliminate anyone deemed a threat to Imperial stability. An Inquisitor\'s word is law.'
    },
    'imperial guard': {
      title: 'IMPERIAL GUARD — THE HAMMER OF THE EMPEROR',
      content: 'The Imperial Guard are humanity\'s primary military force—countless billions of soldiers armed with las-weapons and trained in the art of war. While individually inferior to Space Marines, they make up for this through sheer numbers and disciplined tactics. Regiments from various worlds bring different combat doctrines and specialties. They are the bulwark of the Imperium.'
    },
    'tyranid': {
      title: 'TYRANIDS — THE DEVOURER',
      content: 'Tyranids are bio-engineered xenos organisms from beyond the galaxy, stripping worlds of all biomatter to fuel their endless expansion. Operating under a single hive consciousness, they are relentless, adaptive predators. A Tyranid invasion means total extinction of all life on a world. They represent one of the greatest existential threats to all life in the galaxy.'
    },
    'necron': {
      title: 'NECRONS — THE ANCIENT ONES',
      content: 'Necrons are ancient undead cyborgs who ruled the galaxy billions of years ago. Once organic beings, they transferred their consciousness into immortal metal bodies. Though many lie dormant in their Tomb Worlds, awakening Necrons are devastating—technologically superior to all current races. They are relentless and nearly impossible to permanently destroy.'
    },
    'warp': {
      title: 'THE WARP — THE REALM OF CHAOS',
      content: 'The Warp is an alternate dimension of pure psychic energy where logic and physics hold no sway. Faster-than-light travel requires navigation through the Warp. It is populated by entities of pure chaos and malice—Daemons that seek to corrupt and destroy. Psychic powers draw from Warp energy but risk daemon possession. The Warp is fundamentally hostile to reality.'
    },
    'geneseed': {
      title: 'GENESEED — THE FOUNDATION OF MARINES',
      content: 'Geneseed are genetic templates harvested from a deceased Space Marine\'s body, containing the genetic memory and mutations of their Primarch. These are implanted into neophyte Marines during the creation process. Each Chapter guards their Geneseed jealously as it defines their genetic legacy. The loss of Geneseed is considered catastrophic to a Chapter\'s future.'
    },
    'heresy': {
      title: 'THE HORUS HERESY — THE FALL FROM GRACE',
      content: 'The Horus Heresy was a devastating civil war 10,000 years ago when half the Space Marine Legions turned to Chaos. Led by Warmaster Horus, the traitor forces nearly destroyed the Imperium before the Emperor defeated them. However, the Emperor was mortally wounded and entombed on the Golden Throne. The Heresy shattered the Imperium and led to its current fractured state.'
    },
    'psyker': {
      title: 'PSYKERS — BLESSED OR CURSED?',
      content: 'Psykers are humans with psychic abilities drawn from the Warp. While invaluable for communication and combat, they risk daemon possession and corruption. The Imperium requires millions of psykers to fuel the Golden Throne and the Astronomican. Uncontrolled psykers are eliminated. Sanctioned psykers serve the Imperium, walking a razor\'s edge between power and damnation.'
    },
    'holy terra': {
      title: 'HOLY TERRA — THE CRADLE OF HUMANITY',
      content: 'Terra is the birthplace of humanity and seat of the Emperor. Beneath its surface lies countless hive-cities housing billions. Terra is the spiritual and literal center of the Imperium, where the High Lords make their decisions. The planet is defended by layer upon layer of orbital and ground defenses. Losing Terra would mean the end of human civilization.'
    },
    'eldar': {
      title: 'ELDAR — THE DYING RACE',
      content: 'Eldar are an ancient, graceful xenos race on the brink of extinction due to their dark past. While physically fragile compared to humans, they possess superior technology and agility. Eldar society is split between Craftworld Eldar (nomads), Dark Eldar/Drukhari (pleasure-seekers), and Exodites (seers). Some work with the Imperium out of necessity, but they are fundamentally alien.'
    },
    'primarch': {
      title: 'PRIMARCHS — THE DEMIGODS OF WAR',
      content: 'Primarchs are the genetically-engineered super-beings created by the Emperor to lead His Legions of Space Marines. Twenty Primarchs were created, each with unique abilities and vision. Half fell to Chaos during the Horus Heresy, while others were lost or killed. Those still living—like Roboute Guilliman—lead their Chapters into battle. They are amongst the most powerful warriors in the galaxy.'
    },
    'ultramarines': {
      title: 'ULTRAMARINES — THE HAMMER OF THE IMPERIUM',
      content: 'The Ultramarines are the most celebrated Space Marine Chapter, led by their Primarch Roboute Guilliman. Known for rigid discipline and perfect tactical formations, they follow the Codex Astartes to the letter. Chapter Master Marneus Calgar commands their forces with unwavering resolve. They stand as the golden standard by which all other Chapters are measured.'
    },
    'blood angels': {
      title: 'BLOOD ANGELS — BEAUTY AND DARKNESS',
      content: 'The Blood Angels are a noble Chapter whose warriors carry a terrible genetic flaw—the Black Rage and Red Thirst. In battle, they become frenzied killers, channeling primal rage and hunger for blood. Yet they remain paragons of honor and duty. Their distinctive red armor and gothic aesthetics mark them as warriors of beauty and damnation combined.'
    },
    'dark angels': {
      title: 'DARK ANGELS — KEEPERS OF SECRETS',
      content: 'The Dark Angels are shrouded in mystery, guarding ancient secrets of the pre-Heresy Dark Angels Legion. Organized into an inner circle of initiated members, they pursue their own agenda alongside Imperial objectives. Their Inner Circle consists of only the most trusted warriors. They hunt for relics, ancient technology, and hidden knowledge across the galaxy.'
    },
    'bolter': {
      title: 'BOLTER — THE EMPEROR\'S WRATH',
      content: 'The Bolter is the iconic weapon of the Imperium—a semi-automatic firearm that fires mass-reactive, explosive rounds. Effective at range and devastating in close quarters, Bolters are the standard armament for Space Marines. Various configurations exist: Heavy Bolters, Storm Bolters, and the mighty Assault Cannons. No weapon better symbolizes Imperial might.'
    },
    'power armor': {
      title: 'POWER ARMOR — THE EXOSKELETON OF WAR',
      content: 'Power Armor is a combat exoskeleton that enhances strength and durability, essential for Space Marines in battle. Different marks exist—from the ancient Mark VI to the more advanced Mark X. Power Armor can withstand weapons that would destroy conventional armor. A Marine in full Power Armor becomes a walking fortress of the Imperium.'
    },
    'terminator armor': {
      title: 'TERMINATOR ARMOR — THE BULWARK ETERNAL',
      content: 'Terminator Armor is heavy combat armor worn by elite Space Marines in the most brutal engagements. Thicker and heavier than standard Power Armor, it sacrifices mobility for near-impenetrable protection. Equipped with Storm Bolters or other heavy weaponry, Terminators are devastating anti-armor specialists. They are deployed only when victory is absolutely essential.'
    },
    'tau': {
      title: 'TAU — THE ALIENS OFFERING UNITY',
      content: 'The Tau are a technologically advanced xenos species who offer "Greater Good" ideology to those they encounter. While less religious and militaristic than the Imperium, they are skilled fighters and tacticians. Their Rail Guns and Pulse Rifles are devastatingly effective. Some view them as preferable allies to traditional xenos—though the Imperium views all xenos as threats.'
    },
    'grim dark': {
      title: 'GRIM DARKNESS OF THE FAR FUTURE',
      content: 'In the grim darkness of the far future, there is only war. The galaxy is a hostile place where countless civilizations fight for survival and supremacy. The Imperium clings to fading glory, the Orks revel in endless battle, Chaos corrupts all it touches, and countless other threats emerge from the void. Hope is a luxury in an age of eternal conflict.'
    },
    'cadia': {
      title: 'CADIA — THE FORTRESS WORLD',
      content: 'Cadia is a fortress world that stands as the primary defense against Chaos forces pouring from the Eye of Terror. Defended by the elite Cadian Shock Troops and the Cadian Gate orbital defenses, it has held for 10,000 years against impossible odds. The loss of Cadia would be catastrophic, leaving the Imperium open to invasion from the greatest threat.'
    },
    'eye of terror': {
      title: 'EYE OF TERROR — CHAOS ETERNAL',
      content: 'The Eye of Terror is a massive warp rift where reality and chaos blend seamlessly. Home to Chaos Space Marines, Daemons, and corrupted worlds, it serves as an eternal threat to Imperial stability. Warps in space make it difficult to navigate, and those who venture too close risk madness and corruption. It is the very antithesis of Imperial order.'
    },
    'dreadnought': {
      title: 'DREADNOUGHT — THE VENERABLE WALKER',
      content: 'A Dreadnought is a walking armored platform containing the remains of a fallen Space Marine warrior, kept alive in a mechanical sarcophagus. Ancient and incredibly powerful, Dreadnoughts serve as mobile artillery and command centers. Many have seen millennia of combat. They are respected as honored heroes, veterans of countless campaigns.'
    },
    'dark mechanicus': {
      title: 'DARK MECHANICUS — TECH-HERESY',
      content: 'The Dark Mechanicus are techno-heretics who have abandoned the Omnissiah\'s teachings and fallen to Chaos. They experiment with forbidden technology, creating abominations that should never exist. They view the Adeptus Mechanicus as weak and limited in their understanding. Dark Mechanicus artifacts are sought after for their power, regardless of the corruption they carry.'
    },
    'astronomican': {
      title: 'ASTRONOMICAN — THE GOLDEN LIGHT',
      content: 'The Astronomican is a massive psychic beacon projected from the Golden Throne on Terra, guiding Imperial ships through the Warp. Without it, faster-than-light travel would be impossible for the Imperium. Thousands of psykers must sacrifice their lives daily to power it. The Astronomican is the lifeline upon which all of human civilization depends.'
    },
    'golden throne': {
      title: 'GOLDEN THRONE — THE ETERNAL SEAT',
      content: 'The Golden Throne is an ancient construct holding the Emperor\'s failing body in stasis. For 10,000 years it has kept Him alive, though barely. The Throne is powered by thousands of psykers who burn out daily to maintain its function. Should the Golden Throne fail, the Emperor would die, and the Imperium would collapse into chaos and darkness.'
    },
    'guardsman': {
      title: 'GUARDSMAN — THE COMMON SOLDIER',
      content: 'A Guardsman is a common soldier of the Imperial Guard, the Imperium\'s primary fighting force. Armed with a Lasgun and basic armor, they lack the genetic modifications of Space Marines. Yet through discipline, numbers, and unwavering faith, they hold the line against impossible odds. A Guardsman\'s sacrifice is the bedrock of Imperial defense.'
    },
    'commissar': {
      title: 'COMMISSAR — DISCIPLINE AND FAITH',
      content: 'Commissars are political and military officers who maintain discipline and morale within Imperial Guard regiments. Armed with a bolt pistol and typically a chainsword, they execute deserters and inspire troops through leadership. A Commissar\'s presence stiffens resolve and ensures the Emperor\'s will is followed. Their judgments are swift and final.'
    },
    'black library': {
      title: 'BLACK LIBRARY — THE FORBIDDEN ARCHIVES',
      content: 'The Black Library is a hidden archive of forbidden knowledge guarded by the Eldar. It contains dark secrets, forbidden technology, and lore that would damn anyone who reads it. Though guarded fiercely by the Eldar, those rare few who access it gain tremendous power—at terrible cost. Some secrets were meant to remain unlearned.'
    },
    'abaddon': {
      title: 'ABADDON THE DESPOILER — THE ARCH-ENEMY',
      content: 'Abaddon the Despoiler is the supreme leader of Chaos Space Marines and most powerful servant of Chaos. As the Warmaster of Chaos, he leads endless Black Crusades against the Imperium. He was once loyal to the Emperor before being corrupted. Now he is one of the greatest threats to Imperial survival, a demigod of destruction and betrayal.'
    }
  }

  const handleServoSkullSearch = async (query) => {
    if (!query.trim()) return

    setServoSkullLoading(true)

    // Search through local knowledge base first
    const lowerQuery = query.toLowerCase()
    let result = null

    for (const [key, value] of Object.entries(servoSkullKnowledgeBase)) {
      if (lowerQuery.includes(key) || key.includes(lowerQuery)) {
        result = value
        break
      }
    }

    if (!result) {
      // Try partial matching in local database
      for (const [key, value] of Object.entries(servoSkullKnowledgeBase)) {
        if (lowerQuery.split(' ').some(word => key.includes(word)) || 
            value.title.toLowerCase().includes(lowerQuery)) {
          result = value
          break
        }
      }
    }

    // If not found locally, try Wikipedia
    if (!result) {
      try {
        const response = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`,
          { mode: 'cors' }
        )
        
        if (response.ok) {
          const data = await response.json()
          result = {
            title: data.title || query.toUpperCase(),
            content: data.extract || 'No information found.',
            source: 'WIKIPEDIA ARCHIVE'
          }
        }
      } catch (error) {
        // Wikipedia fetch failed, use generic error
        result = null
      }
    }

    // Add to history
    setServoSkullSearchHistory([{ query, result }, ...servoSkullSearchHistory.slice(0, 9)])
    
    if (result) {
      setServoSkullResults(result)
    } else {
      setServoSkullResults({
        title: 'QUERY INCONCLUSIVE',
        content: 'Information not available in Servo Skull database or Wikipedia archives. Try asking about: Warhammer 40k topics (Space Marines, Chaos, Emperor, etc.), History, Science, Geography, Technology, or any other general knowledge topic.'
      })
    }

    setServoSkullLoading(false)
  }

  // Purity Seals - collectible blessings from the Chaplain
  const availablePuritySeals = [
    { id: 'faith', name: 'Seal of Faith', symbol: '✦', description: 'Blessed by the Chaplain for unwavering faith' },
    { id: 'valor', name: 'Seal of Valor', symbol: '⚔', description: 'Granted for courage in the face of the enemy' },
    { id: 'devotion', name: 'Seal of Devotion', symbol: '✞', description: 'Bestowed for steadfast service to the Emperor' },
    { id: 'purity', name: 'Seal of Purity', symbol: '◈', description: 'Awarded for maintaining spiritual purity' },
    { id: 'sacrifice', name: 'Seal of Sacrifice', symbol: '✱', description: 'Earned through selfless sacrifice for the Imperium' },
    { id: 'victory', name: 'Seal of Victory', symbol: '⬢', description: 'Claimed after glorious victory in battle' },
    { id: 'duty', name: 'Seal of Duty', symbol: '◆', description: 'Presented for unwavering adherence to duty' },
    { id: 'mercy', name: 'Seal of Mercy', symbol: '◇', description: 'Given for compassion shown to the weak' },
    { id: 'honor', name: 'Seal of Honor', symbol: '★', description: 'Bestowed for maintaining personal honor' },
    { id: 'wisdom', name: 'Seal of Wisdom', symbol: '◎', description: 'Granted for wise decisions under fire' }
  ]

  const collectPuritySeal = (sealId) => {
    if (!puritySeals.find(s => s.id === sealId)) {
      const seal = availablePuritySeals.find(s => s.id === sealId)
      if (seal) {
        setPuritySeals([...puritySeals, seal])
      }
    }
  }

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
    <div className="min-h-screen bg-[#0a1a0a] text-[#39ff14] font-mono flex flex-col p-4 relative">
      {/* Adeptus Mechanicus Background Symbol */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-50 z-0">
        <AdeptusMechanicusSymbol />
      </div>

      {/* Outer terminal border */}
      <div className="flex-1 border-2 border-[#39ff14] flex flex-col shadow-[0_0_20px_#39ff14] relative z-10">

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
              <NavItem label="Planet Records" onClick={() => setSelectedFile('planet-records')} />
              <NavItem label="Fleet Registry" onClick={() => setSelectedFile('fleet-registry')} />
              <NavItem label="Personnel Files" onClick={() => setSelectedFile('personnel-files')} />
              <NavItem label="STC Database" onClick={() => setSelectedFile('stc-database')} />
            </NavSection>

            <NavSection title="Operations">
              <NavItem label="Threat Assessment" onClick={() => setSelectedFile('threat-assessment')} />
              <NavItem label="Archive Search" onClick={() => setArchiveSearch(true)} />
              <NavItem label="Vox Messages" onClick={() => setSelectedFile('vox-messages')} />
            </NavSection>

            <NavSection title="Command">
              <NavItem label="Sector Overview" onClick={() => setSelectedFile('sector-overview')} />
              <NavItem label="Crusade Orders" onClick={() => setSelectedFile('crusade-orders')} />
              <NavItem label="Supply Routes" onClick={() => setSelectedFile('supply-routes')} />
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
              <TabButton label="Overview" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
              <TabButton label="Armor Condition" active={activeTab === 'armor'} onClick={() => setActiveTab('armor')} />
              <TabButton label="Emperor Status" active={activeTab === 'emperor'} onClick={() => setActiveTab('emperor')} />
              <TabButton label="Codex Astartes" active={activeTab === 'codex'} onClick={() => setActiveTab('codex')} />
              <TabButton label="Mission Plans" active={activeTab === 'missions'} onClick={() => setActiveTab('missions')} />
              <TabButton label="Command Support" active={activeTab === 'support'} onClick={() => setActiveTab('support')} />
              <TabButton label="Servo Skull" active={activeTab === 'servo-skull'} onClick={() => setActiveTab('servo-skull')} />
              <TabButton label="Chaplain" active={activeTab === 'chaplain'} onClick={() => setActiveTab('chaplain')} />
            </div>

            {/* Data panels */}
            {activeTab === 'overview' && (
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

              {/* Star Map panel */}
              <div className="lg:col-span-1">
                <DataPanel title="▸ Star Map — Armageddon Sub-Sector">
                  <StarMap onSelectPlanet={setSelectedPlanet} />
                </DataPanel>
              </div>

            </div>
            )}

            {/* Armor Condition Tab */}
            {activeTab === 'armor' && (
            <div className="flex-1 p-3 md:p-6 overflow-auto">
              <ArmorConditionDiagram />
            </div>
            )}

            {/* Emperor Status Tab */}
            {activeTab === 'emperor' && (
            <div className="flex-1 p-3 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6 overflow-auto">

              {/* Emperor Watch Cam - Full Width */}
              <div className="lg:col-span-2">
                <div className="border border-[#39ff14] bg-[#0d220d] p-4">
                  <div className="text-sm tracking-widest uppercase terminal-glow mb-3">
                    ▸ EMPEROR WATCH CAM — LIVE FEED
                  </div>
                  <div className="relative w-full" style={{ height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0a1a0a', borderRadius: '4px' }}>
                    <svg viewBox="0 0 400 450" preserveAspectRatio="xMidYMid meet" className="animate-cam-glitch" style={{ height: '100%', width: 'auto' }}>
                      {/* Glow effects */}
                      <defs>
                        <filter id="emperorGlow" x="-50%" y="-50%" width="200%" height="200%">
                          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                        <filter id="psychicAura">
                          <feGaussianBlur stdDeviation="2"/>
                        </filter>
                        <radialGradient id="throneRadiance" cx="50%" cy="50%">
                          <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 0.6 }} />
                          <stop offset="100%" style={{ stopColor: '#39ff14', stopOpacity: 0.2 }} />
                        </radialGradient>
                      </defs>
                      
                      {/* Far psychic aura waves */}
                      <circle cx="200" cy="200" r="140" fill="none" stroke="#39ff14" strokeWidth="0.5" opacity="0.15" />
                      <circle cx="200" cy="200" r="100" fill="none" stroke="#39ff14" strokeWidth="1" opacity="0.25" />
                      <circle cx="200" cy="200" r="70" fill="none" stroke="#39ff14" strokeWidth="1.5" opacity="0.35" />
                      
                      {/* Elaborate Golden Throne */}
                      {/* Throne back rest */}
                      <path d="M 140 240 L 100 180 L 110 170 L 150 230 Z" fill="#DAA520" opacity="0.7" stroke="#39ff14" strokeWidth="2" />
                      <path d="M 260 240 L 300 180 L 290 170 L 250 230 Z" fill="#DAA520" opacity="0.7" stroke="#39ff14" strokeWidth="2" />
                      
                      {/* Throne seat */}
                      <rect x="130" y="240" width="140" height="30" rx="5" fill="#FFD700" opacity="0.6" stroke="#39ff14" strokeWidth="2" />
                      <path d="M 130 270 L 120 320 L 280 320 L 290 270" fill="#DAA520" opacity="0.5" stroke="#39ff14" strokeWidth="2" />
                      
                      {/* Throne armrests with skulls */}
                      <rect x="115" y="250" width="15" height="60" fill="#DAA520" opacity="0.6" stroke="#39ff14" strokeWidth="1.5" />
                      <rect x="270" y="250" width="15" height="60" fill="#DAA520" opacity="0.6" stroke="#39ff14" strokeWidth="1.5" />
                      
                      {/* Skulls on armrests */}
                      <circle cx="122" cy="260" r="5" fill="#E6E6FA" opacity="0.7" stroke="#39ff14" strokeWidth="1" />
                      <circle cx="278" cy="260" r="5" fill="#E6E6FA" opacity="0.7" stroke="#39ff14" strokeWidth="1" />
                      
                      {/* Throne decoration - ornate patterns */}
                      <rect x="140" y="245" width="120" height="5" fill="none" stroke="#39ff14" strokeWidth="1" opacity="0.6" />
                      <line x1="150" y1="250" x2="150" y2="268" stroke="#39ff14" strokeWidth="0.5" opacity="0.5" />
                      <line x1="170" y1="250" x2="170" y2="268" stroke="#39ff14" strokeWidth="0.5" opacity="0.5" />
                      <line x1="190" y1="250" x2="190" y2="268" stroke="#39ff14" strokeWidth="0.5" opacity="0.5" />
                      <line x1="210" y1="250" x2="210" y2="268" stroke="#39ff14" strokeWidth="0.5" opacity="0.5" />
                      <line x1="230" y1="250" x2="230" y2="268" stroke="#39ff14" strokeWidth="0.5" opacity="0.5" />
                      <line x1="250" y1="250" x2="250" y2="268" stroke="#39ff14" strokeWidth="0.5" opacity="0.5" />
                      
                      {/* Elaborate Crown with spikes */}
                      <path d="M 200 60 L 195 40 L 200 30 L 205 40 Z" fill="#FFD700" opacity="0.8" stroke="#39ff14" strokeWidth="1.5" />
                      <path d="M 170 75 L 165 50 L 175 45 Z" fill="#FFD700" opacity="0.6" stroke="#39ff14" strokeWidth="1" />
                      <path d="M 230 75 L 235 50 L 225 45 Z" fill="#FFD700" opacity="0.6" stroke="#39ff14" strokeWidth="1" />
                      
                      {/* Crown band */}
                      <ellipse cx="200" cy="90" rx="45" ry="20" fill="none" stroke="#39ff14" strokeWidth="2.5" opacity="0.9" />
                      <ellipse cx="200" cy="90" rx="45" ry="20" fill="#FFD700" opacity="0.1" />
                      
                      {/* The Emperor's form - skeletal/corpse appearance */}
                      {/* Head - skull-like, more dead appearance */}
                      <circle cx="200" cy="80" r="20" fill="#8B8680" opacity="0.9" stroke="#39ff14" strokeWidth="2" filter="url(#emperorGlow)" />
                      
                      {/* Skull jaw structure */}
                      <rect x="185" y="92" width="30" height="8" fill="#6B6660" opacity="0.8" stroke="#39ff14" strokeWidth="1" />
                      
                      {/* Cracks and decay on skull */}
                      <line x1="190" y1="65" x2="195" y2="80" stroke="#39ff14" strokeWidth="0.5" opacity="0.6" />
                      <line x1="210" y1="65" x2="205" y2="80" stroke="#39ff14" strokeWidth="0.5" opacity="0.6" />
                      <line x1="195" y1="60" x2="200" y2="75" stroke="#39ff14" strokeWidth="0.3" opacity="0.5" />
                      <line x1="205" y1="60" x2="200" y2="75" stroke="#39ff14" strokeWidth="0.3" opacity="0.5" />
                      
                      {/* Deep hollow eye sockets - empty void */}
                      <circle cx="193" cy="75" r="4" fill="#000000" opacity="0.95" stroke="#2B2B2B" strokeWidth="1" />
                      <circle cx="207" cy="75" r="4" fill="#000000" opacity="0.95" stroke="#2B2B2B" strokeWidth="1" />
                      
                      {/* Faint psychic eye glow deep in sockets */}
                      <circle cx="193" cy="75" r="1.5" fill="#39ff14" opacity="0.7" />
                      <circle cx="207" cy="75" r="1.5" fill="#39ff14" opacity="0.7" />
                      
                      {/* Nasal cavity - skeletal death */}
                      <path d="M 197 80 L 200 85 L 203 80" fill="none" stroke="#1a1a1a" strokeWidth="1" opacity="0.8" />
                      
                      {/* Desiccated robes - tattered and rotting */}
                      <path d="M 170 100 Q 160 140 170 180 L 200 220 L 230 180 Q 240 140 230 100" fill="#4A3F1A" opacity="0.6" stroke="#39ff14" strokeWidth="2" />
                      
                      {/* Torn robe sections showing skeletal form */}
                      <line x1="175" y1="110" x2="175" y2="170" stroke="#39ff14" strokeWidth="0.8" opacity="0.6" />
                      <line x1="225" y1="110" x2="225" y2="170" stroke="#39ff14" strokeWidth="0.8" opacity="0.6" />
                      <path d="M 180 130 Q 200 140 220 130" fill="none" stroke="#39ff14" strokeWidth="0.8" opacity="0.6" />
                      
                      {/* Skeletal ribcage visible through robes */}
                      <path d="M 190 115 Q 200 125 210 115" fill="none" stroke="#8B8680" strokeWidth="1" opacity="0.7" />
                      <path d="M 188 130 Q 200 140 212 130" fill="none" stroke="#8B8680" strokeWidth="1" opacity="0.7" />
                      <path d="M 190 145 Q 200 155 210 145" fill="none" stroke="#8B8680" strokeWidth="1" opacity="0.7" />
                      <line x1="200" y1="115" x2="200" y2="155" stroke="#8B8680" strokeWidth="0.8" opacity="0.6" />
                      
                      {/* Blackened, corrupted Aquila - Imperial Eagle on chest */}
                      <g filter="url(#emperorGlow)">
                        <circle cx="200" cy="140" r="15" fill="none" stroke="#39ff14" strokeWidth="1.5" opacity="0.6" />
                        <path d="M 185 130 L 200 145 L 215 130" fill="none" stroke="#1a1a1a" strokeWidth="1.5" opacity="0.8" />
                        <path d="M 185 150 L 200 135 L 215 150" fill="none" stroke="#1a1a1a" strokeWidth="1.5" opacity="0.8" />
                        {/* Decay marks on Aquila */}
                        <circle cx="200" cy="140" r="12" fill="none" stroke="#39ff14" strokeWidth="0.5" opacity="0.4" strokeDasharray="2,2" />
                      </g>
                      
                      {/* Psychic aura - sickly and unstable */}
                      <circle cx="200" cy="130" r="50" fill="none" stroke="#39ff14" strokeWidth="2" opacity="0.5" filter="url(#psychicAura)" />
                      <circle cx="200" cy="130" r="60" fill="none" stroke="#2D5016" strokeWidth="1" opacity="0.4" filter="url(#psychicAura)" />
                      
                      {/* Corrupted/weakening psychic rays */}
                      <line x1="200" y1="20" x2="200" y2="10" stroke="#39ff14" strokeWidth="1.5" opacity="0.6" strokeDasharray="2,2" />
                      <line x1="250" y1="45" x2="265" y2="35" stroke="#39ff14" strokeWidth="1" opacity="0.5" strokeDasharray="2,2" />
                      <line x1="150" y1="45" x2="135" y2="35" stroke="#39ff14" strokeWidth="1" opacity="0.5" strokeDasharray="2,2" />
                      <line x1="270" y1="100" x2="290" y2="100" stroke="#39ff14" strokeWidth="1" opacity="0.4" strokeDasharray="3,3" />
                      <line x1="130" y1="100" x2="110" y2="100" stroke="#39ff14" strokeWidth="1" opacity="0.4" strokeDasharray="3,3" />
                      
                      {/* Dimmer, sickly glow from the Emperor */}
                      <circle cx="200" cy="120" r="55" fill="url(#throneRadiance)" opacity="0.2" />
                      
                      {/* Status text */}
                      <text x="200" y="380" textAnchor="middle" fontSize="11" fill="#39ff14" fontWeight="bold" opacity="0.9" fontFamily="monospace">
                        THE EMPEROR ETERNAL
                      </text>
                      <text x="200" y="400" textAnchor="middle" fontSize="9" fill="#facc15" opacity="0.8" fontFamily="monospace">
                        PSYCHIC BEACON: ACTIVE
                      </text>
                      <text x="200" y="418" textAnchor="middle" fontSize="8" fill="#166534" opacity="0.7" fontFamily="monospace">
                        SIGNAL STRENGTH: IMMEASURABLE
                      </text>
                    </svg>
                  </div>
                  <div className="mt-3 text-xs text-center text-[#166534]">
                    LIVE TRANSMISSION FROM IMPERIAL PALACE — TERRA
                  </div>
                </div>
              </div>

              <DataPanel title="▸ THE EMPEROR OF MANKIND — GOLDEN THRONE DIAGNOSTICS">
                <DataRow label="Current Status" value="ENTOMBED / IMMORTAL" />
                <DataRow label="Location" value="The Golden Throne, Terra" />
                <DataRow label="Age" value="10,000+ Years" />
                <DataRow label="Faction" value="Imperium of Mankind" />
                <DataRow label="Psychic Power" value="IMMEASURABLE" alert />
                <DataRow label="Ascension Status" value="DIVINE EMPEROR" />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  HOLY TERRA SPEAKS — THE EMPEROR PROTECTS
                </div>
              </DataPanel>

              <DataPanel title="▸ THRONE STATUS — CUSTODIAN WATCH">
                <DataRow label="Golden Throne" value="OPERATIONAL" />
                <DataRow label="Life Support" value="CRITICAL - PSYCHIC ANCHOR" />
                <DataRow label="Anathema Power" value="ACTIVE — CHAOS REPELLED" />
                <DataRow label="Adeptus Custodes Guard" value="10,000 ACTIVE" />
                <DataRow label="Astropath Network" value="LINKED — MAINTAINING BEACON" />
                <DataRow label="Sacrificial Psykers" value="1,000 DAILY REQUIRED" />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  THE LIGHT OF THE THRONE GUIDES ALL IMPERIAL VESSELS
                </div>
              </DataPanel>

              <DataPanel title="▸ IMPERIAL TRUTH — DOGMA SYSTEMS">
                <DataRow label="Faith Manifestation" value="98.7% ACROSS IMPERIUM" />
                <DataRow label="Heresy Detection" value="ACTIVE ON ALL WORLDS" />
                <DataRow label="Inquisitorial Authority" value="MAXIMUM" />
                <DataRow label="Warp Storms" value="CONTAINED BY DIVINE WILL" />
                <DataRow label="Xenos Threat Level" value="CONSTANT VIGILANCE REQUIRED" />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  IN THE GRIM DARKNESS OF THE FAR FUTURE, THERE IS ONLY WAR
                </div>
              </DataPanel>

              <DataPanel title="▸ IMPERIAL BLESSING — PROTECTIVE AURA">
                <DataRow label="Emperor's Light" value="SHINING ACROSS STARS" />
                <DataRow label="Corruption Resistance" value="UNMATCHED" />
                <DataRow label="Daemonic Ward" value="ABSOLUTE" />
                <DataRow label="Loyal Followers" value="BILLIONS UPON BILLIONS" />
                <DataRow label="Imperial Will" value="UNBREAKABLE" />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  FOR THE EMPEROR AND THE IMPERIUM — VICTORY OR DEATH
                </div>
              </DataPanel>

            </div>
            )}

            {/* Codex Astartes Tab */}
            {activeTab === 'codex' && (
            <div className="flex-1 p-3 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6 overflow-auto">

              <DataPanel title="▸ CODEX ASTARTES — WARRIOR COMPENDIUM">
                <DataRow label="Classification" value="RESTRICTED — INQUISITORIAL" />
                <DataRow label="Authority" value="HIGH LORDS OF TERRA" />
                <DataRow label="Purpose" value="SPACE MARINE DOCTRINAL AUTHORITY" />
                <DataRow label="Active Chapters" value="1,000+" />
                <DataRow label="Total Strength" value="184,000+ BATTLE BROTHERS" />
                <DataRow label="Primary Role" value="HEAVY ASSAULT / VANGUARD" />
                <DataRow label="Founding" value="M30 — AGE OF APOSTASY" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  THE GENETICALLY-ENGINEERED SONS OF THE EMPEROR
                </div>
              </DataPanel>

              <DataPanel title="▸ CHAPTER ORGANIZATION">
                <DataRow label="Chapter Command" value="1 CHAPTER MASTER" />
                <DataRow label="Captains" value="10 BATTLE COMPANY COMMANDERS" />
                <DataRow label="Company Strength" value="~100 MARINES PER COMPANY" />
                <DataRow label="Squads" value="10 PER COMPANY" />
                <DataRow label="Squad Size" value="5-10 BATTLE BROTHERS" />
                <DataRow label="Apothecaries" value="ATTACHED FOR GENE-SEED RECOVERY" />
                <DataRow label="Techmarines" value="BOUND TO ADEPTUS MECHANICUS" />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  ORGANIZATION BASED ON CORAX PROTOCOLS
                </div>
              </DataPanel>

              <DataPanel title="▸ COMBAT DOCTRINE">
                <DataRow label="Primary Tactics" value="COMBINED ARMS ASSAULT" />
                <DataRow label="Infantry Squads" value="DEVASTATOR / TACTICAL" />
                <DataRow label="Vehicle Support" value="PREDATOR / VINDICATOR" />
                <DataRow label="Air Support" value="THUNDERHAWK GUNSHIPS" />
                <DataRow label="Scout Operations" value="RECONNAISSANCE IN FORCE" />
                <DataRow label="Fortress Doctrine" value="DEFENSIVE STRONGPOINT" />
                <DataRow label="Effectiveness Rating" value="SUPREME — GALAXY-CLASS" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  ONE SPACE MARINE EQUALS TEN IMPERIAL GUARD
                </div>
              </DataPanel>

              <DataPanel title="▸ ENHANCEMENT SYSTEMS">
                <DataRow label="Geneseed" value="19 IMPLANTS — M30 ORIGINATION" />
                <DataRow label="Power Armor" value="CERAMITE PLATE — REACTION ENHANCED" />
                <DataRow label="Bolter Weapon" value=".998 CALIBER — MASS REACTIVE" />
                <DataRow label="Enhancement Time" value="10-15 YEARS — FULL AUGMENTATION" />
                <DataRow label="Neural Link" value="ENHANCED NEURAL ARCHITECTURE" />
                <DataRow label="Strength Multiplier" value="4-5x NORMAL HUMAN" />
                <DataRow label="Operational Lifespan" value="200+ YEARS" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  THE EMPEROR'S FINEST INSTRUMENTS OF WAR
                </div>
              </DataPanel>

              <DataPanel title="▸ FIRST FOUNDING CHAPTERS">
                <DataRow label="Ultramarines" value="CHAPTER MASTER — PRIMARY" />
                <DataRow label="Blood Angels" value="DEATH COMPANY ACTIVE" />
                <DataRow label="Dark Angels" value="INNER CIRCLE KNIGHTS" />
                <DataRow label="Space Wolves" value="FENRISIAN WARRIORS" />
                <DataRow label="Imperial Fists" value="FORTRESS MASTERS" />
                <DataRow label="Iron Hands" value="TECHNICAL SUPERIORITY" />
                <DataRow label="Other Chapters" value="994+ SUCCESSOR CHAPTERS" />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  LEGENDS AMONG THE STARS
                </div>
              </DataPanel>

              <DataPanel title="▸ ELITE RANKS & HONORS">
                <DataRow label="Deathwing Knights" value="MASTER OF DEATHWING" />
                <DataRow label="Sternguard Veteran" value="ELITE SQUAD RANKING" />
                <DataRow label="Vanguard Veteran" value="MELEE SPECIALIST" />
                <DataRow label="Terminator Assault" value="HIGHEST ARMOR RATING" />
                <DataRow label="Dreadnought" value="VENERABLE ENSHRINEMENT" />
                <DataRow label="Chapter Champion" value="DEADLIEST COMBATANT" />
                <DataRow label="Reclusiam" value="SPIRITUAL AUTHORITY" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  ADVANCEMENT BY BATTLEFIELD EXCELLENCE
                </div>
              </DataPanel>

              <DataPanel title="▸ DEPLOYMENT OPERATIONS">
                <DataRow label="Crusade Fleet" value="MOBILE STRIKE FORCE" />
                <DataRow label="Garrison Force" value="PLANETARY DEFENSE" />
                <DataRow label="Rapid Response" value="RAPID STRIKE TEAMS" />
                <DataRow label="Deep Strike" value="ORBITAL INSERTION" />
                <DataRow label="Void Warfare" value="BOARDING SPECIALIST" />
                <DataRow label="Urban Assault" value="CLOSE QUARTER EXPERT" />
                <DataRow label="Recruitment" value="PERPETUAL — ALL SECTORS" />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  DEPLOYMENT: GALAXY-WIDE ETERNAL VIGILANCE
                </div>
              </DataPanel>

              <DataPanel title="▸ WEAPON SYSTEMS & ARMAMENTS">
                <DataRow label="Bolter Rifle" value="PRIMARY WEAPON — MASS REACTIVE" />
                <DataRow label="Plasma Gun" value="SUPER-HEATED ENERGY PROJECTION" />
                <DataRow label="Melta Gun" value="ARMOR PENETRATION — HEAT LANCE" />
                <DataRow label="Flamer" value="AREA DENIAL / CROWD CONTROL" />
                <DataRow label="Lascannon" value="ANTI-VEHICLE SPECIALIST" />
                <DataRow label="Missile Launcher" value="MULTI-TARGETING PLATFORM" />
                <DataRow label="Combat Blade" value="MELEE SPECIALIST WEAPON" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  ARMAMENTS CLASSIFIED BY MARS PRIESTHOOD
                </div>
              </DataPanel>

              <DataPanel title="▸ SUPPORT SPECIALISTS">
                <DataRow label="Chaplain" value="SPIRITUAL LEADERSHIP — MORALE" />
                <DataRow label="Librarian" value="PSYCHIC POWERS — WARP MASTERY" />
                <DataRow label="Apothecary" value="MEDICAL / GENE-SEED RECOVERY" />
                <DataRow label="Techmarine" value="VEHICLE MAINTENANCE SPECIALIST" />
                <DataRow label="Ancient/Standard Bearer" value="REGIMENTAL INSPIRATION" />
                <DataRow label="Company Champion" value="DUELIST / HONOR DEFENDER" />
                <DataRow label="Relic Keeper" value="ARTIFACT CUSTODIAN" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  SPECIALISTS ATTACHED TO EVERY CHAPTER
                </div>
              </DataPanel>

              <DataPanel title="▸ CHAPTER TACTICS & STRATAGEMS">
                <DataRow label="Ultramarines" value="TACTICAL DOCTRINE — VERSATILITY" />
                <DataRow label="Blood Angels" value="AGGRESSIVE ASSAULT FORMATIONS" />
                <DataRow label="Dark Angels" value="DEATHWING KNIGHTS ELITE" />
                <DataRow label="Space Wolves" value="SAVAGE MELEE COMBAT" />
                <DataRow label="Imperial Fists" value="SIEGE WARFARE MASTERY" />
                <DataRow label="Iron Hands" value="VEHICLE / DREADNOUGHT FOCUS" />
                <DataRow label="White Scars" value="FAST ATTACK SPECIALIST" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  UNIQUE CHAPTER SPECIALIZATIONS
                </div>
              </DataPanel>

              <DataPanel title="▸ VEHICLE ASSETS">
                <DataRow label="Predator Tank" value="MAIN BATTLE PLATFORM" />
                <DataRow label="Vindicator" value="SIEGE WARFARE VEHICLE" />
                <DataRow label="Rhino Transport" value="RAPID DEPLOYMENT PLATFORM" />
                <DataRow label="Razorback" value="FIRE SUPPORT TRANSPORT" />
                <DataRow label="Dreadnought" value="VENERABLE WALKER / TANK" />
                <DataRow label="Whirlwind" value="ARTILLERY SUPPORT" />
                <DataRow label="Thunderhawk" value="ORBITAL ASSAULT GUNSHIP" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  HEAVY ARMOR SUPPORT BY ADEPTUS MECHANICUS
                </div>
              </DataPanel>

              <DataPanel title="▸ RECRUITMENT & INDOCTRINATION">
                <DataRow label="Recruitment World" value="CHAPTER-SPECIFIC HOMEWORLD" />
                <DataRow label="Candidate Age" value="10-16 YEARS OLD" />
                <DataRow label="Initial Training" value="3 YEARS BRUTAL CONDITIONING" />
                <DataRow label="Gene-Seed Implant" value="19 IMPLANTS OVER 10 YEARS" />
                <DataRow label="Indoctrination" value="PSYCHO-CONDITIONING — DOCTRINE" />
                <DataRow label="Trial of Initiation" value="LETHAL — 50% CASUALTY RATE" />
                <DataRow label="Full Marine Status" value="10-15 YEARS TOTAL" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  FORGED IN TRIALS BEYOND HUMAN ENDURANCE
                </div>
              </DataPanel>

              <DataPanel title="▸ HERESY & FALLEN CHAPTERS">
                <DataRow label="Chaos Space Marines" value="HERETICAL CORRUPTION — WARP" />
                <DataRow label="Traitor Legions" value="HORUS HERESY CASUALTIES" />
                <DataRow label="Black Legion" value="ABADDON COMMAND — STILL ACTIVE" />
                <DataRow label="Word Bearers" value="CHAOS WORSHIP PROPONENTS" />
                <DataRow label="Iron Warriors" value="SIEGE SPECIALISTS CORRUPTED" />
                <DataRow label="Night Lords" value="TERROR TACTICS DEPLOYED" />
                <DataRow label="Detection Protocol" value="EXTREMIS — IMMEDIATE PURGE" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  CORRUPTION MEANS DAMNATION — MERCY IS EXTINCTION
                </div>
              </DataPanel>

              <DataPanel title="▸ LEGENDARY CHAMPIONS & HEROES">
                <DataRow label="Roboute Guilliman" value="PRIMARCH — ULTRAMARINES LORD" />
                <DataRow label="Marneus Calgar" value="CURRENT CHAPTER MASTER (UM)" />
                <DataRow label="Dante" value="CHAPTER MASTER — BLOOD ANGELS" />
                <DataRow label="Azrael" value="SUPREME GRAND MASTER — DARK ANGELS" />
                <DataRow label="Logan Grimnar" value="GREAT WOLF — SPACE WOLVES" />
                <DataRow label="Lysander" value="IMPERIAL FISTS CHAMPION" />
                <DataRow label="Living Legends" value="HEROES OF 10,000 WARS" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  THEIR DEEDS ECHO ACROSS MILLENNIA
                </div>
              </DataPanel>

              <DataPanel title="▸ RELIC WEAPONS & ARTIFACTS">
                <DataRow label="Force Weapons" value="PSYCHIC ENERGY BLADES" />
                <DataRow label="Relic Blades" value="ANCIENT MASTER-CRAFTED STEEL" />
                <DataRow label="Storm Shields" value="VOID-SHIELDED PROTECTION" />
                <DataRow label="Jump Packs" value="FUSION-POWERED FLIGHT SYSTEMS" />
                <DataRow label="Invulnerable Armor" value="ANCIENT ARCHEOTECH" />
                <DataRow label="Artificer Armor" value="HAND-CRAFTED CERAMITE PLATE" />
                <DataRow label="Reliquaries" value="HOLY SHRINES / SACRED TOMBS" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  PRESERVED FROM THE DARK AGE OF TECHNOLOGY
                </div>
              </DataPanel>

              <DataPanel title="▸ BATTLE HONORS & VICTORIES">
                <DataRow label="Cadia Defense" value="IMPERIAL VICTORY — 10K YEARS" />
                <DataRow label="Armageddon Campaigns" value="MULTIPLE VICTORIES vs ORKS" />
                <DataRow label="Damocles Gulf Crusade" value="TAU EMPIRE HALTED" />
                <DataRow label="Tyranid Purges" value="ONGOING — CONSTANT THREAT" />
                <DataRow label="Eldar Conflicts" value="XENOS ANNIHILATION" />
                <DataRow label="Necron WARS" value="ANCIENT MACHINE WARRIORS" />
                <DataRow label="Fallen Angel Hunt" value="DARK SECRETS PURSUED" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  THE EMPEROR'S FURY — VICTORY OR HONORABLE DEATH
                </div>
              </DataPanel>

              <DataPanel title="▸ LIBRARIAN PSYCHIC POWERS">
                <DataRow label="Null Zone" value="PSYCHIC SUPPRESSION FIELD" />
                <DataRow label="Might of Ancients" value="STRENGTH ENHANCEMENT" />
                <DataRow label="Fury of the Ancients" value="PSYCHIC STORM PROJECTION" />
                <DataRow label="Veil of Time" value="PROTECTIVE SHROUD" />
                <DataRow label="Gate of Infinity" value="TELEPORTATION GATEWAY" />
                <DataRow label="Force Aegis" value="PROTECTIVE FORCE FIELD" />
                <DataRow label="Warp Charge Cost" value="IMMENSE — REQUIRES MASTERY" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  HARNESSED BY SANCTIONED PSYKERS ONLY
                </div>
              </DataPanel>

              <DataPanel title="▸ POWER ARMOR MARKS — EVOLUTION">
                <DataRow label="Mark I Corvus" value="FIRST GENERATION — RARE" />
                <DataRow label="Mark II Crusade" value="HORUS HERESY ERA" />
                <DataRow label="Mark III Iron" value="SIEGE WARFARE VARIANT" />
                <DataRow label="Mark IV Maximus" value="MOST ADVANCED — M30" />
                <DataRow label="Mark V Heresy" value="EMERGENCY PRODUCTION" />
                <DataRow label="Mark VI Corvus" value="SPEED — REDUCED ARMOR" />
                <DataRow label="Mark X Tacticus" value="CURRENT STANDARD" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  10,000 YEARS OF ARMOR EVOLUTION
                </div>
              </DataPanel>

              <DataPanel title="▸ GENETIC LEGACIES & BLESSINGS">
                <DataRow label="Iron Halo Gene" value="ENHANCED DURABILITY" />
                <DataRow label="Accelerated Healing" value="RAPID WOUND CLOSURE" />
                <DataRow label="Hypnotic Inducement" value="PSYCHOLOGICAL CONDITIONING" />
                <DataRow label="Progenoid Glands" value="GENE-SEED PRODUCTION" />
                <DataRow label="Betcher's Gland" value="ACID PROJECTILE" />
                <DataRow label="Melanchromic Organ" value="SENSORY ENHANCEMENT" />
                <DataRow label="Magnificat" value="EMOTIONAL BATTLE FURY" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  BIOLOGICAL PERFECTION ENGINEERED BY THE EMPEROR
                </div>
              </DataPanel>

              <DataPanel title="▸ FORTRESS-MONASTERIES & CHAPTER KEEPS">
                <DataRow label="Fundaments" value="ORBITS CHAPTER HOMEWORLDS" />
                <DataRow label="Function" value="STRONGHOLD / SHRINE / FORTRESS" />
                <DataRow label="Armories" value="ANCIENT WEAPONS VAULT" />
                <DataRow label="Training Grounds" value="INITIATION CHALLENGE GAUNTLETS" />
                <DataRow label="Chaplaincy" value="SPIRITUAL GUIDANCE CHAMBERS" />
                <DataRow label="Librarium" value="FORBIDDEN KNOWLEDGE ARCHIVES" />
                <DataRow label="Gene-Seed Vault" value="SACRED PROGENOID STORAGE" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  MONUMENTS TO MARTIAL GLORY AND FAITH
                </div>
              </DataPanel>

              <DataPanel title="▸ BATTLE-BROTHER SPECIALIZATIONS">
                <DataRow label="Assault Marine" value="CLOSE COMBAT EXPERT" />
                <DataRow label="Tactical Marine" value="VERSATILE ALL-ROUNDER" />
                <DataRow label="Devastator" value="HEAVY WEAPON SPECIALIST" />
                <DataRow label="Scout" value="RECONNAISSANCE / SNIPER" />
                <DataRow label="Biker" value="MOUNTED FAST STRIKE" />
                <DataRow label="Jump Trooper" value="AERIAL ASSAULT" />
                <DataRow label="Terminator" value="ELITE ARMOR VETERAN" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  SPECIALIZATION DETERMINES BATTLEFIELD ROLE
                </div>
              </DataPanel>

              <DataPanel title="▸ SCOUT MARINE TRAINING">
                <DataRow label="Age" value="YOUNGEST BATTLE BROTHERS" />
                <DataRow label="Role" value="RECONNAISSANCE / FORWARD OBSERVER" />
                <DataRow label="Weapons" value="BOLTER CARBINE / SNIPER RIFLE" />
                <DataRow label="Speed Focus" value="RAPID INFILTRATION" />
                <DataRow label="Initiation Path" value="SCOUT COMPANY GRADUATED" />
                <DataRow label="Armor" value="LIGHTER CARAPACE PLATE" />
                <DataRow label="Promotion Path" value="FULL MARINE AFTER 5 YEARS" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  ENTRY RANK FOR NEW INITIATES
                </div>
              </DataPanel>

              <DataPanel title="▸ TERMINATOR ELITE UNITS">
                <DataRow label="Armor Type" value="CATAPHRACTII — MAXIMUM PROTECTION" />
                <DataRow label="Teleportation" value="DEEP STRIKE CAPABLE" />
                <DataRow label="Weapons" value="STORM BOLTER + POWER WEAPON" />
                <DataRow label="Storm Shield" value="VOID-ENERGY PROTECTION" />
                <DataRow label="Heavy Flamer" value="AREA DENIAL WARFARE" />
                <DataRow label="Cyclone Launcher" value="GUIDED MISSILE SYSTEM" />
                <DataRow label="Assault Cannon" value="RAPID FIRE DEVASTATION" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  SLOW BUT NEARLY UNSTOPPABLE FORCE
                </div>
              </DataPanel>

              <DataPanel title="▸ BIKER COMPANY TACTICS">
                <DataRow label="Speed" value="RAPID DEPLOYMENT PLATFORM" />
                <DataRow label="Bike Type" value="HOVER-CAPABLE ENGINES" />
                <DataRow label="Formation" value="HIT-AND-RUN TACTICS" />
                <DataRow label="Weapons" value="TWIN-LINKED BOLTERS" />
                <DataRow label="Relic Blade Variants" value="MOUNTED MELEE" />
                <DataRow label="Scout Bikes" value="LIGHTER FASTER VARIANT" />
                <DataRow label="Effectiveness" value="HARASSMENT SPECIALIST" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  SWIFT STRIKE — FASTER THAN ARMOR
                </div>
              </DataPanel>

              <DataPanel title="▸ PRIMARCH LEGACIES">
                <DataRow label="Roboute Guilliman" value="LOGIC / MILITARY GENIUS" />
                <DataRow label="Corax" value="STEALTH / INFILTRATION MASTERY" />
                <DataRow label="Leman Russ" value="SAVAGE FURY / MELEE EXPERT" />
                <DataRow label="Perturabo" value="SIEGE / ENGINEERING PROWESS" />
                <DataRow label="Jaghatai Khan" value="SPEED / MOBILITY DOCTRINE" />
                <DataRow label="Curze/Night Haunter" value="TERROR / PSYCHOLOGICAL" />
                <DataRow label="Legacy" value="STILL DEFINES MARINE DOCTRINE" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  GENETIC MEMORY SHAPES ALL CHAPTERS
                </div>
              </DataPanel>

              <DataPanel title="▸ XENOS ENEMIES & THREATS">
                <DataRow label="Tyranids" value="HIVE FLEETS — ANNIHILATION" />
                <DataRow label="Necrons" value="ANCIENT MACHINE WARRIORS" />
                <DataRow label="Orks" value="BRUTAL GREENSKINS" />
                <DataRow label="Eldar" value="ELDER RACE DEGENERATES" />
                <DataRow label="Dark Eldar" value="DAEMON-WORSHIPPING PIRATES" />
                <DataRow label="Tau Empire" value="MIND-CONTROLLED ALIENS" />
                <DataRow label="Extinction Threat" value="CONSTANT — ETERNAL VIGILANCE" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  GALAXY CRAWLS WITH ABOMINATIONS
                </div>
              </DataPanel>

              <DataPanel title="▸ CHAPTER SERFS & SUPPORT STAFF">
                <DataRow label="Serfs" value="INDENTURED SUPPORT PERSONNEL" />
                <DataRow label="Artificers" value="WEAPONS / ARMOR CRAFTING" />
                <DataRow label="Scribes" value="RECORD KEEPERS / LIBRARIANS" />
                <DataRow label="Medicae" value="NON-ENHANCED SUPPORT DOCTORS" />
                <DataRow label="Servitors" value="LOBOTOMIZED SERVANTS" />
                <DataRow label="Chapter Bond" value="LIFETIME SERVITUDE" />
                <DataRow label="Hierarchies" value="RIGID CHAIN OF COMMAND" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  HONORED TO SERVE THE CHAPTER
                </div>
              </DataPanel>

              <DataPanel title="▸ GENETIC FLAWS & CURSES">
                <DataRow label="Red Thirst" value="BLOOD ANGELS — VAMPIRIC URGE" />
                <DataRow label="Black Rage" value="DEATH COMPANY CURSE" />
                <DataRow label="Wolf Spirit" value="SPACE WOLVES — PRIMAL BEAST" />
                <DataRow label="Flash Overload" value="IRON HANDS — MECHANICAL REJECTION" />
                <DataRow label="Warp Corruption" value="CHAOS TAINT — PURGE REQUIRED" />
                <DataRow label="Sterility Gene" value="SOME CHAPTERS UNABLE TO REPRODUCE" />
                <DataRow label="Management" value="CONSTANT PSYCHO-INDOCTRINATION" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  BATTLE AGAINST NATURE ITSELF
                </div>
              </DataPanel>

              <DataPanel title="▸ WARGEAR LOADOUT OPTIONS">
                <DataRow label="Close Combat" value="RELIC BLADE + BOLT PISTOL" />
                <DataRow label="Ranged Specialist" value="PLASMA RIFLE + GRENADES" />
                <DataRow label="Heavy Support" value="LASCANNON + AMMUNITION BEARER" />
                <DataRow label="Anti-Infantry" value="BOLTER + CHAINSWORD" />
                <DataRow label="Anti-Vehicle" value="MELTA GUN + POWER FIST" />
                <DataRow label="Balanced Load" value="BOLTER + COMBAT BLADE" />
                <DataRow label="Mission Dependent" value="LOADOUT SELECTION REQUIRED" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  CUSTOMIZED LOADOUTS FOR ALL MISSIONS
                </div>
              </DataPanel>

              <DataPanel title="▸ HONOR GUARD & BODYGUARD UNITS">
                <DataRow label="Captain's Guard" value="ELITE STERNGUARD VETERANS" />
                <DataRow label="Champion Bodyguard" value="SINGLE COMBAT SPECIALIST" />
                <DataRow label="Ancient Standard Bearers" value="MORALE + RELIC ARMOR" />
                <DataRow label="Apothecary Retinue" value="MEDICAL + SUPPORT" />
                <DataRow label="Chaplain Retinue" value="SPIRITUAL ADVISORS" />
                <DataRow label="Templar Knights" value="BLACK TEMPLAR HONOR GUARD" />
                <DataRow label="Selection Criterion" value="VALOR IN COMBAT" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  CLOSEST BROTHERS ONLY
                </div>
              </DataPanel>

              <DataPanel title="▸ CHAPTER RELIQUARIES">
                <DataRow label="Gene-Seed Vault" value="MOST SACRED CHAMBER" />
                <DataRow label="Dreadnought Tombs" value="HONORED ANCIENTS ENTOMBED" />
                <DataRow label="Relic Armory" value="ANCIENT WEAPONS HOLY SHRINE" />
                <DataRow label="Flags of War" value="BATTLE HONOR BANNERS" />
                <DataRow label="Primarch Relics" value="SACRED GENETIC REMNANTS" />
                <DataRow label="Chapter Altar" value="VENERATION CHAMBER" />
                <DataRow label="Security" value="MOST HEAVILY DEFENDED AREA" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  HEART OF CHAPTER IDENTITY
                </div>
              </DataPanel>

              <DataPanel title="▸ TRAINING TRIALS & INITIATION">
                <DataRow label="Trials of Fury" value="COMBAT GAUNTLET CHALLENGE" />
                <DataRow label="Trials of Pain" value="ENDURANCE TEST — NEAR LETHAL" />
                <DataRow label="Trials of Courage" value="FACE ANCIENT HORRORS" />
                <DataRow label="Trials of Wisdom" value="MENTAL DISCIPLINE TEST" />
                <DataRow label="Trials of Wrath" value="COMBAT AGAINST VETERANS" />
                <DataRow label="Trials of Honor" value="FINAL CEREMONIAL DUEL" />
                <DataRow label="Casualty Rate" value="50% DO NOT SURVIVE" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  ONLY THE WORTHY BECOME BROTHERS
                </div>
              </DataPanel>

              <DataPanel title="▸ CHAPTER FLEET COMPOSITION">
                <DataRow label="Battle Barges" value="CHAPTER FLAGSHIP COMMAND" />
                <DataRow label="Strike Cruisers" value="RAPID RESPONSE VESSELS" />
                <DataRow label="Escorts Ships" value="PATROL / DEFENSE CRAFT" />
                <DataRow label="Thunderhawks" value="ORBITAL ASSAULT PLATFORMS" />
                <DataRow label="Drop Pods" value="RAPID PLANETARY INSERTION" />
                <DataRow label="Voidcraft" value="VOID-CAPABLE TRANSPORTS" />
                <DataRow label="Strength" value="VARIES BY CHAPTER AGE" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  CHAPTER ARMADA — MOBILE STRIKE CAPABILITY
                </div>
              </DataPanel>

            </div>
            )}

            {/* Mission Plans Tab */}
            {activeTab === 'missions' && (
            <div className="flex-1 p-3 md:p-6 grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-6 overflow-auto">

              <DataPanel title="▸ IMPERIAL FORCES — GETTING STARTED">
                <DataRow label="Overview" value="LEAD THE IMPERIUM" />
                <DataRow label="Objective" value="DEFEND HUMANITY FROM XENOS" />
                <DataRow label="Resource" value="COMMAND POINTS — MANAGE WISELY" />
                <DataRow label="Units" value="START WITH TACTICAL MARINES" />
                <DataRow label="Starting Strength" value="5 BATTLE BROTHERS + COMMANDER" />
                <DataRow label="First Mission" value="PLANETARY DEFENSE" />
                <DataRow label="Difficulty" value="ESCALATES WITH PROGRESS" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  THE EMPEROR GUIDES YOUR FIRST STEPS
                </div>
              </DataPanel>

              <DataPanel title="▸ BUILDING YOUR ARMY">
                <DataRow label="Squad Organization" value="10 MARINES PER COMPANY" />
                <DataRow label="Squad Types" value="TACTICAL / ASSAULT / DEVASTATOR" />
                <DataRow label="Recruitment" value="COMPLETE MISSIONS FOR REINFORCEMENTS" />
                <DataRow label="Promotion" value="VETERAN STATUS AFTER 3 VICTORIES" />
                <DataRow label="Customization" value="CHOOSE WEAPON LOADOUTS" />
                <DataRow label="Leadership" value="APPOINT SQUAD SERGEANTS" />
                <DataRow label="Max Strength" value="1,000 BATTLE BROTHERS" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  GROW YOUR CHAPTER FROM HUMBLE ORIGINS
                </div>
              </DataPanel>

              <DataPanel title="▸ MISSION TYPES & OBJECTIVES">
                <DataRow label="Defense" value="HOLD POSITION — SURVIVE WAVES" />
                <DataRow label="Assault" value="BREACH ENEMY STRONGHOLD" />
                <DataRow label="Reconnaissance" value="GATHER INTELLIGENCE" />
                <DataRow label="Extraction" value="RESCUE VIPs / RETRIEVE ARTIFACTS" />
                <DataRow label="Purge" value="ELIMINATE ALL HERETICS" />
                <DataRow label="Siege" value="ASSAULT FORTIFIED POSITIONS" />
                <DataRow label="Reward" value="EARN EXPERIENCE + RESOURCES" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  MISSION VARIETY DETERMINES STRATEGY
                </div>
              </DataPanel>

              <DataPanel title="▸ COMBAT MECHANICS & TACTICS">
                <DataRow label="Turn-Based Combat" value="EACH UNIT TAKES ACTION" />
                <DataRow label="Action Points" value="LIMITED PER TURN" />
                <DataRow label="Cover Bonus" value="HIDE BEHIND TERRAIN" />
                <DataRow label="Squad Coherency" value="STAY GROUPED FOR BONUSES" />
                <DataRow label="Morale System" value="CASUALTIES REDUCE EFFECTIVENESS" />
                <DataRow label="Friendly Fire" value="CAREFUL POSITIONING REQUIRED" />
                <DataRow label="Victory" value="DEFEAT ALL ENEMIES" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  TACTICAL POSITIONING IS CRUCIAL
                </div>
              </DataPanel>

              <DataPanel title="▸ RESOURCE MANAGEMENT">
                <DataRow label="Command Points" value="PRIMARY CURRENCY" />
                <DataRow label="Production" value="EARNED FROM MISSIONS" />
                <DataRow label="Recruitment Costs" value="VARIES BY UNIT TYPE" />
                <DataRow label="Equipment Upgrades" value="IMPROVE EFFECTIVENESS" />
                <DataRow label="Tech-Priests" value="UNLOCK NEW UNITS" />
                <DataRow label="Gene-Seed Storage" value="CRITICAL RESOURCE" />
                <DataRow label="Strategic Reserve" value="SAVE FOR EMERGENCIES" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  MANAGE RESOURCES TO SURVIVE
                </div>
              </DataPanel>

              <DataPanel title="▸ ENEMY FACTIONS & DIFFICULTIES">
                <DataRow label="Imperial Traitors" value="EASY — UNAUGMENTED HUMANS" />
                <DataRow label="Ork Clans" value="MEDIUM — SAVAGE BUT SIMPLE" />
                <DataRow label="Chaos Forces" value="HARD — CORRUPTED MARINES" />
                <DataRow label="Tyranid Swarms" value="EXTREME — OVERWHELMING NUMBERS" />
                <DataRow label="Eldar Raiders" value="INSANE — SUPERIOR TECH" />
                <DataRow label="Necrons" value="NIGHTMARE — IMMORTAL MACHINES" />
                <DataRow label="Difficulty Scaling" value="ADJUST TO YOUR SKILL" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  CHOOSE YOUR CHALLENGE LEVEL
                </div>
              </DataPanel>

              <DataPanel title="▸ PROGRESSION & LEVELING">
                <DataRow label="Unit Experience" value="GAINED PER MISSION" />
                <DataRow label="Rank System" value="RECRUIT → VETERAN → HERO" />
                <DataRow label="Skill Trees" value="UNLOCK SPECIAL ABILITIES" />
                <DataRow label="Stat Growth" value="STRENGTH / AGILITY / ENDURANCE" />
                <DataRow label="Special Weapons" value="UNLOCK AT HIGHER RANKS" />
                <DataRow label="Leadership Bonuses" value="HIGHER RANKED UNITS BOOST SQUAD" />
                <DataRow label="Promotion Path" value="BECOME A CHAPTER HERO" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  EXPERIENCE SHAPES YOUR WARRIORS
                </div>
              </DataPanel>

              <DataPanel title="▸ EQUIPMENT & LOADOUTS">
                <DataRow label="Weapon Selection" value="BOLTER / PLASMA / MELTA / FLAMER" />
                <DataRow label="Armor Options" value="MARK I THROUGH MARK X" />
                <DataRow label="Attachment Slots" value="CUSTOMIZE YOUR WARRIOR" />
                <DataRow label="Relic Weapons" value="LEGENDARY EQUIPMENT" />
                <DataRow label="Special Gear" value="JUMP PACKS / SHIELDS" />
                <DataRow label="Loadout Cost" value="LIMITED BY CHAPTER RESOURCES" />
                <DataRow label="Balance" value="HEAVIER GEAR = SLOWER MOVEMENT" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  CUSTOMIZE FOR YOUR PLAYSTYLE
                </div>
              </DataPanel>

              <DataPanel title="▸ CHAPTER CUSTOMIZATION">
                <DataRow label="Paint Scheme" value="CHOOSE YOUR CHAPTER COLORS" />
                <DataRow label="Chapter Name" value="CREATE YOUR LEGACY" />
                <DataRow label="Doctrine Selection" value="DEFINES COMBAT BONUSES" />
                <DataRow label="Homeworld" value="IMPACTS RECRUITMENT POOL" />
                <DataRow label="Battle Cry" value="UNIQUE UNIT DIALOGUE" />
                <DataRow label="Chapter Relic" value="ONE SPECIAL ARTIFACT" />
                <DataRow label="Founding Date" value="DETERMINES AGE & POWER" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  BUILD YOUR UNIQUE CHAPTER IDENTITY
                </div>
              </DataPanel>

              <DataPanel title="▸ VICTORY CONDITIONS">
                <DataRow label="Campaign Victory" value="DEFEAT ALL ENEMY FACTION LEADERS" />
                <DataRow label="Territory Control" value="CONQUER ALL SECTORS" />
                <DataRow label="Resource Dominance" value="ACCUMULATE 1 MILLION POINTS" />
                <DataRow label="Time Limit" value="COMPLETE WITHIN 50 TURNS" />
                <DataRow label="Legendary Status" value="ACHIEVE 100% MISSION SUCCESS" />
                <DataRow label="Chapter Ascension" value="BECOME FIRST FOUNDING CHAPTER" />
                <DataRow label="Endless Mode" value="SURVIVE AS LONG AS POSSIBLE" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  MULTIPLE PATHS TO GLORY
                </div>
              </DataPanel>

              <DataPanel title="▸ MULTIPLAYER MODES">
                <DataRow label="Skirmish" value="1v1 CHAPTER BATTLE" />
                <DataRow label="Team Wars" value="2v2 COOPERATIVE COMBAT" />
                <DataRow label="Raid Events" value="UP TO 8 PLAYERS COMBINED" />
                <DataRow label="Leaderboards" value="GLOBAL RANKING SYSTEM" />
                <DataRow label="Seasonal Challenges" value="LIMITED TIME EVENTS" />
                <DataRow label="Chapter Honors" value="UNLOCK SPECIAL REWARDS" />
                <DataRow label="Competitive Rewards" value="EXCLUSIVE COSMETICS" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  COMPETE FOR ETERNAL GLORY
                </div>
              </DataPanel>

              <DataPanel title="▸ TIPS & STRATEGIES">
                <DataRow label="Start Simple" value="MASTER BASIC TACTICS FIRST" />
                <DataRow label="Squad Cohesion" value="KEEP UNITS GROUPED FOR MORALE" />
                <DataRow label="Cover Placement" value="HIDE YOUR VULNERABLE UNITS" />
                <DataRow label="Flanking Maneuvers" value="ATTACK FROM MULTIPLE ANGLES" />
                <DataRow label="Resource Conservation" value="DONT SPEND EVERYTHING EARLY" />
                <DataRow label="Veteran Priority" value="PROTECT YOUR BEST UNITS" />
                <DataRow label="Adapt Strategy" value="ADJUST TACTICS MID-BATTLE" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  VICTORY REQUIRES CUNNING
                </div>
              </DataPanel>

              <DataPanel title="▸ UNLOCKABLES & ACHIEVEMENTS">
                <DataRow label="Paint Schemes" value="UNLOCK WITH VICTORIES" />
                <DataRow label="Unit Types" value="GAIN ACCESS TO NEW SQUADS" />
                <DataRow label="Special Weapons" value="RARE EQUIPMENT DROPS" />
                <DataRow label="Chapter Relics" value="LEGENDARY ARTIFACTS" />
                <DataRow label="Cosmetic Items" value="BANNERS / CHAPTER ICONS" />
                <DataRow label="Titles" value="COMMANDER RANKS & HONORS" />
                <DataRow label="Badges" value="MILESTONE ACHIEVEMENTS" alert />
                <div className="mt-4 border-t border-[#166534] pt-3 text-xs text-[#166534]">
                  EARN PRESTIGE THROUGH CONQUEST
                </div>
              </DataPanel>

            </div>
            )}

            {/* Command Support Tab */}
            {activeTab === 'support' && (
            <div className="flex-1 p-3 md:p-6 flex flex-col overflow-hidden">
              <div className="border border-[#39ff14] bg-[#0d220d] rounded flex flex-col h-full" data-chat-container>
                
                {/* Chat Header */}
                <div className="border-b border-[#166534] px-4 py-3 bg-[#0d220d]">
                  <div className="text-sm tracking-widest uppercase terminal-glow mb-1">
                    ▸ TACTICAL AI COMMAND ASSISTANT
                  </div>
                  <div className="text-xs text-[#166534]">
                    DEPLOYMENT ADVISOR — MARINE REINFORCEMENT COORDINATOR
                  </div>
                </div>

                {/* Chat Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={`text-xs font-mono ${msg.sender === 'AI_COMMAND' ? 'text-[#39ff14]' : 'text-[#facc15]'}`}>
                      <div className="text-[#166534] text-[0.65rem] mb-1">
                        [{msg.timestamp}] {msg.sender === 'AI_COMMAND' ? 'AI_COMMAND' : 'COMMANDER'}
                      </div>
                      <div className="ml-2 leading-relaxed">
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Command Buttons */}
                <div className="border-t border-[#166534] px-4 py-2 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleAIChat('deploy reinforcements')}
                    className="px-2 py-1 text-xs border border-[#39ff14] text-[#39ff14] hover:bg-[#39ff14] hover:text-[#0d220d] transition"
                  >
                    DEPLOY REINFORCEMENTS
                  </button>
                  <button
                    onClick={() => handleAIChat('backup marines status')}
                    className="px-2 py-1 text-xs border border-[#39ff14] text-[#39ff14] hover:bg-[#39ff14] hover:text-[#0d220d] transition"
                  >
                    BACKUP MARINES
                  </button>
                  <button
                    onClick={() => handleAIChat('mission tactics')}
                    className="px-2 py-1 text-xs border border-[#39ff14] text-[#39ff14] hover:bg-[#39ff14] hover:text-[#0d220d] transition"
                  >
                    MISSION TACTICS
                  </button>
                  <button
                    onClick={() => handleAIChat('emergency support')}
                    className="px-2 py-1 text-xs border border-[#facc15] text-[#facc15] hover:bg-[#facc15] hover:text-[#0d220d] transition"
                  >
                    EMERGENCY AID
                  </button>
                </div>

                {/* Chat Input */}
                <div className="border-t border-[#166534] px-4 py-3 flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && chatInput.trim()) {
                        handleAIChat(chatInput)
                        setChatInput('')
                      }
                    }}
                    placeholder="Enter command..."
                    className="flex-1 bg-[#0a1a0a] border border-[#166534] text-[#39ff14] placeholder-[#166534] px-2 py-1 text-xs font-mono focus:outline-none focus:border-[#39ff14]"
                  />
                  <button
                    onClick={() => {
                      if (chatInput.trim()) {
                        handleAIChat(chatInput)
                        setChatInput('')
                      }
                    }}
                    className="px-3 py-1 bg-[#39ff14] text-[#0d220d] text-xs font-bold hover:bg-[#facc15] transition"
                  >
                    SEND
                  </button>
                </div>
              </div>
            </div>
            )}

            {/* Servo Skull Tab */}
            {activeTab === 'servo-skull' && (
            <div className="flex-1 p-3 md:p-6 flex flex-col overflow-hidden">
              <div className="border border-[#39ff14] bg-[#0d220d] rounded flex flex-col h-full">
                
                {/* Header */}
                <div className="border-b border-[#166534] px-4 py-3 bg-[#0d220d]">
                  <div className="text-sm tracking-widest uppercase terminal-glow mb-1">
                    ▸ SERVO SKULL COGNITOR
                  </div>
                  <div className="text-xs text-[#166534]">
                    WARHAMMER KNOWLEDGE ARCHIVE — SEARCH THE IMPERIUM'S COLLECTIVE WISDOM
                  </div>
                </div>

                {/* Search Results Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {servoSkullLoading ? (
                    <div className="text-xs text-[#166534] text-center mt-8">
                      <div className="text-[#39ff14] font-bold animate-pulse">
                        ▸ SEARCHING ARCHIVES...
                      </div>
                      <div className="text-[0.75rem] mt-2">Querying Warhammer database and Wikipedia...</div>
                    </div>
                  ) : !servoSkullResults ? (
                    <div className="text-xs text-[#166534] space-y-2">
                      <div className="border border-[#166534] p-3 rounded bg-[#0a1a0a]">
                        <div className="text-[#39ff14] font-bold mb-2">▸ SERVO SKULL COGNITOR — WARHAMMER & GENERAL KNOWLEDGE</div>
                        <div>Search for 40k lore or any general topic:</div>
                        <div className="mt-2 space-y-1 text-[0.75rem]">
                          <div className="text-[#facc15] font-bold">Warhammer Topics:</div>
                          <div>• Space Marines, Ultramarines, Blood Angels, Dark Angels, Chaos, Abaddon</div>
                          <div>• Adeptus Mechanicus, Emperor, Golden Throne, Astronomican, Ork, Inquisition</div>
                          <div>• Tyranid, Necron, Tau, Warp, Geneseed, Heresy, Psyker, Eldar</div>
                          <div className="text-[#facc15] font-bold mt-2">General Topics (Wikipedia):</div>
                          <div>• History, Science, Technology, Geography, Art, Literature, Biology</div>
                          <div>• Mathematics, Physics, Chemistry, Astronomy, Philosophy, And much more...</div>
                        </div>
                      </div>
                      
                      {servoSkullSearchHistory.length > 0 && (
                        <div className="border border-[#166534] p-3 rounded bg-[#0a1a0a]">
                          <div className="text-[#39ff14] font-bold mb-2">▸ RECENT QUERIES</div>
                          <div className="space-y-1">
                            {servoSkullSearchHistory.map((entry, idx) => (
                              <div 
                                key={idx}
                                onClick={() => handleServoSkullSearch(entry.query)}
                                className="text-[0.75rem] cursor-pointer hover:text-[#facc15] transition"
                              >
                                → {entry.query}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="border-l-2 border-[#39ff14] pl-3 py-2">
                        <div className="text-sm font-bold text-[#39ff14] mb-2">
                          {servoSkullResults.title}
                        </div>
                        {servoSkullResults.source && (
                          <div className="text-[0.7rem] text-[#166534] mb-1">
                            [Source: {servoSkullResults.source}]
                          </div>
                        )}
                        <div className="text-xs text-[#39ff14] leading-relaxed">
                          {servoSkullResults.content}
                        </div>
                      </div>
                      
                      {servoSkullSearchHistory.length > 0 && (
                        <div className="border border-[#166534] p-3 rounded bg-[#0a1a0a] mt-4">
                          <div className="text-[#39ff14] font-bold text-xs mb-2">▸ SEARCH HISTORY</div>
                          <div className="space-y-1">
                            {servoSkullSearchHistory.map((entry, idx) => (
                              <div 
                                key={idx}
                                onClick={() => handleServoSkullSearch(entry.query)}
                                className="text-[0.7rem] cursor-pointer text-[#166534] hover:text-[#facc15] transition"
                              >
                                → {entry.query}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Search Input */}
                <div className="border-t border-[#166534] px-4 py-3 flex gap-2">
                  <input
                    type="text"
                    value={servoSkullQuery}
                    onChange={(e) => setServoSkullQuery(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && servoSkullQuery.trim()) {
                        handleServoSkullSearch(servoSkullQuery)
                        setServoSkullQuery('')
                      }
                    }}
                    placeholder="Query the Servo Skull..."
                    className="flex-1 bg-[#0a1a0a] border border-[#166534] text-[#39ff14] placeholder-[#166534] px-2 py-1 text-xs font-mono focus:outline-none focus:border-[#39ff14]"
                  />
                  <button
                    onClick={() => {
                      if (servoSkullQuery.trim() && !servoSkullLoading) {
                        handleServoSkullSearch(servoSkullQuery)
                        setServoSkullQuery('')
                      }
                    }}
                    disabled={servoSkullLoading}
                    className="px-3 py-1 bg-[#39ff14] text-[#0d220d] text-xs font-bold hover:bg-[#facc15] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {servoSkullLoading ? 'SEARCHING...' : 'SEARCH'}
                  </button>
                </div>
              </div>
            </div>
            )}

            {/* Chaplain Tab */}
            {activeTab === 'chaplain' && (
            <div className="flex-1 p-3 md:p-6 flex flex-col overflow-hidden">
              <div className="border border-[#39ff14] bg-[#0d220d] rounded flex flex-col h-full">
                
                {/* Header */}
                <div className="border-b border-[#166534] px-4 py-3 bg-[#0d220d]">
                  <div className="text-sm tracking-widest uppercase terminal-glow mb-1">
                    ▸ CHAPLAIN — SPIRITUAL GUIDANCE
                  </div>
                  <div className="text-xs text-[#166534]">
                    BESTOWER OF PURITY SEALS — BLESSINGS FOR YOUR ARMOR
                  </div>
                </div>

                {/* Seals Display Area */}
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {/* Your Seals */}
                    <div className="border border-[#39ff14] p-3 rounded bg-[#0a1a0a]">
                      <div className="text-sm font-bold text-[#39ff14] mb-3">
                        ▸ YOUR PURITY SEALS ({puritySeals.length})
                      </div>
                      {puritySeals.length === 0 ? (
                        <div className="text-xs text-[#166534]">
                          No purity seals collected yet. Seek the Chaplain's blessings below.
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {puritySeals.map((seal) => (
                            <div key={seal.id} className="border border-[#39ff14] p-2 rounded text-center bg-[#0d220d]">
                              <div className="text-2xl text-[#facc15] mb-1">{seal.symbol}</div>
                              <div className="text-[0.7rem] font-bold text-[#39ff14]">{seal.name}</div>
                              <div className="text-[0.6rem] text-[#166534] mt-1">{seal.description}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Available Seals */}
                    <div className="border border-[#166534] p-3 rounded bg-[#0a1a0a]">
                      <div className="text-sm font-bold text-[#39ff14] mb-3">
                        ▸ AVAILABLE BLESSINGS
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {availablePuritySeals.map((seal) => {
                          const isCollected = puritySeals.find(s => s.id === seal.id)
                          return (
                            <button
                              key={seal.id}
                              onClick={() => collectPuritySeal(seal.id)}
                              disabled={isCollected}
                              className={`p-2 rounded text-center transition ${
                                isCollected
                                  ? 'border border-[#166534] bg-[#0a1a0a] text-[#166534] cursor-not-allowed opacity-50'
                                  : 'border border-[#39ff14] bg-[#0d220d] hover:bg-[#166534] text-[#39ff14] cursor-pointer'
                              }`}
                            >
                              <div className="text-2xl mb-1">{seal.symbol}</div>
                              <div className="text-[0.7rem] font-bold">{seal.name}</div>
                              <div className="text-[0.6rem] mt-1 text-[#facc15]">
                                {isCollected ? 'Collected' : 'Seek Blessing'}
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Chaplain Message */}
                    <div className="border border-[#166534] p-3 rounded bg-[#0a1a0a]">
                      <div className="text-xs text-[#39ff14] leading-relaxed">
                        <div className="font-bold mb-2">▸ CHAPLAIN'S WORDS</div>
                        "May these purity seals shield you from corruption, temptation, and the whispers of the Warp. Each seal is a mark of your faith and devotion to the Emperor of Mankind. Wear them with honor, warrior, and know that the blessings of this Chapter are upon you. The light of the Emperor endures eternal."
                      </div>
                    </div>

                    {/* Tactical Map */}
                    <div className="border border-[#166534] p-3 rounded bg-[#0a1a0a]">
                      <div className="text-[#166534] mb-2 tracking-widest text-sm font-bold">▸ NEARBY CONTACTS</div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                        {/* Simple Tactical Map */}
                        <div className="border border-[#166534] p-2 bg-[#0a1a0a] font-mono text-[0.65rem] leading-tight">
                          <div className="text-[#39ff14] font-bold mb-1">TACTICAL MAP</div>
                          <div className="space-y-0 text-[#166534]">
                            <div>. . C . . </div>
                            <div>. . . . . </div>
                            <div>. . Y . . </div>
                            <div>. . . . . </div>
                            <div>. . . . . </div>
                          </div>
                          <div className="text-[#166534] text-[0.6rem] mt-1">
                            <span className="text-[#39ff14]">Y</span> = You | <span className="text-[#facc15]">C</span> = Chaplain
                          </div>
                        </div>

                        {/* Your Position */}
                        <div className="border border-[#39ff14] p-2 bg-[#0d220d] text-[#39ff14]">
                          <div className="font-bold">YOUR POSITION</div>
                          <div className="text-[0.7rem] text-[#166534] mt-1">
                            <div>Sector: 7-Green</div>
                            <div>Coordinates: 145.2, 78.9</div>
                            <div>Status: MOBILE</div>
                          </div>
                        </div>

                        {/* Chaplain Position */}
                        <div className="border border-[#facc15] p-2 bg-[#0d220d] text-[#facc15]">
                          <div className="font-bold">CHAPLAIN LOCATION</div>
                          <div className="text-[0.7rem] text-[#166534] mt-1">
                            <div>Sector: 7-Green</div>
                            <div>Coordinates: 145.1, 82.1</div>
                            <div>Distance: ~3.2m NORTH</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )}
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

        {/* Modal Overlay */}
        {selectedFile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <FileModal file={selectedFile} onClose={() => setSelectedFile(null)} />
          </div>
        )}

        {/* Archive Search Modal */}
        {archiveSearch && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <ArchiveSearchModal 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery}
              searchCategory={searchCategory}
              setSearchCategory={setSearchCategory}
              onClose={() => {
                setArchiveSearch(false)
                setSearchQuery('')
                setSearchCategory('all')
              }}
            />
          </div>
        )}

        {/* Planet Info Modal */}
        {selectedPlanet && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <PlanetModal planet={selectedPlanet} onClose={() => setSelectedPlanet(null)} />
          </div>
        )}

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

function NavItem({ label, onClick }) {
  return (
    <li 
      onClick={onClick}
      className="px-4 py-1.5 text-sm border-b border-[#0d220d] hover:bg-[#1a3a1a] hover:terminal-glow cursor-pointer transition-colors"
    >
      › {label}
    </li>
  )
}

function TabButton({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 border-r border-[#166534] cursor-pointer transition-colors ${
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

function StarMap({ onSelectPlanet }) {
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
    <div className="relative w-full" style={{ paddingBottom: '80%' }}>
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
          <g key={s.name} style={{ cursor: 'pointer' }} onClick={() => onSelectPlanet(s.name)}>
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

function FileModal({ file, onClose }) {
  const fileContent = {
    'planet-records': {
      title: 'PLANET RECORDS — ARMAGEDDON PRIME',
      timestamp: '999.M42',
      content: `
[ADEPTUS MECHANICUS PLANETARY DATABASE]
[CLASSIFIED: RESTRICTED ACCESS]
[WORLD DESIGNATION: ARMAGEDDON PRIME]

PLANETARY RECORD FILE — COMPLETE DOSSIER
LASTUPDATED: 999.M41
NEXT REVIEW: 010.M43

═══════════════════════════════════════════════════════════

PLANET DESIGNATION: Armageddon Prime
TYPE: Hive World (Industrial)
GRID COORDINATES: Segmentum Obscurus - Armageddon Sector
DISTANCE FROM TERRA: 7,843 Light-Years (Warp Transit: ~847 Days)

PHYSICAL CHARACTERISTICS:
- Diameter: 11,400 km (90% Earth Standard)
- Gravity: 1.2 G
- Atmosphere: Toxic - Requires Protective Equipment
- Temperature: Extreme — Average 78°C (Surface Anomalies: 140°C+)
- Hydrological Coverage: 23% (Polluted Industrial Runoff)

POPULATION:
- Current: 36.8 Billion (Pre-Invasion: 48.2 Billion)
- Density: 3,223 Per km²
- Primary Settlement: Hive Infernus (Capital)
- Other Major Hives: Armageddon, Volcanus, Helsreach

POLITICAL STATUS: Under Imperial Military Control (War Governor Appointed)
PREVIOUS GOVERNOR: Herman von Strab (EXECUTED for Negligence — 998.M41)
CURRENT GOVERNOR: Colonel Sebastien Yarrick (ACTING)

INDUSTRIES:
- Weapons Manufacturing: 47%
- Ammunition Production: 31%
- Metal Ore Extraction: 16%
- Agricultural (Vat-Grown): 6%

IMPERIAL TITHE: Exactis Tertius (One Third of All Manufactured Goods)
TITHE STATUS: CRITICAL — Production at 12% Capacity

MILITARY VALUE: EXTREME
Strategic Position in Sector Defense Network: CRITICAL

═══════════════════════════════════════════════════════════

HISTORICAL RECORD — NOTABLE EVENTS:

998.M41 — ORK INVASION (WAAAGH! GHAZGHKULL THRAKA)
Status: CATASTROPHIC ASSAULT — ONGOING RESISTANCE
- Initial Landing: 47 Orkish Kroozers Deployed
- Ground Forces: Estimated 8+ Million Ork Warriors
- Casualties (Imperial): 11.4 Billion Confirmed
- Casualties (Ork): Unknown — Continuous Reinforcement
- Defense Commander: Colonel Sebastien Yarrick (PROMOTED from Major)

997.M41 — PLANETARY GOVERNOR SCANDAL
- Herman von Strab: Ordered population evacuation (UNAUTHORIZED)
- Court Martial Result: Guilty of Cowardice, Negligence, Abandonment of Duty
- Sentence: EXECUTION (Bolter Round to the Head)
- Impact: Severe Loss of Public Confidence

985.M41 — LAST MAJOR PEACE CYCLE
- Hive Populations at Peak: 48.2 Billion
- Industrial Output: 94% Capacity
- Security Rating: GREEN (No Notable Xenos Activity)

═══════════════════════════════════════════════════════════

RELIGIOUS & CULTURAL DATA:

DOMINANT FAITH: Cult of the Omnissiah (Adeptus Mechanicus)
- Primary Temple: Factorum Cathedral (Hive Infernus)
- Tech-Priesthood Population: ~4.2 Million
- Sacred Manufactories: 12 (Protected Sites)

SECONDARY CULTS: Imperial Creed (General Population)
- Ecclesiarchy Representation: Moderate
- Missionary Activity: Ongoing

CULTURAL IDENTITY:
- Primary Language: Low Gothic (Industrial Dialect)
- Secondary Languages: Binaric Cant (Technical), High Gothic (Administrative)
- Cultural Archetype: Industrial-Militaristic
- Loyalty Index: STEADFAST (Despite Current Crisis)

═══════════════════════════════════════════════════════════

DEFENSE INFRASTRUCTURE:

ORBITAL DEFENSE GRID:
- Weapon Batteries: 247 (Functional: 89)
- Missile Platforms: 156 (Functional: 34)
- Shield Generators: 12 (Operational: 3 — CRITICAL)
- Sensor Arrays: 89 (Functional: 71)

GROUND FORTIFICATIONS:
- Fortress Complexes: 47
- Bunker Networks: 1,247
- Artillery Emplacements: 3,891
- Anti-Aircraft Batteries: 2,156

MILITARY GARRISON:
- Cadia Regiment: 40,000 (Current: 8,400 — Casualties: 31,600)
- Tanith First-and-Only: 2,100 (Current: 891 — KIA: 1,209)
- Local Militia: 2.1 Million (Organized, Armed)
- Space Marine Contingent: Variable (Ultramarines Chapter Deployed)

═══════════════════════════════════════════════════════════

NOTABLE FIGURES — CURRENT PERIOD:

Colonel Sebastien Yarrick (ACTING GOVERNOR)
- Rank: Full Colonel, Imperial Guard
- Age: 67 Standard Years
- Combat Experience: 50+ Years of Active Duty
- Notable Achievements: Survived 12 Ork Invasions Previously
- Status: ACTIVE COMMAND — War Governor Authority

Chapter Master Marneus Calgar (Ultramarines)
- Authority: Sector Astartes Command
- Status: DEPLOYED TO ARMAGEDDON
- Mission: Coordinate Space Marine Defense Operations
- Current Strength: 2 Battle Companies (Variable Reinforcement)

Castellan Grendel (Fortress Commander)
- Position: Chief Defender of Hive Infernus
- Status: Heavily Wounded (Continuing Duty)
- Notable: Led Last Major Victory Against Ork Advance (997.M41)

═══════════════════════════════════════════════════════════

XENOS THREAT ASSESSMENT:

PRIMARY THREAT: Ork Empire (Waaagh! Ghazghkull)
- Threat Level: CRITICAL
- Strategic Objective: WORLD DOMINATION & CONQUEST
- Leadership: Warboss Ghazghkull Mag Uruk Thraka (NOTORIOUS)
- Estimated Forces: 8-12 Million Ground Troops (GROWING)

SECONDARY THREATS:
- Chaotic Cults (Minor — Suppressed)
- Aberrant Xenos (Minimal — Localized)
- Warp Incursions (Monitored — Contained)

═══════════════════════════════════════════════════════════

STRATEGIC ASSESSMENT:

CURRENT SITUATION: CRITICAL — WAR FOOTING
- Hive Defense: CONTESTED
- Resource Production: SEVERELY DISRUPTED
- Civilian Morale: LOW — BUT RESILIENT
- Military Capability: DEGRADED (Ongoing Reinforcement)

REINFORCEMENT STATUS:
- Incoming Imperial Guard Regiments: 12 (ETA: 4-8 Weeks)
- Space Marine Chapters Contacted: 7 (Deployment Uncertain)
- Naval Support: Battlefleet Gothic (47% Combat Capable)
- Mechanicus Support: FULL COMMITMENT (Weaponry, Ammunition, Repairs)

PREDICTED OUTCOME: UNCERTAIN
- Best Case: Ork Forces Contained, Eventual Repulsion (2-3 Years)
- Worst Case: Planetary Fall, Exterminatus Ordered (Unknown Probability)

═══════════════════════════════════════════════════════════

RESOURCE AVAILABILITY:

CRITICAL SHORTAGES:
- Medical Supplies: 67% Depleted
- Ammunition (Standard): 34% Reserves Remaining
- Fuel (Industrial): 22% Stockpile
- Food Supplies (Civilian): 8 Weeks to Critical Shortage

ABUNDANT RESOURCES:
- Weapons Manufacturing Capacity: MAINTAINED (Limited by Damage)
- Metal Ore: ABUNDANT (Mining Operations Disrupted)
- Water (Recycled): SUFFICIENT (Purification Required)

═══════════════════════════════════════════════════════════

MAJOR MILITARY ENGAGEMENTS — CURRENT CONFLICT:

HELSREACH FORTRESS (998.M41)
Location: Northern Industrial Zone
Defending Force: Ultramarines (3 Squads), Imperial Guard (847 Troops)
Duration: 47 Days Continuous Combat
Outcome: FORTIFIED — Orks Temporarily Repelled
Casualties: Imperial — 589 KIA | Ork — Estimated 15,000+ KIA
Strategic Significance: CRITICAL — Last Major Victory

INFERNUS INDUSTRIAL COMPLEX (998.M41)
Location: Central Hive Sector
Defending Force: Mixed Guard Regiments (12,000 Troops)
Duration: Ongoing (27 Days)
Current Status: CONTESTED — Heavy Fighting
Casualties: Imperial — 2,847 KIA, 4,156 Wounded | Ork — Unknown (Continuous)
Strategic Significance: VITAL — Prime Manufacturing Center (Weapons Production)

VOLCANIC RIDGE DEFENSE LINE (998.M41)
Location: Southern Perimeter
Defending Force: Imperial Guard Artillery, Mechanicus War Machines
Duration: 63 Days Continuous Bombardment
Current Status: HOLDING — Limited Ammunition
Casualties: Imperial — 1,204 KIA | Ork — Estimated 8,000+ KIA
Strategic Significance: HIGH — Prevents Deep Hive Penetration

═══════════════════════════════════════════════════════════

MECHANICUS PRESENCE & ARTIFACTS:

FORGE TEMPLE SECUNDUS
- Status: OPERATIONAL (Damaged — 34% Capacity)
- Primary Function: Weapons Manufacturing, Armor Repair
- Tech-Priests Stationed: 1,247
- Production Rate: 847 Lasguns Per Day (Down from 2,100)
- Sacred Machines: 12 (Status: Operational)

ANCIENT RELIC ENGINES
- Titan-Class War Machines: 2 (Both Deployed in Defense)
- Knight-Class Walkers: 7 (5 Operational, 2 Undergoing Repair)
- Holy Sites: Deemed Battle-Sacred (Defended to Last Man)

DARK MECHANICUS CONCERN
- Investigation Level: ELEVATED
- Suspected Corruption: 2 Facility Sites (Investigated — Cleared)
- Quarantine Protocols: ACTIVE on 4 Locations
- Inquisitorial Oversight: ONGOING

═══════════════════════════════════════════════════════════

CIVILIAN ADMINISTRATION — WAR ORGANIZATION:

RATIONING STATUS:
- Bread Rations: 400 Grams Per Person Per Day (Down from 800)
- Protein Rations: Alternative Sources (Vat-Grown Substitute, Synthetic)
- Water Ration: 2 Liters Per Person Per Day (CRITICAL in Summer Months)
- Medical Supplies: SEVERELY RATIONED — Prioritize Military Needs

POPULATION DISPLACEMENT:
- Hive Infernus to Secondary Shelters: 14.2 Million
- Hive Volcanus Evacuation: 8.7 Million (Ongoing)
- Underground Bunker Settlements: 2.3 Million (Subterranean Hives)
- War-Displaced Refugees: 1.1 Million (Receiving Aid)

MORALE MONITORING:
- Current Index: 4.7/10 (Low — Holding)
- Compliance Rating: 94% (Martial Law Effective)
- Civil Disorder: MINIMAL (Strong Leadership)
- Religious Fervor: HEIGHTENED (Cult Activity Monitored)

═══════════════════════════════════════════════════════════

ADEPTUS ASTRA TELEPATHICA REPORTS:

PSYCHIC PHENOMENA OBSERVED:
- Warp Disturbance Level: ELEVATED (Background Noise ~6x Normal)
- Astropath Communication: DEGRADED (Signal Quality 61% Normal)
- Divination Accuracy: COMPROMISED (Ork Psychic Suppression Theory)
- Prophetic Visions: MULTIPLE CONFIRMATIONS OF DARKNESS

NOTABLE PSYKER INCIDENT (997.M41):
- Incident: Mass Psychic Episode — 47 Sanctioned Psykers
- Cause: Suspected Warp Incursion (Minor — Contained)
- Outcome: 12 KIA (Neural Burnout), 35 Hospitalized (Permanent Damage)
- Containment: SUCCESSFUL — Barriers Reinforced

═══════════════════════════════════════════════════════════

SECTOR NAVAL SUPPORT:

BATTLESHIP EMPEROR'S HAMMER
- Class: Mars-Class Battlecruiser
- Status: OPERATIONAL (Hull Breach Repairs Ongoing)
- Weapon Systems: 89% Functional
- Crew: 47,200 (Casualties: 2,140)
- Current Location: Orbital Patrol — Defending Approaches

CRUISER SQUADRON DELTA
- Vessels: 4 Light Cruisers (Dauntless-Class)
- Status: 3 OPERATIONAL, 1 UNDER REPAIR
- Primary Mission: Cargo Defense, Supply Line Protection
- Recent Action: Intercepted Ork Pirate Vessel (Successful Boarding)

═══════════════════════════════════════════════════════════

ADDITIONAL COMMAND AUTHORITY:

Lord Commissar Reuben Kess
- Rank: Lord Commissar (Senior Morale Officer)
- Assignment: Armageddon Campaign
- Status: ACTIVE (Multiple Commendations)
- Notable: Executed 37 Deserters (Maintaining Discipline)
- Loyalty: UNQUESTIONABLE TO THE EMPEROR

Magos Dominus Xeroc
- Rank: High Priesthood (Mechanicus)
- Role: Chief Tech-Priest of Armageddon
- Status: COORDINATING FORGE PRODUCTION
- Biological Status: Mostly Mechanical (3% Original Biology Remains)

Captain Cadia-Stern (Navy)
- Rank: Captain (Naval Command)
- Vessel: Emperor's Hammer
- Status: ENGAGED IN ORBITAL DEFENSE
- Record: 22 Years Unbroken Naval Service

═══════════════════════════════════════════════════════════

PROPHECY & DIVINATION RECORDS:

PRIOR WARNING (974.M41):
- Source: Senior Astropath (Now Deceased)
- Prophecy: "When the green tide rises, the faithful shall endure..."
- Accuracy Assessment: VALIDATED (Current Crisis Matches Description)

CURRENT DIVINATION (999.M42):
- Oracle Status: Multiple Seers Agree on Central Point
- Consensus Message: "Struggle Eternal — Victory Uncertain — Faith Endures"
- Interpretation: CAUTIOUSLY OPTIMISTIC (Long War Expected)

═══════════════════════════════════════════════════════════

[END PLANETARY RECORD — ARMAGEDDON PRIME]
[LAST UPDATED: 999.M42 — 14:47:23 TERRA TIME]
[NEXT MANDATORY REVIEW: Continuous (War Status)]
      `
    },
    'fleet-registry': {
      title: 'NAVAL REGISTRY — BATTLEFLEET GOTHIC',
      timestamp: '999.M42',
      content: `
[BATTLEFLEET GOTHIC — OFFICIAL REGISTRY]
[AUTHORIZED BY: ADMIRAL QUONDAM QUARREN]
[CLASSIFICATION: WARSHIP MANIFEST]

FLEET DEPLOYMENT STATUS: ARMAGEDDON SECTOR DEFENSE
COMMAND: Battlefleet Gothic — Admiral Quarren
OPERATIONAL READINESS: 87% COMBAT CAPABLE

═══════════════════════════════════════════════════════════

HEAVY CAPITAL SHIPS:
├─ Emperor-Class Battleship [EMPEROR'S WRATH]
│  Status: ACTIVE | Crew: 47,000 | Firepower: MAXIMUM
├─ Retribution-Class Battleship [DIVINE JUDGMENT]
│  Status: ACTIVE | Crew: 42,000 | Firepower: MAXIMUM
└─ Mars-Class Battlecruiser [SWORD OF MARS]
   Status: ACTIVE | Crew: 28,000 | Firepower: EXTREME

CRUISER SQUADRON ALPHA:
├─ Heavy Cruiser [VIGILANT] — Status: ACTIVE
├─ Heavy Cruiser [IRON RESOLVE] — Status: ACTIVE
├─ Cruiser [RIGHTEOUS FURY] — Status: ACTIVE
└─ Cruiser [EMPEROR'S LIGHT] — Status: ACTIVE

CRUISER SQUADRON BETA:
├─ Light Cruisers [5 VESSELS] — Status: ACTIVE
└─ Escort Frigates [8 VESSELS] — Status: ACTIVE

AUXILIARY SUPPORT:
├─ Supply Ships: 6 VESSELS
├─ Ammunition Barges: 4 VESSELS
├─ Medical Frigates: 2 VESSELS
└─ Repair Tenders: 3 VESSELS

TOTAL FLEET STRENGTH: 27 Combat-Capable Vessels
TOTAL CREW: 324,000 Personnel
COMBAT RATING: SUPERIOR

NOTE: Reinforcements expected from Cadia within 120 days

[REGISTRY COMPLETE]
      `
    },
    'personnel-files': {
      title: 'PERSONNEL FILES — COMMAND STRUCTURE',
      timestamp: '999.M42',
      content: `
[IMPERIAL PERSONNEL DATABASE]
[SECURITY CLEARANCE: ALPHA]
[AUTHENTICATION REQUIRED FOR ACCESS]

KEY PERSONNEL — ARMAGEDDON SECTOR OPERATIONS
FILE STATUS: ACTIVE
LAST UPDATED: 999.M42

═══════════════════════════════════════════════════════════

MILITARY HIGH COMMAND:

COLONEL SEBASTIEN YARRICK
├─ Position: War Governor, Acting Administrator
├─ Rank: Colonel, Imperial Guard
├─ Status: ACTIVE — FIELD COMMAND
├─ Record: Legendary. Survived Ork Invasions. Tactical Genius.
└─ Assessment: UNQUESTIONABLY LOYAL

ADMIRAL QUONDAM QUARREN
├─ Position: Commander, Battlefleet Gothic
├─ Rank: Admiral, Imperial Navy
├─ Status: ACTIVE — SPACE SUPERIORITY COMMAND
├─ Record: 47 Years Naval Service. Zero Major Defeats.
└─ Assessment: HIGHLY COMMENDED

CHAPLAIN DREADNOUGHT MARCUS
├─ Position: Space Marine Chapter Master (ARMAGEDDON CONTINGENT)
├─ Rank: Chapter Master, Space Marines (Designation Unknown)
├─ Status: ACTIVE — GROUND OPERATIONS
├─ Record: 847 Battle Brothers Under Command
└─ Assessment: THE EMPEROR'S FINEST

FORGE-MASTER TERTIUS
├─ Position: Adeptus Mechanicus Commander
├─ Rank: Forge-Master, Mars Archival
├─ Status: ACTIVE — INDUSTRIAL OVERSIGHT
├─ Record: Restored 67% Planetary Manufacturing Capacity
└─ Assessment: MASTERWORK OF IMPERIAL ENGINEERING

[PERSONNEL REGISTRY SECURED]
      `
    },
    'threat-assessment': {
      title: 'THREAT ASSESSMENT MATRIX',
      timestamp: '999.M42',
      content: `
[IMPERIAL GUARD INTELLIGENCE — THREAT ANALYSIS]
[PREPARED BY: INQUISITOR COUNCIL]
[CLASSIFICATION: ABSOLUTE HIGHEST]

ARMAGEDDON SECTOR — STRATEGIC THREAT EVALUATION
STATUS: CRITICAL
THREAT LEVEL: MAXIMUM

═══════════════════════════════════════════════════════════

IMMEDIATE THREATS:

1. ORKS (Exterminatus Status)
   ├─ Current Force: SHATTERED — 12% Operational Capacity
   ├─ Threat Level: MODERATE-CRITICAL (Still Dangerous)
   ├─ Territory Held: Northern Hive-Peaks, Volcanic Wastes
   └─ Assessment: Sporadic Attack Groups. Regrouping Activity Detected.

2. CHAOS CORRUPTION (RISING)
   ├─ Current Force: UNKNOWN — Estimated 2,000-5,000 Cultists
   ├─ Threat Level: CRITICAL (Ideological Subversion)
   ├─ Territory Held: Deep Urban Centers, Underground Networks
   └─ Assessment: Active Recruitment. Warp Anomalies Increasing.

3. WARP DISTURBANCE
   ├─ Current Activity: ELEVATED (Unusual for Sector)
   ├─ Threat Level: EXISTENTIAL
   ├─ Manifestations: Psychic Phenomena, Temporal Distortions
   └─ Assessment: Navigator Reports: "Something Stirs. Watch the Stars."

RESOURCE SHORTAGES:
- Heavy Weapons: 46% DEFICIT
- Personnel Replacements: 67% DEFICIT
- Medical Supplies: 24% DEFICIT

RECOMMENDATION: MAXIMUM VIGILANCE. REINFORCE IMMEDIATELY.

[THREAT ASSESSMENT COMPLETE]
      `
    },
    'vox-messages': {
      title: 'VOX TRANSMISSION LOG',
      timestamp: '999.M42',
      content: `
[IMPERIAL VOX NETWORK — MESSAGE ARCHIVE]
[AUTHENTICATED: SIGNAL CORPS CLEARANCE]
[LATEST TRANSMISSIONS]

VOX MESSAGE LOG — ARMAGEDDON SECTOR
ARCHIVE STATUS: 47 ACTIVE MESSAGES
LAST UPDATED: 999.M42 - CYCLE 7732

═══════════════════════════════════════════════════════════

[PRIORITY: MAXIMUM]
TIMESTAMP: 999.M42 - HOUR 14
FROM: INQUISITOR COMMAND (CLASSIFIED SENDER)
TO: WAR GOVERNOR YARRICK
SUBJECT: URGENT — INVESTIGATE WARP ANOMALIES

"Colonel, sensors detect impossible readings from Northern Wastes.
Warp signatures that should not exist. Send contingent for investigation.
DO NOT let this reach civilian channels. Report findings immediately."

[STATUS: ACKNOWLEDGED]

─────────────────────────────────────────────────────────

[PRIORITY: HIGH]
TIMESTAMP: 999.M42 - HOUR 08
FROM: ADMIRAL QUARREN (BATTLEFLEET GOTHIC)
TO: IMPERIAL COMMAND
SUBJECT: SUPPLY SHORTAGE CRITICAL

"Command, ammunition reserves at 12% critical threshold. Next shipment
from Mars delayed by Warp Storm. Request authorization for strict rationing
protocols and ammunition synthesis at local factories."

[STATUS: APPROVED WITH RESTRICTIONS]

─────────────────────────────────────────────────────────

[PRIORITY: STANDARD]
TIMESTAMP: 999.M42 - HOUR 02
FROM: FORGE-MASTER TERTIUS (MECHANICUS)
TO: MARS TECHPRIESTS
SUBJECT: MANUFACTURING STATUS UPDATE

"Praise the Omnissiah. Planetary production now at 34% nominal capacity.
Four additional factories brought online. Estimating 45% within 30 solar days.
Will require blessed promethium and calibrated machine components."

[STATUS: RECEIVED AND FORWARDED]

─────────────────────────────────────────────────────────

[VOX ARCHIVE CONTINUES...]

[END CURRENT TRANSMISSIONS]
      `
    },
    'sector-overview': {
      title: 'SECTOR OVERVIEW — ARMAGEDDON SECTOR STATUS',
      timestamp: '999.M42',
      content: `
[ADEPTUS MECHANICUS SECTOR COMMAND]
[STRATEGIC ASSESSMENT — HOLISTIC OVERVIEW]
[AUTHORIZED PERSONNEL ONLY]

ARMAGEDDON SECTOR — COMPLETE STRATEGIC STATUS
ASSESSMENT PERIOD: 999.M41 to 999.M42
OVERALL STATUS: CRITICAL BUT STABLE

═══════════════════════════════════════════════════════════

SECTOR COMPOSITION: 8 MAJOR WORLDS

ARMAGEDDON PRIME (Primary Focus)
├─ Status: UNDER SIEGE (Orks Defeated, Chaos Rising)
├─ Population: 36.8 Billion (Heavy Casualties)
├─ Strategic Value: CRITICAL (Industrial Powerhouse)
└─ Outlook: GUARDED OPTIMISM — Situation Stabilizing

SOTHA (Industrial Partner)
├─ Status: NOMINAL
├─ Population: 2.1 Billion
├─ Function: Fuel & Lubricant Production
└─ Support: Supplying Armageddon via established trade routes

VOLCANUS, HELSREACH, DEATH MIRE, MANNHEIM, INFERNUS, TEMPESTUS
├─ Status: VARIOUS (Stable to Contested)
├─ Combined Population: 8.4 Billion
├─ Function: Mining, Agriculture, Defense Positions
└─ Coordination: Regular inter-sector communication maintained

SECTOR MILITARY STRENGTH:
- Fleet Assets: 27 Capital Vessels (Battlefleet Gothic)
- Ground Forces: 236,000 Imperial Guard + 847 Space Marines
- Fortifications: 47 Major Strongpoints (84% Operational)
- Air Support: 312 Thunderhawk Craft

SECTOR RESOURCES:
- Weapons Production: RECOVERING (34% Capacity)
- Food Supplies: SUFFICIENT (Local Vat-Growth)
- Ammunition: CRITICAL SHORTAGE
- Fuel: ADEQUATE (Thanks to Sotha)
- Personnel: WOUNDED BUT DETERMINED

STRATEGIC ASSESSMENT:
The Armageddon Sector has weathered the Ork invasion and emerged
battered but unbroken. However, new threats emerge from the darkness.
Vigilance is paramount. Faith in the Emperor provides salvation.

[SECTOR OVERVIEW COMPLETE]
      `
    },
    'crusade-orders': {
      title: 'CRUSADE ORDERS',
      timestamp: '999.M42',
      content: `
[ADEPTUS MECHANICUS ENCRYPTED TRANSMISSION]
[ORIGIN: MARS ARCHIVAL VAULT]
[AUTHORITY: INQUISITOR CADIA]

TO: ALL SPACE MARINE CHAPTERS — ARMAGEDDON SECTOR
FROM: WARMASTER IMPERIAL COMMAND
PRIORITY: ABSOLUTE HIGHEST
DATE: 999.M42

═══════════════════════════════════════════════════════════

CRUSADE DESIGNATION: EXTERMINATUS WATCH — SECTOR ARMAGEDDON

OBJECTIVE: Secure Armageddon Prime and repel all xenos incursions
ENGAGEMENT RULES: MAXIMUM PREJUDICE AUTHORIZED
REINFORCEMENT STATUS: MINIMAL — FIGHT WITH HONOR

CURRENT FORCE DISPOSITION:
- Space Marine Chapter: 847 Battle Brothers Active
- Imperial Guard: 236,000 Soldiers Deployed
- Mechanicus Forces: 2,400 Armed Adepts
- Navy Support: Battlefleet Gothic (27 Vessels)

THREAT ASSESSMENT: CRITICAL
- Ork Invasion Force: DECIMATED
- Chaos Corruption: DETECTED IN NORTHERN TERRITORIES
- Warp Activity: ELEVATED — EXTREME CAUTION ADVISED

STANDING ORDERS:
1. Hold all key positions at any cost
2. Execute purge protocols on corrupted zones
3. Rally civilian population to fortified positions
4. Report all unusual phenomena to Inquisition immediately

VICTORY CONDITION:
Achieve planetary stability and restore faith in the Emperor's light.

THE EMPEROR PROTECTS. THE EMPEROR PROVIDES. VICTORY FOR THE IMPERIUM.

[END TRANSMISSION]
      `
    },
    'supply-routes': {
      title: 'SUPPLY ROUTES — LOGISTICAL MANIFEST',
      timestamp: '999.M42',
      content: `
[ADEPTUS MECHANICUS SUPPLY DIVISION]
[CLASSIFIED: IMPERIAL EYES ONLY]
[AUTHENTICATION: QUARTERMASTER FORGE-MASTER TERTIUS]

LOGISTICAL MANIFEST — ARMAGEDDON SECTOR RESUPPLY OPERATIONS
STATUS: ACTIVE — PRIORITY ALPHA
DATE: 999.M42

═══════════════════════════════════════════════════════════

PRIMARY SUPPLY CORRIDORS:

ROUTE ALPHA (MARS → ARMAGEDDON PRIME)
├─ Departure: Forge-Mars, Sacred Archives
├─ Transit Time: 847 Days (Warp-Navigated)
├─ Cargo: 2,400 Units Ammunition, Replacement Armor, Technical Personnel
├─ Status: IN TRANSIT — ETA 3 Days
└─ Guard Detail: Two Escort Cruisers, Frigate Squadron

ROUTE BETA (CADIA → ARMAGEDDON SECTOR)
├─ Departure: Cadia Fortress, Naval Arsenal
├─ Transit Time: 312 Days (High Warp Risk Zone)
├─ Cargo: 6,200 Units Rations, Medical Supplies, Fuel Cells
├─ Status: DELAYED — Warp Storm Activity (+14 Days)
└─ Guard Detail: Battlecruiser, Three Destroyers

ROUTE GAMMA (LOCAL SUPPLY: SOTHA → ARMAGEDDON PRIME)
├─ Departure: Sotha Refinery Complex
├─ Transit Time: 8 Days (Void Stable)
├─ Cargo: 8,400 Units Fuel, Lubricants, Industrial Materials
├─ Status: NOMINAL — Next Shipment 2 Days
└─ Guard Detail: Two Armed Transport Vessels

RESOURCE ALLOCATION:
- Ammunition: 134,200 Rounds (48% Reserve)
- Rations: 2,340,000 Standard Packs (28% Reserve)
- Medical Supplies: 1,400 Surgical Kits (87% Reserve)
- Fuel Reserves: 447,000 Liters (61% Reserve)
- Replacement Armor: 2,100 Sets (34% Reserve)

CRITICAL SUPPLY SHORTAGES:
- Heavy Weapons Ammunition: 12% RESERVE (CRITICAL)
- Replacement Parts (Mechanical): 8% RESERVE (CRITICAL)
- Medical Stimulants: NORMAL LEVELS

RECOMMENDATION:
Increase shipment frequency on Route Alpha. Current reserves
insufficient for sustained combat operations beyond 180 days.

Authorization Required: WARMASTER COMMAND LEVEL CLEARANCE

[COGITATOR SEAL: VERIFIED]
[END MANIFEST]
      `
    },
    'stc-database': {
      title: 'STC DATABASE — STANDARD TEMPLATE CONSTRUCTS',
      timestamp: '999.M42',
      content: `
[ADEPTUS MECHANICUS SACRED ARCHIVE]
[RESTRICTED: TECH-PRIEST LEVEL CLEARANCE REQUIRED]
[OMNISSIAH PROTECT THESE HOLY DESIGNS]

STANDARD TEMPLATE CONSTRUCT DATABASE — ARMAGEDDON FORGE
ARCHIVE STATUS: INCOMPLETE (MANY LOST IN ANTIQUITY)
PRESERVED BLUEPRINTS: 47 FUNCTIONAL DESIGNS
DATE LAST UPDATED: 999.M41

═══════════════════════════════════════════════════════════

WEAPONS SYSTEMS — PRESERVED DESIGNS:

STC-BOLT-001 "DIVINE VENGEANCE"
├─ Classification: Bolter Pattern
├─ Caliber: .75 Mantlet Standard
├─ Rate of Fire: 500 RPM (Sustained)
├─ Effective Range: 300m
├─ Status: ACTIVELY MANUFACTURED
└─ Notes: Blessed by Tech-Priests, Used by Space Marines

STC-LASCANNON-014 "PHOTONIC FURY"
├─ Classification: Lascannon Pattern (Anti-Tank)
├─ Power Output: 15 Megajoules per discharge
├─ Effective Range: 1,500m (Line of Sight)
├─ Status: ACTIVELY MANUFACTURED
└─ Notes: Critical for planetary defense, ammunition scarce

STC-MELTA-007 "FLAME OF JUDGMENT"
├─ Classification: Melta Gun Pattern (Thermal Weapon)
├─ Effective Range: 12m (Optimal), 24m (Extended)
├─ Power Output: Extreme (Melts Ceramite Armor)
├─ Status: LIMITED PRODUCTION
└─ Notes: Requires specialized coolant chambers

STC-FLAMER-003 "PURIFIER'S GRACE"
├─ Classification: Flamer Pattern (Incendiary)
├─ Effective Range: 20m (Spray Pattern)
├─ Fuel Capacity: 5 Liters Promethium
├─ Status: ACTIVELY MANUFACTURED
└─ Notes: Heretics burn in the Emperor's flame

STC-MISSILE-042 "EMPEROR'S JUDGMENT"
├─ Classification: Missile Launcher Pattern (Multi-Warhead)
├─ Effective Range: 2,000m+
├─ Warhead Payload: 8 Fragmentation or 4 Anti-Tank
├─ Status: ACTIVELY MANUFACTURED
└─ Notes: Versatile platform, ammunition production critical

═══════════════════════════════════════════════════════════

ARMOR SYSTEMS — PRESERVED DESIGNS:

STC-ARMOR-MARINE-001 "MARK X TACTICAL"
├─ Classification: Power Armor Pattern (Space Marine Grade)
├─ Material Composition: Ceramite + Adamantite Composite
├─ Threat Protection: Extreme (Ballistic and Energy)
├─ Status: ACTIVELY MANUFACTURED (Limited Capacity)
└─ Notes: Blessed armor grants resilience and glory

STC-ARMOR-GUARD-089 "CATACHAN FATIGUES"
├─ Classification: Combat Bodysuit (Imperial Guard)
├─ Material: Reinforced Synthetic Fibers
├─ Threat Protection: Moderate (Small Arms Resistance)
├─ Status: ACTIVELY MANUFACTURED
└─ Notes: Light and mobile, proven in thousand campaigns

═══════════════════════════════════════════════════════════

VEHICLE SYSTEMS — PRESERVED DESIGNS:

STC-TANK-LEMAN-RUSS-001 "EMPEROR'S HAMMER"
├─ Classification: Main Battle Tank
├─ Primary Armament: Vanquisher Cannon (Plasma Core)
├─ Secondary: Hull-Mounted Heavy Bolter
├─ Armor: Heavy Frontal (Sloped Ceramite Plating)
├─ Status: ACTIVELY MANUFACTURED
└─ Notes: Workhorse of Imperial Guard, dozens produced yearly

STC-TRANSPORT-CHIMERA-044 "TROOP CARRIER"
├─ Classification: Armored Personnel Carrier
├─ Capacity: 12 Fully Armed Soldiers
├─ Armament: Turret-Mounted Heavy Bolter
├─ Speed: 90 km/h (Terrain Dependent)
├─ Status: ACTIVELY MANUFACTURED
└─ Notes: Reliable transport for battlefield deployment

STC-WALKER-SENTINEL-088 "SCOUT WALKER"
├─ Classification: Light Combat Walker (Two Legs)
├─ Armament: Lascannon or Multi-Laser Mount
├─ Height: 4.2 Meters
├─ Status: ACTIVELY MANUFACTURED
└─ Notes: Mobile fire support, excellent reconnaissance

═══════════════════════════════════════════════════════════

SPACECRAFT SYSTEMS — PRESERVED DESIGNS:

STC-SHIP-EMPEROR-CLASS-001 "BATTLESHIP TEMPLATE"
├─ Classification: Imperial Battleship (Capital Ship)
├─ Crew Capacity: 47,000+ Personnel
├─ Armament: 40+ Macrocannon Batteries
├─ Warp Engines: Mars-Pattern Gellar Field Generator
├─ Status: ANCIENT DESIGN (Rarely Manufactured)
└─ Notes: Pride of the Imperial Fleet, each worth a sector

STC-SHIP-TRANSPORT-GENERIC-034 "MERCHANT HAULER"
├─ Classification: Cargo Transport (Civilian/Military)
├─ Cargo Capacity: 50,000 Tons
├─ Crew: 2,400 Essential Personnel
├─ Status: ACTIVELY MANUFACTURED
└─ Notes: Supply lifeline of the Imperium

═══════════════════════════════════════════════════════════

MEDICAL & SUPPORT — PRESERVED DESIGNS:

STC-MEDICAL-STIMULANT-112 "EMPEROR'S VIGOR"
├─ Classification: Combat Stim Injection
├─ Effect: Restores Consciousness, Dulls Pain
├─ Duration: 4-6 Hours
├─ Status: ACTIVELY MANUFACTURED
└─ Notes: Field medicine standard issue

STC-POWER-GENERATOR-PORTABLE-778 "OMNISSIAH'S SPARK"
├─ Classification: Portable Power Cell
├─ Output: 5 Kilowatts (Sustained)
├─ Lifespan: 40 Years (Blessed)
├─ Status: CAREFULLY PRESERVED
└─ Notes: Rare. Ancient design. Treat as holy relic.

═══════════════════════════════════════════════════════════

SACRED NOTATION:
Many STCs have been lost to the ravages of time and heresy.
These preserved designs are the foundation of Imperial military might.
To lose an STC is to lose an era of human achievement.

The Omnissiah guides our hands to manufacture these holy patterns.
May we never forget the knowledge of the Dark Age of Technology.

[ARCHIVE SEALED BY ORDER OF FORGE-MASTER TERTIUS]
[OMNISSIAH PROTECTS THIS DATABASE]
      `
    }
  }

  const file_data = fileContent[file] || { title: 'UNKNOWN', content: 'File not found' }

  return (
    <div className="w-full max-w-2xl bg-[#0a1a0a] border-2 border-[#39ff14] shadow-[0_0_20px_#39ff14]">
      {/* Modal Header */}
      <div className="border-b-2 border-[#39ff14] bg-[#0d220d] px-4 py-3 flex justify-between items-center">
        <div className="text-sm tracking-widest uppercase terminal-glow">
          ▸ {file_data.title}
        </div>
        <button
          onClick={onClose}
          className="text-[#39ff14] hover:bg-[#1a3a1a] px-3 py-1 border border-[#39ff14] cursor-pointer text-xs tracking-wider"
        >
          [CLOSE]
        </button>
      </div>

      {/* Modal Content */}
      <div className="p-4 max-h-96 overflow-auto">
        <pre className="text-xs text-[#39ff14] font-mono whitespace-pre-wrap break-words">
          {file_data.content}
        </pre>
      </div>

      {/* Modal Footer */}
      <div className="border-t border-[#166534] bg-[#0d220d] px-4 py-2 text-xs text-[#166534]">
        [TIMESTAMP: {file_data.timestamp}] [ACCESS LEVEL: ALPHA]
      </div>
    </div>
  )
}

function PlanetModal({ planet, onClose }) {
  const planetData = {
    'Armageddon': {
      title: 'ARMAGEDDON PRIME — INDUSTRIAL HIvE WORLD',
      type: 'Hive World (Industrial)',
      status: 'Under Reconstruction',
      population: '36.8 Billion (Pre-Invasion: 48.2B)',
      coordinates: 'Segmentum Obscurus - Armageddon Sector',
      description: `
PLANETARY RECORD — ARMAGEDDON PRIME

DESIGNATION: Armageddon Prime (Primary World)
CLASSIFICATION: Hive World, Industrial
GRID COORDINATES: Segmentum Obscurus - Armageddon Sector
DISTANCE FROM TERRA: 7,843 Light-Years

PHYSICAL CHARACTERISTICS:
- Diameter: 11,400 km (90% Earth Standard)
- Gravity: 1.2 G Standard
- Atmosphere: Toxic — Requires Protective Equipment
- Temperature: Extreme Average 78°C (Surface: 140°C+)
- Hydrological Coverage: 23% (Heavily Polluted)

CURRENT STATUS: RECOVERING FROM ORK INVASION
- Population Loss: 11.4 Billion
- Manufacturing Capacity: 34% (Recovering)
- Military Assets: 236,000 Imperial Guard, 847 Space Marines
- Fleet Support: Battlefleet Gothic (27 Vessels)

STRATEGIC IMPORTANCE: CRITICAL
Primary weapons manufacturing hub for Armageddon Sector.
Essential supply line for surrounding imperial worlds.

MAJOR HIVE CITIES:
- Hive Infernus (Capital)
- Armageddon (Secondary)
- Volcanus (Tertiary)
- Helsreach (Fortress)

IMPERIAL TITHE: Exactis Tertius (One-Third Production)
TITHE STATUS: CRITICAL — Production at Recovery Phase

GOVERNOR: Colonel Sebastien Yarrick (Acting War Governor)
MILITARY COMMANDER: Admiral Quarren (Battlefleet Gothic)
      `
    },
    'Sotha': {
      title: 'SOTHA — INDUSTRIAL WORLD',
      type: 'Industrial World',
      status: 'Nominal - Operational',
      population: '2.1 Billion',
      coordinates: 'Armageddon Sector - Alpha Quadrant',
      description: `
PLANETARY RECORD — SOTHA

DESIGNATION: Sotha
CLASSIFICATION: Industrial World
SECTOR: Armageddon Sector (Alpha Position)
STATUS: FULLY OPERATIONAL

WORLD FUNCTION: Fuel and Lubricant Production
SPECIALIZATION: Promethium Refinery, Industrial Lubricants

PHYSICAL CHARACTERISTICS:
- Gravity: 1.0 G (Earth Standard)
- Atmosphere: Breathable (Industrial Pollutants Present)
- Temperature: Moderate (Average 24°C)
- Hydrological: 40% Water Coverage

POPULATION: 2.1 Billion (Stable)
POPULATION CENTERS: Three Major Refinery Cities

PRODUCTION CAPABILITY:
- Promethium Output: 447,000 Liters/Solar Day
- Lubricant Production: 120,000 Units/Solar Day
- Status: MAXIMUM EFFICIENCY

STRATEGIC ROLE: Supply Corridor Beta
Supplies fuel for Battlefleet Gothic and Armageddon Prime operations.
Critical supply line for entire sector stability.

MILITARY GARRISON: 2,400 Imperial Guard (Defense Force)
VOID DEFENSE: Light Cruiser + 3 Escort Frigates

EXPORT ROUTES:
- Primary: Armageddon Prime (Daily Shipments)
- Secondary: Regional Sector Support
- Tertiary: Mars Supply Route (Via Warp)

THREAT LEVEL: LOW
Minimal xenos activity. Stable imperial control.
      `
    },
    'Volcanus': {
      title: 'VOLCANUS — MINING WORLD',
      type: 'Mining World',
      status: 'Contested - Volcanic Activity',
      population: '890 Million',
      coordinates: 'Armageddon Sector - Eastern Territory',
      description: `
PLANETARY RECORD — VOLCANUS

DESIGNATION: Volcanus
CLASSIFICATION: Mining World (Volcanic)
STATUS: CONTESTED - Active Volcanic Zones

WORLD FUNCTION: Mineral Ore Extraction
PRIMARY RESOURCE: Adamantite, Iron Ore, Ceramite

PHYSICAL CHARACTERISTICS:
- Gravity: 1.3 G (Higher than Standard)
- Atmosphere: Toxic Ash and Sulfur Compounds
- Temperature: Extreme (Average 156°C)
- Volcanic Activity: Continuous
- Hydrological: Minimal (3% Coverage)

POPULATION: 890 Million
DISTRIBUTION: Underground Mining Cities (2 Major Hives)

MINING OPERATIONS:
- Adamantite Extraction: 15,000 Tons/Solar Day
- Iron Ore Production: 42,000 Tons/Solar Day
- Processing Facilities: 47 Active Plants

CURRENT CHALLENGES:
- Volcanic Disruptions: 23% Downtime
- Infrastructure Damage: 34% Requiring Repair
- Labor Shortage: 18% Understaffed

MILITARY PRESENCE: 1,800 Imperial Guard
FORTIFICATIONS: 12 Defensive Strongpoints

SUPPLY STATUS:
Maintained via armored transport convoys.
Volcanic eruptions cause supply route disruptions.

THREAT ASSESSMENT: MEDIUM
Sporadic Ork activity in northern territory.
Primary threat: Environmental hazards.
      `
    },
    'Infernus': {
      title: 'INFERNUS — SECONDARY FORGE WORLD',
      type: 'Forge World (Secondary)',
      status: 'Recovering - Infrastructure Damaged',
      population: '3.2 Billion',
      coordinates: 'Armageddon Sector - Southern Territory',
      description: `
PLANETARY RECORD — INFERNUS

DESIGNATION: Infernus
CLASSIFICATION: Secondary Forge World
STATUS: RECOVERING FROM INVASION DAMAGE

WORLD FUNCTION: Tech Manufacturing and Repair
SPECIALIZATION: Weapons Production, Electronics Manufacturing

PHYSICAL CHARACTERISTICS:
- Gravity: 1.1 G (Near Standard)
- Atmosphere: Dense Industrial Haze
- Temperature: Hot (Average 52°C)
- Hydrological: 18% Coverage (Polluted)

POPULATION: 3.2 Billion
MAJOR CITIES: Infernus Prime (Capital), Tech-Citadel

MANUFACTURING CAPACITY:
- Current Production: 28% of Pre-War Levels
- Weapons Output: 12,400 Units/Solar Day
- Electronic Components: 8,700 Units/Solar Day

INFRASTRUCTURE STATUS:
- Damage Assessment: 67% of Facilities Operational
- Repair Schedule: 120 Solar Days to 60% Capacity
- Materials Needed: Critical shortage of replacement parts

ADEPTUS MECHANICUS PRESENCE:
- Forge-Priests: 1,200 Active
- Military Forces: 890 Armed Adepts
- Research Division: 340 Personnel

RECENT HISTORY:
Heavily damaged during Ork invasion. Now under intensive reconstruction
led by Adeptus Mechanicus forces with support from Imperial Guard.

THREAT LEVEL: HIGH
Ongoing Chaos corruption detected in underground networks.
Ork remnants still active in surrounding regions.
      `
    },
    'Helsreach': {
      title: 'HELSREACH — FORTRESS WORLD',
      type: 'Fortress World',
      status: 'Active Defense - Fortified',
      population: '5.6 Billion',
      coordinates: 'Armageddon Sector - Western Bastion',
      description: `
PLANETARY RECORD — HELSREACH

DESIGNATION: Helsreach
CLASSIFICATION: Fortress World
STATUS: MAXIMUM DEFENSIVE POSTURE

WORLD FUNCTION: Strategic Military Stronghold
SPECIALIZATION: Planetary Defense, Military Command

PHYSICAL CHARACTERISTICS:
- Gravity: 0.9 G (Slightly Lower than Standard)
- Atmosphere: Breathable (Mountain Winds Strong)
- Temperature: Cold (Average 8°C)
- Terrain: Mountainous (75% Coverage)
- Hydrological: 22% Glacial Water

POPULATION: 5.6 Billion (Highly Militarized)
MILITARY GARRISON: 47,000 Imperial Guard (Active Deployment)
SPACE MARINE CONTINGENT: 200 Battle Brothers (Garrison Force)

FORTIFICATIONS:
- Ground Defenses: 23 Major Strongpoints
- Orbital Defense: 3 Defense Satellites
- Void Shield Generators: 8 Functional
- Air Defense: 156 AA Batteries

STRATEGIC IMPORTANCE: CRITICAL
Mountain stronghold provides defensive depth for sector.
Command center for regional military operations.

MANUFACTURING: Ammunition and Munitions Only
- Capacity: 34,200 Rounds/Solar Day
- Status: OPERATING AT MAXIMUM

THREAT LEVEL: HIGH
Constant Ork probing attacks from northern territories.
Fortress has repelled 7 major assaults in past 90 days.

MORALE: EXCELLENT - Legendary Defender Yarrick Previously Stationed
      `
    },
    'Death Mire': {
      title: 'DEATH MIRE — SWAMP WORLD',
      type: 'Swamp World',
      status: 'Unexplored - High Danger',
      population: '340 Million (Sparse)',
      coordinates: 'Armageddon Sector - Uncharted Territory',
      description: `
PLANETARY RECORD — DEATH MIRE

DESIGNATION: Death Mire
CLASSIFICATION: Swamp World (Dangerous)
STATUS: LARGELY UNEXPLORED - RESTRICTED ACCESS

WORLD FUNCTION: Research Outpost and Biological Study
SPECIALIZATION: Xenobiology, Unknown Flora/Fauna

PHYSICAL CHARACTERISTICS:
- Gravity: 1.15 G
- Atmosphere: Oxygen-Rich but Highly Toxic
- Temperature: Warm and Humid (Average 31°C)
- Terrain: 87% Swampland and Marshes
- Hydrological: 91% Water Coverage (Acidic)

POPULATION: 340 Million (Concentrated in 2 Research Domes)
SETTLEMENT TYPE: Research Enclaves (NOT Population Centers)

BIOLOGICAL HAZARDS:
- Unknown Predators: Numerous (Unclassified)
- Toxic Flora: Widespread (Caustic Spores)
- Parasitic Organisms: Extremely Common
- Environmental Hazard: Extreme Toxicity

RESEARCH OPERATIONS:
- Adeptus Mechanicus Presence: 800 Researchers
- Biological Specimens: 450+ Catalogued Species
- Research Status: ONGOING (CLASSIFIED)

MILITARY PRESENCE: Minimal
- Defense Force: 200 Imperial Guard (Perimeter Only)
- Orbital Surveillance: Continuous

RESTRICTIONS: ABSOLUTE
Unauthorized personnel forbidden. Armed escort required.
Multiple expeditions have gone missing or returned with severe mutations.

STRATEGIC VALUE: UNKNOWN
Purpose of research remains classified by Inquisition.

THREAT ASSESSMENT: EXTREME
Recommend maximum caution. Unknown biological threats.
      `
    },
    'Mannheim': {
      title: 'MANNHEIM — RESEARCH STATION',
      type: 'Research Station',
      status: 'Active Research - Classified',
      population: '450 Million',
      coordinates: 'Armageddon Sector - Orbital Installation',
      description: `
PLANETARY RECORD — MANNHEIM

DESIGNATION: Mannheim
CLASSIFICATION: Adeptus Mechanicus Research Station
STATUS: ACTIVE - RESTRICTED ACCESS

WORLD FUNCTION: Advanced Scientific Research
SPECIALIZATION: Forbidden Technology, Ancient Artifacts, STC Analysis

PHYSICAL CHARACTERISTICS:
- Gravity: 0.8 G (Lower than Standard)
- Atmosphere: Thin but Breathable (Artificial Supplements Required)
- Temperature: Moderate (Average 18°C)
- Terrain: Barren Rocky Desert
- Hydrological: 5% Underground Aquifers

POPULATION: 450 Million (Majority Research Personnel)
PERMANENT RESIDENTS: 250,000 (Support Staff)
RESEARCH STAFF: 189,000 (Tech-Priests and Adepts)

RESEARCH DIVISIONS:
- Ancient Technology Recovery: 3,400 Personnel
- STC Database Analysis: 2,100 Personnel
- Forbidden Knowledge Archive: 1,800 Personnel
- Artifact Preservation: 1,200 Personnel

MAJOR RESEARCH PROJECTS:
[HIGHLY CLASSIFIED]
- Project Designation: UNKNOWN
- Security Level: INQUISITION CLEARANCE ONLY
- Status: ONGOING

MILITARY GARRISON:
- Imperial Guard: 8,200 (Heavily Armed)
- Space Marine Contingent: 50 Battle Brothers
- PDF Forces: 12,000 (Facility Security)

SECURITY PROTOCOLS: EXTREME
- Multiple Void Shields
- Orbital Defense Platform
- Automated Defense Systems
- Psychic Wards (Suspected)

THREAT LEVEL: CLASSIFIED
Information restricted to Inquisition and High Command.

COMMUNICATION: Limited (Encrypted Channels Only)
      `
    },
    'Tempestus': {
      title: 'TEMPESTUS — AGRI-WORLD',
      type: 'Agri-World',
      status: 'Stable - Agricultural Production',
      population: '1.8 Billion',
      coordinates: 'Armageddon Sector - Southern Region',
      description: `
PLANETARY RECORD — TEMPESTUS

DESIGNATION: Tempestus
CLASSIFICATION: Agricultural World
STATUS: STABLE - PRODUCTION NOMINAL

WORLD FUNCTION: Sector Food Supply
SPECIALIZATION: Vat-Grown Agriculture, Protein Production

PHYSICAL CHARACTERISTICS:
- Gravity: 1.0 G (Earth Standard)
- Atmosphere: Breathable (Excellent Quality)
- Temperature: Temperate (Average 18°C)
- Terrain: 60% Farmland, 30% Forest, 10% Urban
- Hydrological: 35% Water Coverage (Fresh)

POPULATION: 1.8 Billion (Primarily Agricultural Workers)
MAJOR SETTLEMENTS: 8 Agricultural Collective Cities

AGRICULTURAL OUTPUT:
- Grain Production: 2.4 Million Tons/Solar Year
- Protein Synthesis (Vat): 890,000 Tons/Solar Year
- Vegetable Production: 1.2 Million Tons/Solar Year
- Status: 95% OF SECTOR DEMAND SATISFIED

EQUIPMENT:
- Agricultural Machinery: Modern (75% Operational)
- Processing Plants: 34 Facilities
- Storage Silos: 156 Major Installations

SUPPLY NETWORK:
- Primary Export: Armageddon Prime (40% Output)
- Secondary: Sector-Wide Distribution (60% Output)
- Transport Frequency: Daily Shipments via Void-Safe Routes

MILITARY PRESENCE: Minimal
- Garrison: 1,200 Imperial Guard (Defense Force)
- Purpose: Bandit Suppression and Perimeter Security

THREAT LEVEL: LOW
Minimal xenos activity. Stable imperial control maintained.
Agricultural world remains profitable and essential for sector survival.

MORALE: EXCELLENT - Citizens Fed and Content
      `
    }
  }

  const data = planetData[planet] || {
    title: 'UNKNOWN WORLD',
    type: 'Unknown Classification',
    status: 'Unclassified',
    population: 'Unknown',
    coordinates: 'Unknown',
    description: 'Planet data not found in archives.'
  }

  return (
    <div className="w-full max-w-2xl bg-[#0a1a0a] border-2 border-[#39ff14] shadow-[0_0_20px_#39ff14] max-h-[85vh] flex flex-col">
      {/* Modal Header */}
      <div className="border-b-2 border-[#39ff14] bg-[#0d220d] px-4 py-3 flex justify-between items-center">
        <div className="text-sm tracking-widest uppercase terminal-glow">
          ▸ {data.title}
        </div>
        <button
          onClick={onClose}
          className="text-[#39ff14] hover:bg-[#1a3a1a] px-3 py-1 border border-[#39ff14] cursor-pointer text-xs tracking-wider"
        >
          [CLOSE]
        </button>
      </div>

      {/* Planet Summary Bar */}
      <div className="border-b border-[#166534] bg-[#0d220d] px-4 py-2 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
        <div>
          <div className="text-[#166534] uppercase tracking-wider">Type</div>
          <div className="text-[#39ff14]">{data.type}</div>
        </div>
        <div>
          <div className="text-[#166534] uppercase tracking-wider">Status</div>
          <div className="text-[#39ff14]">{data.status}</div>
        </div>
        <div>
          <div className="text-[#166534] uppercase tracking-wider">Population</div>
          <div className="text-[#39ff14] text-xs">{data.population}</div>
        </div>
        <div>
          <div className="text-[#166534] uppercase tracking-wider">Coordinates</div>
          <div className="text-[#39ff14] text-xs">{data.coordinates}</div>
        </div>
      </div>

      {/* Planet Details */}
      <div className="flex-1 overflow-auto p-4">
        <pre className="text-xs text-[#39ff14] font-mono whitespace-pre-wrap break-words">
          {data.description}
        </pre>
      </div>

      {/* Modal Footer */}
      <div className="border-t border-[#166534] bg-[#0d220d] px-4 py-2 text-xs text-[#166534]">
        [PLANETARY DATABASE] [ACCESS LEVEL: ALPHA] [ARCHIVE STATUS: ONLINE]
      </div>
    </div>
  )
}

function ArchiveSearchModal({ searchQuery, setSearchQuery, searchCategory, setSearchCategory, onClose }) {
  const getItemImage = (category, itemName) => {
    const images = {
      'space-marine-chapters': {
        'Black Templars': '⚔️',
        'Blood Angels': '⚡',
        'Ultramarines': '🛡️',
        'Space Wolves': '🐺',
        'Dark Angels': '🌙',
        'Salamanders': '🔥',
        'Iron Hands': '⚙️',
        'Raven Guard': '🦅',
        'Imperial Fists': '✊',
        'White Scars': '⚡'
      },
      'tyranids': {
        'Carnifex': '🦖',
        'Hive Tyrant': '👑',
        'Termagant': '🦗',
        'Ripper Swarm': '🐛',
        'Gargoyle': '🦇',
        'Ravenor': '👁️',
        'Pyrovore': '🔥',
        'Toxicrene': '☢️',
        'Barbed Strangler': '🎯',
        'Harpy': '🦅'
      },
      'necrons': {
        'Necron Overlord': '👑',
        'Immortal': '💀',
        'Necron Warrior': '🤖',
        'Canoptek Wraith': '👻',
        'Triarch Praetorian': '⚔️',
        'Cryptek': '🔮',
        'Tomb Blade': '⚡',
        'Scarab Swarm': '🐜',
        'Lychguard': '🛡️',
        'Spyder': '🕷️'
      },
      'locations': {
        'Armageddon Prime': '🌍',
        'Sotha': '⚙️',
        'Helsreach': '🏰',
        'Volcanus': '🌋',
        'Tempestus': '🌾',
        'Death Mire': '☠️',
        'Infernus': '🔥',
        'Mannheim': '🔬',
        'Cadia Fortress': '🏯',
        'Mars Archival': '📚'
      },
      'weapons': {
        'Bolter': '🔫',
        'Plasma Gun': '⚡',
        'Lascannon': '🔴',
        'Melta Gun': '🔥',
        'Flamer': '🔥',
        'Gauss Flayer': '🌟',
        'Tesla Carbine': '⚡',
        'Shuriken Catapult': '🌀',
        'Heavy Bolter': '💥',
        'Missile Launcher': '🚀'
      }
    }
    
    return images[category]?.[itemName] || '■'
  }

  const searchDatabase = {
    'space-marine-chapters': [
      { name: 'Black Templars', specialty: 'Close Combat Specialists', strength: '1,000 Battle Brothers' },
      { name: 'Blood Angels', specialty: 'Assault Doctrine', strength: '750 Battle Brothers' },
      { name: 'Ultramarines', specialty: 'Codex Adherents', strength: '1,200 Battle Brothers' },
      { name: 'Space Wolves', specialty: 'Melee Combat, Fenrisian Tactics', strength: '850 Battle Brothers' },
      { name: 'Dark Angels', specialty: 'Deathwing Knights, Ravenwing Riders', strength: '1,000 Battle Brothers' },
      { name: 'Salamanders', specialty: 'Heavy Weapons, Flamer Doctrine', strength: '900 Battle Brothers' },
      { name: 'Iron Hands', specialty: 'Cybernetics, Tech-Marines', strength: '800 Battle Brothers' },
      { name: 'Raven Guard', specialty: 'Stealth Operations, Rapid Strikes', strength: '700 Battle Brothers' },
      { name: 'Imperial Fists', specialty: 'Siege Warfare, Fortifications', strength: '950 Battle Brothers' },
      { name: 'White Scars', specialty: 'Swift Attacks, Biker Squadrons', strength: '875 Battle Brothers' }
    ],
    'tyranids': [
      { name: 'Carnifex', classification: 'Heavy Bio-Organism', threat: 'CRITICAL', description: 'Massive creature with bio-weapons' },
      { name: 'Hive Tyrant', classification: 'Alpha Predator', threat: 'EXTREME', description: 'Command organism with psyker abilities' },
      { name: 'Termagant', classification: 'Swarm Infantry', threat: 'MODERATE', description: 'Basic warrior organism' },
      { name: 'Ripper Swarm', classification: 'Small Biomorph', threat: 'LOW', description: 'Pack hunters, feral and savage' },
      { name: 'Gargoyle', classification: 'Flying Bio-Form', threat: 'HIGH', description: 'Aerial assault organism with talons' },
      { name: 'Ravenor', classification: 'Psychic Predator', threat: 'CRITICAL', description: 'Warp-sensitive creature with mind control' },
      { name: 'Pyrovore', classification: 'Bio-Artillery', threat: 'HIGH', description: 'Spews corrosive bio-acid' },
      { name: 'Toxicrene', classification: 'Chemical Weapon', threat: 'EXTREME', description: 'Releases toxic spores and mist' },
      { name: 'Barbed Strangler', classification: 'Ranged Bio-Weapon', threat: 'CRITICAL', description: 'Fires flesh-seeking projectiles' },
      { name: 'Harpy', classification: 'Flying Warrior', threat: 'HIGH', description: 'Swift aerial combatant' }
    ],
    'necrons': [
      { name: 'Necron Overlord', classification: 'Ancient Aristocrat', tier: 'Royal', description: 'Commands legions with Tesla technology' },
      { name: 'Immortal', classification: 'Elite Guard', tier: 'High', description: 'Gauss weapon specialist with phase-out regeneration' },
      { name: 'Necron Warrior', classification: 'Standard Infantry', tier: 'Common', description: 'Armed with gauss flayer rifles' },
      { name: 'Canoptek Wraith', classification: 'Phase-Shift Predator', tier: 'High', description: 'Phases through matter, melee focused' },
      { name: 'Triarch Praetorian', classification: 'Ancient Guard', tier: 'Royal', description: 'Voidblade armed, impossibly swift' },
      { name: 'Cryptek', classification: 'Sorcerer-Scientist', tier: 'Royal', description: 'Wields arcane technology and forbidden science' },
      { name: 'Tomb Blade', classification: 'Anti-Gravity Fighter', tier: 'High', description: 'Swift jetbike with tesla carbine' },
      { name: 'Scarab Swarm', classification: 'Small Construct', tier: 'Low', description: 'Regenerates destroyed units' },
      { name: 'Lychguard', classification: 'Phalanx Guardian', tier: 'High', description: 'Protects royalty with shields' },
      { name: 'Spyder', classification: 'Canoptek Constructor', tier: 'High', description: 'Repairs damaged units in combat' }
    ],
    'locations': [
      { name: 'Armageddon Prime', type: 'Hive World', status: 'War-Torn', description: 'Primary manufacturing hub, Ork-invaded, under reconstruction' },
      { name: 'Sotha', type: 'Industrial World', status: 'Nominal', description: 'Fuel and lubricant production facility' },
      { name: 'Helsreach', type: 'Fortress World', status: 'Active Defense', description: 'Mountain fortifications, strategic stronghold' },
      { name: 'Volcanus', type: 'Mining World', status: 'Contested', description: 'Mineral extraction, high volcanic activity' },
      { name: 'Tempestus', type: 'Agri-World', status: 'Stable', description: 'Agricultural production for sector supply' },
      { name: 'Death Mire', type: 'Swamp World', status: 'Unexplored', description: 'Toxic marshlands, unknown biota' },
      { name: 'Infernus', type: 'Forge World (Secondary)', status: 'Recovering', description: 'Tech-manufacturing, damaged infrastructure' },
      { name: 'Mannheim', type: 'Research Station', status: 'Active', description: 'Adeptus Mechanicus research facility' },
      { name: 'Cadia Fortress', type: 'Fortress World', status: 'Strategic', description: 'Imperial stronghold, supply depot' },
      { name: 'Mars Archival', type: 'Sacred Forge', status: 'Command', description: 'Adeptus Mechanicus primary world' }
    ],
    'weapons': [
      { name: 'Bolter', type: 'Assault Rifle', caliber: '.75M', description: 'Standard Space Marine weapon, explosive rounds' },
      { name: 'Plasma Gun', type: 'Energy Weapon', power: 'Extreme', description: 'Superheated plasma projectiles, risk of overcharge' },
      { name: 'Lascannon', type: 'Anti-Tank Weapon', power: 'Extreme', description: 'Focused laser beam, melts armor' },
      { name: 'Melta Gun', type: 'Thermal Weapon', power: 'Critical Range', description: 'Extreme heat, effective close range only' },
      { name: 'Flamer', type: 'Incendiary Weapon', range: 'Close', description: 'Promethium jets, ignites targets' },
      { name: 'Gauss Flayer', type: 'Alien Rifle', technology: 'Necron', description: 'Disintegrates matter molecularly' },
      { name: 'Tesla Carbine', type: 'Alien Weapon', technology: 'Necron', description: 'Chain lightning generator' },
      { name: 'Shuriken Catapult', type: 'Alien Rifle', technology: 'Aeldari', description: 'Mono-molecular discs' },
      { name: 'Heavy Bolter', type: 'Crew-Served Weapon', power: 'High', description: 'Sustained fire anti-infantry weapon' },
      { name: 'Missile Launcher', type: 'Anti-Everything', ordnance: 'High Explosive', description: 'Versatile launcher, multiple munition types' }
    ]
  }

  const categories = [
    { key: 'all', label: 'All Categories' },
    { key: 'space-marine-chapters', label: 'Space Marine Chapters' },
    { key: 'tyranids', label: 'Tyranids' },
    { key: 'necrons', label: 'Necrons' },
    { key: 'locations', label: 'Locations' },
    { key: 'weapons', label: 'Weapons' }
  ]

  // Filter results based on search query and category
  const getSearchResults = () => {
    let results = []
    const query = searchQuery.toLowerCase()

    const categoriesToSearch = searchCategory === 'all' 
      ? Object.keys(searchDatabase)
      : [searchCategory]

    categoriesToSearch.forEach(cat => {
      const items = searchDatabase[cat] || []
      items.forEach(item => {
        const searchText = JSON.stringify(item).toLowerCase()
        if (query === '' || searchText.includes(query)) {
          results.push({ category: cat, ...item })
        }
      })
    })

    return results
  }

  const results = getSearchResults()

  return (
    <div className="w-full max-w-3xl bg-[#0a1a0a] border-2 border-[#39ff14] shadow-[0_0_20px_#39ff14] max-h-[90vh] flex flex-col">
      {/* Modal Header */}
      <div className="border-b-2 border-[#39ff14] bg-[#0d220d] px-4 py-3 flex justify-between items-center">
        <div className="text-sm tracking-widest uppercase terminal-glow">
          ▸ ARCHIVE SEARCH DATABASE
        </div>
        <button
          onClick={onClose}
          className="text-[#39ff14] hover:bg-[#1a3a1a] px-3 py-1 border border-[#39ff14] cursor-pointer text-xs tracking-wider"
        >
          [CLOSE]
        </button>
      </div>

      {/* Search Bar */}
      <div className="border-b border-[#166534] bg-[#0d220d] px-4 py-3">
        <input
          type="text"
          placeholder="Search archive... (e.g., 'Ultramarines', 'Carnifex', 'Bolter')"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#0a1a0a] border border-[#39ff14] text-[#39ff14] px-3 py-2 focus:outline-none text-sm font-mono"
        />
      </div>

      {/* Category Tabs */}
      <div className="border-b border-[#166534] bg-[#0d220d] flex flex-wrap text-xs overflow-x-auto">
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setSearchCategory(cat.key)}
            className={`px-3 py-2 border-r border-[#166534] cursor-pointer transition-colors ${
              searchCategory === cat.key
                ? 'bg-[#1a3a1a] text-[#39ff14] terminal-glow'
                : 'text-[#166534] hover:bg-[#0d220d] hover:text-[#39ff14]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search Results */}
      <div className="flex-1 overflow-auto p-4">
        {results.length === 0 ? (
          <div className="text-[#166534] text-center py-8">
            {searchQuery ? '[NO RESULTS FOUND]' : '[ENTER SEARCH QUERY]'}
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((result, idx) => {
              const categoryLabel = categories.find(c => c.key === result.category)?.label || 'Unknown'
              const image = getItemImage(result.category, result.name)
              return (
                <div key={idx} className="border border-[#166534] bg-[#0d220d] p-3 flex gap-3">
                  {/* Image */}
                  <div className="text-4xl flex-shrink-0 flex items-center justify-center w-16 h-16 border-2 border-[#39ff14] bg-[#0d220d] text-[#39ff14] font-bold" style={{ textShadow: '0 0 10px #39ff14', boxShadow: '0 0 15px rgba(57, 255, 20, 0.3)' }}>
                    {image}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="text-[#39ff14] font-bold text-sm terminal-glow mb-1">
                      {result.name}
                    </div>
                    <div className="text-xs text-[#166534] mb-2 tracking-wider">
                      [{categoryLabel}]
                    </div>
                    <div className="text-xs text-[#39ff14] space-y-1">
                      {Object.entries(result).map(([key, val]) => {
                        if (key === 'name' || key === 'category') return null
                        return (
                          <div key={key} className="flex justify-between">
                            <span className="text-[#166534] uppercase tracking-widest">{key}:</span>
                            <span>{val}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Modal Footer */}
      <div className="border-t border-[#166534] bg-[#0d220d] px-4 py-2 text-xs text-[#166534]">
        [RESULTS: {results.length}] [ARCHIVE STATUS: ONLINE] [ACCESS LEVEL: ALPHA]
      </div>
    </div>
  )
}

function ArmorConditionDiagram() {
  const [hoveredPart, setHoveredPart] = useState(null)
  
  const bodyParts = [
    { id: 'helmet', name: 'Helmet', condition: 85 },
    { id: 'chest', name: 'Chest Plate', condition: 72 },
    { id: 'left-pauldron', name: 'Left Pauldron', condition: 65 },
    { id: 'right-pauldron', name: 'Right Pauldron', condition: 78 },
    { id: 'left-arm', name: 'Left Gauntlet', condition: 68 },
    { id: 'right-arm', name: 'Right Gauntlet', condition: 75 },
    { id: 'abdomen', name: 'Abdomen Plate', condition: 81 },
    { id: 'left-leg', name: 'Left Greave', condition: 58 },
    { id: 'right-leg', name: 'Right Greave', condition: 62 },
  ]

  const getConditionColor = (condition) => {
    if (condition >= 80) return '#39ff14' // Green - Good
    if (condition >= 60) return '#facc15' // Yellow - Fair
    if (condition >= 40) return '#f97316' // Orange - Poor
    return '#ff4040' // Red - Critical
  }

  const getConditionStatus = (condition) => {
    if (condition >= 80) return 'OPTIMAL'
    if (condition >= 60) return 'OPERATIONAL'
    if (condition >= 40) return 'COMPROMISED'
    return 'CRITICAL'
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="border border-[#39ff14] bg-[#0d220d] p-4">
        <div className="text-sm tracking-widest uppercase terminal-glow mb-2">
          ▸ POWER ARMOR DIAGNOSTIC SYSTEM
        </div>
        <div className="text-xs text-[#166534]">
          [SPACE MARINE MARK X TACTICAL ARMOR - FULL SYSTEMS ANALYSIS]
        </div>
      </div>

      {/* Armor Visualization */}
      <div className="border border-[#166534] bg-[#0d220d] p-6 relative" style={{ minHeight: '500px' }}>
        {/* Space Marine Power Armor SVG with integrated condition display */}
        <div className="relative w-full h-96" style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
          <svg className="w-full h-full" viewBox="0 0 200 450" preserveAspectRatio="xMidYMid meet" style={{ transform: 'scale(1.5)', transformOrigin: 'center top' }}>
            {/* Armor parts with condition fills and percentages */}
            
            {/* ── HELMET ── */}
            <g 
              onMouseEnter={() => setHoveredPart('helmet')}
              onMouseLeave={() => setHoveredPart(null)}
              style={{ cursor: 'pointer' }}
              className="transition-opacity"
            >
              <path 
                d="M 85 30 Q 100 15 115 30 L 120 50 Q 100 40 80 50 Z" 
                fill={hoveredPart === 'helmet' ? getConditionColor(85) : 'none'} 
                stroke={getConditionColor(85)} 
                strokeWidth={hoveredPart === 'helmet' ? "2.5" : "1.5"} 
                opacity={hoveredPart === 'helmet' ? "0.8" : "0.6"}
                style={{ filter: hoveredPart === 'helmet' ? `drop-shadow(0 0 6px ${getConditionColor(85)})` : 'none' }}
              />
              <rect x="95" y="38" width="10" height="6" fill="none" stroke={getConditionColor(85)} strokeWidth="0.8" opacity="0.6" />
              <text x="100" y="44" textAnchor="middle" fontSize="6" fill={getConditionColor(85)} fontWeight="bold" opacity="0.9">85%</text>
            </g>
            
            {/* ── LEFT PAULDRON ── */}
            <g 
              onMouseEnter={() => setHoveredPart('left-pauldron')}
              onMouseLeave={() => setHoveredPart(null)}
              style={{ cursor: 'pointer' }}
            >
              <ellipse 
                cx="60" cy="60" rx="28" ry="35" 
                fill={hoveredPart === 'left-pauldron' ? getConditionColor(65) : 'none'}
                stroke={getConditionColor(65)} 
                strokeWidth={hoveredPart === 'left-pauldron' ? "2.5" : "1.5"} 
                opacity={hoveredPart === 'left-pauldron' ? "0.8" : "0.6"}
                style={{ filter: hoveredPart === 'left-pauldron' ? `drop-shadow(0 0 6px ${getConditionColor(65)})` : 'none' }}
              />
              <path d="M 50 65 Q 45 75 50 85 Q 65 90 75 80" fill="none" stroke={getConditionColor(65)} strokeWidth="1" opacity="0.5" />
              <text x="60" y="62" textAnchor="middle" fontSize="5" fill={getConditionColor(65)} fontWeight="bold" opacity="0.9">65%</text>
            </g>
            
            {/* ── RIGHT PAULDRON ── */}
            <g 
              onMouseEnter={() => setHoveredPart('right-pauldron')}
              onMouseLeave={() => setHoveredPart(null)}
              style={{ cursor: 'pointer' }}
            >
              <ellipse 
                cx="140" cy="60" rx="28" ry="35" 
                fill={hoveredPart === 'right-pauldron' ? getConditionColor(78) : 'none'}
                stroke={getConditionColor(78)} 
                strokeWidth={hoveredPart === 'right-pauldron' ? "2.5" : "1.5"} 
                opacity={hoveredPart === 'right-pauldron' ? "0.8" : "0.6"}
                style={{ filter: hoveredPart === 'right-pauldron' ? `drop-shadow(0 0 6px ${getConditionColor(78)})` : 'none' }}
              />
              <path d="M 150 65 Q 155 75 150 85 Q 135 90 125 80" fill="none" stroke={getConditionColor(78)} strokeWidth="1" opacity="0.5" />
              <text x="140" y="62" textAnchor="middle" fontSize="5" fill={getConditionColor(78)} fontWeight="bold" opacity="0.9">78%</text>
            </g>
            
            {/* ── CHEST PLATE ── */}
            <g 
              onMouseEnter={() => setHoveredPart('chest')}
              onMouseLeave={() => setHoveredPart(null)}
              style={{ cursor: 'pointer' }}
            >
              <path 
                d="M 75 50 L 125 50 Q 130 55 130 70 L 130 130 Q 125 140 100 145 Q 75 140 70 130 L 70 70 Q 70 55 75 50 Z" 
                fill={hoveredPart === 'chest' ? getConditionColor(72) : 'none'}
                stroke={getConditionColor(72)} 
                strokeWidth={hoveredPart === 'chest' ? "2.5" : "1.5"} 
                opacity={hoveredPart === 'chest' ? "0.8" : "0.6"}
                style={{ filter: hoveredPart === 'chest' ? `drop-shadow(0 0 6px ${getConditionColor(72)})` : 'none' }}
              />
              <line x1="100" y1="65" x2="100" y2="115" stroke={getConditionColor(72)} strokeWidth="0.8" opacity="0.4" />
              <line x1="85" y1="85" x2="115" y2="85" stroke={getConditionColor(72)} strokeWidth="0.8" opacity="0.4" />
              <circle cx="100" cy="85" r="8" fill="none" stroke={getConditionColor(72)} strokeWidth="0.8" opacity="0.5" />
              <text x="100" y="100" textAnchor="middle" fontSize="6" fill={getConditionColor(72)} fontWeight="bold" opacity="0.9">72%</text>
            </g>
            
            {/* ── LEFT ARM GAUNTLET ── */}
            <g 
              onMouseEnter={() => setHoveredPart('left-arm')}
              onMouseLeave={() => setHoveredPart(null)}
              style={{ cursor: 'pointer' }}
            >
              <rect 
                x="40" y="70" width="30" height="75" rx="8" 
                fill={hoveredPart === 'left-arm' ? getConditionColor(68) : 'none'}
                stroke={getConditionColor(68)} 
                strokeWidth={hoveredPart === 'left-arm' ? "2.5" : "1.5"} 
                opacity={hoveredPart === 'left-arm' ? "0.8" : "0.6"}
                style={{ filter: hoveredPart === 'left-arm' ? `drop-shadow(0 0 6px ${getConditionColor(68)})` : 'none' }}
              />
              <ellipse cx="55" cy="148" rx="16" ry="12" fill="none" stroke={getConditionColor(68)} strokeWidth="1" opacity="0.6" />
              <text x="55" y="110" textAnchor="middle" fontSize="5" fill={getConditionColor(68)} fontWeight="bold" opacity="0.9">68%</text>
            </g>
            
            {/* ── RIGHT ARM GAUNTLET ── */}
            <g 
              onMouseEnter={() => setHoveredPart('right-arm')}
              onMouseLeave={() => setHoveredPart(null)}
              style={{ cursor: 'pointer' }}
            >
              <rect 
                x="130" y="70" width="30" height="75" rx="8" 
                fill={hoveredPart === 'right-arm' ? getConditionColor(75) : 'none'}
                stroke={getConditionColor(75)} 
                strokeWidth={hoveredPart === 'right-arm' ? "2.5" : "1.5"} 
                opacity={hoveredPart === 'right-arm' ? "0.8" : "0.6"}
                style={{ filter: hoveredPart === 'right-arm' ? `drop-shadow(0 0 6px ${getConditionColor(75)})` : 'none' }}
              />
              <ellipse cx="145" cy="148" rx="16" ry="12" fill="none" stroke={getConditionColor(75)} strokeWidth="1" opacity="0.6" />
              <text x="145" y="110" textAnchor="middle" fontSize="5" fill={getConditionColor(75)} fontWeight="bold" opacity="0.9">75%</text>
            </g>
            
            {/* ── ABDOMEN PLATE ── */}
            <g 
              onMouseEnter={() => setHoveredPart('abdomen')}
              onMouseLeave={() => setHoveredPart(null)}
              style={{ cursor: 'pointer' }}
            >
              <path 
                d="M 80 130 L 120 130 L 125 160 L 75 160 Z" 
                fill={hoveredPart === 'abdomen' ? getConditionColor(81) : 'none'}
                stroke={getConditionColor(81)} 
                strokeWidth={hoveredPart === 'abdomen' ? "2.5" : "1.5"} 
                opacity={hoveredPart === 'abdomen' ? "0.8" : "0.6"}
                style={{ filter: hoveredPart === 'abdomen' ? `drop-shadow(0 0 6px ${getConditionColor(81)})` : 'none' }}
              />
              <line x1="80" y1="140" x2="120" y2="140" stroke={getConditionColor(81)} strokeWidth="0.8" opacity="0.4" />
              <line x1="78" y1="150" x2="122" y2="150" stroke={getConditionColor(81)} strokeWidth="0.8" opacity="0.4" />
              <text x="100" y="147" textAnchor="middle" fontSize="5" fill={getConditionColor(81)} fontWeight="bold" opacity="0.9">81%</text>
            </g>
            
            {/* ── LEFT LEG GREAVE ── */}
            <g 
              onMouseEnter={() => setHoveredPart('left-leg')}
              onMouseLeave={() => setHoveredPart(null)}
              style={{ cursor: 'pointer' }}
            >
              <rect 
                x="70" y="160" width="28" height="100" rx="6" 
                fill={hoveredPart === 'left-leg' ? getConditionColor(58) : 'none'}
                stroke={getConditionColor(58)} 
                strokeWidth={hoveredPart === 'left-leg' ? "2.5" : "1.5"} 
                opacity={hoveredPart === 'left-leg' ? "0.8" : "0.6"}
                style={{ filter: hoveredPart === 'left-leg' ? `drop-shadow(0 0 6px ${getConditionColor(58)})` : 'none' }}
              />
              <ellipse cx="84" cy="270" rx="18" ry="14" fill="none" stroke={getConditionColor(58)} strokeWidth="1" opacity="0.6" />
              <text x="84" y="215" textAnchor="middle" fontSize="5" fill={getConditionColor(58)} fontWeight="bold" opacity="0.9">58%</text>
            </g>
            
            {/* ── RIGHT LEG GREAVE ── */}
            <g 
              onMouseEnter={() => setHoveredPart('right-leg')}
              onMouseLeave={() => setHoveredPart(null)}
              style={{ cursor: 'pointer' }}
            >
              <rect 
                x="102" y="160" width="28" height="100" rx="6" 
                fill={hoveredPart === 'right-leg' ? getConditionColor(62) : 'none'}
                stroke={getConditionColor(62)} 
                strokeWidth={hoveredPart === 'right-leg' ? "2.5" : "1.5"} 
                opacity={hoveredPart === 'right-leg' ? "0.8" : "0.6"}
                style={{ filter: hoveredPart === 'right-leg' ? `drop-shadow(0 0 6px ${getConditionColor(62)})` : 'none' }}
              />
              <ellipse cx="116" cy="270" rx="18" ry="14" fill="none" stroke={getConditionColor(62)} strokeWidth="1" opacity="0.6" />
              <text x="116" y="215" textAnchor="middle" fontSize="5" fill={getConditionColor(62)} fontWeight="bold" opacity="0.9">62%</text>
            </g>
            
            {/* Hover tooltip */}
            {hoveredPart && (
              <g>
                <text x="170" y="225" textAnchor="start" fontSize="7" fill="#39ff14" fontWeight="bold">
                  {bodyParts.find(p => p.id === hoveredPart)?.name}
                </text>
                <text x="170" y="238" textAnchor="start" fontSize="6" fill="#facc15">
                  {getConditionStatus(bodyParts.find(p => p.id === hoveredPart)?.condition || 0)}
                </text>
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* Condition Legend */}
      <div className="border border-[#166534] bg-[#0d220d] p-4">
        <div className="text-xs tracking-widest uppercase terminal-glow-sm mb-3">
          Status Legend
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 border-2" style={{ borderColor: '#39ff14', backgroundColor: '#39ff1420' }}></div>
            <span className="text-xs">OPTIMAL (80%+)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 border-2" style={{ borderColor: '#facc15', backgroundColor: '#facc1520' }}></div>
            <span className="text-xs">OPERATIONAL (60-79%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 border-2" style={{ borderColor: '#f97316', backgroundColor: '#f9731620' }}></div>
            <span className="text-xs">COMPROMISED (40-59%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 border-2" style={{ borderColor: '#ff4040', backgroundColor: '#ff404020' }}></div>
            <span className="text-xs">CRITICAL (&lt;40%)</span>
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="border border-[#166534] bg-[#0d220d] p-4">
        <div className="text-xs tracking-widest uppercase terminal-glow-sm mb-3">
          Detailed Analysis
        </div>
        <div className="space-y-2">
          {bodyParts.map((part) => (
            <div key={part.id} className="flex justify-between items-center pb-2 border-b border-[#166534]">
              <span className="text-xs text-[#166534] uppercase">{part.name}</span>
              <div className="flex items-center gap-2">
                {/* Progress bar */}
                <div className="w-24 h-2 border border-[#166534] bg-[#0a1a0a] relative">
                  <div
                    className="h-full transition-all"
                    style={{
                      width: `${part.condition}%`,
                      backgroundColor: getConditionColor(part.condition),
                      boxShadow: `0 0 4px ${getConditionColor(part.condition)}`,
                    }}
                  ></div>
                </div>
                <span style={{ color: getConditionColor(part.condition) }} className="text-xs font-bold w-10">
                  {part.condition}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div className="border border-[#39ff14] bg-[#0d220d] p-4">
        <div className="text-xs tracking-widest uppercase terminal-glow-sm mb-2">
          Overall Status
        </div>
        <div className="text-xs text-[#39ff14] space-y-1">
          <div>ARMOR INTEGRITY: <span className="terminal-glow">71%</span></div>
          <div>COMBAT READINESS: <span className="terminal-glow">OPERATIONAL</span></div>
          <div>ESTIMATED MAINTENANCE: <span className="terminal-glow">14 SOLAR DAYS</span></div>
          <div>CRITICAL COMPONENTS: <span className="terminal-glow">NONE - MISSION CAPABLE</span></div>
        </div>
      </div>
    </div>
  )
}

function AdeptusMechanicusSymbol() {
  const teeth = Array.from({ length: 16 }, (_, i) => {
    const angle = (i / 16) * Math.PI * 2
    const x1 = 250 + Math.cos(angle) * 200
    const y1 = 250 + Math.sin(angle) * 200
    const x2 = 250 + Math.cos(angle) * 240
    const y2 = 250 + Math.sin(angle) * 240
    return { x1, y1, x2, y2, i }
  })

  const spokes = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2
    const x1 = 250 + Math.cos(angle) * 60
    const y1 = 250 + Math.sin(angle) * 60
    const x2 = 250 + Math.cos(angle) * 180
    const y2 = 250 + Math.sin(angle) * 180
    return { x1, y1, x2, y2, i }
  })

  return (
    <svg
      width="600"
      height="600"
      viewBox="0 0 500 500"
      fill="none"
      stroke="#39ff14"
      strokeWidth="2"
    >
      {/* Outer gear circle */}
      <circle cx="250" cy="250" r="200" strokeWidth="1.5" opacity="0.7" />
      
      {/* Gear teeth */}
      {teeth.map((tooth) => (
        <line
          key={`tooth-${tooth.i}`}
          x1={tooth.x1}
          y1={tooth.y1}
          x2={tooth.x2}
          y2={tooth.y2}
          strokeWidth="2"
          opacity="0.8"
        />
      ))}

      {/* Inner circle */}
      <circle cx="250" cy="250" r="140" strokeWidth="1.5" opacity="0.7" />

      {/* Decorative spokes */}
      {spokes.map((spoke) => (
        <line
          key={`spoke-${spoke.i}`}
          x1={spoke.x1}
          y1={spoke.y1}
          x2={spoke.x2}
          y2={spoke.y2}
          strokeWidth="1"
          opacity="0.5"
        />
      ))}

      {/* Center circle */}
      <circle cx="250" cy="250" r="35" strokeWidth="2" opacity="0.8" />
      
      {/* Center symbol - cog inside */}
      <circle cx="250" cy="250" r="25" strokeWidth="1.5" opacity="0.7" fill="none" />
      
      {/* Eye sockets */}
      <circle cx="240" cy="243" r="5" fill="#39ff14" opacity="0.8" />
      <circle cx="260" cy="243" r="5" fill="#39ff14" opacity="0.8" />
      
      {/* Nose */}
      <path d="M 250 248 L 248 254 L 252 254 Z" fill="#39ff14" opacity="0.8" />
    </svg>
  )
}

export default App
