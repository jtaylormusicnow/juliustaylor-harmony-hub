
import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";

const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-70"
        style={{ 
          backgroundImage: "url('/lovable-uploads/30833680-a35e-46a1-8c3e-fd8c5eb6e71b.png')",
          transform: "scale(1.1)" 
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black/90" />
      
      {/* Content */}
      <div className="container-custom relative z-10 h-full flex flex-col justify-center">
        <AnimatedSection animation="fade-up" className="max-w-4xl">
          <span className="inline-block mb-4 px-4 py-1.5 text-xs md:text-sm font-medium bg-white/10 backdrop-blur-sm text-white rounded-full">
            MUSIC PRODUCER • ARTIST • BEATMAKER
          </span>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6">
            Crafting <span className="text-gradient">Sonic Experiences</span> That Resonate
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
            Experience the unique sound of J. Taylor. Pushing boundaries in music production with innovative beats, seamless collaborations, and immersive compositions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/music" className="btn-accent">
              Explore My Music
            </Link>
            
            <Link to="/beats" className="btn-primary bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20">
              Browse Beats
            </Link>
          </div>
        </AnimatedSection>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-pulse-slow">
          <span className="text-white/70 text-sm mb-2">Scroll Down</span>
          <ArrowRight size={20} className="text-white/70 transform rotate-90" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
