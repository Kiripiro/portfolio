import React, { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './HoverImage.scss';

const HoverImage = ({ children, imageSrc }: { children: ReactNode, imageSrc: string }) => {
    const [isHovering, setIsHovering] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
    const [lastMoveTime, setLastMoveTime] = useState(Date.now());
    const [showHoverImage, setShowHoverImage] = useState(false);

    useEffect(() => {
        const savedMousePos = JSON.parse(localStorage.getItem('mousePosition') || '{"x": 0, "y": 0}');
        setMousePos(savedMousePos);
        setLastMousePos(savedMousePos);

        const timer = setTimeout(() => {
            setShowHoverImage(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!isHovering) return;

        const handleMouseMove = (e: any) => {
            const currentTime = Date.now();
            const deltaTime = currentTime - lastMoveTime;
            const deltaX = e.clientX - lastMousePos.x;
            const deltaY = e.clientY - lastMousePos.y;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const speed = distance / deltaTime;

            const newMousePos = { x: e.clientX, y: e.clientY };
            setMousePos(newMousePos);
            setLastMousePos(newMousePos);
            setLastMoveTime(currentTime);

            localStorage.setItem('mousePosition', JSON.stringify(newMousePos));

            if (speed > 17) {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isHovering, lastMousePos, lastMoveTime]);

    const handleMouseEnter = () => {
        setIsHovering(true);
        setLastMousePos(mousePos);
        setLastMoveTime(Date.now());
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className='hover-image-container'
        >
            {children}
            {showHoverImage && (
                <motion.img
                    src={imageSrc}
                    alt="hover"
                    className={`hover-image ${isHovering ? 'show' : ''}`}
                    animate={{
                        top: mousePos.y - 50, // Adjust the offset to center the image under the cursor
                        left: mousePos.x - 50, // Adjust the offset to center the image under the cursor
                    }}
                    transition={{ type: 'spring', stiffness: 150, damping: 50 }}
                    style={{
                        position: 'fixed',
                        width: '250px', // Adjust size as needed
                        height: 'auto', // Adjust size as needed
                        pointerEvents: 'none', // Ensures the image does not block cursor events
                    }}
                />
            )}
        </div>
    );
};

export default HoverImage;
