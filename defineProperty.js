//#!py
/**
 * @param {object} obj
 * @param {string} key
 * @param {object} op
 * @param {function} [op.get]
 * @param {function} [op.set]
 * @param {boolean} [withKey = false]
 */
function defineProperty(obj, key, op, withKey)
	if withKey
		const {get, set} = op
		op = Object.assign({}, op)
		if get
			op.get = function()
				return get.call(this, key)
		if set
			op.set = function(value)
				return set.call(this, key, value)
				
	if Object.defineProperty
		Object.defineProperty(obj, key, op)
	else if obj.__defineGetter__
		if op.get
			o.__defineGetter__(key, op.get)
		if op.set
			o.__defineSetter__(key, op.set)