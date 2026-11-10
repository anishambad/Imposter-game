import { useCallback, useEffect, useReducer, useRef } from 'react';
import { addRecent, clampImposters, createRound, normaliseNames } from '../utils/gameLogic.js';

const SETTINGS_KEY = 'pratiksha-imposter-settings-v1';
export const DEFAULT_SETTINGS = { imposters: 1, timer: 60, sound: true, hints: true };

// Only harmless preferences are saved. Secret words and roles are NEVER written to storage.
function loadSettings() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(SETTINGS_KEY) || '{}');
    return {
      imposters: saved.imposters === 2 ? 2 : 1,
      timer: [0, 30, 60, 90, 120].includes(saved.timer) ? saved.timer : DEFAULT_SETTINGS.timer,
      sound: typeof saved.sound === 'boolean' ? saved.sound : DEFAULT_SETTINGS.sound,
      hints: typeof saved.hints === 'boolean' ? saved.hints : DEFAULT_SETTINGS.hints,
    };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function init() {
  return {
    screen: 'home', // home | setup | settings | distribution | discussion | voting | results
    returnTo: 'home',
    settings: loadSettings(),
    names: [], // player names (kept between rounds)
    round: null, // SECRET: roles + words, memory only
    recent: [], // recently used word-pair ids
    distIndex: 0,
    distStep: 'handover', // handover | reveal
    votes: [], // SECRET until everyone has voted
    voteStep: 'handover', // handover | ballot | tally
  };
}

function reducer(state, action) {
  switch (action.type) {
    case 'GO':
      return { ...state, screen: action.screen };
    case 'OPEN_SETTINGS':
      return state.screen === 'settings' ? state : { ...state, returnTo: state.screen, screen: 'settings' };
    case 'CLOSE_SETTINGS':
      return { ...state, screen: state.returnTo };
    case 'PATCH_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.patch } };
    case 'SET_NAMES':
      return { ...state, names: action.names };
    case 'NEW_ROUND':
      return {
        ...state,
        names: action.names,
        round: action.round,
        recent: addRecent(state.recent, action.round.pairId),
        screen: 'distribution',
        distIndex: 0,
        distStep: 'handover',
        votes: [],
        voteStep: 'handover',
      };
    case 'READY_REVEAL':
      return state.screen === 'distribution' && state.distStep === 'handover'
        ? { ...state, distStep: 'reveal' }
        : state;
    case 'NEXT_PLAYER': {
      if (state.screen !== 'distribution' || state.distStep !== 'reveal') return state; // ignores double taps
      const next = state.distIndex + 1;
      if (next >= state.names.length) return { ...state, screen: 'discussion', distIndex: 0, distStep: 'handover' };
      return { ...state, distIndex: next, distStep: 'handover' };
    }
    case 'START_VOTING':
      return state.screen === 'discussion'
        ? { ...state, screen: 'voting', votes: [], voteStep: 'handover' }
        : state;
    case 'READY_VOTE':
      return state.screen === 'voting' && state.voteStep === 'handover' ? { ...state, voteStep: 'ballot' } : state;
    case 'CAST_VOTE': {
      if (state.screen !== 'voting' || state.voteStep !== 'ballot') return state; // ignores double taps
      const votes = [...state.votes, action.suspect];
      return { ...state, votes, voteStep: votes.length >= state.names.length ? 'tally' : 'handover' };
    }
    case 'SHOW_RESULTS':
      return state.voteStep === 'tally' ? { ...state, screen: 'results' } : state;
    case 'HOME':
      return { ...state, screen: 'home', round: null, votes: [], distIndex: 0, distStep: 'handover', voteStep: 'handover' };
    default:
      return state;
  }
}

export function useGame() {
  const [state, dispatch] = useReducer(reducer, undefined, init);
  const ref = useRef(state);
  ref.current = state;

  useEffect(() => {
    try {
      window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));
    } catch {
      /* private mode etc. - settings just won't persist */
    }
  }, [state.settings]);

  const startGame = useCallback((names) => {
    const clean = normaliseNames(names);
    const { settings, recent } = ref.current;
    const round = createRound(clean, clampImposters(settings.imposters, clean.length), recent);
    dispatch({ type: 'NEW_ROUND', names: clean, round });
  }, []);

  const actions = {
    startGame,
    playAgain: () => startGame(ref.current.names),
    goHome: () => dispatch({ type: 'HOME' }),
    goSetup: () => dispatch({ type: 'GO', screen: 'setup' }),
    openSettings: () => dispatch({ type: 'OPEN_SETTINGS' }),
    closeSettings: () => dispatch({ type: 'CLOSE_SETTINGS' }),
    patchSettings: (patch) => dispatch({ type: 'PATCH_SETTINGS', patch }),
    saveNames: (names) => dispatch({ type: 'SET_NAMES', names }),
    readyToReveal: () => dispatch({ type: 'READY_REVEAL' }),
    nextPlayer: () => dispatch({ type: 'NEXT_PLAYER' }),
    startVoting: () => dispatch({ type: 'START_VOTING' }),
    readyToVote: () => dispatch({ type: 'READY_VOTE' }),
    castVote: (suspect) => dispatch({ type: 'CAST_VOTE', suspect }),
    showResults: () => dispatch({ type: 'SHOW_RESULTS' }),
  };
  return { state, actions };
}
