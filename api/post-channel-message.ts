/**
 * Одноразовый вызов: отправляет в канал @travelplusbiz сообщение
 * с кнопкой «Каталог» (Web App). По нажатию открывается мини-апп сразу.
 *
 * Вызови один раз: GET /api/post-channel-message?key=ТВОЙ_SECRET
 * Переменные в Vercel: TELEGRAM_BOT_TOKEN, TELEGRAM_CHANNEL_ID, APP_URL, POST_CHANNEL_SECRET
 */

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Use GET with ?key=YOUR_SECRET" });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const channelId = process.env.TELEGRAM_CHANNEL_ID;
  const appUrl = process.env.APP_URL || "https://travelplus-miniapp.vercel.app";
  const secret = process.env.POST_CHANNEL_SECRET;

  if (!token) {
    return res.status(500).json({ error: "Missing TELEGRAM_BOT_TOKEN" });
  }
  if (!channelId) {
    return res.status(500).json({ error: "Missing TELEGRAM_CHANNEL_ID" });
  }
  if (!secret) {
    return res.status(500).json({
      error: "Missing POST_CHANNEL_SECRET. Add it in Vercel → Settings → Environment Variables",
    });
  }

  const key = req.query?.key;
  if (key !== secret) {
    return res.status(403).json({ error: "Invalid key" });
  }

  const text =
    "Каталог Трэвел+ — тапочки, косметика, аксессуары.\nНажмите кнопку ниже, чтобы открыть каталог.";

  const replyMarkup = {
    inline_keyboard: [
      [
        {
          text: "Каталог",
          web_app: { url: appUrl },
        },
      ],
    ],
  };

  try {
    const url = "https://api.telegram.org/bot" + token + "/sendMessage";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: channelId,
        text,
        reply_markup: replyMarkup,
      }),
    });

    const data = await response.json();
    if (!data.ok) {
      throw new Error(data.description || "Telegram error");
    }

    return res.status(200).json({
      ok: true,
      message: "Сообщение с кнопкой «Каталог» отправлено в канал. Закрепи этот пост в канале.",
    });
  } catch (error: any) {
    console.error("post-channel-message error:", error);
    return res.status(500).json({
      ok: false,
      error: error.message || "Internal server error",
    });
  }
}
