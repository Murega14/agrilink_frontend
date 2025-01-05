import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Filter, Search, X } from 'lucide-react';
import ProductCard from './Productcard';
import Navbar from './Navbar';
import { CartContext } from '../context/Cart'
import { ToastContainer, toast } from 'react-toastify';
import axiosInstance from '../../utils/Axios';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    search: ''
  });
  const { addToCart } = useContext(CartContext) || {};
  const [isFilterMobileOpen, setIsFilterMobileOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);


  // Use useCallback to memoize fetchProducts
  const fetchProducts = useCallback(async (currentPage, query = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get('/api/v1/products', {
        params: {
          page: currentPage,
          per_page: screenWidth < 640 ? 6 : 12,
          search: query
        }
      });
      
      // Update products based on search
      if (query) {
        setSearchResults(response.data);
        setIsSearching(true);
      } else {
        setProducts(response.data);
        setIsSearching(false);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products. Please try again.');
      setLoading(false);
    }
  }, [screenWidth]);

  const handleGlobalSearch = (query) => {
    setGlobalSearchQuery(query);
    setPage(1);
    fetchProducts(1, query);
  };

  // Reset search and show all products
  const handleClearSearch = () => {
    setGlobalSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
    fetchProducts(1);
  };


  const handleAddToCart = (product) => {
    try {
      addToCart(product);
      toast.success(`${product.name} added to cart!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    } catch (error) {
      toast.error('Failed to add product to cart', {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  // Responsive screen width tracking
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Add dependency for fetchProducts
  useEffect(() => {
    if (globalSearchQuery) {
      fetchProducts(page, globalSearchQuery);
    } else {
      fetchProducts(page);
    }
  }, [page, fetchProducts, globalSearchQuery]);

   // Determine which products to use for filtering
  const productsToFilter = isSearching ? searchResults : products;

  // Apply filters to the current set of products
  const filteredProducts = productsToFilter.filter(product => {
    const categoryMatch = !filters.category || 
      product.category === filters.category;
    const minPriceMatch = !filters.minPrice || product.price >= parseFloat(filters.minPrice);
    const maxPriceMatch = !filters.maxPrice || product.price <= parseFloat(filters.maxPrice);
    const searchMatch = !filters.search || 
      product.name.toLowerCase().includes(filters.search.toLowerCase());
    return categoryMatch && minPriceMatch && maxPriceMatch && searchMatch;
  });

  // Mobile Filter Modal
  const FilterModal = () => (
    <div 
      className="fixed inset-0 z-50 bg-white overflow-y-auto animate-slide-up"
      style={{ 
        animationDuration: '0.3s',
        transform: isFilterMobileOpen ? 'translateY(0)' : 'translateY(100%)'
      }}
    >

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-green-700">Filter Products</h2>
          <button 
            onClick={() => setIsFilterMobileOpen(false)}
            className="text-red-500"
          >
            <X size={24} />
          </button>
        </div>

        {/* Search Input */}
        <div className="mb-4 relative">
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full border rounded-full p-2 pl-10 text-sm"
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
          />
          <Search 
            className="absolute left-3 top-3 text-gray-400" 
            size={18} 
          />
        </div>

        {/* Category Filter */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 text-sm">Category</label>
          <select 
            className="w-full border rounded-md p-2 text-sm"
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
          >
            <option value="">All Categories</option>
            <option value="Vegetables">Vegetable</option>
            <option value="Fruits">Fruit</option>
            <option value="Grains">Grain</option>
          </select>
        </div>
        
        {/* Price Filters */}
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 text-sm">Min Price</label>
            <input 
              type="number" 
              placeholder="Min Price" 
              className="w-full border rounded-md p-2 text-sm"
              value={filters.minPrice}
              onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 text-sm">Max Price</label>
            <input 
              type="number" 
              placeholder="Max Price" 
              className="w-full border rounded-md p-2 text-sm"
              value={filters.maxPrice}
              onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
            />
          </div>
        </div>

        {/* Apply Filters Button */}
        <button 
          onClick={() => setIsFilterMobileOpen(false)}
          className="w-full mt-4 bg-green-600 text-white p-2 rounded-full"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar onSearch={handleGlobalSearch} />
      <ToastContainer />
      {isSearching && (
        <div className="container mx-auto px-4 py-2 flex justify-between items-center bg-green-100">
          <p className="text-green-800">
            Search results for "{globalSearchQuery}"
          </p>
          <button 
            onClick={handleClearSearch}
            className="text-green-700 hover:text-green-900"
          >
            Clear Search
          </button>
        </div>
      )}
      <main className="container mx-auto px-4 py-4 md:py-8">
        {/* Mobile Filter Trigger */}
        <div className="md:hidden mb-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-green-800">Marketplace</h1>
          <button 
            onClick={() => setIsFilterMobileOpen(true)}
            className="flex items-center bg-green-100 p-2 rounded-full"
          >
            <Filter className="text-green-600 mr-2" size={20} />
            <span className="text-sm">Filters</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          {/* Desktop Filters */}
          <div className="hidden md:block md:w-1/4 bg-white rounded-lg p-4 shadow-md">

            <h2 className="text-lg font-bold mb-3 text-green-700">Filters</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2 text-sm">Category</label>
                <select 
                  className="w-full border rounded-md p-2 text-sm"
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                >
                  <option value="">All Categories</option>
                  <option value="Vegetables">Vegetable</option>
                  <option value="Fruits">Fruit</option>
                  <option value="Grains">Grains</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1 text-sm">Min Price</label>
                <input 
                  type="number" 
                  placeholder="Min Price" 
                  className="w-full border rounded-md p-2 text-sm"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1 text-sm">Max Price</label>
                <input 
                  type="number" 
                  placeholder="Max Price" 
                  className="w-full border rounded-md p-2 text-sm"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="w-full md:w-3/4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600"></div>
              </div>
            ) : error ? (
              <div className="text-red-600 text-center text-xl">
                {error}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-10">
                No products found matching your filters.
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-6 space-x-4">
              <button 
                onClick={() => setPage(page - 1)} 
                disabled={page === 1}
                className="bg-green-600 text-white px-4 py-2 rounded-full disabled:opacity-50 text-sm"
              >
                Previous
              </button>
              <span className="text-gray-700 self-center text-sm">Page {page}</span>
              <button 
                onClick={() => setPage(page + 1)}
                className="bg-green-600 text-white px-4 py-2 rounded-full text-sm"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filter Modal */}
      {isFilterMobileOpen && <FilterModal />}

      <footer className="bg-green-800 text-white py-4 md:py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm md:text-base">&copy; 2024 AgriLink - Connecting Farmers to Households</p>
        </div>
      </footer>
    </div>
  );
};

export default Marketplace;