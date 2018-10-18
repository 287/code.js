/**
 * @include isNodejs, chain
 */
function base64Encode(str){
	if(isNodejs()){
		return Buffer.from(str).toString('base64');
	}else{
		return chain(str, [encodeURIComponent, unescape, btoa]);
	}
}