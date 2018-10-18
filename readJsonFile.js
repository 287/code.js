//#!py
/**
 * @include isExists readFile
 * @param {string} path
 * @return {undefined}
 */
function readJsonFile(path)
	let rs
	if isExists(path)
		let content = readFile(path)
		rs = content.length === 0 ? null : JSON.parse(content)
	return rs