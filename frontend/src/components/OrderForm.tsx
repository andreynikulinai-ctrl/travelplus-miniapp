import { useState } from 'react'
import { useSelectedStore } from '../store/selectedStore'

interface OrderFormProps {
  isOpen: boolean
  onClose: () => void
}

export const OrderForm = ({ isOpen, onClose }: OrderFormProps) => {
  const { items } = useSelectedStore()
  
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

    try {
      // В разработке — запрос напрямую на бэкенд (127.0.0.1 часто надёжнее localhost)
      const apiUrl = import.meta.env.DEV ? 'http://127.0.0.1:3001/api/send' : '/api/send'
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, items })
      })

      const rawText = await response.text()
      console.log('[форма] Ответ сервера:', response.status, rawText.slice(0, 300))

      let data: { success?: boolean; error?: string }
      try {
        data = rawText ? JSON.parse(rawText) : {}
      } catch {
        const fallback = !response.ok
          ? 'Сервер ответил с ошибкой (код ' + response.status + '). Проверьте, что бэкенд запущен: в папке backend выполните node server.js'
          : 'Сервер вернул неверный ответ: ' + rawText.slice(0, 100)
        throw new Error(fallback)
      }

      if (!response.ok) {
        alert(data?.error || 'Ошибка сервера (код ' + response.status + ')')
        return
      }
      if (data.success) {
        alert('Заявка отправлена! Менеджер свяжется с вами в ближайшее время.')
        onClose()
      } else {
        alert(data?.error || 'Ошибка при отправке заявки')
      }
    } catch (error: unknown) {
      console.error('[форма] Ошибка:', error)
      const msg = error instanceof Error ? error.message : String(error)
      alert('Ошибка: ' + msg + '\n\nУбедитесь: 1) Бэкенд запущен (в папке backend: node server.js). 2) Открыт http://127.0.0.1:5173 (не файл с диска).')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Шапка */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-display text-xl font-bold text-brandGray">Запрос коммерческого предложения</h2>
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
                className="w-full px-3 py-2 border border-aluminium rounded-lg focus:outline-none focus:ring-2 focus:ring-tangerine focus:border-tangerine"
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
                className="w-full px-3 py-2 border border-aluminium rounded-lg focus:outline-none focus:ring-2 focus:ring-tangerine focus:border-tangerine"
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
                className="w-full px-3 py-2 border border-aluminium rounded-lg focus:outline-none focus:ring-2 focus:ring-tangerine focus:border-tangerine"
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
                className="w-full px-3 py-2 border border-aluminium rounded-lg focus:outline-none focus:ring-2 focus:ring-tangerine focus:border-tangerine"
                placeholder="ООО, ИП, физ лицо"
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
                className="w-full px-3 py-2 border border-aluminium rounded-lg focus:outline-none focus:ring-2 focus:ring-tangerine focus:border-tangerine"
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
                className="w-full px-3 py-2 border border-aluminium rounded-lg focus:outline-none focus:ring-2 focus:ring-tangerine focus:border-tangerine"
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
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex-1 bg-tangerine hover:bg-tangerine-dark text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Отправить
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
