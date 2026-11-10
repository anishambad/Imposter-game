// Run with: npm test
// Checks the word database and the game logic (no browser needed).
import assert from 'node:assert/strict';
import { wordPairs, categories } from '../src/data/wordPairs.js';
import {
  createRound, judgeRound, tallyVotes, validateNames, pickPair, addRecent, maxImposters, clampImposters, rankSuspects, resizeNames,
} from '../src/utils/gameLogic.js';

let passed = 0;
const test = (name, fn) => { fn(); passed++; console.log('  ok  ' + name); };

test('at least 1000 word pairs', () => assert.ok(wordPairs.length >= 1000, `only ${wordPairs.length}`));
test('no duplicate pairs (order-insensitive)', () => {
  const seen = new Set();
  for (const p of wordPairs) {
    const k = [p.a.toLowerCase(), p.b.toLowerCase()].sort().join('|');
    assert.ok(!seen.has(k), 'duplicate: ' + k);
    seen.add(k);
  }
});
test('every pair is valid (two different non-empty words, known category)', () => {
  for (const p of wordPairs) {
    assert.ok(p.a.trim() && p.b.trim());
    assert.notEqual(p.a.toLowerCase(), p.b.toLowerCase());
    assert.ok(categories[p.category], 'category ' + p.category);
  }
});
test('all 20 required categories have pairs', () => {
  const used = new Set(wordPairs.map((p) => p.category));
  assert.equal(Object.keys(categories).length, 20);
  for (const c of Object.keys(categories)) assert.ok(used.has(c), c);
});
test('rounds work for 3..8 players with 1 and 2 imposters', () => {
  for (let n = 3; n <= 8; n++) {
    for (const want of [1, 2]) {
      const names = Array.from({ length: n }, (_, i) => 'P' + (i + 1));
      for (let k = 0; k < 50; k++) {
        const r = createRound(names, want, []);
        const expected = clampImposters(want, n);
        assert.equal(r.roles.filter((x) => x.isImposter).length, expected);
        assert.equal(r.roles.length, n);
        assert.equal(r.imposterCount, expected);
        assert.notEqual(r.normalWord, r.imposterWord);
        r.roles.forEach((x) => assert.equal(x.word, x.isImposter ? r.imposterWord : r.normalWord));
        assert.ok(r.starter >= 0 && r.starter < n);
      }
    }
  }
});
test('2 imposters only allowed with 5+ players', () => {
  assert.equal(maxImposters(4), 1);
  assert.equal(maxImposters(5), 2);
  assert.equal(clampImposters(2, 3), 1);
});
test('imposter and word order are randomised', () => {
  const names = ['A', 'B', 'C', 'D'];
  const who = new Set(); const first = new Set();
  for (let i = 0; i < 300; i++) {
    const r = createRound(names, 1, []);
    who.add(r.roles.findIndex((x) => x.isImposter));
    first.add(r.normalWord === wordPairs[r.pairId].a);
  }
  assert.equal(who.size, 4);
  assert.equal(first.size, 2);
});
test('recently used pairs are avoided', () => {
  let recent = []; const seen = new Set();
  for (let i = 0; i < 400; i++) { // the game remembers the last 400 pairs
    const p = pickPair(recent);
    assert.ok(!seen.has(p.id), 'repeated too early');
    seen.add(p.id); recent = addRecent(recent, p.id);
  }
});
test('picking still works when every pair is "recent"', () => {
  const all = wordPairs.map((p) => p.id);
  assert.ok(pickPair(all));
});
test('name validation: empty, duplicate, too long', () => {
  assert.deepEqual(validateNames(['Anish', 'Ashish', 'Pranav']), ['', '', '']);
  assert.ok(validateNames(['Anish', '  ', 'Pranav'])[1]);
  const d = validateNames(['Anish', 'anish ', 'Pranav']);
  assert.ok(d[0] && d[1] && !d[2]);
  assert.ok(validateNames(['x'.repeat(30), 'b', 'c'])[0]);
  assert.deepEqual(resizeNames(['Anish'], 3), ['Anish', 'Player 2', 'Player 3']);
});
test('vote tally counts correctly', () => assert.deepEqual(tallyVotes([1, 1, 0, 1], 4), [1, 3, 0, 0]));

const round = (imps, n) => ({
  imposterCount: imps.length,
  roles: Array.from({ length: n }, (_, i) => ({ name: 'P' + i, isImposter: imps.includes(i), word: 'w' })),
});
test('judge: clear win for the group', () => assert.equal(judgeRound(round([2], 4), [0, 1, 3, 0]).outcome, 'caught'));
test('judge: wrong player accused -> imposter escapes', () => {
  const j = judgeRound(round([2], 4), [3, 1, 0, 0]);
  assert.equal(j.outcome, 'escaped'); assert.equal(j.groupWins, false);
});
test('judge: tie for first -> tie, imposter escapes', () => {
  const j = judgeRound(round([2], 4), [0, 2, 2, 0]);
  assert.equal(j.outcome, 'tie'); assert.deepEqual(j.tiedIndices, [1, 2]); assert.equal(j.groupWins, false);
});
test('judge: everybody gets one vote (full tie)', () => assert.equal(judgeRound(round([0], 4), [1, 1, 1, 1]).outcome, 'tie'));
test('judge: 2 imposters, both caught', () => assert.equal(judgeRound(round([0, 3], 6), [3, 0, 0, 2, 1, 0]).outcome, 'caught'));
test('judge: 2 imposters, only one caught -> escaped', () => assert.equal(judgeRound(round([0, 3], 6), [3, 2, 0, 0, 1, 0]).outcome, 'escaped'));
test('judge: 2 imposters, tie at the cut-off', () => assert.equal(judgeRound(round([0, 3], 6), [3, 1, 1, 1, 0, 0]).outcome, 'tie'));
test('rankSuspects detects ties without needing roles', () => {
  assert.equal(rankSuspects([2, 2, 1], 1).tie, true);
  assert.equal(rankSuspects([3, 2, 1], 1).tie, false);
});

console.log(`\nAll ${passed} checks passed. ${wordPairs.length} word pairs available.`);
