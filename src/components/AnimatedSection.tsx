
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  animation?: "fade-up" | "fade-in" | "scale";
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  delay = 0,
  threshold = 0.1,
  animation = "fade-up",
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            section.classList.add("opacity-100");
            
            if (animation === "fade-up") {
              section.classList.add("translate-y-0");
            } else if (animation === "scale") {
              section.classList.add("scale-100");
            }
          }, delay);
          
          // Unobserve after animation
          observer.unobserve(section);
        }
      },
      { threshold }
    );
    
    observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, [delay, threshold, animation]);
  
  const animationClasses = () => {
    switch (animation) {
      case "fade-up":
        return "opacity-0 translate-y-8 transition-all duration-700";
      case "fade-in":
        return "opacity-0 transition-opacity duration-700";
      case "scale":
        return "opacity-0 scale-95 transition-all duration-700";
      default:
        return "opacity-0 transition-opacity duration-700";
    }
  };
  
  return (
    <div
      ref={sectionRef}
      className={cn(animationClasses(), className)}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
