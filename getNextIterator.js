//#!py
/**
 * @include isNumber, isArrayLike, isIterator, isFunction
 * @param {any} o
 * @param {string} [type]
 * @return {function}
 */
function getNextIterator(o, type){
	if o != null
		let keys
		
		if !type
			if isNumber(o)
				type = 'number'
			else if isArrayLike(o)
				type = 'array'
			else if isIterator(o) || isFunction(o.entries)
				type = 'iterator'
				o = o.entries ? o.entries() : o
			else
				type = 'object'
				keys = Object.keys(o)
		
		Object.assign(next, {
			type,
			keys,
			object: o,
			index: 0,
		})
		
		return next
	
	
	function next()
		let rs = null
		
		switch next.type
			case 'number'
				if next.index < next.object
					rs = [next.index, next.index++]
				break
				
			case 'iterator'
				rs = next.object.next().value
				break
				
			case 'array'
				if next.index < next.object.length
					rs = [next.index, next.object[next.index++]]
				break
				
			case 'object'
				if next.index < next.keys.length
					let key = next.keys[next.index++]
					rs = [key, next.object[key]]
				break
		return rs