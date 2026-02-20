import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GitBranch, Star, GitFork, Code2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: Code2, label: 'Repositories', value: '34', color: 'text-cyan' },
  { icon: Star, label: 'LeetCode Problems', value: '111', color: 'text-yellow-400' },
  { icon: GitFork, label: 'Active Days', value: '68', color: 'text-green-400' },
  { icon: GitBranch, label: 'Rating', value: '1398', color: 'text-purple-400' },
];

export default function GitHubStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const languagesRef = useRef<HTMLDivElement>(null);
  const activityRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        },
      });

      tl.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
      )
        .fromTo(
          statsRef.current?.children || [],
          { y: 60, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.4)' },
          '-=0.4'
        )
        .fromTo(
          languagesRef.current,
          { x: -60, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo(
          activityRef.current,
          { x: 60, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.8'
        );

      // Animate language bars
      gsap.fromTo(
        '.lang-bar',
        { width: 0 },
        {
          width: (_i, el) => el.getAttribute('data-width') + '%',
          duration: 1.2,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: languagesRef.current,
            start: 'top 80%',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-16 px-8 bg-dark-bg overflow-hidden"
    >
      {/* Starfield background */}
      <div className="absolute inset-0 starfield opacity-30" />

      {/* Gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 opacity-0">
          <span className="micro-label">OPEN SOURCE & COMPETITIVE CODING</span>
          <h2 className="font-orbitron font-bold text-[clamp(32px,4vw,56px)] text-white mt-2">
            CODING <span className="text-cyan neon-text">STATS</span>
          </h2>
          <p className="text-muted-foreground mt-4">
            Building in public, one commit at a time. LeetCode Rating: 1398
          </p>
        </div>

        {/* Stats Grid */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="relative p-6 rounded-2xl bg-dark-card border border-cyan/20 hover:border-cyan/50 transition-all duration-300 hover:shadow-neon group opacity-0"
              >
                <Icon className={`w-8 h-8 ${stat.color} mb-4 group-hover:scale-110 transition-transform`} />
                <div className="font-orbitron font-bold text-3xl text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Language Stats */}
          <div
            ref={languagesRef}
            className="p-8 rounded-2xl bg-dark-card border border-cyan/20 opacity-0"
          >
            <h3 className="font-orbitron font-bold text-xl text-white mb-6 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-cyan" />
              LeetCode Problems Solved
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white font-medium">Easy</span>
                  <span className="text-muted-foreground text-sm">19 solved</span>
                </div>
                <div className="h-2 bg-dark-bg rounded-full overflow-hidden">
                  <div
                    className="lang-bar h-full bg-green-500 rounded-full transition-all duration-300"
                    data-width="22"
                    style={{ width: 0 }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white font-medium">Medium</span>
                  <span className="text-muted-foreground text-sm">34 solved</span>
                </div>
                <div className="h-2 bg-dark-bg rounded-full overflow-hidden">
                  <div
                    className="lang-bar h-full bg-yellow-400 rounded-full transition-all duration-300"
                    data-width="40"
                    style={{ width: 0 }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white font-medium">Hard</span>
                  <span className="text-muted-foreground text-sm">32 solved</span>
                </div>
                <div className="h-2 bg-dark-bg rounded-full overflow-hidden">
                  <div
                    className="lang-bar h-full bg-red-500 rounded-full transition-all duration-300"
                    data-width="38"
                    style={{ width: 0 }}
                  />
                </div>
              </div>
              <div className="pt-4 border-t border-cyan/10">
                <div className="flex justify-between items-center">
                  <span className="text-cyan font-bold">Total Score</span>
                  <span className="text-white text-2xl font-bold">85</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contribution Graph */}
          <div
            ref={activityRef}
            className="p-8 rounded-2xl bg-dark-card border border-cyan/20 opacity-0"
          >
            <h3 className="font-orbitron font-bold text-xl text-white mb-6 flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-cyan" />
              Competitive Programming
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-xl bg-dark-bg border border-cyan/10">
                <div>
                  <p className="text-white font-bold text-lg">CodeChef</p>
                  <p className="text-muted-foreground text-sm">Problems Solved</p>
                </div>
                <div className="text-right">
                  <p className="text-cyan font-bold text-2xl">23</p>
                  <p className="text-muted-foreground text-xs">Score: 26</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-dark-bg border border-cyan/10">
                <div>
                  <p className="text-white font-bold text-lg">CodeForces</p>
                  <p className="text-muted-foreground text-sm">Problems Solved</p>
                </div>
                <div className="text-right">
                  <p className="text-cyan font-bold text-2xl">3</p>
                  <p className="text-muted-foreground text-xs">Active</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-dark-bg border border-cyan/10">
                <div>
                  <p className="text-white font-bold text-lg">Total Contests</p>
                  <p className="text-muted-foreground text-sm">Participated</p>
                </div>
                <div className="text-right">
                  <p className="text-cyan font-bold text-2xl">14</p>
                  <p className="text-muted-foreground text-xs">Platforms</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
