import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
app.post('/api/orders', async (req, res) => {
  const d = req.body;
  let m = 'Заявка!\n\nИмя: ' + d.name + '\nТелефон: ' + d.phone + '\nEmail: ' + d.email;
  if (d.company) m = m + '\nКомпания: ' + d.company;
  m = m + '\nСвязь: ' + d.contactMethod + '\n\nТовары:\n';
  for (let i = 0; i < d.items.length; i++) {
    m = m + String(i+1) + '. ' + d.items[i].name + ' (' + d.items[i].packaging + ')\n';
  }
  if (d.comment) m = m + '\nКомментарий: ' + d.comment;
  await fetch('https://api.telegram.org/bot8316300214:AAFUrqM3DBwjh4W2yPGqva97J3RF21hoegU/sendMessage', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({chat_id: '290074312', text: m})
  });
  res.json({success: true});
});
app.listen(3001, () => console.log('Backend ready'));
