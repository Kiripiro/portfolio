import './preloader.scss';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';


export const opacity = {
    initial: {
        opacity: 0
    },
    enter: {
        opacity: 0.75,
        transition: { duration: 1, delay: 0.2 }
    },
}

export const slideUp = {
    initial: {
        top: 0
    },
    exit: {
        top: "-100vh",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
    }
}

const words = ["Alexandre Tourret", "Web developer", "Angular", "React", "Node.js", "TypeScript", "Young", "Passionate", "Welcome to my portfolio"]

function Preloader({ setIsLoading }: { setIsLoading: Dispatch<SetStateAction<boolean>> }) {
    const [index, setIndex] = useState(0);
    const [dimension, setDimension] = useState({ width: 0, height: 0 });
    let timeout: NodeJS.Timeout;

    useEffect(() => {
        setDimension({ width: window.innerWidth, height: window.innerHeight })
    }, [])

    useEffect(() => {
        const delay = index === 0 ? 1250 : 180;

        if (index < words.length) {
            timeout = setTimeout(() => {
                setIndex(prevIndex => prevIndex + 1)
            }, delay);
        }

        if (index === words.length - 1) {
            setTimeout(() => setIsLoading(false), 500);
        }

        return () => {
            if (timeout)
                clearTimeout(timeout);
        }
    }, [index, setIsLoading])

    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`

    const curve = {
        initial: {
            d: initialPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
        },
        exit: {
            d: targetPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 }
        }
    }

    return (
        <motion.div variants={slideUp} initial="initial" exit="exit" className="introduction">
            {dimension.width > 0 &&
                <>
                    <motion.p variants={opacity} initial="initial" animate="enter">{words[index]}</motion.p>
                    <svg>
                        <motion.path variants={curve} initial="initial" exit="exit"></motion.path>
                    </svg>
                </>
            }
        </motion.div>
    )
}

export default Preloader;
