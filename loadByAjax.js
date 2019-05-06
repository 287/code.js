//#!py
/**
 * @include getAjax
 */
function loadByAjax(url, cb)
	const xhr = getAjax()
	
	xhr.onreadystatechange = function()
		if xhr.readyState === 4
			if xhr.status === 200
				cb(null, xhr.response)
			else
				cb('ajax error')
			
	xhr.timer = setTimeout(()=> {
		xhr.open('GET', url, true)
		xhr.send()
	})
	
	xhr.cancel = ()=> 
		clearTimeout(xhr.timer)
		xhr.abort()
	
	return xhr