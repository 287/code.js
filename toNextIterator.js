/**
 * @include getIterator
 * @param {any} o
 * @return {array}
 */
function toNextIterator(o){
	let iterator = getIterator(o);
	return next;
	function next(){
		return iterator && iterator.next().value;
	}
}