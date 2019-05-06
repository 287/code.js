//#!py
/**
 * @include eachObject setNodeAttribute
 * @param {element} node
 * @param {object} attrs
 * @return {element}
 */
function setNodeAttributes(node, attrs, notSetKeys = [])
	eachObject(attrs, (value, key)=>{
		if notSetKeys.includes(key)
			return
		setNodeAttribute(node, key, value)
	})
	return node