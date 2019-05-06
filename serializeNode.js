//#!py
/**
 * @param {element} node
 * @return {string}
 */
function serializeNode(node)
	const serializer = new XMLSerializer()
	return serializer.serializeToString(node)