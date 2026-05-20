"use client";

import { useState, useEffect, useCallback } from "react";
import type { Byproduct } from "@/lib/byproducts";

export interface CollectedByproduct {
  byproduct: Byproduct;
  collectedAt: string; // ISO date
  count: number;       // 중복 수집 횟수
}

const KEY = "onulmood_byproducts";

export function useByproductStore() {
  const [collection, setCollection] = useState<CollectedByproduct[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setCollection(JSON.parse(raw));
    } catch { /* ignore */ }
    setLoaded(true);
  }, []);

  const persist = useCallback((next: CollectedByproduct[]) => {
    setCollection(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* ignore */ }
  }, []);

  const addByproduct = useCallback((bp: Byproduct) => {
    setCollection((prev) => {
      const existing = prev.find((c) => c.byproduct.id === bp.id);
      const next = existing
        ? prev.map((c) => c.byproduct.id === bp.id ? { ...c, count: c.count + 1 } : c)
        : [...prev, { byproduct: bp, collectedAt: new Date().toISOString(), count: 1 }];
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const clearAll = useCallback(() => persist([]), [persist]);

  const totalCount  = collection.reduce((s, c) => s + c.count, 0);
  const uniqueCount = collection.length;

  return { collection, loaded, addByproduct, clearAll, totalCount, uniqueCount };
}
