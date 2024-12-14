import React, { useState } from "react";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState("default");

  // Handle cart item update
  const handleCartClick = () => {
    setCartCount(cartCount + 1);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle search submit
  const handleSearchSubmit = () => {
    console.log("Search Query:", searchQuery); // Placeholder for search logic
  };

  // Handle sorting option change
  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
    console.log("Sorting by:", event.target.value); // Placeholder for sort logic
  };

  return (
    <nav className="bg-green-800 text-white">
      <div className="container mx-auto px-4 py-3">
        {/* Upper Nav Section */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Logo and Brand */}
          <div className="flex items-center justify-between lg:w-auto w-full">
            <div className="flex items-center space-x-4">
              <svg
                className="w-8 h-8"
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

            {/* Mobile Icons */}
            <div className="flex items-center space-x-4 lg:hidden">
              <button className="hover:text-green-200 transition-colors duration-200">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>
              <button
                id="cartButton"
                className="hover:text-green-200 transition-colors duration-200 relative"
                onClick={handleCartClick} // Handle cart click
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span
                  id="cartCount"
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {cartCount}
                </span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-grow">
            <div className="relative">
              <input
                type="text"
                id="search-bar"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange} // Handle input change
                className="w-full p-2 pl-4 pr-12 text-gray-800 border border-green-200 rounded-lg shadow focus:outline-none focus:border-green-400"
              />
              <button
                className="absolute right-0 top-0 h-full px-4 text-white bg-green-600 rounded-r-lg hover:bg-green-700 transition-colors duration-200"
                onClick={handleSearchSubmit} // Handle search button click
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

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <select
              id="sortSelect"
              className="bg-green-700 text-white px-4 py-2 rounded-lg border border-green-600 focus:outline-none focus:border-green-500 hover:bg-green-600 transition-colors duration-200"
              value={selectedSort}
              onChange={handleSortChange} // Handle sort option change
            >
              <option value="default">Sort by</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
            <button className="hover:text-green-200 transition-colors duration-200">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
            <button
              id="cartButton-desktop"
              className="hover:text-green-200 transition-colors duration-200 relative"
              onClick={handleCartClick} // Handle cart click
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span
                id="cartCount-desktop"
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
              >
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
