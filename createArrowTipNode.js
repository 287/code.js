//#!py
function createArrowTipNode(targetNode, content, position = 'top', offsetAdded = 4, translate)
	const tipNode = document.createElement('span')
	document.body.append(tipNode)
	
	tipNode.innerHTML = content
	tipNode.setAttribute('tip-node', position)
	
	const rect = targetNode.getBoundingClientRect()
	const tipRect = tipNode.getBoundingClientRect()
	
	/**
	 * @include lrKeys ltKeys sizeKeys
	 */
	const xyIndex = +!lrKeys.includes(position)
	const index = +!ltKeys.includes(position)
	
	// 获取方位在目标矩形的基准比例
	const ratios = [!xyIndex ? index : .5, !xyIndex ? .5 : index]
	/**
	 * @include getPointInRectByPosition 
	 */
	const offset = getPointInRectByPosition(rect, ...ratios)
	
	// 根据方位偏移
	offset[xyIndex] += (index || -1) * offsetAdded
	
	// 偏移tip节点的尺寸
	if index === 0
		offset[xyIndex] -= tipRect[sizeKeys[xyIndex]]
		
	// 偏移居中
	offset[+!xyIndex] -= tipRect[sizeKeys[+!xyIndex]] / 2
	
	// 偏移额外
	if translate
		translate.forEach((v, i)=> offset[i] += v)
	
	offset.forEach((v, i)=> offset[i] = v | 0)
		
	offset.forEach((v, i)=> tipNode.style[ltKeys[i]] = `${v}px`)
	
	return tipNode
	
/**
 * @include addStyleNode
 */
addStyleNode(`
[tip-node] {
	position: fixed;
	background: #333;
	color: #fff;
	padding: .2em .5em;
	border-radius: 3px;
	pointer-events: none;
	max-width: 200px;
	word-break: break-word;
	white-space: pre-line;
	transition: .05s;
}
[tip-node]:before {
	content: ' ';
	position: absolute;
	border: 4px solid transparent;
}
[tip-node=left]:before, [tip-node=right]:before {
	top: 50%;
	transform: translateY(-50%);
}
[tip-node=left]:before {
	border-left-color: #333;
	left: 100%;
}
[tip-node=right]:before {
	border-right-color: #333;
	left: -8px;
}
[tip-node=top]:before, [tip-node=bottom]:before {
	left: 50%;
	transform: translateX(-50%);
}
[tip-node=top]:before {
	border-top-color: #333;
	top: 100%;
}
[tip-node=bottom]:before {
	border-bottom-color: #333;
	top: -8px;
}`, 'tip-node')
	