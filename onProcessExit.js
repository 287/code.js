//#!py
function onProcessExit(cb)
	let execed = false
	process.on('beforeExit', (code)=> {
		if execed
			return
			
		execed = true
		
		cb(null, code)
	})
	process.on('exit', (code)=> {
		console.log('exit')
		return
		if execed
			return
			
		execed = true
		
		cb(null, code)
	})