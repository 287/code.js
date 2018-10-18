/**
 * @param {string} s - s in RegExp(s, g)
 * @param {string} g - g in RegExp(s, g)
 * @param {string} chars - char to escape
 * @param {regexp}
 */
function string2regexp(s, g, chars){
	if(chars){
		chars = chars.replace(/./g, function(m){
			return '|\\'+ m;
		}).substr(1);
		s = s.replace(new RegExp(chars, 'g'), function(m){ return '\\' + m; });
	}
	s = s.replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\f/g, '\\f').replace(/\t/g, '\\t').replace(/\v/g, '\\v');
	s = new RegExp(s, g);
	return s;
}