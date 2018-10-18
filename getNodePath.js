//#!py
/**
 * @include getNodeParents
 * @param {element} [dom]
 * @param {string} type
 * @param {function} [cb]
 */
function getNodePath(node)
	const list = getNodeParents(node)
	list.unshift(node)
		
	return list