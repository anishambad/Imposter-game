import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Vote } from 'lucide-react';
import { motion } from 'framer-motion';
import { Avatar, Button } from './ui.jsx';
import { playSound } from '../utils/sound.js';

function Ring({ total, left, running }) {
  const R = 54;
  const C = 2 * Math.PI * R;
  const frac = total ? left / total : 0;
  const mm = String(Math.floor(left / 60)).padStart(1, '0');
  const ss = String(left % 60).padStart(2, '0');
  return (
    <div className="relative mx-auto h-40 w-40">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="10" />
        <circle
          cx="60" cy="60" r={R} fill="none" strokeWidth="10" strokeLinecap="round"
          stroke={left <= 10 ? '#ff4fa3' : '#ffd23f'}
          strokeDasharray={C}
          strokeDashoffset={C * (1 - frac)}
          style={{ transition: running ? 'stroke-dashoffset 1s linear' : 'none' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-4xl font-bold tabular-nums" aria-live="off">{mm}:{ss}</span>
        {left === 0 && <span className="text-sm font-bold text-sun">Time's up!</span>}
      </div>
    </div>
  );
}

export default function DiscussionScreen({ names, starter, timerSeconds, soundOn, onStartVoting }) {
  const [left, setLeft] = useState(timerSeconds);
  const [running, setRunning] = useState(timerSeconds > 0);
  const soundRef = useRef(soundOn);
  soundRef.current = soundOn;

  useEffect(() => {
    if (!running) return undefined;
    if (left <= 0) {
      setRunning(false);
      playSound('alarm', soundRef.current);
      return undefined;
    }
    if (left <= 5) playSound('tick', soundRef.current);
    const id = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [running, left]);

  return (
    <div className="flex flex-1 flex-col py-2">
      <motion.div className="text-center" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 250, damping: 14 }}>
        <p className="text-5xl">🎉</p>
        <h2 className="mt-2 font-display text-3xl font-bold leading-tight">EVERYONE HAS THEIR WORD!</h2>
        <p className="mt-2 font-bold text-white/80">
          Go round the circle. Each player says <span className="text-sun">one clue</span> about their word.
        </p>
      </motion.div>

      <section className="glass mt-5 text-center">
        <p className="font-bold text-white/80">
          <span className="font-display text-xl text-sun">{names[starter]}</span> starts the clues
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {names.map((n, i) => (
            <span key={i} className={`flex items-center gap-2 rounded-full py-1 pl-1 pr-4 font-display font-semibold ${i === starter ? 'bg-sun text-grape-900' : 'bg-white/10'}`}>
              <Avatar name={n} tone={i} size="h-8 w-8 text-sm" /> {n}
            </span>
          ))}
        </div>
      </section>

      <ul className="mt-5 space-y-2 text-sm font-bold text-white/80">
        <li>🕵️ Imposter: blend in. Listen, then give a clue that fits.</li>
        <li>🙂 Everyone else: hint at your word without saying it.</li>
        <li>🚫 Never say the secret word out loud.</li>
      </ul>

      {timerSeconds > 0 && (
        <section className="mt-6">
          <Ring total={timerSeconds} left={left} running={running} />
          <div className="mt-3 flex justify-center">
            {left > 0 && (
              <Button variant="ghost" small onClick={() => setRunning((r) => !r)}>
                {running ? <><Pause size={18} /> Pause</> : <><Play size={18} /> Resume</>}
              </Button>
            )}
          </div>
        </section>
      )}

      <div className="mt-auto pt-6">
        <Button variant="pink" onClick={onStartVoting} className="text-xl">
          <Vote size={24} /> START VOTING
        </Button>
      </div>
    </div>
  );
}
