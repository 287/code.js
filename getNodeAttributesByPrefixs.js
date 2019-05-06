//#!py
/**
 * @include getNodeAttributes splitOnce
 * @param {element} node
 * @param {string} [sep = ':']
 * @return {object}
 */
function getNodeAttributesByPrefixs(node, sep = ':')
	const attrs = getNodeAttributes(node)
	const prefixs = {}
	for attrs as attrValue, attrKey, i
		const [prefix, key] = splitOnce(attrKey, sep)
		if key !== undefined
			prefixs[prefix] = prefixs[prefix] || {}
			prefixs[prefix][key] = attrValue
			
	return prefixs