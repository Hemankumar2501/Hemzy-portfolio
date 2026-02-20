import { useRef, useLayoutEffect, Suspense } from 'react';
import * as React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import { 
  Code2, 
  Database, 
  Cloud, 
  Cpu, 
  Brain, 
  GitBranch, 
  Server, 
  Smartphone 
} from 'lucide-react';
import LuffyHat from '../components/3d/LuffyHat';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { 
    name: 'Python', 
    icon: Code2, 
    angle: 0,
    level: 85,
    description: 'Strong proficiency in Python for data analysis, automation, backend development, and AI/ML projects.',
    xp: '850/1000 XP'
  },
  { 
    name: 'Machine Learning', 
    icon: Brain, 
    angle: 45,
    level: 75,
    description: 'Hands-on experience in developing, training, and evaluating machine learning models for predictive tasks.',
    xp: '750/1000 XP'
  },
  { 
    name: 'Deep Learning', 
    icon: Cpu, 
    angle: 90,
    level: 70,
    description: 'Building intelligent systems using AI techniques to automate tasks and solve real-world problems.',
    xp: '700/1000 XP'
  },
  { 
    name: 'SQL', 
    icon: Database, 
    angle: 135,
    level: 80,
    description: 'Efficient in writing optimized queries to manage, retrieve, and analyze structured database data.',
    xp: '800/1000 XP'
  },
  { 
    name: 'Data Analysis', 
    icon: GitBranch, 
    angle: 180,
    level: 82,
    description: 'Skilled in collecting, cleaning, and analyzing data to extract insights and support data-driven decisions.',
    xp: '820/1000 XP'
  },
  { 
    name: 'AWS', 
    icon: Cloud, 
    angle: 225,
    level: 65,
    description: 'Experience with cloud-based services for deploying, managing, and scaling applications efficiently.',
    xp: '650/1000 XP'
  },
  { 
    name: 'Excel', 
    icon: Server, 
    angle: 270,
    level: 78,
    description: 'Advanced Excel skills for data manipulation, visualization, and business analytics.',
    xp: '780/1000 XP'
  },
  { 
    name: 'AI', 
    icon: Smartphone, 
    angle: 315,
    level: 72,
    description: 'Building intelligent systems using AI techniques to automate tasks and solve real-world problems.',
    xp: '720/1000 XP'
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const orbitalRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [selectedSkill, setSelectedSkill] = React.useState<typeof skills[0] | null>(null);

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
        .fromTo(orbitalRef.current, 
          { scale: 0.65, rotateZ: -25, opacity: 0 },
          { scale: 1, rotateZ: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(ringsRef.current?.children || [], 
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.02, ease: 'none' },
          0.05
        )
        .fromTo(coreRef.current, 
          { scale: 0.5, opacity: 0 },
          { scale: 1, opacity: 1, ease: 'back.out(1.8)' },
          0.1
        )
        .fromTo(nodesRef.current?.children || [], 
          { scale: 0.4, opacity: 0 },
          { scale: 1, opacity: 1, stagger: 0.015, ease: 'none' },
          0.1
        )
        .fromTo(textRef.current, 
          { x: '-18vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.05
        );

      // SETTLE (30-70%) - ambient animations handled by CSS

      // EXIT (70-100%)
      scrollTl
        .fromTo(orbitalRef.current, 
          { scale: 1, rotateZ: 0, opacity: 1 },
          { scale: 1.35, rotateZ: 35, opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(nodesRef.current?.children || [], 
          { opacity: 1 },
          { opacity: 0, stagger: 0.01, ease: 'power2.in' },
          0.72
        )
        .fromTo(textRef.current, 
          { x: 0, opacity: 1 },
          { x: '-10vw', opacity: 0, ease: 'power2.in' },
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="section-pinned bg-dark-bg z-30"
    >
      {/* Starfield background */}
      <div className="absolute inset-0 starfield opacity-40" />

      {/* Left text */}
      <div 
        ref={textRef}
        className="absolute left-[6vw] top-[38vh] w-[24vw] opacity-0 skills-text-panel"
        style={{ zIndex: 5 }}
      >
        {selectedSkill ? (
          <div className="glass-panel rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {React.createElement(selectedSkill.icon, { className: "w-8 h-8 text-cyan" })}
                <h3 className="font-orbitron font-bold text-2xl text-white">{selectedSkill.name}</h3>
              </div>
              <div className="px-3 py-1 rounded-full bg-cyan/20 border border-cyan/40">
                <span className="text-cyan font-mono text-sm">LVL {selectedSkill.level}</span>
              </div>
            </div>
            
            {/* XP Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-muted-foreground font-mono">EXPERIENCE</span>
                <span className="text-xs text-cyan font-mono">{selectedSkill.xp}</span>
              </div>
              <div className="h-2 bg-dark-bg rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan to-purple-500 rounded-full transition-all duration-500"
                  style={{ width: `${selectedSkill.level}%` }}
                />
              </div>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              {selectedSkill.description}
            </p>
            <button 
              onClick={() => setSelectedSkill(null)}
              className="mt-4 text-cyan text-sm hover:text-cyan-light transition-colors"
            >
              ← Back to skill tree
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <h2 className="font-orbitron font-bold text-3xl text-white mb-2">
                SKILL <span className="text-cyan neon-text">TREE</span>
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-cyan to-purple-500 rounded-full" />
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Master the art of AI & Data Science through continuous learning and hands-on projects.
            </p>
            <p className="mt-4 text-muted-foreground text-sm">
              Each skill represents hours of practice, projects completed, and challenges overcome.
            </p>
            <p className="mt-4 text-cyan text-sm font-semibold">
              Click on any skill to view details →
            </p>
          </>
        )}
      </div>

      {/* Orbital system */}
      <div 
        ref={orbitalRef}
        className="absolute left-[58%] top-[52%] -translate-x-1/2 -translate-y-1/2 w-[48vw] h-[48vw] opacity-0 skills-orbital-system"
        style={{ zIndex: 2 }}
      >
        {/* Rings */}
        <div 
          ref={ringsRef}
          className="absolute inset-0"
          style={{ 
            transform: 'perspective(1000px) rotateX(60deg)',
            transformStyle: 'preserve-3d'
          }}
        >
          <div className="absolute inset-[5%] rounded-full border-2 border-cyan/40 animate-rotate-slow" />
          <div className="absolute inset-[15%] rounded-full border border-cyan/30 animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '25s' }} />
          <div className="absolute inset-[25%] rounded-full border border-cyan/20 animate-rotate-slow" style={{ animationDuration: '30s' }} />
          
          {/* Hexagon outline */}
          <svg 
            className="absolute inset-[35%] w-[30%] h-[30%] animate-rotate-slow"
            style={{ animationDuration: '40s' }}
            viewBox="0 0 100 100"
          >
            <polygon 
              points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" 
              fill="none" 
              stroke="rgba(0, 240, 255, 0.15)" 
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Core badge */}
        <div 
          ref={coreRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[12vw] h-[12vw] opacity-0"
          style={{ zIndex: 4 }}
        >
          <div className="relative w-full h-full rounded-full bg-dark-panel border-2 border-cyan/50 shadow-neon overflow-hidden">
            {/* 3D Hat in center */}
            <div className="absolute inset-0">
              <Canvas
                camera={{ position: [0, 0, 3], fov: 50 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
              >
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <pointLight position={[0, 0, 5]} intensity={0.5} color="#00F0FF" />
                <Suspense fallback={null}>
                  <LuffyHat />
                </Suspense>
              </Canvas>
            </div>
          </div>
        </div>

        {/* Skill nodes */}
        <div ref={nodesRef} className="absolute inset-0">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            
            return (
              <div
                key={skill.name}
                className="absolute skill-orbit opacity-0 cursor-pointer"
                style={{ 
                  animationDelay: `${-(20 / skills.length) * index}s`
                }}
                onClick={() => setSelectedSkill(skill)}
              >
                <div className="group flex flex-col items-center gap-2">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-dark-panel border-2 border-cyan/40 flex items-center justify-center transition-all duration-300 group-hover:border-cyan group-hover:shadow-neon group-hover:scale-110">
                      <Icon className="w-7 h-7 text-cyan" />
                    </div>
                    {/* Level Badge */}
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-cyan to-purple-500 flex items-center justify-center border-2 border-dark-bg">
                      <span className="text-xs font-bold text-white">{skill.level}</span>
                    </div>
                  </div>
                  <span className="font-mono text-sm text-cyan/80 uppercase tracking-wider font-semibold whitespace-nowrap">{skill.name}</span>
                  {/* XP Bar */}
                  <div className="w-20 h-1 bg-dark-bg rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan to-purple-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
