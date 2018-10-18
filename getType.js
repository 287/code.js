/**
 * @param {object} o - object
 * @param {boolean} [notLowerCase = false] - not toLowerCase
 * @return {string}
 */
function getType(o, notLowerCase) {
	var type = Object.prototype.toString.call(o).slice(8, -1);
	type = type !== 'Number' ? type : isNaN(o) ? 'NaN' : !isFinite(o) ? 'Infinity' : type;
	return !notLowerCase ? type.toLowerCase() : type;
}