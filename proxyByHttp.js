//#!py
/**
 * @include splitUrl isFunction
 * @require http, https
 * @param {object} op
 * @param {string} op.url
 * @param {object} [op.headers]
 * @param {function} cb - cb({error|null} err, {buffer} [content])
 * @return {ClientRequest} req
 */
function proxyByHttp(op, req, res, cb)
	op = Object.assign({rejectUnauthorized : false}, splitUrl(op.url), op)
	op.headers = Object.assign({}, req.headers, op.headers)
	op.method = req.method
	// op.headers.host = ops.host || req.headers.host
	// ops.headers = req.headers
	// ops.path = targetReq.url
	// console.log(ops)
	// let rs = false;
	// let err = null;
	
	const httpObject = op.protocol === 'https:' ? https : http
	
	const proxyReq = httpObject.request(op, (proxyRes)=> {
		res.writeHead(proxyRes.statusCode, proxyRes.headers)
		
		proxyRes.on('data', (buf)=> {
			res.write(buf)
		})
		proxyRes.on('end', ()=> {
			res.end()
			if isFunction(cb)
				cb()
		})
		proxyRes.on('error', (e)=> {
			res.end(e.message)
			console.log(`proxy "${url}": respone error`, e);
		})
	})
	
	req.on('data', (buf)=>{
		proxyReq.write(buf)
	})
	req.on('end', ()=>{
		proxyReq.end()
	})
	req.on('error', (e)=> {
		res.end(e)
		console.log(`proxy "${url}": request error`, e)
	})
