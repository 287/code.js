//#!py
/**
 * @include trimLeft
 * @param {string} css
 * @param {string} wrapperKey
 * @return {string}
 */
function wrapCss(css, prefix)
	const list = []
	
	let key
	for css.split(/\{|\}/) as str, i
		if trim(str) === ''
			continue
			
		if i % 2 === 0
			str = addPrefix(str, prefix)
			list.push(str, '{')
		else
			list.push(str, '}')
		
	return list.join('')
	
	function addPrefix(statement, prefix)
		const list = statement.split(',')
		
		for list as str, i
			const {index} = str.match(/[^\s]/)
			list[i] = str.slice(0, index) + prefix + ' ' + str.slice(index)
			
		return list.join(',')