# Настройка админ-панели Global Bali Home

Админ-панель уже создана и готова к работе. Тебе нужно выполнить **2 одноразовые настройки** (Firebase + GitHub Token), после чего всё будет работать.

Общее время: ~15 минут.

---

## Шаг 1: Создать Firebase-проект (бесплатно)

Firebase нужен только для логина (email + пароль). Бесплатный тариф Spark — до 50,000 пользователей.

### 1.1 Создать проект

1. Открой https://console.firebase.google.com/
2. Войди через свой Google-аккаунт
3. Нажми **"Create a project"** (или "Добавить проект")
4. Введи название: `global-bali-home` (или любое другое)
5. Google Analytics — можно отключить (не нужен), нажми **"Create project"**
6. Подожди ~30 секунд, нажми **"Continue"**

### 1.2 Включить авторизацию по email

1. В левом меню выбери **"Build" → "Authentication"**
2. Нажми **"Get started"**
3. Во вкладке **"Sign-in method"** найди **"Email/Password"**
4. Нажми на него → включи **"Enable"** → нажми **"Save"**

### 1.3 Добавить своего пользователя

1. Перейди на вкладку **"Users"** (рядом с "Sign-in method")
2. Нажми **"Add user"**
3. Введи:
   - **Email:** твой email (например, `admin@globalbali.com` или любой)
   - **Password:** придумай надёжный пароль (мин. 6 символов)
4. Нажми **"Add user"**

Запомни email и пароль — это будет логин в админ-панель.

### 1.4 Скопировать конфиг Firebase

1. В левом меню нажми на **шестерёнку** (⚙) → **"Project settings"**
2. Прокрути вниз до **"Your apps"**
3. Нажми кнопку **"</>"** (Web) чтобы добавить веб-приложение
4. Введи название: `admin` → нажми **"Register app"**
5. Появится блок с конфигом вида:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "global-bali-home.firebaseapp.com",
  projectId: "global-bali-home",
  storageBucket: "global-bali-home.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

6. Скопируй 3 значения: **apiKey**, **authDomain**, **projectId**

### 1.5 Вставить конфиг в admin.js

Открой файл `admin/admin.js` и замени строки 12-16:

**Было:**
```javascript
const FIREBASE_CONFIG = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID'
};
```

**Стало** (пример):
```javascript
const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyD...',
  authDomain: 'global-bali-home.firebaseapp.com',
  projectId: 'global-bali-home'
};
```

### 1.6 (Рекомендуется) Ограничить домен

1. В Firebase Console → **Authentication** → **Settings** → вкладка **"Authorized domains"**
2. Убедись что в списке есть:
   - `localhost` (для локальной разработки)
   - `winstik13.github.io` (для продакшена)
3. Удали все лишние домены, если они есть

Это значит что логин будет работать только с твоего сайта.

---

## Шаг 2: Создать GitHub Personal Access Token

PAT нужен чтобы админ-панель могла записывать изменения в репозиторий через GitHub API.

### 2.1 Создать Fine-grained token

1. Открой https://github.com/settings/tokens?type=beta
2. Нажми **"Generate new token"**
3. Заполни:
   - **Token name:** `Admin Panel` (или любое)
   - **Expiration:** `90 days` (через 90 дней нужно будет создать новый)
   - **Repository access:** выбери **"Only select repositories"** → найди и выбери `winstik13/global-bali-home`
4. В разделе **"Permissions"** → **"Repository permissions"**:
   - **Contents:** установи **"Read and write"**
   - Все остальные оставь как есть (No access)
5. Нажми **"Generate token"**
6. **Скопируй токен** (он начинается с `github_pat_...`)

**ВАЖНО:** Токен показывается только один раз. Сохрани его в надёжном месте (менеджер паролей, заметки).

### 2.2 Где использовать токен

Токен НЕ хранится в коде. Ты введёшь его в админ-панели при первом входе:

1. Открой админ-панель → войди через email/пароль
2. Появится экран **"GitHub Access"** → вставь токен
3. Поставь галочку **"Remember on this device"** чтобы не вводить каждый раз
4. Нажми **"Connect"**

Токен сохранится в localStorage твоего браузера (защищён логином Firebase).

### 2.3 Когда токен истечёт

Через 90 дней (или другой срок, который ты выбрал):
1. Админ-панель покажет ошибку при попытке публикации
2. Создай новый токен (повтори шаг 2.1)
3. В админ-панели нажми **"Sign Out"** → войди заново → введи новый токен

---

## Шаг 3: Проверить что всё работает

### 3.1 Локальная проверка сайта

1. Открой `project-serenity-villas.html` в браузере
2. Убедись что таблица юнитов, availability bar и hero-stats отображаются как раньше
3. Проверь другие страницы проектов и `index.html`

### 3.2 Проверить админ-панель

1. Открой `admin/index.html` в браузере (или через Live Server)
2. Войди с email и паролем из шага 1.3
3. Введи GitHub PAT из шага 2.1
4. Попробуй:
   - Изменить статус юнита (Available → Booked)
   - Нажать **"Publish Changes"**
   - Через 1-2 минуты проверить сайт — данные должны обновиться

### 3.3 Задеплоить

```bash
git add -A
git commit -m "Add admin panel with Firebase Auth + data layer"
git push
```

После пуша:
- Сайт обновится на https://winstik13.github.io/global-bali-home/
- Админ-панель будет доступна по: https://winstik13.github.io/global-bali-home/admin/

---

## Структура файлов

```
admin/
  index.html      — HTML админ-панели (логин + SPA)
  admin.css       — стили (тёмная тема сайта)
  admin.js        — логика (Firebase Auth + GitHub API + редакторы)
  SETUP.md        — этот файл

data/
  projects-data.js — данные всех проектов (единый источник правды)
```

---

## FAQ

**Q: Firebase apiKey виден в публичном коде — это безопасно?**
A: Да. Firebase apiKey — это идентификатор проекта (как публичный ключ), а не секрет. Без знания email+пароля войти невозможно. Дополнительно: без GitHub PAT нельзя записать ни одного файла.

**Q: Что если я забуду пароль Firebase?**
A: Можно сбросить в Firebase Console → Authentication → Users → найди пользователя → Reset password. Или добавь нового пользователя.

**Q: Что если потеряю GitHub PAT?**
A: Создай новый (шаг 2.1). Старый токен можно отозвать в настройках GitHub.

**Q: Можно ли дать доступ другому человеку?**
A: Да. Добавь нового пользователя в Firebase (шаг 1.3). GitHub PAT у каждого свой — или один общий.

**Q: Почему изменения появляются через 1-2 минуты?**
A: GitHub Pages обновляется после каждого коммита. Кэш обычно обновляется за 1-2 минуты.

**Q: Что если JS не загрузится у посетителя?**
A: В HTML сохранён fallback-контент (захардкоженные данные). Посетитель увидит информацию, пусть и не самую свежую.
