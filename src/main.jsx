import { StrictMode, useContext } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import App, { AppContext } from './App.jsx';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import OrdersPage from './pages/OrdersPage';
import Login from './pages/Login';
import Admin from './pages/Admin';

const ProtectedRoute = ({ children, isLoggedIn }) => {
  if (isLoggedIn === 'true') return children;
  return <Navigate to="/login" replace />;
};

const AdminRoute = ({ children, isLoggedIn, role }) => {
  if (isLoggedIn === 'true' && role === 'admin') return children;
  return <Navigate to="/" replace />;
};

const RootComponent = () => {
  const { products, cart, isLoggedIn, role, addProduct, addToCart, incrementItem, decrementItem, clearCart, handleLogin, handleLogout } = useContext(AppContext);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavigationBar isLoggedIn={isLoggedIn} role={role} onLogout={handleLogout} />
      <main className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products}
                cart={cart}
                onAddToCart={addToCart}
                onIncrement={incrementItem}
                onDecrement={decrementItem}
              />
            }
          />
          <Route
            path="/products"
            element={
              <ProductsPage
                products={products}
                cart={cart}
                onAddToCart={addToCart}
                onIncrement={incrementItem}
                onDecrement={decrementItem}
              />
            }
          />
          <Route
            path="/cart"
            element={<CartPage products={products} cart={cart} onIncrement={incrementItem} onDecrement={decrementItem} />}
          />
          <Route
            path="/payment"
            element={<PaymentPage products={products} cart={cart} onClearCart={clearCart} />}
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login onLogin={handleLogin} isLoggedIn={isLoggedIn} role={role} />} />
          <Route
            path="/admin"
            element={
              <AdminRoute isLoggedIn={isLoggedIn} role={role}>
                <Admin onAddProduct={addProduct} />
              </AdminRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <App>
        <RootComponent />
      </App>
    </BrowserRouter>
  </StrictMode>
);