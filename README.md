# Webpack Starter Template

Профессиональный стартовый шаблон для вёрстки многостраничных сайтов на базе Webpack 5. Автоматическая сборка Pug-страниц, оптимизация изображений, разделение CSS/JS и удобная модульная конфигурация.

## 🚀 Быстрый старт

```bash
# Клонирование репозитория
git clone https://github.com/ваш-username/ваш-repo.git

# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Сборка для production
npm run build

# Анализ размера бандла
npm run analyze
```

## 📦 Стек технологий

| Категория       | Технологии                                              |
|----------------|---------------------------------------------------------|
| **Сборка**      | Webpack 5, Webpack Dev Server, Webpack Bundle Analyzer  |
| **Шаблоны**     | Pug (pug-plugin)                                        |
| **Стили**       | SASS/SCSS, PostCSS (Autoprefixer, Sort Media Queries)   |
| **JavaScript**  | Babel (ES6+)                                            |
| **Библиотеки**  | Swiper, Fancybox, Inputmask, WOW.js, ymaps-touch-scroll |
| **Изображения** | imagemin (JPEG, PNG, GIF, SVG), Copy Webpack Plugin     |
| **CSS Reset**   | normalize.css                                           |

## 📁 Структура проекта

```
project/
├── config/                    # Модульная конфигурация Webpack
│   ├── common.js              # Общие настройки (entry, loaders, plugins)
│   ├── dev.js                 # Dev-сервер, HMR, source maps
│   ├── prod.js                # Минификация, оптимизация, split chunks
│   ├── analyze.js             # Bundle Analyzer
│   └── paths.js               # Пути к директориям
├── postcss.config.js          # Конфигурация PostCSS
├── src/                       # Исходные файлы
│   ├── components/            # Pug-компоненты (header, footer, popup...)
│   ├── include/               # Pug-миксины и подключения
│   │   ├── _css.pug
│   │   ├── _js.pug
│   │   ├── _layout.pug
│   │   ├── _mixins.pug
│   │   └── _settings.pug
│   ├── styles/                # SASS-стили
│   │   ├── base/              # Переменные, брейкпоинты, утилиты
│   │   ├── components/        # Стили компонентов (кнопки, формы, слайдер...)
│   │   └── pages/             # Стили отдельных страниц
│   ├── js/                    # JavaScript-модули
│   ├── images/                # Изображения и иконки
│   ├── fonts/                 # Шрифты (woff, woff2)
│   └── *.pug                  # Страницы (автоматически становятся entry points)
├── dist/                      # Готовая сборка (генерируется автоматически)
└── package.json
```

## ⚙️ Особенности

### 🔄 Автоматические entry points
Каждый `.pug` файл в `src/` автоматически становится точкой входа. Не нужно вручную добавлять новые страницы в конфиг — просто создайте `.pug` файл.

### 🧩 Модульная конфигурация Webpack
Конфиг разбит на логические модули в папке `config/`:
- `common.js` — общие настройки для dev и prod
- `dev.js` — dev-сервер с HMR и pretty HTML
- `prod.js` — оптимизация, минификация, разделение чанков
- `analyze.js` — визуальный анализ размера бандла

### 📐 Алиасы для импортов
```javascript
// Вместо относительных путей ../../images/logo.svg
import logo from 'Images/logo.svg'
import font from 'Fonts/main.woff2'
```

### 🎨 PostCSS
- **Autoprefixer** — автоматическое добавление вендорных префиксов
- **Sort Media Queries** — группировка media queries (mobile-first подход)

### 🖼 Оптимизация изображений
Автоматическая минификация при production-сборке:
- JPEG → imagemin-jpegtran
- PNG → imagemin-optipng
- GIF → imagemin-gifsicle
- SVG → imagemin-svgo

### ⚡ Performance
- **Filesystem cache** — ускорение повторных сборок (gzip-сжатие)
- **Split chunks** — разделение vendor-кода от пользовательского
- **Mini CSS Extract** — вынос CSS в отдельные файлы в production
- **Inline CSS/JS** в dev-режиме для быстрого HMR

### 🗂 Browserslist
Поддержка браузеров: `> 1.5%, not dead`

## 📜 Скрипты

| Команда         | Описание                                    |
|----------------|---------------------------------------------|
| `npm run dev`   | Запуск dev-сервера (localhost:8000) с HMR   |
| `npm run build` | Production-сборка в папку `dist/`           |
| `npm run analyze` | Визуальный анализ размера бандла          |

## 📝 Changelog

👉 **[Полный CHANGELOG](./CHANGELOG.md)**

## 👤 Автор

**Ampodistov Konstantin**

## 📄 Лицензия

ISC