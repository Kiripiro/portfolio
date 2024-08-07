import { useEffect, useRef, useState } from 'react';
import { Pivot as Hamburger } from 'hamburger-react';
import '../../../styles/menuBurger.scss';
import MagneticButton from './magneticButton';
import Linkedin from '../../../utils/svgs/linkedin';
import Github from '../../../utils/svgs/github';
import ReadCv from '../../../utils/svgs/read';
import { Tooltip } from 'react-tooltip'
import Lenis from 'lenis'

function MenuBurger({ isVisible, isMenuToggled, setIsMenuToggled }: { isVisible: boolean, isMenuToggled: boolean, setIsMenuToggled: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [buttonColor, setButtonColor] = useState('#efefef');
    const [hasScrolled, setHasScrolled] = useState(false);

    const lenis = useRef<Lenis | null>(null);

    useEffect(() => {
        lenis.current = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            syncTouch: true,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time: number) {
            lenis.current?.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.current?.destroy();
        };
    }, []);

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section && lenis.current) {
            lenis.current.scrollTo(section);
        }
    };

    const isWebsiteOnDesktop = () => {
        return window.navigator.userAgent.indexOf('Mobile') === -1 && window.navigator.userAgent.indexOf('Tablet') === -1;
    }

    function handleLinkedinClick() {
        window.open('https://www.linkedin.com/in/atourret/', '_blank');
    }

    function handleGithubClick() {
        window.open('https://github.com/Kiripiro', '_blank');
    }

    function handleReadCvClick() {
        window.open('https://read.cv/atourret', '_blank');
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setButtonColor(isMenuOpen ? '#efefef' : '#F7CA18');
        setIsMenuToggled(!isMenuToggled);
    };

    useEffect(() => {
        setIsMenuToggled(isMenuToggled);
    }, [isMenuOpen, setIsMenuToggled]);

    useEffect(() => {
        setIsMenuOpen(isMenuToggled);
        setButtonColor(isMenuToggled ? '#F7CA18' : '#F7CA18');
    }, [isMenuToggled]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200)
                setHasScrolled(true);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {hasScrolled && (
                <MagneticButton
                    className={`button-2 ${isVisible ? 'visible' : 'hidden'}`}
                    speed={0.3}
                    scale={1.2}
                    tolerance={0.9}
                >
                    <div className={`burger-icon`} onClick={toggleMenu}>
                        <MagneticButton
                            className={`button-1`}
                            speed={0.3}
                            scale={1.2}
                            tolerance={0.9}
                            style={{ background: buttonColor }}
                        >
                            <Hamburger size={32} color="#fff" toggled={isMenuOpen} />
                        </MagneticButton>
                    </div>
                </MagneticButton>

            )}
            <div className={`menu ${isMenuOpen ? 'visible' : 'hidden'}`}>
                <div className="menu-content">
                    <span className="menu-title">Navigation</span>
                    <div className="menu-items">
                        <div className={`menu-item`} onClick={() => scrollToSection("home")}><span>Home</span></div>
                        <div className={`menu-item`} onClick={() => scrollToSection("about")}><span>About</span></div>
                        < div className={`menu-item`} onClick={() => scrollToSection("projects")}><span>Projects</span></div>
                        <div className={`menu-item`} onClick={() => scrollToSection("contact")}><span>Contact</span></div>
                        <div className='menu-socials'>
                            <div data-tooltip-id="linkedin" data-tooltip-content="Linkedin" className='icon' onClick={handleLinkedinClick}>
                                <Linkedin />
                            </div>
                            <div data-tooltip-id="github" data-tooltip-content="Github" className='icon' onClick={handleGithubClick}>
                                <Github />
                            </div>
                            <div data-tooltip-id="read.cv" data-tooltip-content="Read.cv" className='icon' onClick={handleReadCvClick}>
                                <ReadCv />
                            </div>
                            <Tooltip id="linkedin" />
                            <Tooltip id="github" />
                            <Tooltip id="read.cv" />
                        </div>
                    </div>
                    <div className="menu-footer">
                        @ 2024 Alexandre Tourret
                    </div>
                </div>
            </div>
        </>
    );
}

export default MenuBurger;