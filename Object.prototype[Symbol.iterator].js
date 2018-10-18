/**
 * @include Object.entries
 */
{
	let iteratorKey = 'Symbol(Symbol.iterator)';// Symbol.iterator;
	if(!Object.prototype[iteratorKey]){
		Object.defineProperty(Object.prototype, iteratorKey, {
			value: function(){
				return Object.entries(this)[iteratorKey]();
			},
		});
	}
}