import { useEffect, useState } from 'react';
import { Pivot as Hamburger } from 'hamburger-react';
import '../../../styles/menuBurger.scss';
import MagneticButton from './magneticButton';

function MenuBurger({ isVisible, isMenuToggled, setIsMenuToggled }: { isVisible: boolean, isMenuToggled: boolean, setIsMenuToggled: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [buttonColor, setButtonColor] = useState('#303030');

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setButtonColor(isMenuOpen ? '#303030' : '#F7CA18');
        setIsMenuToggled(!isMenuToggled);
    };

    useEffect(() => {
        setIsMenuToggled(isMenuToggled);
    }, [isMenuOpen, setIsMenuToggled]);

    useEffect(() => {
        setIsMenuOpen(isMenuToggled);
        setButtonColor(isMenuToggled ? '#F7CA18' : '#303030');
    }, [isMenuToggled]);

    return (
        <>
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
            <div className={`menu ${isMenuOpen ? 'visible' : 'hidden'}`}>
                <div className="menu-content">
                    <span className="menu-title">Navigation</span>
                    <div className="menu-items">
                        <hr className="menu-hr"></hr>
                        <div className={`menu-item`} onClick={() => window.location.href = "#home"}>Home</div>
                        <div className={`menu-item`} onClick={() => window.location.href = "#about"}>About</div>
                        <div className={`menu-item`} onClick={() => window.location.href = "#projects"}>Projects</div>
                        <div className={`menu-item`} onClick={() => window.location.href = "#contact"}>Contact</div>
                        <hr className="menu-hr"></hr>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MenuBurger;