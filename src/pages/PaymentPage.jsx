import { useNavigate } from 'react-router';
import { useState } from 'react';
import { toast } from 'react-toastify';

const PaymentPage = ({ products, cart, onClearCart }) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
  });

  // Calculate cart items and total
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
        itemTotal: itemTotal,
      });
      total += itemTotal;
    }
  });

  // If cart is empty, redirect to products page
  if (cartItems.length === 0) {
    navigate('/products');
    return null;
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    // Basic validation
    if (paymentMethod === 'card') {
      if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
        toast.error('Please fill all card details');
        return;
      }
    } else if (paymentMethod === 'upi') {
      if (!formData.upiId) {
        toast.error('Please enter UPI ID');
        return;
      }
    }

    // Simulate payment processing
    toast.info('Processing payment...');
    
    // In a real application, you would call your payment API here
    setTimeout(() => {
      toast.success('Payment successful! Your order has been placed.');
      onClearCart();
      navigate('/orders');
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Payment</h1>

      <div className="flex gap-8">
        {/* Payment Form */}
        <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6">Select Payment Method</h2>

          {/* Payment Method Selection */}
          <div className="flex gap-4 mb-6">
            <button
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition ${
                paymentMethod === 'card'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setPaymentMethod('card')}
            >
              Card Payment
            </button>
            <button
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition ${
                paymentMethod === 'upi'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setPaymentMethod('upi')}
            >
              UPI Payment
            </button>
            <button
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition ${
                paymentMethod === 'cod'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={() => setPaymentMethod('cod')}
            >
              Cash on Delivery
            </button>
          </div>

          {/* Payment Forms */}
          <form onSubmit={handlePayment}>
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength="19"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                  <input
                    type="text"
                    name="cardName"
                    placeholder="John Doe"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-2">Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      maxLength="5"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-2">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      maxLength="3"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div>
                <label className="block text-sm font-medium mb-2">UPI ID</label>
                <input
                  type="text"
                  name="upiId"
                  placeholder="yourname@upi"
                  value={formData.upiId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
                <p className="text-yellow-800">
                  <strong>Cash on Delivery:</strong> You can pay in cash when your order is delivered to
                  your doorstep.
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Complete Payment - Rs.{total}
            </button>
          </form>

          <button
            onClick={() => navigate('/cart')}
            className="w-full mt-4 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Back to Cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="w-1/3 bg-white rounded-lg shadow-lg p-6 h-fit">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item.id} className="pb-3 border-b">
                <div className="flex justify-between mb-2">
                  <p className="font-semibold text-sm">{item.name}</p>
                  <p className="text-sm font-semibold">{item.count}x</p>
                </div>
                <div className="flex justify-between text-gray-600">
                  <p className="text-sm">
                    Rs.{item.price} × {item.count}
                  </p>
                  <p className="text-sm font-semibold text-green-600">Rs.{item.itemTotal}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t-2 pt-4">
            <div className="flex justify-between mb-2">
              <p className="text-gray-600">Subtotal:</p>
              <p className="font-semibold">Rs.{total}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p className="text-gray-600">Shipping:</p>
              <p className="font-semibold text-green-600">Free</p>
            </div>
            <div className="flex justify-between pt-2 border-t">
              <p className="text-lg font-bold">Total:</p>
              <p className="text-2xl font-bold text-green-600">Rs.{total}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
