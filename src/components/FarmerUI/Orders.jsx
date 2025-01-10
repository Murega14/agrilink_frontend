import React from 'react';
import { ArrowLeft, Package, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Card Components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="p-6 border-b border-gray-200">
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <h3 className="text-lg font-semibold text-gray-900">
    {children}
  </h3>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const Orders = () => {
  const navigate = useNavigate();

  const orders = [
    {
      id: 1,
      orderNumber: 'ORD-2025-001',
      date: '2025-01-08',
      customer: 'Fresh Mart Grocers',
      items: [
        { name: 'Organic Tomatoes', quantity: '50 kg', price: 750.00 },
        { name: 'Bell Peppers', quantity: '25 kg', price: 500.00 }
      ],
      status: 'Delivered',
      totalAmount: 1250.00,
      deliveryDate: '2025-01-10'
    },
    {
      id: 2,
      orderNumber: 'ORD-2025-002',
      date: '2025-01-07',
      customer: 'Green Foods Co.',
      items: [
        { name: 'Sweet Corn', quantity: '100 kg', price: 475.50 },
        { name: 'Green Beans', quantity: '40 kg', price: 400.00 }
      ],
      status: 'Processing',
      totalAmount: 875.50,
      deliveryDate: '2025-01-12'
    },
    {
      id: 3,
      orderNumber: 'ORD-2025-003',
      date: '2025-01-05',
      customer: 'Local Market Chain',
      items: [
        { name: 'Carrots', quantity: '75 kg', price: 600.00 },
        { name: 'Potatoes', quantity: '100 kg', price: 800.00 },
        { name: 'Onions', quantity: '70 kg', price: 700.00 }
      ],
      status: 'Pending',
      totalAmount: 2100.00,
      deliveryDate: '2025-01-15'
    }
  ];

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