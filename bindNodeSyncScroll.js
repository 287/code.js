//#!py
/**
 * @desc 多个节点统一滚动相同的比例
 * @include addEvent concatTimeout
 */
function bindNodeSyncScroll(...nodes)
	let target
	nodes.forEach((node, i)=> {
		addEvent(node, 'mouseover', ()=> target = node)
		addEvent(node, 'scroll', ()=> {
			if target === node
				const ratio = node.scrollTop / (node.scrollHeight - node.clientHeight)
				
				nodes.forEach((node)=> {
					if node !== target
						node.scrollTop = (node.scrollHeight - node.clientHeight) * ratio
				})
		})
	})