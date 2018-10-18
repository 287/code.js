/**
 * @param {object} o
 * @param {string} key
 * @param {object} op
 * @param {function} [op.get]
 * @param {function} [op.set]
 */
function defineProperty(o, key, op){
	if(o && typeof key === 'string'){
		if(Object.defineProperty){
			Object.defineProperty(o, key, op);
		}else if(o.__defineGetter__){
			if(typeof op.get === 'function') o.__defineGetter__(key, op.get);
			if(typeof op.set === 'function') o.__defineSetter__(key, op.set);
		}
	}
}