import $ from 'jQuery'

import Swiper, { Navigation, Pagination, Autoplay, Scrollbar, FreeMode, Thumbs } from 'swiper'
// import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'
import 'normalize.css/normalize.css'

import WOW from 'wow.js'
import 'wow.js/css/libs/animate.css'

import ymapsTouchScroll from 'ymaps-touch-scroll'

// Fancybox
window.jQuery = window.$ = $
require("@fancyapps/fancybox/dist/jquery.fancybox");
// import { Fancybox, Carousel, Panzoom } from "@fancyapps/fancybox"
import "@fancyapps/fancybox/dist/jquery.fancybox.min.css"
// https://stackoverflow.com/questions/46922181/how-to-use-fancybox-with-webpack

import Inputmask from "inputmask"

import '../styles/main.sass';

const header = document.querySelector('.js-header')
const container = document.querySelector('.container')
const scrollToTopBtn = document.querySelector('.js-scroll-top')

const burger = () => {
    const burger = document.querySelector('.js-burger')

    if (document.documentElement.clientWidth < 1200) {
        if (header.offsetHeight > 120 && !header.classList.contains('mod--menu-open')) {
            header.style.height = '76px'
        }

        burger.onclick = () => {
            if (header.classList.contains('mod--menu-open')) {
                $('.js-header').animate({ 'height': '76px' }, 500)
                // header.style.height = '76px'
                setTimeout(() => {
                    header.classList.remove('mod--menu-open')
                }, 600)
            } else {
                $('.js-header').animate({ 'height': '100vh' }, 500)
                // header.style.height = '100vh'
                header.classList.add('mod--menu-open')
            }
            burger.classList.toggle('header__burger--change')
            document.body.classList.toggle('mod-noscroll');
            // $('body').toggleClass('mod-noscroll');
        };
    } else {
        if (header.classList.contains('mod--menu-open')) {
            burger.classList.remove('header__burger--change')
            header.classList.remove('mod--menu-open')
        }
        if (header.offsetHeight == 76 || header.classList.contains('mod--menu-open')) {
            header.style.height = '121px'
        }
    }
}

let oldScrollY = 0;
const scrollTopHeader = () => {
    if (document.documentElement.scrollTop < 5) {
        header.classList.remove('mod-fixed')
        header.classList.remove('mod-white-bg')
    } else {
        if (document.documentElement.scrollTop > 130) {
            header.classList.add('mod-fixed')
            header.classList.add('mod-white-bg')
        }
        let scrolled = window.pageYOffset || document.documentElement.scrollTop
        let dY = scrolled - oldScrollY
        if (dY < 0) {
            header.classList.add('mod-backscroll')
        } else {
            header.classList.remove('mod-backscroll')
        }
        oldScrollY = scrolled;
    }
}

const tabToggle = (t) => {
    let target = t.target.closest('.js-likes-toggler'),
        tab = t.target.closest('.likes__item'),
        hiddenContent = tab.querySelector('.js-hidden-content')
    if (document.documentElement.clientWidth < 768) {
        tab.classList.toggle('likes__item--active')
        $(hiddenContent).slideToggle(300)
    }
}

const roomSlider = () => {
    if (document.querySelector('.js-rooms-swiper')) {
        const roomSwiper = new Swiper('.js-rooms-swiper', {
            modules: [Navigation, Pagination],
            // Optional parameters
            direction: 'horizontal',
            // https://github.com/nolimits4web/swiper/issues/2629
            loop: false,
            simulateTouch: true,
            grabCursor: true,
            slidesPerView: 1,
            speed: 800,
            // longSwipes: false,
            // longSwipesRatio: 0.1,
            // Navigation arrows
            navigation: {
                nextEl: '.js-rooms-next',
                prevEl: '.js-rooms-prev',
            },
            // Pagination arrows
            pagination: {
                el: '.js-rooms-pagination',
                type: 'fraction',
                clickable: true,
            },
        });
    }
}

const conferenceBusinessSlider = () => {
    if (document.querySelector('.js-conference-business-swiper')) {

        let style = container.currentStyle || window.getComputedStyle(container),
            spaceBetween = parseFloat(style.marginLeft) * 2 + 60
            // spaceBetween = parseFloat(style.marginLeft) * 2 + 40

        spaceBetween = spaceBetween == 40 ? 60 : spaceBetween

        const conferenceSwiper = new Swiper('.js-conference-business-swiper', {
            modules: [Navigation],
            // Optional parameters
            direction: 'horizontal',
            loop: true,
            simulateTouch: true,
            grabCursor: true,
            slidesPerView: 1,
            spaceBetween: spaceBetween,
            speed: 800,
            // Navigation arrows
            navigation: {
                nextEl: '.js-conference-business-next',
                prevEl: '.js-conference-business-prev',
            },
            lazy: {
            	loadPrevNext: true,
            	loadPrevNextAmount: 2
            }
        });
    }
}

const banquetSlider = () => {
    if (document.querySelector('.js-banquet-slider-swiper')) {

        let style = container.currentStyle || window.getComputedStyle(container),
            spaceBetween = parseFloat(style.marginLeft) * 2 + 60
            // spaceBetween = parseFloat(style.marginLeft) * 2 + 40

        spaceBetween = spaceBetween == 40 ? 60 : spaceBetween

        const banquetSwiper = new Swiper('.js-banquet-slider-swiper', {
            modules: [Navigation],
            // Optional parameters
            direction: 'horizontal',
            loop: true,
            simulateTouch: true,
            grabCursor: true,
            slidesPerView: 1,
            spaceBetween: spaceBetween,
            speed: 800,
            // Navigation arrows
            navigation: {
                nextEl: '.js-banquet-slider-next',
                prevEl: '.js-banquet-slider-prev',
            },
            lazy: {
            	loadPrevNext: true,
            	loadPrevNextAmount: 2
            }
        });
    }
}

const spaSlider = () => {
    if (document.querySelector('.js-spa-slider-swiper')) {

        let style = container.currentStyle || window.getComputedStyle(container),
            spaceBetween = parseFloat(style.marginLeft) * 2 + 60
            // spaceBetween = parseFloat(style.marginLeft) * 2 + 40

        spaceBetween = spaceBetween == 40 ? 60 : spaceBetween

        const spaSwiper = new Swiper('.js-spa-slider-swiper', {
            modules: [Navigation],
            // Optional parameters
            direction: 'horizontal',
            loop: true,
            simulateTouch: true,
            grabCursor: true,
            slidesPerView: 1,
            spaceBetween: spaceBetween,
            speed: 800,
            // Navigation arrows
            navigation: {
                nextEl: '.js-spa-slider-next',
                prevEl: '.js-spa-slider-prev',
            },
            lazy: {
            	loadPrevNext: true,
            	loadPrevNextAmount: 2
            }
        });
    }
}

const roomsTypeSlider = () => {
    if (document.querySelector('.js-rooms-types-swiper')) {

        const roomsTypeSwiper = new Swiper('.js-rooms-type-pagination', {
            // modules: [Pagination],
            // Optional parameters
            direction: 'horizontal',
            loop: false,
            simulateTouch: true,
            grabCursor: true,
            // slidesPerView: 2,
            slidesPerView: "auto",
            // spaceBetween: 28,
            speed: 1200,
            watchSlidesProgress: true,
            on: {
			    click() {
			        roomsTypeSwiper.slideTo(this.clickedIndex)
			    },
			},
        });

        let style = container.currentStyle || window.getComputedStyle(container),
            spaceBetween = parseFloat(style.marginLeft) * 2 + 60
            // spaceBetween = parseFloat(style.marginLeft) * 2 + 40

        spaceBetween = spaceBetween == 40 ? 60 : spaceBetween

        const roomsDescSwiper = new Swiper('.js-rooms-types-swiper', {
            modules: [Thumbs],
            // Optional parameters
            direction: 'horizontal',
            loop: false,
            simulateTouch: true,
            grabCursor: true,
            slidesPerView: 1,
            spaceBetween: spaceBetween,
            speed: 1200,
            thumbs: {
	        	swiper: roomsTypeSwiper,
	        	slideThumbActiveClass: 'rooms-type__item--active'
	        },
        });
    }
}

const scrollTop = () => {
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo(0, 0)
        })
    }
}

const hideScrollTop = () => {
    if (document.documentElement.scrollTop > document.documentElement.clientHeight) {
        scrollToTopBtn.classList.add('scroll-top--visible')
    } else {
        scrollToTopBtn.classList.remove('scroll-top--visible')
    }
}

const ymapsRender = () => {
    let mapContainer = document.getElementById('map')
    if (mapContainer) {
        ymaps.ready(function() {

            let pl, coordArr = mapContainer.dataset.coord.split(',').map(function(item) { return parseFloat(item) });
            let companyMap = new ymaps.Map("map", {
                center: [55.765326, 37.627735],
                zoom: 10,
                controls: ['zoomControl']
            }, {
                searchControlProvider: 'yandex#search',
                suppressMapOpenBlock: true
            })
            pl = new ymaps.Placemark(coordArr, {}, {
                preset: 'islands#redDotIcon'
            })

            // Создаем многоугольник, используя вспомогательный класс Polygon.
            var myPolygon = new ymaps.Polygon([
                // Указываем координаты вершин многоугольника.
                // Координаты вершин внешнего контура.
                [
                    [45.065048, 38.993190],
                    [45.065068, 38.993487],
                    [45.064775, 38.993517],
                    [45.064758, 38.993219],
                ]
            ], {}, {
                // Задаем опции геообъекта.
                // Цвет заливки.
                fill: true,
                fillColor: '606060',
                fillOpacity: .6,
                // Ширина обводки.
                strokeWidth: 5,
                strokeColor: '606060'
            });

            companyMap.geoObjects.add(myPolygon);


            companyMap.geoObjects.add(pl)
            companyMap.setBounds(companyMap.geoObjects.getBounds(), { checkZoomRange: true }).then(function() { companyMap.setZoom(18) })
            ymapsTouchScroll(companyMap, { preventScroll: true, preventTouch: true })
        })
    }
}

// returns the cookie with the given name,
// or undefined if not found
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    })
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const cookie = () => {
    let popupBox = document.querySelector('.js-popup-cookie')

    if(popupBox) {
    	let closeBtn = popupBox.querySelectorAll('.js-btn-close'),
    		acceptBtn = popupBox.querySelector('.js-btn-accept')
	    if(!getCookie('cookieHasAccepted')){
	        setTimeout(()=> {
	            popupBox.classList.add('popup__cookie--open')	            
	        }, 2000 )
	    }
	    acceptBtn.addEventListener('click', ()=>{
	    	popupBox.classList.remove('popup--open')
	        popupBox.classList.add('popup--closed')
	        setCookie('cookieHasAccepted', '1')
	        setTimeout(()=> {popupBox.style.display = 'none'}, 400)
	    })

	    closeBtn.forEach(btn => btn.addEventListener('click', ()=>{
	        popupBox.classList.remove('popup--open')
	        popupBox.classList.add('popup--closed')
	        setTimeout(()=> {popupBox.style.display = 'none'}, 400)
	    }))
    }
}

const thanks = () => {
	let thanksBox = document.querySelector('#js-thanks-popup'),
		trigger = document.querySelector('.js-fancybox-trigger')

	if(thanksBox && trigger){
		trigger.addEventListener('click', ()=> {
			$.fancybox.open({
		        // src: '#js-thanks-popup',
		        // src: '#js-feedback-popup',
		        src: '#js-calc-popup',
		        autoFocus: false,
		        touch: false
		    });
		})
		
	}
}

const popups = () => {
	let closeBtns = document.querySelectorAll('.js-btn-close')
	closeBtns.forEach(btn => btn.addEventListener('click', ()=>{
		$.fancybox.close()
	}))
}

const identPopups = () => {
	let allBtns = document.querySelectorAll('[data-src="#js-feedback-popup"]'),
		targetInput = document.querySelector('.js-form-title');
	if(targetInput){
		if(allBtns.length){
			allBtns.forEach(btn => btn.addEventListener('click', (e)=>{
				if(e.target.dataset.title){
					targetInput.value = e.target.dataset.title;
				} else {
					targetInput.value = "";
				}
			}))
		}
	}
}

const customSelect = () => {
	let customSelects = document.querySelectorAll('.custom-select')
	if(customSelects.length > 0){
		customSelects.forEach(select=>{
			select.addEventListener('click', (e)=>{
				let intup = select.previousElementSibling.querySelector('input'),
					dropdown = select.querySelector('.js-custom-select-dropdown'),
					selectText = select.querySelector('.custom-select__name')

				if(e.target.closest('.js-custom-select-trigger')){
					select.classList.toggle('custom-select--open')
					// dropdown.classList.toggle('custom-select__bottom--active')
					$(dropdown).slideToggle(500)
				}
				if(e.target.closest('.custom-select__child')){
					select.classList.remove('custom-select--open')
					intup.value = e.target.innerText
					selectText.innerText = e.target.innerText
					// dropdown.classList.remove('custom-select__bottom--active')
					$(dropdown).slideUp(500)
				}
			})
		})
	}
}

const inputMask = () => {
	let inputData = document.querySelectorAll('input[data-date-input]')
	if(inputData.length){
		inputData.forEach(input=>{
			// Inputmask("99.99.9999", {"placeholder": "дд.мм.гггг"}).mask(input);
			Inputmask("99 . 99 . 9999", {showMaskOnHover: false}).mask(input);
			// Inputmask("99.99.9999", {jitMasking: true}).mask(input);
		})
	}

	let inputTel = document.querySelectorAll('input[type="tel"]')
	if(inputTel.length){
		inputTel.forEach(input=>{
			// Inputmask("99.99.9999", {"placeholder": "дд.мм.гггг"}).mask(input);
			Inputmask("+7 (999) 999-99-99", {showMaskOnHover: false}).mask(input);
			// Inputmask("99.99.9999", {jitMasking: true}).mask(input);
		})
	}
}

window.addEventListener('resize', () => {
    burger()
    roomSlider()
    conferenceBusinessSlider()
    banquetSlider()
    spaSlider()
    roomsTypeSlider()
})

document.addEventListener('DOMContentLoaded', () => {
    // Burger menu init
    burger()
	
	// identification popups form
	identPopups()

    window.addEventListener('scroll', () => {
        // Scroll top header
        scrollTopHeader()
        // Show|hide scrollTop button
        hideScrollTop()
    });

    // Scroll to top
    scrollTop()

    // Rooms slider
    roomSlider()

    // Conference slider
    conferenceBusinessSlider()

    // Banquet slider
    banquetSlider()

    // SPA slider
    spaSlider()

    // Rooms type slider
    roomsTypeSlider()

    // Yandex Map
    ymapsRender()

    // Cookie popup
    cookie()

    thanks()

    // Popups close event
    popups()

    // Custom selects
    customSelect()

    // Input Mask date
    inputMask()

    // Likes accordion
    let likes = document.querySelectorAll('.js-likes-toggler')
    if (likes.length) {
        likes.forEach(like => like.addEventListener('click', tabToggle))
    }

    const wow = new WOW({
        boxClass: 'wow', // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset: 0, // distance to the element when triggering the animation (default is 0)
        mobile: true, // trigger animations on mobile devices (default is true)
        live: true, // act on asynchronously loaded content (default is true)
        callback: function(box) {
            // the callback is fired every time an animation is started
            // the argument that is passed in is the DOM node being animated
        },
        scrollContainer: null, // optional scroll container selector, otherwise use window,
        resetAnimation: true, // reset animation on end (default is true)
    });
    wow.init();

	document.addEventListener( 'wpcf7submit', function( event ) {
		$.fancybox.close()
		$.fancybox.open({
	        src: '#js-thanks-popup',
	        autoFocus: false,
	        touch: false
	    });
	}, false );

})