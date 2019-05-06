//#!py
/**
 * @include array2string
 */
function tableArray2consoleTableString(tableArray, op)
	// console.log()
	const lens = []
	const strs = []
	
	for tableArray as line, index
		strs[index] = []
		for line as str, i
			if op && op.parseValue
				str = op.parseValue(str)
			if str == null
				str = ''
			else
				str += ''
			strs[index][i] = str
			lens[i] = Math.max(str.length, lens[i] || 0)
	
	// const len = lens.reduce((len, num)=> len + num, 0)
	// const hr = '-'.repeat(len + lens.length - 1)
	const blockLine = lens.map(len=> '-'.repeat(len + 2))
	const hr = blockLine.join('-')
	for strs as line, index
		for line as str, i
			const num = lens[i] - str.length
			if num > 0
				str += ' '.repeat(num)
			else if num < 0
				str = str.slice(0, num)
				
			str = ' ' + str + ' '
			line[i] = str
			
		if index === 0
			strs.splice(++index, 0, blockLine)
		
	// strs.push(blockLine)
	
	// console.log(lens, strs)
	
	
	let str = array2string(strs, ['|', '\n'])
	if strs.length > 0
		// str = '|' + str + '|'
		// str = `${hr}\n${str}|\n${hr}`

	return str
