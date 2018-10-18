//#!py
/**
 * @desc 
 * @include getNextIndexFromLengthByDirectionKey
 * @param {array} array
 * @param {any} value
 * @param {string} key - [prev, next]
 * @return {any}
 */
function getNextValueFromArrayByDirectionKey(array, value, key)
	return array[getNextIndexFromLengthByDirectionKey(array.length, array.indexOf(value), key)]