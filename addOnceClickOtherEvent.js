//#!py
/**
 * @desc 绑定点击除指定节点之外的节点的事件
 * @include isArray addOnceEvent
 * @param {element|array} nodes
 * @param {function} cb 
 * @return {undefined}
 */
function addOnceClickOtherEvent(nodes, cb)
	if !isArray(nodes)
		nodes = [nodes]
		
	addOnceEvent(document, 'click', (e)=> {
		const {target} = e
		if nodes.some(node=> target === node || node.contains(target))
			return true
		
		if cb(e)
			return true
	})