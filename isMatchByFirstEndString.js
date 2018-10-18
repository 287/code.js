/**
 * @param {string} str
 * @param {array<string>} rules
 * @return {boolean}
 */
function isMatchByFirstEndString(str, rules){
	return str.slice(0, rules[0].length) === rules[0] && str.slice(str.length - rules[1].length) === rules[1];
}