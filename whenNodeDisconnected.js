//#!py
function whenNodeDisconnected(node, cb, interval)
	let connected = node.isConnected
	const timer = setInterval(()=> {
		if !connected && node.isConnected
			connected = true
		else if connected && !node.isConnected
			clearInterval(timer)
			cb(node)
	}, interval || 1000)
	return timer