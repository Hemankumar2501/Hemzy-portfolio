import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Certifications from './sections/Certifications';
import GitHubStats from './sections/GitHubStats';
import Process from './sections/Process';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Simple refresh after mount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative bg-dark-bg min-h-screen">
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main className="relative">
        <Hero />
        <div id="about">
          <About />
        </div>
        <Skills />
        <div id="work">
          <Projects />
        </div>
        <Certifications />
        <GitHubStats />
        <Process />
        <Testimonials />
        <div id="contact">
          <Contact />
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default App;
