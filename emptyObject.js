/**
 * @param {object} o
 * @return {object}
 */
function emptyObject(o){
	Object.keys(o).forEach(key=> delete o[key]);
	return o;
}