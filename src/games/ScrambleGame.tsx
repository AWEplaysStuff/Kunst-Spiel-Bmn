import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TERMS, Term } from '../data/terms';
import confetti from 'canvas-confetti';
import { Check, X, ArrowRight, RotateCcw, Lightbulb } from 'lucide-react';

interface ScrambleGameProps {
  onBack: () => void;
}

export const ScrambleGame: React.FC<ScrambleGameProps> = ({ onBack }) => {
  const [currentTerm, setCurrentTerm] = useState<Term | null>(null);
  const [scrambledLetters, setScrambledLetters] = useState<{id: number, char: string}[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<{id: number, char: string}[]>([]);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    newRound();
  }, []);

  const newRound = () => {
    const randomTerm = TERMS[Math.floor(Math.random() * TERMS.length)];
    setCurrentTerm(randomTerm);
    
    // Scramble logic
    const letters = randomTerm.term.replace(/[^a-zA-ZäöüÄÖÜß]/g, '').toUpperCase().split('');
    const scrambled = letters.map((char, index) => ({ id: index, char }))
      .sort(() => Math.random() - 0.5);
    
    setScrambledLetters(scrambled);
    setSelectedLetters([]);
    setShowHint(false);
    setIsCorrect(false);
  };

  const [isWrong, setIsWrong] = useState(false);

  const handleLetterClick = (letter: {id: number, char: string}) => {
    if (isCorrect) return;
    
    const newSelected = [...selectedLetters, letter];
    setSelectedLetters(newSelected);
    setScrambledLetters(prev => prev.filter(l => l.id !== letter.id));

    // Check if word is complete
    const currentWord = newSelected.map(l => l.char).join('');
    const targetWord = currentTerm?.term.replace(/[^a-zA-ZäöüÄÖÜß]/g, '').toUpperCase();

    if (currentWord === targetWord) {
      handleSuccess();
    } else if (currentWord.length === targetWord?.length) {
      // Wrong word - reset
      setIsWrong(true);
      setTimeout(() => {
        setIsWrong(false);
        // Re-scramble everything
        const letters = currentTerm.term.replace(/[^a-zA-ZäöüÄÖÜß]/g, '').toUpperCase().split('');
        const scrambled = letters.map((char, index) => ({ id: index, char }))
          .sort(() => Math.random() - 0.5);
        setScrambledLetters(scrambled);
        setSelectedLetters([]);
      }, 500);
    }
  };

  const handleUndo = (letter: {id: number, char: string}) => {
    if (isCorrect) return;
    setSelectedLetters(prev => prev.filter(l => l.id !== letter.id));
    setScrambledLetters(prev => [...prev, letter]);
  };

  const handleSuccess = () => {
    setIsCorrect(true);
    setScore(s => s + 1);
    setStreak(s => s + 1);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C04000', '#1A1A1A', '#F9F7F2']
    });
  };

  const handleSkip = () => {
    setStreak(0);
    newRound();
  };

  if (!currentTerm) return <div>Laden...</div>;

  return (
    <div className="flex flex-col h-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">
          Streak: {streak}
        </div>
        <div className="font-serif font-bold text-xl text-art-accent">
          Punkte: {score}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div 
          animate={isWrong ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className={`w-full mb-8 min-h-[60px] flex flex-wrap justify-center gap-2 p-4 bg-white rounded-xl shadow-inner border ${isWrong ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
        >
          {selectedLetters.map((letter) => (
            <motion.button
              layoutId={`letter-${letter.id}`}
              key={letter.id}
              onClick={() => handleUndo(letter)}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-art-text text-white rounded-lg font-mono font-bold text-xl flex items-center justify-center shadow-md hover:bg-art-accent transition-colors"
            >
              {letter.char}
            </motion.button>
          ))}
          {selectedLetters.length === 0 && (
            <span className="text-gray-300 font-serif italic self-center">Wähle Buchstaben...</span>
          )}
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <AnimatePresence>
            {scrambledLetters.map((letter) => (
              <motion.button
                layoutId={`letter-${letter.id}`}
                key={letter.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                onClick={() => handleLetterClick(letter)}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-white text-art-text border border-gray-200 rounded-lg font-mono font-bold text-xl flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
              >
                {letter.char}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        <div className="w-full max-w-xs">
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-amber-50 p-4 rounded-xl border border-amber-200 mb-6 overflow-hidden"
              >
                <p className="text-amber-900 text-sm font-serif italic">
                  {currentTerm.definition}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {!isCorrect ? (
            <div className="flex gap-3">
              <button 
                onClick={() => setShowHint(!showHint)}
                className="flex-1 py-3 px-4 bg-amber-100 text-amber-800 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-amber-200 transition-colors"
              >
                <Lightbulb size={18} /> {showHint ? 'Tipp verbergen' : 'Tipp anzeigen'}
              </button>
              <button 
                onClick={handleSkip}
                className="py-3 px-4 bg-gray-100 text-gray-600 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Skip
              </button>
            </div>
          ) : (
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={newRound}
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              Nächstes Wort <ArrowRight size={18} />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};
