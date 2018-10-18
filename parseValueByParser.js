//#!py
function parseValueByParser(parser, value, ...args)
	if isFunction(parser)
		value = parser.call(this, value, ...args)
	return value