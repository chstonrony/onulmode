const KEY    = "ugegi_shred_v3";
const KEY_V2 = "ugegi_shred_v2";
const KEY_V1 = "ugegi_shred_v1";

export interface ShredRecord {
  id: string;
  savedAt: string;
  emotions: string[];
  productName: string;
  productEmoji: string;
  killerLine: string;
  errorCode: string;
  warningMessage: string;
  /* v2 */
  compostName?: string;
  compostDesc?: string;
  seedQuestion?: string;
  growthPct?: number;
  /* v3 — 감정퇴비실 */
  ugogitranslation?: string; // 우걱이 번역
  compostNoun?: string;      // 퇴비화 결과 명사
  compostEmoji?: string;     // 퇴비 이모지
  userNote?: string;         // 사용자 한 줄 기록
}

export function saveShredRecord(r: Omit<ShredRecord, "id" | "savedAt">): ShredRecord {
  const records = getShredRecords();
  const record: ShredRecord = {
    ...r,
    id: Math.random().toString(36).slice(2),
    savedAt: new Date().toISOString(),
  };
  records.unshift(record);
  if (records.length > 200) records.pop();
  try { localStorage.setItem(KEY, JSON.stringify(records)); } catch {}
  return record;
}

export function getShredRecords(): ShredRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const v3 = JSON.parse(localStorage.getItem(KEY) || "[]") as ShredRecord[];
    /* 마이그레이션: v1/v2 → v3 */
    const older: ShredRecord[] = [];
    for (const k of [KEY_V2, KEY_V1]) {
      const raw = localStorage.getItem(k);
      if (raw) {
        try { older.push(...(JSON.parse(raw) as ShredRecord[])); } catch {}
        try { localStorage.removeItem(k); } catch {}
      }
    }
    if (older.length > 0) {
      const merged = [...v3, ...older.filter(o => !v3.find(n => n.id === o.id))];
      try { localStorage.setItem(KEY, JSON.stringify(merged)); } catch {}
      return merged;
    }
    return v3;
  } catch { return []; }
}

export function updateUserNote(id: string, note: string): void {
  const records = getShredRecords();
  const idx = records.findIndex(r => r.id === id);
  if (idx < 0) return;
  records[idx] = { ...records[idx], userNote: note };
  try { localStorage.setItem(KEY, JSON.stringify(records)); } catch {}
}

export function deleteShredRecord(id: string): void {
  const records = getShredRecords().filter(r => r.id !== id);
  try { localStorage.setItem(KEY, JSON.stringify(records)); } catch {}
}

/* 전체 씨앗 통계 */
export function getSeedStats(): Record<string, number> {
  const records = getShredRecords();
  const stats: Record<string, number> = {};
  records.forEach(r => {
    if (r.compostNoun) {
      stats[r.compostNoun] = (stats[r.compostNoun] || 0) + 1;
    }
  });
  return stats;
}
