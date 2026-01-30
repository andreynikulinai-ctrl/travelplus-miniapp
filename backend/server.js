import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/orders', sendToTelegram);
app.post('/api/send', sendToTelegram);

async function sendToTelegram(req, res) {
  console.log('[backend] POST', req.url || req.path, 'получен, body:', !!req.body, 'items:', req.body?.items?.length);
  try {
    const d = req.body || {};
    const items = Array.isArray(d.items) ? d.items : [];
    let m = '🆕 Заявка!\n\n👤 Имя: ' + (d.name || '—') + '\nТелефон: ' + (d.phone || '—') + '\nEmail: ' + (d.email || '—');
    if (d.company) m += '\nКомпания: ' + d.company;
    m += '\n📞 Связь: ' + (d.contactMethod || '—') + '\n\n📋 Товары:\n';
    if (items.length) {
      items.forEach((item, i) => { m += (i + 1) + '. ' + (item.name || '—') + '\n'; });
    } else {
      m += '—\n';
    }
    if (d.comment) m += '\n💬 ' + d.comment;

    const token = process.env.TELEGRAM_BOT_TOKEN || '8316300214:AAFUrqM3DBwjh4W2yPGqva97J3RF21hoegU';
    const chatId = process.env.TELEGRAM_CHAT_ID || '290074312';

    const r = await fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: m })
    });

    const text = await r.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error('[backend] Telegram ответ не JSON:', text.slice(0, 200));
      return res.status(500).json({ success: false, error: 'Ответ Telegram неверный' });
    }
    if (!data.ok) {
      console.error('[backend] Ошибка Telegram:', data);
      return res.status(500).json({ success: false, error: data.description || 'Ошибка Telegram' });
    }

    console.log('[backend] Заявка отправлена в Telegram');
    return res.json({ success: true });
  } catch (err) {
    console.error('[backend] sendToTelegram error:', err);
    return res.status(500).json({ success: false, error: err.message || 'Ошибка сервера' });
  }
}

app.listen(3001, () => console.log('Backend ready on http://localhost:3001'));
