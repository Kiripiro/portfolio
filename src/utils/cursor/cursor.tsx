import { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import "./cursor.scss";
import {
  getLastPointerPosition,
  setLastPointerPosition,
} from "../pointer/pointerPosition";

type CursorMode =
  | "default"
  | "github"
  | "projects"
  | "certifications"
  | "link-black"
  | "link-white"
  | "link-yellow";

function Cursor({ isDataFetched }: { isDataFetched: boolean }) {
  const initialPosition = getLastPointerPosition();
  const [cursorMode, setCursorMode] = useState<CursorMode>("default");
  const latestMousePosition = useRef(initialPosition);
  const renderedMousePosition = useRef(initialPosition);
  const cursorModeRef = useRef<CursorMode>("default");
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const rafId = useRef<number | null>(null);
  const cursorSizeRef = useRef(16);

  const paintCursorPosition = useCallback(
    ({ immediate = false }: { immediate?: boolean } = {}) => {
      const cursorElement = cursorRef.current;
      if (!cursorElement) return;

      const next = latestMousePosition.current;
      const current = renderedMousePosition.current;

      if (immediate) {
        renderedMousePosition.current = next;
      } else {
        renderedMousePosition.current = {
          x: current.x + (next.x - current.x) * 0.28,
          y: current.y + (next.y - current.y) * 0.28,
        };
      }

      const { x, y } = renderedMousePosition.current;
      const size = cursorSizeRef.current;
      cursorElement.style.transform = `translate3d(${x - size}px, ${y - size}px, 0)`;
    },
    [],
  );

  const animateCursor = useCallback(() => {
    paintCursorPosition();

    const target = latestMousePosition.current;
    const current = renderedMousePosition.current;
    const isStillMoving =
      Math.abs(target.x - current.x) > 0.2 ||
      Math.abs(target.y - current.y) > 0.2;

    if (isStillMoving) {
      rafId.current = requestAnimationFrame(animateCursor);
    } else {
      rafId.current = null;
    }
  }, [paintCursorPosition]);

  function isWebsiteOnDesktop() {
    return (
      window.navigator.userAgent.indexOf("Mobile") === -1 &&
      window.navigator.userAgent.indexOf("Tablet") === -1
    );
  }

  useEffect(() => {
    if (!isDataFetched) return;

    const updateCursorMode = (nextMode: CursorMode) => {
      if (cursorModeRef.current === nextMode) return;
      cursorModeRef.current = nextMode;
      setCursorMode(nextMode);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const nextPosition = { x: e.clientX, y: e.clientY };
      latestMousePosition.current = nextPosition;
      setLastPointerPosition(nextPosition);

      const target = e.target as Element | null;
      const shouldForceDefaultCursor = !!target?.closest(
        '[data-cursor-default="true"]',
      );
      const heroCursorVariant = target
        ?.closest("[data-cursor-hero]")
        ?.getAttribute("data-cursor-hero");
      const ctaButton = target?.closest(".ui_button") as HTMLElement | null;
      const isPrimaryCta = !!ctaButton?.classList.contains("ui_button_primary");
      const isSecondaryCta = !!ctaButton?.classList.contains(
        "ui_button_secondary",
      );
      const isCertificationCard = !!target?.closest(
        '[data-cursor-certification="true"]',
      );
      const isProjectLink = !!target?.closest(
        ".projects_container_list_item:not(.loading)",
      );
      const isGithubLink = !!target?.closest(
        'a[href*="github.com"], [data-tooltip-content="Github"]',
      );

      if (shouldForceDefaultCursor) {
        updateCursorMode("default");
      } else if (heroCursorVariant === "black") {
        updateCursorMode("link-black");
      } else if (heroCursorVariant === "white") {
        updateCursorMode("link-white");
      } else if (heroCursorVariant === "yellow") {
        updateCursorMode("link-yellow");
      } else if (isPrimaryCta) {
        // Inverted contrast for bright CTAs (yellow background -> black cursor).
        updateCursorMode("link-black");
      } else if (isSecondaryCta) {
        // Inverted contrast for dark CTAs (dark background -> yellow cursor).
        updateCursorMode("link-yellow");
      } else if (isCertificationCard) {
        updateCursorMode("certifications");
      } else if (isProjectLink) {
        updateCursorMode("projects");
      } else if (isGithubLink) {
        updateCursorMode("github");
      } else {
        updateCursorMode("default");
      }

      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(animateCursor);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, [animateCursor, isDataFetched]);

  const baseCursorSize = 16;
  const ctaCursorSize = 24;
  const githubCursorSize = 30;
  const certificationCursorSize = 24;
  const projectCursorSize = 40;

  const isCtaCursor =
    cursorMode === "link-black" ||
    cursorMode === "link-white" ||
    cursorMode === "link-yellow";

  const cursorSize =
    cursorMode === "projects"
      ? projectCursorSize
      : cursorMode === "certifications"
        ? certificationCursorSize
        : cursorMode === "github"
          ? githubCursorSize
          : isCtaCursor
            ? ctaCursorSize
            : baseCursorSize;
  cursorSizeRef.current = cursorSize;

  useEffect(() => {
    paintCursorPosition({ immediate: true });
  }, [cursorSize, paintCursorPosition]);

  const cursorStyle: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: cursorSize * 2,
    height: cursorSize * 2,
    borderRadius: "50%",
    backgroundColor:
      cursorMode === "default"
        ? "#C0C0C0"
        : cursorMode === "link-white"
          ? "#EFEFEF"
          : cursorMode === "link-black"
            ? "#111111"
            : "#F7CA18",
    opacity: cursorMode === "default" ? 0.4 : 1,
    border: "2px solid transparent",
    zIndex: 9999,
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition:
      "opacity 0.16s ease-out, background-color 0.16s ease-out, border-color 0.16s ease-out, width 0.16s ease-out, height 0.16s ease-out",
    willChange: "transform",
  };

  if (isWebsiteOnDesktop()) {
    return (
      <div
        className={`cursor-circle ${cursorMode === "projects" ? "project-active" : ""} ${cursorMode === "github" ? "github-active" : ""} ${cursorMode === "certifications" ? "certifications-active" : ""} ${cursorMode === "link-black" ? "link-black-active" : ""} ${cursorMode === "link-white" ? "link-white-active" : ""} ${cursorMode === "link-yellow" ? "link-yellow-active" : ""}`}
        style={cursorStyle}
        ref={cursorRef}
      >
        {cursorMode !== "default" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke={cursorMode === "link-white" ? "#111111" : "#ffffff"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="cursor-arrow"
            style={{ transformOrigin: "center" }}
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        )}
      </div>
    );
  } else return null;
}

export default Cursor;
