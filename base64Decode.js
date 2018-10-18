/**
 * @include isNodejs, chain
 */
function base64Encode(str){
	if(isNodejs()){
		return Buffer.from(str, 'base64').toString();
	}else{
		return chain(content, [atob, escape, decodeURIComponent]);
	}
}