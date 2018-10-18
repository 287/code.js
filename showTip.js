/**
 * @include CommonModal
 * @param {object} op 
 * @param {object} op 
 */
function showTip(op){
	return new CommonModal(op);
}


tip = showTip({
	title: '',
	content: '你好',
});
tip.show()