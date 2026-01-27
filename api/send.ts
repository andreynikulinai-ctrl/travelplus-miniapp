interface Product {
  id: string;
  name: string;
  category: string;
}

interface OrderData {
  name: string;
  phone: string;
  email: string;
  company?: string;
  comment?: string;
  contactMethod: 'telegram' | 'email' | 'phone';
  items: Product[];
}

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token) {
    console.error("Missing TELEGRAM_BOT_TOKEN");
    return res.status(500).json({ success: false, error: "Server configuration error" });
  }

  if (!chatId) {
    console.error("Missing TELEGRAM_CHAT_ID");
    return res.status(500).json({ success: false, error: "Server configuration error" });
  }

  try {
    const data: OrderData = req.body;

    // Форматируем список товаров
    const itemsList = data.items
      .map((item, i) => `  ${i + 1}. ${item.name} (${item.category})`)
      .join('\n');

    // Способ связи
    const contactMethodText = {
      telegram: 'Telegram',
      email: 'Email',
      phone: 'Телефон'
    }[data.contactMethod];

    // Формируем сообщение
    const message = `📦 Новая заявка на КП

👤 Контакт:
  Имя: ${data.name}
  Телефон: ${data.phone}
  Email: ${data.email}${data.company ? `\n  Компания: ${data.company}` : ''}
  Связь через: ${contactMethodText}

🛒 Выбранные товары (${data.items.length}):
${itemsList}${data.comment ? `\n\n💬 Комментарий:\n${data.comment}` : ''}`;

    // Отправляем в Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML'
        })
      }
    );

    const telegramResult = await telegramResponse.json();

    if (!telegramResult.ok) {
      console.error("Telegram API error:", telegramResult);
      return res.status(500).json({ success: false, error: "Failed to send message" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
}
