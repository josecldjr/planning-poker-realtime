"use client";

import { useState, useEffect } from "react";
import { User } from "lucide-react";

interface NameModalProps {
  onJoin: (name: string) => void;
  isOpen: boolean;
}

export default function NameModal({ onJoin, isOpen }: NameModalProps) {
  const [name, setName] = useState("");
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsBrowser(true);
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setName(savedName);
    }
  }, []);

  if (!isOpen || !isBrowser) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem("userName", name.trim());
      onJoin(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md transition-opacity">
      <div className="w-full max-w-md p-8 bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-600/20 flex items-center justify-center ring-8 ring-blue-600/10">
            <User className="w-8 h-8 text-blue-500" />
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">Bem-vindo à sala!</h2>
            <p className="text-slate-400">Como você gostaria de ser chamado na mesa?</p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="relative">
              <input
                autoFocus
                type="text"
                placeholder="Ex: João Silva"
                className="w-full h-14 bg-slate-800 border-2 border-slate-700 rounded-xl px-4 text-white focus:outline-none focus:border-blue-500 transition-all text-lg placeholder:text-slate-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <button
              disabled={!name.trim()}
              type="submit"
              className="w-full h-14 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-95 flex items-center justify-center gap-2 group"
            >
              Entrar na Sala
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
