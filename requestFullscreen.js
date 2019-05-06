//#!py
/**
 * @param {element} [node]
 */
function requestFullscreen(node = document.body)
	const keys = ['requestFullscreen', 'mozRequestFullScreen', 'msRequestFullscreen', 'webkitRequestFullscreen']
	const key = keys.find(key=> node[key])
	if key
		node[key]()