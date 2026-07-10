// Inputmask
import Inputmask from "inputmask"

// let mobile = window.matchMedia('(min-width: 0px) and (max-width: 1159px)');
// let desktop = window.matchMedia('(min-width: 1160px)');
// usage mobile.matches === true | false

const burger = () => {
	const menuToggle = document.querySelector(".js-menu-toggle");
	const mobilePanel = document.querySelector(".js-header-panel");
	const mobileHeader = document.querySelector(".js-header");
	const backdrop = document.querySelector(".js-backdrop");

	menuToggle.addEventListener("click", () => {
		const isOpened = menuToggle.getAttribute("aria-expanded") === "true"
		document.body.classList.toggle("noscroll")
		isOpened ? closeMenu() : openMenu()
	})

	function openMenu() {
		menuToggle.setAttribute("aria-expanded", "true")
		mobileHeader.setAttribute("data-state", "opened")
		backdrop.classList.add("active")
	}
	function closeMenu() {
		menuToggle.setAttribute("aria-expanded", "false")
		mobileHeader.setAttribute("data-state", "closing")
		backdrop.classList.remove("active")

		mobilePanel.addEventListener(
			"animationend",
			() => {
				mobileHeader.setAttribute("data-state", "closed")
			},
			{ once: true }
		)
	}
}

const menuTrigger = () => {
	const triggerBtns = document.querySelectorAll(".js-menu-trigger"),
		popup = document.querySelector(".header__menu")
	if (triggerBtns.length > 0 && popup) {
		triggerBtns.forEach((btn) =>
			btn.addEventListener("click", () => {
				popup.classList.toggle("active")
			})
		)
	}
}

let oldScrollY = 0
const scrollTopHeader = () => {
	let header = document.querySelector("header")
	if (document.documentElement.scrollTop < 5) {
		header.classList.remove("mod-fixed")
		// header.classList.remove("mod-blue-bg")
	} else {
		if (document.documentElement.scrollTop > 130) {
			header.classList.add("mod-fixed")
			// header.classList.add("mod-blue-bg")
		}
		let scrolled = window.scrollY || document.documentElement.scrollTop
		let dY = scrolled - oldScrollY

		if (dY < 0) {
			header.classList.add("mod-backscroll")
		} else {
			header.classList.remove("mod-backscroll")
		}

		if (scrolled > oldScrollY) {
			scrolled = scrolled - 30
		} else {
			scrolled = scrolled + 30
		}
		oldScrollY = scrolled
	}
}

// Пример подключения swiper'а
const exampleSlider = () => {
	if (document.querySelector(".js-example-swiper")) {
		// Подключение стрелок навигации, если они лежат не в контейнере слайдера
		let prevArrow = document.querySelector(".js-example-prev")
		let nextArrow = document.querySelector(".js-example-next")
		const exampleSwiper = new Swiper(".js-example-swiper", {
			slidesPerView: 1.2, // Кол-во слайдов для показа
			spaceBetween: 20, // Расстояние между слайдами
			speed: 800, // Скорость переключения слайдера
			loop: false, // Зациклить слайдер (дублирует DOM)
			rewind: true, // Перемотка в начало (просто перематыввает)
			slideToClickedSlide: true, // Перелистывание на слайд по клику
			simulateTouch: false, // Иммитировать перелистывание на ПК
			navigation: {
				// Навигация
				nextEl: ".js-example-next",
				prevEl: ".js-example-prev",
			},
			breakpoints: {
				// Адаптивы
				744: {
					slidesPerView: 2.2,
				},
				1220: {
					slidesPerView: 4,
				},
				1650: {
					slidesPerView: 5,
				},
			},
			pagination: {
				// Кастомная пагинация
				el: ".js-example-pagination",
				type: "bullets",
				clickable: true,
				renderBullet: function (index, className) {
					return `<span class="${className}">${(index + 1)}</span>`
				},
			},
			effect: "fade", // Эффект переключения слайдов
			fadeEffect: {
				crossFade: true, // Видимость задних элементов при переключении слайда
			},
		})
	}
}

// Переключение слайдов по ховеру на определенную область
const projectItemSlider = () => {
	if (document.querySelector(".js-project-item-swiper")) {
		let projectItemSwiper = new Swiper(".js-project-item-swiper", {
			slidesPerView: 1,
			spaceBetween: 10,
			speed: 800,
			loop: true,
			pagination: {
				el: ".js-project-item-pagination",
			},
		})

		// Проверяем ширину браузера больше 1280 и возможность клиента сделать ховер
		if (document.documentElement.clientWidth > 1280 && !global.matchMedia("(hover: none)").matches) {
			let allSliders = document.querySelectorAll(".js-project-item-swiper")
			if (allSliders.length > 0 && true) {
				allSliders.forEach((slider) => {
					slider.addEventListener("mousemove", (e) => {
						// Положение слайдера на странице
						let sliderPos = slider.getBoundingClientRect()
						let slider_left = sliderPos.left

						// Положение курсора внутри слайдера по оси X
						let x_letter = e.pageX - slider_left

						// Узнаем кол-во слайдов
						let length = slider.querySelectorAll(".swiper-slide").length

						// Узнаем ширину блока
						let width = slider.offsetWidth

						let go_to_slide = Math.ceil((x_letter * length) / width)

						if (go_to_slide < 1) {
							go_to_slide = 1
						}

						go_to_slide = go_to_slide - 1 // Отсчет слайдеров начинается с 0 (то есть первый слайд = 0)

						slider.swiper.slideTo(go_to_slide, 1000, false)
					})
				})
			}
		}
	}
}

// Кастомный input для файлов
const inputTypeFile = () => {
	let inputsArr = document.querySelectorAll('input[type="file"]'),
		allowedExtension = ["application/pdf", "application/vnd.ms-excel", "application/msword"], // for images ['image/*']
		allowedExtensionAlert = ["pdf", "excel", "word"]

	if (inputsArr.length > 0) {
		inputsArr.forEach((input) =>
			input.addEventListener("change", () => {
				let currentBtn = input.nextElementSibling || input.parentElement.nextElementSibling

				if (input.files.length > 1) {
					let fileNamesString = ""
					Array.from(input.files).forEach((file, i) => {
						if (allowedExtension.indexOf(file.type) > -1) {
							if (i > 0) fileNamesString += ", "
							fileNamesString += file.name
						} else {
							alert(
								`Недопустимый формат файла! Загрузите файл с расширением ${allowedExtensionAlert.toString()}`
							)
							return
						}
					})
					currentBtn.innerText = fileNamesString
				} else {
					let currentFile = input.files[0],
						currentFileType = currentFile.type,
						currentFileName = currentFile.name

					if (!currentFile) return

					if (allowedExtension.indexOf(currentFileType) > -1) {
						currentBtn.innerText = currentFileName
					} else {
						alert(
							`Недопустимый формат файла! Загрузите файл с расширением ${allowedExtensionAlert.toString()}`
						)
					}
				}
			})
		)
	}
}

// Аккордеон
const accordion = () => {
	document.addEventListener("click", (e) => {
		let target = e.target

		if (target.classList.contains("js-accordion-item-heading") || target.closest(".js-accordion-item-heading")) {
			target = target.classList.contains("js-accordion-item") ? target : target.closest(".js-accordion-item")
			if (target.classList.contains("active")) {
				target.classList.remove("active")
			} else {
				target.classList.add("active")
			}
		}
	})
}

// Copy text to rhe clip board
const copyText = () => {
	document.addEventListener("click", (e) => {
		let target = e.target

		if (target.classList.contains("js-copy-text") || target.closest(".js-copy-text")) {
			target = target.classList.contains("js-copy-text") ? target : target.closest(".js-copy-text")

			let text = target.dataset.copy
			if (text !== "") {
				navigator.clipboard
					.writeText(text)
					.then(() => {
						console.log("Скопировано")
					})
					.catch((error) => {
						console.error(`Текст не скопирован ${error}`)
					})
			}
		}
	})
}

const starsToggle = () => {
	document.addEventListener("click", (e) => {
		let target = e.target

		if (target.classList.contains(".js-rating-star") || target.closest(".js-rating-star")) {
			target = target.classList.contains(".js-rating-star") ? target : target.closest(".js-rating-star")

			let currentList = target.closest(".js-rating-stars"),
				currentItems = currentList.querySelectorAll(".js-rating-star"),
				currentRatingValue = +target.dataset.count + 1

			currentItems.forEach((star) => star.classList.remove("active"))
			for (let i = 0; i <= target.dataset.count; i++) {
				currentItems[i].classList.add("active")
			}

			let ratingInput = document.querySelector(".js-rating-value")
			if (ratingInput) {
				ratingInput.value = currentRatingValue
			}
		}
	})
}

const dropdown = () => {
	document.addEventListener("click", (e) => {
		let target = e.target

		if (target.classList.contains("js-dropdown-heading") || target.closest(".js-dropdown-heading")) {
			target = target.classList.contains("js-dropdown") ? target : target.closest(".js-dropdown")
			if (target.classList.contains("active")) {
				target.classList.remove("active")
			} else {
				target.classList.add("active")
			}
		}
	})
}

// Маска телефона РФ
const inputMask = () => {
	let inputTel = document.querySelectorAll('input[type="tel"]')
	if (inputTel.length) {
		inputTel.forEach((input) => {
			Inputmask("+7 (999) 999-99-99", { showMaskOnHover: false }).mask(input)
		})
	}
}

// Пример работы Contact Form 7
const cf7 = () => {
	// Предотвратить отправку с помощью cookie
	// https://gist.github.com/ihorduchenko/49fa0649da4df6bab72c71a3ba2aa07f

	// Всплывающее окно при успешной отправке формы
	document.addEventListener("wpcf7mailsent", function (event) {
		let formID = event.detail.contactFormId

		switch (formID) {
			case 164:
				thanksID = "#popup-thanks-register"
				break
			case 10:
				thanksID = "#popup-thanks-rating"
				break
		}

		event.detail.inputs.forEach(input => {
			if( input.name === "f2_event_id" ) {
				data.event_id = input.value
			}
			if( input.name === "f2_rating_value" ) {
				data.rating_value = input.value
			}
		})

		if (thanksID !== "") {
			try {
				// Static Fancybox
				Fancybox.close()
				Fancybox.show([
					{
						dragToClose: false,
						src: thanksID,
						type: "inline",
					},
				])

				// Ajax fancybox
				Fancybox.show([
					{
						src: ajaxURL,
						type: "ajax",
						filter: thanksID,
					},
				])
			} catch (e) {
				console.log(e.message)
			}
		}
	})

	// Обнуляем данные после успешной отправке формы
	// Обнудение данных актуально для Static Fancybox
	function getCurrentFileInput(form) {
		let currentForm = document.querySelector(form),
			inputTypeFile = currentForm.querySelector('input[type="file"]')

		return inputTypeFile ? inputTypeFile.parentElement.nextElementSibling : false
	}
	document.addEventListener("wpcf7mailsent", function (event) {
		let currentFileInput = getCurrentFileInput(event.detail.apiResponse.into)
		if (currentFileInput) {
			currentFileInput.innerText = "Выберите файл"
		}
	})
}

/*!
 * Sanitize an HTML string
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {String}          str   The HTML string to sanitize
 * @param  {Boolean}         nodes If true, returns HTML nodes instead of a string
 * @return {String|NodeList}       The sanitized string or nodes
 */
function cleanHTML(str, nodes) {
	/**
	 * Convert the string to an HTML document
	 * @return {Node} An HTML document
	 */
	function stringToHTML() {
		let parser = new DOMParser()
		let doc = parser.parseFromString(str, "text/html")
		return doc.body || document.createElement("body")
	}

	/**
	 * Remove <script> elements
	 * @param  {Node} html The HTML
	 */
	function removeScripts(html) {
		let scripts = html.querySelectorAll("script")
		for (let script of scripts) {
			script.remove()
		}
	}

	/**
	 * Check if the attribute is potentially dangerous
	 * @param  {String}  name  The attribute name
	 * @param  {String}  value The attribute value
	 * @return {Boolean}       If true, the attribute is potentially dangerous
	 */
	function isPossiblyDangerous(name, value) {
		let val = value.replace(/\s+/g, "").toLowerCase()
		if (["src", "href", "xlink:href"].includes(name)) {
			if (val.includes("javascript:") || val.includes("data:")) return true
		}
		if (name.startsWith("on")) return true
	}

	/**
	 * Remove potentially dangerous attributes from an element
	 * @param  {Node} elem The element
	 */
	function removeAttributes(elem) {
		// Loop through each attribute
		// If it's dangerous, remove it
		let atts = elem.attributes
		for (let { name, value } of atts) {
			if (!isPossiblyDangerous(name, value)) continue
			elem.removeAttribute(name)
		}
	}

	/**
	 * Remove dangerous stuff from the HTML document's nodes
	 * @param  {Node} html The HTML document
	 */
	function clean(html) {
		let nodes = html.children
		for (let node of nodes) {
			removeAttributes(node)
			clean(node)
		}
	}

	// Convert the string to HTML
	let html = stringToHTML()

	// Sanitize it
	removeScripts(html)
	clean(html)

	// If the user wants HTML nodes back, return them
	// Otherwise, pass a sanitized string back
	return nodes ? html.childNodes : html.innerHTML
}

function sanitizeText(text) {
	let regex = /^[a-zA-Zа-яА-Я0-9- ]+$/
	if (!regex.test(text)) {
		text = text.replace(/[^a-zA-Zа-яА-Я0-9- ]/g, "")
	}
	return text
}

function fillInput(slide, datasetName, inputName) {
	let trigger = slide.triggerEl,
		content = slide.contentEl

	if ( ! trigger && ! content)  {
		return
	}

	let datasetValue = trigger.dataset[datasetName] || trigger.closest(`[data-${datasetName}]`)?.dataset[datasetName]

	if ( ! datasetValue ) {
		return
	}

	let input = content.querySelector(inputName)
	if (input) {
		input.value = sanitizeText(datasetValue)
	}
	
}

const passwordToggler = () => {
	document.addEventListener("click", (e) => {
		let target = e.target

		if (target.classList.contains("js-password-toggler") || target.closest(".js-password-toggler")) {
			target = target.classList.contains("js-password-toggler") ? target : target.closest(".js-password-toggler")

			let parent = target.closest(".js-password-box"),
                input = parent.querySelector("input")

            if (input.getAttribute("type") === "password") {
                target.classList.add("visible")
                input.setAttribute("type", "text")
            } else {
                target.classList.remove("visible")
                input.setAttribute("type", "password");
            }
		}
	})
}

const inputTypeRange = () => {
	const minHandlerInput = document.querySelector(".js-custom-range-input-min")
	if (minHandlerInput) {
		minHandlerInput.addEventListener("input", inputTypeRangeMinHandler)
	}

	const maxHandlerInput = document.querySelector(".js-custom-range-input-max")
	if (maxHandlerInput) {
		maxHandlerInput.addEventListener("input", inputTypeRangeMaxHandler)
	}

	const minExtraHandlerInput = document.querySelector(".js-custom-range-extra-input-min input")
	if (minExtraHandlerInput && minHandlerInput) {
		minExtraHandlerInput.addEventListener("blur", setRangeMinValue)
	}

	const maxExtraHandlerInput = document.querySelector(".js-custom-range-extra-input-max input")
	if (maxExtraHandlerInput && maxHandlerInput) {
		maxExtraHandlerInput.addEventListener("blur", setRangeMaxValue)
	}

	function setRangeMinValue(){
		this.value = this.value > 0 ? this.value : 0
		
		minHandlerInput.value = this.value

		let customRangeBox = document.querySelector(".js-custom-range")
		if( ! customRangeBox ) return

		let currentPercent = Math.round(this.value * 100 / this.max)
		customRangeBox.style.setProperty("--value-1", currentPercent)
		minHandlerInput.nextElementSibling.value = this.value
	}
	function setRangeMaxValue(){
		if( this.value > 0) {
			maxHandlerInput.value = this.value

			let customRangeBox = document.querySelector(".js-custom-range")
			if( ! customRangeBox ) return

			let currentPercent = Math.round(this.value * 100 / this.max)
			customRangeBox.style.setProperty("--value-2", currentPercent)
			maxHandlerInput.nextElementSibling.value = this.value
		}
			
	}

	function inputTypeRangeMinHandler() {
		// Достает значение второго(правого) ползунка
		const maxHandlerPercent = event.target.parentNode.parentNode.style.getPropertyValue("--value-2")
        const maxHandlerTopLimit = event.target.max

        let currentValue = event.target.value
        let currentPercent = Math.round(event.target.value * 100 / maxHandlerTopLimit)

		if (parseInt(currentPercent) >= parseInt(maxHandlerPercent)) {
            currentValue = maxHandlerInput.value
			currentPercent = maxHandlerPercent

			event.target.value = maxHandlerInput.value
		}

		if (currentPercent === "100") {
			event.target.style.zIndex = "100"
		} else {
			event.target.style.zIndex = "0"
		}
        
		event.target.parentNode.parentNode.style.setProperty("--value-1", currentPercent)
		event.target.nextElementSibling.value = currentValue

        const minExtraHandlerInput = document.querySelector(".js-custom-range-extra-input-min input")
		if (minExtraHandlerInput) minExtraHandlerInput.value = currentValue
	}

	function inputTypeRangeMaxHandler() {
		// Достает значение первого(левого) ползунка
		const minHandlerPercent = event.target.parentNode.parentNode.style.getPropertyValue("--value-1")
        const minHandlerTopLimit = event.target.max
        
        let currentValue = event.target.value
        let currentPercent = Math.round(event.target.value * 100 / minHandlerTopLimit)

		if (parseInt(currentPercent) <= parseInt(minHandlerPercent)) {
            currentValue = minHandlerInput.value
			currentPercent = minHandlerPercent

			event.target.value = minHandlerInput.value
		}

		if (currentPercent === "0") {
			event.target.style.zIndex = "100"
		} else {
			event.target.style.zIndex = "0"
		}
		event.target.parentNode.parentNode.style.setProperty("--value-2", currentPercent)
		event.target.nextElementSibling.value = currentValue

        const maxExtraHandlerInput = document.querySelector(".js-custom-range-extra-input-max input")
		if (maxExtraHandlerInput) maxExtraHandlerInput.value = currentValue
	}
}

const tabs = () => {
	document.addEventListener("click", (e) => {
		let target = e.target

		if (target.classList.contains("js-tabs-control") || target.closest(".js-tabs-control")) {
			target = target.classList.contains("js-tabs-control") ? target : target.closest(".js-tabs-control")
			if( target.classList.contains("active") ) return

			let tabContainer = target.closest(".js-tabs")
			if( ! tabContainer ) return

			let tabsList = tabContainer.querySelectorAll(".js-tabs-element")
			let tabsControls = tabContainer.querySelectorAll(".js-tabs-control")
			if( tabsList.length === 0 || tabsControls === 0 ) return

			let newTab = tabContainer.querySelector(`.js-tabs-element[data-target=${target.dataset.target}]`)
			if( ! newTab ) return

			resetTabs(tabsControls)
			resetTabs(tabsList)
			if (target.classList.contains("active")) {
				target.classList.remove("active")
				newTab.classList.remove("active")
			} else {
				target.classList.add("active")
				newTab.classList.add("active")
			}
		}
	})

	function resetTabs(array) {
		array.forEach(item=>item.classList.remove("active"))
	}
}

const appHeight = () => {
	document.documentElement.style.setProperty("--safari-100-vh", `${window.innerHeight}px`)
}

document.addEventListener("DOMContentLoaded", () => {
	appHeight()

	// https://fancyapps.com/fancybox/api/methods/
	Fancybox.bind("[data-fancybox]", {
		closeButton: true,
		dragToClose: false,
		compact: true,
		preload: true,

		on: {
			"*": (fancyboxRef, eventName) => {
                console.log(`Fancybox eventName: ${eventName}`);
            },
			"Carousel.ready": () => {
                const slide = Fancybox.getSlide();
                console.log(
                    `The content of the slide #${slide.index} is loaded`
                );
            },
			done: (fancybox, slide) => {

				fillInput(slide, "event_name", ".js-event-name")
				fillInput(slide, "event_id", ".js-event-id")

				let form = slide.contentEl.querySelector(".wpcf7 > form")
				if (form) {
					wpcf7.init(form)
				}

				inputMask()

				inputTypeFile()
			},
		},
	})

	// Ajax Fancybox
	// Fancybox.show([
	// 	{
	// 	  src: ajaxURL, // путь до файла откуда брать форму
	// 	  type: "ajax",
	// 	  filter: "#popup-thanks"
	// 	},
	// ]);

	// Static Fancybox
	// Fancybox.show([{
	// 	dragToClose: false,
	// 	src: "#popup-thanks",
	// 	type: "inline",
	// }]);

	if (document.documentElement.clientWidth <= 1220) {
	}
})

window.addEventListener("resize", () => {})

window.addEventListener("scroll", function () {
	// scrollTopHeader()
})
