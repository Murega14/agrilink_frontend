import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/Cart';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';

const Cart = () => {
  const { 
    cartItems, 
    addToCart, 
    removeFromCart, 
    clearCart, 
    getCartTotal 
  } = useContext(CartContext);

  console.log('Cart Items:', cartItems);


  // Placeholder image function
  const getProductImage = (product) => {
    const placeholderImages = {
      'Vegetables': '/api/placeholder/400/300?text=Vegetables',
      'Fruits': '/api/placeholder/400/300?text=Fruits',
      'Grains': '/api/placeholder/400/300?text=Grains'
    };
    return placeholderImages[product.category] || '/api/placeholder/400/300?text=Product';
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <ShoppingCart className="mx-auto mb-4 text-green-300" size={64} />
        <h2 className="text-2xl font-bold text-green-900 mb-4">Your Cart is Empty</h2>
        <Link 
          to="/marketplace" 
          className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 inline-block"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="w-full bg-green-50 py-4 shadow-sm">
    <div className="container mx-auto flex items-center">
      <Link 
        to="/marketplace" 
        className="flex items-center text-green-900 hover:text-green-700 transition-colors duration-300 group"
        aria-label="Continue Shopping"
      >
        <ShoppingCart 
          className="mr-3 text-green-600 group-hover:text-green-500 transition-colors duration-300" 
          size={36} 
        />
        <h1 className="text-2xl font-bold">Continue Shopping</h1>
      </Link>
    </div>
    </header>
      <div className="grid md:grid-cols-3 gap-6">
        {/* Cart Items Column */}
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div 
              key={item.id} 
              className="bg-white border border-green-100 rounded-lg shadow-md p-4 flex items-center"
            >
              <img
                src={getProductImage(item)}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md mr-4"
              />
              
              <div className="flex-grow">
                <h3 className="text-lg font-bold text-green-900">{item.name}</h3>
                <p className="text-green-700">Ksh {item.price.toFixed(2)}</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => removeFromCart(item)}
                  className="bg-green-100 text-green-700 p-2 rounded-full hover:bg-green-200"
                >
                  <Minus size={16} />
                </button>
                <span className="text-green-900 font-bold">{item.quantity}</span>
                <button 
                  onClick={() => addToCart(item)}
                  className="bg-green-100 text-green-700 p-2 rounded-full hover:bg-green-200"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Column */}
        <div className="md:col-span-1">
          <div className="bg-white border border-green-100 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-green-900 mb-4">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-green-700">Subtotal</span>
                <span className="font-bold text-green-900">
                  Ksh {getCartTotal().toFixed(2)}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-green-700">Delivery</span>
                <span className="font-bold text-green-900">Ksh 0.00</span>
              </div>
              
              <hr className="border-green-200" />
              
              <div className="flex justify-between">
                <span className="text-xl font-bold text-green-900">Total</span>
                <span className="text-xl font-bold text-green-700">
                  Ksh {getCartTotal().toFixed(2)}
                </span>
              </div>
            </div>
            
            <div className="mt-6 space-y-3">
              <button
                onClick={clearCart}
                className="w-full bg-red-500 text-white py-2 rounded-full hover:bg-red-600 flex items-center justify-center"
              >
                <Trash2 size={16} className="mr-2" /> Clear Cart
              </button>
              
              <Link
                to="/checkout"
                className="w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-700 inline-block text-center"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;