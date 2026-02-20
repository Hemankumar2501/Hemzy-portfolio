import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Github, Linkedin, Send } from 'lucide-react';
import ContactCharacters from '../components/3d/ContactCharacters';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const charactersRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

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
        .fromTo(textRef.current, 
          { x: '-18vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        )
        .fromTo(charactersRef.current, 
          { y: '18vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.05
        )
        .fromTo(ringRef.current, 
          { scale: 0.6, opacity: 0 },
          { scale: 1, opacity: 1, ease: 'none' },
          0.05
        )
        .fromTo(formRef.current, 
          { y: '10vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0.1
        );

      // SETTLE (30-70%) - characters idle animation handled by R3F

      // EXIT (70-100%)
      scrollTl
        .fromTo(charactersRef.current, 
          { x: 0, opacity: 1 },
          { x: '10vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo([textRef.current, formRef.current], 
          { y: 0, opacity: 1 },
          { y: '-6vh', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(ringRef.current, 
          { scale: 1, opacity: 1 },
          { scale: 1.2, opacity: 0, ease: 'power2.in' },
          0.7
        );

    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Message sent! (Demo)');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section 
      id="contact"
      ref={sectionRef} 
      className="section-pinned bg-dark-bg z-[60]"
    >
      {/* Starfield background */}
      <div className="absolute inset-0 starfield opacity-40" />
      
      {/* Green glow behind form */}
      <div 
        ref={ringRef}
        className="absolute right-[10vw] top-[20vh] w-[35vw] h-[35vw] opacity-0"
        style={{
          background: 'radial-gradient(circle, rgba(45, 255, 111, 0.1) 0%, transparent 60%)',
          filter: 'blur(40px)',
          zIndex: 1
        }}
      />

      {/* Left text block */}
      <div 
        ref={textRef}
        className="absolute left-[6vw] top-[22vh] w-[36vw] opacity-0"
        style={{ zIndex: 4 }}
      >
        <h2 className="font-orbitron font-bold text-[clamp(32px,3.5vw,56px)] text-white mb-4">
          LET'S <span className="text-cyan neon-text">CONNECT</span>
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed mb-6">
          Interested in collaborating? Let's turn complex problems into smart, data-powered solutions.
        </p>
        
        {/* Email */}
        <a 
          href="mailto:hemankumar.chandrasekar@gmail.com" 
          className="inline-flex items-center gap-2 text-cyan hover:text-cyan-light transition-colors mb-6"
        >
          <Mail className="w-5 h-5" />
          <span className="font-mono">hemankumar.chandrasekar@gmail.com</span>
        </a>
        
        {/* Social chips */}
        <div className="flex gap-3">
          <a 
            href="https://github.com/Hemankumar2501" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-dark-panel border border-cyan/30 flex items-center justify-center text-cyan hover:border-cyan hover:shadow-neon transition-all"
          >
            <Github className="w-5 h-5" />
          </a>
          <a 
            href="https://linkedin.com/in/hemankumar-c-264b0429b" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-dark-panel border border-cyan/30 flex items-center justify-center text-cyan hover:border-cyan hover:shadow-neon transition-all"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a 
            href="tel:+919444969550" 
            className="w-10 h-10 rounded-full bg-dark-panel border border-cyan/30 flex items-center justify-center text-cyan hover:border-cyan hover:shadow-neon transition-all"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* 3D Characters */}
      <div 
        ref={charactersRef}
        className="absolute right-[5vw] top-[10vh] w-[45vw] h-[80vh] opacity-0"
        style={{ zIndex: 3 }}
      >
        <ContactCharacters />
      </div>

      {/* Form panel */}
      <div 
        ref={formRef}
        className="absolute left-[6vw] top-[58vh] w-[40vw] opacity-0"
        style={{ zIndex: 5 }}
      >
        <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block micro-label mb-2">NAME</label>
              <input 
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-cyan/20 text-white placeholder:text-muted-foreground focus:border-cyan focus:outline-none focus:shadow-neon transition-all"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="block micro-label mb-2">EMAIL</label>
              <input 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-cyan/20 text-white placeholder:text-muted-foreground focus:border-cyan focus:outline-none focus:shadow-neon transition-all"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block micro-label mb-2">MESSAGE</label>
            <textarea 
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-dark-bg border border-cyan/20 text-white placeholder:text-muted-foreground focus:border-cyan focus:outline-none focus:shadow-neon transition-all resize-none"
              rows={3}
              placeholder="Tell me about your project..."
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full btn-cyan flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
