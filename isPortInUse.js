//#!py
/**
 * @require net
 */
function isPortInUse(port, cb)
	const socket = net.connect(port, ()=>{
		socket.destroy()
		cb(null, true)
	});
	socket.on('error', (err)=>{
		if err.code === 'ECONNREFUSED'
			cb(null, false)
		else
			cb(err, true)
	})