import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const links = {
  work: [
    { name: 'Projects', href: '#work' },
    { name: 'Skills', href: '#skills' },
    { name: 'Certifications', href: '#certifications' },
  ],
  info: [
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
    { name: 'Stats', href: '#stats' },
  ],
  social: [
    { name: 'GitHub', url: 'https://github.com/Hemankumar2501' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/hemankumar-c-264b0429b' },
    { name: 'Email', url: 'mailto:hemankumar.chandrasekar@gmail.com' },
  ],
};

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 90%',
            end: 'top 70%',
            scrub: 0.5,
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer 
      ref={sectionRef} 
      className="relative bg-dark-bg py-[8vh] px-[6vw] z-[70]"
    >
      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />

      <div ref={contentRef} className="opacity-0">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo and tagline */}
          <div className="md:col-span-1">
            <h3 className="font-orbitron font-bold text-2xl text-white mb-2">
              HEMAN<span className="text-cyan">KUMAR</span>
            </h3>
            <p className="text-muted-foreground text-sm">
              AI Engineer
            </p>
          </div>

          {/* Work links */}
          <div>
            <h4 className="micro-label mb-4">WORK</h4>
            <ul className="space-y-2">
              {links.work.map(link => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-muted-foreground hover:text-cyan transition-colors text-sm cursor-pointer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info links */}
          <div>
            <h4 className="micro-label mb-4">INFO</h4>
            <ul className="space-y-2">
              {links.info.map(link => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-muted-foreground hover:text-cyan transition-colors text-sm cursor-pointer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Resume */}
          <div>
            <h4 className="micro-label mb-4">SOCIAL</h4>
            <ul className="space-y-2 mb-6">
              {links.social.map(link => (
                <li key={link.name}>
                  <a 
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-muted-foreground hover:text-cyan transition-colors text-sm"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
            
            <a 
              href="/resume.pdf"
              download
              className="btn-outline text-sm py-2 px-4 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Resume
            </a>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t border-cyan/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © 2026 Hemankumar C. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs">
            Built with React + Three.js + GSAP
          </p>
        </div>
      </div>
    </footer>
  );
}
