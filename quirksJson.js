function quirksJson(s, strict){
	var rs = null, m
	;
	if(typeof s === 'string'){
		m = s.match(/#!quirksJson\[(\d+)\]/);
		s = !m ? strict ? rs : /\{|\[|"|[0-9]/.test(s.charAt(0)) ? s : '' : s.substr(m.index + m[0].length, m[1]);
		rs = s === '' ? rs : typeof JSON === 'undefined' ? eval(s) : (JSON.toObject || JSON.parse)(s);
	}
	return rs;
}