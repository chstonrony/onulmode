"use client";

import { useState } from "react";
import { useLocale } from "@/context/LocaleContext";
import { LOCALES, LOCALE_LABELS, Locale } from "@/lib/i18n";

const ROSE = "#C8607A";
const BG   = "#efe3cf";
const LINE = "#D8CEC0";

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);

  if (compact) {
    return (
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            fontSize: 11, fontFamily: "monospace", letterSpacing: "0.06em",
            color: "#A89880", background: "transparent", border: "none",
            cursor: "pointer", padding: "4px 6px", textTransform: "uppercase",
          }}
        >
          {locale.toUpperCase()}
        </button>
        {open && (
          <div style={{
            position: "absolute", bottom: "100%", right: 0,
            background: BG, border: `1px solid ${LINE}`, borderRadius: 4,
            boxShadow: "2px 4px 16px rgba(42,37,32,0.15)",
            zIndex: 100, minWidth: 110,
          }}>
            {LOCALES.map(l => (
              <button key={l} onClick={() => { setLocale(l); setOpen(false); }} style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "8px 14px", fontSize: 12,
                fontFamily: "var(--font-serif)",
                color: l === locale ? ROSE : "#5A5248",
                fontWeight: l === locale ? 700 : 400,
                background: l === locale ? `${ROSE}10` : "transparent",
                border: "none", cursor: "pointer",
                borderBottom: "1px solid #D8CEC0",
              }}>
                {LOCALE_LABELS[l]}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "center" }}>
      {LOCALES.map(l => (
        <button key={l} onClick={() => setLocale(l)} style={{
          fontSize: 11, padding: "3px 10px",
          fontFamily: "monospace", letterSpacing: "0.05em",
          background: l === locale ? ROSE : "transparent",
          color: l === locale ? "#F5EFE0" : "#A89880",
          border: `1px solid ${l === locale ? ROSE : LINE}`,
          borderRadius: 3, cursor: "pointer",
        }}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
