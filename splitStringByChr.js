/**
 * 拆分字符串，规避()[]""''等字符的包裹
 * @include findChrIndexWithoutWrapInString
 * @param {string} str
 * @param {string} chr
 * @return {array<string>}
 */
function splitStringByChr(str, chr){
	let list = [];
	let lastIndex = 0;
	let index = 0;
	while((index = findChrIndexWithoutWrapInString(str, chr, lastIndex)) !== -1){
		list.push(str.slice(lastIndex, index));
		lastIndex = index + 1;
	}
	list.push(str.slice(lastIndex));
	return list;
}