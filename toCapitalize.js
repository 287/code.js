function toCapitalize(text){
	return text.replace(/./, function(t){
		return t.toUpperCase();
	});
}