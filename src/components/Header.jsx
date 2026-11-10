import { useState } from 'react';
import { ArrowLeft, Settings as SettingsIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui.jsx';

/**
 * Top bar.
 *  - onBack    : shows a back arrow
 *  - onQuit    : shows an X that asks "Leave this game?" first (used during a round)
 *  - onSettings: shows the settings cog
 */
export default function Header({ title, onBack, onQuit, onSettings }) {
  const [confirming, setConfirming] = useState(false);
  const leftAction = onBack || (onQuit ? () => setConfirming(true) : null);
  const LeftIcon = onBack ? ArrowLeft : X;

  return (
    <>
      <header className="flex h-14 items-center justify-between">
        <div className="w-12">
          {leftAction && (
            <button
              type="button"
              aria-label={onBack ? 'Go back' : 'Leave game'}
              onClick={leftAction}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 active:scale-95"
            >
              <LeftIcon size={22} />
            </button>
          )}
        </div>
        <h1 className="font-display text-xl font-bold">{title}</h1>
        <div className="flex w-12 justify-end">
          {onSettings && (
            <button
              type="button"
              aria-label="Settings"
              onClick={onSettings}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 active:scale-95"
            >
              <SettingsIcon size={22} />
            </button>
          )}
        </div>
      </header>

      <AnimatePresence>
        {confirming && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Leave this game?"
          >
            <motion.div
              className="card w-full max-w-sm text-center"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
            >
              <p className="text-4xl">🚪</p>
              <h2 className="mt-2 font-display text-2xl font-bold">Leave this game?</h2>
              <p className="mt-1 text-grape-900/70">The current round and its secret words will be lost.</p>
              <div className="mt-5 grid gap-3">
                <Button variant="pink" onClick={() => { setConfirming(false); onQuit(); }}>
                  Yes, leave
                </Button>
                <Button variant="violet" onClick={() => setConfirming(false)}>
                  Keep playing
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
