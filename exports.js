/**
 * @include exportModule
 * @param {object} o
 * @return {undefined}
 */
function exports(o){
	for(var key in o) exportModule(o[key], key);
}