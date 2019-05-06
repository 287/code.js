//#!py
/**
 * @include createSrcNode removeNode
 * @param {string} src
 * @param {function} cb
 * @return {<element>}
 */
function loadScript(src, cb)
	const node = createSrcNode('script', src, (err)=> {
		removeNode(node)
		cb && cb(err)
	})
	document.head.appendChild(node)
	
	return node