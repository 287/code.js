//#!py
function createSrcNode(tagName, src, cb)
	const node = document.createElement(tagName)
	node.src = src
	node.onload = ()=> cb && cb()
	node.onerror = cb
	return node