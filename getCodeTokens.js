//#!py
function getCodeTokens(str)
	list = []
	let keywords = []
	let numberPunctuations = ['+', '-', '*', '/', '%']
	let bytePunctuations = ['^', '>', '<', '&', '|']
	let rangePunctuations = ['(', ')', '[', ']', '{', '}']
	let otherPunctuations = ['=', ':', '!', '?', ',', '||', '&&', '+=', '-=', '/=', '*=', '==', '!=']
	let punctuations = [].concat(numberPunctuations, bytePunctuations, rangePunctuations, otherPunctuations)
	let lasts = []
	let lastType = ''
	let lastPopType = ''
	let lastChr
	
	let lineIndex = 0
	let colIndex = 0
	
	for let i = 0, l = str.length, chr; i < l; i++
		chr = str[i]
		// console.log(chr)
		push(chr)
		colIndex++
		
	pop()
	console.log(list)
	console.log(list.reduce((p, n)=> p+=n.value, ''))
	
	
	
	function pop()
		if lasts.length === 0
			return
			
		let type = lastType
		
		if type === 'tab' && lastPopType !== 'ln'
			lasts = []
			lastType = null
			return
			
		let value = lasts.join('')
		
		if type === 'ln'
			value = '\n'
			
		list.push({
			type,
			value,
			lineIndex,
			colIndex: colIndex - value.length,
		})
		if lastType === 'ln'
			lineIndex++
			colIndex = 0
			
		lasts = []
		lastPopType = type
		lastType = null
	
	function push(chr)
		let type
		if isWordChr(chr)
			type = 'word'
		else if isPunctuationChr(chr)
			type = 'punctuation'
		else if isLnChr(chr)
			type = 'ln'
			if chr === '\n' && lastChr === '\r'
				return
		else if isTabChr(chr)
			type = 'tab'
			
		else
			pop()
			console.log(chr)
			return 
			
		if type !== lastType
			pop()
				
			
		lasts.push(chr)
		lastType = type
		lastChr = chr
				
		
	function isTabChr(chr)
		return chr === '\t'
		
	function isLnChr(chr)
		return ['\r', '\n'].includes(chr)
		
	function isPunctuationChr(chr)
		return punctuations.includes(chr)
	
	function isNumberChr(chr)
		return chr >= '0' && chr <= '9'
		
	function isLowercase(chr)
		return chr >= 'a' && chr <= 'z'
		
	function isUppercase(chr)
		return chr >= 'A' && chr <= 'Z'
		
	function isLetter(chr)
		return isLowercase(chr) || isUppercase(chr)
		
	function isFirstIdChr(chr)
		return isLetter(chr) || chr === '_'
		
	// function isIdChr(chr)
		// if chr === '_' || chr >= 'a' && chr > 
		
	function isWordChr(chr)
		return chr === '_' || isLetter(chr) || isNumberChr(chr)
		
getCodeTokens(`
			
	const a = [1, 2, 3, fn()]\r
	let b = 	{}\r
	if a == 1
		-
			&& b
		v()
	-
		asdasd
		asd
		as
		d
		sad
		as
		d
		sad
		sa
		d
		sd
`)
