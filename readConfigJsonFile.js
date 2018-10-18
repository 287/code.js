//#!py
/**
 * @include isExists readFile parseConfigJson
 * @param {string} path
 * @return {undefined}
 */
function readConfigJsonFile(path)
	let rs
	if isExists(path)
		let content = readFile(path).toString()
		rs = parseConfigJson(content)
	return rs