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
      id="about"
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
        className="absolute left-[46vw] top-[24vh] w-[44vw]"
        style={{ zIndex: 4 }}
      >
        <h2 
          ref={headlineRef}
          className="font-orbitron font-bold text-[clamp(36px,4vw,64px)] text-white opacity-0"
        >
          ABOUT <span className="text-purple neon-text-purple">ME</span>
        </h2>
        
        <div ref={bodyRef} className="mt-6 space-y-4 opacity-0">
          <p className="text-muted-foreground text-lg leading-relaxed">
            I'm <span className="text-white font-semibold">Hemankumar</span>, a 4th year BTech AI & Data Science student at <span className="text-cyan">Tagore Engineering College</span>, Chennai. Passionate about building intelligent systems that solve real-world problems.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            With expertise in <span className="text-cyan">Python</span>, <span className="text-purple">Machine Learning</span>, <span className="text-cyan">Deep Learning</span>, and <span className="text-purple">SQL</span>, I transform complex data into actionable insights. From data preprocessing to model deployment, I build end-to-end AI solutions.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <div className="h-px flex-1 bg-gradient-to-r from-cyan/50 to-transparent" />
            <span className="font-mono text-xs text-cyan">DATA → INSIGHTS → IMPACT</span>
            <div className="h-px flex-1 bg-gradient-to-l from-purple/50 to-transparent" />
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="mt-8 grid grid-cols-3 gap-4">
          <div className="data-card">
            <span className="block text-2xl font-bold text-cyan">BTech</span>
            <span className="text-xs text-muted-foreground">AI & Data Science</span>
          </div>
          <div className="data-card">
            <span className="block text-2xl font-bold text-purple">2026</span>
            <span className="text-xs text-muted-foreground">Graduating</span>
          </div>
          <div className="data-card">
            <span className="block text-2xl font-bold text-green">2+</span>
            <span className="text-xs text-muted-foreground">Internships</span>
          </div>
        </div>
      </div>
    </section>
  );
}
