import React from 'react';
import { DollarSign, Calendar, TrendingUp, Package, ArrowLeft } from 'lucide-react';
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

const Payments = () => {
  // Sample data untll i integrate the backend
  const recentPayments = [
    {
      id: 1,
      date: '2025-01-08',
      amount: 1250.00,
      items: ['Organic Tomatoes', 'Bell Peppers'],
      status: 'Completed',
      orderNumber: 'ORD-2025-001'
    },
    {
      id: 2,
      date: '2025-01-07',
      amount: 875.50,
      items: ['Sweet Corn', 'Green Beans'],
      status: 'Completed',
      orderNumber: 'ORD-2025-002'
    },
    {
      id: 3,
      date: '2025-01-05',
      amount: 2100.00,
      items: ['Carrots', 'Potatoes', 'Onions'],
      status: 'Completed',
      orderNumber: 'ORD-2025-003'
    }
  ];

  const totalEarnings = recentPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Earnings</p>
                <p className="text-2xl font-bold">Ksh {totalEarnings.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-full">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Orders</p>
                <p className="text-2xl font-bold">{recentPayments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-100 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg. Order Value</p>
                <p className="text-2xl font-bold">
                  Ksh {(totalEarnings / recentPayments.length).toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-yellow-100 rounded-full">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Payment</p>
                <p className="text-2xl font-bold">
                  {new Date(recentPayments[0].date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Order #</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Items</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Amount</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentPayments.map((payment) => (
                  <tr key={payment.id} className="border-b">
                    <td className="px-4 py-4 text-sm">
                      {new Date(payment.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 text-sm font-medium">{payment.orderNumber}</td>
                    <td className="px-4 py-4 text-sm">{payment.items.join(', ')}</td>
                    <td className="px-4 py-4 text-sm text-right">
                      Ksh {payment.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;