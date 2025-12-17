import ProductForm from '../components/ProductForm';

const Admin = ({ onAddProduct }) => {
  return (
    <div className="bg-gray-50 min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
        <p className="text-gray-600 mb-6">Add products to the catalog using the form below.</p>
        <ProductForm onAddProduct={onAddProduct} />
      </div>
    </div>
  );
};

export default Admin;
