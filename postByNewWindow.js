//#!py
/**
 * @include createFormByData
 * @param {string} url
 * @param {object|string} data
 * @return {undefined}
 */
function postByNewWindow(url, data)
	let form = createFormByData(data)
	Object.assign(form, {
		action: url,
		target: '_blank',
		method: 'post',
	})
	document.body.appendChild(form)
	form.submit()
	document.body.removeChild(form)