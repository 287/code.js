/**
 * @include chain
 */
function decodeBase64(content){
	return chain(content, [atob, escape, decodeURIComponent]);
}