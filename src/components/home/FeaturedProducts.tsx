import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductGrid from '../products/ProductGrid';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Product, productsAPI } from '@/services/api';

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      setIsLoading(true);
      const response = await productsAPI.getFeatured();
      setProducts(response.products?.slice(0, 8) || []);
    } catch (error) {
      console.error('Failed to load featured products:', error);
      // Fallback to mock data for demo
      setProducts(mockProducts);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock data for demo purposes
  const mockProducts: Product[] = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation",
      price: 199.99,
      image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      category: "Electronics",
      stock: 25,
      rating: 4.8,
      reviews_count: 127
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      description: "Track your health and fitness with this advanced smartwatch",
      price: 299.99,
      image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      category: "Electronics",
      stock: 15,
      rating: 4.6,
      reviews_count: 89
    },
    {
      id: 3,
      name: "Organic Cotton T-Shirt",
      description: "Comfortable and sustainable organic cotton t-shirt",
      price: 29.99,
      image_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      category: "Fashion",
      stock: 50,
      rating: 4.4,
      reviews_count: 203
    },
    {
      id: 4,
      name: "Minimalist Backpack",
      description: "Sleek and functional backpack for everyday use",
      price: 79.99,
      image_url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
      category: "Accessories",
      stock: 32,
      rating: 4.7,
      reviews_count: 156
    },
    {
      id: 5,
      name: "Wireless Bluetooth Speaker",
      description: "Portable speaker with rich, immersive sound",
      price: 89.99,
      image_url: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
      category: "Electronics",
      stock: 18,
      rating: 4.5,
      reviews_count: 94
    },
    {
      id: 6,
      name: "Ceramic Coffee Mug",
      description: "Handcrafted ceramic mug perfect for your morning coffee",
      price: 24.99,
      image_url: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400",
      category: "Home & Kitchen",
      stock: 40,
      rating: 4.3,
      reviews_count: 67
    },
    {
      id: 7,
      name: "Ergonomic Desk Chair",
      description: "Comfortable office chair with lumbar support",
      price: 249.99,
      image_url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
      category: "Furniture",
      stock: 8,
      rating: 4.9,
      reviews_count: 178
    },
    {
      id: 8,
      name: "Stainless Steel Water Bottle",
      description: "Insulated water bottle that keeps drinks cold for 24 hours",
      price: 34.99,
      image_url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
      category: "Sports & Outdoors",
      stock: 60,
      rating: 4.6,
      reviews_count: 112
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of the most popular and trending products
          </p>
        </div>

        <div className="animate-slide-up">
          <ProductGrid products={products} isLoading={isLoading} />
        </div>

        <div className="text-center mt-12">
          <Link to="/products">
            <Button size="lg" className="btn-primary">
              View All Products
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;