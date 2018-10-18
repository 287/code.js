/**
 * 插入指定元素前
 * @param {element} node
 * @param {element} placeholder
 * @return {element|undefined}
 */
function insertNodeBefore(node, placeholder){
	let pNode = placeholder.parentNode;
	if(pNode){
		pNode.insertBefore(node, placeholder);
		return node;
	}
}