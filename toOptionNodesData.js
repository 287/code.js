//#!py
/**
 * @desc 转成values和texts
 * @include isPureObject isArray row2col
 * @param {array<object|array|any>|object} options
 * @param {object} [op]
 * @param {string} [op.textKey]
 * @param {string} [op.valueKey]
 * @return {array<array>}
 */
function toOptionNodesData(options, op)
	let values, texts
	
	if isPureObject(options)
		values = Object.keys(options)
		texts = values.map(key=> options[key])
	else
		if isPureObject(options[0])
			options = options.map(item=> [op.valueKey, op.textKey].map(key=> item[key]))
			
		if isArray(options[0])
			[values, texts] = row2col(options)
		else
			values = texts = options
		
	return [values, texts]