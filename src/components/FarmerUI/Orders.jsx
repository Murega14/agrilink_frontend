import React, { useEffect, useState } from 'react';
import { ArrowLeft, Package, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/Axios';
import AgrilinkSpinner from '../Spinner';

// Card Components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow ${className}`}>
    {children}
  </div>
);



const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get('/api/v1/farmer/orders');
        const transformedOrders = response.data.orders.map(order => ({
          id: order.order_id,
          orderNumber: `ORD-${order.order_id}`,
          date: new Date(order.order_date).toISOString().split('T')[0],
          customer: order.buyer_name,
          items: order.items.map(item => ({
            name: item.product_name,
            quantity: `${item.quantity} kg`,
            price: item.price_per_unit
          })),
          status: order.status,
          totalAmount: order.subtotal,
          deliveryDate: order.delivery_date || 'Pending'
        }));
        setOrders(transformedOrders);
        setLoading(false);
      } catch (err){
        setError(err.response?.data?.error || 'Failed to fetch orders');
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-screen">
  <AgrilinkSpinner size={150} color="#1F4D4D" />
  </div>;
  if (error) return <div>Error: {error}</div>;

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      default:
        return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Back button */}
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        {/* Page Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <div className="flex space-x-4">
            <select className="border rounded-md px-3 py-2 text-sm">
              <option>All Orders</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Delivered</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  {/* Order Header */}
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="font-medium text-lg">{order.orderNumber}</p>
                      <p className="text-sm text-gray-500">
                        Ordered on {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="text-sm">
                    <p className="font-medium">Customer</p>
                    <p className="text-gray-600">{order.customer}</p>
                  </div>

                  {/* Order Items */}
                  <div className="border rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Item</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Quantity</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">Price</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {order.items.map((item, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3 text-sm">{item.name}</td>
                            <td className="px-4 py-3 text-sm">{item.quantity}</td>
                            <td className="px-4 py-3 text-sm text-right">Ksh {item.price.toLocaleString()}</td>
                          </tr>
                        ))}
                        <tr className="bg-gray-50">
                          <td colSpan="2" className="px-4 py-3 text-sm font-medium">Total</td>
                          <td className="px-4 py-3 text-sm font-medium text-right">KSh {order.totalAmount.toLocaleString()}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Delivery Info */}
                  <div className="text-sm">
                    <p className="font-medium">Expected Delivery</p>
                    <p className="text-gray-600">{new Date(order.deliveryDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;