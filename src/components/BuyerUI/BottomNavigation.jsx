import React from 'react';
import { Home, ShoppingBag, User, HelpCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const BottomNavigation = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
      <div className="grid grid-cols-4 h-16">
        <Link 
          to="/marketplace" 
          className={`flex flex-col items-center justify-center ${
            isActive('/marketplace') ? 'text-green-600' : 'text-gray-600'
          }`}
        >
          <Home size={24} />
          <span className="text-xs mt-1">Market</span>
        </Link>
        
        <Link 
          to="/user_orders" 
          className={`flex flex-col items-center justify-center ${
            isActive('/user_orders') ? 'text-green-600' : 'text-gray-600'
          }`}
        >
          <ShoppingBag size={24} />
          <span className="text-xs mt-1">Orders</span>
        </Link>

        <Link 
          to="/user" 
          className={`flex flex-col items-center justify-center ${
            isActive('/profile') ? 'text-green-600' : 'text-gray-600'
          }`}
        >
          <User size={24} />
          <span className="text-xs mt-1">Profile</span>
        </Link>

        <Link 
          to="/faqs" 
          className={`flex flex-col items-center justify-center ${
            isActive('/faqs') ? 'text-green-600' : 'text-gray-600'
          }`}
        >
          <HelpCircle size={24} />
          <span className="text-xs mt-1">FAQs</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavigation;