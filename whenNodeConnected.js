//#!py
function whenNodeConnected(node, cb, interval)
	const timer = setInterval(()=> {
		if node.isConnected
			clearInterval(timer)
			cb(node)
	}, interval || 1000)
	return timer