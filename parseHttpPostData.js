//#!py
/**
 * @desc 
 * @include getHttpPostData getHttpUploadData querystring2object
 * @param {httpIncomingMessage} req
 * @param {object} op
 * @param {number} [op.maxSize = 30] - M
 * @param {string} [op.uploadDir]
 * @param {boolean} [op.keepName]
 * @param {function} cb
 * @return {undefined}
 */
function parseHttpPostData(req, op, cb){
	let maxSize = op.maxSize || 30
	if ['POST', 'PUT'].includes(req.method)
		let contentTypeString = req.headers['content-type'] || ''
		let [contentType, charset] = contentTypeString.split('; ')
		switch contentType
			case 'application/x-www-form-urlencoded'
				getHttpPostData(req, (err, content)=>{
					if content
						content = querystring2object(content)
					cb(err, {
						posts: content
					})
				})
				break
				
			case 'application/json'
				getHttpPostData(req, (err, content)=>{
					if content
						content = JSON.parse(content)
					cb(err, {
						posts: content
					})
				})
				break
				
			case 'multipart/form-data'
				let size = req.headers['content-length']
				if size
					if maxSize * 1024 * 1024 < size * 1
						return cb(`upload file size limit ${maxSize}M`)
				
				getHttpUploadData(req, op, (err, data)=>{
					cb(err, data)
				})
				break
				
			default
				cb()
	else
		cb()