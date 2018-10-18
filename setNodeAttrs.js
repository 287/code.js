//#!py
/**
 * @include eachObject setNodeAttr
 * @param {element} node
 * @param {object} attrs
 * @return {element}
 */
function setNodeAttrs(node, attrs, notSetKeys = [])
	eachObject(attrs, (value, key)=>{
		if notSetKeys.includes(key)
			return
		setNodeAttr(node, key, value)
	})
	return node