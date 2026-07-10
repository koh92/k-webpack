
const burger = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    // const mobileHeader = document.querySelector('.js-header-nav-menu');
    const mobileHeader = document.querySelector('.js-header');
    
    menuToggle.addEventListener('click', () => {
        const isOpened = menuToggle.getAttribute('aria-expanded') === "true";
        document.body.classList.toggle('noscroll')
        isOpened ? closeMenu() : openMenu();
    });
    
    function openMenu() {
        menuToggle.setAttribute('aria-expanded', "true");
        mobileHeader.setAttribute('data-state', "opened");
    }
    function closeMenu() {
        menuToggle.setAttribute('aria-expanded', "false");
        mobileHeader.setAttribute('data-state', "closing");
        
        mobileHeader.addEventListener('animationend', () => {
            mobileHeader.setAttribute('data-state', "closed");
        }, {once: true})
    }
}

let oldScrollY = 0;
const scrollTopHeader = () => {
	let header = document.querySelector('header')
	if (document.documentElement.scrollTop < 5) {
		header.classList.remove('mod-fixed')
		// header.classList.remove('mod-blue-bg')
	} else {
		if (document.documentElement.scrollTop > 130) {
			header.classList.add('mod-fixed')
			// header.classList.add('mod-blue-bg')
		}
		let scrolled = window.scrollY || document.documentElement.scrollTop
		let dY = scrolled - oldScrollY

		if (dY < 0) {
			header.classList.add('mod-backscroll')
		} else {
			header.classList.remove('mod-backscroll')
		}

        if(scrolled > oldScrollY){
            scrolled = scrolled - 30
        } else {
            scrolled = scrolled + 30
        }
		oldScrollY = scrolled;
	}
}

const appHeight = () => {
    document.documentElement.style.setProperty('--safari-100-vh', `${window.innerHeight}px`)
}

document.addEventListener('DOMContentLoaded', ()=>{
    appHeight()

	burger()

    scrollTopHeader()

	// https://fancyapps.com/fancybox/api/methods/
	Fancybox.bind("[data-fancybox]", {
		closeButton: true,
		dragToClose: false,
        compact: true,
        preload: true,
	});

    if(document.documentElement.clientWidth <= 1220) {}
})

window.addEventListener('resize', () => {

})

window.addEventListener('scroll', function () {
    scrollTopHeader()
})