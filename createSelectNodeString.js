/**
 * @param {array<object>} list - like [{title: 'item-1', value: '1'}]
 * @param {*} [defaultValue]
 * @param {object} [op]
 * @param {string} [op.text = 'title']
 * @param {string} [op.value = 'value']
 * @return {<element>}
 */
function createSelectNodeString(list, defaultValue, op){
	op = Object.assign({text: 'title', value: 'value'}, op);
	var item = document.createElement('div');
	var html = '';
	list.forEach(function(item){
		html += '<option value="'+ item[op.value] +'"'+ (defaultValue == item[op.value] ? ' selected' : '') +'>'+ item[op.text] +'</option>'
	});
	item.innerHTML = '<select>'+ html +'</select>';
	return item.childNodes[0];
}
