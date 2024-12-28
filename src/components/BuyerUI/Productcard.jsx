import React, { useContext } from 'react';
import { ShoppingCart, Leaf } from 'lucide-react';
import { CartContext } from '../context/Cart';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const getProductImage = () => product.image || '/api/placeholder/400/300?text=Product';

  return (
    <div className="bg-white border border-green-100 rounded-xl shadow-md overflow-hidden p-4 relative">
      {/* Product Image */}
      <div className="flex justify-center mb-4">
        <img 
          src={getProductImage()} 
          alt={product.name} 
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-green-900">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{product.description}</p>
        <p className="text-green-700 font-bold text-lg mb-4">Ksh{product.price}</p>
      </div>

      {/* Icons */}
      <div className="flex justify-center mt-4 space-x-4 text-gray-400">
        {/* Category Icon */}
        <div className="flex items-center space-x-1">
          <Leaf size={20} />
          <span className="text-xs">{product.category}</span>
        </div>

        {/* Cart Icon */}
        <div 
          className="cursor-pointer hover:text-green-600 transition-colors"
          onClick={() => addToCart(product)}
        >
          <ShoppingCart size={20} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
