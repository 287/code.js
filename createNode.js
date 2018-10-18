//#!py
/**
 * @include isString trim toArray
 */
function createNode(html, justFirstChildNode = true)
	let node = document.createElement('div')
	if isString(html)
		node.innerHTML = trim(html)
		const childs = toArray(node.childNodes)
		node = justFirstChildNode ? childs[0] : childs
	return node