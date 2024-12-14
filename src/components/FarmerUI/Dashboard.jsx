import React from "react";

const Dashboard = () => {
  return (
    <div className="bg-slate-50 p-6 min-h-screen">
      {/* Add Product Button */}
      <div className="flex justify-end mb-6">
        <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 4v16m8-8H4"></path>
          </svg>
          Add New Product
        </button>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Products Sold */}
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center text-green-600 mb-2">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20 6H4m16 0a2 2 0 012 2v8a2 2 0 01-2 2m0-12a2 2 0 00-2-2M4 6a2 2 0 00-2 2v8a2 2 0 002 2m0 0a2 2 0 002-2m12 0a2 2 0 002-2m-16 0a2 2 0 002-2m12 0a2 2 0 00-2-2"></path>
                </svg>
              </div>
              <p className="text-gray-600">Products Sold</p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm">
              +0% vs LM
            </span>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center text-green-600 mb-2">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 3h18v6H3zm0 6h18v6H3zm0 6h18v6H3z"></path>
                </svg>
              </div>
              <p className="text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold">Ksh 0</p>
            </div>
            <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm">
              +0% vs LM
            </span>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center text-amber-600 mb-2">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 4v16m8-8H4"></path>
                </svg>
              </div>
              <p className="text-gray-600">Pending Orders</p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <span className="bg-amber-100 text-amber-600 px-2 py-1 rounded text-sm">
              Action Needed
            </span>
          </div>
        </div>

        {/* Active Listings */}
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center text-blue-600 mb-2">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 3h18v6H3zm0 6h18v6H3zm0 6h18v6H3z"></path>
                </svg>
              </div>
              <p className="text-gray-600">Active Listings</p>
              <p className="text-2xl font-bold">5</p>
            </div>
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">
              In Stock
            </span>
          </div>
        </div>
      </div>

      {/* Recent Orders and Available Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recent Orders */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">Order #12345</p>
                <p className="text-sm text-gray-600">2 hours ago</p>
              </div>
              <div className="text-right">
                <p className="font-medium">Ksh 123.45</p>
                <span className="inline-block px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                  Processing
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Available Products */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Available Products</h2>
            <button className="text-sm text-green-600 hover:text-green-700">
              View All
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">Organic Product</p>
                <p className="text-sm text-gray-600">Stock: 50 kg</p>
              </div>
              <div className="text-right">
                <p className="font-medium">Ksh 50/kg</p>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
