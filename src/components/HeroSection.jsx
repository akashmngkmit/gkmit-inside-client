import React, { useState, useEffect, useRef } from 'react'; // Import React hooks
import { ArrowBigRight } from 'lucide-react';

export function HeroSection() {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);
  useEffect(() => {
    if (window.VANTA && window.THREE) {
      if (!vantaEffect) {
        const effect = window.VANTA.GLOBE({
          el: vantaRef.current,
          THREE: window.THREE, 
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x879dd9,
          size: 1.20,
          backgroundColor: 0x0 
        });
        setVantaEffect(effect);
      }
    }
    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [vantaEffect]);

  return (
    <div className="relative min-h-screen w-full">
      <div 
        ref={vantaRef} 
        className="absolute top-0 left-0 w-full h-full z-0"
      />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-black/50 backdrop-blur-sm w-full max-w-6xl p-6 md:p-12 flex flex-col items-center justify-center gap-6 md:gap-8 border-2 border-white border-dotted rounded-2xl text-center">
          
          <h1 className="text-6xl md:text-7xl font-bold text-white">Welcome to GKMIT INSIDE</h1>
          
          <p className="text-lg md:text-xl max-w-3xl text-gray-200">
            Your internal hub for company news, team updates, and connecting with
            colleagues. Share your projects, celebrate successes, and stay in the
            loop with everything happening at GKMIT.
          </p>
          <a
            className="bg-white text-black h-12 w-48 px-6 flex gap-3 items-center justify-center rounded-full hover:bg-gray-200 group hover:scale-110 duration-300 ease-in transition"
            href="/login"
          >
            Login
            <ArrowBigRight className="w-5 h-5 group-hover:rotate-135 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </div>
  );
}