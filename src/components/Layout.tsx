import React from 'react';
import { motion } from 'framer-motion';
import { Palette, ArrowLeft } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  onBack?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, title, onBack }) => {
  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-art-bg shadow-2xl overflow-hidden relative border-x border-art-text/5">
      <header className="p-6 flex items-center justify-between z-10 relative">
        <div 
          className={`flex items-center gap-2 ${onBack ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`} 
          onClick={onBack}
        >
          <div className="w-8 h-8 bg-art-text text-art-bg flex items-center justify-center rounded-full">
            {onBack ? <ArrowLeft size={16} /> : <Palette size={16} />}
          </div>
          <span className="font-serif font-bold text-lg tracking-tight">KUNST LK '26</span>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col relative z-0">
        {title && (
          <div className="px-6 pb-4">
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-serif font-bold text-art-text leading-tight"
            >
              {title}
            </motion.h1>
          </div>
        )}
        <div className="flex-1 px-6 pb-6 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </main>

      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-30 mix-blend-multiply" 
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}>
      </div>
    </div>
  );
};
