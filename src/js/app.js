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

const searchTrigger = () => {
    const triggerBtns = document.querySelectorAll('.js-search-trigger'),
          popup = document.querySelector('.header__search-popup'),
          backdrop = document.querySelector('.js-backdrop')
    if(triggerBtns.length > 0 && popup){
        triggerBtns.forEach(btn=>btn.addEventListener('click',()=>{
            popup.classList.toggle('active')
            backdrop.classList.toggle('active')
        }))
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

const topSaleSlider = () => {
    if(document.querySelector('.js-top-sale-swiper')){
        const topSaleSwiper = new Swiper('.js-top-sale-swiper', {
            slidesPerView: 1.2,
            spaceBetween: 20,
            speed: 800,
            loop: false,
	        breakpoints: {
				744: {
					slidesPerView: 2.2,
				},
                1220: {
                    slidesPerView: 4,
                }
	        }
        });
    }
}

const articlesSlider = () => {
    if(document.querySelector('.js-articles-swiper')){
        const topSaleSwiper = new Swiper('.js-articles-swiper', {
            slidesPerView: 1.2,
            spaceBetween: 20,
            speed: 800,
            loop: false,
	        breakpoints: {
				744: {
					slidesPerView: 2.2,
				},
                1220: {
                    slidesPerView: 3,
                }
	        }
        });
    }
}

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

const catalogSectionCategoriesSlider = () => {
    if(document.querySelector('.js-catalog-section-categories-swiper')){
        const catalogSectionCategoriesSwiper = new Swiper('.js-catalog-section-categories-swiper', {
            slidesPerView: "auto",
            spaceBetween: 10,
            speed: 800,
            loop: false,
        });
    }
}

const setPopupTitle = () => {
    let requestBtns = document.querySelectorAll('.btn[data-src="#popup-request"]'),
        popupTitle = document.querySelector('.js-form-title'),
        productNameInput = document.querySelector('.js-product-input')
    if(requestBtns.length > 0 && popupTitle){
        requestBtns.forEach(btn=>btn.addEventListener('click',()=>{
            popupTitle.innerHTML = btn.dataset.product
            productNameInput.value = btn.dataset.product
        }))
    }
}

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
                    pl = new ymaps.Placemark(coordArr[i], { 
                        hintContent: hintArr[i]
                    }, {
                            // Описание всех меток https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/option.presetStorage.html
                            preset: 'islands#blueIcon'
                        });

                    companyMap.geoObjects.add(pl);
                }

                companyMap.setBounds(companyMap.geoObjects.getBounds(), { checkZoomRange: true }).then(function(){ if(companyMap.getZoom() > 16) companyMap.setZoom(16)} )
                ymapsTouchScroll(companyMap, { preventScroll: true, preventTouch: true })
            })
        }
    }
}

const inputMask = () => {
    let inputTel = document.querySelectorAll('input[type="tel"]')
    if(inputTel.length){
        inputTel.forEach(input=>{
            Inputmask("+7 (999) 999-99-99", {showMaskOnHover: false}).mask(input);
        })
    }
}

const cf7 = () => {
    function getCurrentFileInput(form){
		let currentForm = document.querySelector(form)
		return currentForm.querySelector('.btn--clip-icon')
	}

	document.addEventListener( 'wpcf7mailsent', function( event ) {
        Fancybox.close();
        Fancybox.show([{ 
            dragToClose: false,
            src: "#popup-thanks", 
            type: "inline",
        }]);
	})
    document.addEventListener( 'wpcf7mailsent', function( event ) {
        let currentFileInput = getCurrentFileInput(event.detail.apiResponse.into)
        currentFileInput.innerText = 'Прикрепите шильдик'
    })
}

const citizenshipAccordion = () => {
	const citizenshipList = document.querySelectorAll('.js-citizenship-item')
	if (citizenshipList.length) {
		citizenshipList.forEach(item => item.addEventListener('click', (e) => {
			let target = e.target
			if (target.closest('.citizenship__item-head')) {
				if (item.classList.contains('active')) {
					item.classList.remove('active')
				} else {
					item.classList.add('active');
				}
			}
		}))
	}
}

const appHeight = () => {
    document.documentElement.style.setProperty('--safari-100-vh', `${window.innerHeight}px`)
}

document.addEventListener('DOMContentLoaded', ()=>{
    appHeight()

    // Burger init
	// burger()

    searchTrigger()
    menuTrigger()
    scrollTopHeader()

    topSaleSlider()

    articlesSlider()

    inputTypeFile()

    setPopupTitle()

    ymapsRender()

    inputMask()

    cf7()

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
		catalogSectionCategoriesSlider()
    }
})

window.addEventListener('resize', () => {

})

window.addEventListener('scroll', function () {
    // Scroll header
    scrollTopHeader()
})