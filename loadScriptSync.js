/**
 * @param {string|array<string>} srcs
 * @param {object} [op]
 * @param {string} [op.tpl] - like <script src="{src}" charset="utf-8"></script>
 * @param {string} [op.prefix = '']
 * @return {<element>}
 */
function loadScriptSync(srcs, op){
	if(srcs && document.readyState !== 'complete'){
		op = Object.assign({
			tpl: '<script src="{src}" charset="utf-8"></script>'
			, prefix: ''
		}, op);
		srcs = srcs.constructor === Array ? srcs : [srcs];
		var list = [];
		srcs.forEach(function(src){
			if(typeof src === 'string'){
				list.push(op.tpl.replace('{src}', op.prefix + src));
			}
		});
		if(list.length) document.write(list.join(''));
	}
}