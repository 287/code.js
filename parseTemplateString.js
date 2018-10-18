//#!py
/**
 * @param {string} str - template string. eg: "like {name} style"
 * @param {object} param - template data object
 * @return {string}
 */
function parseTemplateString(str, param = {})
	return str.replace(/\{([a-zA-Z_][a-zA-Z0-9_-]*)\}/g, (t, m)=> param[m] == null ? '' : param[m])