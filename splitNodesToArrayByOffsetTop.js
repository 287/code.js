//#!py
/**
 * @desc 根据上偏移把节点拆分成二维数组
 */
function splitNodesToArrayByOffsetTop(nodes)
	const rs = []
	let lastOffsetTop
	let lastIndex = -1
	for let i = 0, list = nodes, l = list.length; i < l; i++
		let node = list[i]
		if node.offsetTop !== lastOffsetTop
			lastOffsetTop = node.offsetTop
			lastIndex++
			rs[lastIndex] = []
		rs[lastIndex].push(node)
		
	return rs