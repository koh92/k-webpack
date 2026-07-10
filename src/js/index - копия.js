import $ from 'jQuery'

import Swiper, { Navigation, Pagination, Autoplay, Scrollbar, FreeMode } from 'swiper'
import 'swiper/css/bundle';
import 'normalize.css';

import WOW from 'wow.js'
import 'wow.js/css/libs/animate.css'

import '../styles/main.sass';

const header = document.querySelector('.js-header')
const container = document.querySelector('.container')
// const body = document.querySelector('body')

// const burger = () => {
//     const burger = document.querySelector('.js-burger')
//
//     if(document.documentElement.clientWidth < 1200){
//         if(header.offsetHeight > 120 && !header.classList.contains('mod--menu-open')){
//             header.style.height = '76px'
//         }
//
//         burger.onclick = ()=>{
//             if(header.classList.contains('mod--menu-open')) {
//                 $('.js-header').animate({'height':'76px'}, 500)
//                 // header.style.height = '76px'
//                 setTimeout(()=>{
//                     header.classList.remove('mod--menu-open')
//                 }, 600)
//             } else {
//                 $('.js-header').animate({'height':'100vh'}, 500)
//                 // header.style.height = '100vh'
//                 header.classList.add('mod--menu-open')
//             }
//             burger.classList.toggle('header__burger--change')
//             document.body.classList.toggle('mod-noscroll');
//             // $('body').toggleClass('mod-noscroll');
//         };
//     } else {
//         if(header.classList.contains('mod--menu-open')) {
//             burger.classList.remove('header__burger--change')
//             header.classList.remove('mod--menu-open')
//         }
//         if(header.offsetHeight == 76 || header.classList.contains('mod--menu-open')) {
//             header.style.height = '121px'
//         }
//     }
// }

const casesSlider = () => {
    if(document.querySelector('.js-cases-swiper')){

        let style = container.currentStyle || window.getComputedStyle(container),
            spaceBetween = parseFloat(style.marginLeft) * 2 + 40

        spaceBetween = spaceBetween == 40 ? 60 : spaceBetween

        const roomSwiper = new Swiper('.js-cases-swiper', {
            modules: [Navigation, Pagination, Autoplay],
            // Optional parameters
            direction: 'horizontal',
            // autoplay: {
            //    delay: 8000,
            //    stopOnLastSlide: true
            // },
            loop: true,
            simulateTouch: true,
            grabCursor: true,
            slideToClickedSlide: true,
            slidesPerView: 1,
            spaceBetween: spaceBetween,
            speed: 800,
            // Navigation arrows
            navigation: {
                nextEl: '.js-cases-next',
                prevEl: '.js-cases-prev',
            },
        });
    }
}

let oldScrollY = 0;
const scrollTopHeader = () => {
    if(document.documentElement.scrollTop < 5){
        header.classList.remove('mod-fixed')
        setTimeout(()=>{
            header.classList.remove('mod-white-bg')
        }, 300)
        header.classList.remove('mod-backscroll')
    } else {
        if(document.documentElement.scrollTop > 130){
            header.classList.add('mod-fixed')
            setTimeout(()=>{
                header.classList.add('mod-white-bg')
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


// window.addEventListener('resize', () => {
//     burger()
// })

document.addEventListener('DOMContentLoaded', ()=>{
    // Burger menu init
    // burger()
    
    scrollTopHeader()
    
    window.addEventListener('scroll', function() {
        // Scroll top header
        scrollTopHeader()
    });

    // Rooms slider
    casesSlider()

    var wow = new WOW(
        {
            boxClass:     'wow',      // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset:       0,          // distance to the element when triggering the animation (default is 0)
            mobile:       true,       // trigger animations on mobile devices (default is true)
            live:         true,       // act on asynchronously loaded content (default is true)
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