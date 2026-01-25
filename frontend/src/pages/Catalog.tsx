import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const Catalog = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Каталог товаров Travel+
      </h1>
      
      <div className="grid grid-cols-2 gap-4 max-w-6xl mx-auto">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
