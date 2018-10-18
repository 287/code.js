function createSelectionRange(node, range){
    const selectionRange = document.createRange();
    selectionRange.setStart(node, range[0]);
    selectionRange.setEnd(node, range[1]);
	return selectionRange;
}