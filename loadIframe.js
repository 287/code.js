//#!py
/**
 * @include createSrcNode addNode removeNode
 */
function loadIframe(src, cb)
	const node = createSrcNode('iframe', src, (err)=> {
		cb && cb(err, node.contentDocument, node)
		removeNode(node)
	})
	node.style.display = 'none'
	addNode(node)
	return node