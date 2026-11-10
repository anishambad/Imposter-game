import { useRef, useState } from 'react';
import { Check, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import HandoverScreen from './HandoverScreen.jsx';
import { Avatar, Button } from './ui.jsx';
import { rankSuspects, tallyVotes } from '../utils/gameLogic.js';
import { playSound } from '../utils/sound.js';

/**
 * Sequential private voting.
 *  handover -> ballot -> (hide vote) -> handover ... -> tally
 * Votes are never displayed until the tally step, after everyone has voted.
 */
export default function VotingScreen({ names, votes, step, imposterCount, soundOn, onReady, onVote, onShowResults }) {
  const voter = votes.length; // index of whoever votes next
  const [choice, setChoice] = useState(null);
  const shownAt = useRef(Date.now());

  if (step === 'handover') {
    return (
      <HandoverScreen
        key={`vh-${voter}`}
        name={names[voter]}
        tone={voter}
        title={`${names[voter]}'s Vote`}
        message={`Pass the phone to ${names[voter]}.`}
        step={voter + 1}
        total={names.length}
        onReady={onReady}
      />
    );
  }

  if (step === 'ballot') {
    const lock = () => {
      if (choice === null) return;
      const picked = choice;
      setChoice(null); // clear the selection before the next voter sees the screen
      playSound('vote', soundOn);
      onVote(picked);
    };
    return (
      <div key={`vb-${voter}`} className="flex flex-1 flex-col py-2">
        <div className="text-center">
          <p className="font-display text-3xl font-bold">{names[voter]}, who is the imposter?</p>
          <p className="mt-1 flex items-center justify-center gap-1 text-sm font-bold text-white/65">
            <Lock size={14} /> Your vote stays secret until everyone has voted.
          </p>
        </div>
        <ul className="mt-5 grid gap-3">
          {names.map((n, i) =>
            i === voter ? null : (
              <li key={i}>
                <button
                  type="button"
                  aria-pressed={choice === i}
                  onClick={() => {
                    if (Date.now() - shownAt.current < 500) return; // ignore the tail of a double tap on I'M READY
                    setChoice(i);
                    playSound('tap', soundOn);
                  }}
                  className={`flex min-h-[64px] w-full items-center gap-3 rounded-2xl border-b-[5px] px-4 text-left font-display text-xl font-bold transition-colors ${
                    choice === i ? 'border-[#c01f78] bg-candy text-white' : 'border-white/10 bg-white/10'
                  }`}
                >
                  <Avatar name={n} tone={i} size="h-11 w-11 text-xl" />
                  <span className="flex-1 break-words">{n}</span>
                  {choice === i && <Check />}
                </button>
              </li>
            )
          )}
        </ul>
        <div className="mt-auto pt-6">
          <Button variant="yellow" disabled={choice === null} onClick={lock} className="text-xl">
            <Lock size={22} /> LOCK IN MY VOTE
          </Button>
        </div>
      </div>
    );
  }

  // tally
  const counts = tallyVotes(votes, names.length);
  const { order, tie, tiedIndices } = rankSuspects(counts, imposterCount);
  const max = Math.max(1, ...counts);
  return (
    <div className="flex flex-1 flex-col py-2">
      <div className="text-center">
        <p className="text-5xl">🗳️</p>
        <h2 className="mt-2 font-display text-3xl font-bold">The votes are in!</h2>
      </div>

      <ul className="mt-5 space-y-3">
        {order.map((i, rank) => (
          <li key={i} className="glass !rounded-2xl !p-3">
            <div className="flex items-center gap-3">
              <Avatar name={names[i]} tone={i} size="h-10 w-10 text-lg" />
              <span className="flex-1 break-words font-display text-xl font-bold">{names[i]}</span>
              <span className="font-display text-2xl font-bold text-sun">{counts[i]}</span>
            </div>
            <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className={`h-full rounded-full ${rank < imposterCount && !tie ? 'bg-candy' : 'bg-sky-game'}`}
                initial={{ width: 0 }}
                animate={{ width: `${(counts[i] / max) * 100}%` }}
                transition={{ delay: 0.1 * rank, duration: 0.6 }}
              />
            </div>
          </li>
        ))}
      </ul>

      {tie && (
        <p role="status" className="mt-4 rounded-2xl bg-sun/15 p-3 text-center font-bold text-sun">
          🤝 It's a tie between {tiedIndices.map((i) => names[i]).join(' and ')}! Nobody can be accused.
        </p>
      )}

      <div className="mt-auto pt-6">
        <Button variant="pink" onClick={onShowResults} className="text-xl">
          REVEAL THE IMPOSTER 🕵️
        </Button>
      </div>
    </div>
  );
}
