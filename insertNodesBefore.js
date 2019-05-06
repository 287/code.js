//#!py
/**
 * @desc 插入指定元素前
 * @include isArray insertNodeBefore
 * @param {element} node
 * @param {element} placeholder
 * @return {element|undefined}
 */
function insertNodesBefore(nodes, placeholder)
	if !isArray(nodes)
		nodes = Array.from(nodes)
	nodes.forEach(node=> insertNodeBefore(node, placeholder));
}