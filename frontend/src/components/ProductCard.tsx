import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Картинка */}
      <div className="aspect-square bg-gray-100 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Контент */}
      <div className="p-4">
        {/* Название и описание */}
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Фасовка */}
        <p className="text-xs text-gray-500 mb-3">
          {product.packaging}
        </p>

        {/* Цена */}
        <div className="mb-4">
          {product.price !== null ? (
            <span className="text-xl font-bold text-primary-600">
              {product.price} ₽
            </span>
          ) : (
            <span className="text-lg font-medium text-gray-700">
              Цена по запросу
            </span>
          )}
        </div>

        {/* Кнопка */}
        <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
          Подробнее
        </button>
      </div>
    </div>
  );
};
