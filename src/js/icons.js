// Подключает все SVG-иконки из src/images/icons/, чтобы webpack включил их в граф модулей
// и собрал в единый физический файл спрайта dist/assets/sprite.svg (режим extract).
// Никакого кода в рантайм-бандл из этого файла не попадает — это чисто build-time триггер.
// Чтобы добавить новую иконку в спрайт — просто положите .svg файл в src/images/icons/.
const iconsContext = require.context('Images/icons', false, /\.svg$/)
iconsContext.keys().forEach(iconsContext)
