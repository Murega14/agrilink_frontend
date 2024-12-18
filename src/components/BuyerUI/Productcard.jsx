import React, { useContext } from 'react';
import { ShoppingCart, Leaf, Star } from 'lucide-react';
import { CartContext } from '../context/Cart';

const ProductCard = ({ product }) => {
  // Use the CartContext to access addToCart method
  const { addToCart } = useContext(CartContext);

  // Fallback image placeholder
  const getProductImage = () => {
    const placeholderImages = {
      'Vegetables': '/api/placeholder/400/300?text=Vegetables',
      'Fruits': '/api/placeholder/400/300?text=Fruits',
      'Grains': '/api/placeholder/400/300?text=Grains'
    };
    return placeholderImages[product.category] || '/api/placeholder/400/300?text=Product';
  };

  return (
    <div className="bg-white border border-green-100 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2">
      {/* Product Image */}
      <div className="relative">
        <img 
          src={getProductImage()} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
        {product.amount <= 10 && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
            Low Stock
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold text-green-900 truncate pr-2">{product.name}</h3>
          <div className="flex items-center text-yellow-500">
            <Star size={16} fill="currentColor" className="mr-1" />
            <span className="text-sm text-gray-600">{(Math.random() * 5).toFixed(1)}</span>
          </div>
        </div>

        {/* Price and Category */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-2">
            <Leaf className="text-green-500" size={20} />
            <span className="text-sm text-gray-700 font-medium">{product.category}</span>
          </div>
          <span className="text-green-700 font-bold text-lg">Ksh {product.price}</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 h-12 overflow-hidden text-sm">
          {product.description}
        </p>

        {/* Seller and Stock */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-500">
            Seller: <span className="font-medium">{product.seller}</span>
          </div>
          <div className="text-sm text-gray-600 flex items-center">
            <span className="mr-2">Stock:</span>
            <span className={`font-semibold ${product.amount <= 10 ? 'text-yellow-600' : 'text-green-600'}`}>
              {product.amount} Kgs
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={() => addToCart(product)}
          disabled={product.amount === 0}
          className="w-full bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition-colors flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <ShoppingCart size={16} className="mr-2" /> 
          {product.amount === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;