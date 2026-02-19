"use client";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface VotingCardProps {
  value: string | number;
  isSelected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export default function VotingCard({ value, isSelected, onClick, disabled }: VotingCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative w-16 h-24 md:w-20 md:h-28 rounded-xl border-2 transition-all duration-200 flex items-center justify-center text-xl md:text-2xl font-bold shadow-lg",
        isSelected
          ? "border-blue-500 bg-blue-600 text-white -translate-y-4 scale-105 ring-4 ring-blue-500/30"
          : "border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-500 hover:-translate-y-2",
        disabled && "opacity-50 cursor-not-allowed grayscale"
      )}
    >
      {value}
    </button>
  );
}
