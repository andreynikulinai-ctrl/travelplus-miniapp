export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Проверка: открыть в браузере /api/send — должно вернуть { ok: true }
  if (req.method === "GET") {
    return res.status(200).json({ ok: true, message: "API /api/send работает" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token) {
    return res.status(500).json({ error: "Missing TELEGRAM_BOT_TOKEN" });
  }
  if (!chatId) {
    return res.status(500).json({ error: "Missing TELEGRAM_CHAT_ID" });
  }

  try {
    const { name, phone, email, company, comment, contactMethod, items } = req.body || {};

    let message = "🆕 Новая заявка!\n\n";
    message += "👤 Клиент:\n";
    message += "Имя: " + (name || "—") + "\n";
    message += "Телефон: " + (phone || "—") + "\n";
    message += "Email: " + (email || "—") + "\n";
    if (company) message += "Компания: " + company + "\n";
    message += "\n📋 Товары: " + (items?.length || 0) + " шт\n";
    if (Array.isArray(items)) {
      items.forEach((item: any, i: number) => {
        message += (i + 1) + ". " + (item.name || "—") + "\n";
      });
    }
    message += "\n📞 Способ связи: " + (contactMethod || "—") + "\n";
    if (comment) message += "💬 " + comment;

    const url = "https://api.telegram.org/bot" + token + "/sendMessage";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message }),
    });

    const data = await response.json();
    if (!data.ok) {
      throw new Error(data.description || "Telegram error");
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("api/send error:", error);
    return res.status(500).json({
      success: false,
      error: error.message || "Internal server error",
    });
  }
}
