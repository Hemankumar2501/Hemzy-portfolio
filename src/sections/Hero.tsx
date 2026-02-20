import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Character3D from '../components/3d/Character3D';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const microTopRef = useRef<HTMLSpanElement>(null);
  const microBottomRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    // Check if mobile
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // Entrance animation timeline (auto-play on load)
      const entranceTl = gsap.timeline({ 
        defaults: { ease: 'power2.out' }
      });
      
      // Simpler animations on mobile
      if (isMobile) {
        entranceTl
          .fromTo([microTopRef.current, headlineRef.current, subheadRef.current, ctaRef.current, microBottomRef.current], 
            { opacity: 0, y: 20 }, 
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }
          );
      } else {
        // Full desktop animations
        entranceTl
          .fromTo(microTopRef.current, 
            { opacity: 0 }, 
            { opacity: 1, duration: 0.6 }
          )
          .fromTo(ringsRef.current, 
            { scale: 0.6, opacity: 0 }, 
            { scale: 1, opacity: 1, duration: 0.9, ease: 'back.out(1.6)' }, 
            0.2
          )
          .fromTo(characterRef.current, 
            { y: '12vh', opacity: 0 }, 
            { y: 0, opacity: 1, duration: 1 }, 
            0.3
          )
          .fromTo(headlineRef.current?.querySelectorAll('.word') || [], 
            { x: '6vw', opacity: 0 }, 
            { x: 0, opacity: 1, duration: 0.9, stagger: 0.06 }, 
            0.4
          )
          .fromTo([subheadRef.current, ctaRef.current], 
            { y: 24, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 }, 
            0.6
          )
          .fromTo(microBottomRef.current, 
            { opacity: 0 }, 
            { opacity: 1, duration: 0.6 }, 
            0.8
          );
      }

      // Only add scroll trigger on desktop
      if (!isMobile) {
        // Scroll-driven exit animation
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.6,
            onLeaveBack: () => {
              // Reset all elements when scrolling back to top
              gsap.set([characterRef.current, headlineRef.current, subheadRef.current, ctaRef.current, ringsRef.current, microTopRef.current, microBottomRef.current], {
                opacity: 1, x: 0, y: 0, scale: 1
              });
            }
          }
        });

        // Exit animations (70% - 100%)
        scrollTl
          .fromTo(characterRef.current, 
            { x: 0, y: 0, rotateY: 0, opacity: 1 },
            { x: '-18vw', y: '-10vh', rotateY: -18, opacity: 0, ease: 'power2.in' },
            0.7
          )
          .fromTo(headlineRef.current, 
            { x: 0, opacity: 1 },
            { x: '10vw', opacity: 0, ease: 'power2.in' },
            0.7
          )
          .fromTo([subheadRef.current, ctaRef.current], 
            { x: 0, opacity: 1 },
            { x: '10vw', opacity: 0, ease: 'power2.in' },
            0.72
          )
          .fromTo(ringsRef.current, 
            { scale: 1, opacity: 1 },
            { scale: 1.25, opacity: 0, ease: 'power2.in' },
            0.7
          )
          .fromTo([microTopRef.current, microBottomRef.current], 
            { opacity: 1 },
            { opacity: 0, ease: 'power2.in' },
            0.75
          );
      }

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section-pinned bg-dark-bg z-10"
    >
      {/* Starfield background */}
      <div className="absolute inset-0 starfield opacity-50" />
      
      {/* Data grid overlay */}
      <div className="absolute inset-0 data-grid opacity-30" />
      
      {/* Micro labels */}
      <span 
        ref={microTopRef} 
        className="absolute top-8 left-8 micro-label opacity-0"
      >
        <span className="inline-block w-2 h-2 bg-green rounded-full mr-2 animate-pulse" />
        SYSTEM: ONLINE
      </span>
      <span 
        ref={microBottomRef} 
        className="absolute bottom-8 right-8 micro-label opacity-0"
      >
        SCROLL TO EXPLORE
        <span className="inline-block ml-2">↓</span>
      </span>

      {/* Neon rings behind character */}
      <div 
        ref={ringsRef}
        className="absolute left-[22vw] top-[22vh] w-[26vw] h-[26vw] opacity-0"
        style={{ 
          transform: 'perspective(1000px) rotateX(55deg) rotateZ(-10deg)',
          zIndex: 2 
        }}
      >
        <div className="absolute inset-0 rounded-full border border-cyan/40 animate-rotate-slow" />
        <div className="absolute inset-4 rounded-full border border-purple/30 animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }} />
        <div className="absolute inset-8 rounded-full border border-cyan/20 animate-rotate-slow" style={{ animationDuration: '30s' }} />
      </div>

      {/* 3D Character */}
      <div 
        ref={characterRef}
        className="absolute left-[14vw] top-[10vh] w-[38vw] h-[80vh] opacity-0"
        style={{ zIndex: 3 }}
      >
        <Character3D />
      </div>

      {/* Headline block */}
      <div 
        className="absolute left-[56vw] top-[26vh] w-[38vw]"
        style={{ zIndex: 4 }}
      >
        <div ref={headlineRef}>
          <div className="micro-label mb-3">
            <span className="text-cyan">●</span> AI & DATA SCIENCE ENGINEER
          </div>
          <h1 className="font-orbitron font-bold text-[clamp(44px,5.2vw,84px)] text-white leading-tight">
            <span className="word inline-block">HEMAN</span>
            <span className="word inline-block text-cyan neon-text">KUMAR</span>
          </h1>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-cyan to-transparent" />
            <span className="font-mono text-sm text-purple">BTech AI & DS '26</span>
          </div>
        </div>
        
        <p 
          ref={subheadRef}
          className="mt-6 text-lg text-muted-foreground max-w-md opacity-0 leading-relaxed"
        >
          Transforming raw data into intelligent solutions. Specialized in <span className="text-cyan">Machine Learning</span>, <span className="text-purple">Deep Learning</span>, and <span className="text-cyan">Data Analysis</span>.
        </p>
        
        {/* Stats mini cards */}
        <div className="mt-6 grid grid-cols-3 gap-3 max-w-md opacity-0" ref={subheadRef}>
          <div className="data-card p-3">
            <div className="text-2xl font-bold text-cyan">111</div>
            <div className="text-xs text-muted-foreground">LeetCode</div>
          </div>
          <div className="data-card p-3">
            <div className="text-2xl font-bold text-purple">34</div>
            <div className="text-xs text-muted-foreground">Repos</div>
          </div>
          <div className="data-card p-3">
            <div className="text-2xl font-bold text-green">2+</div>
            <div className="text-xs text-muted-foreground">Internships</div>
          </div>
        </div>
        
        <div ref={ctaRef} className="mt-8 flex gap-4 opacity-0">
          <a 
            href="#work" 
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-cyan"
          >
            View Projects
          </a>
          <a 
            href="#contact" 
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-outline"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}
