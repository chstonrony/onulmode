const KEY = "ugegi_shred_v1";

export interface ShredRecord {
  id: string;
  savedAt: string;
  emotions: string[];
  productName: string;
  productEmoji: string;
  killerLine: string;
  errorCode: string;
  warningMessage: string;
}

export function saveShredRecord(r: Omit<ShredRecord, "id" | "savedAt">): ShredRecord {
  const records = getShredRecords();
  const record: ShredRecord = { ...r, id: Math.random().toString(36).slice(2), savedAt: new Date().toISOString() };
  records.unshift(record);
  if (records.length > 100) records.pop();
  try { localStorage.setItem(KEY, JSON.stringify(records)); } catch {}
  return record;
}

export function getShredRecords(): ShredRecord[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}
