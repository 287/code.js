/**
 * 插入指定元素后
 * @param {element} node
 * @param {element} placeholder
 * @return {element|undefined}
 */
function insertNodeAfter(node, placeholder){
	let pNode = placeholder.parentNode;
	if(pNode){
		pNode.insertBefore(node, placeholder.nextSibling);
		return node;
	}
}