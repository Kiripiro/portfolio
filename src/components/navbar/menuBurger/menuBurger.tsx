import { useEffect, useRef, useState } from "react";
import { Pivot as Hamburger } from "hamburger-react";
import "../../../styles/menuBurger.scss";
import MagneticButton from "./magneticButton";
import Linkedin from "../../../utils/svgs/linkedin";
import Github from "../../../utils/svgs/github";
import Malt from "../../../utils/svgs/malt";
import CvLink from "../../shared/cvLink";
import Lenis from "lenis";

const SCROLL_SHOW_THRESHOLD = 220;
const SCROLL_HIDE_THRESHOLD = 170;
const TOP_RESET_THRESHOLD = 24;
const BURGER_BASE_BACKGROUND = "#efefef";
const BURGER_BASE_LINES = "#F7CA18";
const BURGER_ACTIVE_BACKGROUND = "#F7CA18";
const BURGER_ACTIVE_LINES = "#efefef";

function MenuBurger({
  isVisible,
  isMenuToggled,
  setIsMenuToggled,
  isPinned = false,
}: {
  isVisible: boolean;
  isMenuToggled: boolean;
  setIsMenuToggled: React.Dispatch<React.SetStateAction<boolean>>;
  isPinned?: boolean;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isButtonFocused, setIsButtonFocused] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const currentYear = new Date().getFullYear();

  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    lenis.current = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
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

  function openExternalUrl(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    if (lenis.current) {
      lenis.current.scrollTo(section, {
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setIsMenuOpen(false);
    setIsMenuToggled(false);
  };

  function handleLinkedinClick() {
    openExternalUrl("https://www.linkedin.com/in/atourret/");
  }

  function handleGithubClick() {
    openExternalUrl("https://github.com/Kiripiro");
  }

  function handleMaltClick() {
    openExternalUrl("https://www.malt.fr/profile/alexandretourret");
  }

  function handleCvClick() {
    setIsMenuOpen(false);
    setIsMenuToggled(false);
  }

  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      const next = !prev;
      setIsMenuToggled(next);
      return next;
    });
  };

  useEffect(() => {
    setIsMenuOpen(isMenuToggled);
  }, [isMenuToggled]);

  useEffect(() => {
    if (isPinned) {
      setHasScrolled(true);
      return;
    }

    const handleScroll = () => {
      const currentY = window.scrollY;

      setHasScrolled((prev) => {
        if (prev) return currentY > SCROLL_HIDE_THRESHOLD;
        return currentY > SCROLL_SHOW_THRESHOLD;
      });

      if (currentY <= TOP_RESET_THRESHOLD) {
        setIsMenuOpen(false);
        setIsMenuToggled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isPinned, setIsMenuToggled]);

  const isBurgerInverted = isMenuOpen || isButtonHovered || isButtonFocused;
  const burgerBackgroundColor = isBurgerInverted
    ? BURGER_ACTIVE_BACKGROUND
    : BURGER_BASE_BACKGROUND;
  const burgerLineColor = isBurgerInverted
    ? BURGER_ACTIVE_LINES
    : BURGER_BASE_LINES;

  return (
    <>
      {hasScrolled && (
        <MagneticButton
          className={`button-2 ${isVisible || isPinned ? "visible" : "hidden"}`}
          speed={0.3}
          scale={1.2}
          tolerance={0.9}
          type="button"
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
        >
          <div
            className={`burger-icon`}
            onClick={toggleMenu}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            <MagneticButton
              className={`button-1`}
              speed={0.3}
              scale={1.2}
              tolerance={0.9}
              onFocus={() => setIsButtonFocused(true)}
              onBlur={() => setIsButtonFocused(false)}
              style={{
                backgroundColor: burgerBackgroundColor,
                color: burgerLineColor,
              }}
              type="button"
              aria-label="Navigation menu icon"
            >
              <Hamburger size={32} color="currentColor" toggled={isMenuOpen} />
            </MagneticButton>
          </div>
        </MagneticButton>
      )}
      <div className={`menu ${isMenuOpen ? "visible" : "hidden"}`}>
        <div className="menu-content">
          <span className="menu-title">Navigation</span>
          <div className="menu-items">
            <div
              className={`menu-item`}
              onClick={() => scrollToSection("home")}
            >
              <span>Home</span>
            </div>
            <div
              className={`menu-item`}
              onClick={() => scrollToSection("about")}
            >
              <span>About</span>
            </div>
            <div
              className={`menu-item`}
              onClick={() => scrollToSection("certifications")}
            >
              <span>Certifications</span>
            </div>
            <div
              className={`menu-item`}
              onClick={() => scrollToSection("projects")}
            >
              <span>Projects</span>
            </div>
            <div
              className={`menu-item`}
              onClick={() => scrollToSection("contact")}
            >
              <span>Contact</span>
            </div>
            <div className="menu-socials">
              <button
                type="button"
                className="icon menu_social_icon ui_icon_button"
                data-cursor-default="true"
                onClick={handleLinkedinClick}
                aria-label="Open LinkedIn profile"
              >
                <Linkedin />
              </button>
              <button
                type="button"
                className="icon menu_social_icon ui_icon_button"
                data-cursor-default="true"
                onClick={handleGithubClick}
                aria-label="Open GitHub profile"
              >
                <Github />
              </button>
              <button
                type="button"
                className="icon menu_social_icon ui_icon_button"
                data-cursor-default="true"
                onClick={handleMaltClick}
                aria-label="Open Malt profile"
              >
                <Malt />
              </button>
              <CvLink
                variant="icon"
                className="icon menu_social_icon"
                onClick={handleCvClick}
                aria-label="Open CV"
                title="Open CV"
              />
            </div>
          </div>
          <div className="menu-footer">@ {currentYear} Alexandre Tourret</div>
        </div>
      </div>
    </>
  );
}

export default MenuBurger;
