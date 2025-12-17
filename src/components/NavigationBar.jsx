import { Link, useLocation, useNavigate } from 'react-router';

const NavigationBar = ({ isLoggedIn, role, onLogout }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    return (
        <div className="flex justify-between items-center p-4 bg-gray-700 text-white sticky top-0 z-10">
            <Link to="/" className="text-2xl font-bold hover:text-gray-300">E-Commerce</Link>

            <div className="space-x-4 text-lg font-medium">
                <Link className={`hover:underline ${isActive('/') ? 'underline' : ''}`} to="/">Home</Link>
                <Link className={`hover:underline ${isActive('/products') ? 'underline' : ''}`} to="/products">Products</Link>
                <Link className={`hover:underline ${isActive('/cart') ? 'underline' : ''}`} to="/cart">Cart</Link>
                <Link className={`hover:underline ${isActive('/orders') ? 'underline' : ''}`} to="/orders">Orders</Link>
                <Link className={`hover:underline ${isActive('/admin') ? 'underline' : ''}`} to="/admin">Admin</Link>
            </div>

            <div className="space-x-3 flex items-center">
                {isLoggedIn === 'true' ? (
                    <>
                        <span className="text-sm px-3 py-1 rounded-full bg-gray-600">{role === 'admin' ? 'Admin' : 'User'}</span>
                        <button className="bg-red-500 px-4 py-2 rounded hover:bg-red-600" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <Link className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600" to="/login">Login</Link>
                )}
            </div>
        </div>
    );
};

export default NavigationBar;