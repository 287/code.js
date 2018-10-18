/**
 * @param {string} fontFamily
 * @return {object}
 */
function generateFontSizeCache(fontFamily){
	var params = [{"bold":false,"italic":false},{"bold":false,"italic":true},{"bold":true,"italic":false},{"bold":true,"italic":true}];
	var fontSize = 100;
	var _global = window;
	var caches = _global.fontSizeCaches = _global.fontSizeCaches || {};
	var cache = caches[fontFamily] = caches[fontFamily] || {};
		
	var chrs = ['中'];
	for(var i = 1; i <= 127; i++) chrs.push(String.fromCharCode(i));
		
	var node = document.createElement('textspan');
	Object.assign(node.style, {
		display: 'inline',
		fontSize: fontSize + 'px',
		fontFamily: fontFamily,
		whiteSpace: 'pre',
		tabSize: 4,
	});
	document.body.appendChild(node);
	
	params.forEach((param)=>{
		var type = '';
		if(param.bold){
			node.style.fontWeight = 'bold';
			type += 'b';
		}
		if(param.italic){
			node.style.fontStyle = 'italic';
			type += 'i';
		}
		var map = cache[type] = cache[type] || {};
		
		chrs.forEach((chr, i)=>{
			node.innerHTML = chr;
			var op = node.getBoundingClientRect();
			map[chr] = op.width / fontSize;
			if(!cache.height){
				cache.height = op.height / fontSize;
			}
		});
	});
	node.parentNode.removeChild(node);
	return cache;
}