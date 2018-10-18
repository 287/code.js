//#!py
/**
 * @include getAjax
 */
function loadByAjax(url, cb)
	const xhr = getAjax()
	xhr.open('GET', url, true)
	xhr.onreadystatechange = function()
		if xhr.readyState === 4
			let err = null, rs
			if xhr.status === 200
				rs = xhr.responseText
			else
				err = 'ajax get error'
			
			cb(err, rs)
	setTimeout(()=> xhr.send())
	return xhr