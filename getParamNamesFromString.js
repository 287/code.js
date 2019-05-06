//#!py
/**
 * 在可执行字符串中获取变量的名称
 * @include replaceStringByMark
 * @param {string} str - js expression
 * @param {array<string>} excludes - exclude keys
 * @return {array<string>} keys
 */
function getParamNamesFromString(str)
	str = replaceStringByMark(str)[0].replace(/<\d+>/g, '')
	
	const keys = []
	str.replace(/(?:^|[\W])([a-z_$][\w\.]*)/ig, (t, key, index, str)=> {
		const endIndex = index + t.length
		const endChar = str.slice(endIndex, endIndex + 1)
		
		if endChar === '('
			key = key.replace(/\.\w+$/, '')
			
		if endChar === ':'
			return
		
		if !keys.includes(key)
			keys.push(key)
	})
	
	return keys