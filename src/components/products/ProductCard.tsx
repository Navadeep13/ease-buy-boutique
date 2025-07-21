import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/services/api';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product.id);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Link to={`/products/${product.id}`} className="group">
      <div className="product-card h-full flex flex-col">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden bg-muted relative">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.stock < 10 && product.stock > 0 && (
            <div className="absolute top-2 left-2 bg-warning text-warning-foreground px-2 py-1 rounded-md text-xs font-medium">
              Low Stock
            </div>
          )}
          {product.stock === 0 && (
            <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground px-2 py-1 rounded-md text-xs font-medium">
              Out of Stock
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h3>
            
            <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
              {product.description}
            </p>

            {/* Rating */}
            <div className="flex items-center space-x-1 mt-2">
              {renderStars(product.rating)}
              <span className="text-sm text-muted-foreground ml-1">
                ({product.reviews_count})
              </span>
            </div>
          </div>

          {/* Price and Actions */}
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-sm text-muted-foreground">
                {product.category}
              </span>
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full btn-primary"
              size="sm"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;