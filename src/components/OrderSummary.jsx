import { useNavigate } from 'react-router';

const OrderSummary = ({ products, cart }) => {
    const navigate = useNavigate();

    const cartItems = [];
    let total = 0;

    products.forEach((product) => {
        const count = cart[product.id];
        if (count && count > 0) {
            const itemTotal = product.sellingPrice * count;
            cartItems.push({
                id: product.id,
                name: product.name,
                price: product.sellingPrice,
                count: count,
                itemTotal: itemTotal
            });
            total += itemTotal;
        }
    });

    return (
        <div className="w-[300px] bg-white rounded-lg shadow-lg p-6 h-fit">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            
            {cartItems.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No items in cart</p>
            ) : (
                <>
                    <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
                        {cartItems.map((item) => (
                            <div key={item.id} className="pb-3">
                                <div className="flex justify-between mb-2">
                                    <p className="font-semibold text-sm">{item.name}</p>
                                    <p className="text-sm font-semibold">{item.count}x</p>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <p className="text-sm">Rs.{item.price} × {item.count}</p>
                                    <p className="text-sm font-semibold text-green-600">Rs.{item.itemTotal}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t-2 pt-4 mt-4">
                        <div className="flex justify-between mb-4">
                            <p className="text-lg font-bold">Total:</p>
                            <p className="text-2xl font-bold text-green-600">Rs.{total}</p>
                        </div>
                        <button 
                            onClick={() => navigate('/payment')}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default OrderSummary;
