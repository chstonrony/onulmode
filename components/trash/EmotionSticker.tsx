"use client";

import { motion, PanInfo } from "framer-motion";

export interface StickerConfig {
  text: string;
  bg: string;
  rot: number;
  initX: number;
  initY: number;
  floatAnim: "up" | "down";
  size?: "sm" | "md";
  tape?: boolean;
}

interface EmotionStickerProps {
  config: StickerConfig;
  trashRef: React.RefObject<HTMLDivElement | null>;
  onDrop: (text: string) => void;
}

export default function EmotionSticker({ config, trashRef, onDrop }: EmotionStickerProps) {
  const handleDragEnd = (_: PointerEvent, info: PanInfo) => {
    const trash = trashRef.current?.getBoundingClientRect();
    if (!trash) return;
    const { x, y } = info.point;
    const hit = x > trash.left - 55 && x < trash.right + 55 && y > trash.top - 55 && y < trash.bottom + 55;
    if (hit) onDrop(config.text);
  };

  return (
    <motion.div
      drag
      dragElastic={0.18}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.07, zIndex: 50, cursor: "grabbing" }}
      animate={{
        y: config.floatAnim === "up" ? [0, -6, 0] : [0, 5, 0],
        rotate: [config.rot, config.rot + 1.2, config.rot],
      }}
      transition={{ duration: 3.5 + Math.abs(config.rot) * 0.12, repeat: Infinity, ease: "easeInOut" }}
      initial={{ x: config.initX, y: config.initY, rotate: config.rot, opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      style={{
        position: "absolute",
        cursor: "grab",
        userSelect: "none",
        touchAction: "none",
        zIndex: 20,
        "--r": `${config.rot}deg`,
      } as React.CSSProperties}
    >
      {/* 마스킹 테이프 */}
      {config.tape && (
        <div className="tape" style={{
          position: "absolute",
          top: -6, left: "50%",
          transform: `translateX(-50%) rotate(${config.rot < 0 ? 2 : -2}deg)`,
          width: "70%", height: 10,
          zIndex: 2,
        }} />
      )}

      {/* 스티키노트 본체 */}
      <div className="sticky-note" style={{
        background: config.bg,
        padding: config.size === "sm" ? "6px 12px" : "9px 16px 11px",
        borderRadius: 2,
        fontSize: config.size === "sm" ? 12 : 13.5,
        fontFamily: "var(--font-serif)",
        color: "#38332E",
        letterSpacing: "0.01em",
        lineHeight: 1.5,
        boxShadow: "2px 3px 10px rgba(44,40,37,0.13), 0 1px 0 rgba(255,255,255,0.4) inset",
        whiteSpace: "nowrap",
        minWidth: 52,
        position: "relative",
      }}>
        {config.text}
      </div>
    </motion.div>
  );
}
