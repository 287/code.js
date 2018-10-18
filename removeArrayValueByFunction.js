/**
 * @include eachArray
 * @param {array} o
 * @param {function} cb
 * @return {undefined}
 */
function removeArrayValueByFunction(array, cb){
	let index;
	eachArray(array, (value, i)=>{
		if(cb(value, index++, array)){
			array.splice(i, 1);
			return true;
		}
	});
	return array;
}