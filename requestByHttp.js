//#!py
/**
 * @include splitUrl
 * @require http https
 * @param {object} op
 * @param {string} [op.url]
 * @param {object} [op.data]
 * @param {object} [op.headers]
 * @param {function} cb - cb({error|null} err, {buffer} [content])
 * @return {ClientRequest} req
 */
function requestByHttp(op, cb)
	op = Object.assign(splitUrl(op.url), op)
	
	const httpObject = op.protocol === 'https:' ? https : http;
	
	const req = httpObject.request(op, (res)=> {
		const bufs = []
		res.on('data', (buf)=> bufs.push(buf))
		res.on('end', ()=> cb(null, Buffer.concat(bufs)))
		res.on('error', cb)
	})
	
	if op.data
		req.write(data)
		
	req.on('error', cb)
	req.end()
	
	return req