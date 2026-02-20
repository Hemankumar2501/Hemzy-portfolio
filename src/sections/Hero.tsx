import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Character3D from '../components/3d/Character3D';
import { Trophy, Star, Zap } from 'lucide-react';

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
  const levelBadgeRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Entrance animation timeline (auto-play on load)
      const entranceTl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      
      entranceTl
        .fromTo(microTopRef.current, 
          { opacity: 0 }, 
          { opacity: 1, duration: 0.6 }
        )
        .fromTo(levelBadgeRef.current, 
          { scale: 0, opacity: 0 }, 
          { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(2)' }, 
          0.1
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
        .fromTo([subheadRef.current, statsRef.current, ctaRef.current], 
          { y: 24, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 }, 
          0.6
        )
        .fromTo(microBottomRef.current, 
          { opacity: 0 }, 
          { opacity: 1, duration: 0.6 }, 
          0.8
        );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set([characterRef.current, headlineRef.current, subheadRef.current, ctaRef.current, ringsRef.current, microTopRef.current, microBottomRef.current, levelBadgeRef.current, statsRef.current], {
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
        .fromTo([subheadRef.current, statsRef.current, ctaRef.current], 
          { x: 0, opacity: 1 },
          { x: '10vw', opacity: 0, ease: 'power2.in' },
          0.72
        )
        .fromTo([ringsRef.current, levelBadgeRef.current], 
          { scale: 1, opacity: 1 },
          { scale: 1.25, opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo([microTopRef.current, microBottomRef.current], 
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.75
        );

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
      
      {/* Micro labels */}
      <span 
        ref={microTopRef} 
        className="absolute top-8 left-8 micro-label opacity-0"
      >
        PLAYER: HEMANKUMAR
      </span>
      <span 
        ref={microBottomRef} 
        className="absolute bottom-8 right-8 micro-label opacity-0"
      >
        SCROLL TO EXPLORE
      </span>

      {/* Level Badge */}
      <div 
        ref={levelBadgeRef}
        className="absolute left-[8vw] top-[16vh] opacity-0"
        style={{ zIndex: 5 }}
      >
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan via-purple-500 to-pink-500 p-1 animate-pulse-slow">
            <div className="w-full h-full rounded-full bg-dark-bg flex flex-col items-center justify-center">
              <span className="text-xs text-cyan font-mono">LEVEL</span>
              <span className="text-3xl font-orbitron font-bold text-white">4</span>
              <span className="text-xs text-muted-foreground font-mono">YEAR</span>
            </div>
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center animate-bounce-slow">
            <Trophy className="w-4 h-4 text-dark-bg" />
          </div>
        </div>
      </div>

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
        <div className="absolute inset-4 rounded-full border border-cyan/30 animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }} />
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
        className="absolute left-[56vw] top-[22vh] w-[38vw]"
        style={{ zIndex: 4 }}
      >
        <div ref={headlineRef}>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-cyan/20 border border-cyan/40 text-cyan text-xs font-mono">
              AI ENGINEER
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-400 text-xs font-mono">
              DATA SCIENTIST
            </span>
          </div>
          <h1 className="font-orbitron font-bold text-[clamp(44px,5.2vw,84px)] text-white leading-tight">
            <span className="word inline-block">HEMAN</span>
            <span className="word inline-block text-cyan neon-text">KUMAR</span>
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="h-1 w-20 bg-gradient-to-r from-cyan via-purple-500 to-pink-500 rounded-full" />
            <span className="text-sm text-muted-foreground font-mono">BTech AI & DS</span>
          </div>
        </div>
        
        <p 
          ref={subheadRef}
          className="mt-6 text-lg text-muted-foreground max-w-md opacity-0"
        >
          Level 4 AI Engineer on a quest to master machine learning, deep learning, and data science. Currently grinding through real-world projects and competitive coding challenges.
        </p>

        {/* Stats Bar */}
        <div 
          ref={statsRef}
          className="mt-6 grid grid-cols-3 gap-4 opacity-0"
        >
          <div className="glass-panel rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-xs text-muted-foreground font-mono">XP</span>
            </div>
            <div className="text-2xl font-orbitron font-bold text-white">111</div>
            <div className="text-xs text-cyan">Problems Solved</div>
          </div>
          <div className="glass-panel rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-cyan" />
              <span className="text-xs text-muted-foreground font-mono">SKILLS</span>
            </div>
            <div className="text-2xl font-orbitron font-bold text-white">8+</div>
            <div className="text-xs text-cyan">Tech Mastered</div>
          </div>
          <div className="glass-panel rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-4 h-4 text-purple-500" />
              <span className="text-xs text-muted-foreground font-mono">RANK</span>
            </div>
            <div className="text-2xl font-orbitron font-bold text-white">1398</div>
            <div className="text-xs text-cyan">LeetCode Rating</div>
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
            View Quests
          </a>
          <a 
            href="#contact" 
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-outline"
          >
            Connect
          </a>
        </div>
      </div>
    </section>
  );
}
