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

  const showSlipperCards = selectedCategory === 'all' || selectedCategory === 'slippers'
  const filteredProducts = showSlipperCards
    ? products.filter(p => p.category === 'slippers')
    : []

  return (
    <>
      <div className="min-h-screen bg-offWhite">
        {/* Шапка: название бренда без логотипа */}
        <header className="bg-white shadow-sm sticky top-0 z-10 border-b border-aluminium">
          <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
            <a href="/" className="font-akony font-bold text-tangerine text-xl sm:text-2xl tracking-tight transition-opacity duration-200 hover:opacity-80">
              Трэвел+
            </a>
            <button
              onClick={() => setIsModalOpen(true)}
              className="relative bg-tangerine hover:bg-tangerine-dark text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 active:scale-95"
            >
              <span className="text-sm">Выбрано: {items.length}</span>
            </button>
          </div>
        </header>

        <main className="p-4">
          <h2 className="font-display text-2xl font-bold text-brandGray text-center mb-2">
            Каталог
          </h2>
          <p className="text-center text-brandGray text-sm mb-6">
            Оснащение гостиниц, отелей, СПА
          </p>

          {/* Фильтр по категориям */}
          <div className="max-w-6xl mx-auto mb-6 overflow-x-auto">
            <div className="flex gap-2 pb-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all duration-200 ${
                  selectedCategory === 'all'
                    ? 'bg-tangerine text-white'
                    : 'bg-aluminium text-brandGray hover:bg-gray-300'
                }`}
              >
                Все товары
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-tangerine text-white'
                      : 'bg-aluminium text-brandGray hover:bg-gray-300'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {showSlipperCards ? (
            <div className="grid grid-cols-2 gap-4 max-w-6xl mx-auto">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-aluminium transition-all duration-200 hover:shadow-lg hover:scale-[1.02] hover:border-tangerine/30">
                  <div className="w-full h-48 bg-gray-100">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg font-semibold text-brandGray mb-1 line-clamp-3">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="text-xs text-gray-500 mb-3">
                      {product.packaging}
                    </p>
                    <p className="text-base font-medium text-gray-700 mb-4">
                      Цена по запросу
                    </p>
                    <button
                      onClick={() => addItem(product)}
                      className="w-full bg-tangerine hover:bg-tangerine-dark text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 active:scale-[0.98]"
                    >
                      Узнать цену
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-xl border border-aluminium shadow-sm text-center">
              <p className="text-4xl mb-4" aria-hidden="true">📦</p>
              <h3 className="font-display text-lg font-semibold text-brandGray mb-2">
                Раздел обновляется
              </h3>
              <p className="text-sm text-brandGray/90">
                Каталог в этой категории пополняется. Товары скоро появятся — следите за обновлениями.
              </p>
            </div>
          )}
        </main>
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
