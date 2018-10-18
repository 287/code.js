/**
 * @include createNextIterator
 * @param {string} str
 * @return {function}
 */
function getStringByLine(str){
	return createNextIterator({
		object: str,
		init: function(op){
			op.start = 0;
		},
		next: function(op){
			let index = op.object.indexOf('\n', op.start);
			if(index === -1){
				op.done = true;
				index = undefined;
			}
			let rs = op.object.slice(op.start, index);
			op.start = ++index;
			return rs;
		}
	});
}