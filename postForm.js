//#!py
/**
 * @include random createNode getIframeJson removeNode
 * @param {string} url
 * @param {function} cb - cb(err, rs)
 */
function postForm(form, cb)
	const formid = form.id || random()
	const frameId = `${formid}-target`
	const frame = createNode(`<iframe name="${frameId}" src="javascript:;" style="display: none"></iframe>`)
	
	form.target = frameId
	form.appendChild(frame)
	
	frame.onerror = frame.onabort = runcb
	
	frame.onload = ()=>{
		let rs = getIframeJson(frame)
		if rs === undefined
			runcb('not found result')
		else
			runcb(null, rs)
	}
	
	form.submit()
	
	function runcb(err, data)
		cb && cb(err, data)
		removeNode(frame)