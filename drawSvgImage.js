/**
 * @include 
 * @param {array<array>} path
 * @param {element} [node]
 * @return {element}
 */
function drawSvgImage(node, url){
	node.setAttribute('href', url);
	return node;
}