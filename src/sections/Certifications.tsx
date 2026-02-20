import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Code, Cloud, Database, Brain } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const certifications = [
  {
    icon: Code,
    title: 'Python Programming Mastery',
    issuer: 'Udemy',
    date: '2024',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Cloud,
    title: 'AWS Cloud Practitioner (CLF-C02)',
    issuer: 'LinkedIn Learning',
    date: '2024',
    color: 'from-orange-500 to-yellow-500',
  },
  {
    icon: Brain,
    title: 'AI & ML Internship',
    issuer: 'NSIC - Technical Services Centre',
    date: '2024',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Database,
    title: 'Data Science Internship',
    issuer: 'Arjun Vision Tech Solutions',
    date: '2024',
    color: 'from-red-500 to-pink-500',
  },
  {
    icon: Award,
    title: 'Deep Learning Specialist',
    issuer: 'Coursera',
    date: '2024',
    color: 'from-purple-500 to-violet-500',
  },
  {
    icon: Code,
    title: 'SQL Database Expert',
    issuer: 'DataCamp',
    date: '2024',
    color: 'from-cyan-500 to-blue-500',
  },
];

export default function Certifications() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        gridRef.current?.children || [],
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 px-8 bg-dark-bg overflow-hidden"
    >
      {/* Starfield background */}
      <div className="absolute inset-0 starfield opacity-30" />

      {/* Gradient orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-cyan/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 opacity-0">
          <span className="micro-label">ACHIEVEMENTS UNLOCKED</span>
          <h2 className="font-orbitron font-bold text-[clamp(32px,4vw,56px)] text-white mt-2">
            CERTIFICATIONS & <span className="text-cyan neon-text">AWARDS</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Validated expertise across cloud computing, AI/ML, and software engineering
          </p>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-dark-card border border-cyan/20 hover:border-cyan/50 transition-all duration-300 hover:shadow-neon cursor-pointer opacity-0"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                {/* Icon */}
                <div className="relative mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cert.color} p-3 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="font-orbitron font-bold text-lg text-white mb-2 group-hover:text-cyan transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-1">{cert.issuer}</p>
                  <p className="text-cyan/70 text-xs font-mono">{cert.date}</p>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                  <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${cert.color} opacity-20 transform rotate-45 translate-x-10 -translate-y-10`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
