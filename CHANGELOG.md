# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.0] - Initial Release

### Added
- Базовая настройка Webpack (`webpack.config.js`)
- Настройка Babel (`.babelrc`) для транспиляции ES6+
- Файл `package.json` с основными зависимостями
- Точка входа `src/index.js` и тестовый модуль `src/some.js`
- Базовый `index.html`

---

## [1.1]

### Added
- Подключён CSS: `src/css/main.css`

---

## [2.0]

### Added
- Поддержка SASS: `src/sass/main.sass`
- Вторая HTML-страница для тестирования многостраничности: `src/extra-file.html`

---

## [3.0]

### Added
- Добавлены тестовые изображения в `src/images/`

---

## [4.0]

### Changed
- **Рефакторинг структуры проекта:**
  - `index.html` → `src/index.html`
  - `src/*.js` → `src/js/*.js`
  - `src/sass/` → `src/styles/`

### Removed
- Удалён `src/css/main.css` (полный переход на SASS)

### Added
- Подключён шрифт `Montserrat-Regular.ttf`

---

## [5.0] - [5.2]

### Added
- Тестовые изображения и SVG-иконки для отладки сборки

### Removed
- Очистка тестовых файлов (`OwlGrid.jpg` и др.)

---

## [6.0] - Modular Webpack Config

### Changed
- **Разделение `webpack.config.js` на модули:**
  - `config/common.js` — общие настройки
  - `config/dev.js` — настройки для разработки
  - `config/prod.js` — настройки для продакшена
  - `config/analyze.js` — настройка bundle-analyzer
  - `config/paths.js` — пути к директориям

### Removed
- Удалён единый `webpack.config.js`

---

## [6.1]

### Added
- Базовые SASS-файлы для архитектуры стилей:
  - `_grid.sass` — сетка
  - `_layout.sass` — лейаут
  - `_mixins.sass` — миксины

---

## [6.2]

### Changed
- Небольшие правки в конфигурации

---

## [6.3]

### Added
- Шрифты **GothamPro** (woff, woff2) — Black, Bold, Light, Regular
- Большой набор изображений для вёрстки макета

### Removed
- Удалён шрифт `Montserrat-Regular.ttf`
- Удалены старые тестовые изображения
- Удалён `src/extra-file.html` и `src/js/some.js`

---

## [6.4]

### Added
- Дополнительные изображения для макета (`main-banner-mobile1.jpg`, `specialists.png`, `tariff-bg.png`)

---

## [6.5]

### Changed
- Полная замена набора изображений макета

### Removed
- Удалены шрифты **GothamPro**

### Added
- Компонент UI-стилей: `src/styles/base/_ui.sass`

---

## [7.0] - FontAwesome & Multi-page Structure

### Added
- **FontAwesome** — полный набор шрифтов (brands, light, regular, solid) в форматах eot, svg, ttf, woff, woff2
- Подключение FontAwesome: `_fontawesome.scss`, `all.min.css`
- Новые HTML-страницы: `info.html`, `info-inner.html`, `news.html`, `news-inner.html`
- **Компонентная структура стилей:**
  - `components/_breadcrumbs.sass`
  - `components/_footer.sass`
  - `components/_header.sass`
- **Структура страниц:**
  - `pages/_info.sass`
  - `pages/_main.sass`
  - `pages/_news.sass`
- Общий файл стилей: `common.sass`

### Removed
- Удалён `src/styles/base/_ui.sass`

---

## [7.1]

### Changed
- Небольшие правки конфигурации

---

## [8.0] - Hotel/Restaurant Layout

### Added
- Новый макет (отель/ресторан) — страницы:
  - `banquet.html`, `business.html`, `contacts.html`
  - `restaurant.html`, `rooms.html`, `sales.html`, `spa.html`
- Стили для новых страниц: `_banquet`, `_business`, `_contacts`, `_restaurant`, `_rooms`, `_sales`, `_spa`

### Removed
- Удалены все шрифты **FontAwesome** (webfonts)
- Удалены старые страницы: `info`, `info-inner`, `news`, `news-inner`
- Удалены компоненты `_breadcrumbs` и стили `_info`, `_news`

---

## [8.1] - [8.2]

### Changed
- Эксперименты с конфигом (создание и удаление копии `common.js`)

### Removed
- Полная очистка макета отеля — удалены все HTML-страницы и связанные стили
- Проект возвращён к чистому состоянию

---

## [9.0] - Knowledge/Portfolio Layout

### Added
- Шрифт **Fungis** (woff, woff2)
- Новые страницы: `knowledge.html`, `knowledge-inner.html`, `portfolio.html`, `portfolio-inner.html`, `policy.html`
- **Компоненты:**
  - `_btn.sass`, `_form.sass`, `_popup.sass`
  - `_strong_testimonials.sass`
  - `develop_only/_rating_form.sass`, `develop_only/_testimonials_form.sass`
- Переменные цветов: `base/_colors.scss`
- Стили страниц: `_home`, `_knowledges`, `_knowledges-inner`, `_policy`, `_portfolio`, `_portfolio-inner`
- Компонент `_breadcrumbs.sass` (возвращён)

### Changed
- Переименован `_main.sass` → `_home.sass`

---

## [10.0] - E-commerce Layout (Major Update)

### Added
- **Масштабное обновление — полноценный e-commerce макет:**
- Страницы: `404`, `about`, `account-main`, `account-orders`, `articles`, `articles-inner`, `cart`, `catalog`, `catalog-category`, `catalog-subcategory`, `contacts`, `delivery`, `enter`, `faq`, `order`, `order-success`, `product`, `public_offer`, `registration`, `search`, `wishlist`
- **Большой набор SVG-иконок** для UI (корзина, поиск, пользователь, соцсети, стрелки и др.)
- **Компоненты:**
  - `_filter.sass` — фильтр каталога
  - `_forms.sass` — формы (вместо `_form.sass`)
  - `_pagination.sass` — пагинация
- Стили для всех новых страниц

### Removed
- Удалён шрифт **Fungis**
- Удалены старые страницы: `knowledge`, `portfolio`, `policy`
- Удалён FontAwesome (`_fontawesome.scss`, `all.min.css`)
- Удалены компоненты: `_form.sass`, `_strong_testimonials.sass`, `develop_only/*`

---

## [10.1]

### Changed
- Небольшие правки (3 файла)

---

## [11.0] - Cleanup & Preparation for PUG

### Added
- Переменные SASS: `base/_variables.sass`
- Новый entry-point для стилей: `styles/index.sass` (вместо `main.sass`)
- Страница `reviews.html` и её стили `_reviews.sass`
- Новые SVG-иконки (`arrow-left`, `chevrons-down`, `star-active`, `star-inactive`, `success-icon`)

### Removed
- **Полная очистка e-commerce макета:**
  - Удалены все HTML-страницы (404, about, account, cart, catalog, contacts, delivery, enter, order, policy, product, public_offer, registration, search, wishlist)
  - Удалены все компоненты (`_breadcrumbs`, `_btn`, `_filter`, `_footer`, `_forms`, `_header`, `_pagination`, `_popup`)
  - Удалены все стили страниц
- Удалены все изображения e-commerce макета

---

## [12.0] - Migration to PUG

### Added
- **Переход на шаблонизатор PUG:**
  - `index.html` → `index.pug`
  - `faq.html` → `faq.pug`
- **Компоненты PUG:**
  - `components/_header.pug`
  - `components/_footer.pug`
- **Папка `include/` с базовыми миксинами и подключениями:**
  - `_css.pug`, `_js.pug`, `_layout.pug`, `_mixins.pug`
- Компонент `_header.sass`

### Changed
- Переименован `base/_variables.sass` → `base/_breakpoints.sass`

### Removed
- Удалены файлы IDE (`.idea/`)
- Удалены `reviews.html` и `_reviews.sass`

---

## [12.1]

### Changed
- Небольшие правки (7 файлов)

---

## [12.2] - Pure PUG Setup

### Added
- `.gitignore`
- Компонент `components/_popup.pug`
- Шрифты: **Gilroy-Regular**, **Manrope-Regular** (woff, woff2)
- Адаптивные hero-изображения: `hero_360.jpg`, `hero_744.jpg`, `hero_1280.jpg`, `hero_1600.jpg`
- Набор SVG-иконок (email, facebook, instagram, phone, tg, wa, youtube и др.)
- **Новый entry-point JS:** `js/app.js` (вместо `index.js`)
- **Компоненты:**
  - `_btns.sass`, `_burger.sass`, `_cf7.sass` (Contact Form 7)
  - `_footer.sass`, `_popup.sass`, `_swiper.sass`
- Страница `_home.sass`

### Removed
- Удалён `faq.pug` и `_faq.sass`
- Удалён `js/index.js`

---

## [12.3] - MultiPage Components

### Added
- **Многостраничный макет (CMS-структура):**
  - Страницы: `about`, `basket`, `catalog`, `catalog-category`, `catalog-element`, `contacts`, `delivery`, `favourite`, `guarantee`, `info`, `info-element`, `order`, `partnership`, `payment`, `search`
- **Компоненты PUG:**
  - `_breadcrumbs.pug`, `_catalog-item.pug`, `_info-item.pug`
  - `_pagination.pug`, `_static-form.pug`
- Шрифты **Manrope** (Bold, Medium, Semibold)
- Папка `images/CMS/` с контентными изображениями
- Видео `about_video.mp4` и постер
- **Компоненты стилей:**
  - `_breadcrumbs.sass`, `_forms.sass`, `_pagination.sass`
- **Стили страниц:**
  - `_about`, `_catalog`, `_checkout`, `_contacts`, `_info`, `_order`, `_standart_page`

### Removed
- Удалён шрифт **Gilroy-Regular**

---

## [12.4]

### Added
- Компонент `_bitrix.sass` — стили для интеграции с Bitrix CMS

### Changed
- Рефакторинг переменных

---

## [13.0] - Pure Template & New Variables

### Added
- Страницы: `404.pug`, `faq.pug`
- Новый include: `_settings.pug`
- Hero-слайдер: `CMS/hero_slider_1-4.jpg`
- Новые иконки: `icon_arrow_down_thin`, `icon_arrow_right`, `icon_cross`, `icon_cross_white`, `icon_eye`, `icon_not_eye`, `icon_favorites`, `icon_image_zoom`, `icon_telegram`, `icon_vk`, `icon_whatsapp`, `icon_youtbe`
- Логотипы: `logo_black.svg`, `logo_white.svg`
- Страницы стилей: `_faq.sass`, `_page_404.sass`

### Removed
- Удалены страницы: `about`, `basket`, `catalog`, `catalog-category`, `catalog-element`, `delivery`, `favourite`, `guarantee`, `info`, `info-element`, `order`, `partnership`, `payment`, `search`
- Удалены компоненты: `_catalog-item`, `_info-item`, `_static-form`
- Удалены шрифты **Manrope**
- Удалено видео `about_video.mp4`
- Удалены старые стили страниц: `_about`, `_catalog`, `_checkout`, `_info`, `_order`, `_standart_page`

---

## [13.1] - Components Update & Fixes

### Added
- Страницы: `about`, `articles`, `articles-element`, `catalog-element`, `catalog-section`, `delivery`, `manufacturers`, `manufacturers-element`
- Компоненты: `_articles-item.pug`, `_catalog-item.pug`, `_popup-form.pug`, `_static-form.pug`
- Шрифт **RoadRadio-Bold**
- Папка `CMS/` с новым контентом (блог, каталог, производители, партнёры)
- **Компоненты стилей:**
  - `_blog_item.sass`, `_catalog_item.sass`, `_marquee.sass`
- **Стили страниц:**
  - `_about`, `_articles`, `_catalog`, `_delivery`, `_manufacturers`

### Removed
- Удалена страница `faq.pug` и `_faq.sass`
- Удалена `404.png`

---

## [14.0] - Accordion, Dropdown & JS Refactor

### Added
- Компонент `components/_accordion.pug`
- Компоненты стилей: `_accordion.sass`, `_dropdown.sass`

### Changed
- Переименован `_popup.pug` → `_popups.pug`
- Рефакторинг JavaScript

### Removed
- Удалены страницы: `about`, `articles`, `articles-element`, `delivery`, `manufacturers`, `manufacturers-element`
- Удалены компоненты: `_articles-item`, `_blog_item.sass`
- Удалены стили страниц: `_about`, `_articles`, `_delivery`, `_manufacturers`

---

## [15.0] - Separate CSS & JS

### Added
- Разделение стилей на модули:
  - `styles/base.sass`
  - `styles/cms.sass`
  - `styles/components.sass`
  - `styles/pages.sass`
- Отдельный JS-файл для карты: `js/map.js`

---

## [15.1]

### Changed
- Обновление плагинов

---

## [16.0] - PostCSS Sort Media Queries

### Added
- Конфигурация PostCSS: `postcss.config.js`
- Favicon: `logo.svg`

---

## [16.1] - Pure Template & New Mixins

### Added
- Страницы: `ajax.pug`, `example.pug`
- Компонент `_example-item.pug`
- Favicon: `images/favicon.svg`
- Компонент стилей `_rating.sass`
- Базовые утилиты: `base/_utils.sass`
- JS для примера: `js/example.js`
- Иконка `icon_star.svg`, `icon_arrow_down.svg`

### Changed
- Переименован `_catalog_item.sass` → `_example_item.sass`

### Removed
- Удалены страницы `catalog-element`, `catalog-section`
- Удалён компонент `_catalog-item.pug`
- Удалён шрифт **RoadRadio-Bold**
- Удалены стили `_catalog.sass`

---

## [16.2]

### Changed
- Обновление pug-плагина и пакетов

---

## [16.3] - News Module & Mixins

### Added
- Компонент `_news-item.pug`
- Страницы: `news.pug`, `news-detail.pug`
- Компонент стилей `_news.sass`

### Changed
- Обновление плагинов, добавление миксинов, рефакторинг стартовой точки

---

## [16.4]

### Added
- CSS-класс `overflow-x-auto`

### Changed
- Обновление плагинов

---

## [16.5]

### Changed
- Обновление **Swiper** до версии 12

---

## [16.6]

### Added
- URL для breadcrumbs
- Debug-инструменты

### Changed
- Обновление плагинов

---

## [17.0] - Filter, Tabs & Icons Reorganization

### Added
- Компоненты PUG: `_filter-catalog.pug`, `_tabs.pug`
- JS-модуль `input_fix.js` (фикс инпутов)
- Компоненты стилей: `_filter.sass`, `_tabs.sass`
- Иконки для password toggler: `icon_eye.svg`, `icon_not_eye.svg`

### Changed
- **Перемещение иконок в папку `example/`:**
  - `icon_arrow_down`, `icon_breadcrumb_arrow`, `icon_clip`, `icon_close`, `icon_cross_black`, `icon_search`, `icon_search_grey`, `icon_star`, `icon_tick`, `logo`, `no_photo`, `no_photo_grey`

---

## [17.1]

### Changed
- Сброс стилей лейаута (layout reset style wipe)

---

## [17.2] - Components Refactor

### Changed
- **Рефакторинг именования компонентов:**
  - `_static-form.pug` → `_form-static.pug`
  - `_news-item.pug` → `_item-news.pug`
- Новый компонент: `_item-example.pug`
- Удалён `_example-item.pug`

### Changed
- Обновление плагинов

---

## [17.3]

### Changed
- Обновление **pug-плагина**
- Обновление **Swiper** до версии 14

---

## [18.0] - SVG Sprite, Mutual-Exclusive UI & Form Validation

### Added
- Генерация единого SVG-спрайта средствами webpack — иконки больше не дублируются инлайном на каждой странице, а собираются в один файл на этапе сборки
- Взаимоисключающее поведение UI-блоков: открытие бургер-меню автоматически закрывает поиск и наоборот
- Более надёжная валидация форм — плавное появление текста ошибки, поддержка нативной браузерной валидации, доработанная маска телефона под данные из Битрикса
- Хлебные крошки объединены с заголовком страницы в единый компонент, добавлена микроразметка Schema.org
- Централизованные тестовые данные и вспомогательные утилиты (склонение числительных, debug-вывод) для example-страницы

### Changed
- Компоненты карточек и аккордеона переведены на единый формат настроек через объект вместо отдельных параметров
- Иконки по всему проекту переведены с инлайн-SVG на использование спрайта
- Обновлены Swiper и зависимости сборки

### Removed
- Старый механизм инлайн-подключения SVG-иконок
- Дублирующийся компонент карточки новости — переиспользуется общий компонент карточки
- Неиспользуемые стили и один из вариантов вёрстки формы

---