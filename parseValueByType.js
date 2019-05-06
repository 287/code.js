//#!py
function parseValueByType(value, type, fix)
	if type === 'array'
		value = [value]
	else if type === 'string'
		if fix && value == null
			value = ''
		value += ''
	else if type === 'number'
		if fix && value == null
			value = 0
		value *= 1
	else if type === 'int'
		value = parseInt(value)
	else if type === 'boolean'
		value = !!value
	
	return value