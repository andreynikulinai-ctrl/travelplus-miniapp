export const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">
          Политика конфиденциальности
        </h1>
        
        <div className="space-y-4 text-gray-700">
          <p>
            Настоящая Политика конфиденциальности регулирует порядок обработки и использования 
            персональных данных пользователей сервиса Travel+ Mini App.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">
            1. Собираемые данные
          </h2>
          <p>
            Мы собираем следующую информацию:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>ФИО</li>
            <li>Номер телефона</li>
            <li>Адрес электронной почты</li>
            <li>Название компании (по желанию)</li>
            <li>Комментарии к заказу</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-2">
            2. Цели обработки данных
          </h2>
          <p>
            Персональные данные используются исключительно для:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Обработки заявок на коммерческие предложения</li>
            <li>Связи с клиентом для уточнения деталей заказа</li>
            <li>Предоставления информации о товарах и услугах</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-2">
            3. Защита данных
          </h2>
          <p>
            Мы принимаем необходимые меры для защиты персональных данных от несанкционированного 
            доступа, изменения, раскрытия или уничтожения.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">
            4. Передача данных третьим лицам
          </h2>
          <p>
            Персональные данные не передаются третьим лицам, за исключением случаев, 
            предусмотренных законодательством РФ.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">
            5. Контакты
          </h2>
          <p>
            По вопросам обработки персональных данных вы можете связаться с нами:
          </p>
          <ul className="list-none space-y-1 ml-4">
            <li>Телефон: +7 (812) 337-55-65</li>
            <li>Email: info@travelplus.biz</li>
          </ul>

          <p className="text-sm text-gray-500 mt-8">
            Дата последнего обновления: {new Date().toLocaleDateString('ru-RU')}
          </p>
        </div>
      </div>
    </div>
  )
}
