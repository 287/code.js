/**
 * get require module names like " * @import EventEmitter" -> [EventEmitter]
 * @include matchAll, splitSimple, addArrayValues, splitNamesByAlias
 * @param {string} content
 * @param {string} [tag = "require"] - eg: [require, import, export]
 * @param {boolean} [splitAlias = false] - eg: [require, import, export]
 * @return {array<string>|array<array<string>>}
 */
function getDocTagValues(content, tag, splitAlias){
	tag = tag || 'require'
	var list = [];
	var regx = new RegExp('\\n\\s{1,}\\* @'+ tag +' (.*)', 'g');
	matchAll(content, regx).forEach(function(match){
		addArrayValues(list, splitSimple(match[1]));
	});
	if(splitAlias){
		list = splitNamesByAlias(list);
	}
	return list;
}