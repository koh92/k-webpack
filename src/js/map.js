// ymapsTouchScroll
import ymapsTouchScroll from 'ymaps-touch-scroll'

// Яндекс карта
const ymapsRender = () => {
    let mapContainer = document.querySelector('.js-contacts-map')
    if (mapContainer) {
        let coordItems = mapContainer.querySelectorAll('.js-contacts-map-coord')

        if(coordItems) {
            let coordArr = [], hintArr = []
            coordItems.forEach(item => {
                coordArr.push(item.dataset.coord.split(',').map(function(item) { return parseFloat(item) }))
                hintArr.push(item.dataset.hint)
            })

            ymaps.ready(function() {
                // https://yandex.ru/dev/maps/jsbox/2.1/balloon_autopan/
                let objectBalloonLayout = ymaps.templateLayoutFactory.createClass(
                    '<div class="map-popup-wrap">' +
                    '<div class="map-popup-triangle"></div>' +
                    '<div class="map-popup">' +
                    '$[[options.contentLayout observeSize minWidth=235 maxWidth=405 maxHeight=120]]' +
                    '</div>' + '</div>'
                    )
                    
                let objectBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
                    `
                    <div class=map-popup-inner>
                        <div class=map-popup__title>
                            ${mapContainer.dataset.title}
                        </div>
                        <div class=map-popup__address>
                            ${mapContainer.dataset.address}
                        </div>
                    </div>`
                )
                
                let balloonParams = {}
                // Пример кастомной всплывашки для карты
                balloonParams = {
                    // Описание всех меток https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/option.presetStorage.html
                    balloonShadow: false,
                    hideIconOnBalloonOpen: true,
                    balloonLayout: objectBalloonLayout,
                    balloonContentLayout: objectBalloonContentLayout,
                    balloonOffset: [-140, -90],
                    iconColor: '#FF6E00',
                    balloonPanelMaxMapArea: 0,
                    // preset: 'islands#blueIcon'
                }
                balloonParams = {
                    preset: 'islands#blueIcon'
                }

                let pl
                let companyMap = new ymaps.Map("js-contacts-map", {
                    center: [55.765326, 37.627735],
                    zoom: 16,
                    controls: ['zoomControl']
                }, {
                    searchControlProvider: 'yandex#search',
                    suppressMapOpenBlock: true
                })

                for (let i = 0; i < coordArr.length; i++) {
                    pl = new ymaps.Placemark(
                        coordArr[i], 
                        { 
                            hintContent: hintArr[i]
                        }, 
                        balloonParams
                        );

                    companyMap.geoObjects.add(pl);

                    // Открываем всплывашку программно
                    // pl.balloon.open()
                }

                companyMap.setBounds(companyMap.geoObjects.getBounds(), { checkZoomRange: true }).then(function(){ if(companyMap.getZoom() > 16) companyMap.setZoom(16)} )
                ymapsTouchScroll(companyMap, { preventScroll: true, preventTouch: true })
            })
        }
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    ymapsRender()
})