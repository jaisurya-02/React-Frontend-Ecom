import OrderSummary from "./OrderSummary";

const Cart = ({ products, cart, onIncrement, onDecrement }) => {
    const cartItems = [];

    products.forEach((product) => {
        const count = cart[product.id];
        if (count && count > 0) {
            cartItems.push({
                id: product.id,
                name: product.name,
                price: product.sellingPrice,
                image: product.image,
                count: count,
                itemTotal: product.sellingPrice * count
            });
        }
    });

    return (
        <div className="flex gap-8 max-w-7xl mx-auto mt-10 mb-10 px-4">
            {/* Cart Items - 3/4 width */}
            <div className="w-3/4">
                <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
                
                {cartItems.length === 0 ? (
                    <div className="bg-gray-100 p-8 rounded-lg text-center">
                        <p className="text-xl text-gray-600">Your cart is empty</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4 bg-white p-4 rounded-lg shadow-md border border-gray-200">
                                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                                
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                                    <p className="text-gray-600 mb-3">Price: Rs.{item.price}</p>
                                    
                                    <div className="flex items-center gap-3">
                                        <button
                                            className="px-4 py-2 border-2 border-gray-300 rounded-md hover:bg-gray-100 font-semibold"
                                            onClick={() => onDecrement(item.id)}
                                        >
                                            -
                                        </button>
                                        <span className="min-w-[40px] text-center font-semibold text-lg">{item.count}</span>
                                        <button
                                            className="px-4 py-2 border-2 border-gray-300 rounded-md hover:bg-gray-100 font-semibold"
                                            onClick={() => onIncrement(item.id)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="text-2xl font-bold text-green-600 mb-4">Rs.{item.itemTotal}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Order Summary - 1/4 width */}
            <div className="w-1/4">
                <OrderSummary products={products} cart={cart} />
            </div>
        </div>
    );
};

export default Cart;
