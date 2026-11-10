import { useEffect, useMemo, useState } from 'react';
import confetti from 'canvas-confetti';
import { Home, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Avatar, Button } from './ui.jsx';
import { judgeRound, tallyVotes } from '../utils/gameLogic.js';
import { playSound } from '../utils/sound.js';

const reduceMotion = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function fireConfetti() {
  if (reduceMotion()) return;
  const colors = ['#ffd23f', '#ff4fa3', '#38bdf8', '#7c3aed', '#ffffff'];
  confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors });
  setTimeout(() => confetti({ particleCount: 80, angle: 60, spread: 70, origin: { x: 0, y: 0.7 }, colors }), 250);
  setTimeout(() => confetti({ particleCount: 80, angle: 120, spread: 70, origin: { x: 1, y: 0.7 }, colors }), 400);
}

const MESSAGES = {
  caught: { emoji: '🏆', title: 'Imposter caught!', text: 'Great detective work - the group wins!' },
  escaped: { emoji: '😈', title: 'The imposter got away!', text: 'The group accused the wrong player. Imposters win!' },
  tie: { emoji: '🤝', title: "It's a tie - they slipped away!", text: 'Nobody could be accused, so the imposters win.' },
};

export default function ResultsScreen({ names, round, votes, soundOn, onPlayAgain, onHome }) {
  const [shown, setShown] = useState(false);
  const counts = useMemo(() => tallyVotes(votes, names.length), [votes, names.length]);
  const verdict = useMemo(() => judgeRound(round, counts), [round, counts]);
  const imposters = round.roles.map((r, i) => (r.isImposter ? i : -1)).filter((i) => i >= 0);
  const msg = MESSAGES[verdict.outcome];
  const max = Math.max(1, ...counts);
  const sorted = counts.map((_, i) => i).sort((a, b) => counts[b] - counts[a] || a - b);

  // short drumroll, then the big reveal
  useEffect(() => {
    playSound('drum', soundOn);
    const t = setTimeout(() => {
      setShown(true);
      if (verdict.groupWins) fireConfetti();
      playSound(verdict.groupWins ? 'win' : 'lose', soundOn);
    }, 1500);
    return () => clearTimeout(t);
  }, [verdict.groupWins, soundOn]);

  if (!shown) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-center" role="status">
        <motion.p className="text-8xl" animate={{ rotate: [-12, 12, -12], scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 0.5 }}>
          🥁
        </motion.p>
        <p className="mt-4 font-display text-3xl font-bold">And the imposter is...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col py-2">
      <motion.div className="text-center" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 220, damping: 12 }}>
        <p className="text-7xl">{msg.emoji}</p>
        <h2 className="mt-2 font-display text-3xl font-bold leading-tight">{msg.title}</h2>
        <p className="mt-1 font-bold text-white/80">{msg.text}</p>
      </motion.div>

      <section className="card mt-5 text-center">
        <p className="text-sm font-bold text-grape-900/60">{imposters.length > 1 ? 'The imposters were' : 'The imposter was'}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          {imposters.map((i) => (
            <span key={i} className="flex items-center gap-2 rounded-full bg-candy py-1 pl-1 pr-4 font-display text-xl font-bold text-white">
              <Avatar name={names[i]} tone={i} size="h-9 w-9 text-lg" /> {names[i]}
            </span>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 text-center">
          <div className="rounded-2xl bg-candy/15 p-3">
            <p className="text-xs font-bold text-grape-900/60">Imposter's word</p>
            <p className="break-words font-display text-2xl font-bold uppercase text-candy">{round.imposterWord}</p>
          </div>
          <div className="rounded-2xl bg-sky-game/20 p-3">
            <p className="text-xs font-bold text-grape-900/60">Everyone else's word</p>
            <p className="break-words font-display text-2xl font-bold uppercase text-violet-game">{round.normalWord}</p>
          </div>
        </div>
      </section>

      <section className="glass mt-4 !p-4">
        <p className="mb-2 font-display text-lg font-bold">Votes</p>
        <ul className="space-y-2">
          {sorted.map((i) => (
            <li key={i} className="flex items-center gap-2 text-sm font-bold">
              <span className="w-24 shrink-0 truncate">{names[i]}{round.roles[i].isImposter ? ' 🕵️' : ''}</span>
              <span className="h-3 flex-1 overflow-hidden rounded-full bg-white/10">
                <span className={`block h-full rounded-full ${round.roles[i].isImposter ? 'bg-candy' : 'bg-sky-game'}`} style={{ width: `${(counts[i] / max) * 100}%` }} />
              </span>
              <span className="w-5 text-right font-display text-lg text-sun">{counts[i]}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-auto grid gap-3 pt-6">
        <Button variant="yellow" onClick={onPlayAgain} className="text-xl"><RotateCcw /> PLAY AGAIN</Button>
        <Button variant="ghost" onClick={onHome}><Home size={20} /> BACK TO HOME</Button>
      </div>
    </div>
  );
}
