import React, { useContext } from 'react';
import { ShoppingCart, Leaf } from 'lucide-react';
import { CartContext } from '../context/Cart';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const getProductImage = (product) => {
    const placeholderImages = {
      'Vegetable': 'https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-2foodgroups_vegetables_detailfeature_thumb.jpg?sfvrsn=aa2422a6_4',
      'Fruit': 'https://static.vecteezy.com/system/resources/previews/024/174/781/non_2x/juicy-fruits-top-view-background-ai-generative-photo.jpg',
      'Grain': 'https://swolverine.com/cdn/shop/articles/What_Are_Whole_Grains_And_Why_Are_They_Important_-_Swolverine_1024x.jpg?v=1600716204',
      'Nuts': `https://www.ofi.com/content/dam/olamofi/products-and-ingredients/nuts/nuts-images/nuts-banner-img.webp`
    };
    // Use product image if available, otherwise select category placeholder
    return product.image || placeholderImages[product.category] || 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Marketvegetables.jpg/220px-Marketvegetables.jpg';
  };
  return (
    <div className="bg-white border border-green-100 rounded-xl shadow-md overflow-hidden p-4 relative">
      {/* Product Image */}
      <div className="flex justify-center mb-4">
        <img 
          src={getProductImage(product)} 
          alt={product.name} 
          className="w-full h-24 rounded object-cover"
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
