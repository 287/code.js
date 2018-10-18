/**
 * @include createStyleNode
 * @param {string} style - html css rule
 * @param {string} [key] - style node id
 * @return {element}
 */
function addStyleNode(style, key){
	var node = createStyleNode(style);
	key && node.setAttribute('key', key);
	(document.head || document.body).appendChild(node);
	return node;
}