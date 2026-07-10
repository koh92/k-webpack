import $ from 'jQuery'

import Swiper, { Navigation, Pagination } from 'swiper'
import 'swiper/css';

import '../styles/main.sass';

document.addEventListener('DOMContentLoaded', ()=>{

	const casesSwiper = new Swiper('.js-cases-swiper', {
		modules: [Navigation, Pagination],

        // Optional parameters
        direction: 'horizontal',
        loop: false,
        simulateTouch: true,
        grabCursor: true,
        slideToClickedSlide: true,
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 800,
        // Navigation arrows
        // navigation: {
        //     nextEl: '.main-banner__button-next',
        //     prevEl: '.main-banner__button-prev',
        // },
        pagination: {
            el: '.js-cases-pagination',
            // type: 'bullets',
            clickable: true,
            // renderBullet: function (index, className) {
	        	// return '<span class="' + className + ' pagination__item"> </span>';
	        	// return '<span class="pagination__item"></span>';
	        // },
        },
    });

    const reviewsSwiper = new Swiper('.js-reviews-swiper', {
        modules: [Navigation, Pagination],

        // Optional parameters
        direction: 'horizontal',
        loop: false,
        simulateTouch: true,
        grabCursor: true,
        slideToClickedSlide: true,
        slidesPerView: 1,
        spaceBetween: 80,
        speed: 800,
        // Navigation arrows
        // navigation: {
        //     nextEl: '.main-banner__button-next',
        //     prevEl: '.main-banner__button-prev',
        // },
        pagination: {
            el: '.js-reviews-pagination',
            clickable: true,
        },
        breakpoints: {
            480: {
                slidesPerView: 1.2,
                spaceBetween: 80
            },
            768: {
                slidesPerView: 1.4,
                spaceBetween: 80
            },
            1000: {
                slidesPerView: 2,
                spaceBetween: 85
            }
        }
    });

    let questions = document.querySelectorAll('.js-faq-item')
    questions.forEach(q => q.addEventListener('click', function(){
       this.classList.toggle('faq__item-active') 
    }))
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