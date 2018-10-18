//#!py
/**
 * @include getNodeClass
 * @return {boolean}
 */
function isNodeHasClass(node, className)
	return getNodeClass(node).includes(className)