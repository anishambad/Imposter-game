import { AnimatePresence, motion } from 'framer-motion';
import { useGame } from './hooks/useGame.js';
import { clampImposters } from './utils/gameLogic.js';
import { FloatingEmojis } from './components/ui.jsx';
import Header from './components/Header.jsx';
import HomeScreen from './components/HomeScreen.jsx';
import PlayerSetup from './components/PlayerSetup.jsx';
import Settings from './components/Settings.jsx';
import HandoverScreen from './components/HandoverScreen.jsx';
import PlayerReveal from './components/PlayerReveal.jsx';
import DiscussionScreen from './components/DiscussionScreen.jsx';
import VotingScreen from './components/VotingScreen.jsx';
import ResultsScreen from './components/ResultsScreen.jsx';

export default function App() {
  const { state, actions } = useGame();
  const { screen, settings, names, round, distIndex, distStep, votes, voteStep } = state;

  // Each distinct "page" gets its own key so screens animate and secrets never carry over.
  let key = screen;
  if (screen === 'distribution') key = `dist-${distIndex}-${distStep}`;
  if (screen === 'voting') key = `vote-${votes.length}-${voteStep}`;

  let content = null;
  switch (screen) {
    case 'home':
      content = <HomeScreen onPlay={actions.goSetup} onSettings={actions.openSettings} />;
      break;
    case 'setup':
      content = (
        <PlayerSetup
          initialNames={names}
          settings={settings}
          onImposters={(n) => actions.patchSettings({ imposters: n })}
          onNamesChange={actions.saveNames}
          onStart={actions.startGame}
          onBack={actions.goHome}
          onSettings={actions.openSettings}
        />
      );
      break;
    case 'settings':
      content = <Settings settings={settings} onChange={actions.patchSettings} onBack={actions.closeSettings} />;
      break;
    case 'distribution': {
      const player = round.roles[distIndex];
      content = (
        <>
          <Header title="Secret words" onQuit={actions.goHome} />
          {distStep === 'handover' ? (
            <HandoverScreen
              name={player.name}
              tone={distIndex}
              title={`${player.name}'s Turn`}
              message={`Pass the phone to ${player.name}.`}
              step={distIndex + 1}
              total={names.length}
              onReady={actions.readyToReveal}
            />
          ) : (
            <PlayerReveal
              name={player.name}
              word={player.word}
              category={round.category}
              showHint={settings.hints}
              soundOn={settings.sound}
              isLast={distIndex === names.length - 1}
              onNext={actions.nextPlayer}
            />
          )}
        </>
      );
      break;
    }
    case 'discussion':
      content = (
        <>
          <Header title="Discussion" onQuit={actions.goHome} />
          <DiscussionScreen
            names={names}
            starter={round.starter}
            timerSeconds={settings.timer}
            soundOn={settings.sound}
            onStartVoting={actions.startVoting}
          />
        </>
      );
      break;
    case 'voting':
      content = (
        <>
          <Header title="Voting" onQuit={actions.goHome} />
          <VotingScreen
            names={names}
            votes={votes}
            step={voteStep}
            imposterCount={clampImposters(round.imposterCount, names.length)}
            soundOn={settings.sound}
            onReady={actions.readyToVote}
            onVote={actions.castVote}
            onShowResults={actions.showResults}
          />
        </>
      );
      break;
    case 'results':
      content = (
        <ResultsScreen
          names={names}
          round={round}
          votes={votes}
          soundOn={settings.sound}
          onPlayAgain={actions.playAgain}
          onHome={actions.goHome}
        />
      );
      break;
    default:
      content = null;
  }

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden">
      <FloatingEmojis />
      <main className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-md flex-col px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-[calc(env(safe-area-inset-top)+0.5rem)] md:max-w-lg">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={key}
            className="flex flex-1 flex-col"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12, transition: { duration: 0.1 } }}
            transition={{ duration: 0.25 }}
          >
            {content}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
