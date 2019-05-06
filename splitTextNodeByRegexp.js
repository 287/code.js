/**
 * @include matchAll insertNodeBefore splitStringByIndexs
 */
function splitTextNodeByRegexp(textNode, regx){
	let text = textNode.textContent;
	let list = [];
	let matchs = matchAll(text, regx);
	if(!matchs.length){
		return list;
	}
	let indexs = [].concat(...matchs.map((match)=> [match.index, match.index + match[0].length]));
	let texts = splitStringByIndexs(text, indexs);
	
	for(let i = 0; i < texts.length - 1; i += 2){
		let prevText = texts[i];
		let exp = texts[i + 1];
		let placeholder = document.createTextNode('');
		let prevNode = document.createTextNode(prevText);
		
		list.push([
			exp,
			placeholder,
		]);
		insertNodeBefore(prevNode, textNode);
		insertNodeBefore(placeholder, textNode);
	}
	textNode.textContent = texts[texts.length - 1];
	return list;
}