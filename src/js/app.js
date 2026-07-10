// Swiper
import Swiper, { Navigation, Pagination, Autoplay, Thumbs } from 'swiper';

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

const videoTrigger = () => {
	let triggers = document.querySelectorAll('.js-video-preview')
	if(triggers.length > 0) {
		triggers.forEach(trigger => trigger.addEventListener('click', () => {
			trigger.classList.add('about__video-preview--hide')
			// trigger.nextElementSibling.src += "&autoplay=1"
			trigger.nextElementSibling.play()
		}))
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

const manufacturerFilter = () => {
	let filterTabs = document.querySelectorAll('.js-manufacturer-item')

	if(document.querySelector('.js-manufacturer-swiper') && filterTabs.length > 0){
		const manufacturerSwiper = new Swiper('.js-manufacturer-swiper', {
			grabCursor: true,
			loop: false,
			slidesPerView: 'auto',
			spaceBetween: 8,
			speed: 800,
			breakpoints: {
				744: {
					spaceBetween: 12,
				},
			},
			// on: {
			// 	reachEnd: function() {
			// 		this.snapGrid = [...this.slidesGrid];
			// 	},
			// }
		});
	}

	filterTabs.forEach(tab => tab.addEventListener('click', ()=> {
		let currentFilter = tab.dataset.filter,
			rowsArr = document.querySelectorAll('.js-manufacturer-table-item')

		filterTabs.forEach(item => item.classList.remove('catalog-element__manufacturer-item--active'))
		tab.classList.add('catalog-element__manufacturer-item--active')

		rowsArr.forEach(row => {
			if(currentFilter === 'all'){
				row.style.display = 'grid'
			} else {
				row.style.display = row.dataset.filter === currentFilter ? 'grid' : 'none'
			}
			
		})
	}))
}

document.addEventListener('DOMContentLoaded', ()=>{
	
	// Burger init
	burger()

	// infoSlider init
	infoSlider()

	// Yandex Map init
	yandexMap()

	// Init video trigger
	videoTrigger()

	// Init catalog filter
	catalogFilter()

	// manufacturerFilter init
	manufacturerFilter()
	
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