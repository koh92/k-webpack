function getCookie(name) {
	let matches = document.cookie.match(
		new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
	)
	return matches ? decodeURIComponent(matches[1]) : undefined
}

function setCookie(name, value, options = {}) {
	options = {
		path: "/",
		// при необходимости добавьте другие значения по умолчанию
		...options,
	}

	if (options.expires instanceof Date) {
		options.expires = options.expires.toUTCString()
	}

	let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value)

	for (let optionKey in options) {
		updatedCookie += "; " + optionKey
		let optionValue = options[optionKey]
		if (optionValue !== true) {
			updatedCookie += "=" + optionValue
		}
	}

	document.cookie = updatedCookie
}
// Пример использования:
// setCookie('user', 'John', {secure: true, 'max-age': 3600});

function deleteCookie(name) {
	setCookie(name, "", {
		"max-age": -1,
	})
}

const cookie = () => {
	let isCookiesAccepted = getCookie("isCookiesAccepted")
	if( ! isCookiesAccepted ) {
		let popupCookie = document.querySelector("#popup-cookie")
		if( ! popupCookie ) return

		let acceptButton = popupCookie.querySelector(".js-cookie-accept")
		if( ! acceptButton ) return

		acceptButton.addEventListener("click", ()=> {
			let date = new Date()
			date.setDate(date.getDate() + 30)
			// date.setMinutes(date.getMinutes() + 1)
			setCookie("isCookiesAccepted", 1, {"expires": date})
			popupCookie.classList.remove("active")
		})

		setTimeout(() => {
			popupCookie.classList.toggle("active")
		}, 2000)
		
		document.addEventListener("click", (e) => {
			let target = e.target

			if ( ( target.classList.contains("js-popup-close") || target.closest(".js-popup-close") ) && target.closest("#popup-cookie")) {
				let popupCookie = document.querySelector("#popup-cookie")
				if( ! popupCookie ) return

				popupCookie.classList.remove("active")
			}
		})
	}
}

document.addEventListener("DOMContentLoaded", () => {
    cookie()   
})