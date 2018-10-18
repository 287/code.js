/**
 * @param {string} style
 * @param {string} [id]
 * @return {element}
 */
function createStyleNode(style, id){
	var node = document.createElement('style');
	node.innerHTML = style;
	id && (node.id = id);
	return node;
}