import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [showRoleModal, setShowRoleModal] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (role) => {
    // Navigate to appropriate dashboard based on role
    if (role === 'farmer') {
      navigate('/farmer-dashboard');
    } else if (role === 'buyer') {
      navigate('/buyer-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      {/* Header */}
      <header className="bg-green-600 text-white p-4 shadow-md flex justify-between items-center">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mr-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.5 3c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.015-4.5-4.5-4.5zM16 12c-2.481 0-4.5 2.019-4.5 4.5s2.019 4.5 4.5 4.5 4.5-2.019 4.5-4.5-2.019-4.5-4.5-4.5zM7 14c-2.481 0-4.5 2.019-4.5 4.5S4.519 23 7 23s4.5-2.019 4.5-4.5S9.481 14 7 14z"/>
          </svg>
          <h1 className="text-2xl font-bold">AgriLink</h1>
        </div>
        <button 
          onClick={() => setShowRoleModal(true)}
          className="bg-white text-green-600 px-4 py-2 rounded-full hover:bg-green-100 transition duration-300"
        >
          Login
        </button>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="text-center max-w-2xl">
          <h2 className="text-4xl font-extrabold text-green-800 mb-6">
            Connecting Farmers and Buyers
          </h2>
          <p className="text-xl text-green-700 mb-8">
            Streamline agricultural transactions, access real-time market insights, 
            and build sustainable partnerships in the agricultural ecosystem.
          </p>
          <button 
            onClick={() => setShowRoleModal(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-full text-lg hover:bg-green-700 transition duration-300 shadow-lg"
          >
            Get Started
          </button>
        </div>
      </main>

      {/* Role Selection Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center">
            <h3 className="text-2xl font-bold mb-6 text-green-800">
              Select Your Role
            </h3>
            <div className="flex justify-center space-x-6">
              <button
                onClick={() => handleLogin('farmer')}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Farmer
              </button>
              <button
                onClick={() => handleLogin('buyer')}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Buyer
              </button>
            </div>
            <button
              onClick={() => setShowRoleModal(false)}
              className="mt-4 text-green-700 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-green-600 text-white p-4 text-center">
        <p>&copy; 2024 AgriLink. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Hero;