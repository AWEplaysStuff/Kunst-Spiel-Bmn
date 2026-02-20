import React from 'react';
import { motion } from 'framer-motion';
import { Brain, MessageSquare, UserX, PenTool, Type, HelpCircle } from 'lucide-react';

interface GameMenuProps {
  onSelectGame: (gameId: string) => void;
}

const games = [
  {
    id: 'quiz',
    title: 'Quiz Master',
    description: 'Teste dein Fachwissen mit Multiple-Choice-Fragen.',
    icon: Brain,
    color: 'bg-emerald-100 text-emerald-800',
  },
  {
    id: 'taboo',
    title: 'Tabu',
    description: 'Erkläre Begriffe, ohne die verbotenen Wörter zu nutzen.',
    icon: MessageSquare,
    color: 'bg-rose-100 text-rose-800',
  },
  {
    id: 'imposter',
    title: 'Imposter',
    description: 'Finde den Hochstapler unter den Künstlern.',
    icon: UserX,
    color: 'bg-indigo-100 text-indigo-800',
  },
  {
    id: 'draw',
    title: 'Montagsmaler',
    description: 'Zeichne den Begriff, die anderen raten.',
    icon: PenTool,
    color: 'bg-amber-100 text-amber-800',
  },
  {
    id: 'scramble',
    title: 'Wortsalat',
    description: 'Bring die Buchstaben in die richtige Reihenfolge.',
    icon: Type,
    color: 'bg-sky-100 text-sky-800',
  },
  {
    id: 'whoami',
    title: 'Wer bin ich?',
    description: 'Errate die Künstler-Identität der KI.',
    icon: HelpCircle,
    color: 'bg-purple-100 text-purple-800',
  },
];

export const GameMenu: React.FC<GameMenuProps> = ({ onSelectGame }) => {
  return (
    <div className="grid gap-4 py-4">
      {games.map((game, index) => (
        <motion.button
          key={game.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelectGame(game.id)}
          className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group"
        >
          <div className={`p-3 rounded-lg mr-4 ${game.color} group-hover:scale-110 transition-transform`}>
            <game.icon size={24} />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-gray-900">{game.title}</h3>
            <p className="text-sm text-gray-500 leading-snug">{game.description}</p>
          </div>
        </motion.button>
      ))}
    </div>
  );
};
