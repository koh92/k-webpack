// jQuery
// import $ from 'jQuery';

// Swiper
import Swiper, { Navigation, Pagination, Thumbs } from 'swiper';

// Fancybox
// window.jQuery = window.$ = $
// require("@fancyapps/fancybox/dist/jquery.fancybox");

// Inputmask
// import Inputmask from "inputmask";

const reviewsSlider = () => {
    if(document.querySelector('.js-reviews-swiper')){
        const reviewsSwiper = new Swiper('.js-reviews-swiper', {
            modules: [Navigation, Pagination],
            // Optional parameters
            direction: 'horizontal',
            loop: false,
            simulateTouch: true,
            // grabCursor: true,
            // slideToClickedSlide: true,
            slidesPerView: 2.5,
            spaceBetween: 10,
            speed: 800,
            // Navigation arrows
            navigation: {
                nextEl: '.js-reviews-next',
                prevEl: '.js-reviews-prev',
            },
            breakpoints: {
                768: {
                    spaceBetween: 15,
                    slidesPerView: 4.9,
                },
            },
        });
    }
}

const reviewsSortToggle = () => {
    if(document.querySelector('.js-reviews-sort')){
        let sortBox = document.querySelector('.js-reviews-sort'),
            sortItems = sortBox.querySelectorAll('.js-reviews-sort-item')
        if(sortItems.length){
            sortItems.forEach(item => item.addEventListener('click', (e)=> {
                console.log('target: ', e.target)
                e.preventDefault()
                // clear classes
                sortItems.forEach(itemClear => {
                    if(e.target != itemClear){
                        itemClear.classList.remove('reviews__sorting-item--active')
                        itemClear.classList.remove('reviews__sorting-item--asc')
                        itemClear.classList.remove('reviews__sorting-item--desc')
                    }
                })
                // add active class and toggle sorting
                if(!item.classList.contains('reviews__sorting-item--active')){
                    item.classList.add('reviews__sorting-item--active')
                    item.classList.add('reviews__sorting-item--asc')
                } else {
                    item.classList.toggle('reviews__sorting-item--asc')
                    item.classList.toggle('reviews__sorting-item--desc')
                }
            }))
        }
    }
}

const faqAccordion = () => {
    const faqList = document.querySelectorAll('.js-faq-item')
    if(faqList.length){
        faqList.forEach(item => item.addEventListener('click', (e)=> {
            let target = e.target
            if(target.closest('.faq__item-head')){
                let text = target.closest('.faq__item').querySelector('.faq__item-toggler')
                if(item.classList.contains('faq__item--open')){
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

window.addEventListener('resize', () => {

})

document.addEventListener('DOMContentLoaded', ()=>{
	
    // Reviews slider
    reviewsSlider()

    // Reviews sort
    reviewsSortToggle()

    // FAQ toggler
    faqAccordion()

    if(document.documentElement.clientWidth < 768) {
    }

})