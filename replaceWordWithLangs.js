//#!py
/**
 * @include resolveWord splitWordByCamelCase
 */
function replaceWordWithLangs(str, langs)
	const wordSuffixMap = {
		ing: '中',
		ed: '了',
		ful: '的',
	}
	return str.replace(/([a-z]+)/ig, (word)=> splitWordByCamelCase(word).map(word=> {
		let origin = word
		word = word.toLowerCase()
	
		if langs[word] != null
			return langs[word]
		
		const parsedWord = resolveWord(word).find(word=> langs[word])
		if langs[parsedWord] != null
			let suffix = Object.keys(wordSuffixMap).find(suffix=> word.endsWith(suffix))
			suffix = wordSuffixMap[suffix] || ''
			return langs[parsedWord] + suffix
			
		return origin
	}).join(''))