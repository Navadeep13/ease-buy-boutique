import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import { Product, productsAPI } from '@/services/api';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'name');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'home-kitchen', label: 'Home & Kitchen' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'sports-outdoors', label: 'Sports & Outdoors' },
  ];

  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
  ];

  useEffect(() => {
    loadProducts();
  }, [searchQuery, selectedCategory, sortBy]);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const params: any = {};
      
      if (searchQuery) params.search = searchQuery;
      if (selectedCategory && selectedCategory !== 'all') params.category = selectedCategory;
      
      const response = await productsAPI.getAll(params);
      let fetchedProducts = response.products || [];
      
      // Apply sorting
      fetchedProducts = sortProducts(fetchedProducts, sortBy);
      
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Failed to load products:', error);
      // Use mock data for demo
      const mockProducts = getMockProducts();
      const filtered = filterMockProducts(mockProducts, searchQuery, selectedCategory);
      setProducts(sortProducts(filtered, sortBy));
    } finally {
      setIsLoading(false);
    }
  };

  const sortProducts = (products: Product[], sortOption: string) => {
    const sorted = [...products];
    
    switch (sortOption) {
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return sorted.sort((a, b) => b.id - a.id);
      default:
        return sorted;
    }
  };

  const filterMockProducts = (products: Product[], search: string, category: string) => {
    let filtered = products;
    
    if (search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (category && category !== 'all') {
      filtered = filtered.filter(product =>
        product.category.toLowerCase().replace(/\s+/g, '-') === category
      );
    }
    
    return filtered;
  };

  const getMockProducts = (): Product[] => [
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
    },
    {
      id: 9,
      name: "Designer Sunglasses",
      description: "Stylish UV protection sunglasses",
      price: 149.99,
      image_url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
      category: "Accessories",
      stock: 22,
      rating: 4.2,
      reviews_count: 73
    },
    {
      id: 10,
      name: "Laptop Stand",
      description: "Adjustable laptop stand for ergonomic working",
      price: 59.99,
      image_url: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
      category: "Electronics",
      stock: 35,
      rating: 4.1,
      reviews_count: 94
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchParams({ search: searchQuery });
  };

  const updateSearchParams = (updates: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            All Products
          </h1>
          <p className="text-muted-foreground">
            Discover our complete collection of premium products
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-lg p-6 mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 md:max-w-md">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Category Filter */}
          <Select
            value={selectedCategory}
            onValueChange={(value) => {
              setSelectedCategory(value);
              updateSearchParams({ category: value === 'all' ? '' : value });
            }}
          >
            <SelectTrigger className="w-full md:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select
            value={sortBy}
            onValueChange={(value) => {
              setSortBy(value);
              updateSearchParams({ sort: value });
            }}
          >
            <SelectTrigger className="w-full md:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        {!isLoading && (
          <div className="mb-6">
            <p className="text-muted-foreground">
              {products.length} product{products.length !== 1 ? 's' : ''} found
            </p>
          </div>
        )}

        {/* Products Grid */}
        <ProductGrid products={products} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Products;