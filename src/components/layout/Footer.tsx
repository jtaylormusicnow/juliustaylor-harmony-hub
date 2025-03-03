
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="py-16 px-6 bg-secondary/50 dark:bg-secondary/20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-display font-bold mb-4 block">
              <span className="text-gradient">JuliusTaylor</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              A platform for artists, beats, and community. Join our growing network of musicians and producers.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" className="hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" className="hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://facebook.com" className="hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://youtube.com" className="hover:text-primary transition-colors" aria-label="Youtube">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-display font-medium text-lg mb-4">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/artists" className="text-muted-foreground hover:text-primary transition-colors">
                  Artists
                </Link>
              </li>
              <li>
                <Link to="/beats" className="text-muted-foreground hover:text-primary transition-colors">
                  Beat Store
                </Link>
              </li>
              <li>
                <Link to="/merch" className="text-muted-foreground hover:text-primary transition-colors">
                  Merch
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-medium text-lg mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/licensing" className="text-muted-foreground hover:text-primary transition-colors">
                  Licensing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border/50 text-center text-muted-foreground">
          <p>© {year} JuliusTaylor Music Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
