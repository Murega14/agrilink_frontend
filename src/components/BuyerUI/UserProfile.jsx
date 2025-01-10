import React, { useCallback, useEffect, useState } from 'react';
import { MapPin, Lock, Package, Mail, Phone, User, Store } from 'lucide-react';
import axiosInstance from '../../utils/Axios';
import { useNavigate } from 'react-router-dom';
import AgrilinkSpinner from '../Spinner';

const UserProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone_number: '',
    location: 'Thika, Kenya'
  });

  const navigate = useNavigate();

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login/buyer');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await axiosInstance.get('/api/v1/userprofile');
      const { name, email, phone_number, location } = response.data;
      setUserData({ name, email, phone_number, location: location || 'Thika, Kenya' });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login/buyer');
      } else {
        setError('Failed to load profile data');
      }
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    } else {
      navigate('/login/buyer');
    }
  }, [fetchUser, navigate]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">
    <AgrilinkSpinner size={150} color="#1F4D4D" />
    </div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
      <div className="text-red-600">{error}</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Return to Marketplace Button */}
      <div className="max-w-7xl mx-auto mb-6">
        <button 
          onClick={() => navigate('/marketplace')}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
        >
          <Store className="w-5 h-5" />
          <span>Return to Marketplace</span>
        </button>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-white shadow-md mb-6 max-w-7xl mx-auto rounded-lg">
        <div className="flex space-x-4 p-4">
          <button
            onClick={() => navigate('/orders/pending')}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md flex items-center space-x-2"
          >
            <Package className="w-5 h-5" />
            <span>Orders</span>
          </button>
          <button
            onClick={() => navigate('/settings/password')}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md flex items-center space-x-2"
          >
            <Lock className="w-5 h-5" />
            <span>Change Password</span>
          </button>
        </div>
      </nav>

      {/* User Profile Information */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-500" />
              <span>{userData.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-gray-500" />
              <span>{userData.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-gray-500" />
              <span>{userData.phone_number}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-gray-500" />
              <span>{userData.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;