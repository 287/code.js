function quirksJson(s, strict) {
	var rs = null;
	if (typeof s === 'string') {
		var m = s.match(/#!quirks(?:-json-)?(\d+):/);
		s = !m ? strict ? rs : s : s.substr(m.index + m[0].length, m[1]);
		rs = JSON.parse(s);
	}
	return rs;
}