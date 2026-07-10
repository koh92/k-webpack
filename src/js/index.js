// jQuery
import $ from 'jQuery';

// Swiper
import Swiper, { Navigation, Pagination, Autoplay, Scrollbar, FreeMode } from 'swiper';
import 'swiper/css/bundle';

// Normalize
import 'normalize.css';

// WOW
import WOW from 'wow.js';
import 'wow.js/css/libs/animate.css';

// Fancybox
window.jQuery = window.$ = $
require("@fancyapps/fancybox/dist/jquery.fancybox");
import "@fancyapps/fancybox/dist/jquery.fancybox.min.css";

// Inputmask
import Inputmask from "inputmask";

import '../styles/main.sass';

const header = document.querySelector('.js-header')
const container = document.querySelector('.container')

const casesSlider = () => {
    if(document.querySelector('.js-cases-swiper')){

        let style = container.currentStyle || window.getComputedStyle(container),
            spaceBetween = parseFloat(style.marginLeft) * 2 + 40

        spaceBetween = spaceBetween == 40 ? 60 : spaceBetween

        const casesSwiper = new Swiper('.js-cases-swiper', {
            modules: [Navigation, Autoplay, Scrollbar, FreeMode],
            // Optional parameters
            direction: 'horizontal',
            // autoplay: {
            //    delay: 8000,
            //    stopOnLastSlide: true
            // },
            loop: false,
            simulateTouch: true,
            grabCursor: true,
            slideToClickedSlide: true,
            slidesPerView: 1,
            // spaceBetween: spaceBetween,
            spaceBetween: 60,
            speed: 800,
            freeMode: true,
            scrollbar: {
                el: '.js-cases-scrollbar',
                draggable: true,
            },
            // Navigation arrows
            // navigation: {
            //     nextEl: '.js-cases-next',
            //     prevEl: '.js-cases-prev',
            // },
        });
    }
}
const reviewsSlider = () => {
    if(document.querySelector('.js-reviews-swiper')){
        const roomSwiper = new Swiper('.js-reviews-swiper', {
            modules: [Navigation, Autoplay, Scrollbar, FreeMode],
            // Optional parameters
            direction: 'horizontal',
            // autoplay: {
            //    delay: 8000,
            //    stopOnLastSlide: true
            // },
            loop: false,
            simulateTouch: true,
            grabCursor: true,
            slideToClickedSlide: true,
            // slidesPerView: 1,
            slidesPerView: 'auto',
            spaceBetween: 40,
            speed: 800,
            // centeredSlides: true,
            // centeredSlidesBounds: true,
            freeMode: true,
            scrollbar: {
                el: '.js-reviews-scrollbar',
                draggable: true,
            },
            // Responsive breakpoints
            breakpoints: {
                992: {
                    // slidesPerView: 2,
                },
            }
            // Navigation arrows
            // navigation: {
            //     nextEl: '.js-cases-next',
            //     prevEl: '.js-cases-prev',
            // },
        });
    }
}

let oldScrollY = 0;
const scrollTopHeader = () => {
    if(document.documentElement.scrollTop < 5){
        header.classList.remove('mod-fixed')
        setTimeout(()=>{
            header.classList.remove('mod-blur-bg')
        }, 300)
        header.classList.remove('mod-backscroll')
    } else {
        if(document.documentElement.scrollTop > 130){
            header.classList.add('mod-fixed')
            setTimeout(()=>{
                header.classList.add('mod-blur-bg')
            }, 300)
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

const faqAccordion = () => {
    const faqList = document.querySelectorAll('.js-faq-item')
    if(faqList.length){
        faqList.forEach(item => item.addEventListener('click', (e)=> {
            let target = e.target
            if(target.closest('.faq__item-head')){
                let text = target.closest('.faq__item').querySelector('.faq__item-toggler')
                if(item.classList.contains('faq__item--active')){
                    item.classList.remove('faq__item--active')
                    text.style.maxHeight = 0
                } else {
                    item.classList.add('faq__item--active');
                    text.style.maxHeight = text.scrollHeight + 'px';
                }
            }
        }))
    }
}

const cf7 = () => {
    let wpcf7Elm = document.querySelectorAll( '.wpcf7' )
    // wpcf7Elm.forEach(form => form.addEventListener( 'wpcf7submit', ()=> {
    wpcf7Elm.forEach(form => form.addEventListener( 'wpcf7mailsent', ()=> {
        console.log('form submitted')
        $.fancybox.close()
        $.fancybox.open({src: '#thanks-popup'})
    }, false ))
}

const anchors = () => {
    let navMenuItems = document.querySelectorAll('nav.header__menu ul > li > a')
    if(navMenuItems.length){
        if(document.location.pathname == "/") {
            navMenuItems.forEach(item=>{
                item.onclick = function(e){
                    e.preventDefault();
                    document.querySelector(item.hash).scrollIntoView();
                }
            })
        } else {
            navMenuItems.forEach(item=>{
                item.onclick = function(e){
                    e.preventDefault();
                    window.localStorage.setItem('k_anchor', item.hash)
                    window.location = item.href.split('#')[0]
                }
            })
        }
        if(window.localStorage.getItem('k_anchor')){
            document.querySelector(window.localStorage.getItem('k_anchor')).scrollIntoView();
            window.localStorage.removeItem('k_anchor')
        }
    }
}

const cookie = () => {
    if(!window.localStorage.getItem('k_cookie')){
        let cookieBox = document.querySelector('.js-cookie'),
            cookieBtn = document.querySelector('.js-cookie-btn')
        cookieBox.classList.add('popup--active')
        cookieBtn.addEventListener('click',()=>{
            cookieBox.classList.add('popup--hiding')
            window.localStorage.setItem('k_cookie',true);
            cookieBox.classList.remove('popup--active')
            setTimeout(()=>{cookieBox.classList.remove('popup--hiding')},600)
        })
    }
}

const inputMask = () => {
    let inputTel = document.querySelectorAll('input[type="tel"]')
    if(inputTel.length){
        inputTel.forEach(input=>{
            Inputmask("+7 (999) 999-99-99", {showMaskOnHover: false}).mask(input);
        })
    }
}

const zoomImage = () => {
    let images = document.querySelectorAll('.js-image-zoom')
    
    images.forEach(image => {
        image.onmousemove = (e) => {
            let zoomer = e.currentTarget;

            let offsetX = e.offsetX ? e.offsetX : e.touches[0].pageX
            let offsetY = e.offsetY ? e.offsetY : e.touches[0].pageY

            let x = offsetX / zoomer.offsetWidth * 100
            let y = offsetY / zoomer.offsetHeight * 100
            zoomer.style.backgroundSize = 'auto 120%';
            zoomer.style.backgroundPosition = x + '% ' + y + '%';
        }
        image.onmouseleave = () => {
            image.style.backgroundSize = 'cover'
            image.style.backgroundPosition = 'center'
        }
    })
}

// window.addEventListener('resize', () => {

// })

document.addEventListener('DOMContentLoaded', ()=>{
    // Scroll top header onLoad
    scrollTopHeader()
    
    window.addEventListener('scroll', function() {
        // Scroll top header onScroll
        scrollTopHeader()
    });

    // Cases slider
    casesSlider()
    
    // Reviews slider
    reviewsSlider()
    
    // Faq accordion
    faqAccordion()
    
    // Thanks popup after CF7 submit success
    cf7()
    
    // Remove anchors from nav menu
    anchors()
    
    // Cookie check
    cookie()
    
    // Phone mask
    inputMask()
    
    // Zoom image
    zoomImage()
    
    var wow = new WOW(
        {
            boxClass:     'wow',      // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset:       0,          // distance to the element when triggering the animation (default is 0)
            mobile:       true,       // trigger animations on mobile devices (default is true)
            live:         false,       // act on asynchronously loaded content (default is true)
            callback:     function(box) {
              // the callback is fired every time an animation is started
              // the argument that is passed in is the DOM node being animated
            },
            scrollContainer: null,    // optional scroll container selector, otherwise use window,
            resetAnimation: true,     // reset animation on end (default is true)
        }
    );
    wow.init();
})