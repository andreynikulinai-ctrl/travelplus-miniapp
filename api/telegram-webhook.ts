/**
 * Webhook для бота Telegram.
 * При /start или нажатии кнопки «Старт» — приветствие и большая кнопка «Старт» внизу.
 */

const WELCOME_TEXT =
  "Привет! Это поддержка Трэвел+ 📣\n\nМы всегда на связи и готовы ответить на любые вопросы по нашей продукции.\n\nБудем рады помочь 🧡";

const HINT_TEXT = "Чтобы использовать бота, нажмите здесь ⬇️";

function replyMarkupStart() {
  return {
    keyboard: [[{ text: "Старт" }]],
    resize_keyboard: true,
    one_time_keyboard: false,
  };
}

async function sendMessage(
  token: string,
  chatId: number,
  text: string,
  replyMarkup?: object
) {
  const body: { chat_id: number; text: string; parse_mode?: string; reply_markup?: object } = {
    chat_id: chatId,
    text,
    parse_mode: "Markdown",
  };
  if (replyMarkup) body.reply_markup = replyMarkup;

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || `Telegram API ${res.status}`);
  }
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.error("telegram-webhook: Missing TELEGRAM_BOT_TOKEN");
    return res.status(500).json({ error: "Server config error" });
  }

  const update = req.body || {};
  const message = update.message || update.edited_message;
  if (!message) {
    return res.status(200).end();
  }

  const chatId = message.chat?.id;
  const text = (message.text || "").trim();

  if (!chatId) {
    return res.status(200).end();
  }

  const isStart = /^\/start$/i.test(text) || /^старт$/i.test(text) || /^начать$/i.test(text);

  if (isStart) {
    try {
      await sendMessage(token, chatId, WELCOME_TEXT);
      await sendMessage(token, chatId, HINT_TEXT, replyMarkupStart());
    } catch (e) {
      console.error("telegram-webhook sendMessage:", e);
      return res.status(500).json({ error: "Send failed" });
    }
  }
  // Пока игнорируем остальные сообщения — позже добавим сценарии

  return res.status(200).end();
}
