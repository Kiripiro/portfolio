import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const SunSVG = () => {
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
            viewBox="0 0 64 64"
            aria-labelledby="title"
            aria-describedby="desc"
            role="img"
        >
            <motion.path
                variants={variants}
                initial="start"
                animate={isVisible ? "visible" : "hidden"}
                data-name="layer2"
                fill="none"
                stroke="black"
                stroke-width="8"
                d="M32 2v16m0 28v16m30-30H46m-28 0H2m8.8-21.2l11.3 11.3m19.8 19.8l11.3 11.3m0-42.4L41.9 22.1M22.1 41.9L10.8 53.2"
                stroke-linejoin="round"
                stroke-linecap="round"
            />
            <motion.circle
                variants={variants}
                initial="start"
                animate={isVisible ? "visible" : "hidden"}
                data-name="layer1"
                cx="32"
                cy="32"
                r="14"
                fill="none"
                stroke="black"
                stroke-width="8"
                stroke-linejoin="round"
                stroke-linecap="round"
            />
        </motion.svg>
    );
};

export default SunSVG;
