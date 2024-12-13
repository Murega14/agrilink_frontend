import React from "react";

function ForgotPassword() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-gray-50 flex items-center justify-center">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-[url('/images/agri-pattern.svg')] bg-repeat opacity-10 z-0"></div>
        <div className="bg-white p-8 rounded-lg shadow-lg border border-green-300 relative z-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Password Reset</h2>
            <a
              href="/index"
              className="text-sm text-green-600 hover:text-green-500 font-medium"
            >
              Back to Login
            </a>
          </div>
          <p className="text-gray-600 mb-6">
            Enter your email to receive a password reset link.
          </p>

          <form method="post" action="/authentication/forgot_password" className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300 focus:ring-4 focus:ring-green-200"
              >
                Request Password Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
