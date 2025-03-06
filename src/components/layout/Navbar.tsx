
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const checkDarkMode = () => {
      if (localStorage.theme === 'dark' || 
          (!('theme' in localStorage) && 
           window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        setIsDarkMode(true);
      } else {
        document.documentElement.classList.remove('dark');
        setIsDarkMode(false);
      }
    };

    checkDarkMode();
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glassmorphism py-3 shadow-lg' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-display font-bold flex items-center"
        >
          <span className="text-gradient mr-2">JuliusTaylor</span>
          <img 
            src="/lovable-uploads/9cd17e6d-830d-4ef8-b15a-c8afb8b9ad3e.png" 
            alt="Julius Taylor Logo" 
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link
            to="/"
            className={`transition-colors duration-200 ${
              isActive('/') ? 'text-primary font-medium' : 'text-foreground/80 hover:text-primary'
            }`}
          >
            Home
          </Link>
          <Link
            to="/artists"
            className={`transition-colors duration-200 ${
              isActive('/artists') ? 'text-primary font-medium' : 'text-foreground/80 hover:text-primary'
            }`}
          >
            Artists
          </Link>
          <Link
            to="/beats"
            className={`transition-colors duration-200 ${
              isActive('/beats') ? 'text-primary font-medium' : 'text-foreground/80 hover:text-primary'
            }`}
          >
            Beat Store
          </Link>
          <Link
            to="/merch"
            className={`transition-colors duration-200 ${
              isActive('/merch') ? 'text-primary font-medium' : 'text-foreground/80 hover:text-primary'
            }`}
          >
            Merch
          </Link>
          <button
            onClick={toggleDarkMode}
            className="ml-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {user ? (
            <Link
              to="/feed"
              className="px-5 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Feed
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-5 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleDarkMode}
            className="mr-2 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-background dark:bg-background ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        } transition-opacity duration-300 md:hidden`}
      >
        <div className="flex flex-col items-center space-y-6 text-xl">
          <Link
            to="/"
            className={`transition-colors duration-200 ${
              isActive('/') ? 'text-primary font-medium' : 'text-foreground/80 hover:text-primary'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/artists"
            className={`transition-colors duration-200 ${
              isActive('/artists') ? 'text-primary font-medium' : 'text-foreground/80 hover:text-primary'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Artists
          </Link>
          <Link
            to="/beats"
            className={`transition-colors duration-200 ${
              isActive('/beats') ? 'text-primary font-medium' : 'text-foreground/80 hover:text-primary'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Beat Store
          </Link>
          <Link
            to="/merch"
            className={`transition-colors duration-200 ${
              isActive('/merch') ? 'text-primary font-medium' : 'text-foreground/80 hover:text-primary'
            }`}
            onClick={() => setIsOpen(false)}
          >
            Merch
          </Link>
          {user ? (
            <Link
              to="/feed"
              className="px-6 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Feed
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-6 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
