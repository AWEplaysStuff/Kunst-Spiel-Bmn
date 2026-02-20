import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { GameMenu } from './components/GameMenu';
import { QuizGame } from './games/QuizGame';
import { TabooGame } from './games/TabooGame';
import { ImposterGame } from './games/ImposterGame';
import { DrawGame } from './games/DrawGame';
import { ScrambleGame } from './games/ScrambleGame';
import { WhoAmIGame } from './games/WhoAmIGame';
import { AnimatePresence, motion } from 'framer-motion';

export default function App() {
  const [currentGame, setCurrentGame] = useState<string | null>(null);

  const renderGame = () => {
    switch (currentGame) {
      case 'quiz':
        return <QuizGame onBack={() => setCurrentGame(null)} />;
      case 'taboo':
        return <TabooGame onBack={() => setCurrentGame(null)} />;
      case 'imposter':
        return <ImposterGame onBack={() => setCurrentGame(null)} />;
      case 'draw':
        return <DrawGame onBack={() => setCurrentGame(null)} />;
      case 'scramble':
        return <ScrambleGame onBack={() => setCurrentGame(null)} />;
      case 'whoami':
        return <WhoAmIGame onBack={() => setCurrentGame(null)} />;
      default:
        return <GameMenu onSelectGame={setCurrentGame} />;
    }
  };

  const getTitle = () => {
    switch (currentGame) {
      case 'quiz': return 'Quiz Master';
      case 'taboo': return 'Tabu';
      case 'imposter': return 'Imposter';
      case 'draw': return 'Montagsmaler';
      case 'scramble': return 'Wortsalat';
      case 'whoami': return 'Wer bin ich?';
      default: return 'Spielmodus wählen';
    }
  };

  return (
    <Layout 
      title={getTitle()} 
      onBack={currentGame ? () => setCurrentGame(null) : undefined}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentGame || 'menu'}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          {renderGame()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}
