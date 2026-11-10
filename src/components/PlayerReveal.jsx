import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Eye, EyeOff, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './ui.jsx';
import { playSound } from '../utils/sound.js';

const AUTO_HIDE_SECONDS = 10;

/**
 * Shows ONE player's secret word. The word lives only in props/state of this
 * component and is hidden: manually, after 10 s, when the tab loses focus,
 * and the moment the player taps NEXT.
 */
export default function PlayerReveal({ name, word, category, showHint, isLast, soundOn, onNext }) {
  const [revealed, setRevealed] = useState(false);
  const [seen, setSeen] = useState(false);
  const revealedAt = useRef(0);

  const hide = () => {
    // A double tap on REVEAL would otherwise land on HIDE WORD at the same spot.
    if (Date.now() - revealedAt.current < 800) return;
    setRevealed(false);
    playSound('hide', soundOn);
  };
  const reveal = () => {
    revealedAt.current = Date.now();
    setRevealed(true);
    setSeen(true);
    playSound('reveal', soundOn);
    try { navigator.vibrate?.(30); } catch { /* not supported */ }
  };
  const next = () => {
    setRevealed(false); // clear the word immediately, before the screen changes
    onNext();
  };

  // auto-hide
  useEffect(() => {
    if (!revealed) return undefined;
    const t = setTimeout(() => setRevealed(false), AUTO_HIDE_SECONDS * 1000);
    return () => clearTimeout(t);
  }, [revealed]);

  // hide if the player switches app/tab or the window loses focus
  useEffect(() => {
    const away = () => setRevealed(false);
    const onVis = () => document.hidden && away();
    document.addEventListener('visibilitychange', onVis);
    window.addEventListener('blur', away);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('blur', away);
    };
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center justify-center py-4 text-center">
      <p className="font-display text-2xl font-bold">{name}</p>
      <p className="mb-5 text-sm font-semibold text-white/65">
        {revealed ? 'Memorise it. Then hide it.' : 'Shield the screen, then reveal your word.'}
      </p>

      <div className="relative w-full" style={{ perspective: 900 }}>
        <motion.div
          animate={{ rotateY: revealed ? 0 : 180 }}
          transition={{ duration: 0.45 }}
          className="relative h-72 w-full"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* front: the word. Only rendered while revealed, so it is not even in the page when hidden */}
          <div
            className="card absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
            style={{ backfaceVisibility: 'hidden' }}
            aria-hidden={!revealed}
          >
            {revealed && (
              <>
                <p className="text-sm font-bold text-grape-900/60">Your secret word</p>
                <p className="mt-2 break-words px-2 font-display text-5xl font-bold uppercase leading-tight text-grape-800 sm:text-6xl">
                  {word}
                </p>
                <p className="mt-2 text-5xl">{category.emoji}</p>
                {showHint && (
                  <span className="mt-3 rounded-full bg-violet-game/15 px-4 py-1 text-sm font-bold text-violet-game">
                    Category: {category.label}
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 h-2 bg-grape-900/10">
                  <div
                    key={String(revealed)}
                    className="h-full origin-left bg-candy"
                    style={{ animation: `shrink ${AUTO_HIDE_SECONDS}s linear forwards` }}
                  />
                </div>
              </>
            )}
          </div>

          {/* back: hidden state */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-[28px] border-b-[6px] border-[#4c1d95] bg-gradient-to-br from-violet-game to-candy shadow-xl"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <Lock size={48} />
            <p className="mt-3 font-display text-3xl font-bold">Word hidden</p>
            <p className="mt-1 text-5xl font-bold">?</p>
          </div>
        </motion.div>
      </div>

      <div className="mt-8 grid w-full gap-3">
        {revealed ? (
          <Button variant="violet" onClick={hide}>
            <EyeOff /> HIDE WORD
          </Button>
        ) : (
          <Button variant="yellow" onClick={reveal} className="text-xl">
            <Eye /> {seen ? 'REVEAL AGAIN' : 'REVEAL MY WORD'}
          </Button>
        )}
        {seen && (
          <Button variant="pink" onClick={next} className="text-xl">
            {isLast ? 'DONE - START DISCUSSION' : 'NEXT PLAYER'} <ArrowRight />
          </Button>
        )}
      </div>
    </div>
  );
}
