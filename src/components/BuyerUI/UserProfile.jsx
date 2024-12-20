import React, { useState } from 'react';
import { MapPin, Lock, Package, Clock, Mail, Phone, User } from 'lucide-react';

const UserProfile = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showLocationForm, setShowLocationForm] = useState(false);

  // Sample data - in a real app, this would come from your backend
  const user = {
    name: "Bravin Murega",
    email: "tedmurega@gmail.com",
    phone: "0741644151",
    location: "123 Farm Road, Rural County",
  };

  const pendingOrders = [
    { id: 1, date: "2024-12-18", items: ["Onions (50kg)", "Tomatoes (10kg)"], status: "Processing" },
    { id: 2, date: "2024-12-19", items: ["Cow Fat (5L)"], status: "Shipped" },
  ];

  const pastOrders = [
    { id: 3, date: "2024-12-01", items: ["Apples(1kg)", "Fruit"], status: "Delivered" },
    { id: 4, date: "2024-11-25", items: ["Strawberries (25units)"], status: "Delivered" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Contact Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Contact Information</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-gray-500" />
            <span>{user.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="w-5 h-5 text-gray-500" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-5 h-5 text-gray-500" />
            <span>{user.phone}</span>
          </div>
        </div>
      </div>

      {/* Location Settings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Location</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-gray-500" />
            <span>{user.location}</span>
          </div>
          {!showLocationForm ? (
            <button 
              onClick={() => setShowLocationForm(true)}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Update Location
            </button>
          ) : (
            <div className="space-y-4">
              <input 
                type="text"
                placeholder="Enter new address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <div className="space-x-2">
                <button 
                  onClick={() => setShowLocationForm(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save
                </button>
                <button 
                  onClick={() => setShowLocationForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Password Change */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Security</h2>
        <div className="space-y-4">
          {!showPasswordForm ? (
            <button 
              onClick={() => setShowPasswordForm(true)}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center space-x-2"
            >
              <Lock className="w-4 h-4" />
              <span>Change Password</span>
            </button>
          ) : (
            <div className="space-y-4">
              <input 
                type="password"
                placeholder="Current Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <input 
                type="password"
                placeholder="New Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <input 
                type="password"
                placeholder="Confirm New Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              <div className="space-x-2">
                <button 
                  onClick={() => setShowPasswordForm(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Update Password
                </button>
                <button 
                  onClick={() => setShowPasswordForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pending Orders */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
          <Clock className="w-5 h-5" />
          <span>Pending Orders</span>
        </h2>
        <div className="space-y-4">
          {pendingOrders.map(order => (
            <div key={order.id} className="border border-gray-200 rounded-md p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Order #{order.id}</span>
                <span className="text-blue-600">{order.status}</span>
              </div>
              <div className="text-sm text-gray-600">
                <div>Date: {order.date}</div>
                <div>Items: {order.items.join(', ')}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Orders */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
          <Package className="w-5 h-5" />
          <span>Order History</span>
        </h2>
        <div className="space-y-4">
          {pastOrders.map(order => (
            <div key={order.id} className="border border-gray-200 rounded-md p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Order #{order.id}</span>
                <span className="text-green-600">{order.status}</span>
              </div>
              <div className="text-sm text-gray-600">
                <div>Date: {order.date}</div>
                <div>Items: {order.items.join(', ')}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;