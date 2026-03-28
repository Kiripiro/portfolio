import { createContext } from "react";

export interface SmoothScrollSnapshot {
  scroll: number;
  progress: number;
  velocity: number;
  direction: number;
}

export interface SmoothScrollContextValue {
  scrollToHash: (hash: string) => void;
  scrollToSection: (sectionId: string) => void;
  subscribe: (
    listener: (snapshot: SmoothScrollSnapshot) => void,
  ) => () => void;
}

export const SmoothScrollContext =
  createContext<SmoothScrollContextValue | null>(null);
