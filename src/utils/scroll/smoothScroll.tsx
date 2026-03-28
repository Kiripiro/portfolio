import Lenis from "lenis";
import { useCallback, useEffect, useRef } from "react";
import {
  SmoothScrollContext,
  type SmoothScrollSnapshot,
} from "./smoothScrollContext";

const SCROLL_TO_OPTIONS = {
  duration: 1.05,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
};

function normalizeHash(hash: string) {
  return hash.startsWith("#") ? hash.slice(1) : hash;
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const listenersRef = useRef(
    new Set<(snapshot: SmoothScrollSnapshot) => void>(),
  );
  const lastSnapshotRef = useRef<SmoothScrollSnapshot>({
    scroll: 0,
    progress: 0,
    velocity: 0,
    direction: 0,
  });

  const subscribe = useCallback(
    (listener: (snapshot: SmoothScrollSnapshot) => void) => {
      listenersRef.current.add(listener);
      listener(lastSnapshotRef.current);

      return () => {
        listenersRef.current.delete(listener);
      };
    },
    [],
  );

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      easing: SCROLL_TO_OPTIONS.easing,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.05,
    });
    lenisRef.current = lenis;
    let animationFrameId = 0;

    const emitScrollSnapshot = (instance: Lenis) => {
      const snapshot = {
        scroll: instance.scroll,
        progress: instance.progress,
        velocity: instance.velocity,
        direction: instance.direction,
      };

      lastSnapshotRef.current = snapshot;
      listenersRef.current.forEach((listener) => listener(snapshot));
    };

    lenis.on("scroll", emitScrollSnapshot);
    emitScrollSnapshot(lenis);

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.off("scroll", emitScrollSnapshot);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollToElement = useCallback((element: HTMLElement) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(element, SCROLL_TO_OPTIONS);
      return;
    }

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const normalizedId = normalizeHash(sectionId);
      const section = document.getElementById(normalizedId);
      if (!section) return;
      scrollToElement(section);
    },
    [scrollToElement],
  );

  const scrollToHash = useCallback(
    (hash: string) => {
      const normalizedId = normalizeHash(hash);
      if (!normalizedId) return;
      scrollToSection(normalizedId);
    },
    [scrollToSection],
  );

  return (
    <SmoothScrollContext.Provider
      value={{ scrollToHash, scrollToSection, subscribe }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
}
