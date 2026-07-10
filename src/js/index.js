import '../styles/main.sass';

import $ from 'jQuery'

document.addEventListener('DOMContentLoaded', ()=>{
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
})