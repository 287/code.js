//#!py
/**
 * @desc 将对象数组(所有对象的keys一致)转换成表格数组（首行为name的等宽数组）
 * @require fs
 * @param {array<object>} data
 * @return {array<array>}
 */
function readLineFromFd(fd, lineIndex = 0, lineCount = 1)
	const lines = []
	const bufs = []
	const bufLen = 1000
	let currentLineIndex = 0
	let lastIndex = 0
	
	if lineIndex < 0
		fs.fstatSync(fs).size
		
	
	while lines.length < lineCount
		const buf = Buffer.alloc(bufLen)
		const len = fs.readSync(fd, buf, 0, bufLen, lastIndex)
		console.log(buf, len)
		if len > 0
			for let i = 0, lastIndex = 0, index; index !== -1 && lines.length < lineCount; i++
				index = buf.indexOf(10, lastIndex)
				console.log(index, lines.length)
				if index > -1
					if i === 0
						bufs.push(bufs.slice(lastIndex, index))
						lines.push(Buffer.concat(...bufs))
					else
						lines.push(buf.slice(lastIndex, index))
					lastIndex = index + 1
				else
					console.log('push')
					bufs.push(buf)
			lastIndex += bufLen
		else
			break
	
	if bufs.length
		lines.push(Buffer.concat(...bufs))
		
	return lines
	
const lines = readLineFromFd('scan.log')
console.log(lines.map(v=> v+''))