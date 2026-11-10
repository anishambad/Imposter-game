import { useRef } from 'react';
import { motion } from 'framer-motion';

const VARIANTS = {
  yellow: 'btn-yellow',
  pink: 'btn-pink',
  blue: 'btn-blue',
  violet: 'btn-violet',
  ghost: 'btn-ghost',
};

/**
 * Chunky game button. Ignores repeat taps for `lockMs` so a double tap
 * can never skip a player or cast a vote twice.
 */
export function Button({ children, onClick, variant = 'yellow', small = false, lockMs = 600, className = '', ...rest }) {
  const last = useRef(0);
  const handle = (e) => {
    const now = Date.now();
    if (now - last.current < lockMs) return;
    last.current = now;
    onClick?.(e);
  };
  return (
    <button
      type="button"
      className={`btn ${VARIANTS[variant]} ${small ? 'btn-sm' : ''} ${className}`}
      onClick={handle}
      {...rest}
    >
      {children}
    </button>
  );
}

export function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-9 w-16 shrink-0 rounded-full transition-colors ${checked ? 'bg-candy' : 'bg-grape-800'}`}
    >
      <motion.span
        className="absolute left-1 top-1 h-7 w-7 rounded-full bg-white shadow"
        animate={{ x: checked ? 28 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </button>
  );
}

export function Segmented({ options, value, onChange, label }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            disabled={o.disabled}
            onClick={() => onChange(o.value)}
            className={`min-h-[48px] min-w-[56px] flex-1 rounded-2xl px-3 py-2 font-display text-lg font-bold transition-colors disabled:opacity-35 ${
              active ? 'bg-sun text-grape-900 shadow-md' : 'bg-white/10 text-white'
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

const FLOATERS = [
  ['🍎', '6%', '8%', 0, 'text-4xl'],
  ['🎭', '84%', '6%', 1.2, 'text-5xl'],
  ['🥭', '90%', '38%', 2.4, 'text-3xl'],
  ['🕵️', '4%', '42%', 0.8, 'text-4xl'],
  ['🐶', '78%', '72%', 3, 'text-4xl'],
  ['🍕', '10%', '78%', 1.8, 'text-3xl'],
  ['🌙', '46%', '90%', 2.9, 'text-3xl'],
];

export function FloatingEmojis() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-30">
      {FLOATERS.map(([emoji, left, top, delay, size]) => (
        <span
          key={emoji + left}
          className={`absolute animate-floaty ${size}`}
          style={{ left, top, animationDelay: `${delay}s` }}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
}

export function Avatar({ name, size = 'h-14 w-14 text-2xl', tone = 0 }) {
  const tones = ['bg-candy', 'bg-sky-game text-grape-950', 'bg-sun text-grape-900', 'bg-violet-game'];
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-display font-bold text-white shadow-md ${size} ${tones[tone % tones.length]}`}
    >
      {name.trim().charAt(0).toUpperCase() || '?'}
    </span>
  );
}
