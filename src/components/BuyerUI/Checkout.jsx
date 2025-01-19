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
  const [locationError, setLocationError] = useState('');
  const [location, setLocation] = useState({
    address: '',
    city: '',
    additionalInfo: '',
    coordinates: null
  });

  const [formErrors, setFormErrors] = useState({});

  const requestLocationPermission = async () => {
    try {
      const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
      
      if (permissionStatus.state === 'denied') {
        throw new Error('Please enable location access in your browser settings to use this feature.');
      }
      
      if (permissionStatus.state === 'prompt') {
        setLocationError('Please allow location access when prompted.');
      }
      
      return true;
    } catch (error) {
      setLocationError(error.message);
      return false;
    }
  };

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
        {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'AgriLink App' // Required by Nominatim's usage policy
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch address details');
      }

      const data = await response.json();
      
      if (!data || !data.address) {
        throw new Error('No address found for this location');
      }

      return {
        formatted_address: [
          data.address.road,
          data.address.suburb,
          data.address.city || data.address.town || data.address.county,
          data.address.state
        ].filter(Boolean).join(', '),
        city: data.address.city || data.address.town || data.address.county || '',
        area: data.address.suburb || data.address.neighbourhood || '',
        street: data.address.road || '',
      };
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      throw new Error('Failed to get address details');
    }
  };

  const handleGetLocation = async () => {
    try {
      setLoading(true);
      setLocationError('');
      
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) return;

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, 
          (error) => {
            switch(error.code) {
              case error.PERMISSION_DENIED:
                reject(new Error('Location permission denied. Please enable location access in your browser settings.'));
                break;
              case error.POSITION_UNAVAILABLE:
                reject(new Error('Location information is unavailable.'));
                break;
              case error.TIMEOUT:
                reject(new Error('Location request timed out.'));
                break;
              default:
                reject(new Error('An unknown error occurred.'));
            }
          }, 
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          }
        );
      });

      const { latitude, longitude } = position.coords;

      try {
        const addressData = await reverseGeocode(latitude, longitude);

        setLocation({
          address: addressData.formatted_address,
          city: addressData.city,
          additionalInfo: addressData.street ? `Near ${addressData.street}, ${addressData.area}` : addressData.area,
          coordinates: { latitude, longitude }
        });

        setFormErrors({});
      } catch (geocodeError) {
        console.error('Geocoding error:', geocodeError);
        setLocationError('Unable to get precise address. Please refine the address details manually.');
        // Still save the coordinates even if geocoding fails
        setLocation(prev => ({
          ...prev,
          coordinates: { latitude, longitude }
        }));
      }
    } catch (error) {
      setLocationError(error.message || 'Failed to get location');
      setFormErrors(prev => ({
        ...prev,
        location: error.message || 'Failed to get location'
      }));
    } finally {
      setLoading(false);
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
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-green-900 mb-6">Delivery Information</h2>
          
          {locationError && (
            <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {locationError}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-green-700 mb-2">Delivery Address</label>
              <div className="relative">
                <input
                  type="text"
                  value={location.address}
                  onChange={(e) => setLocation(prev => ({...prev, address: e.target.value}))}
                  className="w-full p-3 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your delivery address"
                />
                <button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={loading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-green-600 hover:text-green-700 disabled:text-green-300"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <MapPin size={20} />
                  )}
                </button>
              </div>
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
            readOnly={!!location.coordinates}
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
            readOnly={!!location.coordinates}
                />
              </div>

              <div className="flex items-center text-sm text-green-600">
                {location.coordinates ? (
            <>
              <MapPin className="mr-2" size={16} />
              <span>Location shared successfully</span>
            </>
                ) : (
            <>
              <MapPin className="mr-2" size={16} />
              <span>Click the location icon to auto-fill address</span>
            </>
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