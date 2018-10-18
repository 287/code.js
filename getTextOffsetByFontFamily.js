/**
 * @param {string} fontFamily
 * @return {array<number>}
 */
function getTextOffsetByFontFamily(fontFamily){
	var offsetCache = window._TextOffsetCache = window._TextOffsetCache || {};
	if(!offsetCache[fontFamily]){
		var oft = getTextRect(fontFamily);
		oft.forEach(function(v, i){
			oft[i] = (v - 1) * .5;
		});
		if(oft[1] > 0){
			oft[1] = .2;
		}
		offsetCache[fontFamily] = oft;
	}
	return offsetCache[fontFamily];
	
	function getTextRect(fontFamily){
		var fontSize = 100;
		var text = '专业';
		var node = document.createElement('textspan');
		node.innerHTML = text;
		node.style.display = 'inline';
		node.style.fontFamily = fontFamily;
		node.style.fontSize = fontSize + 'px';
		document.body.appendChild(node);
		var op = node.getBoundingClientRect();
		node.parentNode.removeChild(node);
		return [op.width / fontSize / text.length, op.height / fontSize];
	}
}