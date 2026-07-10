// Swiper
// Try to inject Swiper into _js.pug
// import Swiper, { Navigation, Pagination, Autoplay, Thumbs } from 'swiper';

// Fancybox 5
import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.umd.js';

// Inputmask
// import Inputmask from "inputmask";

// const mobile = window.matchMedia('(min-width: 0px) and (max-width: 1159px)');
// const desktop = window.matchMedia('(min-width: 1160px)');

// ymapsTouchScroll
import ymapsTouchScroll from 'ymaps-touch-scroll'

const burger = () => {
	const menuToggle = document.querySelector('.menu-toggle');
	const mobileHeader = document.querySelector('.js-header');
	
	menuToggle.addEventListener('click', () => {
		const isOpened = menuToggle.getAttribute('aria-expanded') === "true";
		document.body.classList.toggle('mod-noscroll')
		isOpened ? closeMenu() : openMenu();
	});
	
	function openMenu() {
		menuToggle.setAttribute('aria-expanded', "true");
		mobileHeader.setAttribute('data-state', "opened");
	}
	
	function closeMenu() {
		menuToggle.setAttribute('aria-expanded', "false");
		mobileHeader.setAttribute('data-state', "closed");
		// mobileHeader.setAttribute('data-state', "closing");
		
		// mobileHeader.addEventListener('animationend', () => {
		// 	mobileHeader.setAttribute('data-state', "closed");
		// }, { once: true })
	}
}

const infoSlider = () => {
	if(document.querySelector('.js-info-swiper')){
		const infoSwiper = new Swiper('.js-info-swiper', {
			grabCursor: false,
			loop: false,
			slidesPerView: 1.1,
			spaceBetween: 16,
			speed: 800,
			breakpoints: {
				744: {
					slidesPerView: 3
				},
				1024: {
					slidesPerView: 4
				},
				1160: {
					slidesPerView: 4,
					spaceBetween: 8
				}
			}
		});
	}
}

const yandexMap = () => {
	let mapContainer = document.getElementById('js-contact-map')
	if(mapContainer) {
		ymaps.ready(function() {
			let pl, companyMap, coordArr = [], rawData = mapContainer.querySelectorAll('.js-map-point')

			rawData.forEach(point => {
				coordArr.push(point.dataset.coord.split(',').map(function(item) { return parseFloat(item) }))
			})			
			
            companyMap = new ymaps.Map("js-contact-map", {
                center: [55.765326, 37.627735],
                zoom: 10,
                controls: []
            }, {
                searchControlProvider: 'yandex#search',
                suppressMapOpenBlock: true
            })

			coordArr.forEach(mapPoint => {
				pl = new ymaps.Placemark(mapPoint, {},
					{
						preset: 'islands#darkGreenDotIcon',
						// iconColor: '#07422E'
					})
				companyMap.geoObjects.add(pl)
			})

            companyMap.setBounds(companyMap.geoObjects.getBounds(), { checkZoomRange: true })
            ymapsTouchScroll(companyMap, { preventScroll: true, preventTouch: true })
            
			companyMap.container.fitToViewport()
        })
	}
}


const catalogFilter = () => {
	let filterItems = document.querySelectorAll('.js-catalog-filter-item')
	if(filterItems.length > 0) {
		filterItems.forEach(item => item.addEventListener('click', () => {
			if(item.dataset.state !== 'opened'){
				// filterItems.forEach(item => {
				// 	if(item.dataset.state === 'opened') 
				// 		item.dataset.state = 'closed'
				// })
				item.dataset.state = 'opened'
			} else {
				item.dataset.state = 'closed'
			}
		})
	)}
}

const cf7 = () => {
	document.addEventListener( 'wpcf7mailsent', function( event ) {
		Fancybox.close();
		Fancybox.show([{ 
			dragToClose: false,
			src: "#thanks-popup", 
			type: "inline",
		}]);
	})
}

const inputMask = () => {
    let inputTel = document.querySelectorAll('input[type="tel"]')
    if(inputTel.length){
        inputTel.forEach(input=>{
            Inputmask("+7 (999) 999-99-99", {showMaskOnHover: false}).mask(input);
        })
    }
}


document.addEventListener('DOMContentLoaded', ()=>{
	
	// Burger init
	burger()

	// infoSlider init
	infoSlider()

	// Yandex Map init
	yandexMap()

	// Init catalog filter
	catalogFilter()

	// init Contact Form 7 script
	cf7()

	// Init mask for input type tel
	inputMask()

	
	// https://fancyapps.com/fancybox/api/methods/
	Fancybox.bind("[data-fancybox]", {
		closeButton: true,
		dragToClose: false
		// Your custom options
	});

    if(document.documentElement.clientWidth < 744) {
    }
})

window.addEventListener('resize', () => {
	
	// infoSlider reinit
	infoSlider()

	// Reinit yandex map on resize
	yandexMap()
})

window.addEventListener('scroll', function () {

})