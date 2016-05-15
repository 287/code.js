function typeOf(o) {
	return Object.prototype.toString.call(o).slice(8, -1).replace(/^./, function(m){
		return m.toLowerCase();
	});
}