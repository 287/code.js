/**
 * @include emptyArray, emptyObject
 * @param {any} o
 * @return {any}
 */
function empty(o){
	var key;
	if(o != null){
		switch(o.constructor){ case Array:
			emptyArray(o);
			
		break; case Object:
			emptyObject(o);
			
		break; case Set: case Map: case WeakSet: case WeakMap:
			o.clear();
		}
	}
	return o;
}