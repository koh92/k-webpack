// jQuery
import $ from 'jQuery';

// Swiper
import Swiper, { Navigation, Pagination, Thumbs, EffectFade } from 'swiper';
import 'swiper/css/bundle';

// Normalize
import 'normalize.css';

// Fancybox
window.jQuery = window.$ = $
require("@fancyapps/fancybox/dist/jquery.fancybox");
import "@fancyapps/fancybox/dist/jquery.fancybox.min.css";

// Inputmask
import Inputmask from "inputmask";

// ymapsTouchScroll
import ymapsTouchScroll from 'ymaps-touch-scroll'

import '../styles/main.sass';

const header = document.querySelector('.js-header')
const container = document.querySelector('.container')

const burger = () => {
    const burger = document.querySelector('.js-burger')

    if (document.documentElement.clientWidth < 1180) {
        burger.onclick = () => {
            if (header.classList.contains('mod--catalog-menu-open')) {
                toggleCatalogMenu()
            }
            toggleMenu()
        };
    } else {
        if (header.classList.contains('mod--main-menu-open')) {
            toggleMenu()
        }
    }
}

const toggleMenu = () => {
    let burger = document.querySelector('.js-burger')
    burger.classList.toggle('header__burger--change')
    header.classList.toggle('mod--menu-open')
    header.classList.toggle('mod--main-menu-open')
    document.body.classList.toggle('mod-noscroll')
    $('.js-mobile-toggle-menu').slideToggle(300)
}

const catalogMenu = () => {
    const menuToggler = document.querySelector('.js-catalog-menu-toggler'),
          menu = document.querySelector('.js-catalog-menu')

    if(menuToggler && menu) {
        menuToggler.onclick = () => {
            if (header.classList.contains('mod--main-menu-open')) {
                toggleMenu()
            }
            toggleCatalogMenu()
        }

        let rootMenuItems = document.querySelectorAll('.catalog-menu__item-level-1')
        rootMenuItems.forEach(rootItem => rootItem.addEventListener('click', (e)=> {
            let target = e.target
            if(target.closest('.arrow-1')) {
                if(document.documentElement.clientWidth < 768) {
                    rootItem.classList.toggle('active')
                    // Close all submenu's
                    $(rootItem).find('.catalog-menu__list-level-1 .catalog-menu__item-level-2').each(function() {
                        this.classList.remove('active')
                        $(this).find('.catalog-menu__list-level-2').slideUp()
                    })

                } else {
                    rootMenuItems.forEach(item => item.classList.remove('active'))
                    rootItem.classList.add('active')
                }
            }

        }))

        if(document.documentElement.clientWidth < 768) {
            let childMenuItems = document.querySelectorAll('.catalog-menu__item-level-2')
            childMenuItems.forEach(childItem => childItem.addEventListener('click', (e)=> {
                let target = e.target
                if(target.closest('.arrow-2')) {
                    childItem.classList.toggle('active')
                    $(target).closest('.catalog-menu__item-level-2').find('.catalog-menu__list-level-2').slideToggle(300)
                }
            }))
        }
    }
}

const toggleCatalogMenu = () => {
    let menuToggler = document.querySelector('.js-catalog-menu-toggler')
    menuToggler.classList.toggle('header__catalog-btn--open')
    $('.js-catalog-menu').slideToggle(300)
    header.classList.toggle('mod--menu-open')
    header.classList.toggle('mod--catalog-menu-open')
    document.body.classList.toggle('mod-noscroll')
}

const showHiddenMenuCategories = () => {
    let btns = document.querySelectorAll('.js-open-all')
    if(btns.length) {
        btns.forEach(btn => btn.addEventListener('click', (e)=> {
            $(e.target).parent().children('.catalog-menu__item-level-3').each(function(e) {
                if (e > 3) {
                    $(this).slideToggle(300)
                }
            })
        }))
    }
}

const heroSlider = () => {
    if(document.querySelector('.js-hero-swiper')){
        let style = container.currentStyle || window.getComputedStyle(container),
            spaceBetween = parseFloat(style.paddingLeft) * 2

        const heroSwiper = new Swiper('.js-hero-swiper', {
            modules: [Navigation, Pagination],
            // Optional parameters
            direction: 'horizontal',
            loop: true,
            simulateTouch: true,
            grabCursor: true,
            slideToClickedSlide: true,
            slidesPerView: 1,
            spaceBetween: spaceBetween,
            // spaceBetween: 60,
            speed: 800,
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
        });
    }
}

const saleSlider = () => {
    if(document.querySelector('.js-sale-swiper')){
        let style = container.currentStyle || window.getComputedStyle(container),
            spaceBetween = parseFloat(style.paddingLeft) * 2

        const saleSwiper = new Swiper('.js-sale-swiper', {
            modules: [Navigation, Pagination],
            // Optional parameters
            direction: 'horizontal',
            loop: true,
            simulateTouch: true,
            grabCursor: true,
            slideToClickedSlide: true,
            slidesPerView: 1,
            spaceBetween: spaceBetween,
            speed: 800,
            // Navigation arrows
            navigation: {
                nextEl: '.js-sale-next',
                prevEl: '.js-sale-prev',
            },
            pagination: {
                el: '.js-sale-pagination',
                type: 'bullets',
                clickable: true
            },
        });
    }
}

const homePageTabs = () => {
    const tabBox = document.querySelector('.js-tabs')
    if(tabBox) {
        let tabNavItems = tabBox.querySelectorAll('.js-tab-nav-item'),
            tabContentItems = tabBox.querySelectorAll('.js-tab-content')

        tabNavItems.forEach(navItem => navItem.addEventListener('click', ()=> {
            tabNavItems.forEach(item => item.classList.remove('active'))
            navItem.classList.add('active')
            tabContentItems.forEach(contentItem => contentItem.classList.remove('active'))
            tabContentItems.forEach(contentItem => {
                if(contentItem.dataset.id == navItem.dataset.id) {
                    contentItem.classList.add('active')
                }
            })
        }))
    }
}

const relatedArticlesSlider = () => {
    if(document.querySelector('.js-related-articles-swiper')){

        const relatedArticlesSwiper = new Swiper('.js-related-articles-swiper', {
            modules: [Navigation, Pagination],
            // Optional parameters
            direction: 'horizontal',
            loop: false,
            simulateTouch: true,
            grabCursor: true,
            slideToClickedSlide: true,
            slidesPerView: 1,
            spaceBetween: 20,
            watchSlidesProgress: true,
            speed: 800,
            // Navigation arrows
            navigation: {
                nextEl: '.js-related-articles-next',
                prevEl: '.js-related-articles-prev',
            },
            pagination: {
                enabled: true,
                el: '.js-related-articles-pagination',
                type: 'bullets',
                clickable: true
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    pagination: false
                },
                1280: {
                    slidesPerView: 3,
                    pagination: false
                }
            },
        });
    }
}

const faqAccordion = () => {
    const faqList = document.querySelectorAll('.js-faq-item')
    if(faqList.length){
        faqList.forEach(item => item.addEventListener('click', (e)=> {
            let target = e.target
            if(target.closest('.faq__item-q')){
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

const ymapsRender = () => {
    let mapContainer = document.getElementById('js-map')
    if (mapContainer) {
        ymaps.ready(function() {
            let pl, coordArr = mapContainer.dataset.coord.split(',').map(function(item) { return parseFloat(item) });
            let companyMap = new ymaps.Map("js-map", {
                center: [55.765326, 37.627735],
                zoom: 10,
                controls: ['zoomControl']
            }, {
                searchControlProvider: 'yandex#search',
                suppressMapOpenBlock: true
            })
            pl = new ymaps.Placemark(coordArr, {}, {
                iconLayout: 'default#image',
                iconImageHref: '../images/map_pin.svg',
                iconImageSize: [40, 48]
            })

            companyMap.geoObjects.add(pl)
            companyMap.setBounds(companyMap.geoObjects.getBounds(), { checkZoomRange: true }).then(function() { companyMap.setZoom(13) })
            ymapsTouchScroll(companyMap, { preventScroll: true, preventTouch: true })
        })
    }
}

const categoriesSlider = () => {
    if(document.querySelector('.js-categories-slider')){
        const categoriesSwiper = new Swiper('.js-categories-slider', {
            modules: [Navigation],
            // Optional parameters
            direction: 'horizontal',
            loop: false,
            simulateTouch: true,
            grabCursor: true,
            slideToClickedSlide: true,
            // slidesPerView: 3.5,
            slidesPerView: 'auto',
            spaceBetween: 6,
            watchSlidesProgress: true,
            speed: 800,
            // Navigation arrows
            navigation: {
                nextEl: '.js-catalog-page-next',
                prevEl: '.js-catalog-page-prev',
            },
            breakpoints: {
                768: {
                    // slidesPerView: 5.5,
                },
                1280: {
                    // slidesPerView: 8.5,
                    spaceBetween: 8,
                }
            },
        });
    }
}

const catalogFilter = () => {
    const filter = document.querySelector('.js-catalog-filter')
    if(filter){
        // let filterItems = filter.querySelectorAll('.js-filter-item-toggler')
        let filterItems = filter.querySelectorAll('.js-filter-item')
        if(filterItems.length){
            filterItems.forEach(item => item.addEventListener('click', (e)=> {
                let target = e.target
                if(target.closest('.js-filter-item-toggler')){
                    let toggleContent = item.querySelector('.js-filter-toggle-content')
                    if(item.classList.contains('filter__item--open')){
                        item.classList.remove('filter__item--open')
                        toggleContent.style.maxHeight = 0
                    } else {
                        item.classList.add('filter__item--open');
                        toggleContent.style.maxHeight = toggleContent.scrollHeight + 'px';
                    }
                }
            }))
        }
    }
    if(document.documentElement.clientWidth < 768) {
        let openFilter = document.querySelector('.js-open-filter'),
            closeFilter = document.querySelector('.js-close-filter'),
            filter = document.querySelector('.js-catalog-filter')
        if(openFilter){
            openFilter.addEventListener('click', () => {
                filter.classList.add('filter--open')
                document.body.classList.add('mod-noscroll')
            })
        }
        if(closeFilter){
            closeFilter.addEventListener('click', () => {
                filter.classList.remove('filter--open')
                document.body.classList.remove('mod-noscroll')
            })
        }
    }
}

const catalogFilterFirstOpen = () => {
    const filter = document.querySelector('.js-catalog-filter')
    if(filter) {
        let filterItems = filter.querySelectorAll('.js-filter-item')
        if (filterItems.length) {
            filterItems.forEach(item => {
                let toggleContent = item.querySelector('.js-filter-toggle-content')
                item.classList.add('filter__item--open');
                toggleContent.style.maxHeight = toggleContent.scrollHeight + 'px';
            })
        }
    }
}

const customSelect = () => {
    let customSelects = document.querySelectorAll('.custom-select')
    if(customSelects.length > 0){
        customSelects.forEach(select=>{
            select.addEventListener('click', (e)=>{
                let input = select.previousElementSibling,
                    dropdown = select.querySelector('.js-custom-select-dropdown'),
                    selectText = select.querySelector('.custom-select__name'),
                    childs = select.querySelectorAll('.custom-select__child')

                if(e.target.closest('.js-custom-select-trigger')){
                    select.classList.toggle('custom-select--open')
                    $(dropdown).slideToggle(500)
                }
                if(e.target.closest('.custom-select__child')){
                    childs.forEach(child => child.classList.remove('custom-select__child--selected'))
                    select.classList.remove('custom-select--open')
                    e.target.classList.add('custom-select__child--selected')
                    input.value = e.target.innerText
                    selectText.innerText = e.target.innerText
                    $(dropdown).slideUp(500)
                }
            })
        })
    }
}

const catalogViewChange = () => {
    let togglers = document.querySelectorAll('.js-change-view'),
        catalogBox = document.querySelector('.js-catalog-box')
    if(togglers.length > 0) {
        togglers.forEach(toggler => toggler.addEventListener('click', () => {
            togglers.forEach(item=>item.classList.remove('view__item--active'))
            toggler.classList.add('view__item--active')
            catalogBox.classList.toggle('catalog__list')
            catalogBox.classList.toggle('catalog__grid')
        }))
    }
}

const readMore = () => {
    let allBox = document.querySelectorAll('.js-read-more')
    if(allBox.length > 0) {
        allBox.forEach(box => {
            box.nextElementSibling.addEventListener('click', (e) => {
                box.style.cssText = 'display: block; line-clamp: unset';
                e.target.style.cssText = 'opacity:0; visibility:hidden; max-height: 0; overflow: hidden; padding: 0';
            })
        })
    }
}

const productSlider = () => {
    if (document.querySelector('.js-product-pagination')) {

        const productPaginationSwiper = new Swiper('.js-product-pagination', {
            modules: [Navigation],
            // Optional parameters
            direction: 'horizontal',
            loop: false,
            simulateTouch: true,
            grabCursor: false,
            slidesPerView: 3,
            spaceBetween: 20,
            speed: 800,
            watchSlidesProgress: true,
            on: {
                click() {
                    productPaginationSwiper.slideTo(this.clickedIndex)
                },
            },
            navigation: {
                prevEl: '.js-product-prev',
                nextEl: '.js-product-next',
            },
            breakpoints: {
                768: {
                    spaceBetween: 10,
                },
            },
        });

        const productSwiper = new Swiper('.js-product-slider', {
            modules: [Thumbs, EffectFade],
            // Optional parameters
            direction: 'horizontal',
            loop: false,
            simulateTouch: false,
            grabCursor: false,
            slidesPerView: 1,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            speed: 800,
            thumbs: {
                swiper: productPaginationSwiper,
                slideThumbActiveClass: 'swiper-slide--active'
            },
        });
    }
}

const productTabs = () => {
    let tabBox = document.querySelector('.js-product-tabs')
    if(tabBox) {
        let tabNav = tabBox.querySelectorAll('.js-tab-nav-item')
        tabNav.forEach(tab => tab.addEventListener('click', (e) => {
            e.preventDefault()
            let hash = document.querySelector(e.target.hash)
            if(hash) {
                hash.scrollIntoView()
                tabNav.forEach(item => item.classList.remove('active'))
                tab.classList.add('active')
            }
        }))
    }
}

const relatedProductsSlider = () => {
    let sliders = document.querySelectorAll('.js-related-products-swiper')

    if(sliders.length > 0) {
        let i = 0, relatedArticlesSwiper = [];
        sliders.forEach(slider => {
            let prev = slider.querySelector('.js-related-products-prev'),
                next = slider.querySelector('.js-related-products-next'),
                pagination = slider.querySelector('.js-related-products-pagination')

            relatedArticlesSwiper[i] = new Swiper(slider, {
                modules: [Navigation, Pagination],
                // Optional parameters
                direction: 'horizontal',
                loop: false,
                simulateTouch: true,
                grabCursor: true,
                slideToClickedSlide: true,
                slidesPerView: 2,
                spaceBetween: 20,
                watchSlidesProgress: true,
                speed: 800,
                // Navigation arrows
                navigation: {
                    nextEl: next,
                    prevEl: prev,
                },
                pagination: {
                    enabled: true,
                    el: pagination,
                    type: 'bullets',
                    clickable: true
                },
                breakpoints: {
                    768: {
                        slidesPerView: 3,
                        pagination: false
                    },
                    1280: {
                        slidesPerView: 4,
                        pagination: false
                    }
                },
            });
            i++;
        })
    }
}

const addToCart = () => {
    let addToCartBtns = document.querySelectorAll('.catalog-item__buy')
    if(addToCartBtns.length > 0){
        addToCartBtns.forEach(btn => btn.addEventListener('click', (e) => {
            e.preventDefault()
            let target = e.target,
                popup = document.querySelector('#add-to-cart'),
                close = popup.querySelector('.js-close-popup'),
                name = popup.querySelector('.js--product-name'),
                price = popup.querySelector('.js--product-name')
            target.classList.remove('btn--blue')
            target.classList.add('btn--transparent')
            target.innerText = 'В корзине'

            if(target.dataset.name){
                name.innerText = target.dataset.name
            }
            if(target.dataset.price){
                price.innerText = target.dataset.price
            }

            popup.classList.add('add-to-cart--open')

            close.addEventListener('click', () => {
                popup.classList.remove('add-to-cart--open')
            })

            setTimeout(() => {
                popup.classList.remove('add-to-cart--open')
            }, 4000)
        }))
    }

    let askPriceBtns = document.querySelectorAll('.catalog-item__buy--ask-price')
    if(askPriceBtns.length > 0) {
        askPriceBtns.forEach(btn => btn.addEventListener('click', (e) => {
            e.preventDefault()
            $.fancybox.open({src: '#popup-price'});
        }))
    }
}

const accountOrdersAccordion = () => {
    let orders = document.querySelectorAll('.js-account-order')
    if(orders.length > 0) {
        orders.forEach(order => {
            order.classList.remove('account-order__box--open')
            let toggleContent = order.querySelector('.account-order__toggle')
            if(toggleContent) {
                toggleContent.style.maxHeight = 0
            }
        })
        orders.forEach(order => order.addEventListener('click', (e) => {
            let target = e.target
            if(target.closest('.account-order__head')) {
                let toggleContent = order.querySelector('.account-order__toggle')
                if(toggleContent) {
                    if(order.classList.contains('account-order__box--open')){
                        order.classList.remove('account-order__box--open')
                        toggleContent.style.maxHeight = 0
                    } else {
                        order.classList.add('account-order__box--open');
                        toggleContent.style.maxHeight = toggleContent.scrollHeight + 1 + 'px';
                    }
                }
            }
        }))
    }
}

const accountMobileActions = () => {
    let actionToggler = document.querySelectorAll('.account-order__product-actions--toggler')
    if(actionToggler.length > 0) {
        actionToggler.forEach(toggler => toggler.addEventListener('click', () => {
            toggler.nextElementSibling.classList.toggle('account-order__product-actions--open')
        }))
    }
}

const accountImageCounter = () => {
    let imagesBox = document.querySelectorAll('.js-images-box')
    if(imagesBox.length > 0) {
        imagesBox.forEach(box => {
            let allImages = box.querySelectorAll('.account-order__image'),
                imagesCounter = box.nextElementSibling,
                displayImages = 2
            imagesCounter.style.display = 'block'
            if(document.documentElement.clientWidth < 768) {
                displayImages = 2
            } else if(document.documentElement.clientWidth < 1220) {
                displayImages = 4
            } else {
                displayImages = 5
            }
            if(allImages.length <= displayImages) {
                imagesCounter.style.display = 'none'
                return
            }
            let hiddenImages = allImages.length - displayImages

            let timeMod100 = hiddenImages % 100 // последние 2 цифры числа
            let timeMod10 = hiddenImages % 10 // последняя цифра числа

            let word = ''
            if(timeMod100 >= 11 && timeMod100 <= 14) {
                word = 'товаров'
            }
            else if(timeMod10 == 1) {
                word = 'товар'
            }
            else if(timeMod10 >= 2 && timeMod10 <= 4){
                word = 'товара'
            }
            else {
                word = 'товаров'
            }
            imagesCounter.innerText = `+ ` + hiddenImages + ` ` + word
        })
    }
}

const amountButtons = () => {
    let amountBoxes = document.querySelectorAll('.product-item-amount-field-container')
    if(amountBoxes.length > 0) {
        amountBoxes.forEach(box => box.addEventListener('click', (e)=> {
            let target = e.target,
                input = box.querySelector('input.product-item-amount-field')
            if(target.closest('.product-item-amount-field-btn-plus')){
                input.value = Number(input.value) + 1
            }
            if(target.closest('.product-item-amount-field-btn-minus')){
                if(input.value > 1)
                    input.value = Number(input.value) - 1
            }
        }))
    }
}

const cartMobileActions = () => {
    let actionToggler = document.querySelectorAll('.cart__product-actions--toggler')
    if(actionToggler.length > 0) {
        actionToggler.forEach(toggler => toggler.addEventListener('click', () => {
            toggler.nextElementSibling.classList.toggle('cart__product-actions--open')
        }))
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

window.addEventListener('resize', () => {
    // Burger menu init
    burger()

    // Hero slider
    heroSlider()

    // Sale slider
    saleSlider()

    // Other articles slider
    relatedArticlesSlider()

    // Categories slider
    categoriesSlider()

    // Catalog main filter
    catalogFilter()

    // Product Slider
    productSlider()

    // Related Product Slider
    relatedProductsSlider()

    // Orders accordion
    accountOrdersAccordion()

    // Orders count images
    accountImageCounter()
})

document.addEventListener('DOMContentLoaded', ()=>{
    // $.fancybox.open({src: '#success'});

    // Burger menu init
    burger()

    // Catalog menu
    catalogMenu()

    // Catalog menu hidden categories
    showHiddenMenuCategories()

    // Hero slider
    heroSlider()

    // Sale slider
    saleSlider()

    // Home page tabs
    homePageTabs()

    // Other articles slider
    relatedArticlesSlider()

    // Faq accordion
    faqAccordion()

    // Yandex Map
    ymapsRender()

    //  Categories slider
    categoriesSlider()

    // Catalog main filter
    catalogFilter()
    catalogFilterFirstOpen()

    // Custom selects
    customSelect()

    // Catalog view change
    catalogViewChange()

    // Read More Toggler
    readMore()

    // Product Slider
    productSlider()

    // Product tab init
    productTabs()

    // Related Product Slider
    relatedProductsSlider()

    // Add to cart action
    addToCart()

    // Orders accordion
    accountOrdersAccordion()

    // Orders count images
    accountImageCounter()

    // Amount buttons action
    amountButtons()

    if(document.documentElement.clientWidth < 768) {
        accountMobileActions()
        cartMobileActions()
    }
    
    // Phone mask
    inputMask()
})