/**
 * 插入指定元素子元素前
 * @param {element} node
 * @param {element} placeholder
 * @return {element|undefined}
 */
function insertNodePrepend(node, placeholder){
	placeholder.insertBefore(node, placeholder.firstChild);
	return node;
}