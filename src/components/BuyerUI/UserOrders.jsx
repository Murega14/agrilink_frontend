import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Package, 
  Calendar, 
  ArrowLeft, 
  ShoppingCart, 
  User, 
  Loader2,
  AlertCircle,
  RefreshCcw
} from "lucide-react";
import axiosInstance from "../../utils/Axios";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/orders");
        setOrders(response.data.orders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders. Please try again.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(
    (order) => filterStatus === "all" || order.status === filterStatus
  );

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 text-green-600 animate-spin" />
          <p className="text-green-800">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-lg mx-auto mt-20 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center p-6">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <p className="text-red-600 text-xl mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
          >
            <RefreshCcw size={16} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-green-800 mb-2">Your Orders</h1>
            <p className="text-gray-600">Track and manage your marketplace orders</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button
              onClick={() => navigate("/marketplace")}
              className="flex items-center gap-2 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
            >
              <ArrowLeft size={16} />
              Back to Marketplace
            </button>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <div className="flex flex-col items-center">
              <ShoppingCart className="h-12 w-12 text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">No Orders Yet</h2>
              <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
              <button
                onClick={() => navigate("/marketplace")}
                className="flex items-center gap-2 bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition duration-300"
              >
                <ShoppingCart size={16} />
                Browse Marketplace
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="bg-green-50 p-6">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                      <h2 className="text-xl text-green-800 font-bold flex items-center gap-2">
                        <Package size={20} />
                        Order #{order.id}
                      </h2>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Calendar size={16} />
                        Placed on {new Date(order.order_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      <p className="font-semibold text-green-800 flex items-center gap-2">
                        Ksh {order.total_amount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="text-green-600" size={20} />
                      <div>
                        <p className="text-sm text-gray-600">Delivery Date</p>
                        <p className="font-medium">
                          {order.delivery_date
                            ? new Date(order.delivery_date).toLocaleDateString()
                            : "Pending"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-green-800 flex items-center gap-2">
                      <Package size={20} />
                      Order Items
                    </h3>
                    <div className="grid gap-3">
                      {order.items.map((item) => (
                        <div
                          key={item.product_id}
                          className="flex flex-col sm:flex-row justify-between gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        >
                          <div>
                            <h4 className="font-medium text-green-800">
                              {item.product_name}
                            </h4>
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <User size={14} />
                              Farmer: {item.farmer_name}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">
                              {item.quantity} x Ksh {item.price_per_unit.toFixed(2)}
                            </p>
                            <p className="text-sm text-green-700 font-medium flex items-center justify-end gap-2">
                              Subtotal: Ksh {item.subtotal.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrders;