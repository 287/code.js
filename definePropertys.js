/**
 * eg:
 *    defineProperty(this, keys, op) | defineProperty(this, keys, function(key){return op}}) | defineProperty(this, {key1: op1, key2: op2})
 * @include defineProperty
 * @param {object} o
 * @param {array<string>|object} keys
 * @param {function|object} [op]
 * @param {function} [op.get]
 * @param {function} [op.set]
 */
function definePropertys(o, keys, op){
	if(typeof keys === 'object' && keys != null){
		if(keys.constructor === Array){
			keys.forEach(function(key){
				defineProperty(o, key, typeof op === 'function' ? op(key) : op);
			});
		}else{
			op = key;
			for(key in op){
				defineProperty(o, key, op[key]);
			}
		}
	}
}