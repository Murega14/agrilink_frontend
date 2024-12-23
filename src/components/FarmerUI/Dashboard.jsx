import React, { useEffect, useState } from "react";
import {
  LayoutDashboard, 
  ShoppingCart, 
  CreditCard, 
  Box, 
  Mail, 
  Scale,
  Menu,
  X
} from "lucide-react";
import axios from "axios";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: "Analytics", href: "/analytics" },
    { icon: ShoppingCart, label: "Orders", href: "/orders" },
    { icon: CreditCard, label: "Payments", href: "/payments" },
    { icon: Box, label: "Products", href: "/products" },
    { icon: Mail, label: "Newsletter", href: "/newsletter" },
    { icon: Scale, label: "Laws Explainer", href: "/laws" }
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [dashboardData, setDashboardData] = useState({
    stats: null,
    recentOrders:[],
    availableProducts: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // fetch all the products in parrarel
        const [summaryRes, ordersRes, productsRes] = await Promise.all([
          axios.get('https://agrilink-1-870p.onrender.com/api/dashboard/stats'),
          axios.get('https://agrilink-1-870p.onrender.com/api/dashboard/recent-orders'),
          axios.get('https://agrilink-1-870p.onrender.com/api/dashboard/available-products')

        ]);

        const [summaryData, ordersData, productsData] = await Promise.all([
          summaryRes.json(),
          ordersRes.json(),
          productsRes.json()
        ]);

        setDashboardData({
          stats: summaryData.dashboard_stats,
          recentOrders: ordersData.recent_orders,
          availableProducts: productsData.available_products
        });
      } catch (err) {
        setError('Failed to load Dashboard Data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!dashboardData.stats) return <div>No Data</div>;


  return (
    <div className="flex">
      {/* Mobile & Tablet Hamburger Button */}
      <button 
        onClick={toggleSidebar} 
        className="fixed top-2 left-4 z-50 md:hidden bg-green-600 text-white p-2 rounded-lg"
      >
        {isSidebarOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar Navigation */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transition-transform duration-300
        md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-green-600">AgriLink</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <a 
                  href={item.href} 
                  className="flex items-center p-2 hover:bg-green-50 rounded-lg transition-colors group"
                >
                  <item.icon 
                    className="w-5 h-5 mr-3 text-green-600 group-hover:text-green-700" 
                  />
                  <span className="text-gray-700 group-hover:text-green-700">
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-slate-50 p-6 min-h-screen">
        {isSidebarOpen && (
          <div 
            onClick={toggleSidebar} 
            className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          />
        )}

        {/* Existing Dashboard Content */}
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
            <a href="/products/add">Add New Product</a>
          </button>
        </div>

        
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
                <p className="text-2xl font-bold">{dashboardData.stats.products_sold.value}</p>
              </div>
              <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm">
              {dashboardData.stats.products_sold.change > 0 ? '+' : ''}
                {dashboardData.stats.products_sold.change}% vs LM
              </span>
            </div>
          </div>

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
              <p className="text-2xl font-bold">Ksh {dashboardData.stats.current_month_value.value}</p>
            </div>
            <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm">
            {dashboardData.stats.current_month_value.change > 0 ? '+' : ''}
            {dashboardData.stats.current_month_value.change}% vs LM            </span>
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
              <p className="text-2xl font-bold">{dashboardData.stats.pending_orders.value}</p>
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
              <p className="text-2xl font-bold">{dashboardData.stats.active_listings.value}</p>
            </div>
            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">
              In Stock
            </span>
          </div>
        </div>
      </div>

      {/* Recent Orders and Available Products */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        <div className="space-y-4">
          {dashboardData.recentOrders.map((order, index) => (
            <div key={index} className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">{order.order_number}</p>
                <p className="text-sm text-gray-600">{order.time_ago}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{order.currency} {order.amount}</p>
                <span className="inline-block px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                  {order.status}
                </span>
              </div>
            </div>
          ))}
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
            {dashboardData.availableProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-600">Stock: {product.amount} kg</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">Ksh {product.price}/kg</p>
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;