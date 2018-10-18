/**
 * @include generateFontSizeCache
 * @param {string} text
 * @param {object} op
 * @param {string} op.fontFamily
 * @param {number} op.fontSize
 * @param {boolean} [op.bold = false]
 * @param {boolean} [op.italic = false]
 * @return {object}
 */
function getTextSize(text, op){
	var fontMap = typeof fontSizeCaches === 'object' && fontSizeCaches[op.fontFamily] ? fontSizeCaches[op.fontFamily] : generateFontSizeCache(op.fontFamily);
	var type = '';
	if(op.bold){
		type += 'b';
	}
	if(op.italic){
		type += 'i';
	}
	var map = fontMap[type];
	var width = 0;
	var height = fontMap.height;
	
	for(var i = 0, l = text.length, chr; i < l; i++){
		chr = text.charAt(i);
		width += (map[chr] != null ? map[chr] : text.charCodeAt(i) > 20000 ? map['中'] : 0);
	}
	return [width * op.fontSize, height * op.fontSize];
}