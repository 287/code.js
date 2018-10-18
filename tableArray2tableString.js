/**
 * @include isFunction, isObject
 * @param {array<array>} arr
 * @param {object} [op]
 * @param {object|function} [op.parseValue]
 * @return {string}
 */
function tableArray2tableString(arr, op){
	op = op || {};
	var list = [];
	arr.forEach(function(item){
		list.push('<tr>');
		item.forEach(function(value){
			if(op.parseValue){
				if(isFunction(op.parseValue)){
					value = op.parseValue(value);
				}else if(isObject(op.parseValue)){
					value = op.parseValue[value] || value;
				}else if(value == null){
					value = '';
				}
			}
			list.push('<td>'+ value +'</td>');
		});
		list.push('</tr>');
	});
	list = '<table>'+ list.join('') +'</table>';
	return list;
}