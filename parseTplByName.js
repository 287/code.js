/**
 * @include getTpl, getTplByName, trim
 * @param {string} name - template name
 * @param {object} [data] - template data object
 * @param {object} [op] - parseTpl option
 * @return {string}
 */
function parseTplByName(name, data, op){
	return getTpl(name, data, Object.assign({}, op, {
		beforeGet: getTplByName,
		afterGet: trim,
	}));
}