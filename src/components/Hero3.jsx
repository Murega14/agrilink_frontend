import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
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
    <div className="min-h-screen bg-cover bg-center flex flex-col" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1498579397066-22750a3cb424?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}>
      {/* Header */}
      <header className="bg-green-500 bg-opacity-75 text-white p-4 shadow-md flex justify-between items-center">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mr-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.5 3c-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.015-4.5-4.5-4.5zM16 12c-2.481 0-4.5 2.019-4.5 4.5s2.019 4.5 4.5 4.5 4.5-2.019 4.5-4.5-2.019-4.5-4.5-4.5zM7 14c-2.481 0-4.5 2.019-4.5 4.5S4.519 23 7 23s4.5-2.019 4.5-4.5S9.481 14 7 14z"/>
          </svg>
          <h1 className="text-2xl font-bold">AgriConnect</h1>
        </div>
        <nav className="flex space-x-4">
          <button 
            onClick={() => setShowRoleModal(true) & setIsSigningIn(true)}
            className="bg-white text-green-500 px-4 py-2 rounded-full hover:bg-green-200 transition duration-300"
          >
            Sign In
          </button>
          <button 
            onClick={() => setShowRoleModal(true) & setIsSigningIn(false)}
            className="bg-white text-green-500 px-4 py-2 rounded-full hover:bg-green-200 transition duration-300"
          >
            Sign Up
          </button>
          <a href="/marketplace" className="text-white hover:underline">Marketplace</a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="text-center max-w-2xl backdrop-blur-md bg-white/75 p-8 rounded-lg shadow-lg">
          <h2 className="text-4xl font-extrabold text-green-700 mb-6">
            Connecting Farmers and Buyers
          </h2>
          <p className="text-xl text-green-600 mb-8">
            Streamline agricultural transactions, access real-time market insights, 
            and build sustainable partnerships in the agricultural ecosystem.
          </p>
          <button 
            onClick={() => setShowRoleModal(true)}
            className="bg-green-500 text-white px-6 py-3 rounded-full text-lg hover:bg-green-600 transition duration-300 shadow-lg"
          >
            Get Started
          </button>
        </div>
      </main>

      {/* Role Selection Modal */}
      {showRoleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center">
            <h3 className="text-2xl font-bold mb-6 text-green-700">
              {isSigningIn ? 'Sign In' : 'Sign Up'}
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
              className="mt-4 text-green-600 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-green-500 bg-opacity-75 text-white p-4 text-center">
        <p>&copy; 2024 AgriConnect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Hero;