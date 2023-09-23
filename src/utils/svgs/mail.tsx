import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const MailSVG = () => {
    const [isVisible, setIsVisible] = useState(false);

    const variants = {
        hidden: {
            opacity: 0,
            pathLength: 0,
        },
        visible: {
            opacity: 1,
            pathLength: 1,
            transition: {
                duration: 2,
                ease: 'easeInOut',
            },
        },
    };

    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && entry.intersectionRatio == 1 && svgRef.current) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 1,
            }
        );
        if (svgRef.current)
            observer.observe(svgRef.current);

        return () => {
            if (svgRef.current)
                observer.unobserve(svgRef.current);
        };
    }, []);

    return (
        <motion.svg
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        >
            <motion.path variants={variants} initial="start" animate={isVisible ? "visible" : "hidden"} d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 0l8 7 8-7"></motion.path>
        </motion.svg>
    );
};

export default MailSVG;
