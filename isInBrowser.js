//#!py
function isInBrowser()
	return typeof window === 'object' && Object.prototype.toString.call(window) === '[object Window]'