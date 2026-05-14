"use client";

import { motion, AnimatePresence } from "framer-motion";
import { EmotionType } from "@/types";
import { EMOTIONS, EmotionConfig } from "@/lib/emotions";

interface EmotionWheelProps {
  selected: EmotionType | null;
  onSelect: (e: EmotionType) => void;
}

function EmotionButton({ emotion, isSelected, isDeselected, onSelect }: {
  emotion: EmotionConfig;
  isSelected: boolean;
  isDeselected: boolean;
  onSelect: () => void;
}) {
  const Icon = emotion.icon;
  return (
    <motion.button
      onClick={onSelect}
      whileTap={{ scale: 0.88 }}
      animate={{ opacity: isDeselected ? 0.45 : 1, scale: isSelected ? 1.05 : 1 }}
      transition={{ duration: 0.15, type: "spring", stiffness: 400, damping: 20 }}
      className="flex flex-col items-center gap-2 focus:outline-none"
      aria-label={emotion.label}
      aria-pressed={isSelected}
    >
      <div
        className="relative flex items-center justify-center transition-all duration-200"
        style={{
          width: 66,
          height: 66,
          borderRadius: 18,
          background: emotion.bg,
          border: `2px solid ${isSelected ? emotion.border : emotion.border + "88"}`,
          boxShadow: isSelected
            ? `0 4px 16px ${emotion.border}55`
            : `0 2px 8px ${emotion.border}22`,
        }}
      >
        <Icon
          size={26}
          strokeWidth={1.8}
          style={{ color: emotion.color }}
        />
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
            style={{ background: emotion.border }}
          >
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
              <path d="M1.5 4.5l2 2 4-4" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        )}
      </div>
      <span style={{
        fontSize: 13,
        fontWeight: isSelected ? 700 : 500,
        color: isSelected ? emotion.color : "#6B6258",
        fontFamily: "var(--font-display)",
        transition: "color 0.15s",
      }}>
        {emotion.label}
      </span>
    </motion.button>
  );
}

export default function EmotionWheel({ selected, onSelect }: EmotionWheelProps) {
  const cfg = selected ? EMOTIONS.find((e) => e.type === selected) : null;
  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-3">
        {EMOTIONS.map((e) => (
          <EmotionButton
            key={e.type}
            emotion={e}
            isSelected={selected === e.type}
            isDeselected={selected !== null && selected !== e.type}
            onSelect={() => onSelect(e.type)}
          />
        ))}
      </div>

      <AnimatePresence>
        {cfg && (
          <motion.div
            key={cfg.type}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="mt-5 px-4 py-3 rounded-2xl"
            style={{ background: cfg.bg, border: `1.5px solid ${cfg.border}` }}
          >
            <p style={{
              fontSize: 14,
              color: cfg.color,
              fontWeight: 600,
              fontFamily: "var(--font-display)",
            }}>
              {cfg.quote}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
