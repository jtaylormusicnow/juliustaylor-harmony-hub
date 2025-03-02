
import React from "react";
import MusicCard from "@/components/MusicCard";
import { allMusic } from "@/lib/data";
import { MusicNote, Filter } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Music = () => {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/90 text-white py-16">
          <div className="container-custom">
            <AnimatedSection animation="fade-up">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <MusicNote size={18} />
                <span className="text-sm font-medium uppercase tracking-wider">Music Collection</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-center mb-6">
                My Music
              </h1>
              <p className="text-white/80 text-center max-w-2xl mx-auto">
                Explore my complete collection of releases, from latest tracks to established favorites. Each piece represents a unique chapter in my musical journey.
              </p>
            </AnimatedSection>
          </div>
        </div>
        
        {/* Filter Section */}
        <div className="bg-white py-6 border-b">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-xl font-display font-medium">
                All Releases
              </h2>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <select className="pl-9 pr-4 py-2 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent">
                    <option value="">All Genres</option>
                    <option value="electronic">Electronic</option>
                    <option value="ambient">Ambient</option>
                    <option value="hip-hop">Hip Hop</option>
                    <option value="soul">Soul</option>
                    <option value="jazz">Jazz</option>
                  </select>
                  <Filter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
                
                <div className="relative">
                  <select className="pl-9 pr-4 py-2 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent">
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="az">A-Z</option>
                    <option value="za">Z-A</option>
                  </select>
                  <Filter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Music Grid */}
        <div className="bg-white py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allMusic.map((music, index) => (
                <AnimatedSection 
                  key={music.id} 
                  animation="fade-up" 
                  delay={50 * index}
                >
                  <MusicCard music={music} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Music;
