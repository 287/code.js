/**
 * @param {string} exp - eg: .1 + .2
 */
function parseMathExp(exp){
	return Function('return ' + exp)().toFixed(6) * 1;
}