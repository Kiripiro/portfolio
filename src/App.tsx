import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import About from './components/about/about';
import Hero from './components/hero/hero';
import Navbar from './components/navbar/navbar';
import Cursor from './utils/cursor/cursor';
import './styles/style.scss';
import Projects from './components/projects/projects';
import Contact from './components/footer/footer';
import { fetchGithub } from './utils/api/api';
import MenuBurger from './components/navbar/menuBurger/menuBurger';
import { SnackbarProvider } from 'notistack';
import Preloader from './utils/preloader/preloader';
// import Lenis from '@studio-freight/lenis';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';

function App() {
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
  const [animationComplete, setAnimationComplete] = useState(false);
  const locomotiveScroll = new LocomotiveScroll({
    lenisOptions: {
      duration: 1.2,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    },
  });
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchGithub();
        setRepos(data);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
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
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuToggled, showMenu]);

  const handleAnimationComplete = () => {
    setAnimationComplete(true);
  };

  return (
    <div id="home" data-scroll className="App">
      {!animationComplete ?
        (
          <>
            <Preloader onAnimationComplete={handleAnimationComplete} />
            <Cursor />
          </>
        ) : (
          <></>
        )}
      <div className="wrapper">
        <header>
          {!animationComplete ? (<></>) : (<>
            <div className="navbar-placeholder" style={{ visibility: showNavbar ? 'visible' : 'hidden' }}>
              <Navbar />
            </div>
            <div>
              <MenuBurger isVisible={showMenu} isMenuToggled={isMenuToggled} setIsMenuToggled={setIsMenuToggled} />
            </div>
          </>)}
        </header>
        <main>

          <SnackbarProvider />
          {!animationComplete ? (<></>) :
            (
              <>
                <Cursor />
                <div className="wrapper" ref={containerRef}>
                  <div className="container">
                    <Hero />
                    <About />
                    <Projects repos={repos} />
                    <Contact />
                  </div>
                </div>
              </>
            )}
        </main>
      </div>
    </div >
  );
}

export default App;
