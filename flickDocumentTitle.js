//#!py
function flickDocumentTitle(title, op)
	const {interval = 500, timeout = 2000} = op || {}
	const titles = [title, document.title]
	document.title = titles[0]
	let index = 0
	
	const timer = setInterval(()=> {
		if index * interval > timeout
			return stop()
			
		const i = ++index % titles.length
		document.title = titles[i]
	}, interval)
	
	function stop()
		clearInterval(timer)
		document.title = titles[1]
		
	return stop