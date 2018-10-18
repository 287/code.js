function toUnCapitalize(text){
	return text.replace(/./, function(t){
		return t.toLowerCase();
	});
}