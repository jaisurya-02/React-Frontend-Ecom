import Cart from '../components/Cart';

const CartPage = ({ products, cart, onIncrement, onDecrement }) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Cart products={products} cart={cart} onIncrement={onIncrement} onDecrement={onDecrement} />
    </div>
  );
};

export default CartPage;
