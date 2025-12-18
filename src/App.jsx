import { useState, useEffect } from 'react';
import { createContext } from 'react';
import { toast } from 'react-toastify';
import NavigationBar from './components/NavigationBar';

export const AppContext = createContext();

const initialProducts = [
  {
    id: 1,
    name: 'Product 1',
    sellingPrice: 100,
    originalPrice: 150,
    image: 'https://images.unsplash.com/photo-1763991345353-190ade4ee883?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    name: 'Product 2',
    sellingPrice: 200,
    originalPrice: 250,
    image: 'https://images.unsplash.com/photo-1765109834602-e5d71887cb0d?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    name: 'Product 3',
    sellingPrice: 300,
    originalPrice: 350,
    image: 'https://images.unsplash.com/photo-1765147214613-2ee8853ca50d?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const App = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(() => sessionStorage.getItem('isLoggedIn') || 'false');
  const [role, setRole] = useState(() => sessionStorage.getItem('role') || 'user');

  // Fetch products from API on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);
        const data = await response.json();
        console.log('API products:', data);
        // Map API data to frontend format
        const mappedProducts = data.map(product => ({
          id: product._id || product.id || product.product_id,
          name: product.name,
          sellingPrice: product.selling_price ?? product.price,
          originalPrice: product.original_price ?? (product.selling_price ? product.selling_price * 1.5 : product.price * 1.5),
          image: product.imageURL ?? product.image_url ?? product.image,
          category: product.category
        }));
        console.log('Mapped products:', mappedProducts);
        setProducts(mappedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
      }
    };
    fetchProducts();
  }, []);

  // Fetch cart from API on component mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        const data = await response.json();
        setCart(data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
  }, []);

  useEffect(() => {
    sessionStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    sessionStorage.setItem('role', role);
  }, [role]);

  const addProduct = async (newProduct) => {
    // Optimistically update UI
    setProducts((prev) => [...prev, newProduct]);
    
    // Fetch updated products list from API
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);
      const data = await response.json();
      const mappedProducts = data.map(product => ({
        id: product._id || product.id || product.product_id,
        name: product.name,
        sellingPrice: product.selling_price ?? product.price,
        originalPrice: product.original_price ?? (product.selling_price ? product.selling_price * 1.5 : product.price * 1.5),
        image: product.imageURL ?? product.image_url ?? product.image,
        category: product.category
      }));
      setProducts(mappedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addToCart = async (id) => {
    const newCart = { ...cart, [id]: 1 };
    setCart(newCart);
    try {
      const token = sessionStorage.getItem('token');
      await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(newCart),
      });
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Failed to update cart');
    }
  };

  const incrementItem = async (id) => {
    const updatedCart = { ...cart, [id]: (cart[id] || 0) + 1 };
    setCart(updatedCart);
    try {
      const token = sessionStorage.getItem('token');
      await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(updatedCart),
      });
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Failed to update cart');
    }
  };

  const decrementItem = async (id) => {
    const current = cart[id] || 0;
    let updatedCart;
    if (current <= 1) {
      const { [id]: _, ...rest } = cart;
      updatedCart = rest;
    } else {
      updatedCart = { ...cart, [id]: current - 1 };
    }
    setCart(updatedCart);
    try {
      const token = sessionStorage.getItem('token');
      await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(updatedCart),
      });
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Failed to update cart');
    }
  };

  const handleLogin = (nextRole = 'user') => {
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('role', nextRole);
    setIsLoggedIn('true');
    setRole(nextRole);
  };

  const clearCart = async () => {
    setCart({});
    try {
      const token = sessionStorage.getItem('token');
      await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const handleLogout = async () => {
    sessionStorage.setItem('isLoggedIn', 'false');
    sessionStorage.setItem('role', 'user');
    setIsLoggedIn('false');
    setRole('user');
    await clearCart();
  };

  return (
    <AppContext.Provider value={{ products, cart, isLoggedIn, role, addProduct, addToCart, incrementItem, decrementItem, clearCart, handleLogin, handleLogout }}>
      {children}
    </AppContext.Provider>
  );
};

export default App;