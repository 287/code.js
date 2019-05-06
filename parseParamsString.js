//#!py
/**
 * @param {string} str - template string. eg: "like ${name} or $0 or $name2 style"
 * @param {object} param - template data object
 * @return {string}
 */
function parseParamsString(str, ...params)
	str = str.replace(/\$\{(\w*)\}/g, (t, key)=> parse(key))
	str = str.replace(/\$(\w+)/g, (t, key)=> parse(key))
	return str
	
	function parse(key)
		let value = ''
		for params as param -
			if param[key] != null
				value = param[key]
				break
		return value