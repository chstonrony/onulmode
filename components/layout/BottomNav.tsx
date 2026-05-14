"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ROSE = "#C8607A";

const TABS = [
  { href: "/",        label: "오늘무드", dot: true  },
  { href: "/archive", label: "기록장",   dot: false },
  { href: "/profile", label: "나",       dot: false },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav style={{
      position:"fixed", bottom:0, left:0, right:0, zIndex:50,
      background:"#EEE5D4",
      borderTop:"1px solid #D8CEC0",
      paddingBottom:"env(safe-area-inset-bottom, 0px)",
    }}>
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"space-around",
        height:52, maxWidth:512, margin:"0 auto", padding:"0 16px",
      }}>
        {/* 왼쪽: 파쇄기 미니 아이콘 */}
        <Link href="/" style={{ display:"flex", alignItems:"center", gap:6, textDecoration:"none" }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect x="2" y="6" width="18" height="13" rx="1.5" fill="#D4C8A8" stroke="#A89878" strokeWidth="1"/>
            <rect x="4" y="8" width="14" height="3" rx="1" fill="#141210"/>
            <rect x="4" y="8" width="14" height="3" rx="1" stroke={ROSE} strokeWidth="0.8"/>
            <circle cx="8" cy="15" r="2" fill="white" stroke="#2C2825" strokeWidth="1"/>
            <circle cx="14" cy="15" r="2" fill="white" stroke="#2C2825" strokeWidth="1"/>
            {[5,8,11,14,17].map((x,i) => (
              <rect key={i} x={x} y={19} width={1.5} height={3+i%2*2} rx="0.5" fill="#D4C8A8" opacity="0.7"/>
            ))}
          </svg>
          <span style={{
            fontSize:12, fontFamily:"var(--font-serif)", color:"#38332E",
            letterSpacing:"0.03em",
          }}>오늘무드</span>
        </Link>

        {/* 중앙: 기록장 */}
        {TABS.slice(1,2).map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} style={{
              display:"flex", alignItems:"center", gap:4, textDecoration:"none",
            }}>
              <span style={{
                fontSize:13, fontFamily:"var(--font-serif)",
                color: active ? "#2C2825" : "#A89880",
                letterSpacing:"0.03em",
                borderBottom: active ? `1px solid #2C2825` : "none",
                paddingBottom: active ? 1 : 0,
              }}>{label}</span>
              {active && <span style={{ width:4, height:4, borderRadius:"50%", background:ROSE }}/>}
            </Link>
          );
        })}

        {/* 오른쪽: 나 */}
        {TABS.slice(2).map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} style={{ textDecoration:"none" }}>
              <span style={{
                fontSize:13, fontFamily:"var(--font-serif)",
                color: active ? "#2C2825" : "#A89880",
                letterSpacing:"0.03em",
                display:"flex", alignItems:"center", gap:3,
              }}>
                {label}
                {active && <span style={{ width:4, height:4, borderRadius:"50%", background:ROSE }}/>}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
