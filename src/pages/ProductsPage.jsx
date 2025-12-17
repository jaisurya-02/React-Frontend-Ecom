import ProductList from '../components/ProductList';

const ProductsPage = ({ products, cart, onAddToCart, onIncrement, onDecrement }) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <ProductList
        products={products}
        cart={cart}
        onAddToCart={onAddToCart}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />
    </div>
  );
};

export default ProductsPage;
