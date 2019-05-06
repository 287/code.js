//#!py
/**
 * @include isString
 */
function uglifyStringify(str,)
	const rs = []
	if isString(str)
		for str.length as i
			rs[i] = String.fromCharCode(255 - str.charCodeAt(i))
		
		str = rs.join('')
		str = JSON.parse(str)
	else
		str = JSON.stringify(str)
	// str = str.replace(/"(\w*)":/g, '$1:')
	// const chrs = '{}[]:",'
	// const rechars = chrs.split('').reverse().join('')
	// str = str.replace(/[\{\}\[\]:",]/g, (c)=> rechars[chrs.indexOf(c)])
		for str.length as i
			rs[i] = String.fromCharCode(255 - str.charCodeAt(i))
	
		str = rs.join('')
	return str