//#!py
/**
 * @param {string} str - template string. eg: "like ${name} style"
 * @param {object} param - template data object
 * @return {string}
 */
function parseParamString(str, ...params)
	return str.replace(/\$\{(\S*?)\}/g, (t, m)=> {
		let value = ''
		for params as param -
			if param[m] != null
				value = param[m]
				break
		return value
	})