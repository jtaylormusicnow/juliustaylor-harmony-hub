
import React from "react";
import BlogCard from "@/components/BlogCard";
import { allBlogPosts } from "@/lib/data";
import { Newspaper, Filter, Search } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Blog = () => {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Header */}
        <div className="bg-gradient-to-r from-black to-gray-800 text-white py-16">
          <div className="container-custom">
            <AnimatedSection animation="fade-up">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Newspaper size={18} />
                <span className="text-sm font-medium uppercase tracking-wider">Insights & Stories</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-center mb-6">
                Behind the Beats
              </h1>
              <p className="text-white/80 text-center max-w-2xl mx-auto">
                Dive into the creative process, collaborations, and insights from my journey in music production. Learn about the stories behind the tracks and industry perspectives.
              </p>
            </AnimatedSection>
          </div>
        </div>
        
        {/* Filter Section */}
        <div className="bg-white py-6 border-b">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search */}
              <div className="relative w-full md:w-64">
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
              
              {/* Filter */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <select className="pl-9 pr-4 py-2 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent">
                    <option value="">All Topics</option>
                    <option value="production">Production</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="behind-the-scenes">Behind The Scenes</option>
                    <option value="industry">Industry Insights</option>
                  </select>
                  <Filter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
                
                <div className="relative">
                  <select className="pl-9 pr-4 py-2 bg-gray-100 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent">
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                  <Filter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Blog Grid */}
        <div className="bg-white py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {allBlogPosts.map((post, index) => (
                <AnimatedSection 
                  key={post.id} 
                  animation="fade-up" 
                  delay={100 * index}
                >
                  <BlogCard post={post} featured={index === 0} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="bg-gray-50 py-16">
          <div className="container-custom">
            <AnimatedSection animation="fade-up" className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-display font-bold mb-4">
                Stay in the Loop
              </h2>
              <p className="text-gray-600 mb-6">
                Subscribe to my newsletter to receive the latest blog posts, music releases, and exclusive content straight to your inbox.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
                <button 
                  type="submit" 
                  className="btn-accent whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
              
              <p className="text-xs text-gray-500 mt-3">
                By subscribing, you agree to receive email communications from me.
                You can unsubscribe at any time.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
