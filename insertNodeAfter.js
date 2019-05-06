//#!py
/**
 * @desc 插入指定元素后
 * @include isArray
 * @param {element|array<element>} node
 * @param {element} placeholder
 * @return {element|undefined}
 */
function insertNodeAfter(node, placeholder)
	const pNode = placeholder.parentNode
	if pNode
		let prevNode = placeholder
		let curNode
		placeholder = placeholder.nextSibling
		const nodes = isArray(node) ? node : [node]
		for nodes as node, -
			curNode = prevNode.nextSibling
			prevNode = node
			if curNode === node
				continue
			pNode.insertBefore(node, curNode)
		return node
