/**
 * @include toArray
 */
function querySelectorAll(selector, pNode){
	return toArray((pNode || document).querySelectorAll(selector));
}