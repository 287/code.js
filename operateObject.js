/**
 * @param {object} o
 * @param {string} [key] - when key is undefined then return o
 * @param {any} [value] - when value is undefined then return o[key] else return o[key] = value
 * @param {string} [getter] - the get method name of obj
 * @param {string} [setter] - the set method name of obj
 * @return {any}
 */
function operateObject(obj, key, value, getter, setter){
	if(key === undefined){
		return obj;
	}else if(value === undefined){
		if(getter){
			return obj[getter](key);
		}else{
			return obj[key];
		}
	}else{
		if(setter){
			return obj[setter](key, value);
		}else{
			return obj[key] = value;
		}
	}
}