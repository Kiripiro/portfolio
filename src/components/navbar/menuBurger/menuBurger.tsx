import { useEffect, useRef, useState } from "react";
import { Pivot as Hamburger } from "hamburger-react";
import "../../../styles/menuBurger.scss";
import MagneticButton from "./magneticButton";
import Linkedin from "../../../utils/svgs/linkedin";
import Github from "../../../utils/svgs/github";
import CvLink from "../../shared/cvLink";
import Lenis from "lenis";

const SCROLL_SHOW_THRESHOLD = 220;
const SCROLL_HIDE_THRESHOLD = 170;
const TOP_RESET_THRESHOLD = 24;

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
  const [buttonColor, setButtonColor] = useState("#efefef");
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
    setButtonColor("#efefef");
  };

  function handleLinkedinClick() {
    window.open("https://www.linkedin.com/in/atourret/", "_blank");
  }

  function handleGithubClick() {
    window.open("https://github.com/Kiripiro", "_blank");
  }

  function handleCvClick() {
    setIsMenuOpen(false);
    setIsMenuToggled(false);
    setButtonColor("#efefef");
  }

  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      const next = !prev;
      setButtonColor(next ? "#F7CA18" : "#efefef");
      setIsMenuToggled(next);
      return next;
    });
  };

  useEffect(() => {
    setIsMenuOpen(isMenuToggled);
    setButtonColor(isMenuToggled ? "#F7CA18" : "#efefef");
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
        setButtonColor("#efefef");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isPinned, setIsMenuToggled]);

  return (
    <>
      {hasScrolled && (
        <MagneticButton
          className={`button-2 ${isVisible || isPinned ? "visible" : "hidden"}`}
          speed={0.3}
          scale={1.2}
          tolerance={0.9}
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          <div className={`burger-icon`} onClick={toggleMenu}>
            <MagneticButton
              className={`button-1`}
              speed={0.3}
              scale={1.2}
              tolerance={0.9}
              style={{ background: buttonColor }}
              type="button"
              aria-label="Navigation menu icon"
            >
              <Hamburger size={32} color="#fff" toggled={isMenuOpen} />
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
              <div
                className="icon"
                onClick={handleLinkedinClick}
              >
                <Linkedin />
              </div>
              <div
                className="icon"
                onClick={handleGithubClick}
              >
                <Github />
              </div>
              <CvLink
                variant="icon"
                className="icon"
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
