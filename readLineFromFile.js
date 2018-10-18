//#!py
/**
 * @desc 将对象数组(所有对象的keys一致)转换成表格数组（首行为name的等宽数组）
 * @require fs
 * @include StreamSectionReader
 * @param {array<object>} data
 * @return {array<array>}
 */
function readLineFromFile(path, lineCount = 1, skip = 0, reverse = false)
	const fd = fs.openSync(path, 'rs+')
	
	const lines = []
	const bufLen = 256
	let lastIndex = 0
	let count = 0
	
	if reverse
		lastIndex = Math.max(fs.fstatSync(fd).size - bufLen, 0)
		
	const splitter = new StreamSectionReader({
		sep: '\n',
		cache: false,
		reverse,
		onsection: (line)=> {
			if count >= skip
				lines.push(line)
			
			count++
		},
	})
	
	while lines.length < lineCount
		const buf = Buffer.alloc(bufLen)
		const len = fs.readSync(fd, buf, 0, bufLen, lastIndex)
		if len > 0
			splitter.pipe(buf)
		else
			splitter.end()
			break
			
		lastIndex += bufLen * (reverse ? -1 : 1)
		
	fs.closeSync(fd)
	
	if reverse
		lines.reverse()
	
	return lines.slice(-lineCount)