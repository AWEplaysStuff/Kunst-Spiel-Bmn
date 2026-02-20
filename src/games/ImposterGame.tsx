import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TERMS, Term } from '../data/terms';
import { UserX, Eye, EyeOff, RotateCcw } from 'lucide-react';

interface ImposterGameProps {
  onBack: () => void;
}

export const ImposterGame: React.FC<ImposterGameProps> = ({ onBack }) => {
  const [playerCount, setPlayerCount] = useState(3);
  const [imposterIndex, setImposterIndex] = useState<number | null>(null);
  const [currentTerm, setCurrentTerm] = useState<Term | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [showTerm, setShowTerm] = useState(false);
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'voting'>('setup');

  const startGame = () => {
    const randomTerm = TERMS[Math.floor(Math.random() * TERMS.length)];
    const randomImposter = Math.floor(Math.random() * playerCount);
    setCurrentTerm(randomTerm);
    setImposterIndex(randomImposter);
    setCurrentPlayer(0);
    setGameState('playing');
    setShowTerm(false);
  };

  const handleNextPlayer = () => {
    if (currentPlayer < playerCount - 1) {
      setCurrentPlayer(prev => prev + 1);
      setShowTerm(false);
    } else {
      setGameState('voting');
    }
  };

  const revealTerm = () => {
    setShowTerm(true);
  };

  if (gameState === 'setup') {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
        <h2 className="text-3xl font-serif font-bold mb-4">Imposter</h2>
        <p className="text-gray-600 max-w-xs mx-auto mb-8">
          Jeder sieht den Begriff, außer einer: der Imposter. Findet heraus, wer es ist!
        </p>
        
        <div className="flex items-center justify-center gap-4 mb-8">
          <button 
            onClick={() => setPlayerCount(Math.max(3, playerCount - 1))}
            className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold hover:bg-gray-300 transition-colors"
          >
            -
          </button>
          <div className="text-4xl font-serif font-bold w-16 text-center">{playerCount}</div>
          <button 
            onClick={() => setPlayerCount(Math.min(10, playerCount + 1))}
            className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold hover:bg-gray-300 transition-colors"
          >
            +
          </button>
        </div>
        <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Spieler</p>

        <button onClick={startGame} className="btn-primary w-full max-w-xs mt-8">
          Spiel starten
        </button>
        <button onClick={onBack} className="text-gray-500 underline text-sm mt-4">
          Zurück
        </button>
      </div>
    );
  }

  if (gameState === 'voting') {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-sm w-full"
        >
          <h2 className="text-3xl font-serif font-bold mb-6">Abstimmung!</h2>
          <p className="text-gray-600 mb-8">
            Diskutiert und stimmt ab: Wer ist der Imposter?
          </p>
          
          <div className="bg-indigo-50 p-6 rounded-xl mb-8 border border-indigo-100">
            <p className="text-sm text-indigo-800 uppercase tracking-widest font-bold mb-2">Der Begriff war</p>
            <h3 className="text-2xl font-serif font-bold text-indigo-900">{currentTerm?.term}</h3>
          </div>

          <div className="space-y-3">
            <button onClick={startGame} className="w-full btn-primary flex items-center justify-center gap-2">
              <RotateCcw size={18} /> Neue Runde
            </button>
            <button onClick={() => setGameState('setup')} className="w-full btn-secondary">
              Spielerzahl ändern
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto">
      <div className="mb-8 text-center">
        <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Spieler {currentPlayer + 1} von {playerCount}</span>
        <h2 className="text-2xl font-serif font-bold mt-2">
          {showTerm ? 'Geheimnis' : 'Bist du bereit?'}
        </h2>
      </div>

      <AnimatePresence mode="wait">
        {!showTerm ? (
          <motion.button
            key="reveal"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={revealTerm}
            className="w-64 h-64 bg-art-text text-white rounded-full flex flex-col items-center justify-center shadow-xl hover:scale-105 transition-transform cursor-pointer group"
          >
            <Eye size={48} className="mb-4 group-hover:text-art-accent transition-colors" />
            <span className="font-bold text-lg tracking-wider uppercase">Anzeigen</span>
          </motion.button>
        ) : (
          <motion.div
            key="term"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-xs"
          >
            <div className={`p-8 rounded-2xl shadow-lg text-center border-4 ${currentPlayer === imposterIndex ? 'bg-red-50 border-red-500' : 'bg-emerald-50 border-emerald-500'}`}>
              {currentPlayer === imposterIndex ? (
                <>
                  <UserX size={48} className="mx-auto text-red-500 mb-4" />
                  <h3 className="text-2xl font-bold text-red-800 uppercase tracking-widest mb-2">Du bist der Imposter</h3>
                  <p className="text-red-600 text-sm">Versuche dich anzupassen!</p>
                </>
              ) : (
                <>
                  <div className="text-emerald-500 mb-4 font-serif italic text-lg">Der Begriff ist:</div>
                  <h3 className="text-3xl font-bold text-emerald-900 font-serif mb-2">{currentTerm?.term}</h3>
                  <p className="text-emerald-600 text-xs uppercase tracking-widest">{currentTerm?.category}</p>
                </>
              )}
            </div>
            
            <button 
              onClick={handleNextPlayer}
              className="w-full mt-8 btn-primary flex items-center justify-center gap-2"
            >
              <EyeOff size={18} /> Verstecken & Weiter
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
