import { useState } from 'react';
import { Minus, Plus, Users } from 'lucide-react';
import Header from './Header.jsx';
import { Avatar, Button, Segmented } from './ui.jsx';
import {
  MAX_NAME_LENGTH, MAX_PLAYERS, MIN_PLAYERS, clampImposters, maxImposters, resizeNames, validateNames,
} from '../utils/gameLogic.js';

export default function PlayerSetup({ initialNames, settings, onImposters, onStart, onBack, onSettings, onNamesChange }) {
  const [names, setNames] = useState(() =>
    initialNames.length >= MIN_PLAYERS ? initialNames : resizeNames([], 4)
  );
  const [errors, setErrors] = useState([]);
  const count = names.length;
  const allowTwo = maxImposters(count) === 2;
  const imposters = clampImposters(settings.imposters, count);

  const setCount = (n) => {
    const next = Math.min(MAX_PLAYERS, Math.max(MIN_PLAYERS, n));
    setNames((cur) => resizeNames(cur, next));
    setErrors([]);
    if (settings.imposters > maxImposters(next)) onImposters(maxImposters(next));
  };

  const setName = (i, value) => {
    setNames((cur) => cur.map((n, j) => (j === i ? value.slice(0, MAX_NAME_LENGTH + 4) : n)));
    if (errors.length) setErrors([]);
  };

  const start = () => {
    const found = validateNames(names);
    if (found.some(Boolean)) {
      setErrors(found);
      return;
    }
    onNamesChange(names);
    onStart(names);
  };

  return (
    <div className="flex flex-1 flex-col">
      <Header
        title="Who's playing?"
        onBack={() => { onNamesChange(names); onBack(); }}
        onSettings={() => { onNamesChange(names); onSettings(); }}
      />

      <div className="flex-1 space-y-4 py-2">
        <section className="glass">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2 font-display text-lg font-bold">
              <Users size={20} /> Players
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Fewer players"
                disabled={count <= MIN_PLAYERS}
                onClick={() => setCount(count - 1)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 disabled:opacity-30 active:scale-95"
              >
                <Minus />
              </button>
              <span className="w-8 text-center font-display text-3xl font-bold" aria-live="polite">{count}</span>
              <button
                type="button"
                aria-label="More players"
                disabled={count >= MAX_PLAYERS}
                onClick={() => setCount(count + 1)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-candy disabled:opacity-30 active:scale-95"
              >
                <Plus />
              </button>
            </div>
          </div>
          <p className="mt-1 text-sm font-semibold text-white/60">3 to 8 players</p>
        </section>

        <section className="space-y-3">
          {names.map((name, i) => (
            <div key={i}>
              <label className="flex items-center gap-3">
                <Avatar name={name || String(i + 1)} tone={i} />
                <span className="sr-only">Name of player {i + 1}</span>
                <input
                  className={`field ${errors[i] ? 'field-error' : ''}`}
                  value={name}
                  maxLength={MAX_NAME_LENGTH + 4}
                  placeholder={`Player ${i + 1}`}
                  autoComplete="off"
                  autoCapitalize="words"
                  aria-invalid={Boolean(errors[i])}
                  onChange={(e) => setName(i, e.target.value)}
                  onFocus={(e) => e.target.select()}
                />
              </label>
              {errors[i] && <p role="alert" className="ml-[68px] mt-1 text-sm font-bold text-sun">{errors[i]}</p>}
            </div>
          ))}
        </section>

        <section className="glass">
          <p className="mb-3 font-display text-lg font-bold">Imposters</p>
          <Segmented
            label="Number of imposters"
            value={imposters}
            onChange={onImposters}
            options={[
              { value: 1, label: '1 imposter' },
              { value: 2, label: '2 imposters', disabled: !allowTwo },
            ]}
          />
          {!allowTwo && <p className="mt-2 text-sm font-semibold text-white/60">2 imposters needs at least 5 players.</p>}
        </section>
      </div>

      <div className="sticky bottom-0 -mx-4 bg-gradient-to-t from-grape-950 via-grape-950/90 to-transparent px-4 pb-2 pt-6">
        <Button variant="yellow" onClick={start} className="text-xl">
          START GAME 🎭
        </Button>
      </div>
    </div>
  );
}
