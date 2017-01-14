function toSnakeCase(name, sep){
	return name.replace(/(?!^)([A-Z])/g, function(t, m){
		return (!sep ? '_' : sep) + m.toLowerCase();
	});
}