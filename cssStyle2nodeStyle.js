/**
 * @include toCamelCase
 * @param {object} style
 * @return {object}
 */
function cssStyle2nodeStyle(style){
	var parseKeys = {
		'font-weight': 'bold',
		'font-style': 'italic',
	};
	var aliasKeys = {
		'text-align': 'align',
	};
	var map = {};
	Object.keys(style).forEach(function(key){
		var value = style[key];
		var newKey;
		if(newKey = parseKeys[key]){
			value = value === newKey ? true : false;
		}else if(newKey = aliasKeys[key]){
			// nothing
		}else{
			newKey = toCamelCase(key);
		}
		map[newKey] = value;
	});
	return map;
}