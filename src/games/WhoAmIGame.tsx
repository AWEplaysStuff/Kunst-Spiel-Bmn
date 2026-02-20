import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";
import { Mic, Send, User, Bot, RotateCcw, HelpCircle } from 'lucide-react';

interface WhoAmIGameProps {
  onBack: () => void;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

// List of potential identities for the AI (Artists, Movements, Techniques)
const IDENTITIES = [
  'Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Frida Kahlo', 'Claude Monet',
  'Expressionismus', 'Impressionismus', 'Surrealismus', 'Renaissance', 'Barock',
  'Mona Lisa', 'Der Schrei', 'Sternennacht', 'Das letzte Abendmahl',
  'Albrecht Dürer', 'Caspar David Friedrich', 'Joseph Beuys', 'Gerhard Richter',
  'Goldener Schnitt', 'Zentralperspektive', 'Farbkreis'
];

export const WhoAmIGame: React.FC<WhoAmIGameProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [secretIdentity, setSecretIdentity] = useState<string | null>(null);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize Gemini Client
  // Note: In a real production app, you might want to proxy this through a backend to hide the key,
  // but for this preview/prototype, we use the client-side key as configured in vite.config.ts
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const startNewGame = () => {
    const randomIdentity = IDENTITIES[Math.floor(Math.random() * IDENTITIES.length)];
    setSecretIdentity(randomIdentity);
    setMessages([{
      role: 'model',
      text: 'Ich habe mir eine Identität aus der Kunstwelt ausgesucht (Künstler, Werk, Epoche oder Fachbegriff). Stell mir Ja/Nein-Fragen, um herauszufinden, wer oder was ich bin!'
    }]);
    setIsGameWon(false);
    setInput('');
  };

  const handleSend = async () => {
    if (!input.trim() || !secretIdentity || isLoading || isGameWon) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const systemPrompt = `
        Du spielst das Spiel "Wer bin ich?".
        Deine geheime Identität ist: "${secretIdentity}".
        
        Regeln:
        1. Antworte auf Fragen NUR mit "Ja", "Nein" oder "Ich weiß es nicht".
        2. Wenn der Nutzer versucht zu raten (z.B. "Bist du Picasso?"), und es ist KORREKT, antworte mit: "Richtig! Ich bin ${secretIdentity}." und gratuliere kurz.
        3. Wenn der Nutzer rät und es ist FALSCH, antworte mit "Nein".
        4. Gib KEINE weiteren Hinweise, außer es ist absolut notwendig, weil das Spiel stockt.
        5. Bleibe immer in der Rolle der KI, die das Spiel moderiert, oder antworte aus der Perspektive des Begriffs (optional). Am einfachsten ist die neutrale Spielleiter-Perspektive.
        
        WICHTIG: Deine Identität ist streng geheim, bis sie erraten wird.
      `;

      // Construct chat history for context
      // We only send the last few messages to keep context but save tokens
      const history = messages.slice(-10).map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      // Correct usage for @google/genai SDK
      // Create a chat session with the model
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: systemPrompt,
        },
        history: history
      });

      const result = await chat.sendMessage({ message: userMessage });
      const responseText = result.text || "Entschuldigung, ich konnte keine Antwort generieren.";

      setMessages(prev => [...prev, { role: 'model', text: responseText }]);

      if (responseText.toLowerCase().includes("richtig") && responseText.toLowerCase().includes(secretIdentity.toLowerCase())) {
        setIsGameWon(true);
      }

    } catch (error) {
      console.error("Error calling Gemini:", error);
      setMessages(prev => [...prev, { role: 'model', text: 'Entschuldigung, ich habe gerade Verbindungsprobleme. Versuch es nochmal.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Spracherkennung wird von diesem Browser nicht unterstützt.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);
    // @ts-ignore - Types for Web Speech API might be missing
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'de-DE';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
      inputRef.current?.focus();
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm border-b border-gray-200 flex justify-between items-center z-10">
        <div className="flex items-center gap-2 text-art-accent font-bold font-serif">
          <HelpCircle size={24} />
          <span>Wer bin ich?</span>
        </div>
        <button onClick={onBack} className="text-sm text-gray-500 hover:text-gray-800">
          Beenden
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                msg.role === 'user'
                  ? 'bg-art-accent text-white rounded-tr-none'
                  : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
              }`}
            >
              <div className="flex items-center gap-2 mb-1 opacity-70 text-xs">
                {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                <span>{msg.role === 'user' ? 'Du' : 'KI'}</span>
              </div>
              <p className="leading-relaxed">{msg.text}</p>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        {isGameWon ? (
          <button
            onClick={startNewGame}
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            <RotateCcw size={18} /> Neues Spiel starten
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={toggleListening}
              className={`p-3 rounded-full transition-colors ${
                isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Spracheingabe"
            >
              <Mic size={20} />
            </button>
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Stell eine Ja/Nein Frage..."
                className="w-full p-3 pr-10 rounded-xl border border-gray-200 focus:border-art-accent focus:ring-1 focus:ring-art-accent outline-none"
                disabled={isLoading}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="p-3 bg-art-accent text-white rounded-xl hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
