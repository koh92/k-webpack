// Inputmask
// import Inputmask from 'inputmask';

// ymapsTouchScroll
import ymapsTouchScroll from 'ymaps-touch-scroll'

// const mobile = window.matchMedia('(min-width: 0px) and (max-width: 1159px)');
// const desktop = window.matchMedia('(min-width: 1160px)');

const burger = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    // const mobileHeader = document.querySelector('.js-header-nav-menu');
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
        mobileHeader.setAttribute('data-state', "closing");
        
        mobileHeader.addEventListener('animationend', () => {
            mobileHeader.setAttribute('data-state', "closed");
        }, {once: true})
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

const heroSlider = () => {
    if(document.querySelector('.js-hero-swiper')){
        const heroSwiper = new Swiper('.js-hero-swiper', {
            // Optional parameters
            // grabCursor: true,
            // slideToClickedSlide: true,
            slidesPerView: 1,
            spaceBetween: 15,
            speed: 800,
            loop: true,
            // Navigation arrows
            navigation: {
                nextEl: '.js-hero-next',
                prevEl: '.js-hero-prev',
            },
	        pagination: {
		        el: '.js-hero-pagination',
		        type: 'bullets',
		        clickable: true
	        },
	        breakpoints: {
				768: {
					spaceBetween: 30
				},
				1170: {
					spaceBetween: 135
				}
	        }
        });
    }
}

const faqAccordion = () => {
	const faqList = document.querySelectorAll('.js-faq-item')
	if (faqList.length) {
		faqList.forEach(item => item.addEventListener('click', (e) => {
			let target = e.target
			if (target.closest('.faq__item-head')) {
				let text = target.closest('.faq__item').querySelector('.faq__item-toggler')
				if (item.classList.contains('faq__item--open')) {
					item.classList.remove('faq__item--open')
					text.style.maxHeight = 0
				} else {
					item.classList.add('faq__item--open');
					text.style.maxHeight = text.scrollHeight + 'px';
				}
			}
		}))
	}
}

const passwordToggler = () => {
    let passwordTogglers = document.querySelectorAll('.js-password-toggler')
    if(passwordTogglers.length > 0) {
        passwordTogglers.forEach(toggler => toggler.addEventListener('click', ()=> {
            let parent = toggler.closest('.form__input'),
                input = parent.querySelector('input')

            if (input.getAttribute('type') == 'password') {
                toggler.classList.add('visible')
                input.setAttribute('type', 'text')
            } else {
                toggler.classList.remove('visible')
                input.setAttribute('type', 'password');
            }
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
                    zoom: 10,
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

                companyMap.setBounds(companyMap.geoObjects.getBounds(), { checkZoomRange: true })
                ymapsTouchScroll(companyMap, { preventScroll: true, preventTouch: true })
            })
        }
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    // Burger init
	burger()
    // Scroll header
    scrollTopHeader()
	// Hero slider init
	heroSlider()

    faqAccordion()

    passwordToggler()

    ymapsRender()


	// https://fancyapps.com/fancybox/api/methods/
	Fancybox.bind("[data-fancybox]", {
		closeButton: true,
		dragToClose: false,
        compact: true,
        preload: true,
	});

    if(document.documentElement.clientWidth <= 744) {
		
    }
})

window.addEventListener('resize', () => {

})

window.addEventListener('scroll', function () {
    // Scroll header
    scrollTopHeader()
})