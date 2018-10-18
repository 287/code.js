/**
 * @include isString, isNumberLike, isNumber, isNonNumber
 * @param {string} key
 * @param {*} value
 * @return {null|number|string|function}
 */
function parseStyleValue(key, value){
	let keys = ['left', 'top', 'width', 'height'];
	let index = keys.indexOf(key);
	if(index > -1){
		if(isString(value)){
			if(value === ''){
				value = 0;
			}else if(isNumberLike(value)){
				value *= 1;
			}else{
				if(value.slice(-1) === '%'){
					value = Function('$$', '$', `return $$.${['left', 'width'].indexOf(key) > -1 ? 'width' : 'height'} * ${value.slice(0, -1)} * .01`);
				}else if(value === 'center' && index < 2){
					let targetKey = keys[index + 2];
					value = Function('$$', '$', `return ($$.${targetKey} - $.${targetKey}) / 2`);
				}else{
					value = Function('$$', '$', `return ${value}`);
				}
			}
		}else if(isNumber(value)){
			if(isNonNumber(value)){
				value = 0;
			}
		}else{
			value = null;
		}
	}
	
	return value;
}