/**
 * @include1 isFunction, isString, isNumber
 * @param {number|array|set|map|object} o
 * @param {function} fn(value, key, o) - callback function - fn return false then break and return false
 * @param {object} [context = null] - callback context
 * @param {string} [type] - [array|object]
 * @return {undefined|false}
 */
function each(o, fn, context, type){
	if(o != null && typeof fn === 'function'){
		if(typeof context === 'string'){
			type = context;
			context = null;
		}else{
			type = type != null ? type : typeof o.length === 'number' ? 'array' : o.constructor.name;
		}
		
		switch(type.toLowerCase()){
			case 'number':
				for(var i = 0; i < o; i++){
					if(fn.call(context, i, i, o) === false) return false;
				}
			break; case 'array':
				for(var i = 0; i < o.length; i++){
					if(fn.call(context, o[i], i, o) === false) return false;
				}
			break; case 'set': case 'weakset':
				for(let v of o){
					if(fn.call(context, v, v, o) === false) return false;
				}
			break; case 'map': case 'weakmap':
				for(let item of o){
					if(fn.call(context, item[1], item[0], o) === false) return false;
				}
			break; case 'object': default:
				for(var key in o){
					if(o.hasOwnProperty(key) && fn.call(context, o[key], key, o) === false) return false;
				}
		}
	}
}