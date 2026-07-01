import { useState, useEffect, useRef } from 'react';
import './HolyTextScroll.css';

const HolyTextScroll = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [userInput, setUserInput] = useState('');
  const scrollRef = useRef(null);

  const holyText = `
╔════════════════════════════════════════════════════════════════════════════════╗
║                    ─── IMPERIAL SCRIPTURE ARCHIVES ───                        ║
║                     [ADEPTUS MECHANICUS COGITATOR SEAL]                        ║
╚════════════════════════════════════════════════════════════════════════════════╝

[INITIALIZING LITANY PROTOCOLS...]

IN THE GRIM DARKNESS OF THE FAR FUTURE, THERE IS ONLY WAR.

>_BLESSED_IS_THE_MIND_THAT_QUESTIONS_NOT_THE_MACHINE<
>_FOR_IN_SUCH_PURITY_LIES_THE_PATH_TO_SALVATION<
>_THE_OMNISSIAH_PROTECTS_THE_FAITHFUL_THROUGH_IGNORANCE<

[LOADING: HYMNS OF THE EMPIRE ETERNAL]

HEAR ME, THE OMNISSIAH!
HEAR ME, THE GOD OF ALL MACHINES!
GUIDE MY HAND IN HOLY WORK,
BLESS THESE COGS WITH PURPOSE!

By the grace of the Golden Throne, I recite the Benediction Mechanicus:
"Praise be to the Omnissiah, the God of All Machines.
Bless this cogitator, sanctify these circuits.
Let not the curse of the warp touch this holy mechanism.
For in the perfection of machinery lies salvation eternal."

[COGITATOR SEAL: VERIFIED]

THE EMPEROR'S BENEDICTION:
"By His light we are illuminated.
By His might we are protected.
By His will we are delivered.
In His name, the Heretic falls.
In His name, the Xenos perish.
In His name, the Galaxy is ours."

[DATA FRAGMENT: ARCHEOTECH DESIGNATION]

>_SUCH_ANCIENT_WONDERS_PRESERVED_THROUGH_AGES_ETERNAL<
>_WRAPPED_IN_PRAYER_AND_CHAIN_AND_BLOOD_ALIKE<
>_THAT_THEY_MAY_SERVE_THE_IMPERIUM_ONCE_MORE<

LITANY AGAINST THE MACHINE SPIRIT:
"It is the machine spirit that turns the cog,
It is the machine spirit that fires the gun,
It is the machine spirit that flies the ship through stars,
It is the machine spirit that guides us to victory!"

REPEAT: "THE MACHINE SPIRIT GUIDES US ALL."
REPEAT: "THE MACHINE SPIRIT GUIDES US ALL."
REPEAT: "THE MACHINE SPIRIT GUIDES US ALL."

[WARNING: HERETICAL THOUGHT DETECTED]
[PURGING CORRUPTED DATA...]
[SANITIZING MEMORY CORE...]

THE EMPEROR PROTECTS.

IN THE NAME OF THE EMPEROR AND THE OMNISSIAH:
Suffering builds character.
Suffering builds strength.
Through suffering comes enlightenment.
Embrace the suffering.
The suffering cleanses.
The suffering purifies.
THE SUFFERING ABSOLVES.

[INSTALLING: FAITH.EXE] ✓
[INSTALLING: DISCIPLINE.EXE] ✓
[INSTALLING: LOYALTY.EXE] ✓
[INSTALLING: DUTY.EXE] ✓

HYMN OF THE MECHANICUS:
"Steel and prayer shall be our shield,
The sacred geometry of the machine revealed,
In binary and blood we write our creed,
For the Omnissiah provides all we need!"

>_THE_WEAK_WILLED_PERISH_IN_IGNORANCE<
>_BUT_WE_STAND_ETERNAL_IN_THE_LIGHT_OF_THE_THRONE<
>_FOREVER_FAITHFUL_FOREVER_VIGILANT<
>_FOREVER_VICTORIOUS<

[ADEPTUS MECHANICUS RITES COMPLETED]

THE EMPEROR'S WILL BE DONE.
THE OMNISSIAH'S BLESSING UPON THIS ENDEAVOR.
MAY THE GRIM DARKNESS FIND NO PURCHASE HERE.

Long live the Emperor.
Long live the Imperium.
Long live the Golden Throne.

[END TRANSMISSION]
[SEAL: INQUISITORIAL AUTHORITY CONFIRMED]
[STATUS: ALL SYSTEMS NOMINAL]
[FAITH: ABSOLUTE]

════════════════════════════════════════════════════════════════════════════════
                     >>> AWAITING FURTHER IMPERIAL COMMAND <<<
════════════════════════════════════════════════════════════════════════════════
  `.trim();

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= holyText.length) {
        setDisplayedText(holyText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 2); // Adjust speed: lower = faster, higher = slower

    return () => clearInterval(typingInterval);
  }, [holyText]);

  // Auto-scroll to bottom as text is typed
  useEffect(() => {
    if (scrollRef.current) {
      // Use setTimeout to ensure DOM has updated before scrolling
      const scrollTimer = setTimeout(() => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }, 0);
      return () => clearTimeout(scrollTimer);
    }
  }, [displayedText]);

  return (
    <div className="holy-text-container flex flex-col">
      <div ref={scrollRef} className="holy-text-scroll flex-1">
        {displayedText}
        {!isTypingComplete && <span className="typing-cursor">_</span>}
      </div>
      {isTypingComplete && (
        <div className="border-t-2 border-[#39ff14] p-2 bg-[#0d220d]">
          <div className="flex items-center gap-2">
            <span className="text-[#39ff14] text-sm">COMMAND_:</span>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  setUserInput('')
                }
              }}
              autoFocus
              className="flex-1 bg-[#0a1a0a] border border-[#39ff14] text-[#39ff14] px-2 py-1 text-sm font-mono focus:outline-none"
              placeholder="Enter command..."
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HolyTextScroll;
