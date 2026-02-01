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
          onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }}
        />
      </div>

      {/* Контент */}
      <div className="p-4">
        {/* Название и описание */}
        <h3 className="text-lg font-semibold text-brandGray mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-brandGray/80 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Фасовка */}
        <p className="text-xs text-gray-500 mb-3">
          {product.packaging}
        </p>

        {/* Цена */}
        <div className="mb-4">
          {product.price !== null ? (
            <span className="text-xl font-bold text-tangerine">
              {product.price} ₽
            </span>
          ) : (
            <span className="text-lg font-medium text-brandGray">
              Цена по запросу
            </span>
          )}
        </div>

        {/* Кнопка */}
        <button className="w-full bg-tangerine hover:bg-tangerine-dark text-white font-medium py-2 px-4 rounded-lg transition-colors">
          Подробнее
        </button>
      </div>
    </div>
  );
};
