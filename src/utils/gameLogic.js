// Pure game logic - no React, no DOM. Everything here is unit-tested by `npm test`.
import { wordPairs, categories } from '../data/wordPairs.js';

export const MIN_PLAYERS = 3;
export const MAX_PLAYERS = 8;
export const MAX_NAME_LENGTH = 14;
export const MAX_RECENT = 400; // stays well below the number of available pairs

/** Two imposters only make sense with 5+ players. */
export function maxImposters(playerCount) {
  return playerCount >= 5 ? 2 : 1;
}

export function clampImposters(wanted, playerCount) {
  return Math.min(Math.max(1, wanted), maxImposters(playerCount));
}

export function defaultName(index) {
  return `Player ${index + 1}`;
}

/** Resize a name list to `count`, keeping what was typed and filling gaps with Player N. */
export function resizeNames(names, count) {
  return Array.from({ length: count }, (_, i) => names[i] ?? defaultName(i));
}

/**
 * Returns one error string (or '') per name.
 * Checks: empty, too long, duplicates (case-insensitive, ignoring extra spaces).
 */
export function validateNames(names) {
  const clean = names.map((n) => n.trim().replace(/\s+/g, ' '));
  return clean.map((name, i) => {
    if (!name) return 'Give this player a name';
    if (name.length > MAX_NAME_LENGTH) return `Max ${MAX_NAME_LENGTH} letters`;
    const dup = clean.some((other, j) => j !== i && other.toLowerCase() === name.toLowerCase());
    return dup ? 'Another player already has this name' : '';
  });
}

export function normaliseNames(names) {
  return names.map((n) => n.trim().replace(/\s+/g, ' '));
}

export function shuffle(list, rng = Math.random) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Pick a random pair, avoiding recently used ids whenever possible. */
export function pickPair(recentIds = [], pairs = wordPairs, rng = Math.random) {
  const recent = new Set(recentIds);
  let pool = pairs.filter((p) => !recent.has(p.id));
  if (pool.length === 0) pool = pairs; // everything was used recently: start over
  return pool[Math.floor(rng() * pool.length)];
}

/**
 * Build everything for one round. The result holds secrets - keep it in memory only.
 * roles[i] = { name, isImposter, word }
 */
export function createRound(names, imposterCount, recentIds = [], rng = Math.random) {
  const count = clampImposters(imposterCount, names.length);
  const pair = pickPair(recentIds, wordPairs, rng);
  // Randomly decide which word is the "normal" one so neither side is predictable.
  const swap = rng() < 0.5;
  const normalWord = swap ? pair.b : pair.a;
  const imposterWord = swap ? pair.a : pair.b;
  const imposterIdx = new Set(shuffle(names.map((_, i) => i), rng).slice(0, count));
  const roles = names.map((name, i) => ({
    name,
    isImposter: imposterIdx.has(i),
    word: imposterIdx.has(i) ? imposterWord : normalWord,
  }));
  const category = categories[pair.category] ?? { label: 'Words', emoji: '🎭' };
  return {
    pairId: pair.id,
    normalWord,
    imposterWord,
    category,
    roles,
    imposterCount: count,
    starter: Math.floor(rng() * names.length), // who gives the first clue
  };
}

export function addRecent(recentIds, pairId) {
  return [...recentIds.filter((id) => id !== pairId), pairId].slice(-MAX_RECENT);
}

/** votes[i] = index of the player that voter i suspects. Returns a vote count per player. */
export function tallyVotes(votes, playerCount) {
  const counts = Array(playerCount).fill(0);
  votes.forEach((v) => {
    if (v >= 0 && v < playerCount) counts[v] += 1;
  });
  return counts;
}

/**
 * Rank players by votes and detect ties at the cut-off.
 * `n` = how many players the group accuses (one per imposter).
 * A tie means the n-th and (n+1)-th players have equal votes, so nobody can fairly be accused.
 * This does not reveal who the imposter is.
 */
export function rankSuspects(counts, n) {
  const order = counts.map((_, i) => i).sort((a, b) => counts[b] - counts[a] || a - b);
  const cutoff = counts[order[n - 1]];
  const tie = order.length > n && counts[order[n]] === cutoff;
  const tiedIndices = tie ? order.filter((i) => counts[i] === cutoff) : [];
  return { order, tie, tiedIndices, accused: tie ? [] : order.slice(0, n) };
}

/**
 * Decide the round.
 *  - tie     : cut-off falls inside a tie -> nobody is accused -> imposters escape
 *  - caught  : every accused player is an imposter -> group wins
 *  - escaped : at least one imposter was not accused -> imposters win
 */
export function judgeRound(round, counts) {
  const n = round.imposterCount;
  const { tie, tiedIndices, accused } = rankSuspects(counts, n);
  const caughtCount = accused.filter((i) => round.roles[i].isImposter).length;
  let outcome = 'escaped';
  if (tie) outcome = 'tie';
  else if (caughtCount === n) outcome = 'caught';
  return { outcome, groupWins: outcome === 'caught', accused, tiedIndices, caughtCount };
}
