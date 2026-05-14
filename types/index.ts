export type EmotionType =
  | "joy"
  | "calm"
  | "sad"
  | "anxious"
  | "angry"
  | "excited"
  | "tired"
  | "grateful";

export interface MoodEntry {
  id: string;
  date: string; // YYYY-MM-DD
  emotion: EmotionType;
  intensity: number; // 1-5
  title: string;
  body: string;
  createdAt: string;
}
