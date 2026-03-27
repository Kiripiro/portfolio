import React, { useRef } from "react";
import gsap from "gsap";

interface MagneticButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  tolerance?: number;
  scale?: number;
  debug?: boolean;
  borderRadius?: number | string;
  style?: React.CSSProperties;
}

interface MagneticLayerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  tolerance?: number;
  scale?: number;
  debug?: boolean;
  borderRadius?: number | string;
  style?: React.CSSProperties;
}

function assignRef<T>(
  ref: React.ForwardedRef<T>,
  value: T | null,
): void {
  if (typeof ref === "function") {
    ref(value);
    return;
  }

  if (ref) {
    ref.current = value;
  }
}

const MagneticButton = React.forwardRef<HTMLButtonElement, MagneticButtonProps>(
  (
    {
      children,
      className,
      speed = 1,
      tolerance = 0.9,
      scale = 1,
      debug = false,
      borderRadius = 0,
      style,
      onMouseEnter,
      onMouseMove,
      onMouseLeave,
      onTouchMove,
      onTouchStart,
      onTouchEnd,
      ...props
    },
    forwardedRef,
  ) => {
    const $root = useRef<HTMLButtonElement | null>(null);
    const $item = useRef<HTMLSpanElement | null>(null);
    const $hover = useRef<HTMLSpanElement | null>(null);
    const rootBound = useRef<DOMRect | null>(null);
    const itemBound = useRef<DOMRect | null>(null);
    const diffBound = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    const refreshBounds = () => {
      if (!$root.current || !$item.current) return;
      rootBound.current = $root.current.getBoundingClientRect();
      itemBound.current = $item.current.getBoundingClientRect();
      diffBound.current.x =
        (rootBound.current.width * scale - rootBound.current.width) / 2;
      diffBound.current.y =
        (rootBound.current.height * scale - rootBound.current.height) / 2;
    };

    const getMagneticPosition = (x: number, y: number) => {
      if (!rootBound.current || !itemBound.current) return null;

      const maxX =
        ((rootBound.current.width - itemBound.current.width) / 2) * tolerance;
      const maxY =
        ((rootBound.current.height - itemBound.current.height) / 2) * tolerance;

      const mappedX = gsap.utils.mapRange(
        0,
        rootBound.current.width * scale,
        -maxX,
        maxX,
        x - rootBound.current.x + diffBound.current.x,
      );

      const mappedY = gsap.utils.mapRange(
        0,
        rootBound.current.height * scale,
        -maxY,
        maxY,
        y - rootBound.current.y + diffBound.current.y,
      );

      const newX = gsap.utils.clamp(-maxX, maxX, mappedX);
      const newY = gsap.utils.clamp(-maxY, maxY, mappedY);

      return { newX, newY };
    };

    const isWebsiteOnDesktop = () => {
      return (
        window.innerWidth > 768 &&
        window.innerHeight > 768 &&
        window.navigator.userAgent.indexOf("Mobile") === -1 &&
        window.navigator.userAgent.indexOf("Tablet") === -1
      );
    };

    const handleMouseEnterInternal = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      gsap.killTweensOf($item.current);
      gsap.set($hover.current, {
        scale: scale,
        borderRadius,
        background: debug ? "rgba(0, 125, 255, .4)" : "transparent",
      });

      if ($hover.current) refreshBounds();
      onMouseEnter?.(event);
    };

    const handleMouseLeaveInternal = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      gsap.killTweensOf($item.current);
      gsap.to($item.current, {
        x: 0,
        y: 0,
        ease: "elastic.out(1.1, .4)",
        duration: 1.2,
      });
      gsap.set($hover.current, {
        scale: 1,
      });
      onMouseLeave?.(event);
    };

    const handleMouseMoveInternal = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      if (!isWebsiteOnDesktop()) {
        onMouseMove?.(event);
        return;
      }
      const x = event.clientX;
      const y = event.clientY;

      refreshBounds();
      const position = getMagneticPosition(x, y);
      if (!position) {
        onMouseMove?.(event);
        return;
      }

      gsap.killTweensOf($item.current);
      gsap.to($item.current, {
        x: position.newX,
        y: position.newY,
        ease: "power3.out",
        duration: speed,
      });
      onMouseMove?.(event);
    };

    const handleTouchMoveInternal = (
      event: React.TouchEvent<HTMLButtonElement>,
    ) => {
      const touch = event.touches[0];
      handleMove(touch.clientX, touch.clientY);
      onTouchMove?.(event);
    };

    const handleTouchStartInternal = (
      event: React.TouchEvent<HTMLButtonElement>,
    ) => {
      const touch = event.touches[0];
      handleMoveStart(touch.clientX, touch.clientY);
      onTouchStart?.(event);
    };

    const handleTouchEndInternal = (
      event: React.TouchEvent<HTMLButtonElement>,
    ) => {
      gsap.killTweensOf($item.current);
      gsap.set($hover.current, {
        scale: scale,
        borderRadius,
        background: debug ? "rgba(0, 125, 255, .4)" : "transparent",
      });

      gsap.set($item.current, {
        x: 0,
        y: 0,
      });
      onTouchEnd?.(event);
    };

    const handleMoveStart = (x: number, y: number) => {
      refreshBounds();
      const position = getMagneticPosition(x, y);
      if (!position) return;

      gsap.killTweensOf($item.current);
      gsap.set($hover.current, {
        scale: scale,
        borderRadius,
        background: debug ? "rgba(0, 125, 255, .4)" : "transparent",
      });

      gsap.set($item.current, {
        x: position.newX,
        y: position.newY,
      });
    };

    const handleMove = (x: number, y: number) => {
      refreshBounds();
      const position = getMagneticPosition(x, y);
      if (!position) return;

      gsap.killTweensOf($item.current);
      gsap.to($item.current, {
        x: position.newX,
        y: position.newY,
        ease: "power3.out",
        duration: speed,
      });
    };

    return (
      <div className="magnetic-button-container">
        <button
          ref={(node) => {
            $root.current = node;
            assignRef(forwardedRef, node);
          }}
          className={`magnetic-button ${className}`}
          onMouseEnter={handleMouseEnterInternal}
          onMouseMove={handleMouseMoveInternal}
          onMouseLeave={handleMouseLeaveInternal}
          onTouchMove={handleTouchMoveInternal}
          onTouchStart={handleTouchStartInternal}
          onTouchEnd={handleTouchEndInternal}
          style={style}
          {...props}
        >
          <span ref={$item} className="magnetic-button--item">
            {children}
          </span>
          <span ref={$hover} className="magnetic-button--hover" />
        </button>
      </div>
    );
  },
);

MagneticButton.displayName = "MagneticButton";

export function MagneticLayer({
  children,
  className,
  speed = 1,
  tolerance = 0.9,
  scale = 1,
  debug = false,
  borderRadius = 0,
  style,
  onMouseEnter,
  onMouseMove,
  onMouseLeave,
  onTouchMove,
  onTouchStart,
  onTouchEnd,
  ...props
}: MagneticLayerProps) {
  const $root = useRef<HTMLDivElement | null>(null);
  const $item = useRef<HTMLSpanElement | null>(null);
  const $hover = useRef<HTMLSpanElement | null>(null);
  const rootBound = useRef<DOMRect | null>(null);
  const itemBound = useRef<DOMRect | null>(null);
  const diffBound = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const refreshBounds = () => {
    if (!$root.current || !$item.current) return;
    rootBound.current = $root.current.getBoundingClientRect();
    itemBound.current = $item.current.getBoundingClientRect();
    diffBound.current.x =
      (rootBound.current.width * scale - rootBound.current.width) / 2;
    diffBound.current.y =
      (rootBound.current.height * scale - rootBound.current.height) / 2;
  };

  const getMagneticPosition = (x: number, y: number) => {
    if (!rootBound.current || !itemBound.current) return null;

    const maxX =
      ((rootBound.current.width - itemBound.current.width) / 2) * tolerance;
    const maxY =
      ((rootBound.current.height - itemBound.current.height) / 2) * tolerance;

    const mappedX = gsap.utils.mapRange(
      0,
      rootBound.current.width * scale,
      -maxX,
      maxX,
      x - rootBound.current.x + diffBound.current.x,
    );

    const mappedY = gsap.utils.mapRange(
      0,
      rootBound.current.height * scale,
      -maxY,
      maxY,
      y - rootBound.current.y + diffBound.current.y,
    );

    const newX = gsap.utils.clamp(-maxX, maxX, mappedX);
    const newY = gsap.utils.clamp(-maxY, maxY, mappedY);

    return { newX, newY };
  };

  const isWebsiteOnDesktop = () => {
    return (
      window.innerWidth > 768 &&
      window.innerHeight > 768 &&
      window.navigator.userAgent.indexOf("Mobile") === -1 &&
      window.navigator.userAgent.indexOf("Tablet") === -1
    );
  };

  const handleMouseEnterInternal = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    gsap.killTweensOf($item.current);
    gsap.set($hover.current, {
      scale: scale,
      borderRadius,
      background: debug ? "rgba(0, 125, 255, .4)" : "transparent",
    });

    if ($hover.current) refreshBounds();
    onMouseEnter?.(event);
  };

  const handleMouseLeaveInternal = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    gsap.killTweensOf($item.current);
    gsap.to($item.current, {
      x: 0,
      y: 0,
      ease: "elastic.out(1.1, .4)",
      duration: 1.2,
    });
    gsap.set($hover.current, {
      scale: 1,
    });
    onMouseLeave?.(event);
  };

  const handleMouseMoveInternal = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (!isWebsiteOnDesktop()) {
      onMouseMove?.(event);
      return;
    }
    const x = event.clientX;
    const y = event.clientY;

    refreshBounds();
    const position = getMagneticPosition(x, y);
    if (!position) {
      onMouseMove?.(event);
      return;
    }

    gsap.killTweensOf($item.current);
    gsap.to($item.current, {
      x: position.newX,
      y: position.newY,
      ease: "power3.out",
      duration: speed,
    });
    onMouseMove?.(event);
  };

  const handleMoveStart = (x: number, y: number) => {
    refreshBounds();
    const position = getMagneticPosition(x, y);
    if (!position) return;

    gsap.killTweensOf($item.current);
    gsap.set($hover.current, {
      scale: scale,
      borderRadius,
      background: debug ? "rgba(0, 125, 255, .4)" : "transparent",
    });

    gsap.set($item.current, {
      x: position.newX,
      y: position.newY,
    });
  };

  const handleMove = (x: number, y: number) => {
    refreshBounds();
    const position = getMagneticPosition(x, y);
    if (!position) return;

    gsap.killTweensOf($item.current);
    gsap.to($item.current, {
      x: position.newX,
      y: position.newY,
      ease: "power3.out",
      duration: speed,
    });
  };

  return (
    <div
      ref={$root}
      className={`magnetic-layer ${className ?? ""}`.trim()}
      onMouseEnter={handleMouseEnterInternal}
      onMouseMove={handleMouseMoveInternal}
      onMouseLeave={handleMouseLeaveInternal}
      onTouchMove={(event) => {
        const touch = event.touches[0];
        handleMove(touch.clientX, touch.clientY);
        onTouchMove?.(event);
      }}
      onTouchStart={(event) => {
        const touch = event.touches[0];
        handleMoveStart(touch.clientX, touch.clientY);
        onTouchStart?.(event);
      }}
      onTouchEnd={(event) => {
        gsap.killTweensOf($item.current);
        gsap.set($hover.current, {
          scale: scale,
          borderRadius,
          background: debug ? "rgba(0, 125, 255, .4)" : "transparent",
        });
        gsap.set($item.current, {
          x: 0,
          y: 0,
        });
        onTouchEnd?.(event);
      }}
      style={style}
      {...props}
    >
      <span ref={$item} className="magnetic-button--item">
        {children}
      </span>
      <span ref={$hover} className="magnetic-button--hover" />
    </div>
  );
}

export default MagneticButton;
