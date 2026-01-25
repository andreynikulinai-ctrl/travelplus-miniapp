import { useState } from 'react'
import { products, categories } from './data/products'
import { useSelectedStore } from './store/selectedStore'
import { SelectedModal } from './components/SelectedModal'
import { OrderForm } from './components/OrderForm'

function App() {
  const { items, addItem } = useSelectedStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-bold">Travel+</h1>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="relative bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              📋 Выбрано: {items.length}
            </button>
          </div>
        </div>

        <div className="p-4">
          <h2 className="text-2xl font-bold text-center mb-6">
            Каталог товаров
          </h2>

          {/* Фильтр по категориям */}
          <div className="max-w-6xl mx-auto mb-6 overflow-x-auto">
            <div className="flex gap-2 pb-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Все товары
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 max-w-6xl mx-auto">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="w-full h-48 bg-gray-100">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {product.description}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    {product.packaging}
                  </p>
                  
                  <p className="text-lg font-medium text-gray-700 mb-4">
                    Цена по запросу
                  </p>
                  
                  <button
                    onClick={() => addItem(product)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
                  >
                    Узнать цену
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SelectedModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onOpenForm={() => setIsFormOpen(true)}
      />
      
      <OrderForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
      />
    </>
  )
}

export default App
