/**
 * parse object to string
 * @param {object} o - the object
 * @param {list<string|regexp>} seps - separators list
 * @return {string}
 */
function object2string(o, seps){
	var rs = [];
	var key;
	seps = seps || [':', ','];
	
	for(key in o){
		if(o.hasOwnProperty(key)) rs.push(key + seps[0] + o[key]);
	}
	
	return rs.join(seps[1]);
}