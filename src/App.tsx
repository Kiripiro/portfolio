import { useCallback, useEffect, useRef, useState } from 'react';
import About from './components/about/about';
import Hero from './components/hero/hero';
import Navbar from './components/navbar/navbar';
import Cursor from './utils/cursor/cursor';
import './styles/style.css';
import { useWindowSize } from './utils/hooks/useWindowSize';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import Projects from './components/projects/projects';
import { fetchGithub } from './utils/api/api';
import MenuBurger from './components/navbar/menuBurger/menuBurger';

gsap.registerPlugin(ScrollTrigger);

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
  const [isLoading, setIsLoading] = useState(true);
  const size = useWindowSize();
  const containerRef = useRef<HTMLDivElement>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  const data = {
    ease: 0.06,
    curr: 0,
    prev: 0,
    rounded: 0,
  };

  const smoothScroll = useCallback(() => {
    data.curr = window.scrollY;
    data.prev += (data.curr - data.prev) * data.ease;
    data.rounded = Math.round(data.prev * 100) / 100;
    containerRef.current!.style.transform = `translateY(-${data.rounded}px)`;

    requestAnimationFrame(() => smoothScroll());
  }, [data]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchGithub();
        setRepos(data);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const setBodyHeight = () => {
        document.body.style.height = `100vh`;
        // document.body.style.height = `${containerRef.current!.getBoundingClientRect().height}px`;
      };
      setBodyHeight();

      const smoothScrollInit = () => {
        data.curr = window.scrollY;
        data.prev += (data.curr - data.prev) * data.ease;
        data.rounded = Math.round(data.prev * 100) / 100;
        containerRef.current!.style.transform = `translateY(-${data.rounded}px)`;
        requestAnimationFrame(smoothScrollInit);
      };
      requestAnimationFrame(smoothScrollInit);
    }
  }, [isLoading]);

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
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuToggled, showMenu]);

  return (
    <div className="App">
      <header>
        <div className="navbar-placeholder" style={{ visibility: showNavbar ? 'visible' : 'hidden' }}>
          <Navbar />
        </div>
        <MenuBurger isVisible={showMenu} isMenuToggled={isMenuToggled} setIsMenuToggled={setIsMenuToggled} />
      </header>
      <main>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <Cursor />
            <div className="wrapper" ref={containerRef}>
              <div className="container" style={{ maxHeight: `${size.height + (size.height / 2)}px` }}>
                <Hero />
                <About />
                <Projects repos={repos} />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
