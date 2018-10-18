/**
 * @include createNode, parseString, style2string
 * @param {object} [op]
 * @param {number} [op.size = 10]
 * @param {string} [op.tpl = '<i class="resize-handle resize-handle-{key}" style="position:absolute;{style}"></i>']
 * @param {string} [op.output = 'string'] - [string|nodes]
 * @return {string|array<htmlelement>}
 */
function createResizeBorder(op){
	/*!common style
	[resize-border], [resize-handle]{
		position:absolute;
	}
	[resize-border]{
		cursor: move;
		background: linear-gradient(-45deg, #999 20%, #FFF 20%, #FFF 50%, #999 50%, #999 70%, #FFF 70%, #FFF) 0 0 / 4px 4px repeat;
	}
	[resize-handle]{
		background: #fff;
	}
	[resize-handle]:after{
		content: '';
		border-radius: 50%;
		display: block;
		background: #fff;
		width: 100%;
		height: 100%;
		border: 1px #666 solid;
		margin: -1px 0 0 -1px;
	}
	*/
	op = Object.assign({
		size: 8,
		borderTpl: '<s resize-border="{key}" style="{style}"></s>',
		handleTpl: '<i resize-handle="{key}" style="{style}"></i>',
		output: 'string',
		offset: '100%',
	}, op);
	
	var rs = [];
	var keys = ['top', 'bottom', 'left', 'right'];
	var ofstSize = typeof op.offset === 'string' && op.offset.slice(-1) === '%' ? op.offset.slice(0, -1) * 0.01 * op.size : op.offset * 1;
	keys.forEach(function(key, i){
		var o = {};
		o[key] = -ofstSize;
		o.cursor = 'move';
		if(i < 2){
			o.width = '100%';
			o.height = op.size;
			o.left = 0;
		}else{
			o.width = op.size;
			o.height = '100%';
			o.top = 0;
		}
		o.style = style2string(o);
		o.key = key;
		var tpl = parseString(op.borderTpl, o);
		rs.push(tpl);
	});
	keys.forEach(function(key, i){
		var o = {};
		o[key] = -ofstSize;
		
		if(i < 2){
			o.width = op.size;
			o.height = op.size;
			o.left = '50%';
			o['margin-left'] = -op.size / 2;
			o.cursor = 's-resize';
		}else{
			o.width = op.size;
			o.height = op.size;
			o.top = '50%';
			o['margin-top'] = -op.size / 2;
			o.cursor = 'w-resize';
		}
		
		o.style = style2string(o);
		o.key = key;
		var tpl = parseString(op.handleTpl, o);
		rs.push(tpl);
	});
	
	keys.slice(0, 2).forEach(function(key, i){
		keys.slice(2).forEach(function(key2, i2){
			var o = {};
			o[key] = o[key2] = -ofstSize;
			o.width = o.height = op.size;
			o.cursor = (i + i2) % 2 !== 0 ? 'sw-resize' : 'se-resize';
			
			o.style = style2string(o);
			o.key = key +'-'+ key2;
			var tpl = parseString(op.handleTpl, o);
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