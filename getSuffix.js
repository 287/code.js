function getSuffix(url){
	var suffix;
	suffix = (url != null ? url : '').match(/(\.[a-z0-9]+)$/);
	suffix = suffix ? suffix[1] : '';
	return suffix;
}