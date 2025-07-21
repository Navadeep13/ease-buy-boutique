import axios from 'axios';

// Configure axios instance for Flask backend
const API_BASE_URL = 'http://localhost:5000/api'; // Update this to your Flask backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Types
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock: number;
  rating: number;
  reviews_count: number;
}

export interface User {
  id: number;
  email: string;
  name: string;
  phone?: string;
  address?: string;
}

export interface CartItem {
  product_id: number;
  quantity: number;
  product: Product;
}

export interface Order {
  id: number;
  user_id: number;
  items: CartItem[];
  total: number;
  status: string;
  created_at: string;
}

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (userData: { name: string; email: string; password: string }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  logout: async () => {
    const response = await api.post('/auth/logout');
    localStorage.removeItem('token');
    return response.data;
  },
  
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  }
};

// Products API
export const productsAPI = {
  getAll: async (params?: { category?: string; search?: string; page?: number; limit?: number }) => {
    const response = await api.get('/products', { params });
    return response.data;
  },
  
  getById: async (id: number) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  
  getCategories: async () => {
    const response = await api.get('/products/categories');
    return response.data;
  },
  
  getFeatured: async () => {
    const response = await api.get('/products/featured');
    return response.data;
  }
};

// Cart API
export const cartAPI = {
  getCart: async () => {
    const response = await api.get('/cart');
    return response.data;
  },
  
  addItem: async (productId: number, quantity: number) => {
    const response = await api.post('/cart/add', {
      product_id: productId,
      quantity
    });
    return response.data;
  },
  
  updateItem: async (productId: number, quantity: number) => {
    const response = await api.put(`/cart/update/${productId}`, { quantity });
    return response.data;
  },
  
  removeItem: async (productId: number) => {
    const response = await api.delete(`/cart/remove/${productId}`);
    return response.data;
  },
  
  clearCart: async () => {
    const response = await api.delete('/cart/clear');
    return response.data;
  }
};

// Orders API
export const ordersAPI = {
  create: async (orderData: { shipping_address: string; payment_method: string }) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },
  
  getAll: async () => {
    const response = await api.get('/orders');
    return response.data;
  },
  
  getById: async (id: number) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  }
};

export default api;