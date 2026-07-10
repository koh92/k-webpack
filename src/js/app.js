// Swiper
// import Swiper, { Navigation, Pagination, Autoplay, Thumbs } from 'swiper';

// Fancybox 5
// import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.umd.js';

// import WOW from 'wow.js'

// Inputmask
// import Inputmask from "inputmask";

// const mobile = window.matchMedia('(min-width: 0px) and (max-width: 1159px)');
// const desktop = window.matchMedia('(min-width: 1160px)');

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

let oldScrollY = 0;
const scrollTopHeader = () => {
	let header = document.querySelector('header'),
		headerBtn = document.querySelector('.js-header-btn')
	if (document.documentElement.scrollTop < 5) {
		header.classList.remove('mod-fixed')
		header.classList.remove('mod-blue-bg')
		// headerBtn.classList.add('btn-new--white')
		// headerBtn.classList.remove('btn-new--blue')
	} else {
		if (document.documentElement.scrollTop > 130) {
			header.classList.add('mod-fixed')
			header.classList.add('mod-blue-bg')
			// headerBtn.classList.remove('btn-new--white')
			// headerBtn.classList.add('btn-new--blue')
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

const headerAnchors = () => {
	let anchors = document.querySelectorAll('.js-anchor')
	if (anchors.length > 0) {
		anchors.forEach(anchor => {
			anchor.onclick = function (e) {
				e.preventDefault();
				if (document.documentElement.clientWidth < 1160) {
					document.querySelector('.menu-toggle').click()
				}
				document.querySelector(`#${anchor.href.split('#')[1]}`).scrollIntoView({
					block: 'start',
					behavior: 'smooth'
				})
			}
		})
	}
}

const expertsSlider = () => {
	if(document.querySelector('.js-experts-swiper')){
		const expertsSwiper = new Swiper('.js-experts-swiper', {
			modules: [Navigation],
			grabCursor: true,
			loop: true,
			slidesPerView: 1.1,
			spaceBetween: 15,
			speed: 800,
			navigation: {
				nextEl: '.js-experts-next',
				prevEl: '.js-experts-prev',
			},
			pagination: {
				el: '.js-project-pagination',
				type: 'bullets',
				clickable: true
			},
			breakpoints: {
				744: {
					slidesPerView: 1,
					spaceBetween: 20,
					centeredSlides: true,
				},
				1280: {
					// slidesPerView: 1,
					loop: true,
					slidesPerView: "auto",
					centeredSlides: true,
					centeredSlidesBounds: true,
				}
			}
		});
	}
}

const wowInit = () => {
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
	})
	wow.init()
}

document.addEventListener('DOMContentLoaded', ()=>{
	
	// Burger init
	burger()
	
	// Check fix header position
	scrollTopHeader()
	
	// Header anchors behavior
	headerAnchors()
	
	// experts init
	// expertsSlider()
	
	// Init wow animation
	// wowInit()
	
	// https://fancyapps.com/fancybox/api/methods/
	// Fancybox.bind("[data-fancybox]", {
	// 	closeButton: false,
	// 	dragToClose: false
	// 	// Your custom options
	// });

    if(document.documentElement.clientWidth < 744) {
    }
})

window.addEventListener('resize', () => {
	
	// experts reinit
	expertsSlider()
})

window.addEventListener('scroll', function () {
	// Init fix header
	scrollTopHeader()
})