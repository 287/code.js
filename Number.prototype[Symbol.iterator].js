/**
 * @include NumberIterator
 */
{
	let iteratorKey = 'Symbol(Symbol.iterator)';// Symbol.iterator;
	Object.defineProperty(Number.prototype, iteratorKey, {
		value: function(){
			return new NumberIterator(this);
		},
	});
}