import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TERMS, Term } from '../data/terms';
import { PenTool, Eraser, Trash2, Eye, EyeOff, RotateCcw, Check, Users } from 'lucide-react';
import { TeamSetup, TeamScoreBoard, Team } from '../components/TeamManager';
import confetti from 'canvas-confetti';

interface DrawGameProps {
  onBack: () => void;
}

export const DrawGame: React.FC<DrawGameProps> = ({ onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#1A1A1A');
  const [lineWidth, setLineWidth] = useState(3);
  const [currentTerm, setCurrentTerm] = useState<Term | null>(null);
  const [showTerm, setShowTerm] = useState(false);
  const [mode, setMode] = useState<'draw' | 'erase'>('draw');
  const [gameState, setGameState] = useState<'setup' | 'playing'>('setup');

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    handleResize();
  }, [canvasRef.current, gameState]);

  const handleResize = () => {
    if (canvasRef.current && canvasRef.current.parentElement) {
      const parent = canvasRef.current.parentElement;
      // Save content
      const ctx = canvasRef.current.getContext('2d');
      const content = ctx?.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
      
      canvasRef.current.width = parent.clientWidth;
      canvasRef.current.height = parent.clientHeight;
      
      // Restore content if possible (simple resize clears, but better than distortion)
      // For a simple game, clearing on resize is often acceptable or we redraw.
      // Here we just let it clear for simplicity as complex redraw logic is out of scope.
    }
  };

  const handleStart = (selectedTeams: Team[]) => {
    setTeams(selectedTeams);
    setGameState('playing');
    newTerm();
  };

  const newTerm = () => {
    const randomTerm = TERMS[Math.floor(Math.random() * TERMS.length)];
    setCurrentTerm(randomTerm);
    setShowTerm(false);
    clearCanvas();
  };

  const handleCorrect = () => {
    // Award point to current team (or guessing team? Usually current team gets point for successful drawing)
    setTeams(prev => prev.map((t, i) => 
      i === currentTeamIndex ? { ...t, score: t.score + 1 } : t
    ));
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#2563EB', '#F9F7F2']
    });
    nextTeam();
  };

  const nextTeam = () => {
    setCurrentTeamIndex((prev) => (prev + 1) % teams.length);
    newTerm();
  };

  const getPos = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    return {
      x: (e as React.MouseEvent).clientX - rect.left,
      y: (e as React.MouseEvent).clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const { x, y } = getPos(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const ctx = canvasRef.current?.getContext('2d');
    ctx?.beginPath();
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    const { x, y } = getPos(e);

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = mode === 'erase' ? '#FFFFFF' : color;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  if (gameState === 'setup') {
    return <TeamSetup onStart={handleStart} />;
  }

  return (
    <div className="flex flex-col h-full max-w-md mx-auto relative">
      <div className="mb-2">
        <TeamScoreBoard teams={teams} currentTeamIndex={currentTeamIndex} />
      </div>

      <div className="mb-2 flex justify-between items-center bg-white p-3 rounded-xl shadow-sm border border-gray-100">
        <div className="flex-1">
          {showTerm ? (
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Dein Begriff</span>
                <h3 className="font-serif font-bold text-lg text-art-accent leading-tight">{currentTerm?.term}</h3>
              </div>
              <button 
                onClick={() => setShowTerm(false)}
                className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                title="Begriff verbergen"
              >
                <EyeOff size={18} className="text-gray-600" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowTerm(true)}
              className="flex items-center gap-2 text-gray-500 hover:text-art-text transition-colors text-sm font-medium w-full"
            >
              <Eye size={16} /> Begriff anzeigen (nur für Maler!)
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-inner border border-gray-200 overflow-hidden relative touch-none mb-2">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          onTouchStart={startDrawing}
          onTouchEnd={stopDrawing}
          onTouchMove={draw}
          className="w-full h-full cursor-crosshair"
        />
      </div>

      <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => { setMode('draw'); setColor('#1A1A1A'); }}
              className={`w-8 h-8 rounded-full bg-black border-2 ${color === '#1A1A1A' && mode === 'draw' ? 'border-art-accent scale-110' : 'border-transparent'}`}
            />
            <button 
              onClick={() => { setMode('draw'); setColor('#C04000'); }}
              className={`w-8 h-8 rounded-full bg-art-accent border-2 ${color === '#C04000' && mode === 'draw' ? 'border-black scale-110' : 'border-transparent'}`}
            />
            <button 
              onClick={() => { setMode('draw'); setColor('#2563EB'); }}
              className={`w-8 h-8 rounded-full bg-blue-600 border-2 ${color === '#2563EB' && mode === 'draw' ? 'border-black scale-110' : 'border-transparent'}`}
            />
          </div>

          <div className="h-8 w-px bg-gray-200 mx-2"></div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setMode('erase')}
              className={`p-2 rounded-lg transition-colors ${mode === 'erase' ? 'bg-gray-200 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
              title="Radiergummi"
            >
              <Eraser size={20} />
            </button>
            <button 
              onClick={clearCanvas}
              className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              title="Alles löschen"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>

        <div className="flex gap-2 pt-2 border-t border-gray-100">
          <button 
            onClick={nextTeam}
            className="flex-1 py-2 bg-gray-100 text-gray-600 rounded-lg font-bold text-sm hover:bg-gray-200 transition-colors"
          >
            Überspringen
          </button>
          <button 
            onClick={handleCorrect}
            className="flex-1 py-2 bg-green-100 text-green-800 rounded-lg font-bold text-sm hover:bg-green-200 transition-colors flex items-center justify-center gap-2"
          >
            <Check size={16} /> Richtig (+1)
          </button>
        </div>
      </div>
    </div>
  );
};
