"use client";

import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { Plus, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation();

  const createRoom = () => {
    const roomId = nanoid(10);
    router.push(`/room/${roomId}`);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-slate-950 overflow-hidden relative">
      <div className="absolute top-6 right-6 z-20">
        <LanguageSwitcher />
      </div>

      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-600 blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="max-w-4xl w-full relative z-10 flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 space-y-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold uppercase tracking-wider">
            <Zap className="w-4 h-4 fill-current" />
            {t("home.badge")}
          </div>

          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl font-extrabold text-white tracking-tighter">
              <span className="text-blue-500">{t("home.titleHighlight")}</span> {t("home.titleSuffix")}
            </h1>
            <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
              {t("home.description")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <button
              onClick={createRoom}
              className="w-full sm:w-auto px-8 h-16 bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold rounded-2xl transition-all shadow-xl shadow-blue-900/40 active:scale-95 flex items-center justify-center gap-3 group"
            >
              <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
              {t("home.createRoom")}
            </button>
            
          </div>
        </div>

        <div className="flex-1 hidden md:block relative">
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 5].map((val, idx) => (
              <div
                key={val}
                className={`p-12 rounded-3xl border-2 border-slate-800 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center text-5xl font-bold text-slate-600 shadow-2xl transition-all duration-700 hover:scale-105 hover:border-slate-700 hover:text-blue-500 translate-y-${idx * 4}`}
              >
                {val}
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="absolute bottom-10 text-slate-600 text-sm font-medium">
        © 2026 Online Planning Poker • {t("home.footer")}
      </footer>
    </main>
  );
}
