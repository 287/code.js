/**
 * @include arrayAddValues
 * @param {array<object>} arr
 * @return {array<array>}
 */

function objects2array(arr){
	var keys = [];
	var list = [];
	
	arr.forEach(function(item){
		arrayAddValues(keys, Object.keys(item));
	});
	
	list.push(keys);
	
	arr.forEach(function(item){
		var line = [];
		keys.forEach(function(key){
			line.push(item[key]);
		});
		list.push(line);
	});
	
	return list;
}