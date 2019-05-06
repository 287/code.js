//#!py
/**
 * @desc 
 * @require os fs
 * @include toUnixPath writeFile generateKey
 * @param {httpIncomingMessage} req
 * @param {object} op
 * @param {string} [op.uploadDir]
 * @param {boolean} [op.keepName]
 * @param {function} cb
 * @return {undefined}
 */
function getHttpUploadData(req, op, cb)
	let keepName = op.keepName
	let uploaddir
	{
		uploaddir = op.uploadDir
		if !uploaddir
			uploaddir = os.tmpdir() + '/node-upload/'
		uploaddir = toUnixPath(uploaddir, 1)
	}
	
	let boundaryKey
	{
		let contentType = req.headers['content-type']
		let boundaryMark = 'boundary='
		contentType.split('; ').some((key)=>{
			if key.slice(0, boundaryMark.length) === boundaryMark
				boundaryKey = key.slice(boundaryMark.length)
				return true
		})
		if !boundaryKey
			return finish('not found boundary key')
		boundaryKey = '--' + boundaryKey
	}
	
	
	const posts = {}
	const files = {}
	const sep = '\r\n'.repeat(2)
		
	let bufs = []
	let lastIndex = 0
	let boundStartIndex
	let boundEndIndex
	let buf
	let lastHeader
	
	req
	.on('data', (chunk)=>{
		buf = chunk
		lastIndex = 0
		searchBuf()
	})
	.on('end', ()=>{})
	.on('error', cb)
	
	function searchBuf()
		boundStartIndex = buf.indexOf(boundaryKey, lastIndex)
		boundEndIndex = boundStartIndex + boundaryKey.length
		
		if boundStartIndex !== -1
			boundEndIndex = boundStartIndex + boundaryKey.length
			log('获取到边界')
			
			if boundStartIndex - 2 > lastIndex
				pushBuf(buf.slice(lastIndex, boundStartIndex - 2))
				
			endBuf()
			
			lastIndex = boundEndIndex + 2
			
			if buf.slice(boundEndIndex, boundEndIndex + 2).toString() === '--'
				log('获取到结束边界')
				
				// finish
				return finish()
			else
				let sepIndex = buf.indexOf(sep, lastIndex)
			
				if sepIndex !== -1
					log('获取到换行边界', sepIndex)
					
					// if sepIndex === -1
					let header = buf.slice(lastIndex, sepIndex).toString()
					log('获取到header', header)
					lastHeader = header = parseHttpHeader(header)
					lastIndex = sepIndex + sep.length
					
					lastHeader.isFile = !!header.filename
					if lastHeader.isFile
						let name
						if keepName
							name = header.filename
						else
							name = generateKey(32)
						lastHeader.path = uploaddir + name
						lastHeader.size = 0
				else
					log('没有获取到换行边界')
				
			searchBuf()
		else
			if lastIndex !== 0
				buf = buf.slice(lastIndex)
			pushBuf(buf)
	
	
	function finish(err, rs)
		if !err
			rs = {
				posts,
				files,
			}
		cb(err, rs)
	
	function endBuf()
		if !lastHeader
			return
			
		let name = lastHeader.name
		
		if !lastHeader.isFile
			if bufs.length
				let content = Buffer.concat(bufs).toString()
				if(!posts[name]){
					posts[name] = content
				}else if(isArray(posts[name])){
					posts[name].push(content)
				}else{
					posts[name] = [posts[name], content]
				}
		else
			let item = {
				name: lastHeader.filename,
				path: lastHeader.path,
				size: lastHeader.size,
				type: lastHeader['Content-Type'],
			}
			
			if !files[name]
				files[name] = [item]
			else
				files[name].push(item)
		
		lastHeader = null
		bufs = []
	
	function pushBuf(buf)
		if lastHeader && lastHeader.isFile
			if lastHeader.size === 0
				writeFile(lastHeader.path, buf)
			else
				fs.appendFileSync(lastHeader.path, buf)
			
			lastHeader.size += buf.length
		else
			bufs.push(buf)
	
	
	function log(...msg)
		0
		// console.log('~~~~~~~~~~~~~~', ...msg)
		
	
	/**
	 * @include splitOnce
	 */
	function parseHttpHeader(header)
		let rs = {}
		header.split('\r\n').forEach((line, i, o)=>{
			line.split('; ').forEach((item, i, o)=>{
				let sep = i == 0 ? ': ' : '='
				let [key, value] = splitOnce(item, sep)
				value = value.replace(/^"|"$/g, '')
				rs[key] = value
			})
		})
		return rs