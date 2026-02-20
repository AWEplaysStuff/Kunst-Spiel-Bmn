import React from 'react';
import { motion } from 'framer-motion';
import { Users, Trophy } from 'lucide-react';

export interface Team {
  id: number;
  name: string;
  score: number;
}

interface TeamSetupProps {
  onStart: (teams: Team[]) => void;
  minTeams?: number;
  maxTeams?: number;
}

export const TeamSetup: React.FC<TeamSetupProps> = ({ onStart, minTeams = 2, maxTeams = 4 }) => {
  const [count, setCount] = React.useState(2);
  const [names, setNames] = React.useState<string[]>(['Team 1', 'Team 2', 'Team 3', 'Team 4']);

  const handleStart = () => {
    const teams = Array.from({ length: count }, (_, i) => ({
      id: i,
      name: names[i],
      score: 0
    }));
    onStart(teams);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
      <div className="w-16 h-16 bg-art-accent/10 text-art-accent rounded-full flex items-center justify-center mb-2">
        <Users size={32} />
      </div>
      <h2 className="text-3xl font-serif font-bold">Teams wählen</h2>
      
      <div className="flex items-center gap-4 mb-4">
        <button 
          onClick={() => setCount(Math.max(minTeams, count - 1))}
          className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold hover:bg-gray-300 transition-colors"
        >
          -
        </button>
        <span className="text-2xl font-bold w-8">{count}</span>
        <button 
          onClick={() => setCount(Math.min(maxTeams, count + 1))}
          className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold hover:bg-gray-300 transition-colors"
        >
          +
        </button>
      </div>

      <div className="w-full max-w-xs space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <input
            key={i}
            type="text"
            value={names[i]}
            onChange={(e) => {
              const newNames = [...names];
              newNames[i] = e.target.value;
              setNames(newNames);
            }}
            className="w-full p-3 rounded-lg border border-gray-200 focus:border-art-accent focus:ring-1 focus:ring-art-accent outline-none text-center font-medium"
            placeholder={`Team ${i + 1}`}
          />
        ))}
      </div>

      <button onClick={handleStart} className="btn-primary w-full max-w-xs mt-4">
        Spiel starten
      </button>
    </div>
  );
};

interface TeamScoreBoardProps {
  teams: Team[];
  currentTeamIndex?: number;
}

export const TeamScoreBoard: React.FC<TeamScoreBoardProps> = ({ teams, currentTeamIndex }) => {
  return (
    <div className="grid grid-cols-2 gap-2 mb-4 w-full">
      {teams.map((team, index) => (
        <div 
          key={team.id}
          className={`p-2 rounded-lg border flex justify-between items-center transition-all ${
            index === currentTeamIndex 
              ? 'bg-art-accent text-white border-art-accent shadow-md scale-105 z-10' 
              : 'bg-white text-gray-600 border-gray-200'
          }`}
        >
          <span className="font-medium text-sm truncate max-w-[80px]">{team.name}</span>
          <span className="font-bold font-mono">{team.score}</span>
        </div>
      ))}
    </div>
  );
};
