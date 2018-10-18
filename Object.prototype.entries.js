/**
 * @include Object.entries
 */
Object.prototype.entries = Object.prototype.entries || function(){
	return Object.entries(this);
};