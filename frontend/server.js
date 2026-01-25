import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/orders', async (req, res) => {
  const { name, phone, email, company, comment, contactMethod, items } = req.body;
  const token = '8316300214:AAFUrqM3DBwjh4W2yPGqva97J3RF21hoegU';
  const chatId = '290074312';
  
  let msg = 'Новая заявка!\n\n';
  msg += 'Имя: ' + name + '\n';
  msg += 'Телефон: ' + phone + '\n';
  msg += 'Email: ' + email + '\n';
  if (company) msg += 'Компания: ' + company + '\n';
  msg += 'Способ связи: ' + contactMethod + '\n\n';
  msg += 'Товары:\n';
  for (let i = 0; i < items.length; i++) {
    msg += (i + 1) + '. ' + items[i].name + ' (' + items[i].packaging + ')\n';
  }
  if (comment) msg += '\nКомментарий: ' + comment;
  
  await fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/jsmsg })
  });
  
  res.json({ success: true });
});

app.listen(3001, () => console.log('Backend started on port 3001'));
