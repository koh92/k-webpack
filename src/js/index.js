import $ from 'jQuery'

import Swiper, { Navigation, Pagination, Autoplay } from 'swiper'
import 'swiper/css/bundle';
import 'normalize.css';

import ymapsTouchScroll from 'ymaps-touch-scroll';

import '../styles/main.sass';

const burger = () => {
    if(document.documentElement.clientWidth < 992){
        // $('.js-menu').css("display", "flex").hide();
        $('.js-burger').on('click', function(){
            $(this).toggleClass('header__burger--change');
            $('.js-menu').toggleClass('header__menu--open');
            $('.js-menu').slideToggle('300');
        });
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    burger()

	const casesSwiper = new Swiper('.js-hero-swiper', {
		modules: [Navigation, Pagination, Autoplay],

        // Optional parameters
        direction: 'horizontal',
        autoplay: {
           delay: 4000,
           stopOnLastSlide: true
        },
        loop: false,
        simulateTouch: true,
        grabCursor: true,
        slideToClickedSlide: true,
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 800,
        // Navigation arrows
        // navigation: {
        //     nextEl: '.main-banner__button-next',
        //     prevEl: '.main-banner__button-prev',
        // },
        pagination: {
            el: '.js-hero-pagination',
            type: 'bullets',
            clickable: true,
            // renderBullet: function (index, className) {
	        	// return '<span class="' + className + ' pagination__item"> </span>';
	        	// return '<span class="pagination__item"></span>';
	        // },
        },
    });

    const reviewsSwiper = new Swiper('.js-news-swiper', {
        modules: [Navigation, Pagination, Autoplay],

        // Optional parameters
        direction: 'horizontal',
        autoplay: {
           delay: 4000,
           stopOnLastSlide: true
        },

        loop: false,
        simulateTouch: true,
        grabCursor: true,
        // slideToClickedSlide: true,
        slidesPerView: 1,
        spaceBetween: 80,
        speed: 800,
        // Navigation arrows
        // navigation: {
        //     nextEl: '.main-banner__button-next',
        //     prevEl: '.main-banner__button-prev',
        // },
        // pagination: {
        //     el: '.js-news-pagination',
        //     clickable: true,
        // },
        breakpoints: {
            480: {
                slidesPerView: 1.2,
                spaceBetween: 40,
                autoplay: false
            },
            600: {
                slidesPerView: 2,
                spaceBetween: 40,
                autoplay: false
            },
            768: {
                slidesPerView: 2.2,
                spaceBetween: 40,
                autoplay: false
            },
            992: {
                slidesPerView: 3.2,
                spaceBetween: 40,
                autoplay: false
            },
            1200: {
                freeMode: true,
                slidesPerView: 4,
                spaceBetween: 40,
                autoplay: false
            }
        }
    });

    ymaps.ready(function() {
        let mapContainer = document.getElementById('map')
        if (mapContainer) {
            let pl,coordArr = [55.784569, 37.522254];
            let companyMap = new ymaps.Map("map", {
                center: [55.765326, 37.627735],
                zoom: 10,
                controls: ['zoomControl']
            }, {
                searchControlProvider: 'yandex#search'
            })
            pl = new ymaps.Placemark(coordArr,{}, {
                preset: 'islands#orangeIcon'
            })
            companyMap.geoObjects.add(pl)
            companyMap.setBounds(companyMap.geoObjects.getBounds(), {checkZoomRange:true}).then(function(){ if(companyMap.getZoom() > 15) companyMap.setZoom(15)} )
            ymapsTouchScroll(companyMap, {preventScroll: true, preventTouch: true})
        }
    })

    // let questions = document.querySelectorAll('.js-faq-item')
    // questions.forEach(q => q.addEventListener('click', function(){
    //    this.classList.toggle('faq__item-active') 
    // }))
})
// document.addEventListener('DOMContentLoaded', ()=>{
// 	let header = document.querySelector('header'),
// 		burger = document.querySelector('.js-burger')
// 	burger.addEventListener('click',()=>{
// 		burger.classList.toggle('--open')
// 		header.classList.toggle('menu-open')
// 		$('.js-nav').slideToggle(300)
// 	})
// 	window.addEventListener('scroll', ()=>{ 
// 	    let scrollpos = window.scrollY
// 	    if(scrollpos > 10){header.classList.add('bg')}else{header.classList.remove('bg')}
// 	})
// })