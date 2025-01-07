import React, { useEffect, useState } from "react";
import {
  LayoutDashboard, 
  ShoppingCart, 
  CreditCard, 
  Box, 
  Mail, 
  Scale,
  Menu,
  X,
  Plus
} from "lucide-react";
import axiosInstance from "../../utils/Axios";
import { useNavigate } from "react-router-dom";
import EditProduct from './EditProduct';
import AddProductModal from  './AddProduct';
import AgrilinkSpinner from "../Spinner";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    stats: {
      products_sold: { value: 0, change: 0 },
      current_month_value: { value: 0, change: 0 },
      pending_orders: { value: 0 },
      active_listings: { value: 0 }
    },
    recentOrders: [],
    availableProducts: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navItems = [
    { icon: LayoutDashboard, label: "Analytics", href: "/analytics" },
    { icon: ShoppingCart, label: "Orders", href: "/orders" },
    { icon: CreditCard, label: "Payments", href: "/payments" },
    { icon: Box, label: "Products", href: "/products" },
    { icon: Mail, label: "Newsletter", href: "/newsletter" },
    { icon: Scale, label: "Laws Explainer", href: "/laws" },
  ];
  const navigate = useNavigate();

  const handleProductUpdate = (updatedProduct) => {
    setDashboardData(prev => ({
      ...prev,
      availableProducts: prev.availableProducts.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    }));
  };

  const handleProductAdded = (newProduct) => {
    setDashboardData(prev => ({
      ...prev,
      availableProducts: [...prev.availableProducts, newProduct],
      stats: {
        ...prev.stats,
        active_listings: { value: prev.stats.active_listings.value + 1 }
      }
    }));
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login/farmer');
        return;
      }
    
      try {
        setLoading(true);
        setError(null);
    
        let newDashboardData = {
          stats: {
            products_sold: { value: 0, change: 0 },
            current_month_value: { value: 0, change: 0 },
            pending_orders: { value: 0 },
            active_listings: { value: 0 }
          },
          recentOrders: [],
          availableProducts: []
        };
    
        // Fetch stats
        try {
          const statsRes = await axiosInstance.get("/api/dashboard/stats");
          newDashboardData.stats = {
            products_sold: { 
              value: statsRes.data.products_sold,
              change: 0
            },
            current_month_value: { 
              value: statsRes.data.current_month_revenue,
              change: 0
            },
            pending_orders: { 
              value: statsRes.data.pending_orders 
            },
            active_listings: { 
              value: statsRes.data.active_listings 
            }
          };
        } catch (error) {
          console.error("Stats fetch error:", error.response?.data || error.message);
        }
    
        // Fetch orders
        try {
          const ordersRes = await axiosInstance.get("/api/dashboard/recent-orders");
          newDashboardData.recentOrders = ordersRes.data;
        } catch (error) {
          console.error("Orders fetch error:", error.response?.data || error.message);
        }
    
        // Fetch products
        try {
          const productsRes = await axiosInstance.get("/api/dashboard/available-products");
          newDashboardData.availableProducts = productsRes.data;
        } catch (error) {
          console.error("Products fetch error:", error.response?.data || error.message);
        }
    
        setDashboardData(newDashboardData);
    
      } catch (err) {
        console.error("Dashboard data fetch error:", {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status
        });
        
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login/farmer');
        } else {
          setError(err.response?.data?.message || "Failed to load dashboard data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (loading) return <div className="flex items-center justify-center h-screen">
    <AgrilinkSpinner size={150} color="#1F4D4D" />
</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  const { stats, recentOrders, availableProducts } = dashboardData;

  return (
    <div className="flex">
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        className="fixed top-2 left-4 z-50 md:hidden bg-green-600 text-white p-2 rounded-lg"
      >
        {isSidebarOpen ? <X /> : <Menu />}
      </button>

      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transition-transform duration-300
        md:relative md:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
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

      <div className="flex-1 bg-slate-50 p-6 min-h-screen">
        {isSidebarOpen && (
          <div 
            onClick={() => setIsSidebarOpen(false)} 
            className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard 
            title="Products Sold"
            value={stats.products_sold.value}
            change={stats.products_sold.change}
            changeLabel="vs LM"
            icon="📦"
          />
          <StatCard 
            title="Total Revenue"
            value={`Ksh ${stats.current_month_value.value}`}
            change={stats.current_month_value.change}
            changeLabel="vs LM"
            icon="💰"
          />
          <StatCard 
            title="Pending Orders"
            value={stats.pending_orders.value}
            change="Action Needed"
            icon="📥"
          />
          <StatCard 
            title="Active Listings"
            value={stats.active_listings.value}
            change="In Stock"
            icon="📑"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DataList title="Recent Orders" items={recentOrders} type="order" />
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Available Products</h2>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>
            <DataList 
              title="Available Products" 
              items={availableProducts} 
              type="product" 
              onItemsUpdate={handleProductUpdate}
            />
          </div>
        </div>

        <AddProductModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onProductAdded={handleProductAdded}
        />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, changeLabel, icon }) => (
  <div className="bg-white rounded-lg p-4 shadow">
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center text-green-600 mb-2">
          {icon}
        </div>
        <p className="text-gray-600">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm">
        {change} {changeLabel}
      </span>
    </div>
  </div>
);

const DataList = ({ title, items, type, onItemsUpdate }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleProductUpdate = (updatedProduct) => {
    const updatedItems = items.map(item => 
      item.id === updatedProduct.id ? updatedProduct : item
    );
    onItemsUpdate(updatedItems);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow h-full">
      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-gray-500">No data available.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">{type === "order" ? item.order_number : item.name}</p>
                <p className="text-sm text-gray-600">
                  {type === "order" ? item.time_ago : `Stock: ${item.amount_available} kg`}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {type === "order" ? `${item.currency} ${item.amount_available}` : `Ksh ${item.price_per_unit}/kg`}
                </p>
                {type === "product" && (
                  <button 
                    className="text-sm text-blue-600 hover:text-blue-700"
                    onClick={() => {
                      setSelectedProduct(item);
                      setIsEditModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {selectedProduct && (
        <EditProduct
          product={selectedProduct}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedProduct(null);
          }}
          onProductUpdate={handleProductUpdate}
        />
      )}
    </div>
  );
};

export default Dashboard;