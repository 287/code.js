/**
 * @return {boolean}
 */
function isBrowser(){
	return typeof window === 'object' && Object.prototype.toString.call(window) === '[object Window]';
}