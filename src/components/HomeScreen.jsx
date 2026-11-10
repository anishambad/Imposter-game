import { useState } from 'react';
import { ChevronDown, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header.jsx';
import { Button } from './ui.jsx';

const STEPS = [
  ['📱', 'Pass the phone', 'Each player privately sees one secret word.'],
  ['🤫', 'Almost everyone gets the same word', 'The imposter gets a different, related word - and has no idea.'],
  ['🗣️', 'Give clues', 'Say one clue each. Be vague enough to fool the imposter, clear enough for your friends.'],
  ['🗳️', 'Vote in secret', 'Pass the phone around again and each player votes for who they suspect.'],
  ['🎉', 'Reveal', 'Catch the imposter to win. A tie means the imposter slips away!'],
];

export default function HomeScreen({ onPlay, onSettings }) {
  const [open, setOpen] = useState(false);
  const letters = 'IMPOSTER'.split('');

  return (
    <div className="flex flex-1 flex-col">
      <Header onSettings={onSettings} />

      <section className="flex flex-1 flex-col items-center justify-center py-6 text-center">
        <motion.span
          className="inline-block -rotate-3 rounded-full bg-candy px-5 py-1.5 font-display text-lg font-bold shadow-lg"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: -3 }}
          transition={{ type: 'spring', stiffness: 260, damping: 14 }}
        >
          PRATIKSHA'S
        </motion.span>

        <h2 className="mt-3 font-display text-[3.4rem] font-bold leading-none sm:text-7xl" aria-label="Imposter Game">
          <span aria-hidden="true" className="flex justify-center">
            {letters.map((l, i) => (
              <span
                key={i}
                className={`inline-block animate-bounceLetter ${i % 2 ? 'text-sun' : 'text-white'}`}
                style={{ animationDelay: `${i * 0.12}s`, textShadow: '0 5px 0 rgba(0,0,0,0.25)' }}
              >
                {l}
              </span>
            ))}
          </span>
          <span aria-hidden="true" className="mt-1 block text-4xl text-sky-game sm:text-5xl" style={{ textShadow: '0 4px 0 rgba(0,0,0,0.25)' }}>
            GAME <span className="inline-block animate-wobble">🎭</span>
          </span>
        </h2>

        <p className="mt-5 max-w-xs text-lg font-bold text-white/85">
          One secret word. One sneaky imposter. Can you find them?
        </p>

        <div className="mt-8 w-full max-w-xs">
          <Button variant="yellow" onClick={onPlay} className="text-2xl">
            <Play size={26} fill="currentColor" /> PLAY GAME
          </Button>
        </div>
      </section>

      <section className="pb-4">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex min-h-[52px] w-full items-center justify-between rounded-2xl bg-white/10 px-5 font-display text-lg font-bold"
        >
          How to play
          <ChevronDown className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.ol
              className="mt-3 grid gap-3 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              {STEPS.map(([emoji, title, text], i) => (
                <li key={title} className="card flex items-start gap-3 !rounded-2xl !p-4">
                  <span className="text-3xl">{emoji}</span>
                  <div>
                    <p className="font-display text-lg font-bold leading-tight">
                      {i + 1}. {title}
                    </p>
                    <p className="text-sm font-semibold text-grape-900/70">{text}</p>
                  </div>
                </li>
              ))}
            </motion.ol>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
