/**
 * @include createNode, parseString, style2string
 * @param {object} [op]
 * @param {number} [op.size = 10]
 * @param {string} [op.tpl = '<i class="resize-handle resize-handle-{key}" style="position:absolute;{style}"></i>']
 * @param {string} [op.output = 'string'] - [string|nodes]
 * @return {string|array<htmlelement>}
 */
function createResizeHandle(op){
	op = Object.assign({
		size: 8,
		tpl: '<i resize-handle="{key}" style="position:absolute;{style}"></i>',
		output: 'string',
		offset: '50%',
	}, op);
	
	var rs = [];
	var keys = ['top', 'bottom', 'left', 'right'];
	var ofstSize = typeof op.offset === 'string' && op.offset.slice(-1) === '%' ? op.offset.slice(0, -1) * 0.01 * op.size : op.offset * 1;
	keys.forEach(function(key, i){
		var o = {};
		o[key] = -ofstSize;
		
		if(i < 2){
			o.width = '100%';
			o.height = op.size;
			o.left = ofstSize;
			o.cursor = 's-resize';
		}else{
			o.width = op.size;
			o.height = '100%';
			o.top = ofstSize;
			o.cursor = 'w-resize';
		}
		
		o.style = style2string(o);
		o.key = key;
		var tpl = parseString(op.tpl, o);
		rs.push(tpl);
	});
	
	keys.slice(0, 2).forEach(function(key, i){
		keys.slice(2).forEach(function(key2, i2){
			var o = {};
			o[key] = o[key2] = -ofstSize;
			o.width = o.height = op.size;
			o.cursor = (i + i2) % 2 !== 0 ? 'sw-resize' : 'se-resize';
			
			o.style = style2string(o);
			o.key = key + key2;
			var tpl = parseString(op.tpl, o);
			rs.push(tpl);
		});
	});
	
	if(op.output === 'string'){
		rs = rs.join('');
	}else{
		rs = [].slice.call(createNode('<div>' + rs.join('') + '</div>').childNodes);
	}
	
	return rs;
}