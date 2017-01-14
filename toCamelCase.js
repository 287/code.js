function toCamelCase(name){
	return name.replace(/(?!^)(?:_|-)([a-z])/g, function(t, m){
		return m.toUpperCase();
	});
}