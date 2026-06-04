import { EmotionType } from "@/types";
import { Sun, Leaf, CloudRain, Zap, Flame, Sparkles, Moon, Heart, type LucideIcon } from "lucide-react";

export interface EmotionConfig {
  type: EmotionType;
  label: string;
  labelEn: string;
  icon: LucideIcon;
  color: string;   /* icon / text */
  bg: string;      /* card background */
  border: string;  /* card border */
  quote: string;
  quoteEn: string;
}

export const EMOTIONS: EmotionConfig[] = [
  {
    type: "joy",
    label: "기쁨", labelEn: "Joy", icon: Sun,
    color: "#92400E", bg: "#FDE68A", border: "#F59E0B",
    quote: "오늘은 빛나는 하루였어요",
    quoteEn: "A bright and shining day.",
  },
  {
    type: "calm",
    label: "평온", labelEn: "Calm", icon: Leaf,
    color: "#065F46", bg: "#A7F3D0", border: "#34D399",
    quote: "마음이 고요하게 가라앉은 날",
    quoteEn: "A day when everything felt still.",
  },
  {
    type: "excited",
    label: "설렘", labelEn: "Excited", icon: Sparkles,
    color: "#7C2D12", bg: "#FED7AA", border: "#F97316",
    quote: "가슴이 두근거리는 하루",
    quoteEn: "Heart fluttering all day.",
  },
  {
    type: "grateful",
    label: "감사", labelEn: "Grateful", icon: Heart,
    color: "#831843", bg: "#FBCFE8", border: "#EC4899",
    quote: "감사한 마음이 차오르는 날",
    quoteEn: "Feeling full of gratitude.",
  },
  {
    type: "sad",
    label: "슬픔", labelEn: "Sad", icon: CloudRain,
    color: "#1E3A8A", bg: "#BFDBFE", border: "#60A5FA",
    quote: "마음이 무겁게 가라앉은 날",
    quoteEn: "Something heavy settled in today.",
  },
  {
    type: "anxious",
    label: "불안", labelEn: "Anxious", icon: Zap,
    color: "#581C87", bg: "#E9D5FF", border: "#C084FC",
    quote: "걱정과 긴장이 맴도는 하루",
    quoteEn: "Worry and tension lingering all day.",
  },
  {
    type: "angry",
    label: "분노", labelEn: "Angry", icon: Flame,
    color: "#7F1D1D", bg: "#FECACA", border: "#F87171",
    quote: "화가 치밀어 오른 하루",
    quoteEn: "Frustration boiling up inside.",
  },
  {
    type: "tired",
    label: "피로", labelEn: "Tired", icon: Moon,
    color: "#1E293B", bg: "#CBD5E1", border: "#94A3B8",
    quote: "몸과 마음이 지친 하루",
    quoteEn: "Body and mind both worn out.",
  },
];

export const EMOTION_MAP = Object.fromEntries(
  EMOTIONS.map((e) => [e.type, e])
) as Record<EmotionType, EmotionConfig>;

export function getEmotion(type: EmotionType): EmotionConfig {
  return EMOTION_MAP[type];
}
