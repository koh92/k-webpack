import "./icons.js"

const DESKTOP_BREAKPOINT = window.DESKTOP_BREAKPOINT || 1220
const mediaQuery = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`)
// Имя события для согласования взаимоисключающих UI-блоков (бургер, поиск и т.д.) —
// при открытии одного блока остальные, подписанные на это событие, закрываются сами.
const EXCLUSIVE_UI_EVENT = "ui:exclusive-open"

const burger = () => {
	const header = document.querySelector(".js-header")
	const backdrop = document.querySelector('.js-backdrop')
	if (!header) return // защита от ошибок, если шапки нет на странице

	let isAnimating = false

	// Вспомогательная функция для обновления aria-expanded у ВСЕХ кнопок на странице
	const updateTogglesAria = (state) => {
		const toggles = document.querySelectorAll(".js-menu-toggle")
		toggles.forEach(toggle => toggle.setAttribute("aria-expanded", state))
	}

	document.addEventListener("click", (e) => {
		if (isAnimating) return // игнорируем клики, пока идёт анимация

		const menuToggle = e.target.closest(".js-menu-toggle")
		const clickedBackdrop = e.target.closest(".js-backdrop")
		
		// 1. Обработка клика по бургеру
		if (menuToggle) {
			const isOpened = menuToggle.getAttribute("aria-expanded") === "true"
			isOpened ? closeMenu() : openMenu()
			return
		}

		// 2. Обработка клика по бэкдропу (только на десктопе и если меню открыто)
		if (clickedBackdrop && mediaQuery.matches && header.getAttribute("data-state") === "opened") {
			closeMenu()
		}
	})

	// закрываем бургер, если открылся какой-то другой эксклюзивный UI-блок (например, поиск)
	document.addEventListener(EXCLUSIVE_UI_EVENT, (e) => {
		if (e.detail.source !== "burger") closeMenu()
	})

	function openMenu() {
		document.dispatchEvent(new CustomEvent(EXCLUSIVE_UI_EVENT, { detail: { source: "burger" } }))

		isAnimating = true
		updateTogglesAria("true")
		header.setAttribute("data-state", "opening")
		
		// Включаем бэкдроп ТОЛЬКО если мы на десктопе
		if (backdrop && mediaQuery.matches) {
			backdrop.classList.add("active")
		}

		header.addEventListener(
			"transitionend",
			() => {
				header.setAttribute("data-state", "opened")
				isAnimating = false
			},
			{ once: true },
		)
	}

	function closeMenu() {
		if(header.getAttribute("data-state") !== "opened") return

		isAnimating = true
		updateTogglesAria("false")
		header.setAttribute("data-state", "closing")
		
		// Убираем бэкдроп (проверка matches не обязательна, класс снимется в любом случае)
		if (backdrop) backdrop.classList.remove("active")

		header.addEventListener(
			"transitionend",
			() => {
				header.setAttribute("data-state", "closed")
				isAnimating = false
			},
			{ once: true },
		)
	}

	mediaQuery.addEventListener("change", closeMenu)
}

const searchTrigger = () => {
	const popup = document.querySelector(".js-search-box")
	const backdrop = document.querySelector(".js-backdrop")

	function openSearch() {
		document.dispatchEvent(new CustomEvent(EXCLUSIVE_UI_EVENT, { detail: { source: "search" } }))

		if (popup) popup.classList.add("active")
		if (backdrop) backdrop.classList.add("active")
	}

	function closeSearch() {
		if (popup && !popup.classList.contains("active")) return

		if (popup) popup.classList.remove("active")
		if (backdrop) backdrop.classList.remove("active")
	}

	document.addEventListener("click", (e) => {
		if (e.target.closest(".js-search-trigger")) {
			openSearch()
		}

		if (e.target.closest(".js-backdrop")) {
			closeSearch()
		}
	})

	// закрываем поиск, если открылся какой-то другой эксклюзивный UI-блок (например, бургер)
	document.addEventListener(EXCLUSIVE_UI_EVENT, (e) => {
		if (e.detail.source !== "search") closeSearch()
	})
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

    // scrollTopHeader()

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
    // scrollTopHeader()
})