"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const EMOTIONS = [
  { label: "지쳐서",   bg: "#F0E0DC", rot: -3  },
  { label: "서운해",   bg: "#D8E4EE", rot:  2  },
  { label: "억울해",   bg: "#E4DCED", rot: -4  },
  { label: "허무해",   bg: "#D8E8DC", rot:  3  },
  { label: "외로워",   bg: "#F5EBCC", rot: -2  },
  { label: "모르겠어", bg: "#EDE4D4", rot:  4  },
];
const ROSE = "#C8607A";

interface QuickDumpProps {
  onDump: (label: string) => void;
}

export default function QuickDump({ onDump }: QuickDumpProps) {
  const [active, setActive] = useState<string | null>(null);

  const handleTap = async (em: typeof EMOTIONS[0]) => {
    if (active) return;
    setActive(em.label);
    await new Promise((r) => setTimeout(r, 950));
    onDump(em.label);
    setActive(null);
  };

  return (
    <div>
      <p style={{
        fontSize: 10,
        color: "#A89880",
        marginBottom: 14,
        fontFamily: "var(--font-en)",
        fontStyle: "italic",
        letterSpacing: "0.08em",
        textAlign: "center",
      }}>
        지금 이 감정이야
      </p>

      <div className="flex flex-wrap gap-2.5 justify-center">
        {EMOTIONS.map((em) => {
          const isActive = active === em.label;
          return (
            <motion.button
              key={em.label}
              whileTap={{ scale: 0.93, rotate: 0 }}
              onClick={() => handleTap(em)}
              disabled={!!active}
              initial={{ rotate: em.rot }}
              animate={{ rotate: isActive ? 0 : em.rot }}
              className="sticky-note"
              style={{
                background: isActive ? "#E8E0D0" : em.bg,
                border: "none",
                padding: "7px 16px 9px",
                fontSize: 13,
                fontFamily: "var(--font-serif)",
                color: "#38332E",
                cursor: active ? "default" : "pointer",
                letterSpacing: "0.01em",
                borderRadius: 2,
                boxShadow: isActive
                  ? "1px 1px 4px rgba(44,40,37,0.10)"
                  : "2px 3px 10px rgba(44,40,37,0.12), 0 1px 0 rgba(255,255,255,0.4) inset",
                transition: "box-shadow 0.2s, background 0.2s",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0.4 }}
                    animate={{ scale: 4, opacity: 0 }}
                    exit={{}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "#C8B898",
                      borderRadius: "50%",
                      pointerEvents: "none",
                    }}
                  />
                )}
              </AnimatePresence>
              {em.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
