"use client";

import { Check } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface UserAvatarProps {
  name: string;
  vote: string | number | null;
  revealed: boolean;
  isCurrentUser?: boolean;
}

export default function UserAvatar({ name, vote, revealed, isCurrentUser }: UserAvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const hasVoted = vote !== null;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative group">
        {/* Avatar Circle */}
        <div
          className={cn(
            "w-16 h-16 md:w-20 md:h-20 rounded-full border-4 flex items-center justify-center text-xl md:text-2xl font-bold transition-all duration-500 shadow-xl",
            isCurrentUser ? "border-blue-500 bg-blue-900/30 text-blue-400" : "border-slate-700 bg-slate-800 text-slate-400",
            revealed && hasVoted && "border-green-500 bg-green-900/20 text-green-400"
          )}
        >
          {revealed && hasVoted ? (
            <span className="scale-125">{vote}</span>
          ) : (
            <span>{initials}</span>
          )}
        </div>

        {/* Status Indicator */}
        {!revealed && (
          <div
            className={cn(
              "absolute -top-1 -right-1 w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center border-2 shadow-lg transition-transform duration-300",
              hasVoted ? "bg-green-500 border-green-400 scale-110" : "bg-slate-700 border-slate-600 scale-90"
            )}
          >
            {hasVoted ? (
              <Check className="w-4 h-4 text-white" />
            ) : (
              <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col items-center">
        <span className={cn(
          "text-sm font-medium transition-colors",
          isCurrentUser ? "text-blue-400" : "text-slate-300"
        )}>
          {name} {isCurrentUser && "(Você)"}
        </span>
        {hasVoted && !revealed && (
          <span className="text-[10px] text-green-500 font-bold uppercase tracking-wider animate-pulse">
            Votou
          </span>
        )}
      </div>
    </div>
  );
}
