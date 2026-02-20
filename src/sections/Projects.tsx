import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'AI Career Guidance System',
    description: 'Intelligent career planning platform leveraging AI/ML algorithms for personalized pathways.',
    image: '/project_01.jpg',
    tags: ['Python', 'Machine Learning', 'AI'],
  },
  {
    id: 2,
    title: 'CINEMAPULSE',
    description: 'Real-time sentiment analysis platform using AWS for customer feedback analysis.',
    image: '/project_02.jpg',
    tags: ['AWS', 'Sentiment Analysis', 'Cloud'],
  },
  {
    id: 3,
    title: 'Data Science Projects',
    description: 'Collection of data analysis and visualization projects using Python and SQL.',
    image: '/project_03.jpg',
    tags: ['Python', 'SQL', 'Data Analysis'],
  },
  {
    id: 4,
    title: 'Deep Learning Models',
    description: 'Neural network implementations for image and text classification tasks.',
    image: '/project_04.jpg',
    tags: ['Deep Learning', 'TensorFlow', 'Python'],
  },
  {
    id: 5,
    title: 'ML Algorithms',
    description: 'Implementation of various machine learning algorithms from scratch.',
    image: '/project_05.jpg',
    tags: ['Machine Learning', 'Python', 'Scikit-learn'],
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  
  const [activeIndex, setActiveIndex] = useState(2);

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
        .fromTo(headingRef.current, 
          { y: '-10vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(glowRef.current, 
          { opacity: 0 },
          { opacity: 0.4, ease: 'none' },
          0.05
        )
        .fromTo(carouselRef.current, 
          { z: -800, rotateX: 18, opacity: 0 },
          { z: 0, rotateX: 0, opacity: 1, ease: 'none' },
          0.05
        )
        .fromTo(carouselRef.current?.children || [], 
          { scale: 0.7, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.02, ease: 'none' },
          0.1
        )
        .fromTo(controlsRef.current, 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.2
        );

      // SETTLE (30-70%) - carousel is interactive

      // EXIT (70-100%)
      scrollTl
        .fromTo(carouselRef.current, 
          { z: 0, rotateX: 0, opacity: 1 },
          { z: -600, rotateX: -14, opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(headingRef.current, 
          { x: 0, opacity: 1 },
          { x: '-10vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(controlsRef.current, 
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.75
        )
        .fromTo(glowRef.current, 
          { opacity: 0.4 },
          { opacity: 0, ease: 'power2.in' },
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, []);

  const goToPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  return (
    <section 
      ref={sectionRef} 
      className="section-pinned bg-dark-bg z-40"
    >
      {/* Starfield background */}
      <div className="absolute inset-0 starfield opacity-40" />
      
      {/* Purple-pink glow disc */}
      <div 
        ref={glowRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] opacity-0"
        style={{
          background: 'radial-gradient(circle, rgba(184, 41, 247, 0.15) 0%, rgba(255, 45, 141, 0.08) 40%, transparent 70%)',
          filter: 'blur(60px)',
          zIndex: 1
        }}
      />

      {/* Heading */}
      <div 
        ref={headingRef}
        className="absolute left-[6vw] top-[10vh] opacity-0"
        style={{ zIndex: 5 }}
      >
        <span className="micro-label block mb-2">
          <span className="text-purple">●</span> PORTFOLIO SHOWCASE
        </span>
        <h2 className="font-orbitron font-bold text-[clamp(32px,3.5vw,56px)] text-white">
          AI & DATA <span className="text-purple neon-text-purple">PROJECTS</span>
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">Real-world solutions powered by machine learning</p>
      </div>

      {/* 3D Carousel */}
      <div 
        ref={carouselRef}
        className="absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2 w-[78vw] h-[54vh] opacity-0"
        style={{ 
          zIndex: 3,
          perspective: '1200px',
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {projects.map((project, index) => {
            const offset = index - activeIndex;
            const absOffset = Math.abs(offset);
            const isActive = index === activeIndex;
            
            // Calculate 3D position
            const translateX = offset * 280;
            const translateZ = isActive ? 100 : -150 - absOffset * 50;
            const rotateY = offset * -25;
            const scale = isActive ? 1 : 0.85 - absOffset * 0.05;
            const opacity = absOffset > 2 ? 0 : 1 - absOffset * 0.2;
            
            return (
              <div
                key={project.id}
                className="absolute w-[320px] h-[400px] transition-all duration-500 ease-out cursor-pointer"
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex: isActive ? 10 : 5 - absOffset,
                }}
                onClick={() => setActiveIndex(index)}
              >
                <div className={`relative w-full h-full rounded-2xl overflow-hidden transition-all duration-300 ${isActive ? 'shadow-neon-strong' : 'shadow-card'}`}>
                  {/* Active ring */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-2xl border-2 border-cyan animate-ring-pulse pointer-events-none" style={{ zIndex: 10 }} />
                  )}
                  
                  {/* Image */}
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/50 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-orbitron font-bold text-xl text-white mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
                    <div className="flex gap-2 flex-wrap">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 rounded bg-cyan/10 text-cyan text-xs font-mono">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div 
        ref={controlsRef}
        className="absolute bottom-[8vh] left-1/2 -translate-x-1/2 flex items-center gap-6 opacity-0"
        style={{ zIndex: 5 }}
      >
        <button 
          onClick={goToPrev}
          className="w-12 h-12 rounded-full border border-cyan/40 flex items-center justify-center text-cyan transition-all duration-300 hover:border-cyan hover:shadow-neon"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <div className="text-center">
          <p className="font-orbitron text-white text-lg">{projects[activeIndex].title}</p>
          <p className="text-muted-foreground text-sm">{activeIndex + 1} / {projects.length}</p>
        </div>
        
        <button 
          onClick={goToNext}
          className="w-12 h-12 rounded-full border border-cyan/40 flex items-center justify-center text-cyan transition-all duration-300 hover:border-cyan hover:shadow-neon"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
