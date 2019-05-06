//#!py
/**
 * @include isString isBoolean isArray eachArraySet isPureObject objectArray2tableArray
 * @param {string} table
 * @param {object|array<array>} data
 * @param {object|boolean} op
 * @return {string|array}
 */
function toSqlInsert(table, data, op)
	if isBoolean(op)
		op = {prepare: op}
		
	const {prepare = false, replace = false} = op || {}
	
	const isMultiple = isArray(data)
	let keys, values, prepares
	
	if isMultiple
		if isPureObject(data[0])
			data = objectArray2tableArray(data)
			
		keys = data[0]
		
		if prepare
			values = []
			prepares = []
			let item = keys.map(key=> '?')
			for let i = 1; i < data.length; i++
				values.push(`(${item.join(', ')})`)
				prepares.push(...data[i])
		else
			values = []
			for let i = 1; i < data.length; i++
				let item = data[i].map(value=> isString(value) ? `"${value}"` : value)
				values.push(`(${item.join(', ')})`)
				
		values = values.join(', ')
		
	else
		keys = Object.keys(data)
		prepares = keys.map(key=> data[key])
		
		if prepare
			values = keys.map(key=> '?')
		else
			values = eachArraySet(prepares, (value=> isString(value) ? `"${value}"` : value))
		
		values = `(${values.join(', ')})`
	
	keys = `(${keys.join(', ')})`
	
	let sql = `${replace ? 'replace' : 'insert'} into ${table} ${keys} values ${values}`;
	
	return !prepare ? sql : [sql, prepares]