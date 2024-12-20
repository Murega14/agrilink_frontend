import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/Cart";
import { ShoppingCart, User, Menu } from "lucide-react";

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const uniqueItemCount = new Set(cartItems.map(item => item.id)).size;
  


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      // Always perform search if query is not empty
      if (onSearch) {
        onSearch(searchQuery.trim());
      }
      navigate('/marketplace');
    }
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleProfileClick = () => {
    navigate('/user');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-green-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <svg
              className="w-8 h-8 text-green-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="font-bold text-xl">AgriLink</span>
          </div>

          {/* Search Bar (Desktop & Mobile) */}
          <div className="flex-grow mx-4 max-w-xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange} onKeyPress={handleKeyPress}
                className="w-full p-2 pl-4 pr-12 text-gray-800 border border-green-200 rounded-lg shadow focus:outline-none focus:border-green-400"
              />
              <button
                onClick={handleSearchSubmit}
                className="absolute right-0 top-0 h-full px-4 text-white bg-green-600 rounded-r-lg hover:bg-green-700 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button 
              className="hover:text-green-200 transition-colors duration-200 hidden md:block"
              aria-label="User Profile"
              onClick={handleProfileClick}
            >
              <User className="w-6 h-6" />
            </button>

            <button
              className="hover:text-green-200 transition-colors duration-200 relative"
              onClick={handleCartClick}
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {uniqueItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {uniqueItemCount}
                </span>
              )}
            </button>


            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle Mobile Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Optional) */}
      {isMenuOpen && (
        <div className="md:hidden bg-green-700 py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-2">
              <button 
                className="text-left py-2 hover:bg-green-600 transition-colors"
                onClick={handleProfileClick}
              >
                Profile
              </button>
              <button 
                className="text-left py-2 hover:bg-green-600 transition-colors"
                onClick={handleCartClick}
              >
                Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)})
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;