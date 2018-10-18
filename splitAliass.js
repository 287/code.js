/**
 * @param {array} list
 * @return {array}
 */
function splitAliass(list){
	var rs = [
		[],
		[],
	];
	list.forEach(function(name, i){
		var t = name.split(':');
		t[1] = t.length === 1 ? '' : t[1];
		rs[0].push(t[0]);
		rs[1].push(t[1]);
	});
	return rs;
}