//#!py
/**
 * @desc 
 * @include parseXtml createNode
 * @param {string} string
 * @return {element}
 */
function createAframeNode(xml)
	if !xml.includes('</')
		xml = parseXtml(xml, {
			tagNamePrefix: 'a-',
		})
	return createNode(xml)