import React, { ReactNode, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./hoverImage.scss";
import {
  getLastPointerPosition,
  setLastPointerPosition,
} from "../../../utils/pointer/pointerPosition";

const HoverImage = ({
  children,
  imageSrc,
}: {
  children: ReactNode;
  imageSrc: string;
}) => {
  const IMAGE_WIDTH = 240;
  const IMAGE_HEIGHT = 320;
  const VIEWPORT_PADDING = 24;

  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState(() => getLastPointerPosition());
  const [imagePos, setImagePos] = useState({ top: 0, left: 0 });
  const [showHoverImage, setShowHoverImage] = useState(false);
  const lastMousePosRef = useRef(getLastPointerPosition());
  const lastMoveTimeRef = useRef(Date.now());

  function getClampedImagePosition(x: number, y: number) {
    const minLeft = VIEWPORT_PADDING;
    const maxLeft = Math.max(
      minLeft,
      window.innerWidth - IMAGE_WIDTH - VIEWPORT_PADDING,
    );
    const minTop = VIEWPORT_PADDING;
    const maxTop = Math.max(
      minTop,
      window.innerHeight - IMAGE_HEIGHT - VIEWPORT_PADDING,
    );

    const left = Math.min(Math.max(x - IMAGE_WIDTH / 2, minLeft), maxLeft);
    const top = Math.min(Math.max(y - IMAGE_HEIGHT / 2, minTop), maxTop);

    return { top, left };
  }

  useEffect(() => {
    const savedMousePos = getLastPointerPosition();
    setMousePos(savedMousePos);
    lastMousePosRef.current = savedMousePos;

    const timer = setTimeout(() => {
      setShowHoverImage(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isHovering) return;

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      const deltaTime = Math.max(currentTime - lastMoveTimeRef.current, 1);
      const deltaX = e.clientX - lastMousePosRef.current.x;
      const deltaY = e.clientY - lastMousePosRef.current.y;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const speed = distance / deltaTime;

      const newMousePos = { x: e.clientX, y: e.clientY };
      setMousePos(newMousePos);
      setImagePos(getClampedImagePosition(e.clientX, e.clientY));
      lastMousePosRef.current = newMousePos;
      lastMoveTimeRef.current = currentTime;
      setLastPointerPosition(newMousePos);

      if (speed > 17) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovering]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    lastMousePosRef.current = mousePos;
    lastMoveTimeRef.current = Date.now();
    setImagePos(getClampedImagePosition(mousePos.x, mousePos.y));
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="hover-image-container"
    >
      {children}
      {showHoverImage && (
        <motion.img
          src={imageSrc}
          alt="hover"
          className={`hover-image ${isHovering ? "show" : ""}`}
          animate={{
            top: imagePos.top,
            left: imagePos.left,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 50 }}
          style={{
            position: "fixed",
            height: "auto",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
};

export default HoverImage;
