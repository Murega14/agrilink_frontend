import React, { useState } from 'react';
import axiosInstance from '../../utils/Axios';
import { useNavigate } from 'react-router-dom';

const BuyerSignup = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        password: '',
        confirm_password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirm_password) {
            setError('Passwords do not match');
            return;
        }

        //preparing data for submission
        const { confirm_password, ...submitData} = formData;

        try {
            const response = await axiosInstance.post('/api/v1/signup/buyer', submitData);

            if (response.data.success) {
                navigate('/marketplace');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'An error occured')
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
                            <h2 className="text-4xl font-bold mb-6">Grow With Us!</h2>
                            <p className="text-green-100 mb-6">Connect directly with farmers and access fresh, quality produce for your home.</p>
                            <ul className="space-y-2 text-green-100">
                                <li className="flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                    </svg>
                                    Direct Farmer connections
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                    </svg>
                                    Fast and Secure Payments
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                                    </svg>
                                    Readily Available Produce
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="md:w-3/5 p-12 bg-white">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-semibold text-gray-800">Create Buyer Account</h3>
                            <div className="text-sm">
                                <span className="text-gray-600">Already registered? </span>
                                <a href="/login/farmer" className="text-green-600 hover:text-green-500 font-medium">Sign in</a>
                            </div>
                        </div>

                        {error && (
                            <div className="mb-4 p-4 bg-red-50 border border-red-300 text-red-800 rounded">
                                {error}
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input 
                                        type="text" 
                                        required 
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                                        placeholder="John" 
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input 
                                        type="text" 
                                        required 
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                                        placeholder="Doe" 
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input 
                                        type="email" 
                                        required 
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                                        placeholder="your@email.com" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input 
                                        type="tel" 
                                        required 
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                                        placeholder="0701234567" 
                                        name="phone_number"
                                        value={formData.phone_number}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Create Password</label>
                                    <input 
                                        type="password" 
                                        required 
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                    <input 
                                        type="password" 
                                        required 
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                                        name="confirm_password"
                                        value={formData.confirm_password}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center">
                                <input 
                                    type="checkbox" 
                                    required 
                                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" 
                                />
                                <label className="ml-2 block text-sm text-gray-700">
                                    I agree to the <a href="#" className="text-green-600 hover:text-green-500">Terms and Conditions</a>
                                </label>
                            </div>
                            <button 
                                type="submit" 
                                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition duration-200"
                            >
                                Create Account
                            </button>
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

export default BuyerSignup;
