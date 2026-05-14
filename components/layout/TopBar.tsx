"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  backHref?: string;
  rightAction?: React.ReactNode;
  className?: string;
}

export default function TopBar({ title, showBack = false, backHref = "/", rightAction, className }: TopBarProps) {
  return (
    <header className={cn("sticky top-0 z-40 flex items-center h-14 px-4", className)}
      style={{ background: "#FAF8F4", borderBottom: "1px solid #E4DDD3" }}>
      <div className="w-10">
        {showBack && (
          <Link href={backHref} className="flex items-center justify-center w-9 h-9 rounded-xl" style={{ color: "#6B6258" }} aria-label="뒤로">
            <ChevronLeft size={20} strokeWidth={1.5} />
          </Link>
        )}
      </div>
      <div className="flex-1 text-center">
        {title && <span style={{ fontSize: 15, fontWeight: 600, color: "#2A2420" }}>{title}</span>}
      </div>
      <div className="w-10 flex justify-end">{rightAction}</div>
    </header>
  );
}
