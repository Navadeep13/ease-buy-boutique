import React, { createContext, useContext, useEffect, useState } from 'react';
import { cartAPI, CartItem } from '../services/api';
import { useAuth } from './AuthContext';
import { toast } from '@/hooks/use-toast';

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
  addItem: (productId: number, quantity?: number) => Promise<void>;
  updateItem: (productId: number, quantity: number) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      refreshCart();
    } else {
      setItems([]);
    }
  }, [isAuthenticated]);

  const refreshCart = async () => {
    if (!isAuthenticated) return;
    
    try {
      setIsLoading(true);
      const response = await cartAPI.getCart();
      setItems(response.items || []);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      toast({
        title: "Error",
        description: "Failed to load cart items",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addItem = async (productId: number, quantity: number = 1) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to add items to cart",
        variant: "destructive",
      });
      return;
    }

    try {
      await cartAPI.addItem(productId, quantity);
      await refreshCart();
      toast({
        title: "Added to Cart",
        description: "Item successfully added to your cart",
      });
    } catch (error) {
      console.error('Failed to add item:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    }
  };

  const updateItem = async (productId: number, quantity: number) => {
    try {
      await cartAPI.updateItem(productId, quantity);
      await refreshCart();
    } catch (error) {
      console.error('Failed to update item:', error);
      toast({
        title: "Error",
        description: "Failed to update cart item",
        variant: "destructive",
      });
    }
  };

  const removeItem = async (productId: number) => {
    try {
      await cartAPI.removeItem(productId);
      await refreshCart();
      toast({
        title: "Removed from Cart",
        description: "Item removed from your cart",
      });
    } catch (error) {
      console.error('Failed to remove item:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive",
      });
    }
  };

  const clearCart = async () => {
    try {
      await cartAPI.clearCart();
      setItems([]);
      toast({
        title: "Cart Cleared",
        description: "All items removed from cart",
      });
    } catch (error) {
      console.error('Failed to clear cart:', error);
      toast({
        title: "Error",
        description: "Failed to clear cart",
        variant: "destructive",
      });
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const value = {
    items,
    totalItems,
    totalPrice,
    isLoading,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};