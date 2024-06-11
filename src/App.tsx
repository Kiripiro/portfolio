import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import About from './components/about/about';
import Hero from './components/hero/hero';
import Navbar from './components/navbar/navbar';
import Cursor from './utils/cursor/cursor';
import './styles/style.scss';
import Contact from './components/footer/footer';
import { fetchGithub } from './utils/api/api';
import MenuBurger from './components/navbar/menuBurger/menuBurger';
import { SnackbarProvider } from 'notistack';
import Preloader from './utils/preloader/preloader';
import { AnimatePresence } from 'framer-motion';

const Projects = lazy(() => import('./components/projects/projects'));

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
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div id="home" data-scroll className="App">
      <div className='grain-overlay'></div>
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader setIsLoading={setIsLoading} />}
      </AnimatePresence>
      <div className="wrapper">
        <header>
          {isLoading ? (<></>) : (<>
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
          {isLoading ? (<></>) :
            (
              <>
                <Cursor />
                <div className="wrapper" ref={containerRef}>
                  <div className="container">
                    <Hero />
                    <About />
                    {/* <Projects repos={repos} /> */}
                    <Suspense fallback={<div>Loading projects...</div>}>
                      <Projects repos={repos} />
                    </Suspense>
                    <Contact />
                  </div>
                </div>
              </>
            )}
        </main>
      </div>
    </div>
  );
}

export default App;
