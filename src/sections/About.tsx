import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0-30%)
      scrollTl
        .fromTo(photoRef.current, 
          { x: '-40vw', rotateY: -18, opacity: 0 },
          { x: 0, rotateY: 8, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(ringRef.current, 
          { scale: 0.7, opacity: 0 },
          { scale: 1, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(spotlightRef.current, 
          { opacity: 0 },
          { opacity: 0.35, ease: 'none' },
          0
        )
        .fromTo(headlineRef.current, 
          { x: '18vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.05
        )
        .fromTo(bodyRef.current, 
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1
        )
        .fromTo(statsRef.current?.children || [], 
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.15
        );

      // SETTLE (30-70%) - elements hold position

      // EXIT (70-100%)
      scrollTl
        .fromTo(photoRef.current, 
          { x: 0, opacity: 1 },
          { x: '-18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo([headlineRef.current, bodyRef.current], 
          { x: 0, opacity: 1 },
          { x: '12vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(statsRef.current, 
          { x: 0, opacity: 1 },
          { x: '12vw', opacity: 0, ease: 'power2.in' },
          0.72
        )
        .fromTo(ringRef.current, 
          { scale: 1, opacity: 1 },
          { scale: 1.15, opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(spotlightRef.current, 
          { opacity: 0.35 },
          { opacity: 0, ease: 'power2.in' },
          0.75
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section-pinned bg-dark-bg z-20"
    >
      {/* Starfield background */}
      <div className="absolute inset-0 starfield opacity-40" />
      
      {/* Spotlight cone behind photo */}
      <div 
        ref={spotlightRef}
        className="absolute left-[8vw] top-[10vh] w-[32vw] h-[70vh] opacity-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0, 240, 255, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
          zIndex: 1
        }}
      />

      {/* Neon ring behind photo */}
      <div 
        ref={ringRef}
        className="absolute left-[12vw] top-[26vh] w-[24vw] h-[24vw] opacity-0"
        style={{ zIndex: 2 }}
      >
        <div className="absolute inset-0 rounded-full border-2 border-cyan/50 animate-ring-pulse" />
        <div className="absolute inset-4 rounded-full border border-cyan/30" />
        <div className="absolute inset-8 rounded-full border border-cyan/20" />
      </div>

      {/* Profile photo */}
      <div 
        ref={photoRef}
        className="absolute left-[10vw] top-[22vh] w-[28vw] h-[56vh] opacity-0"
        style={{ 
          zIndex: 3,
          transform: 'perspective(1000px) rotateY(8deg)',
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-card">
          <img 
            src="/profile_photo.jpg" 
            alt="Profile" 
            className="w-full h-full object-cover cyber-grade"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 via-transparent to-transparent" />
        </div>
      </div>

      {/* Text block */}
      <div 
        className="absolute left-[46vw] top-[20vh] w-[44vw]"
        style={{ zIndex: 4 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="px-3 py-1 rounded-full bg-gradient-to-r from-cyan/20 to-purple-500/20 border border-cyan/40">
            <span className="text-cyan font-mono text-sm">LEVEL 4 STUDENT</span>
          </div>
          <div className="px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/40">
            <span className="text-yellow-400 font-mono text-sm">GRADUATING 2026</span>
          </div>
        </div>

        <h2 
          ref={headlineRef}
          className="font-orbitron font-bold text-[clamp(36px,4vw,64px)] text-white opacity-0"
        >
          PLAYER <span className="text-cyan neon-text">PROFILE</span>
        </h2>
        
        <div ref={bodyRef} className="mt-6 space-y-4 opacity-0">
          <p className="text-muted-foreground text-lg leading-relaxed">
            I'm Hemankumar, currently grinding through Level 4 (4th year) of my BTech AI & Data Science quest at Tagore Engineering College, Chennai. My mission: master AI and Data Science to solve real-world boss battles.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Equipped with Python, Machine Learning, Deep Learning, and SQL skills, I transform raw data into powerful insights. Every dataset is a new dungeon to explore, every problem a puzzle to solve.
          </p>
          
          {/* Journey Timeline */}
          <div className="mt-6 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center flex-shrink-0">
                <span className="text-green-400 text-xs font-bold">✓</span>
              </div>
              <div>
                <p className="text-white font-semibold">Level 1-3: Foundation Quest</p>
                <p className="text-muted-foreground text-sm">Mastered core programming, data structures, and ML fundamentals</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan/20 border-2 border-cyan flex items-center justify-center flex-shrink-0 animate-pulse">
                <span className="text-cyan text-xs font-bold">4</span>
              </div>
              <div>
                <p className="text-white font-semibold">Level 4: Advanced Campaign (Current)</p>
                <p className="text-muted-foreground text-sm">Deep learning, cloud computing, and real-world project deployment</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 border-2 border-purple-500/40 flex items-center justify-center flex-shrink-0">
                <span className="text-purple-400 text-xs font-bold">→</span>
              </div>
              <div>
                <p className="text-white font-semibold">Next Quest: Industry Boss Battle</p>
                <p className="text-muted-foreground text-sm">Ready to join a team and tackle production-level challenges</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="mt-8 flex gap-4">
          <div className="stat-chip">
            <span className="block text-2xl font-bold text-white">4th</span>
            <span className="text-xs text-cyan/70">YEAR</span>
          </div>
          <div className="stat-chip">
            <span className="block text-2xl font-bold text-white">AI & DS</span>
            <span className="text-xs text-cyan/70">SPECIALIZATION</span>
          </div>
          <div className="stat-chip">
            <span className="block text-2xl font-bold text-white">2+</span>
            <span className="text-xs text-cyan/70">INTERNSHIPS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
