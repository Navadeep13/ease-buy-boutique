import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">ShopFlow</h3>
            <p className="text-muted-foreground">
              Your trusted e-commerce destination for quality products and exceptional service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <nav className="space-y-2">
              <Link to="/products" className="block text-muted-foreground hover:text-primary transition-colors">
                All Products
              </Link>
              <Link to="/categories" className="block text-muted-foreground hover:text-primary transition-colors">
                Categories
              </Link>
              <Link to="/deals" className="block text-muted-foreground hover:text-primary transition-colors">
                Special Deals
              </Link>
              <Link to="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Customer Service</h4>
            <nav className="space-y-2">
              <Link to="/contact" className="block text-muted-foreground hover:text-primary transition-colors">
                Contact Us
              </Link>
              <Link to="/shipping" className="block text-muted-foreground hover:text-primary transition-colors">
                Shipping Info
              </Link>
              <Link to="/returns" className="block text-muted-foreground hover:text-primary transition-colors">
                Returns & Exchanges
              </Link>
              <Link to="/faq" className="block text-muted-foreground hover:text-primary transition-colors">
                FAQ
              </Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Stay Updated</h4>
            <p className="text-muted-foreground text-sm">
              Subscribe to our newsletter for exclusive deals and updates.
            </p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              />
              <button className="w-full btn-primary px-4 py-2 rounded-md text-sm font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © 2024 ShopFlow. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;