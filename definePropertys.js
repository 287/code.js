//#!py
/**
 * eg:
 *    defineProperty(this, keys, op) | defineProperty(this, keys, function(key){return op}}) | defineProperty(this, {key1: op1, key2: op2})
 * @include isArray isObject eachObject defineProperty
 * @param {object} o
 * @param {array<string>|object} keys
 * @param {function|object} [op]
 * @param {function} [op.get]
 * @param {function} [op.set]
 * @param {any} [op.value]
 * @return {undefined}
 */
function definePropertys(obj, keys, op)
	if isArray(keys)
		keys.forEach((key)=> defineProperty(obj, key, op, true))
	else if isObject(keys)
		eachObject(keys, (op, key)=> defineProperty(obj, key, op))