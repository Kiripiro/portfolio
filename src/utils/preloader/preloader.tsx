import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './preloader.scss';

function Preloader({ onAnimationComplete }: { onAnimationComplete: () => void }) {
    const loadingRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const [animationPlayed, setAnimationPlayed] = useState(false);

    useEffect(() => {
        const loadingElement = loadingRef.current;
        const titleElement = titleRef.current;
        let interval: NodeJS.Timeout | null = null;

        if (loadingElement && titleElement && !animationPlayed) {
            if (interval) {
                clearInterval(interval);
            }

            let progress = 0;
            let intervalDuration = 50;
            interval = setInterval(() => {
                progress = Math.round(progress) + 1;

                if (progress === 15) {
                    gsap.to(titleElement, {
                        opacity: 0,
                        duration: 0.5,
                        onComplete: () => {
                            titleElement.textContent = 'Full stack developer';
                            gsap.to(titleElement, {
                                opacity: 1,
                                duration: 0.5,
                            });
                        },
                    });
                }
                if (progress === 35) {
                    gsap.to(titleElement, {
                        opacity: 0,
                        duration: 0.5,
                        onComplete: () => {
                            titleElement.textContent = 'Young and passionate';
                            gsap.to(titleElement, {
                                opacity: 1,
                                duration: 0.5,
                            });
                        },
                    });
                }

                if (progress > 55) {
                    progress = Math.round(progress) + 10;
                }

                if (progress > 100) {
                    gsap.to([loadingElement, titleElement], {
                        opacity: 0,
                        duration: 1,
                        onComplete: () => {
                            clearInterval(interval!);
                            loadingElement.remove();
                            setAnimationPlayed(true);
                            onAnimationComplete();
                        },
                    });
                } else {
                    loadingElement.textContent = `Loading ${Math.round(progress)}%...`;
                }
            }, intervalDuration);
        }
    }, [onAnimationComplete, setAnimationPlayed]);

    return (
        <div className="preloader">
            <h1 ref={titleRef} className='preloader_title'>Alexandre Tourret</h1>
            <h1 ref={loadingRef} className='preloader_percentage'>Loading 0%...</h1>
        </div>
    );
}

export default Preloader;
