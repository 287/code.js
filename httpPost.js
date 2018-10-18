/**
 * @include isFunction, object2querystring
 * @require http, https
 * @param {string} url
 * @param {object} data
 * @param {function} cb - cb({error|null} err, {buffer} [content])
 * @return {ClientRequest} req
 */
function httpPost(url, data, op, cb){
	if(isFunction(op)){
		cb = op;
		op = null;
	}
	data = object2querystring(data);
	var op = require('url').parse(url);
	op.method = 'POST';
	op.headers = {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': data.length,
	};
	var req = (/^https/.test(url) ? https : http).request(op, (res)=>{
		let bufs = [];
		res.on('data', (buf)=>{
			bufs.push(buf);
		});
		res.on('end', ()=>{
			cb(null, Buffer.concat(bufs), res);
		});
		res.on('error', (err)=>{
			cb(err);
		});
	});
	req.on('error', cb);
	req.write(data);
	req.end();
	return req;
}