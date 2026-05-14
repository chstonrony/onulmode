"use client";

import { useState, useEffect, useCallback } from "react";
import { MoodEntry, EmotionType } from "@/types";

const STORAGE_KEY = "onulmode_entries";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function loadEntries(): MoodEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveEntries(entries: MoodEntry[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function useMoodStore() {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setEntries(loadEntries());
    setLoaded(true);
  }, []);

  const addEntry = useCallback(
    (data: {
      date: string;
      emotion: EmotionType;
      intensity: number;
      title: string;
      body: string;
    }): MoodEntry => {
      const entry: MoodEntry = {
        id: generateId(),
        ...data,
        createdAt: new Date().toISOString(),
      };
      setEntries((prev) => {
        const filtered = prev.filter((e) => e.date !== data.date);
        const next = [entry, ...filtered];
        saveEntries(next);
        return next;
      });
      return entry;
    },
    []
  );

  const updateEntry = useCallback(
    (id: string, data: Partial<Omit<MoodEntry, "id" | "createdAt">>) => {
      setEntries((prev) => {
        const next = prev.map((e) => (e.id === id ? { ...e, ...data } : e));
        saveEntries(next);
        return next;
      });
    },
    []
  );

  const deleteEntry = useCallback((id: string) => {
    setEntries((prev) => {
      const next = prev.filter((e) => e.id !== id);
      saveEntries(next);
      return next;
    });
  }, []);

  const getEntryByDate = useCallback(
    (date: string): MoodEntry | undefined => {
      return entries.find((e) => e.date === date);
    },
    [entries]
  );

  const getEntriesForMonth = useCallback(
    (year: number, month: number): MoodEntry[] => {
      const prefix = `${year}-${String(month).padStart(2, "0")}`;
      return entries.filter((e) => e.date.startsWith(prefix));
    },
    [entries]
  );

  return {
    entries,
    loaded,
    addEntry,
    updateEntry,
    deleteEntry,
    getEntryByDate,
    getEntriesForMonth,
  };
}
