"use client";

import { useState, useEffect, useMemo, use } from "react";
import { useRouter } from "next/navigation";
import { useSocket } from "@/context/SocketContext";
import NameModal from "@/components/NameModal";
import UserAvatar from "@/components/UserAvatar";
import VotingCard from "@/components/VotingCard";
import { Share2, RefreshCw, Eye, LogOut, Trophy, CheckCheck, Users } from "lucide-react";

const FIBONACCI_DECK = ["0", "1", "2", "3", "5", "8", "13", "21", "?", "☕"];

interface User {
  id: string;
  name: string;
  vote: string | number | null;
}

export default function Room({ params }: { params: Promise<{ id: string }> }) {
  const { id: roomId } = use(params);
  const { socket, isConnected } = useSocket();
  const router = useRouter();

  const [userName, setUserName] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [revealed, setRevealed] = useState(false);
  const [copying, setCopying] = useState(false);

  // Load name from localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUserName(savedName);
    }
  }, []);

  // Socket logic
  useEffect(() => {
    if (!socket || !isConnected || !userName) return;

    socket.emit("join-room", { roomId, userName });

    socket.on("room-update", ({ users, revealed }) => {
      setUsers(users);
      setRevealed(revealed);
    });

    return () => {
      socket.off("room-update");
    };
  }, [socket, isConnected, roomId, userName]);

  const handleJoin = (name: string) => {
    setUserName(name);
  };

  const handleVote = (vote: string) => {
    if (socket && !revealed) {
      socket.emit("vote", { roomId, vote });
    }
  };

  const revealVotes = () => {
    if (socket) {
      socket.emit("reveal-votes", roomId);
    }
  };

  const newRound = () => {
    if (socket) {
      socket.emit("new-round", roomId);
    }
  };

  const copyRoomLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopying(true);
    setTimeout(() => setCopying(false), 2000);
  };

  const currentUser = users.find((u) => u.id === socket?.id);
  const everyoneVoted = users.length > 0 && users.every((u) => u.vote !== null);
  
  // Calculate stats
  const stats = useMemo(() => {
    if (!revealed) return null;
    const votes = users.map((u) => u.vote).filter((v) => v !== null && !isNaN(Number(v))) as number[];
    if (votes.length === 0) return null;
    const avg = votes.reduce((a, b) => Number(a) + Number(b), 0) / votes.length;
    return { avg: avg.toFixed(1) };
  }, [users, revealed]);

  // Split users into top and bottom rows
  const topUsers = users.slice(0, Math.ceil(users.length / 2));
  const bottomUsers = users.slice(Math.ceil(users.length / 2));

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-blue-500/30">
      {/* Header */}
      <header className="h-20 border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl px-6 md:px-12 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-black text-xl shadow-lg shadow-blue-900/40">
            P
          </div>
          <div className="hidden sm:block">
            <h1 className="font-bold tracking-tight">Planning Poker</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Sala #{roomId.slice(0, 6)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={copyRoomLink}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-sm font-semibold transition-all active:scale-95"
          >
            {copying ? <CheckCheck className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{copying ? "Copiado!" : "Convidar Equipe"}</span>
          </button>
          
          <button
            onClick={() => router.push("/")}
            className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
            title="Sair da Sala"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Table Area */}
      <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full flex flex-col items-center justify-center">
        {/* The Poker Table Container */}
        <div className="w-full max-w-4xl relative h-[500px] flex items-center justify-center">
          
          {/* Top Row Users */}
          <div className="absolute top-0 left-0 w-full flex justify-center gap-6 md:gap-12 px-4">
            {topUsers.map((user) => (
              <div key={user.id} className="animate-in fade-in slide-in-from-top-4 duration-500">
                <UserAvatar
                  name={user.name}
                  vote={user.vote}
                  revealed={revealed}
                  isCurrentUser={user.id === socket?.id}
                />
              </div>
            ))}
          </div>

          {/* The Visual Table */}
          <div className="w-full h-64 bg-slate-900/40 border border-slate-800/50 rounded-[4rem] relative shadow-inner flex items-center justify-center overflow-hidden">
            {/* Table Center (Actions) */}
            <div className="flex flex-col items-center gap-4 text-center z-10 animate-in fade-in zoom-in-95 duration-500">
              {users.length === 0 ? (
                <div className="flex flex-col items-center gap-4 text-slate-500">
                  <Users className="w-12 h-12 opacity-20" />
                  <p className="font-medium">Esperando equipe entrar...</p>
                </div>
              ) : !revealed ? (
                <div className="space-y-4">
                  <div className="px-6 py-2 bg-slate-800/50 rounded-full border border-slate-700 text-sm font-bold text-slate-400 uppercase tracking-widest">
                    {users.filter(u => u.vote !== null).length} / {users.length} votos
                  </div>
                  <button
                    onClick={revealVotes}
                    disabled={!everyoneVoted}
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:grayscale text-white text-lg font-black rounded-2xl transition-all shadow-xl shadow-blue-900/40 hover:-translate-y-1 flex items-center gap-3 active:scale-95"
                  >
                    <Eye className="w-5 h-5" />
                    REVELAR VOTOS
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {stats && (
                    <div className="bg-slate-800/80 px-8 py-4 rounded-3xl border border-slate-700 shadow-2xl flex flex-col items-center">
                      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-1">Média</p>
                      <div className="text-4xl font-black text-blue-500">
                        {stats.avg}
                      </div>
                    </div>
                  )}
                  <button
                    onClick={newRound}
                    className="px-8 py-4 bg-white hover:bg-slate-100 text-slate-950 text-lg font-black rounded-2xl transition-all shadow-xl active:scale-95 flex items-center gap-3"
                  >
                    <RefreshCw className="w-5 h-5" />
                    NOVA RODADA
                  </button>
                </div>
              )}
            </div>

            {/* Decorativo de fundo da mesa */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border-[20px] border-blue-500 rounded-full blur-3xl" />
            </div>
          </div>

          {/* Bottom Row Users */}
          <div className="absolute bottom-0 left-0 w-full flex justify-center gap-6 md:gap-12 px-4">
            {bottomUsers.map((user) => (
              <div key={user.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <UserAvatar
                  name={user.name}
                  vote={user.vote}
                  revealed={revealed}
                  isCurrentUser={user.id === socket?.id}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Floating Controls for Current User Voting */}
        <div className="fixed bottom-0 left-0 w-full p-6 md:p-10 pointer-events-none z-30">
          <div className="max-w-4xl mx-auto w-full bg-slate-900/80 backdrop-blur-2xl border border-slate-800 rounded-[2.5rem] p-6 md:p-8 pointer-events-auto shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.5)] flex flex-col gap-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="font-bold text-slate-400 flex items-center gap-2 text-sm">
                <Trophy className="w-4 h-4 text-yellow-500" />
                Sua Estimativa
              </h3>
              {currentUser?.vote && (
                <span className="text-xs font-black text-blue-500 uppercase tracking-widest animate-in fade-in duration-300">
                  Selecionado: {currentUser.vote}
                </span>
              )}
            </div>
            
            <div className="flex items-center justify-between gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {FIBONACCI_DECK.map((value) => (
                <VotingCard
                  key={value}
                  value={value}
                  disabled={revealed}
                  isSelected={currentUser?.vote === value}
                  onClick={() => handleVote(value)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <NameModal isOpen={userName === null} onJoin={handleJoin} />
    </div>
  );
}
