import { useState } from 'react'
import { useSelectedStore } from '../store/selectedStore'

interface OrderFormProps {
  isOpen: boolean
  onClose: () => void
}

export const OrderForm = ({ isOpen, onClose }: OrderFormProps) => {
  const { items, clearItems } = useSelectedStore()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    comment: '',
    contactMethod: 'telegram' as 'telegram' | 'email' | 'phone',
    agreedToPolicy: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.agreedToPolicy) {
      alert('Необходимо согласие на обработку персональных данных')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, items })
      })

      const data = await response.json()

      if (data.success) {
        clearItems()
        alert('Заявка отправлена! Менеджер свяжется с вами в ближайшее время.')
        onClose()
      } else {
        alert('Ошибка при отправке заявки. Попробуйте позже.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Ошибка при отправке заявки. Проверьте соединение.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Шапка */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Запрос коммерческого предложения</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            ×
          </button>
        </div>

        {/* Форма */}
        <form onSubmit={handleSubmit} className="p-4 overflow-y-auto flex-1">
          <div className="space-y-4">
            {/* Имя */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Имя *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Иван Иванов"
              />
            </div>

            {/* Телефон */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Телефон *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+7 999 123-45-67"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ivan@example.com"
              />
            </div>

            {/* Компания */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Компания
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ООО Рога и Копыта"
              />
            </div>

            {/* Способ связи */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Предпочтительный способ связи
              </label>
              <select
                value={formData.contactMethod}
                onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value as 'telegram' | 'email' | 'phone' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="telegram">Telegram</option>
                <option value="email">Email</option>
                <option value="phone">Телефон</option>
              </select>
            </div>

            {/* Комментарий */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Комментарий
              </label>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Дополнительная информация..."
              />
            </div>

            {/* Согласие */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="policy"
                checked={formData.agreedToPolicy}
                onChange={(e) => setFormData({ ...formData, agreedToPolicy: e.target.checked })}
                className="mt-1 mr-2"
              />
              <label htmlFor="policy" className="text-sm text-gray-600">
                Согласен на обработку персональных данных *
              </label>
            </div>
          </div>

          {/* Футер */}
          <div className="p-4 border-t flex gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              {isLoading ? 'Отправка...' : 'Отправить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
