import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TERMS, Term } from '../data/terms';
import { Timer, Check, X, RotateCcw, AlertTriangle, Users } from 'lucide-react';
import { TeamSetup, TeamScoreBoard, Team } from '../components/TeamManager';
import confetti from 'canvas-confetti';

interface TabooGameProps {
  onBack: () => void;
}

export const TabooGame: React.FC<TabooGameProps> = ({ onBack }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [currentTerm, setCurrentTerm] = useState<Term | null>(null);
  const [roundScore, setRoundScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'result'>('setup');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      setShowResult(true);
      setGameState('result');
      // Update team score
      setTeams(prev => prev.map((t, i) => 
        i === currentTeamIndex ? { ...t, score: t.score + roundScore } : t
      ));
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleStart = (selectedTeams: Team[]) => {
    setTeams(selectedTeams);
    setGameState('playing');
    startRound();
  };

  const startRound = () => {
    setRoundScore(0);
    setTimeLeft(60);
    setIsActive(true);
    setShowResult(false);
    nextTerm();
  };

  const nextTerm = () => {
    const randomTerm = TERMS[Math.floor(Math.random() * TERMS.length)];
    setCurrentTerm(randomTerm);
  };

  const handleCorrect = () => {
    setRoundScore((prev) => prev + 1);
    confetti({
      particleCount: 30,
      spread: 40,
      origin: { y: 0.8 },
      colors: ['#22c55e']
    });
    nextTerm();
  };

  const handleTaboo = () => {
    setRoundScore((prev) => prev - 1);
    // Visual feedback for penalty
    const el = document.getElementById('game-container');
    if (el) {
      el.classList.add('animate-shake');
      setTimeout(() => el.classList.remove('animate-shake'), 500);
    }
    nextTerm();
  };

  const handleSkip = () => {
    nextTerm();
  };

  const nextTeam = () => {
    setCurrentTeamIndex((prev) => (prev + 1) % teams.length);
    setGameState('playing');
    startRound();
  };

  if (gameState === 'setup') {
    return <TeamSetup onStart={handleStart} />;
  }

  if (gameState === 'result') {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-sm w-full"
        >
          <h2 className="text-3xl font-serif font-bold mb-2">Zeit abgelaufen!</h2>
          <div className="text-6xl font-bold text-art-accent mb-4">{roundScore}</div>
          <p className="text-gray-600 mb-6">Punkte für {teams[currentTeamIndex].name}</p>
          
          <TeamScoreBoard teams={teams} currentTeamIndex={currentTeamIndex} />

          <div className="space-y-3 mt-6">
            <button onClick={nextTeam} className="w-full btn-primary flex items-center justify-center gap-2">
              <Users size={18} /> Nächstes Team: {teams[(currentTeamIndex + 1) % teams.length].name}
            </button>
            <button onClick={onBack} className="w-full btn-secondary">
              Spiel beenden
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!isActive) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
        <h2 className="text-3xl font-serif font-bold mb-4">Tabu</h2>
        <div className="bg-art-accent/10 p-4 rounded-xl mb-4">
          <p className="font-bold text-art-accent text-lg">
            {teams[currentTeamIndex].name} ist dran!
          </p>
        </div>
        <p className="text-gray-600 max-w-xs mx-auto mb-8">
          Erkläre den Begriff, ohne die verbotenen Wörter zu benutzen. Du hast 60 Sekunden!
        </p>
        <button onClick={startRound} className="btn-primary w-full max-w-xs">
          Runde starten
        </button>
        <button onClick={onBack} className="text-gray-500 underline text-sm mt-4">
          Zurück
        </button>
      </div>
    );
  }

  return (
    <div id="game-container" className="flex flex-col h-full max-w-md mx-auto transition-transform">
      <div className="flex justify-between items-center mb-4 bg-white p-3 rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 font-mono text-xl font-bold text-art-accent">
          <Timer size={24} /> {timeLeft}s
        </div>
        <div className="font-serif font-bold text-lg text-gray-900">
          Runde: {roundScore}
        </div>
      </div>

      <TeamScoreBoard teams={teams} currentTeamIndex={currentTeamIndex} />

      <AnimatePresence mode="wait">
        {currentTerm && (
          <motion.div
            key={currentTerm.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center mb-4"
          >
            <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-art-text/10">
              <div className="bg-art-text text-white p-6 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                  <AlertTriangle size={64} />
                </div>
                <h3 className="text-2xl font-serif font-bold tracking-wide uppercase relative z-10">
                  {currentTerm.term}
                </h3>
                <span className="text-xs opacity-70 mt-1 block tracking-widest uppercase relative z-10">
                  {currentTerm.category}
                </span>
              </div>
              
              <div className="p-6 bg-rose-50/50">
                <p className="text-xs font-bold text-rose-800 uppercase tracking-widest mb-4 text-center border-b border-rose-200 pb-2">
                  Verbotene Wörter
                </p>
                <ul className="space-y-2 text-center">
                  {currentTerm.forbiddenWords?.map((word, index) => (
                    <li key={index} className="text-lg font-medium text-rose-900 font-serif italic">
                      {word}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-3 gap-3 mt-auto pb-4">
        <button
          onClick={handleTaboo}
          className="p-3 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-xl font-bold flex flex-col items-center justify-center gap-1 transition-colors active:scale-95"
        >
          <AlertTriangle size={24} />
          <span className="text-xs uppercase tracking-wider">Tabu (-1)</span>
        </button>
        <button
          onClick={handleSkip}
          className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold flex flex-col items-center justify-center gap-1 transition-colors active:scale-95"
        >
          <X size={24} />
          <span className="text-xs uppercase tracking-wider">Skip (0)</span>
        </button>
        <button
          onClick={handleCorrect}
          className="p-3 bg-green-100 hover:bg-green-200 text-green-800 rounded-xl font-bold flex flex-col items-center justify-center gap-1 transition-colors active:scale-95"
        >
          <Check size={24} />
          <span className="text-xs uppercase tracking-wider">Richtig (+1)</span>
        </button>
      </div>
    </div>
  );
};
