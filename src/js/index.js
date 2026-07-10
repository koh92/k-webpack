import '../styles/main.sass';

import $ from 'jquery'

import slick from 'slick-carousel'


document.addEventListener('DOMContentLoaded', ready)
window.addEventListener('resize', ready)
function ready() {
	let header = document.querySelector('header'),
		burger = document.querySelector('.js-burger')
	burger.addEventListener('click',()=>{
		burger.classList.toggle('--open')
		header.classList.toggle('menu-open')
		$('.js-nav').slideToggle(300)
	})
	window.addEventListener('scroll', ()=>{ 
	    let scrollpos = window.scrollY
	    if(scrollpos > 10){header.classList.add('bg')}else{header.classList.remove('bg')}
	})

	if(document.documentElement.clientWidth < 992){
		$('.js-specialist').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			infinite: false,
		})
		$('.js-tariff').slick({
			slidesToShow: 1,
			// slidesToScroll: 1,
			arrows: false,
			infinite: false,
			asNavFor: '.js-tariff-nav',
			fade: true,
			swipe: false,
			adaptiveHeight: true,
		})
		$('.js-tariff-nav').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			arrows: false,
			infinite: false,
			asNavFor: '.js-tariff',
			focusOnSelect: true
		})
	}
	
}