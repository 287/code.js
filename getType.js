function typeOf(o, notLowerCase) {
	var type = Object.prototype.toString.call(o).slice(8, -1);
	type = type !== 'Number' ? type : isNaN(o) ? 'NaN' : !isFinite(o) ? 'Infinity' : type;
	return !notLowerCase ? type.toLowerCase() : type;
}