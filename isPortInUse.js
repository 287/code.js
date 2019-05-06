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
		select err.code
			case 'ENOENT'
			case 'ECONNREFUSED'
				err = null
			
		cb(err, !err ? false : true)
	})