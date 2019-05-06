//#!py
/**
 * @desc 
 * @include createNodeByTpl
 * @return {undefined}
 */
function getNodeByTpl(tpl, name)
	const node = createNodeByTpl(tpl, name)
	if node && node.styleNode
		document.head.append(node.styleNode)
	return node