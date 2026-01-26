import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, phone, email, company, comment, contactMethod, items } = req.body

    const token = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!token || !chatId) {
      return res.status(500).json({ error: 'Telegram credentials not configured' })
    }

    let message = '🆕 Новая заявка!\n\n'
    message += '👤 Клиент:\n'
    message += 'Имя: ' + name + '\n'
    message += 'Телефон: ' + phone + '\n'
    message += 'Email: ' + email + '\n'
    if (company) message += 'Компания: ' + company + '\n'
    message += '\n📋 Товары: ' + items.length + ' шт\n'
    items.forEach((item: any, i: number) => {
      message += (i + 1) + '. ' + item.name + '\n'
    })
    message += '\n📞 Способ связи: ' + contactMethod + '\n'
    if (comment) message += '💬 ' + comment

    const url = 'https://api.telegram.org/bot' + token + '/sendMessage'
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message })
    })

    const data = await response.json()
    if (!data.ok) {
      throw new Error('Telegram error')
    }

    res.json({ success: true })
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ success: false, error: error.message })
  }
}
