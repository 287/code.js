/**
 * @include isFunction
 * @param {object} op
 * @param {string} op.object
 * @param {function} op.next
 * @param {boolean} [op.done]
 * @param {function} [op.init]
 * @param {string} [op.type]
 * @param {number} [op.index]
 * @return {function}
 */
function createNextIterator(op){
	Object.assign(next, {
		index: 0,
		done: false,
	}, op);
	if(next.init){
		next.init(next);
	}
	
	return next;

	function next(){
		let rs;
		if(!next.done){
			rs = next.next(next);
			if(rs !== undefined){
				rs = [next.index++, rs];
			}
		}
		return rs;
	}
}