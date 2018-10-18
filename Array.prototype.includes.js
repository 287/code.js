/**
 * @include isArrayIncludes
 */
Array.prototype.includes = Array.prototype.includes || function(value){
	return isArrayIncludes(this, value);
};