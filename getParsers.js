//#!py
/**
 * @include splitSimple
 * @param {string} content
 * @return {array<string>}
 */
function getParsers(content)
	let list = []
	if content.slice(0, 4) === '//#!'
		let i = content.indexOf('\n')
		if i !== -1
			list = splitSimple(content.slice(4, i))
	
	return list