import React from "react";

function ResetPassword() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg border border-green-300">
        <h2 className="text-2xl font-semibold text-green-800 text-center mb-4">
          Reset Your Password
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Enter a new password to regain access to your account.
        </p>

        <form method="POST" className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="New password"
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-300"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
