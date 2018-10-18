//#!py
/**
 * @include isArrayLike isArray
 * @param {arrayLike} arrayLike
 * @param {number} [start = 0]
 * @return {array}
 */
function toArray(arrayLike, start)
	if isArrayLike(arrayLike) || start != null
		return Array.prototype.slice.call(arrayLike, start)
	else
		return isArray(arrayLike) ? arrayLike : [arrayLike]