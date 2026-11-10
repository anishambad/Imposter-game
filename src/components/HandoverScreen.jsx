import { Hand } from 'lucide-react';
import { motion } from 'framer-motion';
import { Avatar, Button } from './ui.jsx';

/**
 * Shown between players. It only ever contains the NEXT player's name -
 * never a word, never a role - so it is always safe to leave on screen.
 */
export default function HandoverScreen({ name, tone = 0, title, message, buttonLabel = "I'M READY", step, total, onReady }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-6 text-center">
      {total > 0 && (
        <div className="mb-6 flex gap-1.5" aria-label={`Player ${step} of ${total}`}>
          {Array.from({ length: total }, (_, i) => (
            <span key={i} className={`h-2.5 rounded-full transition-all ${i < step ? 'w-6 bg-sun' : 'w-2.5 bg-white/25'}`} />
          ))}
        </div>
      )}

      <motion.div
        initial={{ scale: 0.6, rotate: -12 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 16 }}
      >
        <Avatar name={name} tone={tone} size="h-32 w-32 text-6xl" />
      </motion.div>

      <h2 className="mt-6 break-words font-display text-4xl font-bold leading-tight">{title}</h2>
      <p className="mt-2 flex items-center gap-2 text-lg font-bold text-white/80">
        <Hand size={20} className="animate-wobble" /> {message}
      </p>
      <p className="mt-1 text-sm font-semibold text-white/55">Everyone else: look away 🙈</p>

      <div className="mt-10 w-full max-w-xs">
        <Button variant="yellow" onClick={onReady} className="text-xl">
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
}
