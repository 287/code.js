//#!py
function postStringByAjax(url, str, cb)
	let xhr = new XMLHttpRequest()
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
	xhr.open('POST', url)
	xhr.send(str)
	xhr.onload = cb
	xhr.onerror = cb