
import React from "react";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import MusicCard from "@/components/MusicCard";
import BeatCard from "@/components/BeatCard";
import BlogCard from "@/components/BlogCard";
import { featuredMusic, featuredBeats, featuredBlogPosts } from "@/lib/data";
import { ArrowRight, Play, MusicNote, Newspaper, ShoppingBag } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <Hero />
        
        {/* Featured Music */}
        <section className="section-spacing bg-white">
          <div className="container-custom">
            <AnimatedSection animation="fade-up" className="mb-10 text-center">
              <div className="inline-flex items-center justify-center space-x-2 mb-3">
                <MusicNote size={18} className="text-accent" />
                <span className="text-sm font-medium uppercase tracking-wider text-accent">Featured Releases</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                My Music
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore my latest releases and signature sounds. Each track represents a unique sonic journey crafted with precision and passion.
              </p>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredMusic.map((music, index) => (
                <AnimatedSection 
                  key={music.id} 
                  animation="fade-up" 
                  delay={100 * index}
                >
                  <MusicCard music={music} featured={index === 0} />
                </AnimatedSection>
              ))}
            </div>
            
            <AnimatedSection animation="fade-up" delay={400} className="mt-10 text-center">
              <Link to="/music" className="inline-flex items-center text-accent font-medium hover-link">
                View All Releases <ArrowRight size={16} className="ml-1" />
              </Link>
            </AnimatedSection>
          </div>
        </section>
        
        {/* Featured Beats */}
        <section className="section-spacing bg-gray-50">
          <div className="container-custom">
            <AnimatedSection animation="fade-up" className="mb-10 text-center">
              <div className="inline-flex items-center justify-center space-x-2 mb-3">
                <ShoppingBag size={18} className="text-accent" />
                <span className="text-sm font-medium uppercase tracking-wider text-accent">Premium Beats</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Exclusive Beats
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover and purchase my catalog of professionally crafted beats, perfect for artists looking for their next hit.
              </p>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBeats.map((beat, index) => (
                <AnimatedSection 
                  key={beat.id} 
                  animation="fade-up" 
                  delay={100 * index}
                >
                  <BeatCard beat={beat} featured={index === 0} />
                </AnimatedSection>
              ))}
            </div>
            
            <AnimatedSection animation="fade-up" delay={400} className="mt-10 text-center">
              <Link to="/beats" className="inline-flex items-center text-accent font-medium hover-link">
                Browse All Beats <ArrowRight size={16} className="ml-1" />
              </Link>
            </AnimatedSection>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="section-spacing bg-black text-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <AnimatedSection animation="scale">
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                  Ready to Collaborate?
                </h2>
                <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                  Let's create something amazing together. Whether you're an artist looking for your next beat or a brand seeking a unique sonic identity.
                </p>
                <Link to="/contact" className="btn-accent">
                  Get in Touch
                </Link>
              </AnimatedSection>
            </div>
          </div>
        </section>
        
        {/* Blog Section */}
        <section className="section-spacing bg-white">
          <div className="container-custom">
            <AnimatedSection animation="fade-up" className="mb-10 text-center">
              <div className="inline-flex items-center justify-center space-x-2 mb-3">
                <Newspaper size={18} className="text-accent" />
                <span className="text-sm font-medium uppercase tracking-wider text-accent">Behind The Beats</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Latest from the Blog
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Insights into my creative process, collaborations, and industry perspectives.
              </p>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredBlogPosts.map((post, index) => (
                <AnimatedSection 
                  key={post.id} 
                  animation="fade-up" 
                  delay={100 * index}
                >
                  <BlogCard post={post} featured={index === 0} />
                </AnimatedSection>
              ))}
            </div>
            
            <AnimatedSection animation="fade-up" delay={300} className="mt-10 text-center">
              <Link to="/blog" className="inline-flex items-center text-accent font-medium hover-link">
                View All Articles <ArrowRight size={16} className="ml-1" />
              </Link>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
