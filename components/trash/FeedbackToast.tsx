"use client";

import { motion, AnimatePresence } from "framer-motion";

const MESSAGES = [
  "조금 가벼워졌길.",
  "그 감정, 여기 두고 가.",
  "천천히 흘려보내는 중.",
  "마음 한쪽 비웠어.",
  "괜찮아질 때까지, 잠깐.",
  "오늘도 잘 버텼어.",
];

export function getRandomMessage() {
  return MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
}

interface FeedbackToastProps {
  message: string | null;
}

export default function FeedbackToast({ message }: FeedbackToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key={message + Date.now()}
          initial={{ opacity: 0, y: 12, rotate: -1 }}
          animate={{ opacity: 1, y: 0, rotate: -1 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="sticky-note"
          style={{
            position: "fixed",
            bottom: 112,
            left: "50%",
            transform: "translateX(-50%) rotate(-1deg)",
            background: "#F5EBCC",
            padding: "10px 24px 12px",
            fontSize: 13,
            fontFamily: "var(--font-serif)",
            color: "#5A5248",
            whiteSpace: "nowrap",
            zIndex: 100,
            letterSpacing: "0.02em",
            borderRadius: 2,
            boxShadow: "3px 4px 14px rgba(44,40,37,0.14)",
          }}
        >
          {/* 테이프 */}
          <div className="tape" style={{
            position: "absolute",
            top: -7, left: "50%",
            transform: "translateX(-50%) rotate(1deg)",
            width: 48, height: 11,
          }} />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
