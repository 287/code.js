//#!py
/**
 * @desc 
 * @include querystring2object
 * @param {httpIncomingMessage} req
 * @param {function} cb
 * @return {object}
 */
function getHttpPostData(req, cb)
	let bufs = [];
	req
	.on('data', (buf)=>{
		bufs.push(buf)
	})
	.on('end', ()=>{
		let content = Buffer.concat(bufs).toString()
		cb(null, content)
	})
	.on('error', cb)