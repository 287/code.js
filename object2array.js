/**
 * @include eachObjectMapArray
 * @param {object} obj
 * @return {array}
 */
function object2array(obj){
	return eachObjectMapArray(obj, (value, key)=> [key, value]);
}