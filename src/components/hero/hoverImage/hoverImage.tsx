import React, { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './HoverImage.scss';

const HoverImage = ({ children, imageSrc }: { children: ReactNode, imageSrc: string }) => {
    const [isHovering, setIsHovering] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
    const [lastMoveTime, setLastMoveTime] = useState(Date.now());

    useEffect(() => {
        if (!isHovering) return;

        const handleMouseMove = (e: any) => {
            const currentTime = Date.now();
            const deltaTime = currentTime - lastMoveTime;
            const deltaX = e.clientX - lastMousePos.x;
            const deltaY = e.clientY - lastMousePos.y;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const speed = distance / deltaTime;

            setMousePos({ x: e.clientX, y: e.clientY });
            setLastMousePos({ x: e.clientX, y: e.clientY });
            setLastMoveTime(currentTime);


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
            <motion.img
                src={imageSrc}
                alt="hover"
                className={`hover-image ${isHovering ? 'show' : ''}`}
                animate={{
                    top: mousePos.y,
                    left: mousePos.x,
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 50 }}
                style={{
                    position: 'fixed',
                }}
            />
        </div>
    );
};

export default HoverImage;
