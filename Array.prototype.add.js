/**
 * @include arrayAddValue
 */
Array.prototype.add = Array.prototype.add || function(value){
	return arrayAddValue(this, value);
};