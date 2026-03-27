import { Suspense, lazy, useEffect, useRef, useState } from "react";
import About from "./components/about/about";
import Certifications from "./components/certifications/certifications";
import Hero from "./components/hero/hero";
import Navbar from "./components/navbar/navbar";
import Cursor from "./utils/cursor/cursor";
import "./styles/style.scss";
import Contact from "./components/footer/footer";
import { fetchRepos } from "./utils/api/api";
import MenuBurger from "./components/navbar/menuBurger/menuBurger";
import { SnackbarProvider } from "notistack";
import Preloader from "./utils/preloader/preloader";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";

const NAV_DESKTOP_MIN_WIDTH = 1024;

const Projects = lazy(() => import("./components/projects/projects"));

function App() {
  const preloaderMode = (
    import.meta.env.VITE_PRELOADER_MODE ?? "prod"
  ).toLowerCase();
  const shouldUsePreloader =
    preloaderMode === "always" ||
    (preloaderMode !== "off" && import.meta.env.PROD);

  interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    created_at: string;
    languages: Record<string, number>;
  }

  const [repos, setRepos] = useState<Repo[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [isWideViewport, setIsWideViewport] = useState(
    typeof window !== "undefined"
      ? window.innerWidth >= NAV_DESKTOP_MIN_WIDTH
      : true,
  );
  const [isLoading, setIsLoading] = useState(shouldUsePreloader);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchRepos();
        setRepos(data);
      } catch (error) {
        console.error("Error loading projects data:", error);
      } finally {
        setIsDataFetched(true);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const lenis = new Lenis();
    let animationFrameId = 0;

    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const updateViewportMode = () => {
      const wideViewport = window.innerWidth >= NAV_DESKTOP_MIN_WIDTH;
      setIsWideViewport(wideViewport);

      if (wideViewport) {
        const atTop = window.scrollY <= 100;
        setShowNavbar(atTop);
        setShowMenu(!atTop);
      } else {
        setShowNavbar(false);
        setShowMenu(true);
      }
    };

    updateViewportMode();
    window.addEventListener("resize", updateViewportMode);

    return () => {
      window.removeEventListener("resize", updateViewportMode);
    };
  }, []);

  useEffect(() => {
    if (!isWideViewport) {
      setShowNavbar(false);
      setShowMenu(true);
      return;
    }

    if (isMenuToggled && window.scrollY < 100) {
      setIsMenuToggled(false);
      setShowMenu(false);
      setShowNavbar(true);
    }
    const handleScroll = () => {
      const scrollThreshold = 100;

      if (window.scrollY > scrollThreshold) {
        setShowMenu(true);
        setShowNavbar(false);
      } else {
        setShowMenu(false);
        setShowNavbar(true);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMenuToggled, isWideViewport]);

  return (
    <div id="home" className="App">
      <div className="grain-overlay"></div>
      <AnimatePresence mode="wait">
        {shouldUsePreloader && isLoading && (
          <Preloader
            setIsLoading={setIsLoading}
            isDataFetched={isDataFetched}
          />
        )}
      </AnimatePresence>
      <div className="wrapper">
        {isLoading ? (
          <></>
        ) : (
          <>
            <header className="app_header">
              {isWideViewport && showNavbar && <Navbar />}
              <div>
                <MenuBurger
                  isVisible={isWideViewport ? showMenu : true}
                  isMenuToggled={isMenuToggled}
                  setIsMenuToggled={setIsMenuToggled}
                  isPinned={!isWideViewport}
                />
              </div>
            </header>
            <main>
              <SnackbarProvider />
              <Cursor isDataFetched={isDataFetched} />
              <div className="content_wrapper" ref={containerRef}>
                <div className="container">
                  <Hero />
                  <About />
                  <Certifications />
                  <Suspense
                    fallback={
                      <section
                        className="projects_suspense_placeholder"
                        aria-hidden="true"
                      >
                        <div className="projects_suspense_line" />
                        <div className="projects_suspense_line" />
                        <div className="projects_suspense_line" />
                        <div className="projects_suspense_line" />
                      </section>
                    }
                  >
                    <Projects repos={repos} isDataFetched={isDataFetched} />
                  </Suspense>
                  <Contact />
                </div>
              </div>
            </main>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
