import React, { useRef } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    speed?: number;
    tolerance?: number;
    scale?: number;
    debug?: boolean;
    borderRadius?: number | string;
}


const MagneticButton: React.FC<MagneticButtonProps> = ({
    children,
    className,
    speed = 1,
    tolerance = 0.9,
    scale = 1.,
    debug = false,
    borderRadius = 0,
    ...props
}) => {
    const $root = useRef<HTMLButtonElement | null>(null);
    const $item = useRef<HTMLSpanElement | null>(null);
    const $hover = useRef<HTMLSpanElement | null>(null);
    const rootBound = useRef<DOMRect | null>(null);
    const itemBound = useRef<DOMRect | null>(null);
    const diffBound = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    const handleMouseEnter = () => {
        gsap.killTweensOf($item.current);
        gsap.set($hover.current, {
            scale: scale,
            borderRadius,
            background: debug ? 'rgba(0, 125, 255, .4)' : 'transparent',
        });


        if ($root.current && $item.current && $hover.current) {
            rootBound.current = $root.current.getBoundingClientRect();
            itemBound.current = $item.current.getBoundingClientRect();
            diffBound.current.x = (rootBound.current.width * scale - rootBound.current.width) / 2;
            diffBound.current.y = (rootBound.current.height * scale - rootBound.current.height) / 2;
        }
    };

    const handleMouseLeave = () => {
        gsap.killTweensOf($item.current);
        gsap.to($item.current, {
            x: 0,
            y: 0,
            ease: 'elastic.out(1.1, .4)',
            duration: 1.2,
        });
        gsap.set($hover.current, {
            scale: 1,
        });
    };

    const handleMouseMove = (e: any) => {
        const x = e.clientX || e.touches[0].clientX;
        const y = e.clientY || e.touches[0].clientY;

        if (!rootBound.current || !itemBound.current) return;

        const maxX = (rootBound.current.width - itemBound.current.width) / 2 * tolerance;
        const maxY = (rootBound.current.height - itemBound.current.height) / 2 * tolerance;

        const newX = gsap.utils.mapRange(
            0,
            rootBound.current.width * scale,
            -maxX,
            maxX,
            x - rootBound.current.x + diffBound.current.x
        );

        const newY = gsap.utils.mapRange(
            0,
            rootBound.current.height * scale,
            -maxY,
            maxY,
            y - rootBound.current.y + diffBound.current.y
        );

        gsap.killTweensOf($item.current);
        gsap.to($item.current, {
            x: newX,
            y: newY,
            ease: 'power3.out',
            duration: speed,
        });
    };

    return (
        <button
            ref={$root}
            className={`magnetic-button ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onTouchMove={handleMouseMove}
            onTouchStart={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchEnd={handleMouseLeave}
            {...props}
        >
            <span ref={$item} className="magnetic-button--item">
                {children}
            </span>
            <span ref={$hover} className="magnetic-button--hover" />
        </button>
    );
};

export default MagneticButton;
