// Inputmask
import Inputmask from 'inputmask';

// ymapsTouchScroll
import ymapsTouchScroll from 'ymaps-touch-scroll'

// let mobile = window.matchMedia('(min-width: 0px) and (max-width: 1159px)');
// let desktop = window.matchMedia('(min-width: 1160px)');
// usage mobile.matches === true | false

const burger = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    // const mobileHeader = document.querySelector('.js-header-nav-menu');
    const mobileHeader = document.querySelector('.js-header');
    
    menuToggle.addEventListener('click', () => {
        const isOpened = menuToggle.getAttribute('aria-expanded') === "true";
        document.body.classList.toggle('noscroll')
        isOpened ? closeMenu() : openMenu();
    });
    
    function openMenu() {
        menuToggle.setAttribute('aria-expanded', "true");
        mobileHeader.setAttribute('data-state', "opened");
    }
    function closeMenu() {
        menuToggle.setAttribute('aria-expanded', "false");
        mobileHeader.setAttribute('data-state', "closing");
        
        mobileHeader.addEventListener('animationend', () => {
            mobileHeader.setAttribute('data-state', "closed");
        }, {once: true})
    }
}

const menuTrigger = () => {
    const triggerBtns = document.querySelectorAll('.js-menu-trigger'),
          popup = document.querySelector('.header__menu'),
          backdrop = document.querySelector('.js-backdrop')
    if(triggerBtns.length > 0 && popup){
        triggerBtns.forEach(btn=>btn.addEventListener('click',()=>{
            popup.classList.toggle('active')
            backdrop.classList.toggle('active')
        }))
    }
}

let oldScrollY = 0;
const scrollTopHeader = () => {
	let header = document.querySelector('header')
	if (document.documentElement.scrollTop < 5) {
		header.classList.remove('mod-fixed')
		// header.classList.remove('mod-blue-bg')
	} else {
		if (document.documentElement.scrollTop > 130) {
			header.classList.add('mod-fixed')
			// header.classList.add('mod-blue-bg')
		}
		let scrolled = window.scrollY || document.documentElement.scrollTop
		let dY = scrolled - oldScrollY

		if (dY < 0) {
			header.classList.add('mod-backscroll')
		} else {
			header.classList.remove('mod-backscroll')
		}

        if(scrolled > oldScrollY){
            scrolled = scrolled - 30
        } else {
            scrolled = scrolled + 30
        }
		oldScrollY = scrolled;
	}
}

// Пример подключения swiper'а
const exampleSlider = () => {
    if(document.querySelector('.js-example-swiper')){
        // Подключение стрелок навигации, если они лежат не в контейнере слайдера
        let prevArrow = document.querySelector('.js-example-prev')
        let nextArrow = document.querySelector('.js-example-next')
        const exampleSwiper = new Swiper('.js-example-swiper', {
            slidesPerView: 1.2, // Кол-во слайдов для показа
            spaceBetween: 20, // Расстояние между слайдами
            speed: 800, // Скорость переключения слайдера
            loop: false, // Зациклить слайдер
            slideToClickedSlide: true, // Перелистывание на слайд по клику
            simulateTouch: false, // Иммитировать перелистывание на ПК
            navigation: { // Навигация
				nextEl: '.js-example-next',
				prevEl: '.js-example-prev',
			},
	        breakpoints: { // Адаптивы
				744: {
					slidesPerView: 2.2,
				},
                1220: {
                    slidesPerView: 4,
                },
                1650: {
                    slidesPerView: 5,
                }
	        },
            pagination: { // Кастомная пагинация
                el: '.js-example-pagination',
                type: 'bullets',
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + (index + 1) + '</span>';
                }
            },
            effect: 'fade', // Эффект переключения слайдов
            fadeEffect: {
                crossFade: true // Видимость задних элементов при переключении слайда
            },
        });
    }
}

// Переключение слайдов по ховеру на определенную область
const projectItemSlider = () => {
    if(document.querySelector('.js-project-item-swiper')){
        let projectItemSwiper = new Swiper('.js-project-item-swiper', {
            slidesPerView: 1,
            spaceBetween: 10,
            speed: 800,
            loop: true,
            pagination: {
				el: '.js-project-item-pagination',
			},
        });

        // Проверяем ширину браузера больше 1280 и возможность клиента сделать ховер
        if(document.documentElement.clientWidth > 1280 && !global.matchMedia('(hover: none)').matches) {
            let allSliders = document.querySelectorAll('.js-project-item-swiper')
            if(allSliders.length > 0 && true) {
                allSliders.forEach(slider => {
                    slider.addEventListener('mousemove', (e)=> {

                        // Положение слайдера на странице
                        let sliderPos = slider.getBoundingClientRect()
                        let slider_left = sliderPos.left

                        // Положение курсора внутри слайдера по оси X
                        let x_letter = e.pageX - slider_left

                        // Узнаем кол-во слайдов
                        let length = slider.querySelectorAll('.swiper-slide').length

                        // Узнаем ширину блока
                        let width = slider.offsetWidth

                        let go_to_slide = Math.ceil(( x_letter * length ) / width)

                        if ( go_to_slide < 1 ) {
                            go_to_slide = 1
                        }

                        go_to_slide = go_to_slide - 1; // Отсчет слайдеров начинается с 0 (то есть первый слайд = 0)

                        slider.swiper.slideTo(go_to_slide, 1000, false)
                    })
                })
            }
        }
    }
}

// Кастомный input для файлов
const inputTypeFile = () => {
    let inputsArr = document.querySelectorAll('input[type="file"]'),
        allowedImagesExtension = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png','image/bmp']

    if(inputsArr.length > 0) {
        inputsArr.forEach(input=>input.addEventListener('change',()=> {
            
            let currentBtn = input.nextElementSibling || input.parentElement.nextElementSibling

            if(input.files.length > 1){
                let fileNamesString = ''
                Array.from(input.files).forEach((file,i) => {
                    if(allowedImagesExtension.indexOf(file.type)>-1) {
                        if(i > 0)
                            fileNamesString += ', '
                        fileNamesString += file.name
                    } else {
                        alert('Недопустимый формат файла! Загрузите файл с расширением pdf, jpg/jpeg, png или bmp')
                        return
                    }
                })
                currentBtn.innerText = fileNamesString
            } else {
                let currentFile = input.files[0],
                    currentFileType = currentFile.type,
                    currentFileName = currentFile.name

                if(!currentFile)
                    return

                if(allowedImagesExtension.indexOf(currentFileType)>-1) {
                    currentBtn.innerText = currentFileName
                } else {
                    alert('Недопустимый формат файла! Загрузите файл с расширением pdf, jpg/jpeg, png или bmp')
                }
            }
        }))
    }
}

// Аккордеон
const accordion = () => {
	const accordionList = document.querySelectorAll('.js-accordion-item')
	if (accordionList.length) {
		accordionList.forEach(item => item.addEventListener('click', (e) => {
			let target = e.target
			if (target.closest('.accordion__item-head')) {
				if (item.classList.contains('active')) {
					item.classList.remove('active')
				} else {
					item.classList.add('active');
				}
			}
		}))
	}
}
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
// Маска телефона РФ
const inputMask = () => {
    let inputTel = document.querySelectorAll('input[type="tel"]')
    if(inputTel.length){
        inputTel.forEach(input=>{
            Inputmask("+7 (999) 999-99-99", {showMaskOnHover: false}).mask(input);
        })
    }
}

// Пример работы Contact Form 7
const cf7 = () => {
    // Всплывающее окно при успешной отправке формы
    document.addEventListener( 'wpcf7mailsent', function( event ) {
        Fancybox.close();
        Fancybox.show([{ 
            dragToClose: false,
            src: "#popup-thanks", 
            type: "inline",
        }]);
	})

    // Обнуляем данные после успешной отправке формы
    function getCurrentFileInput(form){
		let currentForm = document.querySelector(form)
		return currentForm.querySelector('.btn--clip-icon')
	}
    document.addEventListener( 'wpcf7mailsent', function( event ) {
        let currentFileInput = getCurrentFileInput(event.detail.apiResponse.into)
        currentFileInput.innerText = 'Прикрепите шильдик'
    })
}

const appHeight = () => {
    document.documentElement.style.setProperty('--safari-100-vh', `${window.innerHeight}px`)
}

document.addEventListener('DOMContentLoaded', ()=>{
    appHeight()

    // Burger init
	// burger()

    // menuTrigger()

    scrollTopHeader()

    ymapsRender()

    // cf7()

    accordion()

	// https://fancyapps.com/fancybox/api/methods/
	Fancybox.bind("[data-fancybox]", {
		closeButton: true,
		dragToClose: false,
        compact: true,
        preload: true,
	});

    // Fancybox.show([{
	// 	dragToClose: false,
	// 	src: "#popup-thanks",
	// 	type: "inline",
	// }]);

    if(document.documentElement.clientWidth <= 1220) {

    }
})

window.addEventListener('resize', () => {

})

window.addEventListener('scroll', function () {
    // Scroll header
    scrollTopHeader()
})