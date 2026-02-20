import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Lightbulb, Code, Sparkles, HeartHandshake } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Discover',
    description: 'Goals, constraints, user journeys. Understanding the problem space before crafting solutions.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Prototype',
    description: 'Wireframes + motion proof-of-concepts. Validating ideas quickly before full implementation.',
    icon: Lightbulb,
  },
  {
    number: '03',
    title: 'Build',
    description: 'Component architecture + performance budget. Clean, scalable code that lasts.',
    icon: Code,
  },
  {
    number: '04',
    title: 'Polish',
    description: 'Animation, a11y, QA, launch. The details that transform good into exceptional.',
    icon: Sparkles,
  },
  {
    number: '05',
    title: 'Support',
    description: 'Analytics, iterations, scaling. Continuous improvement based on real-world data.',
    icon: HeartHandshake,
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Steps reveal with scrub
      const stepElements = stepsRef.current?.children;
      if (stepElements) {
        Array.from(stepElements).forEach((step) => {
          gsap.fromTo(step,
            { x: '-10vw', opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: step,
                start: 'top 85%',
                end: 'top 55%',
                scrub: 0.5,
              }
            }
          );
        });
      }

      // Progress line draw
      if (lineRef.current) {
        const lineLength = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, {
          strokeDasharray: lineLength,
          strokeDashoffset: lineLength,
        });

        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 0.5,
          }
        });
      }

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative bg-dark-bg py-[8vh] px-[6vw] z-50"
    >
      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Heading */}
      <div ref={headingRef} className="max-w-[52vw] mb-12 opacity-0">
        <h2 className="font-orbitron font-bold text-[clamp(32px,3.5vw,56px)] text-white mb-4">
          LEVEL <span className="text-cyan neon-text">DESIGN</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          A repeatable process that ships. Every project follows this proven framework.
        </p>
      </div>

      {/* Steps and line container */}
      <div className="relative flex gap-12">
        {/* Progress line SVG */}
        <div className="absolute left-[22vw] top-0 bottom-0 w-1 hidden lg:block">
          <svg className="h-full w-full" preserveAspectRatio="none">
            <path
              ref={lineRef}
              d="M 2 0 L 2 100%"
              stroke="rgba(0, 240, 255, 0.4)"
              strokeWidth="2"
              fill="none"
              style={{ height: '100%' }}
            />
          </svg>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="flex-1 space-y-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.number}
                className="relative flex items-start gap-6 p-6 rounded-2xl bg-dark-panel/50 border border-cyan/10 hover:border-cyan/30 transition-all duration-300 group"
              >
                {/* Step number */}
                <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-cyan/10 border border-cyan/30 flex items-center justify-center group-hover:shadow-neon transition-all duration-300">
                  <Icon className="w-7 h-7 text-cyan" />
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-sm text-cyan/60">{step.number}</span>
                    <h3 className="font-orbitron font-bold text-xl text-white">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
