//#!py
/**
 * @desc 
 * @include eachObject isObject object2string
 * @param {string} passwd
 * @return {string}
 */
function object2node(obj)
	const {tagName = 'node'} = obj
	const node = document.createElement(tagName)
	eachObject(obj, (value, key)=> {
		if ['tagName', 'childs', 'children'].includes(key)
			return
			
		if isObject(value)
			value = object2string(value, [':', ';'])
			
		node.setAttribute(key, value)
	})
	
	return node