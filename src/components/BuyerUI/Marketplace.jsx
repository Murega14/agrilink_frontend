import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  Filter } from 'lucide-react';
import ProductCard from './Productcard';
import Navbar from'./Navbar';

// Main Marketplace Component
const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: ''
  });

  const fetchProducts = async (currentPage) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://agrilink-1-870p.onrender.com/products', {
        params: {
          page: currentPage,
          per_page: 12
        }
      });
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productToRemove) => {
    setCart(cart.filter(product => product.name !== productToRemove.name));
  };

  const filteredProducts = products.filter(product => {
    const categoryMatch = !filters.category || 
      product.category.toLowerCase() === filters.category.toLowerCase();
    const minPriceMatch = !filters.minPrice || product.price >= parseFloat(filters.minPrice);
    const maxPriceMatch = !filters.maxPrice || product.price <= parseFloat(filters.maxPrice);
    return categoryMatch && minPriceMatch && maxPriceMatch;
  });

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex">
          {/* Filters */}
          <div className="w-1/4 pr-8">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Filter className="mr-2 text-green-600" /> Filters
              </h2>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Category</label>
                <select 
                  className="w-full border rounded-md p-2"
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                >
                  <option value="">All Categories</option>
                  <option value="Vegetables">Vegetable</option>
                  <option value="Fruits">Fruit</option>
                  <option value="Grains">Grains</option>
                </select>
              </div>
              
              <div className="flex space-x-2 mb-4">
                <input 
                  type="number" 
                  placeholder="Min Price" 
                  className="w-1/2 border rounded-md p-2"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                />
                <input 
                  type="number" 
                  placeholder="Max Price" 
                  className="w-1/2 border rounded-md p-2"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="w-3/4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600"></div>
              </div>
            ) : error ? (
              <div className="text-red-600 text-center text-xl">
                {error}
              </div>
            ) : (
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product, index) => (
                  <ProductCard 
                    key={index} 
                    product={product} 
                    onAddToCart={addToCart} 
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-8 space-x-4">
              <button 
                onClick={() => setPage(page - 1)} 
                disabled={page === 1}
                className="bg-green-600 text-white px-4 py-2 rounded-full disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-gray-700 self-center">Page {page}</span>
              <button 
                onClick={() => setPage(page + 1)}
                className="bg-green-600 text-white px-4 py-2 rounded-full"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 AgriLink - Connecting Farmers to HouseHolds</p>
        </div>
      </footer>
    </div>
  );
};

export default Marketplace;