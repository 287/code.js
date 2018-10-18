/**
 * @param {object} o
 * @return {array}
 */
function getObjectKeys(o){
	var list = [];
	if(o != null){
		for(var key in o){
			o.hasOwnProperty(key) && list.push(key);
		}
	}
	return list;
}