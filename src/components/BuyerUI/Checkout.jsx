import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/Cart';
import { MapPin, Loader2, CreditCard, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/Axios';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({
    address: '',
    city: '',
    additionalInfo: '',
    coordinates: null
  });

  const [formErrors, setFormErrors] = useState({});

  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(prev => ({
            ...prev,
            coordinates: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }));
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!location.address.trim()) errors.address = "Delivery address is required";
    if (!location.city.trim()) errors.city = "City is required";
    if (!location.coordinates) errors.coordinates = "Please share your location";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    try {
      // Format the order data
      const orderData = {
        items: cartItems.map(item => ({
          product_id: item.id,
          quantity: item.quantity
        })),
        delivery_location: {
          address: location.address,
          city: location.city,
          additional_info: location.additionalInfo,
          coordinates: location.coordinates
        }
      };

      const response = await axiosInstance.post('/api/v1/orders/create', orderData);

      if (response.status !== 200 && response.status !== 201) throw new Error('Failed to create order');

      // Clear cart and redirect to success page
      clearCart();
      navigate('/order-success');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link 
        to="/cart" 
        className="inline-flex items-center text-green-600 hover:text-green-700 mb-6"
      >
        <ArrowLeft className="mr-2" size={20} />
        Back to Cart
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Delivery Information Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-green-900 mb-6">Delivery Information</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-green-700 mb-2">Delivery Address</label>
              <input
                type="text"
                value={location.address}
                onChange={(e) => setLocation(prev => ({...prev, address: e.target.value}))}
                className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your delivery address"
              />
              {formErrors.address && (
                <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>
              )}
            </div>

            <div>
              <label className="block text-green-700 mb-2">City</label>
              <input
                type="text"
                value={location.city}
                onChange={(e) => setLocation(prev => ({...prev, city: e.target.value}))}
                className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your city"
              />
              {formErrors.city && (
                <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>
              )}
            </div>

            <div>
              <label className="block text-green-700 mb-2">Additional Information (Optional)</label>
              <textarea
                value={location.additionalInfo}
                onChange={(e) => setLocation(prev => ({...prev, additionalInfo: e.target.value}))}
                className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Apartment number, landmarks, etc."
                rows="3"
              />
            </div>

            <div>
              <button
                type="button"
                onClick={handleGetLocation}
                className="w-full bg-green-100 text-green-700 py-3 rounded-lg hover:bg-green-200 flex items-center justify-center"
              >
                <MapPin className="mr-2" size={20} />
                {location.coordinates ? 'Location Shared' : 'Share My Location'}
              </button>
              {formErrors.coordinates && (
                <p className="text-red-500 text-sm mt-1">{formErrors.coordinates}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 flex items-center justify-center disabled:bg-green-300"
            >
              {loading ? (
                <Loader2 className="mr-2 animate-spin" size={20} />
              ) : (
                <CreditCard className="mr-2" size={20} />
              )}
              Place Order (Ksh {getCartTotal() + 100})
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-green-900 mb-6">Order Summary</h2>
          
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b border-green-100">
                <div>
                  <h3 className="font-medium text-green-900">{item.name}</h3>
                  <p className="text-sm text-green-600">Quantity: {item.quantity}</p>
                </div>
                <p className="font-medium text-green-900">
                  Ksh {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}

            <div className="pt-4">
              <div className="flex justify-between text-green-700">
                <span>Subtotal</span>
                <span>Ksh {getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-green-700 mt-2">
                <span>Delivery Fee</span>
                <span>Ksh 100.00</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-green-900 mt-4 pt-4 border-t border-green-100">
                <span>Total</span>
                <span>Ksh {getCartTotal() + 100}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;