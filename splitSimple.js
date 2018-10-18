/**
 * split by "," or " ", if exists "," in text then split by "," otherwise by " "
 * @param {string} text
 * @return {array}
 */
function splitSimple(text){
	var sep = /(: |,)/.test(text) ? ',' : ' ';
	text = text.replace(sep === ' ' ? /\s+/g : /(\s*,\s*)+/g, ',').replace(/\s+|^,|,$/g, '');
	return text === '' ? [] : text.split(',');
}