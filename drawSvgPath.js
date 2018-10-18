/**
 * @include toSvgPath
 * @param {array<array>} path
 * @param {element} [node]
 * @return {element}
 */
function drawSvgPath(node, path){
	node.setAttribute('d', toSvgPath(path));
	return node;
}