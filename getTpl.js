/**
 * @include parseTpl
 * @param {string} name - template name
 * @param {object} o - template data object
 * @param {object} op - parseTpl option
 * @param {function} op.beforeGet - beforeGet({string} name) return content
 * @param {function} [op.beforeGetName] - beforeGetName({string} name) return name
 * @param {function} [op.afterParse] - afterParse({string} content, {string} name) return name
 * @param {function} [op.afterGet] - afterGet({string} content, {string} name) return name
 * @param {function} [op.afterInclude] - afterGet({string} content, {string} name) return name
 * @return {string}
 */
function getTpl(name, data, op){
	op = Object.assign({
		beforeInclude: function(name, op){
			name = op.beforeGetName ? op.beforeGetName(name, op) : name;
			var content = op.beforeGet(name, op);
			if(op.afterGet){
				content = op.afterGet(content, name, op);
			}
			content = parseTpl(content, null, Object.assign({}, op, {
				justCompile: 1,
			}));
			if(op.afterInclude){
				content = op.afterInclude(content, name, op);
			}
			return content;
		},
	}, op);
	name = op.beforeGetName ? op.beforeGetName(name, op) : name;
	var content = op.beforeGet(name, op);
	if(op.afterGet){
		content = op.afterGet(content, name, op);
	}
	var rs = parseTpl(content, data, op);
	if(op.afterParse){
		rs = op.afterParse(rs, name, op);
	}
	return rs;
}