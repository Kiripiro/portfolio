import React, { useState, useEffect } from 'react';
import { Pivot as Hamburger } from 'hamburger-react';
import '../../../styles/menuBurger.scss';
import MagneticButton from './magneticButton';

function MenuBurger({ isVisible }: { isVisible: boolean }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <MagneticButton
            className={`button-2 ${isVisible ? 'visible' : 'hidden'}`}
            speed={0.3}
            scale={1.2}
            tolerance={0.9}
        >
            <MagneticButton
                className={`button-1`}
                speed={0.3}
                scale={1.2}
                tolerance={0.9}
            >
                <div className={`burger-icon`} onClick={toggleMenu}>
                    <Hamburger size={32} color="#fff" toggled={isMenuOpen} />
                </div>
            </MagneticButton>

            <div className={`menu ${isMenuOpen ? 'show' : ''}`}>
                {/* Your menu items here */}
            </div>
        </MagneticButton>
    );
}

export default MenuBurger;
