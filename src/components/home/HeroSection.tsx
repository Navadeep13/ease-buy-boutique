import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="ShopFlow Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient opacity-80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Discover Amazing
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
              Products
            </span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
            Shop the latest trends and find everything you need with our curated collection of premium products.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/products">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Shop Now
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            
            <Link to="/categories">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4 rounded-full backdrop-blur-sm">
                Browse Categories
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-90">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">10K+</div>
              <div className="text-sm md:text-base opacity-80">Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">50K+</div>
              <div className="text-sm md:text-base opacity-80">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">100+</div>
              <div className="text-sm md:text-base opacity-80">Brands</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold">24/7</div>
              <div className="text-sm md:text-base opacity-80">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;