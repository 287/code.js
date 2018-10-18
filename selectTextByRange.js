/**
 * @include createSelectionRange, addSelectionRange
 */
function selectTextByRange(textNode, range){
    const selectionRange = createSelectionRange(textNode, range);
	addSelectionRange(selectionRange);
	return selectionRange;
}