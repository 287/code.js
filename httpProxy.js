//#!py
/**
 * @include splitUrl
 * @require http, https
 * @param {string} url
 * @param {object} [op]
 * @param {object} [op.headers]
 * @param {function} cb - cb({error|null} err, {buffer} [content])
 * @return {ClientRequest} req
 */
function httpProxy(url, req, res)
	const ops = splitUrl(url)
	
	ops.headers = req.headers
	ops.headers.host = ops.host || ops.headers.host
	ops.method = req.method
	// ops.path = targetReq.url
	// console.log(ops)
	// let rs = false;
	// let err = null;
	
	const httpObject = ops.protocol === 'https:' ? https : http
	
	const proxyReq = httpObject.request(ops, (proxyRes)=> {
		res.writeHead(proxyRes.statusCode, proxyRes.headers)
		
		proxyRes.on('data', (buf)=> {
			res.write(buf)
		})
		proxyRes.on('end', ()=> {
			res.end()
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
