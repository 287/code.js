/**
 * @include isString
 * @param {element|string} node
 * @return {undefined}
 */
function scrollIntoView(node){
	if(isString(node)){
		node = document.getElementById(node) || document.getElementsByName(node)[0];
	}
	if(node){
		if(node.scrollIntoView){
			node.scrollIntoView();
		}
	}
}