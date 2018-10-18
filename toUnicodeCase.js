function toUnicodeCase(string){
	var text = [];
	for(var i = 0, charCode, chr; i < string.length; i++){
		chr = string.charAt(i)
		charCode = chr.charCodeAt(0);
		if(charCode > 256){
			chr = "\\u" + charCode.toString(16);
		}
		text.push(chr);
	}
	return text.join('');
}