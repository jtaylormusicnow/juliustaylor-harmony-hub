
import React from "react";
import BeatCard from "@/components/BeatCard";
import { allBeats } from "@/lib/data";
import { ShoppingBag, Filter, Search } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Beats = () => {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Header */}
        <div className="bg-gradient-to-r from-accent to-accent/80 text-white py-16">
          <div className="container-custom">
            <AnimatedSection animation="fade-up">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <ShoppingBag size={18} />
                <span className="text-sm font-medium uppercase tracking-wider">Premium Collection</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-center mb-6">
                Exclusive Beats
              </h1>
              <p className="text-white/90 text-center max-w-2xl mx-auto">
                Browse and purchase professionally crafted beats for your next project. Each beat comes with full licensing options and instant delivery.
              </p>
            </AnimatedSection>
          </div>
        </div>
        
        {/* Filter Section */}
        <div className="sticky top-16 z-30 bg-white py-6 border-b shadow-sm">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search */}
              <div className="relative w-full md:w-64">
                <input 
                  type="text" 
                  placeholder="Search beats..." 
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
              
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <select className="pl-9 pr-4 py-2 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent">
                    <option value="">All Genres</option>
                    <option value="trap">Trap</option>
                    <option value="hip-hop">Hip Hop</option>
                    <option value="pop">Pop</option>
                    <option value="rnb">R&B</option>
                    <option value="drill">Drill</option>
                  </select>
                  <Filter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
                
                <div className="relative">
                  <select className="pl-9 pr-4 py-2 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent">
                    <option value="">All Keys</option>
                    <option value="c-major">C Major</option>
                    <option value="c-minor">C Minor</option>
                    <option value="d-minor">D Minor</option>
                    <option value="f-major">F Major</option>
                  </select>
                  <Filter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
                
                <div className="relative">
                  <select className="pl-9 pr-4 py-2 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent">
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="bpm-low">BPM: Low to High</option>
                    <option value="bpm-high">BPM: High to Low</option>
                  </select>
                  <Filter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Beats Grid */}
        <div className="bg-white py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allBeats.map((beat, index) => (
                <AnimatedSection 
                  key={beat.id} 
                  animation="fade-up" 
                  delay={50 * index}
                >
                  <BeatCard beat={beat} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
        
        {/* License Information */}
        <div className="bg-gray-50 py-12">
          <div className="container-custom">
            <AnimatedSection animation="fade-up" className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-display font-bold mb-6 text-center">
                Licensing Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-medium text-lg mb-3">Basic License</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Non-exclusive use</li>
                    <li>• MP3 format</li>
                    <li>• 5,000 streams</li>
                    <li>• For demo use only</li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-accent">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent text-white text-xs font-medium py-1 px-3 rounded-full">
                    Popular
                  </div>
                  <h3 className="font-medium text-lg mb-3">Premium License</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Non-exclusive use</li>
                    <li>• WAV + MP3 formats</li>
                    <li>• 100,000 streams</li>
                    <li>• Commercial use</li>
                    <li>• Music videos</li>
                  </ul>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-medium text-lg mb-3">Exclusive License</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Full ownership</li>
                    <li>• WAV + Stems</li>
                    <li>• Unlimited streams</li>
                    <li>• Full commercial rights</li>
                    <li>• Beat removed from store</li>
                  </ul>
                </div>
              </div>
              
              <p className="text-center text-sm text-gray-500 mt-8">
                For custom licensing options or any questions, please contact me directly.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Beats;
