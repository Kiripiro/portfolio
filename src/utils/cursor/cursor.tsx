import { CSSProperties, useEffect, useState } from 'react';

function Cursor() {
    const storedPosition = JSON.parse(localStorage.getItem('mousePosition') || '{}');
    const [mousePosition, setMousePosition] = useState(storedPosition);
    const [hoveringLink, setHoveringLink] = useState(false);
    const [hoveringProject, setHoveringProject] = useState(false);

    function isWebsiteOnDesktop() {
        return window.navigator.userAgent.indexOf('Mobile') === -1 && window.navigator.userAgent.indexOf('Tablet') === -1;
    }

    useEffect(() => {
        const handleMouseEnterLink = () => {
            setHoveringLink(true);
        };

        const handleMouseLeaveLink = () => {
            setHoveringLink(false);
        };

        const handleMouseEnterProject = () => {
            setHoveringProject(true);
        };

        const handleMouseLeaveProject = () => {
            setHoveringProject(false);
        };

        const links = document.querySelectorAll('a');
        const projectDivs = document.querySelectorAll('.projects_container_list_item');

        if (links) {
            links.forEach((link) => {
                link.addEventListener('mouseover', handleMouseEnterLink);
                link.addEventListener('mouseout', handleMouseLeaveLink);
            });
        }

        if (projectDivs) {
            console.log('test')
            projectDivs.forEach((div) => {
                div.addEventListener('mouseover', handleMouseEnterProject);
                div.addEventListener('mouseout', handleMouseLeaveProject);
            });
        }

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            localStorage.setItem('mousePosition', JSON.stringify({ x: e.clientX, y: e.clientY }));
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const baseCursorSize = 16;
    const linkCursorSize = 32;
    const projectCursorSize = 40;

    const cursorSize = hoveringLink ? linkCursorSize : hoveringProject ? projectCursorSize : baseCursorSize;

    const cursorStyle: CSSProperties = {
        position: 'fixed',
        top: mousePosition.y - cursorSize,
        left: mousePosition.x - cursorSize,
        width: cursorSize * 2,
        height: cursorSize * 2,
        borderRadius: '50%',
        backgroundColor: hoveringProject ? '#F7CA18' : (hoveringLink ? 'transparent' : '#C0C0C0'),
        opacity: hoveringLink || hoveringProject ? 1 : 0.4,
        border: `2px solid ${hoveringProject ? 'transparent' : (hoveringLink ? '#efefef' : 'transparent')}`,
        zIndex: 9999,
        pointerEvents: 'none',
        cursor: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
        transform: hoveringProject ? 'scale(1.2)' : 'scale(1)',
    };

    if (isWebsiteOnDesktop()) {
        return (
            <div className="cursor-circle" style={cursorStyle}>
                {hoveringProject && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="cursor-arrow"
                        style={{ transformOrigin: 'center' }}
                    >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                    </svg>
                )}
            </div>
        );
    } else
        return null;
}

export default Cursor;
