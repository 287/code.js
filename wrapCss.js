/**
 * @param {string} css
 * @param {string} wrapperKey
 * @return {string}
 */
function wrapCss(css, prefix){
	var map = {};
	var list = [];
	var key;
	
	css.split(/\{|\}/g).forEach(function(str, i){
		if(i % 2 === 0){
			key = prefix + ' ' + str.replace(/,/g, ', ' + prefix + ' ');
		}else{
			map[key] = str;
		}
	});
	
	for(key in map){
		list.push(key + '{' + map[key] + '}');
	}
	
	return list.join('');
}