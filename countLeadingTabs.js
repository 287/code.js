/**
 * 统计前导缩进次数 - 默认支持tab 和 4个空格缩进
 * @include countChar
 * @param {string} str
 * @param {number} [spaceLength = 4] - 空格缩进的长度
 * @return {number}
 */
function countLeadingTabs(str, spaceLength = 4){
	var count = 0;
	var tabChar = '\t';
	var match;
	
	if((match = str.match(/^\s*/)) && match[0].length > 0){
		match = match[0];
		if(match[0] !== tabChar){
			tabChar = ' '.repeat(spaceLength);
		}
		count = countChar(match, tabChar);
	}
	
	return count;
}