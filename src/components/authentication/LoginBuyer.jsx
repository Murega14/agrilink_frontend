import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginBuyer() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('https://agrilink-1-870p.onrender.com/api/v1/login/buyer', {
        identifier,
        password,
      }, {
        withCredentials: true
      });

      if (response.data.success) {
        const token = response.data.token;
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        navigate('/marketplace');
      } else {
        setError("Login Failed. Please try again");
      }
    } catch(err) {
      console.error('Login Failed', err);
      setError(err.response?.data?.message || 'An error occured authenticating you');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-gray-50">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Panel */}
          <div className="md:w-2/5 bg-gradient-to-br from-green-700 to-green-600 p-12 text-white flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grain)" />
                <defs>
                  <pattern id="grain" width="15" height="15" patternUnits="userSpaceOnUse">
                    <path d="M7.5,0 L15,7.5 L7.5,15 L0,7.5 Z" fill="currentColor" />
                  </pattern>
                </defs>
              </svg>
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6">Welcome Back!</h2>
              <p className="text-green-100 mb-6">
                Access your account to connect with farmers and manage your orders.
              </p>
              <div className="space-y-4 text-green-100">
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>Manage your Buyer profile</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  <span>View order history</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-6 h-6 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span>Buy Produce and have it delivered to your doorstep</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="md:w-3/5 p-12 bg-white">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-semibold text-gray-800">Sign In</h3>
              <div className="text-sm">
                <span className="text-gray-600">New Buyer? </span>
                <a href="/signup/farmer" className="text-green-600 hover:text-green-500 font-medium">
                  Create account
                </a>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-600 border border-red-300 text-red-800 px-4 py-3 rounded relative" role="alert">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email or Phone Number
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="your@email.com or 0701234567"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label className="ml-2 block text-sm text-gray-700">Remember me</label>
                </div>
                <a href="/forgotpassword" className="text-sm text-green-600 hover:text-green-500">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition duration-200"
              >
                Sign In
              </button>

              <div className="mt-6 bg-green-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-green-800 mb-2">Need Help?</h4>
                <p className="text-sm text-green-700">
                  Contact our support team at{" "}
                  <a
                    href="mailto:support@agrimarket.com"
                    className="font-medium hover:text-green-900"
                  >
                    support@agrilink.com
                  </a>{" "}
                  or call us at{" "}
                  <a
                    href="tel:1-800-123-4567"
                    className="font-medium hover:text-green-900"
                  >
                    0741-644-151
                  </a>
                </p>
              </div>
            </form>

            <div className="text-center mt-8 text-sm text-gray-500">
              © 2024 AgriLink. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginBuyer;
