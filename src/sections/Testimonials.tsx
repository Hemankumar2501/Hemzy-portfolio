import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "The smoothest handoff we've ever had. Documentation was impeccable and the code was production-ready.",
    author: 'Sarah Chen',
    role: 'Design Lead',
    company: 'TechCorp',
  },
  {
    quote: 'Performance scores went from 62 to 98. The optimization work was nothing short of magical.',
    author: 'Marcus Johnson',
    role: 'Tech Lead',
    company: 'StartupXYZ',
  },
  {
    quote: 'Feels like a console UI in the browser. Our users are obsessed with the experience.',
    author: 'Emily Rodriguez',
    role: 'Product Manager',
    company: 'GameStudio',
  },
  {
    quote: 'Accessible without losing the wow factor. Rare to find someone who balances both so well.',
    author: 'David Park',
    role: 'A11y Specialist',
    company: 'InclusiveTech',
  },
  {
    quote: 'Delivered on time, under budget. The communication throughout was exceptional.',
    author: 'Lisa Wong',
    role: 'Founder',
    company: 'NextGen Apps',
  },
  {
    quote: 'Our conversion improved measurably after the redesign. ROI was clear within weeks.',
    author: 'James Miller',
    role: 'Growth Lead',
    company: 'ScaleUp Inc',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        }
      );

      // Cards reveal with parallax
      const cards = gridRef.current?.children;
      if (cards) {
        Array.from(cards).forEach((card, index) => {
          const isLeft = index % 2 === 0;
          
          gsap.fromTo(card,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 55%',
                scrub: 0.5,
              }
            }
          );

          // Subtle parallax
          gsap.to(card, {
            y: isLeft ? -12 : 12,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          });
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
      {/* Heading */}
      <div ref={headingRef} className="mb-12 opacity-0">
        <span className="micro-label block mb-2">FEEDBACK</span>
        <h2 className="font-orbitron font-bold text-[clamp(32px,3.5vw,56px)] text-white">
          SQUAD <span className="text-cyan neon-text">LOGS</span>
        </h2>
      </div>

      {/* Staggered grid */}
      <div 
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {testimonials.map((testimonial, index) => (
          <div 
            key={index}
            className={`relative p-6 rounded-2xl bg-dark-panel/50 border border-cyan/10 hover:border-cyan/30 transition-all duration-300 group ${
              index % 2 === 0 ? 'md:mt-0' : 'md:mt-8'
            }`}
          >
            {/* Quote icon */}
            <Quote className="absolute top-4 right-4 w-8 h-8 text-cyan/20 group-hover:text-cyan/40 transition-colors" />
            
            {/* Cyan top border */}
            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
            
            {/* Quote text */}
            <p className="text-white/90 text-lg leading-relaxed mb-6 italic">
              "{testimonial.quote}"
            </p>
            
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan/20 flex items-center justify-center">
                <span className="font-orbitron font-bold text-cyan text-sm">
                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-medium text-white">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
}
