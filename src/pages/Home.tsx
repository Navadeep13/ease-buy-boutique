import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedProducts />
    </div>
  );
};

export default Home;