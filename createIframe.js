//#!py
function createIframe(url, cb)
	const iframe = document.createElement('iframe')
	iframe.src = url
	iframe.style.display = 'none'
	document.body.appendChild(iframe)
	iframe.onload = ()=> cb(null, iframe, iframe.contentWindow)
	iframe.onerror = (e)=> cb(e)
	return iframe