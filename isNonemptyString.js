/**
 * @include isString
 * @param {*} o
 * @return {boolean}
 */
function isNonemptyString(o){
	return isString(o) && o.length !== 0;
}