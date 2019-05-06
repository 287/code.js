//#!py
/**
 * @include vowelChrs
 */
function resolveWord(word)
	const suffixs = ['s', 'ing', 'ion', 'ed', 'ful']
	const rs = []
	suffixs.forEach(suffix=> {
		if word.endsWith(suffix) && word.length > suffix.length
			let tmp = word.slice(0, -suffix.length)
			rs.push(tmp)
			if vowelChrs.includes(suffix[0])
				rs.push(tmp + 'e')
	})
	
	return rs