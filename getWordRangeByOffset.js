
function getWordRangeByOffset(text, index){
	let range = [0, text.length];
	if(!isWordLetter(text.charAt(index))){
		return [index, index];
	}
	for(let i = index; i >= 0; i--){
		// console.log('-', i, text.charAt(i))
		if(!isWordLetter(text.charAt(i))){
			range[0] = ++i;
			break;
		}
	}
	for(let i = index + 1; i <= text.length; i++){
		// console.log('+', i, text.charAt(i))
		if(!isWordLetter(text.charAt(i))){
			range[1] = i;
			break;
		}
	}
	
	return range;
	
	function isWordLetter(chr){
		return /^[0-9a-z]$/i.test(chr);
		// let code = chr.charCodeAt(0);
		// return (code >= 65 && code <=90) || (code >= 97 && code <=122);
	}
}

