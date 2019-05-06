/**
 * @param {string} string
 * @param {regexp} regx - if regx.global === true then match all
 * @return {array<array>}
 */
function matchAll(string, regx){
	var list = [];
	var match;
	regx.lastIndex = 0;
	while(match = regx.exec(string)){
		delete match.input;
		list.push(match);
		if(!regx.global){
			break;
		}
	}
	return list;
}