/**
 * @param {object} o
 * @return {array}
 */
function getObjectValues(o){
	var list = [];
	for(var i = 0, keys = Object.keys(o); i < keys.length; i++){
		list.push(o[keys[i]]);
	}
	return list;
}