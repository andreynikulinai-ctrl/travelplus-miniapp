import { useSelectedStore } from '../store/selectedStore'

interface SelectedModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenForm: () => void  // добавили
}

export const SelectedModal = ({ isOpen, onClose, onOpenForm }: SelectedModalProps) => {
  const { items, removeItem } = useSelectedStore()

  if (!isOpen) return null

  const handleRequestQuote = () => {
    onClose()
    onOpenForm()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-display text-xl font-bold text-brandGray">Выбранные товары</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            ×
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Вы пока не выбрали ни одного товара
            </p>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                    onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{item.name}</h3>
                    <p className="text-xs text-gray-600">{item.packaging}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t">
            <button 
              onClick={handleRequestQuote}
              className="w-full bg-tangerine hover:bg-tangerine-dark text-white font-bold py-3 rounded-lg transition-colors"
            >
              Запросить КП ({items.length} {items.length === 1 ? 'товар' : 'товара'})
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
