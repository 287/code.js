function countChar(str, chr){
	let count = 0;
	if(chr.length){
		let lastIndex = 0;
		while((index = str.indexOf(chr, lastIndex)) !== -1){
			lastIndex = index + chr.length;
			count++;
		}
	}
	return count;
}