/**
 * @include defineProperty
 * @param {object} obj
 * @param {string} key
 * @param {*} value
 */
function setProperty(obj, key, value){
	defineProperty(obj, key, {
		value: value,
		enumerable: false
	});
}