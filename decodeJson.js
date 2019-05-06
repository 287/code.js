//#!py
/**
 * @include parseConfigJson
 */
function decodeJson(str)
	let rs
	try
		rs = JSON.parse(str)
	catch err
		if err.name === 'SyntaxError'
			rs = parseConfigJson(str)
		else
			throw err
	return rs