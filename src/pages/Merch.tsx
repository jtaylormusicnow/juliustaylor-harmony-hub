
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Tag, ArrowRight } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Mock merch data
const merchItems = [
  {
    id: '1',
    name: 'JuliusTaylor Logo T-Shirt',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 29.99,
    category: 'Apparel',
    isNew: true
  },
  {
    id: '2',
    name: 'Music Studio Hoodie',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 49.99,
    category: 'Apparel'
  },
  {
    id: '3',
    name: 'Vinyl Collection Cap',
    image: 'https://images.unsplash.com/photo-1620327467532-6ebaca6273ed?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 24.99,
    category: 'Accessories'
  },
  {
    id: '4',
    name: 'Limited Edition Studio Poster',
    image: 'https://images.unsplash.com/photo-1550037024-08a3e9702fa3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 19.99,
    category: 'Wall Art',
    isFeatured: true
  },
  {
    id: '5',
    name: 'Beats Maker Coffee Mug',
    image: 'https://images.unsplash.com/photo-1577998474517-7eeeed4e448a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 14.99,
    category: 'Accessories'
  },
  {
    id: '6',
    name: 'Studio Essentials Tote Bag',
    image: 'https://images.unsplash.com/photo-1625718573472-1f0bdf6ff801?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    price: 22.99,
    category: 'Accessories',
    isNew: true
  }
];

const MerchItem = ({ id, name, image, price, category, isNew, isFeatured }: {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  isNew?: boolean;
  isFeatured?: boolean;
}) => {
  return (
    <div className="group relative">
      <div className="relative aspect-square overflow-hidden rounded-xl">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {isNew && (
          <span className="absolute top-2 left-2 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
            New
          </span>
        )}
        
        {isFeatured && (
          <span className="absolute top-2 left-2 px-2 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
            Featured
          </span>
        )}
        
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-full transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2">
            <ShoppingCart size={16} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-medium">{name}</h3>
          <span className="text-primary font-semibold">${price}</span>
        </div>
        <span className="text-sm text-muted-foreground flex items-center gap-1">
          <Tag size={14} />
          {category}
        </span>
      </div>
    </div>
  );
};

const Merch = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:py-40 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Official <span className="text-gradient">Merch</span> Store
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Wear your passion for music. Browse our collection of high-quality merchandise designed for the true music enthusiast.
            </p>
            <Link 
              to="#merch-collection" 
              className="px-8 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
            >
              <ShoppingCart size={18} />
              <span>Shop Now</span>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Product */}
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="relative aspect-square max-w-[500px] mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                  alt="Featured Merchandise" 
                  className="rounded-2xl object-cover w-full h-full animate-fade-in shadow-2xl"
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                  Featured
                </span>
              </div>
            </div>
            
            <div className="md:w-1/2 space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-display font-bold">Limited Edition Collection</h2>
                <p className="text-muted-foreground max-w-xl">
                  Our latest merch drop features premium quality materials with designs inspired by the beats and sounds of JuliusTaylor. Get yours before they're gone.
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <Tag size={18} className="text-primary mt-1" />
                    <p>100% premium cotton for ultimate comfort</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Tag size={18} className="text-primary mt-1" />
                    <p>Exclusive designs you won't find anywhere else</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Tag size={18} className="text-primary mt-1" />
                    <p>Worldwide shipping available</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Link 
                    to="#limited-edition" 
                    className="px-8 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                  >
                    <span>Shop Limited Collection</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Merch Collection */}
      <section id="merch-collection" className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center">
            Merch Collection
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {merchItems.map((item) => (
              <MerchItem
                key={item.id}
                id={item.id}
                name={item.name}
                image={item.image}
                price={item.price}
                category={item.category}
                isNew={item.isNew}
                isFeatured={item.isFeatured}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Join Our Mailing List
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Subscribe to our newsletter for updates on new merch drops, exclusive discounts, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Merch;
