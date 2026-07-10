import $ from 'jQuery'

import Swiper, { Navigation, Pagination, Autoplay, Scrollbar, FreeMode } from 'swiper'
import 'swiper/css/bundle';
import 'normalize.css';

import WOW from 'wow.js'
import 'wow.js/css/libs/animate.css'

import ymapsTouchScroll from 'ymaps-touch-scroll';

import '../styles/main.sass';

const header = document.querySelector('.js-header')
const container = document.querySelector('.container')
// const body = document.querySelector('body')

const burger = () => {
    const burger = document.querySelector('.js-burger')

    if(document.documentElement.clientWidth < 1200){
        if(header.offsetHeight > 120 && !header.classList.contains('mod--menu-open')){
            header.style.height = '76px'
        }

        burger.onclick = ()=>{
            if(header.classList.contains('mod--menu-open')) {
                $('.js-header').animate({'height':'76px'}, 500)
                // header.style.height = '76px'
                setTimeout(()=>{
                    header.classList.remove('mod--menu-open')
                }, 600)
            } else {
                $('.js-header').animate({'height':'100vh'}, 500)
                // header.style.height = '100vh'
                header.classList.add('mod--menu-open')
            }
            burger.classList.toggle('header__burger--change')
            document.body.classList.toggle('mod-noscroll');
            // $('body').toggleClass('mod-noscroll');
        };
    } else {
        if(header.classList.contains('mod--menu-open')) {
            burger.classList.remove('header__burger--change')
            header.classList.remove('mod--menu-open')
        }
        if(header.offsetHeight == 76 || header.classList.contains('mod--menu-open')) {
            header.style.height = '121px'
        }
    }
}

const tabToggle = (t) => {
    let target = t.target.closest('.js-likes-toggler'),
        tab = t.target.closest('.likes__item'),
        hiddenContent = tab.querySelector('.js-hidden-content')
    if(document.documentElement.clientWidth < 768){
        tab.classList.toggle('likes__item--active') 
        $(hiddenContent).slideToggle(300)
    }
}

const roomSlider = () => {
    if(document.querySelector('.js-rooms-swiper')){

        let style = container.currentStyle || window.getComputedStyle(container),
            spaceBetween = parseFloat(style.marginLeft) * 2 + 40

        spaceBetween = spaceBetween == 40 ? 60 : spaceBetween

        const roomSwiper = new Swiper('.js-rooms-swiper', {
            modules: [Navigation, Pagination, Autoplay],
            // Optional parameters
            direction: 'horizontal',
            autoplay: {
               delay: 8000,
               stopOnLastSlide: true
            },
            loop: false,
            simulateTouch: true,
            grabCursor: true,
            slideToClickedSlide: true,
            slidesPerView: 1,
            spaceBetween: spaceBetween,
            speed: 800,
            // Navigation arrows
            navigation: {
                nextEl: '.js-rooms-next',
                prevEl: '.js-rooms-prev',
            },
            // Pagination arrows
            pagination: {
                el: '.js-rooms-pagination',
                type: 'fraction',
                clickable: true,
            },
        });
    }
}

const conferenceBusiness = () => {
    if(document.querySelector('.js-conference-business-swiper')){

        let style = container.currentStyle || window.getComputedStyle(container),
            spaceBetween = parseFloat(style.marginLeft) * 2 + 40

        spaceBetween = spaceBetween == 40 ? 60 : spaceBetween

        const conferenceSwiper = new Swiper('.js-conference-business-swiper', {
            modules: [Navigation, Pagination, Autoplay, Scrollbar],
            // Optional parameters
            direction: 'horizontal',
            // autoplay: {
            //    delay: 4000,
            //    stopOnLastSlide: true
            // },
            simulateTouch: true,
            grabCursor: true,
            slideToClickedSlide: true,
            slidesPerView: 1,
            spaceBetween: spaceBetween,
            speed: 800,
            // Navigation arrows
            navigation: {
                nextEl: '.js-conference-business-next',
                prevEl: '.js-conference-business-prev',
            },
            // Pagination arrows
            // pagination: {
            //     el: '.js-conference-business-progress-bar',
            //     type: 'progressbar',
            //     clickable: true,
            // },
            scrollbar: {
                el: ".js-conference-business-progress-bar",
                draggable: true,
                dragSize: 'auto'
            },
        });
    }
}

window.addEventListener('resize', burger)
window.addEventListener('resize', roomSlider)
window.addEventListener('resize', conferenceBusiness)

document.addEventListener('DOMContentLoaded', ()=>{
    // Burger menu init
    burger()

    // Scroll top header
    let oldScrollY = 0;
    window.addEventListener('scroll', function() {
        if(document.documentElement.scrollTop < 5){
            header.classList.remove('mod-fixed')
            header.classList.remove('mod-white-bg')
        } else {
            if(document.documentElement.scrollTop > 130){
                header.classList.add('mod-fixed')
                header.classList.add('mod-white-bg')
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
    });

    // Rooms slider
    roomSlider()

    // Conference slider
    conferenceBusiness()

    // Likes accordion
    let likes = document.querySelectorAll('.js-likes-toggler')
    if(likes.length){
        likes.forEach(like => like.addEventListener('click', tabToggle))
    }

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

    // let mapContainer = document.getElementById('map')
    // if (mapContainer) {
    //     ymaps.ready(function() {
    //         let pl,coordArr = [55.784569, 37.522254];
    //         let companyMap = new ymaps.Map("map", {
    //             center: [55.765326, 37.627735],
    //             zoom: 10,
    //             controls: ['zoomControl']
    //         }, {
    //             searchControlProvider: 'yandex#search'
    //         })
    //         pl = new ymaps.Placemark(coordArr,{}, {
    //             preset: 'islands#orangeIcon'
    //         })
    //         companyMap.geoObjects.add(pl)
    //         companyMap.setBounds(companyMap.geoObjects.getBounds(), {checkZoomRange:true}).then(function(){ if(companyMap.getZoom() > 15) companyMap.setZoom(15)} )
    //         ymapsTouchScroll(companyMap, {preventScroll: true, preventTouch: true})
    //     })
    // }
})