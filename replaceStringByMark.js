/**
 * 替换掉字符串中以单或双引号包裹起来的部分
 * @param {string} str
 * @return {array<string,array<string>>}
 */
function replaceStringByMark(str, chrs){
	let ranges = [];
	let marks = [];
	let mark = ['<-', '->'];
	{
		let skip = 0;
		let lastChr = '';
		let lastIndex = 0;
		chrs = chrs || ['"', "'"];
		for(let i = 0, l = str.length, chr; i < l; i++){
			chr = str[i];
			if(chrs.includes(chr)){
				if(lastChr){
					if(lastChr === chr && str[i - 1] !== '\\'){
						ranges.push([lastIndex, i + 1]);
						lastChr = '';
					}
				}else{
					lastChr = chr;
					lastIndex = i;
				}
			}
		}
	}
	if(ranges.length){
		let list = [];
		let lastIndex = 0;
		ranges.forEach(([start, end], i)=>{
			list.push(str.slice(lastIndex, start));
			list.push(mark[0] + i + mark[1]);
			lastIndex = end;
			marks.push(str.slice(start, end));
		});
		
		list.push(str.slice(lastIndex));
		str = list.join('');
	}
	
	return [str, marks, mark];
}