export interface PointerPosition {
  x: number;
  y: number;
}

let lastKnownPointerPosition: PointerPosition | null = null;

function getViewportCenter(): PointerPosition {
  if (typeof window === "undefined") {
    return { x: 0, y: 0 };
  }

  return {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };
}

export function getLastPointerPosition(): PointerPosition {
  return lastKnownPointerPosition ?? getViewportCenter();
}

export function setLastPointerPosition(position: PointerPosition) {
  lastKnownPointerPosition = position;
}
