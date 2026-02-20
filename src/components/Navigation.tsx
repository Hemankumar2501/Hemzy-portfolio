import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Work', href: '#work' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled 
            ? 'bg-dark-bg/80 backdrop-blur-xl border-b border-cyan/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <a 
            href="#" 
            className="font-orbitron font-bold text-xl text-white"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            HEMAN<span className="text-cyan">KUMAR</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="relative text-sm text-muted-foreground hover:text-white transition-colors group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <button 
              onClick={() => scrollToSection('#contact')}
              className="px-4 py-2 rounded-full bg-cyan text-dark-bg font-semibold text-sm hover:shadow-neon transition-all duration-300"
            >
              Start
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div 
        className={`fixed inset-0 z-[99] bg-dark-bg/95 backdrop-blur-xl transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map(link => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="font-orbitron text-2xl text-white hover:text-cyan transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={() => scrollToSection('#contact')}
            className="mt-4 px-8 py-3 rounded-full bg-cyan text-dark-bg font-semibold"
          >
            Start
          </button>
        </div>
      </div>
    </>
  );
}
