# Настройка Vercel — чтобы форма работала

Если на сайте (Visit) при отправке формы всё равно ошибка — проверь по шагам ниже.

---

## 1. Root Directory (где искать)

Vercel должен видеть **и фронтенд, и папку api** в корне репозитория.

**Где искать:**  
**Settings** → **General** (или **Git**). Поле может называться **Root Directory** или **Project Root**.  
Если такого поля нет — по умолчанию используется корень репозитория, это нормально.

**Что должно быть:** поле **пустое** (или точка `.`).  
Если там указано **frontend** — очисти и сохрани, затем **Redeploy**.

По твоим build logs команда `cd frontend && npm install && npm run build` выполняется — значит `vercel.json` читается из корня репо, Root Directory, скорее всего, пустой. Тогда папка `api/` должна подхватываться.

**Проверка API:** после деплоя открой в браузере:  
**https://твой-домен.vercel.app/api/send**  
Должно открыться и вернуть JSON: `{"ok":true,"message":"API /api/send работает"}`.  
Если видишь это — endpoint задеплоен. Если 404 — API не подхватился (проверь Root Directory).

---

## 2. Переменные окружения

Без них `/api/send` вернёт 500 с текстом «Missing TELEGRAM_BOT_TOKEN» или «Missing TELEGRAM_CHAT_ID».

1. **Settings** → **Environment Variables**.
2. Добавь две переменные:

   | Name                 | Value                    | Environment   |
   |----------------------|--------------------------|---------------|
   | TELEGRAM_BOT_TOKEN   | токен от @BotFather      | Production (и при желании Preview) |
   | TELEGRAM_CHAT_ID     | ID чата/группы в Telegram| Production (и при желании Preview) |

3. **Save**.
4. Обязательно сделай **Redeploy** после добавления переменных (Deployments → Redeploy).

---

## 3. Security / Vercel Authentication

Если включена защита (Vercel Authentication, Security Checkpoint и т.п.), запросы к `/api/send` могут блокироваться.

1. **Settings** → **Security** (или **Authentication**).
2. Либо отключи защиту для этого проекта, либо добавь исключение для пути **/api/** (или только для **/api/send**), чтобы этот endpoint был доступен без проверки браузера.

Без этого форма на продакшене может получать 403/401 вместо ответа от API.

---

## 4. Проверка после настроек

1. Открой сайт по ссылке **Visit**.
2. Выбери товары → «Выбрано» → «Запросить КП» → заполни форму → «Отправить».
3. Должно появиться «Заявка отправлена!» и сообщение в Telegram.

Если снова ошибка — открой в браузере **вкладку Network** (Сеть), отправь форму и посмотри запрос к **/api/send**:
- **Status 404** — Vercel не видит API (чаще всего Root Directory = frontend).
- **Status 500** — смотри ответ (тело): там будет «Missing TELEGRAM_BOT_TOKEN», «Missing TELEGRAM_CHAT_ID» или текст ошибки от Telegram.
- **Status 403/401** — блокирует Security/Authentication.

Пришли, какой статус и что в ответе у `/api/send` — подскажу точнее.
