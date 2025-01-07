import React, { useState, useEffect, useCallback } from 'react';
import { PlusCircle, Pencil } from 'lucide-react';
import axiosInstance from '../../utils/Axios';
import { useNavigate } from 'react-router-dom';
import AgrilinkSpinner from '../Spinner';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const ProductForm = ({ product, onSubmit, title }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price_per_unit: product?.price_per_unit || '',
    amount_available: product?.amount_available || '',
    category: product?.category || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Price per Unit (KSH)</label>
        <input
          type="number"
          name="price_per_unit"
          value={formData.price_per_unit}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
          min="0"
          step="0.01"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Amount Available (KGs)</label>
        <input
          type="number"
          name="amount_available"
          value={formData.amount_available}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
          min="0"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select a category</option>
          <option value="vegetables">Vegetable</option>
          <option value="fruits">Fruit</option>
          <option value="grains">Grains</option>
          <option value="dairy">Dairy</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
      >
        {title}
      </button>
    </form>
  );
};

const ProductCard = ({ product, onEdit }) => {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <button
          onClick={() => onEdit(product)}
          className="text-gray-500 hover:text-gray-700"
        >
          <Pencil className="w-4 h-4" />
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-2">{product.description}</p>
      <div className="space-y-1">
        <p className="text-sm">
          <span className="font-medium">Price:</span> Ksh {product.price_per_unit}
        </p>
        <p className="text-sm">
          <span className="font-medium">Available:</span> {product.amount_available} kgs
        </p>
        <p className="text-sm">
          <span className="font-medium">Category:</span> {product.category}
        </p>
      </div>
    </div>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login/farmer');
        return;
      }

      const response = await axiosInstance.get('/api/dashboard/available-products');
      setProducts(response.data);
    } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login/farmer');
        } else {
          setError(err.data?.data?.message || 'Failed to fetch products ooppss');
        }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login/farmer');
      return;
    }
    fetchProducts();
  }, [fetchProducts, navigate]);

  const handleAddProduct = async (formData) => {
    try {

      const response = await axiosInstance.post('/api/v1/products/add', {
        name: formData.name,
        description: formData.description,
        price_per_unit: parseFloat(formData.price_per_unit),
        amount_available: parseInt(formData.amount_available),
        category: formData.category
      });

      if (response.status === 201) {
        await fetchProducts();
        setIsModalOpen(false);
        setSuccessMessage('Product added successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login/farmer');
      } else {
        setError(err.response?.data?.message || 'Failed to add product');
      }
    }
  };

  const handleEditProduct = async (formData) => {
    try {
      const response = await axiosInstance.put(`/api/v1/products/${editingProduct.id}`, {
        name: formData.name,
        description: formData.description,
        price_per_unit: parseFloat(formData.price_per_unit),
        amount_available: parseInt(formData.amount_available),
        category: formData.category
      });

      if (response.status === 200) {
        await fetchProducts();
        setEditingProduct(null);
        setSuccessMessage('Product updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product');
      if (err.response?.status === 401) {
        navigate('/login/farmer');
      }
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">
    <AgrilinkSpinner size={150} color="#1F4D4D" />
    </div>;
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Products</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          <PlusCircle className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {error && (
        <div className="mb-4 text-center text-red-600 p-4 bg-red-50 rounded">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 text-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          {successMessage}
        </div>
      )}
  
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={setEditingProduct}
            />
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No products found. Add your first product!</p>
        </div>
      )}
  
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Product"
      >
        <ProductForm
          onSubmit={handleAddProduct}
          title="Add Product"
        />
      </Modal>
  
      <Modal
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        title="Edit Product"
      >
        <ProductForm
          product={editingProduct}
          onSubmit={handleEditProduct}
          title="Update Product"
        />
      </Modal>
    </div>
  );
};

export default Products;