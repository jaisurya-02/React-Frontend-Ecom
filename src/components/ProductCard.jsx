import { toast } from 'react-toastify';

const ProductCard = (props) => {
    const { id, name, sellingPrice, originalPrice, image, onAddToCart } = props;

    const handleAddToCart = (productId) => {
        onAddToCart(productId);
        toast.success('Added to cart!');
    };

    return (
        <div className="p-4 flex flex-col rounded-xl shadow-lg shadow-gray-400 border-2 border-orange-200 hover:scale-105 transition-transform duration-300">
            <img src={image} alt={name} className="w-[200px] h-[200px] mx-auto rounded-md shadow-lg shadow-gray-400 object-cover mb-4" />
            <h2 className="text-xl font-bold mb-2">{name}</h2>
            <p className="text-xl text-green-600 font-semibold">Rs.{sellingPrice}
                <span className="text-sm text-gray-500 line-through ml-2">Rs.{originalPrice}</span>
            </p>

            <button
                className="border-2 px-4 py-2 rounded-md mt-4 hover:bg-blue-600 hover:text-white"
                onClick={() => handleAddToCart(id)}
            >
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;