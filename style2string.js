/**
 * @param {object} style
 */
function style2string(style){
	var rs = '';
	if(style && typeof style === 'object'){
		var list = [];
		for(var key in style){
			var value = style[key];
			if(value != null){
				list.push(key + ':' + value + (typeof value === 'number' ? 'px' : ''));
			}
		}
		rs = list.join(';');
	}
	return rs;
}