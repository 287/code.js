//#!py
function dispatchNodeEvent(node, type, op)
	const e = new Event(type)
	Object.assign(e, op)
	node.dispatchEvent(e)
	return e