//#!py
/**
 * @desc 点击除此之外的节点时隐藏节点
 * @include setNodeStyle
 * @param {element} node 
 * @param {object} op 
 * @return {undefined}
 */
function setNodeOffsetByAnotherNodePosition(node, target, ...xyRatios)
	const rect = target.getBoundingClientRect()
	
	const style = {}
	const offset = rectKeys.map((key, i)=> rect[key] * xyRatios)
	
	ltKeys.map((key, i)=> style[key] = offset[i] + rect[key])
	
	setNodeStyle(node, style)