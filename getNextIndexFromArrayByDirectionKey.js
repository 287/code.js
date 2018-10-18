//#!py
/**
 * @desc 
 * @include getNextIndexFromLengthByDirectionKey
 * @param {array} array
 * @param {any} value
 * @param {string} key - [prev, next]
 * @return {number}
 */
function getNextIndexFromArrayByDirectionKey(array, value, key)
	return getNextIndexFromLengthByDirectionKey(array.length, array.indexOf(value), key)