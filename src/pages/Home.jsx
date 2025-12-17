import { Link } from 'react-router';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';

const Home = ({ products, cart, onAddToCart, onIncrement, onDecrement }) => {
  const topProducts = products.slice(0, 3);

  return (
    <div className="bg-gray-50">
      <section className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 space-y-4">
          <p className="text-sm font-semibold text-blue-600 uppercase">New Season</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Find your next favorite product today.</h1>
          <p className="text-lg text-gray-600">Curated picks with clear pricing and quick checkout. Add items to your cart, review orders, or manage inventory from the admin panel.</p>
          <div className="flex gap-4">
            <Link to="/products" className="bg-blue-600 text-white px-5 py-3 rounded-md shadow hover:bg-blue-700">Shop Products</Link>
            <Link to="/cart" className="border border-gray-300 px-5 py-3 rounded-md hover:bg-white">View Cart</Link>
          </div>
        </div>
       
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Top 3 Products</h2>
          <Link to="/products" className="text-blue-600 hover:underline">Browse all</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              sellingPrice={product.sellingPrice}
              originalPrice={product.originalPrice}
              image={product.image}
              count={cart[product.id] || 0}
              onAddToCart={onAddToCart}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
