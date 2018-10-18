/**
 * @include chain
 */
function encodeBase64(content){
	return chain(content, [encodeURIComponent, unescape, btoa]);
}