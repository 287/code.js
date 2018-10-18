function isEqualPoint(a, b){
	return a.length === b.length && a.every((value, i)=> value === b[i]);
}