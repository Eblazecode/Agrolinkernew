import React from 'react';
import { ShoppingCart, Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MarketplaceProduct } from '@/lib/mockData';
import { useStore } from '@/store/useStore';

interface ProductCardProps {
  product: MarketplaceProduct;
  onViewDetails?: (product: MarketplaceProduct) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addToCart } = useStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div
      className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
      onClick={() => onViewDetails?.(product)}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!product.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="secondary" className="bg-white text-gray-900">
              Out of Stock
            </Badge>
          </div>
        )}
        <Badge className="absolute top-3 left-3 bg-green-600">
          {product.category}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
        
        <div className="flex items-center gap-1 mt-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-sm text-gray-400">•</span>
          <span className="text-sm text-gray-500">{product.farmer}</span>
        </div>

        <div className="flex items-center gap-1 mt-1 text-gray-500">
          <MapPin className="h-3 w-3" />
          <span className="text-xs">{product.location}</span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-lg font-bold text-green-600">
              ₦{product.pricePerKg.toLocaleString()}
            </span>
            <span className="text-sm text-gray-500">/{product.unit}</span>
          </div>
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={!product.available}
            className="bg-green-600 hover:bg-green-700"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-xs text-gray-400 mt-2">
          {product.quantity.toLocaleString()} {product.unit} available
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
