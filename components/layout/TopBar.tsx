"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  backHref?: string;
  rightAction?: React.ReactNode;
}

export default function TopBar({ title, showBack = false, backHref = "/", rightAction }: TopBarProps) {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 40,
      display: "flex", alignItems: "center", height: 52, padding: "0 16px",
      background: "rgba(237,228,208,0.95)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid #D8CEC0",
    }}>
      <div style={{ width: 36 }}>
        {showBack && (
          <Link href={backHref} style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 32, height: 32, color: "#A89880", textDecoration: "none",
          }} aria-label="뒤로">
            <ChevronLeft size={20} strokeWidth={1.5} />
          </Link>
        )}
      </div>
      <div style={{ flex: 1, textAlign: "center" }}>
        {title && (
          <span style={{ fontSize: 15, fontWeight: 700, color: "#2A2520", fontFamily: "var(--font-serif)" }}>
            {title}
          </span>
        )}
      </div>
      <div style={{ width: 36, display: "flex", justifyContent: "flex-end" }}>
        {rightAction}
      </div>
    </header>
  );
}
