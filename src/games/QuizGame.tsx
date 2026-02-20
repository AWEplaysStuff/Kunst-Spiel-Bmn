import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TERMS, Term } from '../data/terms';
import confetti from 'canvas-confetti';
import { Check, X, ArrowRight, RotateCcw } from 'lucide-react';

interface QuizGameProps {
  onBack: () => void;
}

export const QuizGame: React.FC<QuizGameProps> = ({ onBack }) => {
  const [questions, setQuestions] = useState<Term[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [options, setOptions] = useState<Term[]>([]);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const shuffled = [...TERMS].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 10));
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  useEffect(() => {
    if (questions.length > 0 && currentIndex < questions.length) {
      generateOptions();
    }
  }, [currentIndex, questions]);

  const generateOptions = () => {
    const currentQuestion = questions[currentIndex];
    const otherTerms = TERMS.filter(t => t.id !== currentQuestion.id);
    const distractors = otherTerms.sort(() => 0.5 - Math.random()).slice(0, 3);
    const allOptions = [currentQuestion, ...distractors].sort(() => 0.5 - Math.random());
    setOptions(allOptions);
    setSelectedAnswer(null);
  };

  const handleAnswer = (termId: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(termId);

    if (termId === questions[currentIndex].id) {
      setScore(s => s + 1);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#C04000', '#1A1A1A', '#F9F7F2']
      });
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-sm w-full"
        >
          <h2 className="text-3xl font-serif font-bold mb-2">Ergebnis</h2>
          <div className="text-6xl font-bold text-art-accent mb-4">{score} / {questions.length}</div>
          <p className="text-gray-600 mb-6">
            {score === questions.length ? 'Perfekt! Du bist ein Kunst-Experte.' : 
             score > questions.length / 2 ? 'Gut gemacht!' : 'Übung macht den Meister.'}
          </p>
          
          <div className="space-y-3">
            <button onClick={startNewGame} className="w-full btn-primary flex items-center justify-center gap-2">
              <RotateCcw size={18} /> Noch einmal
            </button>
            <button onClick={onBack} className="w-full btn-secondary">
              Zurück zum Menü
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (questions.length === 0) return <div>Laden...</div>;

  const currentQuestion = questions[currentIndex];

  return (
    <div className="max-w-md mx-auto h-full flex flex-col">
      <div className="mb-6 flex justify-between items-center text-sm font-medium text-gray-500">
        <span>Frage {currentIndex + 1} von {questions.length}</span>
        <span>Score: {score}</span>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <motion.div
          key={currentIndex}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          className="mb-8"
        >
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-art-accent mb-6">
            <span className="text-xs font-bold tracking-wider text-art-accent uppercase mb-2 block">
              {currentQuestion.category}
            </span>
            <p className="text-xl font-serif leading-relaxed text-gray-800">
              {currentQuestion.definition}
            </p>
          </div>

          <div className="space-y-3">
            {options.map((option) => {
              const isSelected = selectedAnswer === option.id;
              const isCorrect = option.id === currentQuestion.id;
              const showCorrect = selectedAnswer && isCorrect;
              const showWrong = isSelected && !isCorrect;

              return (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option.id)}
                  disabled={!!selectedAnswer}
                  className={`w-full p-4 rounded-lg text-left transition-all border-2 flex justify-between items-center group
                    ${showCorrect 
                      ? 'bg-green-50 border-green-500 text-green-800' 
                      : showWrong 
                        ? 'bg-red-50 border-red-500 text-red-800' 
                        : 'bg-white border-transparent hover:border-gray-200 shadow-sm text-gray-800'
                    }
                  `}
                >
                  <span className="font-medium">{option.term}</span>
                  {showCorrect && <Check size={20} className="text-green-600" />}
                  {showWrong && <X size={20} className="text-red-600" />}
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>

      <div className="mt-auto pt-6">
        <button
          onClick={nextQuestion}
          disabled={!selectedAnswer}
          className={`w-full btn-primary flex items-center justify-center gap-2 transition-opacity ${!selectedAnswer ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          {currentIndex < questions.length - 1 ? 'Nächste Frage' : 'Ergebnis anzeigen'} <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
