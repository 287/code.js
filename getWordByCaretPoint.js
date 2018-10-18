/**
 * @include getWordRangeByOffset
 */
function getWordByCaretPoint(p){
	let caretRange = document.caretRangeFromPoint(...p);
	let range;
	let word;
	let node;
	
	if(caretRange && (node = caretRange.commonAncestorContainer) && node.nodeType === 3){
		let textContent = node.textContent;
		let index = caretRange.startOffset;
		
		if(textContent){
			let wordRange = getWordRangeByOffset(textContent, index);
			let wordText = textContent.slice(...wordRange);
			if(wordRange[1] > wordRange[0] && wordText.length){
				range = wordRange;
				word = wordText;
			}
		}
	}
	
	return {
		word,
		range,
		node,
	};
}