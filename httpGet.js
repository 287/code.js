/**
 * @include isFunction splitUrl
 * @require http https
 * @param {string} url
 * @param {object} [op]
 * @param {object} [op.headers]
 * @param {function} cb - cb({error|null} err, {buffer} [content])
 * @return {ClientRequest} req
 */
function httpGet(url, op, cb){
	if(isFunction(op)){
		cb = op;
		op = null;
	}
	op = Object.assign(splitUrl(url), op);
	
	const httpObject = op.protocol === 'https:' ? https : http;
	
	const req = httpObject.request(op, (res)=>{
		let bufs = [];
		
		res.on('data', (buf)=>{
			bufs.push(buf);
		});
		res.on('end', ()=>{
			cb(null, Buffer.concat(bufs), res);
		});
		res.on('error', (err)=>{
			cb(err, res);
		});
	}).on('error', (err)=>{
		cb(err);
	});
	req.end();
	return req;
}