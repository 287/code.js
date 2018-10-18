/**
 * @include getTpl, fsGetSync
 * @param {string} name - template name
 * @param {object} [data] - template data object
 * @param {object} [op] - parseTpl option
 * @param {string} [op.extname = '.htm']
 * @param {string} [op.dir = './']
 * @return {string}
 */
function parseHtmByName(name, data, op){
	return getTpl(name, data, Object.assign({
		extname: '.htm',
		dir: '',
		beforeGet: fsGetSync,
		beforeGetName: function(name, op){
			return op.dir + name + op.extname;
		},
	}, op));
}