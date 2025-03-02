
import React from "react";
import { BlogPost } from "@/lib/data";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogCardProps {
  post: BlogPost;
  className?: string;
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ 
  post, 
  className = "",
  featured = false
}) => {
  return (
    <div 
      className={`group rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl bg-white ${
        featured ? "md:col-span-2 md:grid md:grid-cols-2" : ""
      } ${className}`}
    >
      <div className="relative overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title} 
          className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            featured ? "h-full md:h-full" : "h-48"
          }`}
        />
      </div>
      
      <div className="p-5">
        <div className="flex items-center mb-3 text-sm text-gray-500">
          <Calendar size={14} className="mr-1" />
          <span>{post.date}</span>
        </div>
        
        <h3 className={`font-display font-semibold ${featured ? "text-xl md:text-2xl" : "text-lg"} mb-2 group-hover:text-accent transition-colors`}>
          {post.title}
        </h3>
        
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {post.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span 
              key={tag} 
              className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <Link 
          to={`/blog/${post.id}`} 
          className="inline-flex items-center text-accent font-medium text-sm hover-link"
        >
          Read More <ArrowRight size={14} className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
